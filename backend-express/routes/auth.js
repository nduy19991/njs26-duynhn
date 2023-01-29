var express = require("express");
var router = express.Router();
const yup = require("yup");
var { validateSchema } = require("../validations/validateSchema");
var passport = require("passport");
var jwt = require('jsonwebtoken');
const jwtSettings = require('../constants/jwtSettings');
const loginSchema = yup.object({
  body: yup.object({
    email: yup
      .string()
      .email("Nhap dung dinh dang email")
      .required("Vui lòng nhap email"),
    password: yup
      .string()
      .min(3, "Nhap toi thieu 3 ky tu")
      .max(31, "Da vuot qua so ky tu cho phep")
      .required("Vui lòng nhap mat khau"),
  }),
  params: yup.object({}),
});

router.post("/login", validateSchema(loginSchema), function (req, res, next) {
  const { email, password } = req.body;

  if (email === "nduy19991@gmail.com" && password === "nduy1991") {
    res.send({ message: "Dang nhap thanh cong" });
    s;
  }
  res.status(401).send({ message: "Sai tai khoan hoac mat khau" });
});

router.post("/login-jwt", validateSchema(loginSchema), function (req, res, next) {
    const { email, password } = req.body;

    // const found = findDocuments({
    //   query: {
    //     email: email,
    //     password: password,
    //   }
    // }, 'login');

    // console.log(found);

    if (email === "nduy19991@gmail.com" && password === "nduy1991") {
      var payload = {
        user: {
          email: email,
          fullName: "End User",
        },
        application: "ecommerce",
      };

    var secret = jwtSettings.SECRET;
    var token = jwt.sign(payload, secret, {
      expiresIn: 24 * 60 * 60, // expires in 24 hours (24 x 60 x 60)
      audience: jwtSettings.AUDIENCE,
      issuer: jwtSettings.ISSUER,
      subject: email, // Thường dùng để kiểm tra JWT lần sau
      algorithm: 'HS512',
    });

      res.send({ message: "Dang nhap thanh cong", token : token });
      s;
    }
    res.status(401).send({ message: "Sai tai khoan hoac mat khau" });
  }
);

router.get("/jwt", passport.authenticate("jwt", { session: false }), function (req, res, next) {
    res.send({ message: "true" });
  }
);

module.exports = router;
