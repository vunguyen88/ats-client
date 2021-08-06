import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
//import { addNewEmployee } from '../state/EmployeesActions';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; 
import { applyJob } from '../state/JobListingActions';

const CustomApplyJobButton = withStyles({
    root: {
        boxShadow: 'none',
        color: 'white',
        height: '40px',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        marginLeft: '15px',
        border: '1px solid #dfdfdf',
        lineHeight: 1.5,
        backgroundColor: 'cadetBlue',
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
            backgroundColor: '#00aaff',
            borderColor: 'f2f2f2',
            boxShadow: 'none',
        },

        '&:active': {
        boxShadow: 'none',
        backgroundColor: '#33bbff',
        borderColor: '#f2f2f2',
        },

        '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    }
})(Button);

export default function ApplyJobDialog({ jobId, jobTitle, clientName, city }) {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        zipCode: '',
        jobId,
        jobTitle,
        clientName,
        city,
    })
    const [fieldError, setFieldError] = useState([]);
    const [successCode, setSuccessCode] = useState(false);
    const [errorCode, setErrorCode] = useState();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const applyJobStatus = useSelector(state => state.applyJob);
    //let errorFields = [];
    console.log('apply job status ', applyJobStatus);
    useEffect(() => {
        if (applyJobStatus.isLoading === false && applyJobStatus.error === false) {
            console.log('APPLY JOB SUCCESSSSSSS')
            setErrorCode(false);
            setSuccessCode(true);
            setOpenSnackbar(true);
        } else if (applyJobStatus.isLoading === false && applyJobStatus.error === true) {
            console.log('APPLY JOB FAILUREEE');
            setSuccessCode(false);
            setErrorCode(true);
            setOpenSnackbar(true);
        }
    }, [applyJobStatus])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }
    // const handleAddNewUser = () => {
    //     console.log('add new user')
    //     setOpen(false);
    // };

    const handleChange = (event) => {
        setState({...state, [event.target.id]: event.target.value})
    }
    const handleAddFile = (event) => {
        console.log(event.target.files)
        setState({...state, fileUpload: event.target.files[0]})
    }
    const onSubmit = () => {
        console.log('ON SUBMIT ', state);
        let errors = [];
        if(state.firstName.trim() === '') errors.push('firstName');
        if(state.lastName.trim() === '') errors.push('lastName');
        if(state.email.trim() === '') errors.push('email');
        if(state.zipCode.trim() === '') errors.push('zipCode');
        if(errors.length > 0) {
            setFieldError(errors);
            setErrorCode(516);
            setSuccessCode(false);
            setOpenSnackbar(true);
            return
        } else if (!state.fileUpload) {
            console.log('THERE IS NO FILE');
            
            setErrorCode(515);
            setSuccessCode(false);
            setOpenSnackbar(true);
            
            return;
        } else {
            console.log('THERE IS FILE ');
            dispatch(applyJob(state))
            setOpen(false);
        }
        //console.log('file name', state.fileUpload.name)
        //dispatch(addNewEmployee({ firstName: state.firstName, lastName: state.lastName, jobTitle: state.jobTitle, department: state.department, email: state.email, location: state.location, join: '2021', userId: uuidv4(), userUID: uuidv4(), role: 'user' }))   
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    console.log('field err', fieldError)

    return (
        <div>
            <form onSubmit={onSubmit}>
            <CustomApplyJobButton onClick={ handleClickOpen }>Apply</CustomApplyJobButton>
            
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"New User Info"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>Please fill out all the fields needed.</p>
                        <p>If you want to see your resume and the job you applying for, create new user account then go to candidates section</p>
                        <p>The data you submitted will be save in database for future analytics and improvement.</p>
                    </DialogContentText>
                    
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <TextField 
                                    required  
                                    error={fieldError.includes('firstName') && state.firstName === ''}
                                    id="firstName" 
                                    label="First Name" 
                                    helperText={fieldError.includes('firstName') && state.firstName === '' ? "First name is required." : null}
                                    InputLabelProps={{shrink: true}}
                                    onChange={handleChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    required 
                                    id="lastName" 
                                    label="Last Name" 
                                    error={fieldError.includes('lastName') && state.lastName === ''}
                                    helperText={fieldError.includes('lastName') && state.lastName === '' ? "Last name is required." : null}
                                    InputLabelProps={{shrink: true}}
                                    onChange={handleChange} />
                            </Grid>
                            {/* <Grid item xs={6}>
                                <TextField required id="jobTitle" label="Job Title" onChange={handleChange} />
                            </Grid> */}
                            {/* <Grid item xs={6}>
                                <TextField required id="department" label="Department" onChange={handleChange} />
                            </Grid> */}
                            <Grid item xs={6}>
                                <TextField 
                                    required 
                                    id="email" 
                                    label="Email" 
                                    error={fieldError.includes('email') && state.email === ''}
                                    helperText={fieldError.includes('email') && state.email === '' ? "Email is required." : null}
                                    InputLabelProps={{shrink: true}}
                                    onChange={handleChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    required 
                                    id="zipCode" 
                                    label="Zip Code" 
                                    error={fieldError.includes('zipCode') && state.zipCode === ''}
                                    helperText={fieldError.includes('zipCode') && state.zipCode === '' ? "Zipcode is required." : null}
                                    InputLabelProps={{shrink: true}}
                                    onChange={handleChange} /> 
                            </Grid>
                        </Grid>
                    {/* <DialogContentText> */}
                        <Box  fontSize={18} color="black" mt={4} mb={2}>Resume</Box>
                        <label htmlFor="fileUpload">
                            <input 
                                accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" 
                                id="fileUpload" 
                                multiple type="file" 
                                style={{display: 'none'}} 
                                onChange={handleAddFile}
                            />
                            <Button variant="outlined" component="span" style={{color: 'cadetBlue', borderColor: 'cadetBlue'}}>
                                Browse
                            </Button> {state.fileUpload ? state.fileUpload.name : null}
                        </label>
                        
                    {/* </DialogContentText> */}
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus mt={5}>
                        Cancel
                    </Button>
                    <Button autoFocus onClick={onSubmit} type="submit" color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            </form>

            <Snackbar open={openSnackbar} autoHideDuration={10000} onClose={handleCloseSnackbar}>
                {(() => {
                    if (successCode === true) {
                        return <Alert onClose={handleCloseSnackbar} severity="success">Thank you for submit your resume. </Alert>
                        // return <Alert onClose={handleClose} severity="success">New job added! Click <Link to={{pathname:'/app/sendgrid', state:{data: newJobResponseData}}}>here </Link> to go to notification page.</Alert>
                    } else if (errorCode === 516) {
                        return <Alert onClose={handleCloseSnackbar} severity="error">All fields must be entered.</Alert>
                    } else if (errorCode === 515) {
                        return <Alert onClose={handleCloseSnackbar} severity="error">Resume must be included! It can be either pdf OR docx format</Alert>
                    } else {
                        return <Alert onClose={handleCloseSnackbar} severity="error">Submit fail!</Alert>
                    }
                })()}
            </Snackbar>
        </div>
        
    );
}
