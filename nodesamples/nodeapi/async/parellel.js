/**
 * Created by patrick on 15/6/13.
 */
var fs =require('fs');
var async=require('async');

async.parellel([
    function(callback){
        fs.readFile('file1.txt','utf-8');
    },
    function(callback){
        fs.readFile('file2.txt','utf-8')
    }
],function(err,results){
    console.log(results);
})