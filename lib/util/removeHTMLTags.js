export var removeHTMLTags = function removeHTMLTags(html) {
  return html.replace(/(<([^>]+)>)/gi, '');
};