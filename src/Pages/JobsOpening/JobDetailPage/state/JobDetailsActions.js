import axios from 'axios';

export const getJobDetails = (jobId) => async(dispatch) => {
    let token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const res = await axios.get(`http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/jobs/${jobId}`, config);
        //const res = await axios.get(`https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/jobs/${jobId}`, config);
        
        console.log('Suucess get job details')
        res.data.jobId = jobId;
        dispatch({
            type: `GET_JOB_WITH_ID_SUCCESS`,
            payload: {data: res.data, isLoading: false, error: false}
        })
    } catch (err) {
        console.error(err);
    }
}