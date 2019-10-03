'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var flattenObject = exports.flattenObject = function flattenObject(nestedMessages) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var devider = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '_';

    if (!nestedMessages) return {};
    return Object.keys(nestedMessages).reduce(function (messages, key) {
        var value = nestedMessages[key];
        var prefixedKey = prefix ? '' + prefix + devider + key : isNaN(Number(key)) ? key : '' + devider + key;

        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenObject(value, prefixedKey));
        }

        return messages;
    }, {});
};