/**
 * Created by patrick on 15/8/23.
 */

var express =require('express');
var app =express();

app.set('view engine','ejs');

app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
   res.render('pad');
});

app.get('/(:id)',function(req,res){
   res.render('pad');
});

var sharejs = require('share');
var redisClient =require('redis').createClient();

var options={
    db:{type:'redis',client:redisClient}
};

sharejs.server.attach(app,options);

var port=process.env.PORT||8000;
app.listen(port,function(){
   console.log("the server is running at port:8000");
});