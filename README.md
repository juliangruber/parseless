parseless
=========

Usage
-----

```bash
$ npm install parseless
```

```javascript
var parse = require('parseless');

parse('foo: bar;')
/*
  => 
  
  {
    data: '',
    children: [
      {
        parent: [Circular],
        data: 'foo: bar',
        children: [],
        type: 'attribute'
      }
    ],
    parent: [Circular],
    type: 'block'
  }

*/
```