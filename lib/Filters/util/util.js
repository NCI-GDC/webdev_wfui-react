"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var applyPageFilter = function applyPageFilter(state, page, numPerPage) {
    var _state = state.slice();
    var _page = page ? page : 1;
    return _state.splice((Number(_page) - 1) * numPerPage, numPerPage);
};

var applyAlphabetFilter = function applyAlphabetFilter(state, keyword, property) {
    return state.filter(function (item, i) {
        if (!keyword) return true;
        return item[property].charAt(0).toLowerCase() == keyword;
    });
};

var applyListFilter = function applyListFilter(state, value, property) {
    return state.filter(function (item, i) {
        if (!value) {
            return true;
        }
        return item[property] == value;
    });
};

var applyKeywordFilter = function applyKeywordFilter(state, keywords) {
    return state.filter(function (state, i) {
        if (!keywords) return true;
        var keys = keywords.split(" ");
        var result = false;
        keys.forEach(function (key, j) {
            key = key.toLowerCase();
            if (!key) return false;
            if (state.fname.toLowerCase().includes(key) || state.lname.toLowerCase().includes(key) || state.company.toLowerCase().includes(key)) {
                result = true;
            }
        });
        return result;
    });
};

var genListMap = function genListMap(state, property) {
    var map = {};
    state.forEach(function (item, i) {
        if (!map[item[property]]) {
            map[item[property]] = true;
        }
    });
    return map;
};

var genAlphabetMap = function genAlphabetMap(state, property) {
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    var alphabetMap = {};

    var _loop = function _loop() {
        var key = alphabet.charAt(i);
        var filter = state.filter(function (item, j) {
            return key == (item[property] && item[property].charAt(0).toLowerCase());
        });
        alphabetMap[key] = filter.length > 0;
    };

    for (var i = 0, len = alphabet.length; i < len; i++) {
        _loop();
    }
    return alphabetMap;
};

exports.default = {
    applyAlphabetFilter: applyAlphabetFilter,
    applyListFilter: applyListFilter,
    applyKeywordFilter: applyKeywordFilter,
    applyPageFilter: applyPageFilter,
    genListMap: genListMap,
    genAlphabetMap: genAlphabetMap
};