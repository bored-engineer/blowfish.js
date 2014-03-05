blowfish.js
===========

Please visit [the blowfish.js home page](http://dren.ch/js_blowfish/) for more information.

```
  var Blowfish = require('./blowfish');
  var bf = new Blowfish('jaas is the way');
  var encoding = bf.encrypt('Config_RsA+');

  console.log(encoding);

  var decoding = bf.decrypt(encoding);

  console.log(JSON.stringify(decoding));
  console.log(bf.decrypt('0a945741a53e60877183c1d314f5102209f526570957572b'));
```
