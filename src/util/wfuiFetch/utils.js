export const mergeFetchStatuses = fetchStatuses => {
    const margedStatus = {};
    fetchStatuses.forEach(fetchStatus => {
        if (!fetchStatus) return;
        margedStatus.isFetching =
            margedStatus.isFetching || fetchStatus.isFetching;
        margedStatus.fetch5s = margedStatus.fetch5s || fetchStatus.fetch5s;
        margedStatus.fetch8s = margedStatus.fetch8s || fetchStatus.fetch8s;
        margedStatus.status =
            margedStatus.status === 'fail' ? 'fail' : fetchStatus.status;
        margedStatus.timeout = margedStatus.timeout || fetchStatus.timeout;
        margedStatus.retried = margedStatus.retried || fetchStatus.retried;
        margedStatus.lastUpdated =
            fetchStatus.lastUpdated > margedStatus.lastUpdated
                ? fetchStatus.lastUpdated
                : margedStatus.lastUpdated;
    });
    margedStatus.requestId = fetchStatuses
        .map(fetchStatus => fetchStatus.requestId)
        .join('+');
    margedStatus.error = fetchStatuses
        .map(fetchStatus => fetchStatus.error)
        .join(',');

    return margedStatus;
};
