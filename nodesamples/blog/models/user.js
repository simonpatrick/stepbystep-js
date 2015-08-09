/**
 * Created by patrick on 15/8/7.
 */
var mongoose = require('mongoose');
var config=require("../config");
var crypto = require("crypto");
var Schema = mongoose.Schema;


//账户模型，id，用户名，密码(加密过),key(明文加key可成唯一对应的密码)
var UserSchema = new Schema({
    id:{ type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    email: { type: String, required: true, unique: true }
});


/*-----------------------------模型方法-------------------------------------*/
//在保存密码的的时候进行加密
UserSchema.pre('save', function (next) {
    var user = this;
    var shasum = crypto.createHmac(config.crypto, config.passkey);
    shasum.update(user.password);
    var dpass = shasum.digest('hex');
    user.password = dpass;
    next();
});