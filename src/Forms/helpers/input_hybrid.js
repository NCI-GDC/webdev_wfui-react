/**
 * Utilities for input hybrid
 */
export const getValByKey = (key, options) => {
    let result = '';
    options.forEach((option) => {
        if (!result && key === getOptKey(option)) {
            result = getOptVal(option);
        }
    });
    return result;
}
 export const getPosition = (str, m, i) => {
    if(str.split(m, i).join(m).length == str.length){
        return -1;
    }
    return str.split(m, i).join(m).length;
}
export const getOptKey = (option) => {
    var key = option.substr(0, getPosition(option, "|", 1));
    if(!key && !option.includes("|")){
        key = option
    }
    return key;
}
export const getOptVal = (option) => {
    var from = getPosition(option, "|", 1) + 1;
    var to = getPosition(option, "|", 2);
    var val;
    if(to != -1){
        val = option.substr(from, to - from);
    }else{
        val = option.substr(from);
    }
    return val;
}
export const getOptSpecial = (option) => {
    option = option.toLowerCase();
    var from = getPosition(option, "|", 2) + 1;
    var special = "";
    if(from == 0){
        return [];
    }else{
        special = option.substr(from).replace(/ /g,"");
    }
    return (special != -1 && special.includes(",")) ? special.split(",") : [special];
}

export const parseAgeToken = (val, token) => {  
    
    if(isNumeric(val)){
        return val;
    }else if(token && val){
        var reg = /\[age\]([\+|\-])([0-9]+)/
        var _val = val.replace(/\s/g,"");
        if(_val == "[age]"){
            return token.user_age || undefined;
        }else if(_val.includes("[age]")){
            _val.match(reg)
            let res = _val.match(reg)
            if(res){
                if(res[1]=='+'){
                    return Number(token.user_age) + Number(res[2]);
                }else if(res[1]=='-'){
                    return Number(token.user_age) - Number(res[2]);
                }
            }else{
                return undefined;
            }
        }
    }else{
        return undefined;
    }
}