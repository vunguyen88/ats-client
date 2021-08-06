import axios from 'axios';

// export const userSignIn = (userCredential) => async(dispatch) => {
//     try {
//         const res = await axios.post('http://localhost:5000/applicant-tracking-syste-74466/us-central1/api/login', userCredential);
//         console.log('res success ', res.data)
//         dispatch({
//             type: 'USER_SIGNIN_SUCCESS',
//             payload: res.data
//         })
//     } catch (err) {
//         console.error(err);
//     }
// }
export const getAllJobs = () => async(dispatch) => {

    let token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        //const res = await axios.get('http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/alljobs', config);
        const res = await axios.get('https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/alljobs', config);

        dispatch({
            type: 'GET_ALL_JOBS_SUCCESS',
            payload: {data: res.data, isLoading: false, error: false}
        })
    } catch (err) {
        console.error(err);
    }
}

export const addJob = (job) => async(dispatch) => {
    let token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const res = await axios.post('https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/newjob', job, config);
        //const res = await axios.post('http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/newjob', job, config);
        console.log('res from add job action ', res)
        dispatch({
            type: 'ADD_JOB_SUCCESS',
            payload: {data: job, isLoading: false, error: false, success: true}
        })
        // history.push('/app/employees')
        
    } catch (err) {
        console.error(err);
        dispatch({
            type: 'ADD_JOB_FAIL',
            payload: err
        })
    }
}