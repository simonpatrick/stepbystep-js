/**
 * Created by patrick on 15/3/8.
 */

var express = require('express');
var utility = require('utility');

var app = express();

app.get('/',function(req,res){
    var q = req.query.q;
    console.log("q="+q);
    var md5Value ="";
    if(q!=undefined){
        md5Value = utility.md5(q);
    }
    res.send(md5Value);
});

app.listen(3000,function(req,res){
   console.log('app is running in localhost:3000');
});