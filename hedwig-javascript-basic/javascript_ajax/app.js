/**
 * Created by patrick on 15/10/1.
 */

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
//json body
app.use(bodyParser.json());
//query string
app.use(bodyParser.urlencoded({
    extended: false
}));

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//routers
app.use('/keyword',require('./routes/keyword.js'))

var DEFAULT_PORT =8090;
app.listen(DEFAULT_PORT,function(){
    console.log('express server is started ......');
});

