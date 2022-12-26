const { default: mongoose } = require('mongoose');

const { Product } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://127.0.0.1:27017/Test');

try {
  const data = {
    name: 'Iphone 14',
    price: 30000,
    stock: 100,
    discount: 15,
    categoryId: '63a558a0e282d4d7944dabb7',
    supplierId: '63a95b19964fbf01cf4f0d15',
  };

  const newItem = new Product(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
