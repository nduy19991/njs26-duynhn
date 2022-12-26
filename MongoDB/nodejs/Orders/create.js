const { default: mongoose } = require("mongoose");

const { Order } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/Test");

try {
  const data = {
    paymentType: "CASH",
    status: "WAITING",
    shippedDate: 29 - 12 - 2022,
    createdDate: 26 - 12 - 2022,
    customerId: '63a9a07fb39eaf454486a1eb',
    employeeId: '63a9a0fbdd756ed8231907d8',
    orderDetails: {
      productId: "63a95c10033af03d00de2149",
      quantity: 2,
      price: 29999,
      discount: 50,
    },
  };

  const newItem = new Order(data);
  newItem.save().then((result) => {
    console.log(result);
  });
} catch (err) {
  console.log(err);
}
