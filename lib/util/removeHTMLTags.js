'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var removeHTMLTags = exports.removeHTMLTags = function removeHTMLTags(html) {
  return html.replace(/(<([^>]+)>)/gi, '');
};