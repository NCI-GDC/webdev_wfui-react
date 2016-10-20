const applyPageFilter = (state, page, numPerPage) => {
    var _state = state.slice();
    var _page = page ? page : 1;
    return _state.splice( (Number(_page) -1) * numPerPage, numPerPage);
}

const applyAlphabetFilter = (state, keyword, property) => {
    return state.filter((item, i)=>{
        if(!keyword) return true;
        return item[property].charAt(0).toLowerCase() == keyword
    });
}

const applyListFilter = (state, value, property) => {
    return state.filter((item, i)=>{
        if(!value){
            return true
        }
        return item[property] == value
    });
}

const applyKeywordFilter = (state, keywords) => {
    return state.filter((state, i)=>{
        if(!keywords) return true;
        const keys = keywords.split(" ");
        let result = false;
        keys.forEach((key, j)=>{
            key = key.toLowerCase();
            if(!key) return false;
            if(state.fname.toLowerCase().includes(key)
                || state.lname.toLowerCase().includes(key)
                || state.company.toLowerCase().includes(key) ){
                    result = true
            }
        });
        return result;
    });
}

const genListMap = (state, property) => {
    var map = {}
    state.forEach((item, i)=>{
        if(!map[item[property]]){
            map[item[property]] = item[property]
        }
    });
    return map
}

const genAlphabetMap = (state, property) => {
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    let alphabetMap = {}
    for (var i = 0, len = alphabet.length; i < len; i++) {
        let key =  alphabet.charAt(i);
        let filter = state.filter((item, j)=>{
            return key == (item[property] && item[property].charAt(0).toLowerCase());
        });
        alphabetMap[key] = filter.length > 0
    }
    return alphabetMap
}

export default {
    applyAlphabetFilter,
    applyListFilter,
    applyKeywordFilter,
    applyPageFilter,
    genListMap,
    genAlphabetMap
}