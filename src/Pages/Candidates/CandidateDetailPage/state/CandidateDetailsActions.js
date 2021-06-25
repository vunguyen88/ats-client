import axios from 'axios';

export const getCandidateDetails = (candidateId) => async(dispatch) => {

    try {
        //const res = await axios.get(`http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/candidates/${candidateId}`);
        const res = await axios.get(`https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/candidates/${candidateId}`);

        res.data.candidateId = candidateId;
        dispatch({
            type: `GET_CANDIDATE_WITH_ID_SUCCESS`,
            payload: {data: res.data, isLoading: false, error: false}
        })
    } catch (err) {
        console.error(err);
    }
}