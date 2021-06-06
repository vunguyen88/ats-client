import axios from 'axios';

export const getJobListings = () => async(dispatch) => {
    try {
        //const res = await axios.get('https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/jobs');
        const res = await axios.get('http://localhost:5000/applicant-tracking-syste-74466/us-central1/api/jobs');
        // console.log('get jobs in action ', res.data)
        dispatch({
            type: 'GET_JOB_LISTINGS_SUCCESS',
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
}

// export const addNewEmployee = (userData) => async(dispatch) => {
//     try {
//         //const res = await axios.get('https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/users');
//         console.log('payload in action', userData)
//         dispatch({
//             type: 'ADD_NEW_EMPLOYEE_SUCCESS',
//             payload: userData
//         })
//     } catch (err) {
//         console.error(err);
//     }
// }