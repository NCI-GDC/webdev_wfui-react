import * as wfuiFetch from './util/wfuiFetch';
import { extLink } from './util/jquery.extLink';
import { scrollToFirstError } from './util/scrollToFirstError';

module.exports = {
    ...wfuiFetch,
    extLink,
    scrollToFirstError,
};
