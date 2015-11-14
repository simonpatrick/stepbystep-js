/**
 * Created by patrick on 15/6/21.
 */

var x = 'x';
var y = 'I am private';
var z = true;

function sum(n1,n2){
    return n1+n2;
}

var self = module.exports={
    someProperty: 'I am public',
    addFive: function addFive(num){
        return num+5;
    },
    toggleZ: function toggleZ(){
        return z = !z;
    }
};


