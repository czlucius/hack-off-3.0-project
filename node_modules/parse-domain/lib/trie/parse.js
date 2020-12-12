"use strict";

var characters = require("./characters");

var _require = require("./nodes"),
    createNode = _require.createNode,
    createOrGetChild = _require.createOrGetChild; // Parsing is complex... :)
// eslint-disable-next-line complexity


function parse(serialized) {
  var rootNode = createNode();
  var domain = "";
  var parentNode = rootNode;
  var node;

  function addDomain() {
    node = createOrGetChild(parentNode, domain);
    domain = "";
  }

  for (var i = 0; i < serialized.length; i++) {
    var _char = serialized.charAt(i);

    switch (_char) {
      case characters.SAME:
        {
          addDomain();
          continue;
        }

      case characters.DOWN:
        {
          addDomain();
          parentNode = node;
          continue;
        }

      case characters.RESET:
        {
          addDomain();
          parentNode = rootNode;
          continue;
        }

      case characters.UP:
        {
          addDomain();
          parentNode = parentNode.parent;
          continue;
        }
    }

    domain += _char;
  }

  if (domain !== "") {
    addDomain();
  }

  return rootNode;
}

module.exports = parse;