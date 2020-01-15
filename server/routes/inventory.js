const router = require('express').Router();
const Inventory = require('../models/inventory');

// POST request - create a new inventory
router.post('/inventories/', async (req, res) => {
	try {
		let inventory = new Inventory();
		inventory.name = req.body.name;
		inventory.description = req.body.description;
		inventory.price = req.body.price;
		inventory.quantity = req.body.quantity;

		await inventory.save();

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

// GET request - get all inventories
router.get('/inventories/', async (req, res) => {
	try {
		let inventories = await Inventory.find();

		res.json({
			success: true,
			inventories: inventories
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message
		})
	}
});

// GET request - get a single inventory
router.get('/inventories/:id', async (req, res) => {
	try {
		let inventory = await Inventory.findOne({ _id: req.params.id });

		res.json({
			success: true,
			inventory: inventory
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message
		})
	}
});

// PUT request - update a single inventory
router.put('/inventories/:id', async (req, res) => {
	try {
		let updatedInventory = await Inventory.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					name: req.body.name,
					description: req.body.description,
					price: req.body.price,
					quantity: req.body.quantity
				}
			}
		);

		if (updatedInventory === null) {
			throw new Error('inventory does not exist');
		}

		res.json({
			success: true,
			updatedInventory: "Inventory has been updated."
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message
		})
	}
});

// DELETE request - delete a single inventory
router.delete('/inventories/:id', async (req, res) => {
	try {
		let deletedInventory = await Inventory.findOneAndDelete({ _id: req.params.id });

		if (deletedInventory) {
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