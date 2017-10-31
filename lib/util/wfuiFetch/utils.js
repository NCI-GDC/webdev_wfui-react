'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mergeFetchStatuses = exports.mergeFetchStatuses = function mergeFetchStatuses(fetchStatuses) {

    var margedStatus = {};

    fetchStatuses.forEach(function (fetchStatus) {
        if (!fetchStatus) return;
        margedStatus.isFetching = margedStatus.isFetching || fetchStatus.isFetching;
        margedStatus.fetch5s = margedStatus.fetch5s || fetchStatus.fetch5s;
        margedStatus.fetch8s = margedStatus.fetch8s || fetchStatus.fetch8s;
        margedStatus.status = margedStatus.status === 'fail' ? 'fail' : fetchStatus.status;
        margedStatus.error = fetchStatus.error ? margedStatus.error + ', ' + fetchStatus.error : '';
        margedStatus.timeout = margedStatus.timeout || fetchStatus.timeout;
        margedStatus.retried = margedStatus.retried || fetchStatus.retried;
        margedStatus.lastUpdated = fetchStatus.lastUpdated > margedStatus.lastUpdated ? fetchStatus.lastUpdated : margedStatus.lastUpdated;
    });

    return margedStatus;
};