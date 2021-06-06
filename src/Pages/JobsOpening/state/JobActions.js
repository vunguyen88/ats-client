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

export const addJob = (job) => async(dispatch) => {
    console.log('job data in action ', job)
    try {
        //const res = await axios.post('https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/newjob', job);
        const res = await axios.post('http://localhost:5000/applicant-tracking-syste-74466/us-central1/api/newjob', job);
        console.log('res success ', res.data)
        dispatch({
            type: 'ADD_JOB_SUCCESS',
            payload: res.data
        })
        // history.push('/app/employees')
        
    } catch (err) {
        console.error(err);
    }
}