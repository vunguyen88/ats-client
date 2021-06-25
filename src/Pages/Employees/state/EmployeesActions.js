import axios from 'axios';

export const getAllEmployees = () => async(dispatch) => {
    try {
        const res = await axios.get('http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/users');
        //const res = await axios.get('https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/users');
        dispatch({
            type: 'GET_ALL_EMPLOYEES_SUCCESS',
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
}

export const addNewEmployee = (userData) => async(dispatch) => {
    try {
        //const res = await axios.get('https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/users');
        console.log('payload in action', userData)
        dispatch({
            type: 'ADD_NEW_EMPLOYEE_SUCCESS',
            payload: userData
        })
    } catch (err) {
        console.error(err);
    }
}