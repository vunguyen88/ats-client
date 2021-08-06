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
export const getAllCandidates = () => async(dispatch) => {
    let token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        //const res = await axios.get('http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/candidates', config);
        const res = await axios.get('https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/candidates', config);

        dispatch({
            type: 'GET_ALL_CANDIDATES_SUCCESS',
            payload: {data: res.data, isLoading: false, error: false}
        })
    } catch (err) {
        console.error(err);
    }
}

// export const addJob = (job) => async(dispatch) => {

//     try {
//         //const res = await axios.post('https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/newjob', job);
//         const res = await axios.post('http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/newjob', job);

//         dispatch({
//             type: 'ADD_JOB_SUCCESS',
//             payload: res.data
//         })
//         // history.push('/app/employees')
        
//     } catch (err) {
//         console.error(err);
//     }
// }