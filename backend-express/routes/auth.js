var express = require('express');
var router = express.Router();
const yup = require('yup');
var {validateSchema} = require('../validations/validateSchema');

const loginSchema =yup.object({
    body: yup.object({
        email: yup.string().email('Nhap dung dinh dang email').required('Vui lòng nhap email'),
        password: yup.string().min(3, 'Nhap toi thieu 3 ky tu').max(31, 'Da vuot qua so ky tu cho phep').required('Vui lòng nhap mat khau'),
    }),
    params: yup.object({}),
});

router.post('/login', validateSchema(loginSchema), function(req, res, next) {
    const { email, password} = req.body;

    if (email === 'nduy19991@gmail.com' && password === 'nduy1991') {
    res.send({ message: 'Dang nhap thanh cong' });
    }
    res.status(401).send({ message: 'Sai tai khoan hoac mat khau' })
});
module.exports = router