import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import TopBar from '../../components/TopBar';
import { makeStyles } from '@material-ui/core/styles';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import MenuBar from './components/MenuBar';
import MyProfile from './components/MyProfile';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
//import MuiAlert from '@material-ui/lab/Alert';
import getUserProfile from './state/ProfileActions';
// import UtilityBar from './components/UtilityBar';

import {useForm, Controller} from 'react-hook-form';
import {
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, 
    Grid,
    IconButton,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Container,
    withStyles,
    //makeStyles,
    CardMedia,
    Snackbar
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex', 
        backgroundColor: '#f0f0f5',
        height: '125vh'
    },
    wrapper: {
        flexDirection: 'column', 
        width: '100%',
        flexGrow: 1
    },
    avatar: {
        width: '120px',
        height: '120px',
    },
}))


export default function ProfilePage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [successCode, setSuccessCode] = useState(false);
    const [errorCode, setErrorCode] = useState();
    const [open, setOpen] = useState(false);
    const [userProfile, setUserProfile] = useState({});
    const {register, control, getValues, setValue , handleSubmit, reset} = useForm();
    const [state, setState] = useState()

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
            setUserProfile({...res.data})
            reset(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    function updateProfile(data) {
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.put(`https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/profile/update`, data, config)
        //axios.put(`http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/profile/update`, data,
            .then(res => {
                console.log('resdata ', res.data);
                console.log('Post success');
                setSuccessCode(true);
                setOpen(true);
            })
            .catch(err => {
                console.error(err);
                setErrorCode(err.response.status);
                setOpen(true);
            });
    }

    console.log('userProfile ', userProfile)
    const onSubmit = (data) => {
        updateProfile(data);
        console.log('onsubmit',data)
        //dispatch(addJob(formData))
        //dispatch(userSignUp({ email: state.email, password: state.password, firstName: state.firstName, lastName: state.lastName, role: 'user' }, history))
    }

    const handleAddFile = (event) => {
        let formData = new FormData(); 
        formData.append('firstName', userProfile.firstName);  
        formData.append('lastName', userProfile.lastName);
        formData.append('userId', userProfile.userId);
        formData.append('picture', event.target.files[0]);
        
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        axios.put(`https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/profile/picture/update`, formData, config,
        //axios.put(`http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/profile/picture/update`, formData, config,
            // {
            //     headers: {
            //         Authorization: 'Bearer ' + JSON.parse(localStorage.tokens)
            //     }
            // },
            )
            .then(res => {
                console.log('update success')
                setSuccessCode(true);
                setOpen(true);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                setErrorCode(err.response.status);
                setOpen(true);
            })
        //setState({...state, fileUpload: event.target.files[0]})
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
                <MenuBar style={{}}/>
                {/* <MyProfile userProfile={userProfile} /> */}
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Container maxWidth={false}>
                        <Grid container spacing={6} >
                            <Grid container spacing={3} item md={5} xs={12} align="center" display="flex" justify="center" style={{margin: '10px'}}>
                                <Grid item md={12} xs={12} style={{marginTop: '1rem'}}>
                                    <Badge
                                        overlap="circle"
                                        anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                        }}
                                        badgeContent={
                                            <label htmlFor="fileUpload">
                                                <input 
                                                    accept="image/*" 
                                                    id="fileUpload" 
                                                    multiple 
                                                    type="file" 
                                                    style={{display: 'none'}} 
                                                    onChange={handleAddFile}
                                                />
                                                <Button component="span" style={{position: 'fixed', left:'-15px', top:'5px'}} >
                                                    <CameraAltIcon style={{color: '#2b506e'}}/>
                                                </Button>
                                            </label>
                                        }
                                        // onClick={() => console.log('click badge')}
                                    > 
                                        <Avatar src={userProfile.avatarUrl} className={classes.avatar} />

                                    </Badge>
                                    
                                </Grid>
                                <Grid item md={3}></Grid>
                                <Grid item md={6} sx={12}>
                                    <Typography>{userProfile.jobTitle}</Typography>
                                </Grid>
                                <Grid item md={3}></Grid>
                                <Grid item md={3}></Grid>
                                <Grid item md={6} sx={12} style={{marginTop: '-20px'}}>
                                    <Typography>{userProfile.role}</Typography>
                                </Grid>
                                <Grid item md={3}></Grid>
 
                                <Grid item md={6} sx={12}>
                                    <TextField
                                        fullWidth
                                        label="User Id"
                                        id="userId"
                                        variant="outlined"
                                        name='userId'
                                        value={userProfile.userId || ''}
                                        InputLabelProps={{shrink: true}}
                                        //onChange={handleChange}
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={6} sx={12}>
                                    <TextField
                                        fullWidth
                                        label="UID"
                                        id="uid"
                                        variant="outlined"
                                        name='uid'
                                        value={userProfile.uid || ''}
                                        InputLabelProps={{shrink: true}}
                                        //onChange={handleChange}
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={6} sx={12}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        id="firstName"
                                        name='firstName'
                                        variant="outlined"
                                        required
                                        InputLabelProps={{shrink: true}}
                                        inputRef={register}
                                        defaultValue={userProfile.firstName || ''}
                                    />
                                </Grid>
                                <Grid item md={6} sx={12}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        id="last"
                                        name='lastName'
                                        variant="outlined"
                                        required
                                        InputLabelProps={{shrink: true}}
                                        inputRef={register}
                                        defaultValue={userProfile.lastName || ''}
                                    />
                                </Grid>
                                <Grid item md={12} sx={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        id="email"
                                        name='email'
                                        variant="outlined"
                                        required
                                        defaultValue={userProfile.email || ''}
                                        InputLabelProps={{shrink: true}}
                                        //onChange={handleChange}
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={6} sx={12}>
                                    <TextField
                                        fullWidth
                                        label="Phone"
                                        id="phone"
                                        name='phone'
                                        variant="outlined"
                                        defaultValue={userProfile.phone || ''}
                                        InputLabelProps={{shrink: true}}
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={6} sx={12}>
                                    <TextField
                                        fullWidth
                                        label="Company"
                                        id="company"
                                        name='company'
                                        variant="outlined"
                                        defaultValue={userProfile.company || ''}
                                        InputLabelProps={{shrink: true}}
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={12} sx={12} align='left' style={{marginTop: '-20px'}}>
                                    <p>Address</p>
                                </Grid>
                                <Grid item md={12} sx={12} style={{marginTop: '-20px'}}>
                                    <TextField
                                        fullWidth
                                        label="street"
                                        id="adress"
                                        name='address'
                                        variant="outlined"
                                        defaultValue={userProfile.address || ''}
                                        InputLabelProps={{shrink: true}}
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={8} sx={12}>
                                    <TextField
                                        fullWidth
                                        label="City"
                                        id="city"
                                        name='city'
                                        variant="outlined"
                                        defaultValue={userProfile.city || ''}
                                        InputLabelProps={{shrink: true}}
                                        //onChange={handleChange}
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={4} sx={12}>
                                    <TextField
                                        fullWidth
                                        label="State"
                                        id="state"
                                        name='state'
                                        variant="outlined"
                                        defaultValue={userProfile.state || ''}
                                        InputLabelProps={{shrink: true}}
                                        //onChange={handleChange}
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={4} sx={12}>
                                    <TextField
                                        fullWidth
                                        label="Zip Code"
                                        id="zipCode"
                                        name='zipCode'
                                        variant="outlined"
                                        defaultValue={userProfile.zipCode || ''} 
                                        InputLabelProps={{shrink: true}}
                                        //onChange={handleChange}
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={8} sx={12}>
                                    <TextField
                                        fullWidth
                                        label="Country"
                                        id="country"
                                        name='country'
                                        variant="outlined"
                                        defaultValue={userProfile.country || ''}
                                        InputLabelProps={{shrink: true}}
                                        //onChange={handleChange}
                                        inputRef={register}
                                    />
                                </Grid>
                                {/* <Box display="flex" justifyContent="flex-end" p={2}> */}
                                    <Grid container item md={12} sx={12} spacing={3} style={{marginLeft: '-40px', marginTop:'10px'}}>
                                        <Grid item>
                                            <Button
                                                style={{backgroundColor: '#0077b3', color: 'white'}}
                                                variant="contained"
                                                type="submit"
                                            >
                                                Update
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
                                {/* </Box> */}
                            </Grid>

                            <Grid container spacing={3} item md={6} xs={12} alignContent="flex-start" style={{marginTop: '2rem', marginRight: '10px'}}>
                                
                                <Grid item md={6} sx={12}>
                                    <TextField
                                        fullWidth
                                        label="Job Title"
                                        id="jobTitle"
                                        variant="outlined"
                                        name='jobTitle'
                                        defaultValue={userProfile.jobTitle || ''}
                                        InputLabelProps={{shrink: true}}
                                        //onChange={handleChange}
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={6} sx={12}>
                                    <TextField
                                        fullWidth
                                        label="Department"
                                        id="department"
                                        variant="outlined"
                                        name='department'
                                        defaultValue={userProfile.department || ''}
                                        InputLabelProps={{shrink: true}}
                                        //onChange={handleChange}
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={6} sx={12}>
                                    <TextField
                                        fullWidth
                                        label="Manager"
                                        id="manager"
                                        variant="outlined"
                                        name='manager'
                                        value={userProfile.manager || ''}
                                        InputLabelProps={{shrink: true}}
                                        //onChange={handleChange}
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={6} sx={12}>
                                    <TextField
                                        fullWidth
                                        label="Gender"
                                        id="gender"
                                        name='gender'
                                        variant="outlined"
                                        defaultValue={userProfile.gender || ''}
                                        InputLabelProps={{shrink: true}}
                                        //onChange={handleChange}
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={6} sx={12}>
                                    <TextField
                                        fullWidth
                                        label="Language"
                                        id="language"
                                        name='language'
                                        variant="outlined"
                                        defaultValue={userProfile.language || ''}
                                        InputLabelProps={{shrink: true}}
                                        //onChange={handleChange}
                                        inputRef={register}
                                    />
                                </Grid>
                                
                                {/* <Grid item md={12} sx={12} align='left'>
                                    <p>Date of Birth</p>
                                </Grid> */}
                                {/* <Grid container spacing={2} align="left" item md={12} sx={12} > */}
                                    {/* <Grid item md={11} sx={11} /> */}
                                    <Grid item md={12} sx={12} align='left'>
                                        <TextField
                                            id="date"
                                            label="Date of Birth"
                                            name='dob'
                                            variant="outlined"
                                            type="date"
                                            defaultValue={userProfile.dob || ''}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputRef={register}
                                        />
                                    </Grid>
     
                                {/* </Grid> */}
                                <Grid item md={12} sx={12} align='left' style={{marginTop: '-20px'}}>
                                    <p>Social Media</p>
                                </Grid>
                                <Grid item md={6} sx={12} style={{marginTop: '-20px'}}>
                                    <TextField
                                        fullWidth
                                        label="Twitter"
                                        id="twitter"
                                        name='twitter'
                                        variant="outlined"
                                        defaultValue={userProfile.twitter || ''}
                                        InputLabelProps={{shrink: true}}
                                        //onChange={handleChange}
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={6} sx={12} style={{marginTop: '-20px'}}>
                                    <TextField
                                        fullWidth
                                        label="Linked In"
                                        id="linkedin"
                                        name='linkedin'
                                        variant="outlined"
                                        defaultValue={userProfile.linkedin || ''}
                                        InputLabelProps={{shrink: true}}
                                        //onChange={handleChange}
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={6} sx={12}>
                                    <TextField
                                        fullWidth
                                        label="Facebook"
                                        id="facebook"
                                        name='facebook'
                                        variant="outlined"
                                        defaultValue={userProfile.facebook || ''}
                                        InputLabelProps={{shrink: true}}
                                        //onChange={handleChange}
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={12} sx={12} align='left' style={{marginTop: '-20px'}}>
                                    <p>Emergency Contact</p>
                                </Grid>
                                
                                <Grid item md={12} sx={12} style={{marginTop: '-20px'}}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        id="emergencyContactName"
                                        name='emergencyContactName'
                                        variant="outlined"
                                        defaultValue={userProfile.emergencyContactName || ''}
                                        InputLabelProps={{shrink: true}}
                                        //onChange={handleChange}
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={4} sx={12} >
                                    <TextField
                                        fullWidth
                                        label="Number"
                                        id="emergencyContactNumber"
                                        name='emergencyContactNumber'
                                        variant="outlined"
                                        defaultValue={userProfile.emergencyContactNumber || ''}
                                        InputLabelProps={{shrink: true}}
                                        //onChange={handleChange}
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid item md={4} sx={12}>
                                    <TextField
                                        fullWidth
                                        label="Relationship"
                                        id="emergencyContactRelationship"
                                        name='emergencyContactRelationship'
                                        variant="outlined"
                                        defaultValue={userProfile.emergencyRelationship || ''}
                                        InputLabelProps={{shrink: true}}
                                        //onChange={handleChange}
                                        inputRef={register}
                                    />
                                </Grid>
                                    
                            </Grid>
                            
                        </Grid>
                    </Container>
                </form>


            </div>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                {(() => {
                    if (successCode === true) {
                        return <Alert onClose={handleClose} severity="success">Update success </Alert>
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
