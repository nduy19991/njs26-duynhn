const { default: mongoose } = require('mongoose');

const { Supplier } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://127.0.0.1:27017/Test');

try {
  const data = {
    name: 'Apple',
    email: 'nduy19991@gmail.com',
    phoneNumber: '0905528944',
    address:'38 Yên Bái' ,
  };

  const newItem = new Supplier(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
