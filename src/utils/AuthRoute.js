import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { AuthContext } from '../contexts/AuthContext';
import jwt_decode from "jwt-decode";

const AuthRoute = ({ component: Component, ...rest }) => {
    //const authContext = useContext(AuthContext);
    // console.log('token in AuthRoute is ', localStorage.getItem('token'))
    if (localStorage.getItem('token') === null) {
       return <Redirect to={{ pathname: '/'}}/>
    } else {
        let FBToken = localStorage.getItem('token');
        // let decodedToken = jwt_decode(authContext.authTokens);
        let decodedToken = jwt_decode(FBToken);
        let isValid = decodedToken.exp*1000 > Date.now();
        return (
            <Route {...rest} render={(props) => isValid ? (<Component {...props} />) : (<Redirect to={{ pathname: '/' }}/>)} />
        );
    }
}

export default AuthRoute
