const { default: mongoose } = require("mongoose");
const { Customer } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/Test");

try {
  const data = {
    firstName: "Nguyen",
    lastName: "Duy",
    email: "nduy19991@gmail.com",
    phoneNumber: "0905528944",
    address: "38 Yen Bai, Quan Hai Chau, Da Nang",
    birthday: 24 - 09 - 2000,
  };

  const newItem = new Customer(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
