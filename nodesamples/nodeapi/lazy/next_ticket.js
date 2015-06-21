/**
 * Created by patrick on 15/6/13.
 */
process.nextTick(function(){
    console.log('Lazy Execution');
});

console.log('Normal Execution')