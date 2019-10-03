export const flattenObject = (nestedMessages, prefix = '', devider = '_') => {
    if (!nestedMessages) return {};
    return Object.keys(nestedMessages).reduce((messages, key) => {
        const value = nestedMessages[key];
        const prefixedKey = prefix
            ? `${prefix}${devider}${key}`
            : isNaN(Number(key))
            ? key
            : `${devider}${key}`;

        if (typeof value !== 'object') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenObject(value, prefixedKey));
        }

        return messages;
    }, {});
};
