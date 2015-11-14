/**
 * Created by patrick on 15/7/24.
 */
var express = require('express');
var util =require('utility');

var app=express();
app.listen(3000,function(){
  console.log('start server at Port: 3000')
});

app.get('/',function(req,res){
    var q = req.query.q;
    var md5Value = util.md5(q);
    res.send("the result:"+md5Value);
});
