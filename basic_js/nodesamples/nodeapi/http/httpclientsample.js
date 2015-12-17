/**
 * Created by patrick on 15/3/5.
 */

var http = require('http');
var opts ={
    host:"www.baidu.com",
    port:80,
    path:"/",
    method:"GET"
};

var req = http.get(opts,function(res){
   console.log(res);
    res.on('data',function(data){
        console.log(data);
    });

    res.on('error',function(data){
       console.log(data);
    });
});
