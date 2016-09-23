export const filter = (filter, value) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter: filter,
        keyword: value,
    }
}

export const resetfilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter: filter,
    }
}