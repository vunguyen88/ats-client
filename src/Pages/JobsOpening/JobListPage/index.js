import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import NavBar from '../../../components/NavBar';
import TopBar from '../../../components/TopBar';
import { makeStyles } from '@material-ui/core/styles';
import MenuBar from './components/MenuBar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from './state/JobActions';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import moment from 'moment';
import { LinearProgress } from '@material-ui/core';
import { Grid, Box, Card, Typography, InputBase } from '@material-ui/core';
//import { iteratorSymbol } from 'immer/dist/internal';

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

export default function JobsOpeningPage() {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();

    let columns = [
        { field: 'jobTitle', width: 250, renderHeader: () => (<strong style={{ fontSize: 17 }}>Job Title</strong>)},
        { field: 'city', width: 150, renderHeader: () => (<strong style={{ fontSize: 17}}>City</strong>)},
        { field: 'clientName', width: 250, renderHeader: () => (<strong style={{ fontSize: 17}}>Client Name</strong>)},
        { field: 'createdOn', type: 'date', width: 140, renderHeader: () => (<strong style={{ fontSize: 17}}>Created On</strong>)},
        { field: 'jobStatus', width: 150, renderHeader: () => (<strong style={{ fontSize: 17}}>Job Status</strong>)},
        { field: 'numberOfPositions', width: 115, renderHeader: () => (<strong style={{ fontSize: 17}}>Needed</strong>)},
        { field: 'appliedCandidates', width: 140, renderHeader: () => (<strong style={{ fontSize: 17}}>Candidates</strong>)},
        { field: 'hired', width: 100, renderHeader: () => (<strong style={{ fontSize: 17}}>Hired</strong>)},
    ]
    const [data, setData] = useState({ columns: columns, rows: [] })
    
    const jobs = useSelector(state => state.jobs);
    let dataRows = []
    useEffect(() => {
        if (jobs.data) {
            //console.log('jobs in useEffect ', jobs)
            jobs.data.forEach(job => {
                dataRows.push({ 
                    jobTitle: job.jobTitle, 
                    city: job.city, 
                    clientName: job.clientName, 
                    createdOn: moment(job.createdOn).format('M/DD/YYYY'), 
                    jobStatus: job.jobStatus,
                    jobId: job.jobId,
                    id: job.jobId, 
                    numberOfPositions: job.numberOfPositions, 
                    appliedCandidates: job.appliedCandidates > 0 ? job.appliedCandidates.length : 0
                })
            })
            //console.log('data ', data)
            setLoading(false);
            setData({ columns, rows: dataRows })
            
        } else {
            //console.log('NOT DOING DISPATCH');
            dispatch(getAllJobs());
            //setLoading(false);
        }
        
    }, [jobs])

    const handleRowClick = (job) => {
        history.push(`/app/jobs/${job.data.id}`);
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
                                    loading={loading}
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
