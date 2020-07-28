function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

export var setFieldUntouched = function setFieldUntouched(args, state) {
  var _args = _slicedToArray(args, 1),
      name = _args[0];

  var field = state.fields[name];

  if (field) {
    field.touched = false;
  }
};
export var setFieldUnmodified = function setFieldUnmodified(args, state) {
  var _args2 = _slicedToArray(args, 1),
      name = _args2[0];

  var field = state.fields[name];

  if (field) {
    field.modified = false;
  }
};
export var setFieldUndirty = function setFieldUndirty(args, state) {
  var _args3 = _slicedToArray(args, 1),
      name = _args3[0];

  var field = state.fields[name];

  if (field) {
    field.dirty = false;
  }
};