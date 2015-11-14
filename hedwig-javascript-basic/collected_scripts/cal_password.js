// https://gist.github.com/abcdabcd987/5b098de6545a9c1d0b62

// See: http://stackoverflow.com/questions/17218089/salt-and-hash-using-pbkdf2
// See: https://crackstation.net/hashing-security.htm

'use strict'

let Promise= require('bluebird');
let crypto = require('crypto');

function calPassword(password){
	const RANDOM_BYTES=64;
	const ITERATIONS=1<<4;
	const ALGORITHM='sha256';
	return new Promise((fulfill,reject)=>{
		crypto.randomBytes(RANDOM_BYTES,(err,bytes)=>{
			if (err) return reject(err);
			const salt = bytes.toString('hex');
			crypto.pbkdf2(password,salt, ITERATIONS, 64, ALGORITHM,(err, key) => {
                if (err) return reject(err);
                const hash = key.toString('hex');
                fulfill(`${ALGORITHM}:${ITERATIONS}:${salt}:${hash}`);
            });
		});	
	});
}
