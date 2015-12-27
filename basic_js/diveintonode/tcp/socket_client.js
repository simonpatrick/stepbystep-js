/**
 * Created by patrick on 15/12/27.
 */
var net = require('net');
var client = net.connect({port: 1337}, function () { //'connect' listener
    console.log('client connected');
    client.write('world!\r\n');
});

client.on('data', function (data) {
    console.log(data.toString());
    client.end();
});

client.on('end', function () {
    console.log('client disconnected');
});
