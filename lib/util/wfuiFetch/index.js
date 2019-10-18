function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import uuidv1 from 'uuid/v1';
/**
 * Thsi wfuiFetch adds following features to native fetch function.
 * - Cancellable promise
 * - Added timeout
 * - Retry connecting when it's failed.
 * - Dispatch request states.
 * @param {string} input - Request url
 * @param {object} init - Request options.
 * @param {function} dispatch - dispatch function from redux.
 */

export var wfuiFetch = function wfuiFetch(input, init) {
  var dispatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (f) {
    return f;
  };
  var hasCanceled = false;
  var appId = init.headers && init.headers['app-id'] || 0;
  var requestId = init.requestId; // Request Name

  var queryId = init.queryId || "".concat(requestId, "-").concat(uuidv1()); // Unique Query Id

  var meta = init.meta || {};
  dispatch({
    type: 'FETCH_REQUEST',
    requestId: requestId,
    queryId: queryId,
    appId: appId,
    meta: meta
  });
  var promise = new Promise(function (resolve, reject) {
    var fetchTimer;
    var timer5s = setTimeout(function () {
      dispatch({
        type: 'FETCH_REQUEST_5S',
        requestId: requestId,
        queryId: queryId,
        appId: appId,
        meta: meta
      });
    }, 5000);
    var timer8s = setTimeout(function () {
      dispatch({
        type: 'FETCH_REQUEST_8S',
        requestId: requestId,
        queryId: queryId,
        appId: appId,
        meta: meta
      });
    }, 8000);
    var timeout = setTimeout(function () {
      dispatch({
        type: 'FETCH_REQUEST_TIMEOUT',
        requestId: requestId,
        queryId: queryId,
        appId: appId,
        meta: meta
      });
      reject(new Error('timeout'));
      clearTimeout(fetchTimer);
    }, init.timeout || 300000); // Add no-cache to header

    var _init = JSON.parse(JSON.stringify(init));

    if (!_init.headers) _init.header = {};
    _init.headers = _extends({}, _init.headers, {
      pragma: 'no-cache',
      'cache-control': 'no-cache'
    });

    var wrappedFetch = function wrappedFetch(n) {
      global.fetch(input, _init).then(function (response) {
        clearTimeout(timer5s);
        clearTimeout(timer8s);
        clearTimeout(timeout);
        if (hasCanceled) return reject({
          isCanceled: true
        });
        var contentType = response.headers.get('content-type');

        var resetData = function resetData(requestId) {// Need to be tested well
          // dispatch({
          //     type: 'FETCH_DATA_RESET',
          //     requestId,
          //     appId,
          // });
        }; // Need to have more statement.


        if (response.ok) {
          var processData = function processData(data) {
            dispatch({
              type: 'RECEIVE_FETCH_DATA',
              requestId: requestId,
              queryId: queryId,
              appId: appId,
              data: data,
              meta: meta
            });
            dispatch({
              type: 'FETCH_SUCCESS',
              requestId: requestId,
              queryId: queryId,
              appId: appId,
              data: data,
              meta: meta
            });
            resetData(init.requestId);
            resolve({
              res: response,
              data: data
            });
          };

          if ( // JSON
          contentType && contentType.indexOf('application/json') !== -1) {
            return response.json().then(processData);
          }

          if ( // Text
          contentType && contentType.indexOf('text/') !== -1) {
            return response.text().then(processData);
          } // Blob


          response.blob().then(processData);
        } else {
          // JSON
          if (contentType && contentType.indexOf('application/json') !== -1) {
            return response.json().then(function (data) {
              var statusText = data;
              var parsedData = {};

              if (!statusText.type) {
                var keys = Object.keys(statusText).filter(function (key) {
                  return !statusText[key].ok;
                }).join(', ');
                var orig = Object.keys(statusText).filter(function (key) {
                  return !statusText[key].ok;
                }) // only failed ones.
                .map(function (key) {
                  var obj = statusText[key];

                  if (!statusText.type && obj.data.type) {
                    statusText.type = obj.data.type; // set error type.
                  }

                  return _extends({}, obj, {
                    key: key
                  });
                });
                parsedData = {
                  orig: orig,
                  keys: keys
                };
              }

              dispatch({
                type: 'FETCH_FAILURE',
                requestId: requestId,
                queryId: queryId,
                statusText: statusText,
                data: parsedData,
                appId: appId,
                meta: meta
              });
              resetData(init.requestId);
              resolve({
                res: response,
                data: statusText
              });
            });
          } // Text


          return response.text().then(function (data) {
            var statusText = data;

            try {
              statusText = JSON.parse(data);
            } catch (e) {
              /**/
            }

            dispatch({
              type: 'FETCH_FAILURE',
              requestId: requestId,
              queryId: queryId,
              statusText: statusText,
              appId: appId,
              meta: meta
            });
            resolve({
              res: response,
              data: statusText
            });
          });
        }
      }).catch(function (error) {
        console.error(error);

        if (n > 0) {
          fetchTimer = setTimeout(function () {
            console.log("Retry connecting to ".concat(input));
            wrappedFetch(n - 1);
          }, init.retryDelay || 3000);
        } else {
          dispatch({
            type: 'FETCH_RETRY_FAILURE',
            requestId: requestId,
            queryId: queryId,
            statusText: error.message,
            appId: appId,
            meta: meta
          });
          return hasCanceled ? reject({
            isCanceled: true
          }) : reject(error);
        }
      });
    };

    wrappedFetch(init.retryCount || 0);
  });
  return {
    promise: promise,
    abort: function abort() {
      hasCanceled = true;
    }
  };
};
export * from './reducer';
export * from './selectors';
export * from './utils';