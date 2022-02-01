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
    res.send(JSON.stringify(account));
  });
});

router.get('/positions', function (req, res, next) {
  //returns array of positions
  alpaca.getPositions().then((positions) => {
    res.send(JSON.stringify(positions));
  });
});

module.exports = router;