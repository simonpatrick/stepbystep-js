/**
 * Created by patrick on 15/8/7.
 */
var mongoose =require('mongoose')
var config = require('../config')
mongoose.connect(config.db,function(err){
    if(err){
        console.error('connect to %s error',config.db,err.message);
        process.exit(1);
    }
});

require("./user")
require("./todo")

exports.User=mongoose.model("User");
exports.User=mongoose.model("Todo");