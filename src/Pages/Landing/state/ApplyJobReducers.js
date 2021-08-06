const applyJobReducer = (state = {}, action) => {
    switch(action.type) {
        case 'POST_APPLY_JOB_SUCCESS': {
            console.log('action reducer in apply job reducer ', action)
            return {...action.payload, isLoading: false, error: false}
        }
        case 'POST_APPLY_JOB_FAILURE': {
            console.log('action reducer in apply job reducer', action)
            return {...action.payload, isLoading: false, error: true}
        }
        
        // case 'ADD_NEW_EMPLOYEE_SUCCESS': {
        //     return [...state, action.payload]
        // }
        default:
            return state
    }
}

export default applyJobReducer;