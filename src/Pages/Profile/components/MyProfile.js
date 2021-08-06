import React, { useState } from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import EditIcon from '@material-ui/icons/Edit';
import TextsmsIcon from '@material-ui/icons/Textsms';
import { useHistory } from "react-router-dom";
import {useForm, Controller} from 'react-hook-form';
import {
    Avatar,
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
    makeStyles,
    CardMedia,
    Snackbar
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
    avatar: {
        width: '100px',
        height: '100px',
    },
    left: {
        marginTop: '2rem',
        marginLeft: '1rem'
    },
    right:{
        marginTop: '2rem',
    },
    nameContainer: {
        marginTop: '0.5rem'
    },
    media: {
        margin: 'auto',
        width: 60,
        height: 60
    },
    fileIcon: {
        //width: '10px',
        height: '10px'
    },
    cardContent: {
        padding: '1rem'
    },
    textFieldWidth: {
        width: '85%'
    },
    typography: {
        paddingLeft: 55
    },
    table: {
        width: '94%',
        marginLeft: '55px',
    },
    appliedJobTableHead: {
        background: 'black',
    }
}))

export default function MyProfile({ userProfile }) {
    // useForm
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
        },
      });
    const onSubmit = (data) => {
        
        console.log(data)
        //dispatch(addJob(formData))
        //dispatch(userSignUp({ email: state.email, password: state.password, firstName: state.firstName, lastName: state.lastName, role: 'user' }, history))
    }

    /////
    console.log('userProfile ', userProfile)
    const history = useHistory();
    const classes = useStyles();
    const [defaultV, setDefaultV] = useState()
    //setDefaultV(userProfile.firstName)
    const [formData, setFormData] = useState({ 
        firstName: userProfile.firstName, 
        lastName: userProfile.lastName, 
        email: userProfile.email,
        phone: userProfile.phone,
        address: userProfile.address,
        city: userProfile.city,
        state: userProfile.state,
        zipCode: userProfile.zipCode,
        country: userProfile.country,
        gender: userProfile.gender,
        language: userProfile.language,
        twitter: userProfile.twitter,
        facebook: userProfile.facebook,
        linkedin: userProfile.linkedin,
        emergencyContactName: userProfile.emergencyContactName,
        emergencyContactNumber: userProfile.emergencyContactNumber,
        emergencyRelationship: userProfile.emergencyRelationship,
    })

    const handleChange = (event) => {
        setFormData({...formData, [event.target.id]: event.target.value})
    }

    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(formData)
    //     //dispatch(addJob(formData))
    //     //dispatch(userSignUp({ email: state.email, password: state.password, firstName: state.firstName, lastName: state.lastName, role: 'user' }, history))
    // }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth={false} ml={4}>
            <Grid container spacing={6} >
                <Grid container spacing={3} item md={5} xs={12} align="center" display="flex" justify="center">
                    <Grid item md={12} xs={12} style={{marginTop: '2rem'}}>
                        <Avatar src={userProfile.avatarUrl} className={classes.avatar} />
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
                        {/* <Controller
                            name="firstName"
                            control={control}
                            defaultValue='dsfsd'
                            rules={{ required: true }}
                            render={({ field:{ defaultValue, InputLabelProps }}) => (
                            <TextField 
                                //fullWidth
                                label="First Name"
                                id="firstName"
                                required
                                defaultValue={userProfile.firstName}
                                InputLabelProps={{shrink: true}}
                                //onChange={handleChange}
                                {...register('userProfile.firstName')}
                            />)}
                        /> */}
                        <TextField
                            fullWidth
                            label="First Name"
                            id="firstName"
                            name='firstName'
                            //placeholder={userProfile.firstName}
                            required
                            defaultValue={userProfile.firstName}
                            InputLabelProps={{shrink: true}}
                            //onChange={handleChange}
                            //{...register('userProfile.firstName')}
                        />
                    </Grid>
                    <Grid item md={6} sx={12}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            // name="lasttName"
                            id="lastName"
                            required
                            // variant="outlined"
                            value={userProfile.lastName}
                            InputLabelProps={{shrink: true}}
                            //onChange={handleChange}
                            // inputRef={register}
                        />
                    </Grid>
                    <Grid item md={12} sx={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            id="email"
                            required
                            value={userProfile.email}
                            InputLabelProps={{shrink: true}}
                            // variant="outlined"
                            //onChange={handleChange}
                            // inputRef={register}
                        />
                    </Grid>
                    <Grid item md={12} sx={12}>
                        <TextField
                            fullWidth
                            label="Phone"
                            id="phone"
                            value={userProfile.phone}
                            InputLabelProps={{shrink: true}}
                            // required
                            //onChange={handleChange}
                            // inputRef={register}
                        />
                    </Grid>
                    <Grid item md={12} sx={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            id="adress"
                            value={userProfile.address}
                            InputLabelProps={{shrink: true}}
                            //onChange={handleChange}
                            // inputRef={register}
                        />
                    </Grid>
                    <Grid item md={8} sx={12}>
                        <TextField
                            fullWidth
                            label="City"
                            id="city"
                            value={userProfile.city}
                            InputLabelProps={{shrink: true}}
                            //onChange={handleChange}
                            // inputRef={register}
                        />
                    </Grid>
                    <Grid item md={4} sx={12}>
                        <TextField
                            fullWidth
                            label="State"
                            id="state"
                            value={userProfile.state}
                            InputLabelProps={{shrink: true}}
                            //onChange={handleChange}
                            // inputRef={register}
                        />
                    </Grid>
                    <Grid item md={4} sx={12}>
                        <TextField
                            fullWidth
                            label="Zip Code"
                            id="zipCode"
                            value={userProfile.zipCode}
                            InputLabelProps={{shrink: true}}
                            //onChange={handleChange}
                            // inputRef={register}
                        />
                    </Grid>
                    <Grid item md={8} sx={12}>
                        <TextField
                            fullWidth
                            label="Country"
                            id="country"
                            value={userProfile.country}
                            InputLabelProps={{shrink: true}}
                            //onChange={handleChange}
                            // inputRef={register}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} item md={7} xs={12} alignContent="flex-start" style={{marginTop: '2rem'}}>
                    <Grid item md={6} sx={12}>
                        <TextField
                            fullWidth
                            label="Gender"
                            id="gender"
                            value={userProfile.gender}
                            InputLabelProps={{shrink: true}}
                            //onChange={handleChange}
                            // inputRef={register}
                        />
                    </Grid>
                    <Grid item md={6} sx={12}>
                        <TextField
                            fullWidth
                            label="Language"
                            id="language"
                            value={userProfile.language}
                            InputLabelProps={{shrink: true}}
                            //onChange={handleChange}
                            // inputRef={register}
                        />
                    </Grid>
                    
                    <Grid item md={12} sx={12} align='left'>
                        <p>Date of Birth</p>
                    </Grid>
                    <Grid container spacing={2} align="left" item md={12} sx={12} style={{marginTop: '-40px'}}>
                        {/* <Grid item md={11} sx={11} /> */}
                        <Grid item md={3} sx={6}>
                            <TextField
                                fullWidth
                                label="Month"
                                id="month"
                                value={userProfile.month}
                                InputLabelProps={{shrink: true}}
                                //onChange={handleChange}
                                // inputRef={register}
                            />
                        </Grid>
                        <Grid item md={2} sx={2}>
                            <TextField
                                fullWidth
                                label="Date"
                                id="date"
                                value={userProfile.date}
                                InputLabelProps={{shrink: true}}
                                //onChange={handleChange}
                                // inputRef={register}
                            />
                        </Grid>
                        <Grid item md={2} sx={2}>
                            <TextField
                                fullWidth
                                label="Year"
                                id="year"
                                value={userProfile.year}
                                InputLabelProps={{shrink: true}}
                                //onChange={handleChange}
                                // inputRef={register}
                            />
                        </Grid>
                    </Grid>
                    <Grid item md={6} sx={12}>
                        <TextField
                            fullWidth
                            label="Twitter"
                            id="twitter"
                            value={userProfile.twitter}
                            InputLabelProps={{shrink: true}}
                            //onChange={handleChange}
                            // inputRef={register}
                        />
                    </Grid>
                    <Grid item md={6} sx={12}>
                        <TextField
                            fullWidth
                            label="Linked In"
                            id="linkedin"
                            value={userProfile.linkedin}
                            InputLabelProps={{shrink: true}}
                            //onChange={handleChange}
                            // inputRef={register}
                        />
                    </Grid>
                    <Grid item md={6} sx={12}>
                        <TextField
                            fullWidth
                            label="Facebook"
                            id="facebook"
                            value={userProfile.facebook}
                            InputLabelProps={{shrink: true}}
                            //onChange={handleChange}
                            // inputRef={register}
                        />
                    </Grid>
                    <Grid item md={12} sx={12} align='left'>
                        <p>Emergency Contact</p>
                    </Grid>
                    
                    <Grid item md={12} sx={12} style={{marginTop: '-30px'}}>
                        <TextField
                            fullWidth
                            label="Name"
                            id="emergencyContactName"
                            value={userProfile.emergencyContactName}
                            InputLabelProps={{shrink: true}}
                            //onChange={handleChange}
                            // inputRef={register}
                        />
                    </Grid>
                    <Grid item md={4} sx={12} >
                        <TextField
                            fullWidth
                            label="Number"
                            id="emergencyContactNumber"
                            value={userProfile.emergencyContactNumber}
                            InputLabelProps={{shrink: true}}
                            //onChange={handleChange}
                            // inputRef={register}
                        />
                    </Grid>
                    <Grid item md={4} sx={12}>
                        <TextField
                            fullWidth
                            label="Relationship"
                            id="relationship"
                            value={userProfile.emergencyRelationship}
                            InputLabelProps={{shrink: true}}
                            //onChange={handleChange}
                            // inputRef={register}
                        />
                    </Grid>
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
                        
                    
                </Grid>

            </Grid>
        </Container>
        </form>
    )
}