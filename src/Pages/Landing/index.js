import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Snackbar } from '@material-ui/core';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Job from './components/Job';
import { getJobListings } from './state/JobListingActions';
import JobDetails from './components/JobDetails';

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
    const [successCode, setSuccessCode] = useState(false);
    const [errorCode, setErrorCode] = useState();
    const [open, setOpen] = useState(false);
    ///
    const [openJobListing, setOpenJobListing] = useState(false);
    ///
    let token = localStorage.getItem('token');
    // console.log('jobListings ', jobListings);

    useEffect(() => {
        dispatch(getJobListings());
        // console.log('fetch data after useeffect')
    }, [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // console.log(window.location.href);

    const clickOpenJob = (isJobOpen) => {
        // console.log('isJobOpen ', isJobOpen);
        setOpenJobListing({...isJobOpen});
    }

    // console.log('Open job listing ', openJobListing.props);
 

    // return (
    //     <div className={classes.root}>
    //         <div className={classes.left}>
    //             {jobListings.map(job => {
    //                 return <Job jobId={job.jobId} jobTitle={job.jobTitle} clientName={job.clientName} city={job.city} state={job.state} jobSummary={job.jobSummary} daysPosted={job.daysPosted} clickOpenJob={clickOpenJob} />
    //             })}   
    //         </div>
    //         <div className={classes.right}>
    //             {/* {SignInComponent}
    //             {SignUpComponent} */}
    //             {window.location.href === 'http://localhost:3000/' || window.location.href === 'http://localhost:3000/signin'
    //             // {window.location.href === 'https://applicant-tracking-syste-74466.web.app/' || window.location.href === 'https://applicant-tracking-syste-74466.web.app/signin'
    //                 ? <SignIn />
    //                 : <SignUp />
    //             }  
    //         </div>
    //         <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
    //             {(() => {
    //                 if (successCode === true) {
    //                     return <Alert onClose={handleClose} severity="success">Update success </Alert>
    //                     // return <Alert onClose={handleClose} severity="success">New job added! Click <Link to={{pathname:'/app/sendgrid', state:{data: newJobResponseData}}}>here </Link> to go to notification page.</Alert>
    //                 } else if (errorCode === 403) {
    //                     return <Alert onClose={handleClose} severity="error">Authentication expired! Please click <Link to='/' >here</Link> to go back to Login</Alert>
    //                 } else {
    //                     return <Alert onClose={handleClose} severity="error">Update fail!</Alert>
    //                 }
    //             })()}
    //         </Snackbar>
    //     </div>
    // )



    return (
        <div className={classes.root}>
            <div className={classes.left}>
                {openJobListing.isOpen ? <JobDetails jobDetails={openJobListing.props} clickOpenJob={clickOpenJob} /> : (jobListings.map(job => {
                    return <Job jobId={job.jobId} jobTitle={job.jobTitle} clientName={job.clientName} city={job.city} state={job.state} jobSummary={job.jobSummary} daysPosted={job.daysPosted} jobDescription={job.jobDescription} logoUrl={job.logoUrl} clickOpenJob={clickOpenJob} />
                }))}   
            </div>
            <div className={classes.right}>
                {/* {window.location.href === 'http://localhost:3000/' || window.location.href === 'http://localhost:3000/signin' */}
                {window.location.href === 'https://applicant-tracking-syste-74466.web.app/' || window.location.href === 'https://applicant-tracking-syste-74466.web.app/signin' 
                    ? <SignIn />
                    : <SignUp />
                }  
            </div>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                {(() => {
                    if (successCode === true) {
                        return <Alert onClose={handleClose} severity="success">Update success </Alert>
                        // return <Alert onClose={handleClose} severity="success">New job added! Click <Link to={{pathname:'/app/sendgrid', state:{data: newJobResponseData}}}>here </Link> to go to notification page.</Alert>
                    } else if (errorCode === 403) {
                        return <Alert onClose={handleClose} severity="error">Authentication expired! Please click <Link to='/' >here</Link> to go back to Login</Alert>
                    } else {
                        return <Alert onClose={handleClose} severity="error">Update fail!</Alert>
                    }
                })()}
            </Snackbar>
        </div>
    ) 
}
