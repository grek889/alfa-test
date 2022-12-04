const defaultState = {
    dataLists: []
}

export const imgReducer = (state = defaultState, action) => {

    switch (action.type) {
        case "ADD__DATA":
            return {...state, dataLists: [...state.dataLists, action.payload] }
        case "DELETE__DATA":
            return {...state, dataLists: state.dataLists.filter(data => data.id !== action.payload)}
        case "LIKE":
            return {...state, dataLists: state.dataLists.map(data => (data.id === action.payload ? { ...data, like: !data.like } : data))}
        default:
            return state
    }
}