const employeesReducer = (state = [], action) => {
    switch(action.type) {
        case 'GET_ALL_EMPLOYEES_SUCCESS': {
            console.log('action reducer ', action)
            return [...action.payload]
        }
        case 'ADD_NEW_EMPLOYEE_SUCCESS': {
            return [...state, action.payload]
        }
        default:
            return state
    }
}

export default employeesReducer;