var express=require("express");
var cheerio =require('cheerio');
var superagent=require('superagent');

var app = express();

app.get("/",function(req,res){
  var q = req.query.q;
  res.send('query='+q);
});

app.get("/crawl",function(req,res,next){
  superagent.get('http://www.xueqiu.com').end(function(err,data){
    if(err){
      return next(err);
    }
    var $=cheerio.load(data,text);
    var items=[];
    $('#topic_list .topic_title').each(function(idx,element){
      var $element=$(element);
      items.push({
        title:$element.attr('title'),
        href:$element.attr('href')
      });
    });
    res.send(items);
  });
});

app.listen(3000,function(req,res){
  console.log('app is running at port 3000')
});