/**
 * Created by patrick on 15/6/21.
 */
process.nextTick(function(){
   console.log('lazy execution');
});

console.log('normal execution');