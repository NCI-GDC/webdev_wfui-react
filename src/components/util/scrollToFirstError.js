/* global window, document */

export const scrollToFirstError = elementClass => {
    const errorElements = document.getElementsByClassName(elementClass);
    if (!errorElements || errorElements.length < 1) {
        window.scrollTo(0, 0);
    } else {
        errorElements[0].scrollIntoView();
    }
};
