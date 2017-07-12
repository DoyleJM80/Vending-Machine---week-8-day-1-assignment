const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const Customer = require('./models/customers');
const Vendor = require('./models/vendors');
mongoose.Promise = require('bluebird');

const app = express();

const nodeEnv = process.env.NODE_ENV || "development";
const config = require('./config.json')[nodeEnv];

app.use('/static', express.static('static'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
mongoose.connect(config.mongoURL);

// API ENDPOINTS
// render index page with all vending machine items available
app.get('/api/vendor/money', (req, res) => {
  Vendor.find({}).then((items) => {
    let total = 0;
    console.log(total);
    for (var i = 0; i < items.length; i++) {
      total += items[i].totalCost;
    }
    res.json(total);
  });
});

app.get('/api/vendor/purchases', (req, res) => {
  Vendor.find({}).then((vendors) => {
    res.json(vendors);
  });
});

app.get('/api/customer/items', (req, res) => {
  Customer.find({}).then((customers) => {
    res.json(customers);
  });
});

app.post('/api/vendor/items', (req, res) => {
  const newCustomer = new Customer(req.body).save().then((item) => {
    res.status(201).json({});
  });
});

app.get('/api/sanity', (req, res) => {
  res.json({hello: 'hello'});
});

app.listen(3000, () => {
  console.log('listening');
});

module.exports = app;


// POST /api/customer/items/:itemId/purchases - purchase an item
// GET /api/vendor/money - get a total amount of money accepted by the machine
// --POST /api/vendor/items - add a new item not previously existing in the machine
// PUT /api/vendor/items/:itemId - update item quantity, description, and cost

// -----DONE
// GET /api/customer/items - get a list of items
// GET /api/vendor/purchases - get a list of all purchases with their item and date/time
