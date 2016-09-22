export const filterByCompany = (name) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter: 'companyFilter',
        keyword: name,
    }
}

export const filterByKeyword = (keyword) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter: 'keywordFilter',
        keyword: keyword,
    }
}