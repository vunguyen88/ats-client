import axios from 'axios';

export const userSignIn = (userCredential) => async(dispatch) => {
    try {
        //const res = await axios.post('http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/login', userCredential);
        const res = await axios.post('https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/login', userCredential);
        localStorage.setItem('token', res.data.token)
        dispatch({
            type: 'USER_SIGNIN_SUCCESS',
            payload: res.data
        })
    } catch (err) {
        console.error(err);
        dispatch({
            type: 'USER_SIGNIN_ERROR',
            payload: err
        })
    }
}

export const userSignUp = (userCredential, history) => async(dispatch) => {
    // console.log('user Credential in action ', userCredential)
    try {
        //const res = await axios.post('http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/signup', userCredential);
        const res = await axios.post('https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/signup', userCredential);
        localStorage.setItem('token', res.data.token)
        dispatch({
            type: 'USER_SIGNUP_SUCCESS',
            payload: res.data
        })
        history.push('/app/employees')
        
    } catch (err) {
        console.error(err);
    }
}