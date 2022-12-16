var express = require('express');
var router = express.Router();
var { write } = require('../helpers/fileHelper');

const suppliers = require('../data/suppliers.json');
const fileName = './data/suppliers.json';
const nanoid = require('nanoid');

/* GET */
router.get('/', function (req, res, next) {
  res.send(suppliers);
});

/* GET (PARAMS) */
router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  const found = suppliers.find((p) => {
    return p.id == id;
  });

  if (!found) {
    return res.status(404).json({ message: 'Not Found Suppliers' });
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
  suppliers.push(data);

  // Save to file
  write(fileName, suppliers);

  res.sendStatus(201).json({ message: 'Successfully Create' });
});

/* PATCH */
router.patch('/:id', function (req, res, next) {
  const { id } = req.params;
  const data = req.body;
  console.log('Data : ', data);

  // Tìm data để sửa
  let found = suppliers.find((p) => {
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
    write(fileName, suppliers);

    // database
    //  code here ...

    return res.sendStatus(200).json({ message: 'Successfully Updated' });
  }

  return res.status(404).json({ message: 'Not Found Supplier' });
});

/* DELETE (PARAMS) */
router.delete('/:id', function (req, res, next) {
  const { id } = req.params;
  const found = suppliers.find((p) => {
    return p.id == id;});

  if (!found) {
    return res.status(404).json({ message: 'Not Found Supplier' });
  }

  let remainData = suppliers.filter((p) => {
    return p.id != id;
  });

  // Save to file
  write(fileName, remainData);

  res.sendStatus(200).json({ message: 'Successfully Delete' });
});

module.exports = router;
