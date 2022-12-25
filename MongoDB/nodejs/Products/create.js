const { default: mongoose } = require('mongoose');

const { Product } = require('../models');
// MONGOOSE
mongoose.connect('mongodb://127.0.0.1:27017/Test');

try {
  const data = {
    name: 'Áo sơ mi',
    price: 200,
    stock: 100,
    discount: 0,
    categoryId: '63a558a0e282d4d7944dabb7',
    supplierId: '63a564944573bc5f7dd8672f',
  };

  const newItem = new Product(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
