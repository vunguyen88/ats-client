const candidatesReducers = (state = [], action) => {
    switch(action.type) {
        case 'GET_ALL_CANDIDATES_SUCCESS': {
            console.log('candidate action reducer ', action)
            return {...action.payload, isLoading: false, error: false}
        }
        // Try later
        // case 'GET_CANDIDATE_WITH_ID_SUCCESS': {
        //     console.log('candidateID reducer ', action.payload.data)
        //     return {...action.payload, isLoading: false, error: false}
        // }
        // case 'ADD_NEW_EMPLOYEE_SUCCESS': {
        //     return [...state, action.payload]
        // }
        default:
            return state
    }
}

export default candidatesReducers;