'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
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
            console.warning("FilteredList recursive data warning!");
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
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
               for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var key = _step.value;

                  if (typeof item !== 'string') {
                     ct += getTotalStringMatches(item[key], subStr, depth + 1);
                  }
               }
            } catch (err) {
               _didIteratorError = true;
               _iteratorError = err;
            } finally {
               try {
                  if (!_iteratorNormalCompletion && _iterator.return) {
                     _iterator.return();
                  }
               } finally {
                  if (_didIteratorError) {
                     throw _iteratorError;
                  }
               }
            }
         } else {
            var _keys = Object.keys(item);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
               for (var _iterator2 = _keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var _key = _step2.value;

                  ct += getTotalStringMatches(item[_key], subStr, depth + 1);
               }
            } catch (err) {
               _didIteratorError2 = true;
               _iteratorError2 = err;
            } finally {
               try {
                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
                     _iterator2.return();
                  }
               } finally {
                  if (_didIteratorError2) {
                     throw _iteratorError2;
                  }
               }
            }
         }
         return ct;
      }

      function scoreItem(tokens, item) {
         /* A heuristic score of how good the match is. */
         var itemScore = 0;

         /* If the string never occurs, then do not display the item. */
         var _iteratorNormalCompletion3 = true;
         var _didIteratorError3 = false;
         var _iteratorError3 = undefined;

         try {
            for (var _iterator3 = tokens.fieldTokens[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
               var fieldToken = _step3.value;


               /* Find the key */
               var keys = Object.keys(item);
               var _iteratorNormalCompletion4 = true;
               var _didIteratorError4 = false;
               var _iteratorError4 = undefined;

               try {
                  for (var _iterator4 = keys[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                     var key = _step4.value;

                     if (fieldToken.left.toLowerCase() === key.toLowerCase()) {
                        /* Checks how many times the right side of the expression appears as a subsring */
                        var occurenceCt = occurrences(item[key], fieldToken.right);
                        return occurenceCt > 0 ? 1 : -1000;
                     }
                  }
               } catch (err) {
                  _didIteratorError4 = true;
                  _iteratorError4 = err;
               } finally {
                  try {
                     if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                     }
                  } finally {
                     if (_didIteratorError4) {
                        throw _iteratorError4;
                     }
                  }
               }

               return -1000;
            }
         } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
         } finally {
            try {
               if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
               }
            } finally {
               if (_didIteratorError3) {
                  throw _iteratorError3;
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
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
               for (var _iterator5 = fieldsRegularExpressionResults[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                  var result = _step5.value;

                  var split = result.split(':');
                  var field = {
                     left: split[0],
                     right: split[1].replace(/"/g, '')
                  };
                  fieldTokens.push(field);
               }
            } catch (err) {
               _didIteratorError5 = true;
               _iteratorError5 = err;
            } finally {
               try {
                  if (!_iteratorNormalCompletion5 && _iterator5.return) {
                     _iterator5.return();
                  }
               } finally {
                  if (_didIteratorError5) {
                     throw _iteratorError5;
                  }
               }
            }
         }

         /* Extracts a single string token for the rest...*/
         var stringsRegularExpression = /\b[\w|\s]*/;
         var stringTokens = stringsRegularExpression.exec(searchTerm);

         var subStr = '';
         if (stringTokens) {
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
               for (var _iterator6 = stringTokens[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                  var s = _step6.value;

                  subStr += s;
               }
            } catch (err) {
               _didIteratorError6 = true;
               _iteratorError6 = err;
            } finally {
               try {
                  if (!_iteratorNormalCompletion6 && _iterator6.return) {
                     _iterator6.return();
                  }
               } finally {
                  if (_didIteratorError6) {
                     throw _iteratorError6;
                  }
               }
            }
         }
         return { fieldTokens: fieldTokens, stringToken: subStr };
      }

      /* Returns a list of points sorted by their match quality */
      function exec() {
         var tokens = tokenize(data, searchTerm);
         var _iteratorNormalCompletion7 = true;
         var _didIteratorError7 = false;
         var _iteratorError7 = undefined;

         try {
            for (var _iterator7 = data[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
               var item = _step7.value;

               item.searchTokenScore = scoreItem(tokens, item);
            }
         } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
         } finally {
            try {
               if (!_iteratorNormalCompletion7 && _iterator7.return) {
                  _iterator7.return();
               }
            } finally {
               if (_didIteratorError7) {
                  throw _iteratorError7;
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
   }
};

exports.default = Search;