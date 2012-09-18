module.exports = function(less, debug) {
  var tree = {data:'', children:[]};
  tree.parent = tree;
  var cur = tree.children[0] = {parent:tree, data:'', children:[]};

  var lineBlank = true;
  var skip = false;
  var comment = false;
  var multiComment = false;
  var singleComment = false;
  var newNode = false;
  var newChildNode = false;
  var levelUp = false;
  var attributeEnded = false;
  var blockEnded = false;

  for (var i=0; i<less.length; i++) {
    // multi comment
    if (lineBlank && less[i] == '/' && less[i+1] == '*') {
      if (newNode) {
        cur.parent.children.push({parent:cur.parent.parent, data:'', children:[]});
        cur = cur.parent.children[cur.parent.children.length-1];
        newNode = false;
        if (debug) console.log('newNode');
      }
      comment = true;
      multiComment = true;
      if (debug) console.log('multiComment start');
    }
    if (multiComment && less[i-1] == '/' && less[i-2] == '*') {
      comment = false;
      multiComment = false;
      newNode = true;
      if (debug) console.log('multiComment stop');
    }

    // single comment
    if (!multiComment && (less[i] == '/' && less[i+1] == '/')) {
      singleComment = true;
      comment = true;
      if (!lineBlank) newNode = true;
      if (debug) console.log('singleComment start');
    }
    if (singleComment && (less[i] == '\n' || less[i] == '\r')) {
      singleComment = false;
      comment = false;
      newNode = true;
      if (debug) console.log('singleComment stop');
    }

    // block
    if (!comment && less[i] == '{') {
      skip = true;
      newChildNode = true;
    }
    if (!comment && less[i] == '}') {
      skip = true;
      blockEnded = true;
      newNode = true;
    }
    if (newChildNode) {
      cur.children.push({parent:cur, data:'', children:[]});
      cur = cur.children[cur.children.length-1];
      newChildNode = false;
      if (debug) console.log('child node created');
    }
    if (blockEnded) {
      cur = cur.parent;
      blockEnded = false;
      newNode = true;
      if (debug) console.log('blockEnded');
    }

    // attribute
    if (!comment && less[i] == ';') {
      skip = true;
      newNode = true;
    }

    if (newNode && less[i] != ';' && less[i] != '\r' && less[i] != '\n' && less[i] != '\t' && less[i] != '}' && less[i] != ' ' && (less[i] != '/' || lineBlank)) {
       cur.parent.children.push({parent:cur.parent, data:'', children:[]});
       cur = cur.parent.children[cur.parent.children.length-1];
       newNode = false;
       if (debug) console.log('sibling Node created');
    }

    if (!skip) cur.data += less[i];
    if (debug) console.dir(less[i]);
    skip = false;

    if (lineBlank && less[i] != ' ' && less[i] != '\n' && less[i] != '\t') lineBlank = false;
    if (less[i] == '\n' || less[i] == '\r') lineBlank = true;
  }

  (function annotate(tree) {
    if (tree.data) {
      tree.data = clean(tree.data);
      if (tree.data[0] == '@') tree.type = 'variable';
      if (tree.data.search(/(\/\*|\*\/)/) > -1) tree.type = 'comment';
    }
    if (tree.children && tree.children.length) tree.type = 'block';
    if (!tree.type) tree.type = 'attribute';

    if (!tree.children) return;
    for (var i=0; i<tree.children.length; i++) annotate(tree.children[i]);
  })(tree);

  return tree;
}

function clean(str) {
  return str.replace(/^(\s|\r|\n)+|(\s|\r|\n)+$/g, '');
}