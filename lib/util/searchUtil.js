/* We use some unconvential things for fast computation here which makes
 * a lot of eslint rules irrelevant. */

/* eslint-disable */

/* Basic string search.  Prioritizes matches in the 'title' field.
   Also uses tokens of form field_name:"match" (eg. author:"Billy Bob")
   to allow to mandate matches in particlar fields.  Unfortunately more
   advanced (n-gram, filtering etc.) is not possible since we cannot
   have a precomputed index. */
var Search = {
  search: function search(data, searchTerm) {
    /* Runs a version of knuth morris pratt that continues even when
    * it finds a match to efficiently find the number of substrings
    * in the given string. */
    function occurrences(str, subString) {
      var allowOverlapping = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      str = str.toLowerCase();
      subString = subString.toLowerCase();
      /* Prevent errors with empty fields */

      str += '';
      subString += '';
      if (subString.length <= 0) return str.length + 1;
      var n = 0;
      var pos = 0;
      var step = allowOverlapping ? 1 : subString.length;

      while (true) {
        pos = str.indexOf(subString, pos);

        if (pos >= 0) {
          n += 1;
          pos += step;
        } else {
          break;
        }
      }

      return n;
    }
    /* Gets the total number of string matches using recursion.  Works with non-flat objects
    * but does not support recursion inside of the object tree itself. If a fieldname is specified,
    * only strings that are in a subtree rooted at in an object with the key fieldname are counted.
    * This is used for specified matching. */


    function getTotalStringMatches(item, subStr) {
      var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      /* Avoid crashing if some idiot puts a recursive loop in their object */
      if (depth > 50) {
        console.warning('FilteredList recursive data warning!');
        return 0;
      }

      var ct = 0;

      if (!item) {
        return 0;
      }
      /* Note: Strings are dangerous since substrings are counted as properties of strings. */


      if (typeof item === 'string') {
        ct += occurrences(item, subStr);
        var keys = Object.keys(item);

        for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
          var key = _keys[_i];

          if (typeof item !== 'string') {
            ct += getTotalStringMatches(item[key], subStr, depth + 1);
          }
        }
      } else {
        var _keys2 = Object.keys(item);

        for (var _i2 = 0, _keys3 = _keys2; _i2 < _keys3.length; _i2++) {
          var _key = _keys3[_i2];
          ct += getTotalStringMatches(item[_key], subStr, depth + 1);
        }
      }

      return ct;
    }

    function scoreItem(tokens, item) {
      /* A heuristic score of how good the match is. */
      var itemScore = 0;
      /* If the string never occurs, then do not display the item. */

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = tokens.fieldTokens[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var fieldToken = _step.value;

          /* Find the key */
          var keys = Object.keys(item);

          for (var _i3 = 0, _keys4 = keys; _i3 < _keys4.length; _i3++) {
            var key = _keys4[_i3];

            if (fieldToken.left.toLowerCase() === key.toLowerCase()) {
              /* Checks how many times the right side of the expression appears as a subsring */
              var occurenceCt = occurrences(item[key], fieldToken.right);
              return occurenceCt > 0 ? 1 : -1000;
            }
          }

          return -1000;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      itemScore += getTotalStringMatches(item, tokens.stringToken);
      /* Matches in title field are weighted heavier */

      itemScore += 1000 * getTotalStringMatches(item.title, tokens.stringToken);
      return itemScore;
    }

    function tokenize() {
      /* Finds tokens of form field:"Content" */
      var fieldsRegularExpression = /\b\w*:"[^"]*"/;
      var fieldsRegularExpressionResults = fieldsRegularExpression.exec(searchTerm);
      var fieldTokens = [];

      if (fieldsRegularExpressionResults) {
        // Note: regex.exec returns null instead of [""] on failure
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = fieldsRegularExpressionResults[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var result = _step2.value;
            var split = result.split(':');
            var field = {
              left: split[0],
              right: split[1].replace(/"/g, '')
            };
            fieldTokens.push(field);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
      /* Extracts a single string token for the rest...*/


      var stringsRegularExpression = /\b[\w|\s]*/;
      var stringTokens = stringsRegularExpression.exec(searchTerm);
      var subStr = '';

      if (stringTokens) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = stringTokens[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var s = _step3.value;
            subStr += s;
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      return {
        fieldTokens: fieldTokens,
        stringToken: subStr
      };
    }
    /* Returns a list of points sorted by their match quality */


    function exec() {
      var tokens = tokenize(data, searchTerm);
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = data[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var item = _step4.value;
          item.searchTokenScore = scoreItem(tokens, item);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      data.sort(function (a, b) {
        return b.searchTokenScore - a.searchTokenScore;
      });
      return data.filter(function (item) {
        return item.searchTokenScore > 0;
      });
    }

    return exec();
  },
  simpleSearch: function simpleSearch(data, searchTerm, searchKeys) {
    var wholeWord = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var searchLogic = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'and';
    var wholeWords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

    function searchField(item, term) {
      if (!item) return false;

      if (typeof item === 'string') {
        var field = item.toLowerCase();
        return field.indexOf(term) >= 0;
      } else if (typeof item === 'number') {
        var _field = item.toString();

        return _field.indexOf(term) >= 0;
      } else if (Array.isArray(item)) {
        return item.some(function (sub) {
          return searchField(sub, term);
        });
      } else {
        var keys = Object.keys(item);
        return keys.some(function (key) {
          if (!item || !item[key]) return false;

          if (typeof item[key] === 'boolean' && item[key]) {
            return key.toLowerCase().indexOf(term) >= 0;
          }

          return searchField(item[key], term);
        });
      }

      return false;
    }

    function searchWholeWord(item, term) {
      if (!item) return false;

      if (typeof item === 'string') {
        var field = item.toLowerCase();
        return RegExp("\\b".concat(term, "\\b"), 'i').test(field);
      } else if (typeof item === 'number') {
        var _field2 = item.toString();

        return _field2.indexOf(term) >= 0;
      } else if (Array.isArray(item)) {
        return item.some(function (sub) {
          return searchWholeWord(sub, term);
        });
      } else {
        var keys = Object.keys(item);
        return keys.some(function (key) {
          if (!item || !item[key]) return false;

          if (typeof item[key] === 'boolean' && item[key]) {
            return key.toLowerCase().indexOf(term) >= 0;
          }

          return searchWholeWord(item[key], term);
        });
      }

      return false;
    }

    var filtered = data.filter(function (item) {
      if (item.isFront && item.ignoreSearch) return true;
      var keys = searchKeys || Object.keys(item);
      var terms = wholeWords ? [searchTerm.toLowerCase()] : searchTerm.toLowerCase().split(' ');
      if (terms.indexOf('') > -1) terms.splice(terms.indexOf(''), 1); // Remove extra ''

      var _searchWholeWord = function _searchWholeWord(term) {
        return keys.some(function (key) {
          if (!item || !item[key]) return false;

          if (typeof item[key] === 'boolean' && item[key]) {
            return key.toLowerCase().indexOf(term) >= 0;
          }

          return searchWholeWord(item[key], term);
        });
      };

      var _searchField = function _searchField(term) {
        return keys.some(function (key) {
          if (!item || !item[key]) return false;
          if (item) if (typeof item[key] === 'boolean' && item[key]) {
            return key.toLowerCase().indexOf(term) >= 0;
          }
          return searchField(item[key], term);
        });
      };

      if (wholeWord) {
        if (searchLogic === 'and') {
          return terms.every(_searchWholeWord);
        } else {
          return terms.some(_searchWholeWord);
        }
      }

      if (searchLogic === 'and') {
        return terms.every(_searchField);
      }

      return terms.some(_searchField);
    });
    return filtered;
  }
};
export default Search;