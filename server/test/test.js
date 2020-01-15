// PLEASE MAKE SURE THE DATABASE IS EMPTY BEFORE EXECUTING THE TESTS

const app = require('../server.js');
const assert = require('assert');
const chai = require('chai');
let should = chai.should();
const request = require('supertest');

// variables to reference for single gets and updates
let inv_id_1, inv_id_2, ord_id_1, ord_id_2;

describe('GET /inventories', function () {
	it('Should be an empty database with no inventories', function (done) {
		request(app)
			.get('/inventories')
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
				res.body.inventories.should.be.empty; // no inventories
				done();
			});
	});
});

describe('POST /inventories', function () {
	it('Added a new inventories', function (done) {
		request(app)
			.post('/inventories')
			.send({
				'name': 'Item 1',
				'description': 'Description 1',
				'price': 4.99,
				'quantity': 8
			})
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
			});
		request(app)
			.post('/inventories')
			.send({
				'name': 'Item 2',
				'description': 'Description 2',
				'price': 1.99,
				'quantity': 9
			})
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
				done();
			});
	});
});

describe('GET /inventories', function () {
	it('Should get all items', function (done) {
		request(app)
			.get('/inventories')
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
				inv_id_1 = res.body.inventories[0]._id;
				inv_id_2 = res.body.inventories[1]._id;
				res.body.inventories[0].name.should.be.equal('Item 1');
				res.body.inventories[0].description.should.be.equal('Description 1');
				res.body.inventories[0].price.should.be.equal(4.99);
				res.body.inventories[0].quantity.should.be.equal(8);
				res.body.inventories[1].name.should.be.equal('Item 2');
				res.body.inventories[1].description.should.be.equal('Description 2');
				res.body.inventories[1].price.should.be.equal(1.99);
				res.body.inventories[1].quantity.should.be.equal(9);
				done();
			});
	});
});

describe('GET /inventories', function () {
	it('Should get "Item 1" with correct description, price, and quantity', function (done) {
		request(app)
			.get('/inventories/' + inv_id_1)
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
				res.body.inventory.name.should.be.equal('Item 1');
				res.body.inventory.description.should.be.equal('Description 1');
				res.body.inventory.price.should.be.equal(4.99);
				res.body.inventory.quantity.should.be.equal(8);
				done();
			});
	});
});

describe('PUT /inventories', function () {
	it('Updated "Item 1" to "New Item 1', function (done) {
		request(app)
			.put('/inventories/' + inv_id_1)
			.send({
				'name': 'New Item 1',
				'description': 'New Description 1',
				'price': 5.99,
				'quantity': 10
			})
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
				done();
			});
	});
});

describe('GET /inventories', function () {
	it('Should have "New Item 1" with correct description, price, and quantity', function (done) {
		request(app)
			.get('/inventories')
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
				res.body.inventories[0].name.should.be.equal('New Item 1');
				res.body.inventories[0].description.should.be.equal('New Description 1');
				res.body.inventories[0].price.should.be.equal(5.99);
				res.body.inventories[0].quantity.should.be.equal(10);
				done();
			});
	});
});

describe('DELETE /inventories', function () {
	it('Deleted all items from database', function (done) {
		request(app)
			.delete('/inventories/' + inv_id_1)
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
			});
		request(app)
			.delete('/inventories/' + inv_id_2)
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
				done();
			});

	});
});

describe('PUT /inventories', function () {
	it('Test update a non-existing inventory', function (done) {
		request(app)
			.put('/inventories/' + inv_id_1)
			.send({
				'name': 'New Item 1',
				'description': 'New Description 1',
				'price': 5.99,
				'quantity': 10
			})
			.end((err, res) => {
				res.body.success.should.equal(false); // response came back successfully
				done();
			});
	});
});

describe('GET /inventories', function () {
	it('Should be an empty database again', function (done) {
		request(app)
			.get('/inventories')
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
				res.body.inventories.should.be.empty; // no inventories
				done();
			});
	});
});

describe('POST /inventories', function () {
	it('Initializing inventories for testing orders', function (done) {
		request(app)
			.post('/inventories')
			.send({
				'name': 'Item 1',
				'description': 'Description 1',
				'price': 4.99,
				'quantity': 8
			})
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
			});
		request(app)
			.post('/inventories')
			.send({
				'name': 'Item 2',
				'description': 'Description 2',
				'price': 1.99,
				'quantity': 9
			})
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
				done();
			});
	});
});

describe('GET /inventories', function () {
	it('Reassign the id of the inventories', function (done) {
		request(app)
			.get('/inventories')
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
				inv_id_1 = res.body.inventories[0]._id;
				inv_id_2 = res.body.inventories[1]._id;
				done();
			});
	});
});

describe('GET /orders', function () {
	it('Should be an empty database with no orders', function (done) {
		request(app)
			.get('/orders')
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
				res.body.orders.should.be.empty; // no orders
				done();
			});
	});
});

describe('POST /orders', function () {
	it('Order fails when order quantity is greater than stock quantity', function (done) {
		request(app)
			.post('/orders')
			.send({
				'inventories': [
					{
						'inventory': inv_id_1,
						'quantity': '20'
					}
				],
				'email': 'test@email.com',
				'date': '2020-01-15',
				'status': 'PREPARED'
			})
			.end((err, res) => {
				res.status.should.be.equal(500);
				res.body.success.should.equal(false); // threw error
				done();
			});
	});
});

describe('POST /orders', function () {
	it('Orders with smaller quantities passes', function (done) {
		request(app)
			.post('/orders')
			.send({
				'inventories': [
					{
						'inventory': inv_id_1,
						'quantity': '1'
					}
				],
				'email': 'test@email.com',
				'date': '2020-01-15',
				'status': 'PREPARED'
			})
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
			});
		request(app)
			.post('/orders')
			.send({
				'inventories': [
					{
						'inventory': inv_id_1,
						'quantity': '2'
					},
					{
						'inventory': inv_id_2,
						'quantity': '3'
					}
				],
				'email': 'test@email.com',
				'date': '2020-01-15',
				'status': 'PREPARED'
			})
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
				done();
			});
	});
});

describe('GET /orders', function () {
	it('Should have several orders now', function (done) {
		request(app)
			.get('/orders')
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
				ord_id_1 = res.body.orders[0]._id;
				ord_id_2 = res.body.orders[1]._id;
				res.body.orders[0].inventories[0].inventory.should.equal(inv_id_1);
				res.body.orders[0].email.should.equal('test@email.com');
				res.body.orders[0].date.should.equal('2020-01-15T00:00:00.000Z');
				res.body.orders[0].status.should.equal('PREPARED');
				done();
			});
	});
});

describe('PUT /orders', function () {
	it('Updated order status of first order', function (done) {
		request(app)
			.put('/orders/' + ord_id_1)
			.send({
				'inventories': [
					{
						'inventory': inv_id_1,
						'quantity': '1'
					}
				],
				'email': 'test@email.com',
				'date': '2020-01-15',
				'status': 'SHIPPED'
			})
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
				done();
			});
	});
});

describe('GET /orders', function () {
	it('Get single order, and status should be SHIPPED', function (done) {
		request(app)
			.get('/orders/' + ord_id_1)
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
				res.body.order.inventories[0].inventory.should.equal(inv_id_1);
				res.body.order.email.should.equal('test@email.com');
				res.body.order.date.should.equal('2020-01-15T00:00:00.000Z');
				res.body.order.status.should.equal('SHIPPED');
				done();
			});
	});
});

describe('DELETE /orders', function () {
	it('Deleted all orders from database', function (done) {
		request(app)
			.delete('/orders/' + ord_id_1)
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
			});
		request(app)
			.delete('/orders/' + ord_id_2)
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
				done();
			});

	});
});

describe('GET /orders', function () {
	it('Should be an empty database with no orders again', function (done) {
		request(app)
			.get('/orders')
			.end((err, res) => {
				res.body.success.should.equal(true); // response came back successfully
				res.body.orders.should.be.empty; // no orders
				done();
			});
	});
});

describe('PUT /orders', function () {
	it('Test update a non-existing inventory', function (done) {
		request(app)
			.put('/orders/' + ord_id_1)
			.send({
				'inventories': [
					{
						'inventory': inv_id_1,
						'quantity': '1'
					}
				],
				'email': 'test@email.com',
				'date': '2020-01-15',
				'status': 'SHIPPED'
			})
			.end((err, res) => {
				res.body.success.should.equal(false); // response came back successfully
				done();
			});
	});
});