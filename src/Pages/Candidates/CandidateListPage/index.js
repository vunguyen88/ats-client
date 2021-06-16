import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import NavBar from '../../../components/NavBar';
import TopBar from '../../../components/TopBar';
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

function CustomLoadingOverlay() {
    return (
        <GridOverlay>
            <div style={{ position: 'absolute', top: 10, width: '100%' }}>
                <LinearProgress />
            </div>
        </GridOverlay>
    )
}

export default function CandidatesPage() {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();
    let columns = [
        { field: 'candidateName', width: 220, renderHeader: () => (<strong style={{ fontSize: 17 }}>Name</strong>)},
        { field: 'status', width: 110, renderHeader: () => (<strong style={{ fontSize: 17 }}>Status</strong>)},
        { field: 'jobApplied', width: 170, renderHeader: () => (<strong style={{ fontSize: 17}}>Job Applied</strong>)},
        { field: 'email', width: 230, renderHeader: () => (<strong style={{ fontSize: 17}}>Email</strong>)},
        { field: 'appliedOn', type: 'date', width: 140, renderHeader: () => (<strong style={{ fontSize: 17}}>Applied On</strong>)},
        { field: 'rating', headerName: 'Rating', width: 150, 
            renderHeader: () => (<strong style={{ fontSize: 17}}>Rating</strong>),
            renderCell: (param) => (
                <Rating
                    size='small'
                    name='simple-controller'
                    readOnly
                    value={param.row.rating}
                />
            )
        },
        { field: 'resume', width: 150, 
            renderHeader: () => (<strong style={{ fontSize: 17}}>Rating</strong>),
            renderCell: (param) => (
                <IconButton color='primary' aria-label='Download' href={param.row.resume}>
                    <GetAppIcon />
                </IconButton>
            )
        },
        { field: 'zipCode', width: 120, renderHeader: () => (<strong style={{ fontSize: 17}}>Zip Code</strong>)}
    ]

    const [data, setData] = useState({ columns: columns, rows: [] })
    
    let candidates = useSelector(state => state.candidates || {});

    useEffect(() => {
        let dataRows = []
        dispatch(getAllCandidates());
        console.log('candidates selector ', candidates)
        if (candidates.data) {
            console.log('jobs in useEffect ', candidates)
            candidates.data.forEach(candidate => {
                dataRows.push({ 
                    candidateName: candidate.firstName + ' ' + candidate.lastName, 
                    jobApplied: candidate.appliedJobs ? candidate.appliedJobs.length : 0, 
                    email: candidate.email, 
                    appliedOn: moment(candidate.createdOn).format('M/DD/YYYY'), 
                    id: candidate.candidateId,
                    //rating: candidate.rating,
                    zipCode: candidate.zipCode,
                })
            })
            setLoading(false);
            setData({ columns, rows: dataRows })
            console.log('data ', data)
        }
        console.log('fetch all candidates after useeffect', data)
    }, [])

    const handleRowClick = (candidate) => {
        console.log(' PUSHING TO CANDIDATE ', candidate)
        history.push(`/app/candidates/${candidate.data.id}`);
    }  


    return (
        <div className={classes.root}>
            <NavBar style={{display: 'block'}}/>
            <div className={classes.wrapper}>
                <TopBar />
                <MenuBar style={{}}/>
                <Grid container>
                    <Grid item md={12} xs={12}>
                        <Card>
                            <Box height="700px">
                                <DataGrid
                                    {...data}
                                    //loading={loading}
                                    pageSize={50}
                                    onRowSelected={handleRowClick}
                                    // components={{
                                    //     LoadingOverlay: CustomLoadingOverlay
                                    // }}
                                >
                                </DataGrid>
                            </Box>
                        </Card>                
                    </Grid>
                </Grid>
                {/* <UtilityBar /> */}
                {/* <Box display="flex">
                {employees.map(employee => {
                    return <EmployeeCard key={employee.userId} firstName={employee.firstName} lastName={employee.lastName} avatarUrl={employee.avatarUrl} jobTitle={employee.jobTitle} department={employee.department} join={employee.join} />
                })}
                </Box> */}
            </div>
        </div>
    )
}
