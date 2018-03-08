'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var flattenObject = exports.flattenObject = function flattenObject(nestedMessages) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (!nestedMessages) return {};
    return Object.keys(nestedMessages).reduce(function (messages, key) {
        var value = nestedMessages[key];
        var prefixedKey = prefix ? prefix + '_' + key : key;

        if (typeof value === 'string') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenObject(value, prefixedKey));
        }

        return messages;
    }, {});
};