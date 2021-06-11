const candidatesReducers = (state = [], action) => {
    switch(action.type) {
        case 'GET_ALL_CANDIDATES_SUCCESS': {
            console.log('candidate action reducer ', action)
            return {...action.payload, isLoading: false, error: false}
        }
        // case 'ADD_NEW_EMPLOYEE_SUCCESS': {
        //     return [...state, action.payload]
        // }
        default:
            return state
    }
}

export default candidatesReducers;