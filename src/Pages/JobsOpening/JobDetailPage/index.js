import React, { useState, useEffect, useContext } from 'react';
import { 
    makeStyles, responsiveFontSizes,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../../components/NavBar';
import TopBar from '../../../components/TopBar';
import MenuBar from '../JobListPage/components/MenuBar';
import LinearProgress from '@material-ui/core/LinearProgress';
import JobDetail from './components/JobDetail';
import { getJobDetails } from './state/JobDetailsActions';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#f0f0f5',
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        width: '100%'
    },
    wrapper: {
        flexDirection: 'column', 
        width: '100%',
        flexGrow: 1,
        marginBottom: '2rem'
    },
    
}));

function JobDetailPage( {match: { params: {id}}} ) {
    console.log('JOB ID', id)
    const classes = useStyles();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    let jobInfo = {
        appliedCandidates: [],
        city: '',
        clientName: '',
        createdOn: '',
        daysPosted: 0,
        employmentType: '',
        industry: '',
        jobDescription: '',
        jobId: '',
        jobStatus: '',
        jobSummary: '',
        jobTitle: '',
        numberOfPositions: 0,
        skillSet: '',
        state: '',
        targetDate: '',
        workExperience: '',
        zipCode: ''
    }
    const [job, setJob] = useState(jobInfo);  
    const jobList = useSelector(state => state.jobs || {});
    let jobDetails = useSelector(state => state.jobDetails || {});
    console.log('job list ', job)

    // useEffect(() => {
    //     if (jobList.data ) {
    //         console.log('GET DATA FROM REDUX')
    //         for (let i=0; i < jobList.data.length; i++) {
    //             if (jobList.data[i]['jobId'] === id)  {
    //                 setJob({...jobList.data[i]}, jobInfo.appliedCandidates = [...jobList.data[i].appliedCandidates])
    //             }
    //         }
    //     } else if (jobDetails.data !== undefined) {
    //         setJob({...jobDetails.data})
    //     } else {
    //         console.log('GET DATA FROM DATABASE')
    //         dispatch(getJobDetails(id));
    //     }
    // }, [jobDetails])
    useEffect(() => {
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.get(`https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/jobs/${id}`, config)
        // axios.get(`http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/jobs/${id}`, config)
        .then(res => {
            res.data.jobId = id;
            setJob({...res.data});
            setLoading(false);
        })
    }, [])
    
  

    return (
        <div className={classes.root}>
            <NavBar style={{display: 'block'}}/>
            <div className={classes.wrapper}>
                <TopBar />
                <MenuBar />
                {loading ? <LinearProgress /> : null}
                {job ? <JobDetail jobDetails={job}/> : <JobDetail jobDetails={job}/>}
            </div>
        </div> 
    )
}

export default JobDetailPage
