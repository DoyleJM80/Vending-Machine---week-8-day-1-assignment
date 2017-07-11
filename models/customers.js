const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
  item: String,
  quantity: Number,
  cost: Number,
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
