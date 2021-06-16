import React, { useState, useEffect, useContext } from 'react';
import { 
    makeStyles, responsiveFontSizes,
} from '@material-ui/core';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../../components/NavBar';
import TopBar from '../../../components/TopBar';
import MenuBar from '../CandidateListPage/components/MenuBar';
import CandidateDetail from './components/CandidateDetail';
import { getCandidateDetails } from './state/CandidateDetailsActions';

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

function CandidateDetailPage( {match: { params: {id}}} ) {
    //console.log('CANDIDATE ID', id)
    const classes = useStyles();
    const dispatch = useDispatch();

    let candidateInList;
    const candidateList = useSelector(state => state.candidates)
    let candidateDetails = useSelector(state => state.candidateDetails);


    useEffect(() => {
        console.log('in use effect look for redux candidates ', candidateList)
        if (candidateList.data) {
           console.log('candidate in redux store')
        } else {
            console.log('data not in redux store so start pulling from firebase')
            dispatch(getCandidateDetails(id))
        }
    }, [candidateList])

    if (candidateList.data) {
        for (let i=0; i < candidateList.data.length; i++) {
            if (candidateList.data[i]['candidateId'] === id)  {
                candidateDetails.data = candidateList.data[i]
                //console.log('RETURN CANDIDATE FROM LIST')
                break;
            }
        }
    }
  

    
    
    return (
        <div className={classes.root}>
            <NavBar style={{display: 'block'}}/>
            <div className={classes.wrapper}>
                <TopBar />
                <MenuBar />
                <CandidateDetail candidateDetails={candidateDetails.data}/>
            </div>
        </div> 
    )
}

export default CandidateDetailPage
