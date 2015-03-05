/**
 * Created by patrick on 15/3/3.
 */

var express = require('express');
var app = express();

app.get('/hello',function(req,res){
   res.send("Hello World!");
});

var server = app.listen(3000,function(){
    console.log('listening on port %d',server.address().port)
})