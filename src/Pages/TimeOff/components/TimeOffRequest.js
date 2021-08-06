import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, Grid, TextField } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const CustomButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        marginLeft: '15px',
        border: '1px solid #dfdfdf',
        lineHeight: 1.5,
        backgroundColor: 'white',
        borderColor: 'f2f2f2',
        fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
        //backgroundColor: 'gray',
        borderColor: 'f2f2f2',
        boxShadow: 'none',
        },
        '&:active': {
        boxShadow: 'none',
        //backgroundColor: 'white',
        borderColor: '#f2f2f2',
        },
        '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    }
})(Button);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

const timeOffTypes = [
    {
        value: 'Vacation',
        label: 'Vacation'
    },
    {
        value: 'Sick Leave',
        label: 'Sick Leave'
    },
    {
        value: 'Maternity Leave',
        label: 'Maternity Leave'
    },
    {
        value: 'Paternity Leave',
        label: 'Paternity Leave'
    },
    {
        value: 'Bereavement Leave',
        label: 'Bereavement Leave'
    }
];


export default function TimeOffRequest({ userDetails, submitRequest }) {
    console.log('props', userDetails)
    const [formData, setFormData] = useState({ 
        //employeeId: userDetails.userId, 
        timeoffType: 'vacation', 
        timeoffHours: userDetails.timeoffHours,
        beginDate: moment().format('MM/DD/YYYY'),
        endDate: moment().format('MM/DD/YYYY'),
        daysOff: 0,
        hoursOff: 0,
        description: '',
        //targetDate: moment().format('MM/DD/YYYY'),
        //manager: userDetails.manager,
        status: 'pending'
    })

    const classes = useStyles();

    const handleChange = (event) => {
        setFormData({...formData, [event.target.id]: event.target.value})
    }

    const handleBeginDateChange = (date) => {
        console.log('begin date ', moment(date).format('MM/DD/YYYY'))
        setFormData({...formData, beginDate: moment(date).format('MM/DD/YYYY')});
    };

    const handleEndDateChange = (date) => {
        setFormData({
            ...formData, 
            endDate: moment(date).format('MM/DD/YYYY'), 
            daysOff: moment.duration(moment(date).diff(moment(formData.beginDate))).days(),
            hoursOff: moment.duration(moment(date).diff(moment(formData.beginDate))).days() * 24,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        submitRequest(formData)
        console.log('data submit ', formData);
        console.log('hours spend ', moment.duration(moment(formData.endDate).diff(moment(formData.beginDate))).days())
        //dispatch(addJob(formData))
        //dispatch(userSignUp({ email: state.email, password: state.password, firstName: state.firstName, lastName: state.lastName, role: 'user' }, history))
    }

    return (
        <div className={classes.root}>
            <form onSubmit={onSubmit}>
            
                <Box mx={3} mt={3} mb={1} backgroundColor='white'>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <Box p={3} style={{backgroundColor: 'white', height: '80%'}}>
                                <Grid container spacing={3}>
                                    <Grid item md={6} xs={6}> 
                                        <TextField
                                            fullWidth
                                            label="Employee Name"
                                            id="employeeName"
                                            name='employeeName'
                                            //variant="outlined"
                                            //required
                                            InputLabelProps={{shrink: true}}
                                            //inputRef={register}
                                            value={userDetails.firstName + ' ' + userDetails.lastName}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={6}> 
                                        <TextField
                                            fullWidth
                                            label="Employee Id"
                                            id="employeeId"
                                            //name='employeeName'
                                            //variant="outlined"
                                            //required
                                            InputLabelProps={{shrink: true}}
                                            //onChange={handleChange}
                                            //inputRef={register}
                                            value={userDetails.userId}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={6}> 
                                        <TextField
                                            fullWidth
                                            label="Time Off Type"
                                            id="timeoffType"
                                            name='timeoffType'
                                            //variant="outlined"
                                            required
                                            select
                                            SelectProps={{ native: true }}
                                            InputLabelProps={{shrink: true}}
                                            onChange={handleChange}
                                            //inputRef={register}
                                            value={formData.timeoffType}
                                        >
                                            {timeOffTypes.map((option) => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item md={6} xs={6}> 
                                        <TextField
                                            fullWidth
                                            label="Manager"
                                            id="manager"
                                            //name='employeeName'
                                            //variant="outlined"
                                            //required
                                            InputLabelProps={{shrink: true}}
                                            onChange={handleChange}
                                            //inputRef={register}
                                            value={userDetails.manager}
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12} align='left'> 
                                        <Typography align='left' display='inline' style={{fontSize: '12px'}}>Time Off Available: </Typography>
                                        {userDetails.timeoffHours > formData.hoursOff ? <Box display='inline'>{userDetails.timeoffHours}</Box> : <Box display='inline' style={{color: 'red'}}>{userDetails.timeoffHours}</Box>} 
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Box p={3} style={{backgroundColor: 'white', height: '80%'}}>
                                <Grid container spacing={3}>
                                    <Grid item md={6} sx={6}>
                                        <KeyboardDatePicker
                                            fullWidth
                                            id="beginDate"
                                            label="Begin Date"
                                            format="MM/dd/yyyy"
                                            disablePast
                                            value={formData.beginDate}
                                            disableToolbar
                                            InputLabelProps={{shrink: true,}}
                                            onChange={handleBeginDateChange}
                                            //inputRef={register}
                                        />
                                    </Grid>
                                    <Grid item md={6} sx={6}>
                                        <KeyboardDatePicker
                                            fullWidth
                                            id="endDate"
                                            label="End Date"
                                            format="MM/dd/yyyy"
                                            disablePast
                                            value={formData.endDate}
                                            disableToolbar
                                            InputLabelProps={{shrink: true,}}
                                            onChange={handleEndDateChange}
                                            //inputRef={register}
                                        />
                                    </Grid>
                                    <Grid item md={6} sx={6}>
                                        <TextField
                                            fullWidth
                                            id="daysOff"
                                            label="Days Off"
                                            name='daysOff'
                                            //variant="outlined"
                                            value={formData.daysOff}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            //onChange={handleChange}
                                            //inputRef={register}
                                        />
                                    </Grid>
                                    <Grid item md={6} sx={6}>
                                        <TextField
                                            fullWidth
                                            id="hoursOff"
                                            label="Hours Off"
                                            name='hoursOff'
                                            //variant="outlined"
                                            value={formData.hoursOff}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            //onChange={handleChange}
                                            //inputRef={register}
                                        />
                                    </Grid>
                                    <Grid item md={12} sx={12}>
                                        <TextField
                                            fullWidth
                                            id="description"
                                            label="Description"
                                            name='daysOff'
                                            required
                                            // multiline
                                            // rows='4'
                                            //variant="outlined"
                                            value={formData.description}
                                            //className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={handleChange}
                                            //inputRef={register}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item md={12} xs={12} align='left' style={{marginTop: '-10px'}}>
                        {/* <Box align='right'> */}
                            <Button variant="contained" type="submit" style={{backgroundColor: '#0077b3', color:'white' }}>Submit</Button>
                        {/* </Box> */}
                        </Grid>
                        
                        
                    </Grid>
                    </MuiPickersUtilsProvider>
                </Box>
            
            </form>
        </div>
    )
}
