var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var accountRouter = require('./routes/account');
var stocksRouter = require('./routes/stocks');

var app = express();

//preflight options request is send to check if server accepts CORS then the post request is send
//true allow all origins?
app.use(cors({
    origin: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/stocks', stocksRouter);

module.exports = app;