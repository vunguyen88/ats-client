import jwt_decode from "jwt-decode";

const userReducer = (state = {}, action) => {
    console.log ('auth reducer ', action)
    switch(action.type) {
        case 'USER_SIGNIN_SUCCESS': 
            console.log('action reducer ', action)
            let decoded = jwt_decode(action.payload.token);
            console.log('decoded ', decoded)
            if (state !== {}) return {...state, ...action.payload, isAuthenticated: true, loading: false, userId: decoded.user_id, email: decoded.email}
            else return {...action.payload, isAuthenticated: true, loading: false}
        
        case 'USER_SIGNUP_SUCCESS': {
            console.log('action reducer ', action)
            let decoded = jwt_decode(action.payload.token);
            console.log('decoded ', decoded)
            if (state !== {}) return {...state, ...action.payload, isAuthenticated: true, loading: false, userId: decoded.user_id, email: decoded.email}
            else return {...action.payload, isAuthenticated: true, loading: false}
        }
        default:
            return state
    }
}

export default userReducer;