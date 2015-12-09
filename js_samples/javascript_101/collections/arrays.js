/**
 * Created by patrick on 15/8/30.
 */

var numers =[1,2,3,4,5,6,7,8]

var test ={
    logs:["test"]
}

console.log(test.logs.length)
function length(data,indicator){
    if(!data.hasOwnProperty(indicator)){
        return 0;
    }else{
        return data[indicator].length
    }
}
console.log(length(test,"logs"));
console.log(length(test,"log"));
console.log(test["tst"])