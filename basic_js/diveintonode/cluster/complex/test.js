/**
 * Created by patrick on 15/12/27.
 */
var falafel = require('falafel');

var src = '(' + function () {
        var xs = [ 1, 2, [ 3, 4 ] ];
        var ys = [ 5, 6 ];
        console.dir([ xs, ys ]);
    } + ')()';

var output = falafel(src, function (node) {
    if (node.type === 'ArrayExpression') {
        node.update('fn(' + node.source() + ')');
    }
});
console.log(output);
