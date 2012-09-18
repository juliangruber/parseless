parseless
=========

Aims:

* be unobstrusive. the full less/css code should be recreatable from the ast
* preserver inline comments
* add multiline comments as full nodes
* don't parse everything. `foo: bar` is nothing more than an attribute-node

Usage
-----

```bash
$ npm install parseless
```

```javascript
var parse = require('parseless');

parse('foo: bar;')

/*
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

License
-------

(MIT)

Copyright (c) 2012 &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.