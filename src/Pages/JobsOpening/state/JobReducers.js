const jobsReducers = (state = [], action) => {
    switch(action.type) {
        case 'GET_ALL_JOBS_SUCCESS': {
            console.log('action reducer ', action)
            return {...action.payload, isLoading: false, error: false}
        }
        // case 'ADD_NEW_EMPLOYEE_SUCCESS': {
        //     return [...state, action.payload]
        // }
        default:
            return state
    }
}

export default jobsReducers;