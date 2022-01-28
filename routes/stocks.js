var express = require('express');
var router = express.Router();

router.get('/all', function (req, res, next) {
    res.send('here are stocks: x y z');
});

router.get('/buy', function (req, res, next) {
    res.send('you bought a share GZ');
});

module.exports = router;