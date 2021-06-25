import axios from 'axios';

export const getJobDetails = (jobId) => async(dispatch) => {

    try {
        //const res = await axios.get(`http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/jobs/${jobId}`);
        const res = await axios.get(`https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/jobs/${jobId}`);

        res.data.jobId = jobId;
        dispatch({
            type: `GET_JOB_WITH_ID_SUCCESS`,
            payload: {data: res.data, isLoading: false, error: false}
        })
    } catch (err) {
        console.error(err);
    }
}