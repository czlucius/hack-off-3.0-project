"use strict";

var icannTrie = require("../lists/icann.complete");

var privateTrie = require("../lists/private.complete");

var normalize = require("./normalize.js");

var lookUp = require("./trie/lookUp"); // eslint-disable-next-line


var urlParts = /^(:?\/\/|https?:\/\/)?([^/]*@)?(.+?)(:\d{2,5})?([/?].*)?$/; // 1 = protocol, 2 = auth, 3 = hostname, 4 = port, 5 = path

var dot = /\./g;
var emptyArr = [];

function matchTld(hostname, options) {
  // for potentially unrecognized tlds, try matching against custom tlds
  if (options.customTlds) {
    // try matching against a built regexp of custom tlds
    var tld = hostname.match(options.customTlds);

    if (tld !== null) {
      return tld[0];
    }
  }

  var domains = hostname.split(".");
  var icannTlds = lookUp(icannTrie, domains);
  var privateTlds = options.privateTlds ? lookUp(privateTrie, domains) : emptyArr;

  if (privateTlds.length > icannTlds.length) {
    return "." + privateTlds.join(".");
  }

  if (icannTlds.length > 0) {
    return "." + icannTlds.join(".");
  }

  return null;
}
/* eslint-disable jsdoc/no-undefined-types */

/**
 * Removes all unnecessary parts of the domain (e.g. protocol, auth, port, path, query)
 * and parses the remaining domain. The returned object contains the properties 'subdomain', 'domain' and 'tld'.
 *
 * Since the top-level domain is handled differently by every country, this function only
 * supports all tlds listed in src/build/tld.txt.
 *
 * If the given url is not valid or isn't supported by the tld.txt, this function returns null.
 *
 * @param {string} url
 * @param {Object} [options]
 * @param {Array<string>|RegExp} [options.customTlds]
 * @param {boolean} [options.privateTlds]
 * @returns {Object|null}
 */


function parseDomain(url, options) {
  var normalizedUrl = normalize.url(url);
  var tld = null;
  var urlSplit;
  var hostname;

  if (!normalizedUrl) {
    return null;
  }

  var normalizedOptions = normalize.options(options);
  urlSplit = normalizedUrl.match(urlParts); // urlSplit is null if the url contains certain characters like '\n', '\r'.

  if (urlSplit === null) {
    return null;
  }

  hostname = urlSplit[3]; // domain will now be something like sub.domain.example.com

  tld = matchTld(hostname, normalizedOptions);

  if (tld === null) {
    return null;
  } // remove tld and split by dot


  urlSplit = hostname.slice(0, -tld.length).split(dot);

  if (tld.charAt(0) === ".") {
    // removes the remaining dot, if present (added to handle localhost)
    tld = tld.slice(1);
  }

  hostname = urlSplit.pop();
  var subdomain = urlSplit.join(".");
  return {
    tld: tld,
    domain: hostname,
    subdomain: subdomain
  };
}

module.exports = parseDomain;