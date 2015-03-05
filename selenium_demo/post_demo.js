/**
 * Created by patrick on 15/3/4.
 */
var http = require('http');
assert = require('assert');

var opts ={
    host:'localhost',
    port: 9000,
    path:'/postdemo',
    method:'POST',
    headers:{'content-type':'application/x-www-form-urlencoded'}
}

var req = http.request(opts,function(res){
   res.setEncoding('utf8');

    var data ="";
    res.on('data',function(d){
       data+=d;
    });

    res.on('end',function(){
       assert.strictEqual(data,'{"status::"ok","message":"received message"}');
    });
});

req.write('message=test');
req.end();