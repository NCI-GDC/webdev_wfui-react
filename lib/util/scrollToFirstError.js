"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* global window, document */

var scrollToFirstError = exports.scrollToFirstError = function scrollToFirstError(elementClass) {
    var errorElements = document.getElementsByClassName(elementClass);
    if (!errorElements || errorElements.length < 1) {
        window.scrollTo(0, 0);
    } else {
        errorElements[0].scrollIntoView();
    }
};