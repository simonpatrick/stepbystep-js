/**
 * Created by patrick on 15/8/8.
 */
require("cloud/app.js");

//use AV.cloud.define to define as many cloud funtion

AV.cloud.define("hello",function(request,response){
  response.success("Hello World");
});
