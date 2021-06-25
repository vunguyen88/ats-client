import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@material-ui/core';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Job from './components/Job';
import { getJobListings } from './state/JobListingActions';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            //flexWrap: 'wrap',
            flexDirection: 'column',
        },
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'noWrap',
        height: '100vh',
    },
    left: {
        minWidth: '50%',
        background: 'white',
        overflow: 'scroll',
    },
    right: {
        
        minWidth: '50%',
        background: '#80b3b3',
    },
}));

// const SignInComponent = (
//     (window.location.href === 'http://localhost:3000/' || window.location.href === 'http://localhost:3000/signin') ? <SignIn /> : null
// )

// const SignUpComponent = (
//     (window.location.href === 'http://localhost:3000/signup') ? <SignIn /> : null
// )

export default function Landing() {
    const classes = useStyles();
    const dispatch = useDispatch();
    let jobListings = useSelector(state => state.jobListings || []);

    console.log('jobListings ', jobListings);
    useEffect(() => {
        dispatch(getJobListings());
        console.log('fetch data after useeffect')
    }, [])
    // console.log(window.location.href);

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                {jobListings.map(job => {
                    return <Job jobId={job.jobId} jobTitle={job.jobTitle} clientName={job.clientName} city={job.city} state={job.state} jobSummary={job.jobSummary} daysPosted={job.daysPosted} />
                })}   
            </div>
            <div className={classes.right}>
                {/* {SignInComponent}
                {SignUpComponent} */}
                {/* {window.location.href === 'http://localhost:3000/' || window.location.href === 'http://localhost:3000/signin' */}
                {window.location.href === 'https://applicant-tracking-syste-74466.web.app/' || window.location.href === 'https://applicant-tracking-syste-74466.web.app/signin'
                    ? <SignIn />
                    : <SignUp />
                }  
            </div>
        </div>
    )
}
