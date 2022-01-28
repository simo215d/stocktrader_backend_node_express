var config = require('../config.json');
var express = require('express');
var router = express.Router();
const Alpaca = require('@alpacahq/alpaca-trade-api')
const alpaca = new Alpaca({
  keyId: config.ALPACAKEYID,
  secretKey: config.ALPACASECRETKEY,
  paper: true,
})

/* GET user listing. */
router.get('/', function (req, res, next) {
  alpaca.getAccount().then((account) => {
    res.send('account: ' + JSON.stringify(account));
  });
});

module.exports = router;