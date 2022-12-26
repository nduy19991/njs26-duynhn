var express = require('express');
var router = express.Router();
var { write } = require('../helpers/fileHelper');

const products = require('../data/products.json');
const fileName = './data/products.json';
const nanoid = require('nanoid');

/* GET */
router.get('/', function (req, res, next) {
  res.send(products);
});

/* GET (PARAMS) */
router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  const found = products.find((p) => {
    return p.id == id;
  });

  if (!found) {
    return res.status(404).json({ message: 'Not Found Products' });
  }

  res.send(found);
});

// GET (MANY PARAMS)
// router.get('/:id/:name/search/:price', function (req, res, next) {
//   const { id, name } = req.params;
//   // const id = req.params.id;
//   // const name = req.params.name;
//   // const price = req.params.price;
//   res.send('OK');
// });

/* POST */
router.post('/', function (req, res, next) {
  const data = req.body;

  data.id = nanoid()
  console.log('Data : ', data);
  products.push(data);

  // Save to file
  write(fileName, products);

  res.sendStatus(201).json({ message: 'Product Successfully Create' });
});

/* PATCH */
router.patch('/:id', function (req, res, next) {
  const { id } = req.params;
  const data = req.body;
  console.log('Data : ', data);

  // Tìm data để sửa
  let found = products.find((p) => {
    return p.id == id;
  });

  if (found) {
    // Cập nhật data gì?
    for (let x in found) {
      if (data[x]) {
        found[x] = data[x];
      }
    }

    // Save to file
    write(fileName, products);

    // database
    //  code here ...

    return res.sendStatus(200).json({ message: 'Product Successfully Updated' });
  }

  return res.status(404).json({ message: 'Not Found Product' });
});

/* DELETE (PARAMS) */
router.delete('/:id', function (req, res, next) {
  const { id } = req.params;
  const found = products.find((p) => {
    return p.id == id;
  });

  if (!found) {
    return res.status(404).json({ message: 'Not Found Product' });
  }

  let remainData = products.filter((p) => {
    return p.id != id;
  });

  // Save to file
  write(fileName, remainData);

  res.sendStatus(200).json({ message: 'Product Successfully Delete' });
});

module.exports = router;
