import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import TopBar from '../../components/TopBar';
import { makeStyles } from '@material-ui/core/styles';
import MenuBar from './components/MenuBar';
import TimeOffRequest from './components/TimeOffRequest';
import MyRequest from './components/MyRequest';
import { Alert, AlertTitle } from '@material-ui/lab';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import { AppBar, Toolbar, Card, Typography, Box, Button, Grid, TextField, Snackbar, LinearProgress } from '@material-ui/core';
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
    // search: {
    //     display: 'inline',
    //     position: 'relative',
    //     borderRadius: theme.shape.borderRadius,
    //     // backgroundColor: fade(theme.palette.common.white, 0.15),
    //     backgroundColor: 'whiteSmoke',
    //     '&:hover': {
    //     // backgroundColor: fade(theme.palette.common.white, 0.25),
    //     backgroundColor: theme.palette.common.red,
    //     },
    //     marginRight: theme.spacing(2),
    //     marginLeft: 0,
    //     width: '100%',
    //     [theme.breakpoints.up('sm')]: {
    //     marginLeft: theme.spacing(3),
    //     width: '15%',
    //     },
    // },
    // searchIcon: {
    //     padding: theme.spacing(0, 2),
    //     height: '100%',
    //     position: 'absolute',
    //     pointerEvents: 'none',
    //     display: 'inline',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     top: '5px'
    // },
    // inputRoot: {
    //     color: 'inherit',
    // },
    // inputInput: {
    //     padding: theme.spacing(1, 1, 1, 0),
    //     // vertical padding + font size from searchIcon
    //     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    //     transition: theme.transitions.create('width'),
    //     width: '100%',
    //     [theme.breakpoints.up('md')]: {
    //     width: '20ch',
    //     },
    // },
}))

export default function TimeOffPage() {
    const classes = useStyles();
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [successCode, setSuccessCode] = useState(false);
    const [errorCode, setErrorCode] = useState();
    const [open, setOpen] = useState(false);
    console.log('moment ', moment().unix())

    let columns = [
        { field: 'timeoffType', width: 200, renderHeader: () => (<strong style={{ fontSize: 17 }}>Time Off Type</strong>)},
        { field: 'manager', width: 220, renderHeader: () => (<strong style={{ fontSize: 17 }}>Manager</strong>)},
        { field: 'status', width: 150, renderHeader: () => (<strong style={{ fontSize: 17 }}>Status</strong>)},
        { field: 'beginDate', width: 160, renderHeader: () => (<strong style={{ fontSize: 17}}>Begin Date</strong>)},
        { field: 'endDate', width: 160, renderHeader: () => (<strong style={{ fontSize: 17}}>End Date</strong>)},
        { field: 'createdOn', type: 'date', width: 150, renderHeader: () => (<strong style={{ fontSize: 17}}>Applied On</strong>)},
        { field: 'description', width: 450, renderHeader: () => (<strong style={{ fontSize: 17}}>Description</strong>)},
    ]

    const [timeoffData, setTimeoffData] = useState({ columns: columns, rows: [] })

    useEffect(() => {
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.get('https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/profile', config)
        //axios.get('http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/profile', config)
        .then(res => {
            //res.data.jobId = id;
            //console.log('data get in timeoff', res.data);
            setLoading(false);
            setUserDetails({...res.data});
            
            if (res.data.timeoff) {
                let dataRows = [];
                res.data.timeoff.forEach(timeoff => {
                    dataRows.push({
                        timeoffType: timeoff.timeoffType,
                        id: moment(timeoff.createdOn).unix(),
                        manager: timeoff.manager,
                        status: timeoff.status,
                        beginDate: timeoff.beginDate,
                        endDate: timeoff.endDate,
                        createdOn: moment(timeoff.createdOn).format('MM/DD/YYYY'),
                        description: timeoff.description
                    })
                })
                setTimeoffData({ columns, rows: dataRows})
            }
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    console.log('time off data ', timeoffData)

    function submitRequest(requestDetails) {
        requestDetails.manager = userDetails.manager;
        requestDetails.userId = userDetails.userId;
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/users/${userDetails.userId}/timeoff/reqest`, requestDetails, config)
        //axios.post(`http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/users/${userDetails.userId}/timeoff/reqest`, requestDetails, config)
        .then(res => {
            //res.data.jobId = id;
            console.log('data get in timeoff', res.data);
            setLoading(false);
            setSuccessCode(true);
            setOpen(true);
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            setErrorCode(err.response.status);
            setOpen(true);
            setLoading(false);
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    return (
        <div className={classes.root}>
            <NavBar style={{display: 'block'}}/>
            <div className={classes.wrapper}>
                <TopBar />
                {/* <h1>Timeoff Page is under construction</h1> */}
                <MenuBar />
                <Box display='flex' alignItems="center" color='white' justifyContent="center" mb={-4} ml={3} mt={3} width='14%' height='40px' fontSize='18px' style={{backgroundColor:'#5F9EA0'}}>Time Off Request</Box>
                <TimeOffRequest userDetails={userDetails} submitRequest={submitRequest} />
                <Box display='flex' alignItems="center" color='white' justifyContent="center" ml={3} mt={3} width='11%' height='40px' fontSize='18px' style={{backgroundColor:'#5F9EA0'}}>My Request</Box>
                {/* <MyRequest timeoffData={timeoffData}    /> */}
                <Box mx={3} mt={1} mb={1} backgroundColor='white'>
                    <Grid container>
                        <Grid item md={12} xs={12}>
                            <Card>
                                <Box height="300px">
                                {/* {loading ? <LinearProgress /> : null} */}
                                    <DataGrid
                                        {...timeoffData}
                                        loading={loading}
                                        pageSize={50}
                                        //onRowSelected={handleRowClick}
                                        // components={{
                                        //     LoadingOverlay: CustomLoadingOverlay
                                        // }}
                                    >
                                    </DataGrid>
                                </Box>
                            </Card>                
                        </Grid>
                    </Grid>
                    
                </Box>
            </div>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                {(() => {
                    if (successCode === true) {
                        return <Alert onClose={handleClose} severity="success">Request timeoff success </Alert>
                        // return <Alert onClose={handleClose} severity="success">New job added! Click <Link to={{pathname:'/app/sendgrid', state:{data: newJobResponseData}}}>here </Link> to go to notification page.</Alert>
                    } else if (errorCode === 403) {
                        return <Alert onClose={handleClose} severity="error">Authentication expired! Please click <Link to='/' >here</Link> to go back to Login</Alert>
                    } else {
                        return <Alert onClose={handleClose} severity="error">Request timeoff fail!</Alert>
                    }
                })()}
            </Snackbar>
        </div>
    )
}
