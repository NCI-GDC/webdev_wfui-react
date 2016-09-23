export const filter = (filter, value) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter: filter,
        keyword: value,
    }
}

export const resetFilter = () => {
    return {
        type: 'RESET_VISIBILITY_FILTER'
    }
}