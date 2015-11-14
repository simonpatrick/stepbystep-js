/**
 * Created by patrick on 15/10/16.
 */

var casper = require('casper').create();
casper.start('http://www.baidu.com',function(){
    this.echo("go to baidu");
}).thenOpen("http://www.baidu.com?q=test")
.run();

