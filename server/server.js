const express = require('express'); // access HTTP requests (GET, POST, UPDATE, DELETE)
const morgan = require('morgan'); // log all HTTP requests and display request in terminal
const bodyParser = require('body-parser'); // gets data from frontend and parse into correct format
const mongoose = require('mongoose'); // access mongoDB database

const app = express();

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb+srv://root:H2eMEsO9VjmCkMn6@customer-order-wfega.mongodb.net/test?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	err => {
		if (err) {
			console.log(err);
		} else {
			console.log('Connected to database.');
		}
	}
);

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// require APIs
const inventoryRoutes = require('./routes/inventory');
app.use('/', inventoryRoutes);
const orderRoutes = require('./routes/order');
app.use('/', orderRoutes);

app.listen(3000, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Listening on PORT', 3000);
	}
});

module.exports = app;