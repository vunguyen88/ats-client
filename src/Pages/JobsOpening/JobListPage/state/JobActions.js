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

    console.log('get all job in action')
    try {
        //const res = await axios.get('http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/jobs');
        const res = await axios.get('https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/jobs');

        dispatch({
            type: 'GET_ALL_JOBS_SUCCESS',
            payload: {data: res.data, isLoading: false, error: false}
        })
    } catch (err) {
        console.error(err);
    }
}

export const addJob = (job) => async(dispatch) => {

    try {
        const res = await axios.post('https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/newjob', job);
        //const res = await axios.post('http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/newjob', job);

        dispatch({
            type: 'ADD_JOB_SUCCESS',
            payload: res.data
        })
        // history.push('/app/employees')
        
    } catch (err) {
        console.error(err);
    }
}