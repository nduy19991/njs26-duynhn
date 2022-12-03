var express = require('express');
var router = express.Router();
const products = require('../data/products.json')

router.get('/', function(req, res, next) {
  res.send(products)
});

router.get('/:Id', function(req, res, next) {
    const id = parseInt(req.params.Id);

    const found = products.find((x) => {
      return x.Id === id;
    });

    if (found) {
      res.send(found);
      return;
    }
    res.status(404).send({message: 'Products not found'});
});

router.post('/', function(req, res, next) {
  res.send(products);
});

module.exports = router;
