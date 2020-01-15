const router = require('express').Router();
const Order = require('../models/order');
const Inventory = require('../models/inventory');

// POST request - create a new order
router.post('/orders/', async (req, res) => {
	try {
		let order = new Order();
		order.inventories = req.body.inventories;
		// determine if there is enough inventory
		for (const i in order.inventories) {
			const id = order.inventories[i].inventory;
			const purchaseQuantity = order.inventories[i].quantity;
			let inventory = await Inventory.findById(id);
			const stockQuantity = inventory.quantity;
			if (stockQuantity < purchaseQuantity) {
				throw new Error('not enough in stock');
			} else {
				try {
					let updateInventory = await Inventory.findOneAndUpdate(
						{ _id: id },
						{
							$set: {
								quantity: stockQuantity - purchaseQuantity
							}
						}
					);
				} catch (err) {
					res.status(500).json({
						success: false,
						message: err.message
					})
				}
			}
		}
		order.email = req.body.email;
		order.date = req.body.date;
		order.status = req.body.status;

		await order.save();

		res.json({
			success: true,
			message: 'Successfully saved.'
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message
		})
	}
});

// GET request - get all orders
router.get('/orders/', async (req, res) => {
	try {
		let orders = await Order.find();

		res.json({
			success: true,
			orders: orders
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message
		})
	}
});

// GET request - get a single order
router.get('/orders/:id', async (req, res) => {
	try {
		let order = await Order.findOne({ _id: req.params.id });

		res.json({
			success: true,
			order: order
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message
		})
	}
});

// PUT request - update a single order, only status can be updated
// to change quantities, user has to cancel order and submit a new one
router.put('/orders/:id', async (req, res) => {
	try {
		let updatedOrder = await Order.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					status: req.body.status
				}
			}
		);

		if (updatedOrder === null) {
			throw new Error('order does not exist');
		}

		res.json({
			success: true,
			updatedOrder: updatedOrder
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message
		})
	}
});

// DELETE request - delete a single order
router.delete('/orders/:id', async (req, res) => {
	try {
		let deletedOrder = await Order.findOneAndDelete({ _id: req.params.id });
		console.log(deletedOrder);
		for (const i in deletedOrder.inventories) {
			const id = deletedOrder.inventories[i].inventory;
			const purchaseQuantity = deletedOrder.inventories[i].quantity;
			let inventory = await Inventory.findById(id);
			const stockQuantity = inventory.quantity;
			try {
				let updateInventory = await Inventory.findOneAndUpdate(
					{ _id: id },
					{
						$set: {
							quantity: stockQuantity + purchaseQuantity
						}
					}
				);
			} catch (err) {
				res.status(500).json({
					success: false,
					message: err.message
				})
			}
		}
		if (deletedOrder) {
			res.json({
				success: true,
				message: 'Successfully deleted.'
			});
		}
	} catch {
		res.status(500).json({
			success: false,
			message: err.message
		})
	}
});

module.exports = router;