var config = require('../config.json');
var express = require('express');
var router = express.Router();
const Alpaca = require('@alpacahq/alpaca-trade-api')
const alpaca = new Alpaca({
    keyId: config.ALPACAKEYID,
    secretKey: config.ALPACASECRETKEY,
    paper: true,
})

router.get('/', function (req, res, next) {
    //expected query: {symbol: 'msft'}
    alpaca.getAsset(req.query.symbol.toUpperCase()).then((asset) => {
        res.send('asset:' + JSON.stringify(asset));
    }).catch(error => res.send('error'));
});

router.get('/all', function (req, res, next) {
    (async () => {
        await alpaca.getAssets({}).then(result => {
            res.send('result: ' + JSON.stringify(result));
        });
    })();
});

router.get('/order', function (req, res, next) {
    //expected query: stocks/order?symbol=MSFT&qty=1&side=buy&type=market&time_in_force=day
    console.log(req.query)
    alpaca.createOrder(req.query).then((order) => {
        res.send('order:' + JSON.stringify(order));
    }).catch(error => res.send('error: ' + error));
});

module.exports = router;