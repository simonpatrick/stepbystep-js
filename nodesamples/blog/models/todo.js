/**
 * Created by patrick on 15/8/7.
 */
var mongoose =require('mongoose');
var config = require('../config');
var Schema = mongoose.Schema;

var TodoSchema= new Schema({
    year: { type: Number, require: true },
    month: { type: Number, require: true },
    day: { type: Number, require: true },
    hour: { type: Number, default: 0 },
    minute: { type: Number, default: 0 },
    second: { type: Number, default: 0 },
    //正文
    text: { type: String, require: true },
    //是否已完成
    isdone: { type: Boolean, require: true, default: false },
    //完成时间
    donetime: { type: String }
});

TodoSchema.methods.saveTodo=function(callback){
    var todo=this;
    todo.save(function(err,user){
        callback(err,user);
    });
}

TodoSchema.statics.deleteTodoById=function(id,callback){
    this.findOneAndRemove({_id:id},function(err,data){
        callback(err,data);
    });
}

TodoSchema.statics.getAllTodo=function(callback){
    this.find({isdone:false},{_v:0},function(err,data){
        callback(err,data);
    });
}

TodoSchema.statics.doneTodoById = function(id,callback){
    this.update({_id:id},{$set:{isdone:true,
        donetime: new Date().toLocaleString()}},function(err,data){
        callback(err,data);
    });
}

TodoSchema.statics.getDonetodo = function (skip, limit, callback) {
    this.find({}, { __v: 0 }).sort({donetime:-1}).skip(skip).limit(limit).find(function (err, data) {
        callback(err, data);
    });
}


mongoose.model('Todo', TodoSchema);
