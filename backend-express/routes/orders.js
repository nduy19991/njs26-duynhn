const { CONNECTION_STRING } = require("../constants/dbSettings");
const { default: mongoose } = require('mongoose');

const { Order } = require('../models');
// MONGOOSE
mongoose.set("strictQuery", false);
mongoose.connect(CONNECTION_STRING);

var express = require('express');
var router = express.Router();

/* GET ALL */
router.get('/', function (req, res, next) {
  try {
    Order.find()
      .populate('customer')
      .populate('employee')
      .populate('orderDetails.product')
      .populate('product')
      // .populate({ path: 'orderDetails.product', populate: { path: 'category' } })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

/* GET BY ID */
router.get('/:id', function (req, res, next) {
  try {
    const { id } = req.params;
    Order.findById(id)
      .populate('customer')
      .populate('employee')
      // .populate({ path: 'orderDetails.product', populate: { path: 'category' } })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

/* POST */
router.post('/', function (req, res, next) {
  try {
    const data = req.body;

    const newItem = new Order(data);

    newItem
      .save()
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

// PATCH
router.patch('/:id', function (req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;

    Order.findByIdAndUpdate(id, data, {
      new: true,
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (error) {
    res.sendStatus(500);
  }
});

// DELETE
router.delete('/:id', function (req, res, next) {
  try {
    const { id } = req.params;
    Order.findByIdAndDelete(id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

// ------------------------------------------------------------------------------------------------
// QUESTIONS 7
// ------------------------------------------------------------------------------------------------
// https://www.mongodb.com/docs/manual/reference/operator/query/
// http://localhost:9000/products/questions/1?discount=10
router.get('/questions/7', function (req, res, next) {
  try {
    let status = req.query.status;
    let query = { status: { $lte: status } };
    // address có chứa từ Hải Châu

    Order.find(query)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
