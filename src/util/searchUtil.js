/* We use some unconvential things for fast computation here which makes
 * a lot of eslint rules irrelevant. */
/* eslint-disable */

/* Basic string search.  Prioritizes matches in the 'title' field.
   Also uses tokens of form field_name:"match" (eg. author:"Billy Bob")
   to allow to mandate matches in particlar fields.  Unfortunately more
   advanced (n-gram, filtering etc.) is not possible since we cannot
   have a precomputed index. */
const Search = {
    search: (data, searchTerm) => {
        /* Runs a version of knuth morris pratt that continues even when
       * it finds a match to efficiently find the number of substrings
       * in the given string. */
        function occurrences(str, subString, allowOverlapping = false) {
            str = str.toLowerCase();
            subString = subString.toLowerCase();
            /* Prevent errors with empty fields */
            str += '';
            subString += '';

            if (subString.length <= 0) return str.length + 1;

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

        /* Gets the total number of string matches using recursion.  Works with non-flat objects
       * but does not support recursion inside of the object tree itself. If a fieldname is specified,
       * only strings that are in a subtree rooted at in an object with the key fieldname are counted.
       * This is used for specified matching. */
        function getTotalStringMatches(item, subStr, depth = 0) {
            /* Avoid crashing if some idiot puts a recursive loop in their object */
            if (depth > 50) {
                console.warning('FilteredList recursive data warning!');
                return 0;
            }

            let ct = 0;

            if (!item) {
                return 0;
            }

            /* Note: Strings are dangerous since substrings are counted as properties of strings. */
            if (typeof item === 'string') {
                ct += occurrences(item, subStr);
                const keys = Object.keys(item);
                for (const key of keys) {
                    if (typeof item !== 'string') {
                        ct += getTotalStringMatches(
                            item[key],
                            subStr,
                            depth + 1,
                        );
                    }
                }
            } else {
                const keys = Object.keys(item);
                for (const key of keys) {
                    ct += getTotalStringMatches(item[key], subStr, depth + 1);
                }
            }
            return ct;
        }

        function scoreItem(tokens, item) {
            /* A heuristic score of how good the match is. */
            let itemScore = 0;

            /* If the string never occurs, then do not display the item. */
            for (const fieldToken of tokens.fieldTokens) {
                /* Find the key */
                const keys = Object.keys(item);
                for (const key of keys) {
                    if (fieldToken.left.toLowerCase() === key.toLowerCase()) {
                        /* Checks how many times the right side of the expression appears as a subsring */
                        const occurenceCt = occurrences(
                            item[key],
                            fieldToken.right,
                        );
                        return occurenceCt > 0 ? 1 : -1000;
                    }
                }
                return -1000;
            }
            itemScore += getTotalStringMatches(item, tokens.stringToken);

            /* Matches in title field are weighted heavier */
            itemScore +=
                1000 * getTotalStringMatches(item.title, tokens.stringToken);

            return itemScore;
        }

        function tokenize() {
            /* Finds tokens of form field:"Content" */
            const fieldsRegularExpression = /\b\w*:"[^"]*"/;
            const fieldsRegularExpressionResults = fieldsRegularExpression.exec(
                searchTerm,
            );
            const fieldTokens = [];
            if (fieldsRegularExpressionResults) {
                // Note: regex.exec returns null instead of [""] on failure
                for (const result of fieldsRegularExpressionResults) {
                    const split = result.split(':');
                    const field = {
                        left: split[0],
                        right: split[1].replace(/"/g, ''),
                    };
                    fieldTokens.push(field);
                }
            }

            /* Extracts a single string token for the rest...*/
            const stringsRegularExpression = /\b[\w|\s]*/;
            const stringTokens = stringsRegularExpression.exec(searchTerm);

            let subStr = '';
            if (stringTokens) {
                for (const s of stringTokens) {
                    subStr += s;
                }
            }
            return { fieldTokens, stringToken: subStr };
        }

        /* Returns a list of points sorted by their match quality */
        function exec() {
            const tokens = tokenize(data, searchTerm);
            for (const item of data) {
                item.searchTokenScore = scoreItem(tokens, item);
            }
            data.sort((a, b) => b.searchTokenScore - a.searchTokenScore);
            return data.filter(item => item.searchTokenScore > 0);
        }

        return exec();
    },
    simpleSearch: (
        data,
        searchTerm,
        searchKeys,
        wholeWord = false,
        searchLogic = 'and',
        wholeWords = true,
    ) => {
        function searchField(item, term) {
            if (!item) return false;
            if (typeof item === 'string') {
                const field = item.toLowerCase();
                return field.indexOf(term) >= 0;
            } else if (typeof item === 'number') {
                const field = item.toString();
                return field.indexOf(term) >= 0;
            } else if (Array.isArray(item)) {
                return item.some(sub => searchField(sub, term));
            } else {
                const keys = Object.keys(item);
                return keys.some(key => {
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
                const field = item.toLowerCase();
                return RegExp(`\\b${term}\\b`, 'i').test(field);
            } else if (typeof item === 'number') {
                const field = item.toString();
                return field.indexOf(term) >= 0;
            } else if (Array.isArray(item)) {
                return item.some(sub => searchWholeWord(sub, term));
            } else {
                const keys = Object.keys(item);
                return keys.some(key => {
                    if (!item || !item[key]) return false;
                    if (typeof item[key] === 'boolean' && item[key]) {
                        return key.toLowerCase().indexOf(term) >= 0;
                    }
                    return searchWholeWord(item[key], term);
                });
            }
            return false;
        }

        const filtered = data.filter(item => {
            if (item.isFront && item.ignoreSearch) return true;
            const keys = searchKeys || Object.keys(item);
            const terms = wholeWords
                ? [searchTerm.toLowerCase()]
                : searchTerm.toLowerCase().split(' ');
            if (terms.indexOf('') > -1) terms.splice(terms.indexOf(''), 1); // Remove extra ''

            const _searchWholeWord = term => {
                return keys.some(key => {
                    if (!item || !item[key]) return false;
                    if (typeof item[key] === 'boolean' && item[key]) {
                        return key.toLowerCase().indexOf(term) >= 0;
                    }
                    return searchWholeWord(item[key], term);
                });
            };

            const _searchField = term => {
                return keys.some(key => {
                    if (!item || !item[key]) return false;
                    if (item)
                        if (typeof item[key] === 'boolean' && item[key]) {
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
    },
};

export default Search;
