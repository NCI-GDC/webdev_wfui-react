/* We use unconvential things for fast computation here which makes
 * a lot of eslint rules irrelevant */

/* eslint-disable */

/* Basic string search.  Prioritizes matches in the 'title' field.
   Also uses tokens of form field_name:"match" (eg. author:"Billy Bob")
   to allow to mandate matches in particlar fields.  Unfortunately more
   advanced (n-gram, filtering etc.) is not possible since we cannot
   have a precomputed. */
const Search = {
   search: (data, searchTerm) => {
      /* Todo: Replace with continuous Knuth-Morris-Pratt */
      function occurrences(str, subString, allowOverlapping = false) {
         /* Prevent errors with empty fields */
         str += '';
         subString += '';

         if (subString.length <= 0) return (str.length + 1);

         let n = 0;
         let pos = 0;
         const step = allowOverlapping ? 1 : subString.length;

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

      /* Gets the total number of string matches using recursion.  Works with non-flat objets. */
      function getTotalStringMatches(subStr, item) {
         let ct = 0;

         for (const field of item) {
            if (typeof field === 'string') {
               ct += occurrences(field, subStr);
            } else {
               ct += getTotalStringMatches(subStr, field);
            }
         }

         return ct;
      }

      function scoreItem(tokens, item) {
         /* A heuristic score of how good the match is. */
         let itemScore = 0;

         /* If the string never occurs, then do not display the item. */
         for (const fieldToken of tokens.fieldTokens) {
            const occurenceCt = occurrences(item[fieldToken.left], fieldToken.right);
            if (occurenceCt < 1) {
               return -1000;
            }
         }

         itemScore += getTotalStringMatches(tokens.stringToken, item);

         /* Matches in title field are weighted heavier */
         itemScore += 1000 * getTotalStringMatches(tokens.stringToken, item.title);

         return itemScore;
      }

      function tokenize() {
         /* Finds tokens of form field:"Content" */
         const fieldsRegularExpression = /\b\w*:"\w*"/;
         const fieldsRegularExpressionResults = fieldsRegularExpression.exec(searchTerm);
         const fieldTokens = [];
         for (const result of fieldsRegularExpressionResults){
            const split = result.split(':');
            const field = {
               left: split[0],
               right: split[1].replace('"', ''),
            };
            fieldTokens.push(field);
         }

         /* Extracts a single string token for the rest...*/
         const stringsRegularExpression = /\b\w*/;
         const stringTokens = stringsRegularExpression.exec(searchTerm);

         let subStr = '';
         for (const s of stringTokens) {
            subStr += s;
         }

         return { fieldTokens, stringToken: subStr };
      }

      /* Returns a list of points sorted by their match quality */
      function exec() {
         const tokens = tokenize(data, searchTerm);
         for (const item of data) {
            item.searchTokenScore = scoreItem(tokens, data);
         }
         data.sort((a, b) => b.searchTokenScore - a.searchTokenScore);
         return data.filter(item => item.searchTokenScore > 0);
      }

      return exec();
   },
};

export default Search;
