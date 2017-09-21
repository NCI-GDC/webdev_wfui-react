"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isNumeric = exports.isNumeric = function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};