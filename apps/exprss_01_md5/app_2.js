/**
 * Created by patrick on 15/7/24.
 */
var express = require('express');
var cheerio=require('cheerio');
var superagent= require('superagent');

var app =express();
app.listen(3000,function(){
  console.log("server start at Port: 30000")
});

app.get('/',function(req,res,next){
  var items=[];
  superagent.get('https://www.cnodejs.org').end(function(err,sres){
    if(err){
      console.log("error is"+err)
      return next(err);
    }

    console.log(sres.text);
    var $ = cheerio.load(sres.text);
    $("a.topic_title").each(function(i,element){
      items.push({
        'href':$(element).attr('href'),
        'title':$(element).attr('title')
      });
    });

    res.send(items);
  });
});
