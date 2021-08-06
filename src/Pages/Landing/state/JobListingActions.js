import axios from 'axios';

export const getJobListings = () => async(dispatch) => {
    try {
        const res = await axios.get('https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/jobs');
        //const res = await axios.get('http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/jobs');
        // console.log('get jobs in action ', res.data)
        dispatch({
            type: 'GET_JOB_LISTINGS_SUCCESS',
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
}

export const applyJob = (candidate) => async(dispatch) => {
    console.log('apply job action ', candidate)
    let formData = new FormData(); 
    formData.append('firstName', candidate.firstName);  
    formData.append('lastName', candidate.lastName);
    formData.append('email', candidate.email);
    formData.append('zipCode', candidate.zipCode);
    formData.append('resume', candidate.fileUpload);
    formData.append('jobTitle', candidate.jobTitle);
    formData.append('clientName', candidate.clientName);
    formData.append('city', candidate.city);
    
    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    try {
        const res = await axios.post(`https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/jobs/${candidate.jobId}/apply`, formData, config);
        //const res = await axios.post(`http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/jobs/${candidate.jobId}/apply`, formData, config);
        dispatch({
            type: 'POST_APPLY_JOB_SUCCESS',
            payload: candidate,
        })
    } catch (err) {
        console.error(err);
        dispatch({
            type: 'POST_APPLY_JOB_FAILURE',
            payload: err
        })
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