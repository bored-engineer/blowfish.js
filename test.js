var Blowfish = require('./blowfish');

var bf = new Blowfish('jaas is the way');

var encoding = bf.encrypt('Config_RsA+');
console.log('`Config_RsA+` => ', encoding);
var decoding = bf.decrypt(encoding);
console.log('decoding => ', JSON.stringify(decoding));

var encoding = bf.encrypt('test1234');
console.log('`test1234` => ', encoding);
var decoding = bf.decrypt(encoding);
console.log('decoding => ', JSON.stringify(decoding));

console.log('0a945741a53e60877183c1d314f5102209f526570957572b => ', JSON.stringify(bf.decrypt('0a945741a53e60877183c1d314f5102209f526570957572b')));