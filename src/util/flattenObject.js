export const flattenObject = (nestedMessages, prefix = '') => {
    if (!nestedMessages) return {};
    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value = nestedMessages[key];
        let prefixedKey = prefix
            ? `${prefix}_${key}`
            : isNaN(Number(key))
                ? key
                : `_${key}`;

        if (typeof value !== 'object') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenObject(value, prefixedKey));
        }

        return messages;
    }, {});
};
