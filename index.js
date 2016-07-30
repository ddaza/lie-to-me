'use strict';
const keys = require('./keys.json'); // need to add your keys
const lie = require('./lie.js')(keys);

(function () {
  lie.init();
  lie.start();
})()
