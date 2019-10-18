export var stringifyValues = function stringifyValues(item) {
  if (!item || typeof item === 'boolean') return '';

  if (typeof item === 'string') {
    return item;
  }

  if (typeof item === 'number') {
    return item.toString();
  }

  if (Array.isArray(item)) {
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
          ret += "".concat(key, " ");
        } else {
          ret += "".concat(stringifyValues(item[key]), " ");
        }
      }
    });
  }

  return ret.trim();
};