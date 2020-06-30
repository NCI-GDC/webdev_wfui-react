function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

export var flattenObject = function flattenObject(nestedMessages) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  if (!nestedMessages) return {};
  return Object.keys(nestedMessages).reduce(function (messages, key) {
    var value = nestedMessages[key];
    var prefixedKey = prefix ? "".concat(prefix, "_").concat(key) : isNaN(Number(key)) ? key : "_".concat(key);

    if (_typeof(value) !== 'object') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenObject(value, prefixedKey));
    }

    return messages;
  }, {});
};