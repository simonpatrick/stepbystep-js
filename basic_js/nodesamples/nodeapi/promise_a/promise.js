/**
 * Created by patrick on 15/6/13.
 */
var EventEmitter =require('events').EventEmitter;

var Deferred = function(){
  this.state='unfulfilled';
  this.promise =new Promise();
};

Deferred.prototype.resolve=function(obj){
  this.state ='fulfilled';
  this.promise.emit('success',obj);
};

Deferred.prototype.reject=function(err){
  this.state='failed';
  this.promise.emit('error',err);
};

Deferred.prototype.progress=function(err){
    this.promise.emit('progress', err);
}

