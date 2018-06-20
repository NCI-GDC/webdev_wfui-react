'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var mergeFetchStatuses = exports.mergeFetchStatuses = function mergeFetchStatuses(fetchStatuses) {
    var margedStatus = {};
    fetchStatuses.forEach(function (fetchStatus) {
        if (!fetchStatus) return;
        margedStatus.isFetching = margedStatus.isFetching || fetchStatus.isFetching;
        margedStatus.fetch5s = margedStatus.fetch5s || fetchStatus.fetch5s;
        margedStatus.fetch8s = margedStatus.fetch8s || fetchStatus.fetch8s;
        margedStatus.status = margedStatus.status === 'fail' ? 'fail' : fetchStatus.status;
        margedStatus.timeout = margedStatus.timeout || fetchStatus.timeout;
        margedStatus.retried = margedStatus.retried || fetchStatus.retried;
        margedStatus.lastUpdated = fetchStatus.lastUpdated > margedStatus.lastUpdated ? fetchStatus.lastUpdated : margedStatus.lastUpdated;
    });
    margedStatus.requestId = fetchStatuses.map(function (fetchStatus) {
        if (fetchStatus) {
            return fetchStatus.requestId;
        }
        return null;
    }).filter(function (id) {
        return id;
    }).join('+');
    margedStatus.error = fetchStatuses.map(function (fetchStatus) {
        if (fetchStatus) {
            if (_typeof(fetchStatus.error) === 'object') {
                return fetchStatus.error.type;
            }
            return fetchStatus.error;
        }
        return '';
    }).filter(function (text) {
        return !!text;
    }).join(',');

    return margedStatus;
};