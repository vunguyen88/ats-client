import React, { useState, useEffect, useContext } from 'react';
import { 
    makeStyles, responsiveFontSizes,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../../components/NavBar';
import TopBar from '../../../components/TopBar';
import MenuBar from '../CandidateListPage/components/MenuBar';
import CandidateDetail from './components/CandidateDetail';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getCandidateDetails } from './state/CandidateDetailsActions';

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

function CandidateDetailPage( {match: { params: {id}}} ) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    let candidateInfo = {
        appliedJobs: [],
        candidateId: '',
        clientName: '',
        email: '',
        firstName: '',
        jobTitle: '',
        lastName: '',
        resumeUrl: '',
        status: '',
        userUID: '',
        zipCode: ''
    }
    const [candidate, setCandidate] = useState(candidateInfo);  
    const candidateList = useSelector(state => state.candidates || {});
    let candidateDetails = useSelector(state => state.candidateDetails || {});

    useEffect(() => {
        if (candidateList.data ) {
            console.log('GET DATA FROM REDUX')
            for (let i=0; i < candidateList.data.length; i++) {
                if (candidateList.data[i]['candidateId'] === id)  {
                    setCandidate({...candidateList.data[i]}, candidateInfo.appliedJobs = [...candidateList.data[i].appliedJobs]);
                    setLoading(false)
                }
            }
        } else if (candidateDetails.data !== undefined) {
            setCandidate({...candidateDetails.data});
            setLoading(false);
        } else {
            console.log('GET DATA FROM DATABASE')
            dispatch(getCandidateDetails(id));
        }
    }, [candidateDetails])
  

    return (
        <div className={classes.root}>
            <NavBar style={{display: 'block'}}/>
            <div className={classes.wrapper}>
                <TopBar />
                <MenuBar />
                {loading ? <LinearProgress /> : null}
                {candidate ? <CandidateDetail candidateDetails={candidate}/> : <CandidateDetail candidateDetails={candidateDetails.data}/>}
            </div>
        </div> 
    )
}

export default CandidateDetailPage
