'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _questions = require('./questions');

Object.keys(_questions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _questions[key];
    }
  });
});