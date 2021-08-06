const jobsReducers = (state = [], action) => {
    switch(action.type) {
        case 'GET_ALL_JOBS_SUCCESS': {
            // console.log('action reducer ', action)
            //console.log('current state in new job form ', state)
            return {...action.payload, isLoading: false, error: false}
        }
        // case 'ADD_NEW_EMPLOYEE_SUCCESS': {
        //     return [...state, action.payload]
        // }
        case 'ADD_JOB_SUCCESS': {
            let newjobs = [...state.data, action.payload.data]
            return {...newjobs, isLoading: false, error: false, success: true}
        }
        case 'ADD_JOB_FAIL': {
            return {...state, isLoading: false, error: false}
        }
        default:
            return state
    }
}

export default jobsReducers;