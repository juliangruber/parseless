var should = require('should');
var parse = require('../index');

describe('parse', function() {
  describe('module', function() {
    it('should export a function', function() {
      parse.should.be.an.instanceOf(Function);
    });
    it('should always return an object', function() {
      parse('').should.be.an.instanceOf(Object);
    });
  });
  describe('tree', function() {
    it('should return a valid tree', function() {
      var tree = parse('');
      tree.should.be.an.instanceOf(Object);
      tree.data.should.equal('');
      tree.children.should.be.an.instanceOf(Array);
      tree.parent.should.equal(tree);
      tree.type.should.equal('block');
      tree.children.should.not.be.empty;
      var node = tree.children[0];
      node.should.be.an.instanceOf(Object);
      node.parent.should.equal(tree);
      node.data.should.equal('');
      node.children.should.be.an.instanceOf(Array);
      node.children.should.be.empty;
      node.type.should.equal('attribute');
    });
  });
  describe('attribute', function() {
    it('should parse a single attribute', function() {
      var tree = parse('foo: bar;')
      tree.children.should.not.be.empty;
      var node = tree.children[0];
      node.data.should.equal('foo: bar');
      node.type.should.equal('attribute');
      node.children.should.be.empty;
    });
    it('should parse multiple attributes on a single line', function() {
      var tree = parse(
        'foo: bar;'+
        'beep: boop'
      );
      tree.children.should.have.length(2);
      var node = tree.children[1];
      node.data.should.equal('beep: boop');
      node.type.should.equal('attribute');
      node.children.should.be.empty;
    });
    it('should parse multiple attributes on multiple lines', function() {
      var tree = parse(
        'foo: bar;\n'+
        'beep: boop'
      );
      tree.children.should.have.length(2);
      var node = tree.children[1];
      node.data.should.equal('beep: boop');
      node.type.should.equal('attribute');
      node.children.should.be.empty;
    });
  });
  describe('block', function() {
    it('should parse a single block', function() {
      var tree = parse('foo { bar: baz }');
      tree.children.should.not.be.empty;
      var node = tree.children[0];
      node.data.should.equal('foo');
      node.children.should.not.be.empty;
      var attribute = node.children[0];
      attribute.data.should.equal('bar: baz');
      attribute.type.should.equal('attribute');
    });
    it('should parse multiple blocks', function() {
      var tree = parse(
        'foo { bar: baz }\n'+
        'baz { bar: foo }'
      );
      tree.children.should.have.length(2);
      var node = tree.children[1];
      node.data.should.equal('baz');
      node.children.should.not.be.empty;
      var attribute = node.children[0];
      attribute.data.should.equal('bar: foo');
      attribute.type.should.equal('attribute');
    });
    it('should parse nested blocks', function() {
      var tree = parse(
        'foo {\n'+
          'bar { baz: boz }\n'+
        '}'
      );
      tree.children.should.not.be.empty;
      var node = tree.children[0];
      node.data.should.equal('foo');
      node.type.should.equal('block');
      node.children.should.not.be.empty;
      var child = node.children[0];
      child.data.should.equal('bar');
      child.type.should.equal('block');
      child.children.should.not.be.empty;
      var attribute = child.children[0];
      attribute.data.should.equal('baz: boz');
      attribute.type.should.equal('attribute');
    });
  });
});