const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
	inventories: [{
		inventory: { type: Schema.Types.ObjectId, ref: 'Inventory' },
		quantity: Number
		}],
	email: String,
	date: Date,
	status: { type: String, enum: ['PREPARED', 'SHIPPED', 'RECEIVED'] }
})

module.exports = mongoose.model('Order', OrderSchema);