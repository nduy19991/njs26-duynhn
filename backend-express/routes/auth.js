var express = require('express');
var router = express.Router();

router.post('login', function(req, res, next) {
    const { account, password} = req.body;

    if (account === 'admin' && password === 'admin') {
    res.send({ ok: true});
    }
    res.status(401).send({ ok: false})
});
module.exports = router