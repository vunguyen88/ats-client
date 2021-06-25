import React, { useState, useEffect, useContext } from 'react';
import { 
    makeStyles, responsiveFontSizes,
} from '@material-ui/core';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../../components/NavBar';
import TopBar from '../../../components/TopBar';
import MenuBar from '../JobListPage/components/MenuBar';
import JobDetail from './components/JobDetail';
import { getJobDetails } from './state/JobDetailsActions';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        width: '100%'
    },
    wrapper: {
        flexDirection: 'column', 
        width: '100%',
        flexGrow: 1
    },
    
}));

function JobDetailPage( {match: { params: {id}}} ) {
    //console.log('CANDIDATE ID', id)
    const classes = useStyles();
    const dispatch = useDispatch();
    const [job, setJob] = useState();  
    const jobList = useSelector(state => state.jobs || {});
    let jobDetails = useSelector(state => state.jobDetails || {});

    useEffect(() => {
        if (jobList.data ) {
            console.log('GET DATA FROM REDUX')
            for (let i=0; i < jobList.data.length; i++) {
                if (jobList.data[i]['candidateId'] === id)  {
                    setJob({...jobList.data[i]})
                }
            }
        } else if (jobDetails.data !== undefined) {
            setJob({...jobDetails.data})
        } else {
            console.log('GET DATA FROM DATABASE')
            dispatch(getJobDetails(id));
        }
    }, [jobDetails])
  

    return (
        <div className={classes.root}>
            <NavBar style={{display: 'block'}}/>
            <div className={classes.wrapper}>
                <TopBar />
                <MenuBar />
                {job ? <JobDetail jobDetails={job}/> : <JobDetail jobDetails={jobDetails.data}/>}
            </div>
        </div> 
    )
}

export default JobDetailPage
