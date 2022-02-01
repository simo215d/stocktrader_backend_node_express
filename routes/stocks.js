var config = require('../config.json');
const moment = require("moment");
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
        res.send(JSON.stringify(asset));
    }).catch(error => res.sendStatus(500));
});

router.get('/price', async function (req, res, next) {
    //expected query: {symbol: 'msft'}
    let symbol = req.query.symbol.toUpperCase();
    //todo btw if this returns fail the BREAKS. .then evaluation implement?
    let bars = alpaca.getBarsV2(symbol, {
            start: moment().subtract(7, "days").format(),
            end: moment().subtract(20, "minutes").format(),
            timeframe: "1Day",
        },
        alpaca.configuration);
    const barset = [];

    for await (let b of bars) {
        barset.push(b);
    }
    const week_close = barset.slice(-1)[0].ClosePrice;
    console.log("price: " + week_close);
    res.send(week_close + "");
});

router.get('/all', function (req, res, next) {
    (async () => {
        await alpaca.getAssets({}).then(result => {
            res.send('result: ' + JSON.stringify(result));
        });
    })();
});

router.post('/order', function (req, res, next) {
    //expected query: stocks/order?symbol=MSFT&qty=1&side=buy&type=market&time_in_force=day
    console.log("body: " + JSON.stringify(req.body))
    alpaca.createOrder(req.body).then((order) => {
        console.log("successfully traded stonk");
        res.sendStatus(200);
        //res.send('order:' + JSON.stringify(order));
    }).catch(error => {
        res.sendStatus(500);
        //res.send('error: ' + error)
    });
});

module.exports = router;