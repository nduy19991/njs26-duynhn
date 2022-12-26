const { default: mongoose } = require("mongoose");
const { Employee } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/Test");

try {
  const data = {
    firstName: "Mr",
    lastName: "Culy",
    email: "culy@gmail.com",
    phoneNumber: "0905528944",
    address: "19 Quang Trung, Quan Hai Chau, Da Nang",
    birthday: 17 - 05 - 1994,
  };

  const newItem = new Employee(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
