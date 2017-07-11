const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const Customer = require('./models/customers');
mongoose.Promise = require('bluebird');


const app = express();

const nodeEnv = process.env.NODE_ENV || "development";
const config = require('./config.json')[nodeEnv];



app.use('/static', express.static('static'));
app.set('views', './views');

app.use(bodyParser.json());
mongoose.connect(config.mongoURL);
app.use(bodyParser.urlencoded({extended: false}));

app.get('/api/sanity', (req, res) => {
  res.json({hello: 'hello'});
});

app.get('/api/customer/items', (req, res) => {
  Customer.find({}).then((customers) => {
    res.json(customers);
  });
});

app.listen(3000, function() {
  console.log('listening');
});

module.exports = app;


// GET /api/customer/items - get a list of items
// POST /api/customer/items/:itemId/purchases - purchase an item
// GET /api/vendor/purchases - get a list of all purchases with their item and date/time
// GET /api/vendor/money - get a total amount of money accepted by the machine
// POST /api/vendor/items - add a new item not previously existing in the machine
// PUT /api/vendor/items/:itemId - update item quantity, description, and cost
