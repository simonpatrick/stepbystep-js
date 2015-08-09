/**
 * Created by patrick on 15/8/8.
 */
var express = require('express')
var app = express()

//global configuration
app.set('views','cloud/views');
app.set('view engine','ejs');
app.use(express.bodyParser());

app.get('/hello',function(req,res){
  res.render('hello',{message:'Congrats,you just create an app'})
});

app.listen("9010",function(){
  console.log('app started.......')
});
