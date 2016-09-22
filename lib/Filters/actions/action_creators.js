'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var filterByCompany = exports.filterByCompany = function filterByCompany(name) {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter: 'companyFilter',
        keyword: name
    };
};

var filterByKeyword = exports.filterByKeyword = function filterByKeyword(keyword) {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter: 'keywordFilter',
        keyword: keyword
    };
};