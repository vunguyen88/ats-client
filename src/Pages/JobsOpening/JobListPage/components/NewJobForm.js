import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {Link} from 'react-router-dom';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Alert, AlertTitle } from '@material-ui/lab';
import { addJob } from '../state/JobActions';
import moment from 'moment';

import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    makeStyles,
    Snackbar,
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const priority = [
    {
        value: 1,
        label: '1'
    },
    {
        value: 2,
        label: '2'
    },
    {
        value: 3,
        label: '3'
    },
    {
        value: 4,
        label: '4'
    }
];

const positions = [
    {
        value: 'CNA',
        label: 'CNA'
    },
    {
        value: 'RN',
        label: 'RN'
    },
    {
        value: 'LPN',
        label: 'LPN'
    },
    {
        value: 'APRNs',
        label: 'APRNs'
    },
    {
        value: 'Others',
        label: 'Others'
    }
];

const jobStatus = [
    {
        value: 'in-progress',
        label: 'In Progress'
    },
    {
        value: 'filled',
        label: 'Filled'
    },
    {
        value: 'declined',
        label: 'Declined'
    },
    {
        value: 'on-hold',
        label: 'On Hold'
    },
]

const employmentType = [
    {
        value: 'full-time',
        label: 'Full Time'
    },
    {
        value: 'part-time',
        label: 'Part Time'
    },
    {
        value: 'contract',
        label: 'Contract'
    },
    {
        value: 'temp-to-perm',
        label: 'Temp-to-perm'
    },
    {
        value: 'on-call',
        label: 'On Call'
    },
]

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '1rem',
    },
}));


function NewJobForm() {
    const [editor, setEditor] = useState();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [formData, setFormData] = useState({ 
        jobTitle:'', 
        numberOfPositions: '', 
        employmentType: 'full-time',
        clientName: '',
        displayPriority: 1,
        jobStatus: 'in-progress',
        workExperience: '',
        pay: '',
        industry: '',
        targetDate: moment().format('MM/DD/YYYY'),
        skillSet: '',
        jobPosition: '',
        city: '',
        state: '',
        zipCode: '',
        jobDescription: '',
    })
    const [successCode, setSuccessCode] = useState(false);
    const [errorCode, setErrorCode] = useState();
    const [open, setOpen] = useState(false);
    const jobs = useSelector(state => state.jobs);

    useEffect(() => {
        console.log('jobs selector in use effect ', jobs)
        if(jobs.isLoading === false && jobs.error) {
            setErrorCode(jobs.error);
            setOpen(true)
        } else if (jobs.isLoading === false && jobs.success === true){
            setSuccessCode(true);
            setOpen(true)
        }
    }, [jobs])
    
    // const [selectedDate, setDate] = useState(new Date());

    const handleChange = (event) => {
        setFormData({...formData, [event.target.id]: event.target.value})
    }

    const handleDateChange = date => {
        console.log("targetDate CHANGED: ", date);
        // setDate(date);
        setFormData({...formData, targetDate: moment(date).format('MM/DD/YYYY')});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        dispatch(addJob(formData))
        //dispatch(userSignUp({ email: state.email, password: state.password, firstName: state.firstName, lastName: state.lastName, role: 'user' }, history))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    //console.log('CKEditor is ', editor)

    return (
        <div className={classes.root}>
            <form onSubmit={onSubmit}>
                <Card>
                    <CardHeader subheader="The information can be edited" title="New Job" />
                    <Divider />
                    <CardContent>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <TextField 
                                        fullWidth
                                        label='Job Title'
                                        name='jobTitle'
                                        id="jobTitle"
                                        required
                                        variant='outlined'
                                        onChange={handleChange}
                                        // inputRef={register}
                                    />
                                </Grid>

                                <Grid item md={3} xs={12}>
                                    <TextField 
                                        fullWidth
                                        label='Number of Positions'
                                        name='numberOfPositions'
                                        id="numberOfPositions"
                                        type="number"
                                        variant="outlined"
                                        onChange={handleChange}
                                        // inputRef={register}
                                    />
                                </Grid>

                                <Grid item md={3} xs={12}>
                                    <TextField 
                                        fullWidth
                                        label="Employment Type"
                                        name="employmentType"
                                        id="employmentType"
                                        required
                                        select
                                        SelectProps={{ native: true }}
                                        variant="outlined"
                                        onChange={handleChange}
                                        defaultValue="in progress"
                                        // inputRef={register}
                                    >
                                        {employmentType.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <TextField 
                                        fullWidth
                                        label="Client Name"
                                        name="clientName"
                                        id="clientName"
                                        required
                                        variant="outlined"
                                        onChange={handleChange}
                                        // inputRef={register}
                                    />
                                </Grid>

                                <Grid item md={3} xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Display Priority"
                                        helperText="1 is highest priority, job with higher priority will display at the top"
                                        name="priority"
                                        id="displayPriority"
                                        type="number"
                                        required
                                        select
                                        SelectProps={{ native: true }}
                                        variant="outlined"
                                        onChange={handleChange}
                                        defaultValue="1"
                                        // inputRef={register}
                                    >
                                        {priority.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                    ))}
                                    </TextField>
                                </Grid>  

                                <Grid item md={3} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Job Status"
                                        name="jobStatus"
                                        id="jobStatus"
                                        required
                                        select
                                        SelectProps={{ native: true }}
                                        variant="outlined"
                                        onChange={handleChange}
                                        defaultValue="in progress"
                                        // inputRef={register}
                                    >
                                        {jobStatus.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid> 

                                <Grid item md={4} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Work Experience"
                                        name="workExperience"
                                        id="workExperience"
                                        //required
                                        variant="outlined"
                                        onChange={handleChange}
                                        // inputRef={register}
                                    />
                                </Grid>  

                                <Grid item md={4} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Pay/Salary"
                                        name="salary"
                                        id="pay"
                                        variant="outlined"
                                        onChange={handleChange}
                                        // inputRef={register}
                                    />
                                </Grid>

                                <Grid item md={4} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Inudstry"
                                        name="industry"
                                        id="industry"
                                        variant="outlined"
                                        onChange={handleChange}
                                        // inputRef={register}
                                    />
                                </Grid>
                                
                                <Grid item md={3} xs={12}>
                                    <KeyboardDatePicker
                                        id="targetDate"
                                        name="targetDate"
                                        label="Target Date"
                                        format="MM/dd/yyyy"
                                        disablePast
                                        margin="normal"
                                        disableToolbar
                                        value={formData.targetDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            "aria-label": "change date"
                                        }}
                                    />
                                </Grid>

                                <Grid item md={3} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Skill Set"
                                        name="skillset"
                                        id="skillSet"
                                        variant="outlined"
                                        onChange={handleChange}
                                        // inputRef={register}
                                    />
                                </Grid>

                                <Grid item md={3} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Job Position"
                                        helperText="help match with the list of candidate has the same position in database"
                                        name="jobPosition"
                                        id="jobPosition"
                                        variant="outlined"
                                        onChange={handleChange}
                                        // inputRef={register}
                                    />
                                </Grid>

                                <Grid item md={3} xs={12}></Grid>

                                <Grid item md={4} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="City"
                                        name="city"
                                        id="city"
                                        required
                                        variant="outlined"
                                        onChange={handleChange}
                                        // inputRef={register}
                                    />
                                </Grid>

                                <Grid item md={4} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="State"
                                        name="state"
                                        id="state"
                                        required
                                        variant="outlined"
                                        onChange={handleChange}
                                        // inputRef={register}
                                    />
                                </Grid>

                                <Grid item md={3} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Zip Code"
                                        name="zipCode"
                                        id="zipCode"
                                        required
                                        variant="outlined"
                                        onChange={handleChange}
                                        // inputRef={register}
                                    />
                                </Grid>
                                
                                <Grid item md={12} xs={12} >
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        data="<p>Job description goes here!"
                                        onReady={ editor => {
                                            editor.editing.view.change((writer) => {
                                                writer.setStyle(
                                                    "height",
                                                    "450px",
                                                    editor.editing.view.document.getRoot()
                                                );
                                            });
                                        } }
                                        onChange={ ( event, editor ) => {
                                            const data = editor.getData();
                                            //setEditor(data);
                                            setFormData({...formData, jobDescription: data})
                                            console.log( { event, editor, data } );
                                        } }
                                        onBlur={ ( event, editor ) => {
                                            console.log( 'Blur.', editor );
                                        } }
                                        onFocus={ ( event, editor ) => {
                                            console.log( 'Focus.', editor );
                                        } }
                                    />
                                </Grid>
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </CardContent>
                    <Box display="flex" justifyContent="flex-end" p={2}>
                        <Grid container spacing={3}>
                            <Grid item>
                                <Button
                                    style={{backgroundColor: '#0077b3', color: 'white'}}
                                    variant="contained"
                                    type="submit"
                                >
                                    Add Job
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    color="default"
                                    variant="contained"
                                    //type="submit"
                                    onClick = {() => window.history.back()}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </form>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                {(() => {
                    if (successCode === true) {
                        return <Alert onClose={handleClose} severity="success">Add new job success </Alert>
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

export default NewJobForm
