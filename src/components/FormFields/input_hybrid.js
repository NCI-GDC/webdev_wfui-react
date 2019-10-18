const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

/**
 * Utilities for input hybrid
 */
export const getValByKey = (key, options) => {
    let result = '';
    options.forEach(option => {
        if (!result && key === getOptKey(option)) {
            result = getOptVal(option);
        }
    });
    return result;
};
export const getPosition = (str, m, i) => {
    if (str.split(m, i).join(m).length == str.length) {
        return -1;
    }
    return str.split(m, i).join(m).length;
};
export const getOptKey = option => {
    let key = option.substr(0, getPosition(option, '|', 1));
    if (!key && !option.includes('|')) {
        key = option;
    }
    return key;
};
export const getOptVal = option => {
    const from = getPosition(option, '|', 1) + 1;
    const to = getPosition(option, '|', 2);
    let val;
    if (to != -1) {
        val = option.substr(from, to - from);
    } else {
        val = option.substr(from);
    }
    return val;
};
export const getOptSpecial = option => {
    option = option.toLowerCase();
    const from = getPosition(option, '|', 2) + 1;
    let special = '';
    if (from == 0) {
        return [];
    }
    special = option.substr(from).replace(/ /g, '');

    return special != -1 && special.includes(',')
        ? special.split(',')
        : [special];
};

export const parseAgeToken = (val, token) => {
    if (isNumeric(val)) {
        return val;
    }
    if (token && val) {
        const reg = /\[age\]([\+|\-])([0-9]+)/;
        const _val = val.replace(/\s/g, '');
        if (_val == '[age]') {
            return token.user_age || undefined;
        }
        if (_val.includes('[age]')) {
            _val.match(reg);
            const res = _val.match(reg);
            if (res) {
                if (res[1] == '+') {
                    return Number(token.user_age) + Number(res[2]);
                }
                if (res[1] == '-') {
                    return Number(token.user_age) - Number(res[2]);
                }
            } else {
                return undefined;
            }
        }
    } else {
        return undefined;
    }
};
