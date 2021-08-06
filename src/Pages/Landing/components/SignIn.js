import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container, Snackbar } from '@material-ui/core';
import { userSignIn } from '../state/UserActions';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    let history = useHistory();
    const [successCode, setSuccessCode] = useState(false);
    const [errorCode, setErrorCode] = useState();
    const [open, setOpen] = useState(false);
    const userStatus = useSelector(state => state.user || [])
    //console.log('auth in signin', userStatus)
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: '',
        password: '',
    })
  
    const handleChange = (event) => {
        setState({...state, [event.target.id]: event.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        //console.log(state)
        dispatch(userSignIn({ email: state.email, password: state.password }))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        if (userStatus.isAuthenticated === true) {
            history.push('/app/employees')
        } else if (userStatus.isAuthenticated === false){
            setErrorCode(500);
            setOpen(true);
        }
    }, [userStatus])
    
    // if (userStatus.isAuthenticated === false) {
    //     console.log('TRUEEEE')
    //     setErrorCode(500);
    //     setOpen(true);
    // }
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(login(email, password));  
        
    // }

    return (
        <Container component="main" maxWidth="xs">
            {/* <CssBaseline /> */}
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                {/* <LockOutlinedIcon /> */}
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={handleChange}
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                        
                    </Grid>
                </form>
                
            </div>
            <Box mt={8} fontSize={12}>
                You can sign up your own account or sign in with following credential: 
                    <Box display='block'>email_address: guest@gmail.com</Box>
                    <Box>password: 123456</Box>
            </Box>

            {/* <Box mt={3} fontSize={13}>
                <Link to='/about'>Click here to learn about me and this project</Link>
            </Box> */}

            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                {(() => {
                    if (successCode === true) {
                        return <Alert onClose={handleClose} severity="success">Update success </Alert>
                        // return <Alert onClose={handleClose} severity="success">New job added! Click <Link to={{pathname:'/app/sendgrid', state:{data: newJobResponseData}}}>here </Link> to go to notification page.</Alert>
                    } else if (errorCode === 500) {
                        return <Alert onClose={handleClose} severity="error">Wrong email or password</Alert>
                    } else {
                        return <Alert onClose={handleClose} severity="error">Update fail!</Alert>
                    }
                })()}
            </Snackbar>
        </Container>
    );
  }
