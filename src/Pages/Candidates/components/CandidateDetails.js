import React, { useState, useEffect } from 'react'
import NavBar from '../../components/NavBar';
import TopBar from '../../components/TopBar';
import { makeStyles } from '@material-ui/core/styles';
import MenuBar from './components/MenuBar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCandidates } from './state/CandidateActions';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import GetAppIcon from '@material-ui/icons/GetApp';
import Rating from '@material-ui/lab/Rating';
import moment from 'moment';
import { LinearProgress } from '@material-ui/core';
import { Grid, Box, Card, Typography, InputBase, IconButton } from '@material-ui/core';
// import UtilityBar from './components/UtilityBar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex', 
        backgroundColor: '#f0f0f5',
        height: '100vh'
    },
    wrapper: {
        flexDirection: 'column', 
        width: '100%',
        flexGrow: 1
    },
}))


export default function CandidateDetailsPage() {
    const classes = useStyles();
    // const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    
    
    let candidates = useSelector(state => state.candidates || {});

    // useEffect(() => {
    //     let dataRows = []
    //     dispatch(getAllCandidates());
    //     console.log('candidates selector ', candidates)
    //     if (candidates.data) {
    //         console.log('jobs in useEffect ', candidates)
    //         candidates.data.forEach(candidate => {
    //             dataRows.push({ 
    //                 candidateName: candidate.firstName + ' ' + candidate.lastName, 
    //                 jobApplied: candidate.appliedJobs ? candidate.appliedJobs.length : 0, 
    //                 email: candidate.email, 
    //                 appliedOn: moment(candidate.createdOn).format('M/DD/YYYY'), 
    //                 id: candidate.userUID,
    //                 //rating: candidate.rating,
    //                 zipCode: candidate.zipCode,
    //             })
    //         })
    //         setLoading(false);
    //         setData({ columns, rows: dataRows })
    //         console.log('data ', data)
    //     }
    //     console.log('fetch all candidates after useeffect', data)
    // }, [])


    return (
        <div className={classes.root}>
            <NavBar style={{display: 'block'}}/>
            <div className={classes.wrapper}>
                <TopBar />
                <MenuBar style={{}}/>
                Candidate details
            </div>
        </div>
    )
}
