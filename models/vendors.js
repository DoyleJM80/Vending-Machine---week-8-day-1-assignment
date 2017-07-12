const mongoose = require('mongoose');
const vendorSchema = new mongoose.Schema({
  item: String,
  quantity: Number,
  totalCost: Number,
  purchasedTime: {
      type: Date,
      default: Date.now
    }
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
