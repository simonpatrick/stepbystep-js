/**
 * Created by patrick on 15/8/6.
 */

const colors= ['red','color','green','blue']

const colorGenerator = function*(){
    for (let color of colors){
        yield color;
    }
}

let generator = colorGenerator();

for(let item of generator){
    conosle.log(item);
}