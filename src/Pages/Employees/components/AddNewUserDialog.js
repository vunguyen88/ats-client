import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { addNewEmployee } from '../state/EmployeesActions';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; 

const CustomButton = withStyles({
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
        backgroundColor: '#0077b3',
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

export default function AddNewUserDialog() {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        jobTitle: '',
        department: '',
        email: '',
        location: '',
    })
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
    const onSubmit = () => {
        dispatch(addNewEmployee({ firstName: state.firstName, lastName: state.lastName, jobTitle: state.jobTitle, department: state.department, email: state.email, location: state.location, join: '2021', userId: uuidv4(), userUID: uuidv4(), role: 'user' }))
        console.log({ firstName: state.firstName, lastName: state.lastName, jobTitle: state.jobTitle, department: state.department, email: state.email });
        setOpen(false);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
            <CustomButton onClick={ handleClickOpen }>+ Add New</CustomButton>
            
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"New User Info"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out all the data needed to add new user.
                        <p>To prevent spamming and invocations, data will be saved Redux store instead of Firebase's database  </p>
                    </DialogContentText>
                    
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <TextField required  id="firstName" label="First Name" onChange={handleChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField required id="lastName" label="Last Name" onChange={handleChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField required id="jobTitle" label="Job Title" onChange={handleChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField required id="department" label="Department" onChange={handleChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField required id="email" label="Email" onChange={handleChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField required id="location" label="Location" onChange={handleChange} />
                            </Grid>
                        </Grid>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Cancel
                    </Button>
                    <Button autoFocus onClick={onSubmit} type="submit" color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            </form>
        </div>
        
    );
}
