'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var stringifyValues = exports.stringifyValues = function stringifyValues(item) {
    if (!item || typeof item === 'boolean') return '';
    if (typeof item === 'string') {
        return item;
    } else if (typeof item === 'number') {
        return item.toString();
    } else if (Array.isArray(item)) {
        return item.map(function (each) {
            return stringifyValues(each);
        }).join(' ');
    }
    var ret = '';
    var keys = Object.keys(item);
    if (keys && keys.length > 0) {
        keys.forEach(function (key) {
            if (item[key]) {
                if (typeof item[key] === 'boolean' && item[key]) {
                    ret += key + ' ';
                } else {
                    ret += stringifyValues(item[key]) + ' ';
                }
            }
        });
    }
    return ret.trim();
};