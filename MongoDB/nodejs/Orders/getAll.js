const { default: mongoose } = require('mongoose');

const { Order } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://127.0.0.1:27017/Test'); 

try {
  Order.find({})
    .populate('employee')
    .populate('customer')
    .then((result) => {
      console.log(result);
    });
} catch (err) {
  console.log(err);
}
  