const jobListingsReducer = (state = [], action) => {
    switch(action.type) {
        case 'GET_JOB_LISTINGS_SUCCESS': {
            return [...action.payload]
        }
        
        // case 'ADD_NEW_EMPLOYEE_SUCCESS': {
        //     return [...state, action.payload]
        // }
        default:
            return state
    }
}

export default jobListingsReducer;