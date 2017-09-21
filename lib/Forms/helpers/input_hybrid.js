'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseAgeToken = exports.getOptSpecial = exports.getOptVal = exports.getOptKey = exports.getPosition = exports.getValByKey = undefined;

var _isNumeric = require('./isNumeric');

/**
 * Utilities for input hybrid
 */
var getValByKey = exports.getValByKey = function getValByKey(key, options) {
    var result = '';
    options.forEach(function (option) {
        if (!result && key === getOptKey(option)) {
            result = getOptVal(option);
        }
    });
    return result;
};
var getPosition = exports.getPosition = function getPosition(str, m, i) {
    if (str.split(m, i).join(m).length == str.length) {
        return -1;
    }
    return str.split(m, i).join(m).length;
};
var getOptKey = exports.getOptKey = function getOptKey(option) {
    var key = option.substr(0, getPosition(option, "|", 1));
    if (!key && !option.includes("|")) {
        key = option;
    }
    return key;
};
var getOptVal = exports.getOptVal = function getOptVal(option) {
    var from = getPosition(option, "|", 1) + 1;
    var to = getPosition(option, "|", 2);
    var val;
    if (to != -1) {
        val = option.substr(from, to - from);
    } else {
        val = option.substr(from);
    }
    return val;
};
var getOptSpecial = exports.getOptSpecial = function getOptSpecial(option) {
    option = option.toLowerCase();
    var from = getPosition(option, "|", 2) + 1;
    var special = "";
    if (from == 0) {
        return [];
    } else {
        special = option.substr(from).replace(/ /g, "");
    }
    return special != -1 && special.includes(",") ? special.split(",") : [special];
};

var parseAgeToken = exports.parseAgeToken = function parseAgeToken(val, token) {

    if ((0, _isNumeric.isNumeric)(val)) {
        return val;
    } else if (token && val) {
        var reg = /\[age\]([\+|\-])([0-9]+)/;
        var _val = val.replace(/\s/g, "");
        if (_val == "[age]") {
            return token.user_age || undefined;
        } else if (_val.includes("[age]")) {
            _val.match(reg);
            var res = _val.match(reg);
            if (res) {
                if (res[1] == '+') {
                    return Number(token.user_age) + Number(res[2]);
                } else if (res[1] == '-') {
                    return Number(token.user_age) - Number(res[2]);
                }
            } else {
                return undefined;
            }
        }
    } else {
        return undefined;
    }
};