'use strict';
const keys = require('./keys.json'); // need to add your keys
const lie = require('./lie.js');

(function () {
  lie.init(keys);
  lie.start();
})()
