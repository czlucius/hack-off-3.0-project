"use strict";

var characters = require("./characters.js");

function lookUp(trie, domains) {
  var domainsToCheck = domains.slice();
  var topLevel = [];
  var node = trie;

  while (domainsToCheck.length) {
    var domain = domainsToCheck.pop();

    if (node.children.has(characters.WILDCARD)) {
      if (node.children.has(characters.EXCEPTION + domain)) {
        break;
      }

      node = node.children.get(characters.WILDCARD);
    } else {
      if (node.children.has(domain) === false) {
        break;
      }

      node = node.children.get(domain);
    }

    topLevel.unshift(domain);
  }

  return topLevel;
}

module.exports = lookUp;