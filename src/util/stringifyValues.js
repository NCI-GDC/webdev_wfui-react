export const stringifyValues = (item) => {
    if (!item || typeof item === 'boolean') return '';
    if (typeof item === 'string') {
        return item;
    } else if (typeof item === 'number') {
        return item.toString();
    } else if (Array.isArray(item)) {
        return item.map(each => stringifyValues(each)).join(' ');
    }
    let ret = '';
    const keys = Object.keys(item);
    if (keys && keys.length > 0) {
        keys.forEach((key) => {
            if (item[key]) {
                if (typeof item[key] === 'boolean' && item[key]) {
                    ret += `${key} `;
                } else {
                    ret += `${stringifyValues(item[key])} `;
                }
            }
        });
    }
    return ret.trim();
};
