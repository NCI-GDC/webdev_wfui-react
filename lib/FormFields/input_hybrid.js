var isNumeric = function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
/**
 * Utilities for input hybrid
 */


export var getValByKey = function getValByKey(key, options) {
  var result = '';
  options.forEach(function (option) {
    if (!result && key === getOptKey(option)) {
      result = getOptVal(option);
    }
  });
  return result;
};
export var getPosition = function getPosition(str, m, i) {
  if (str.split(m, i).join(m).length == str.length) {
    return -1;
  }

  return str.split(m, i).join(m).length;
};
export var getOptKey = function getOptKey(option) {
  var key = option.substr(0, getPosition(option, '|', 1));

  if (!key && !option.includes('|')) {
    key = option;
  }

  return key;
};
export var getOptVal = function getOptVal(option) {
  var from = getPosition(option, '|', 1) + 1;
  var to = getPosition(option, '|', 2);
  var val;

  if (to != -1) {
    val = option.substr(from, to - from);
  } else {
    val = option.substr(from);
  }

  return val;
};
export var getOptSpecial = function getOptSpecial(option) {
  option = option.toLowerCase();
  var from = getPosition(option, '|', 2) + 1;
  var special = '';

  if (from == 0) {
    return [];
  }

  special = option.substr(from).replace(/ /g, '');
  return special != -1 && special.includes(',') ? special.split(',') : [special];
};
export var parseAgeToken = function parseAgeToken(val, token) {
  if (isNumeric(val)) {
    return val;
  }

  if (token && val) {
    var reg = /\[age\]([\+|\-])([0-9]+)/;

    var _val = val.replace(/\s/g, '');

    if (_val == '[age]') {
      return token.user_age || undefined;
    }

    if (_val.includes('[age]')) {
      _val.match(reg);

      var res = _val.match(reg);

      if (res) {
        if (res[1] == '+') {
          return Number(token.user_age) + Number(res[2]);
        }

        if (res[1] == '-') {
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