var config = require('../config.json');
var express = require('express');
var router = express.Router();
const Alpaca = require('@alpacahq/alpaca-trade-api')
const alpaca = new Alpaca({
    keyId: config.ALPACAKEYID,
    secretKey: config.ALPACASECRETKEY,
    paper: true,
})

router.get('/all', function (req, res, next) {
    (async () => {
        console.log("begun");
        await alpaca.getAssets({}).then(result => {
            res.send('result: ' + JSON.stringify(result));
        });
        console.log("done");
    })();
});

router.get('/buy', function (req, res, next) {
    res.send('you bought a share GZ');
});

module.exports = router;