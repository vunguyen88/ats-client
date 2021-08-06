import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from '@material-ui/core';
import { userSignUp } from '../state/UserActions';

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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
export default function SignUp() {
    const classes = useStyles();
    const dispatch = useDispatch();
    let history = useHistory();
    const userStatus = useSelector(state => state.user || [])
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const handleChange = (event) => {
        setState({...state, [event.target.id]: event.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        //console.log(state)
        dispatch(userSignUp({ email: state.email, password: state.password, firstName: state.firstName, lastName: state.lastName, role: 'user' }, history))
    }

    // if (userStatus.isAuthenticated === true) history.push('/employee')

    return (
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    onChange={handleChange}
                    label="First Name"
                    autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    onChange={handleChange}
                    autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                    autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to={{pathname: "/signin"}} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          {/* <Copyright /> */}
        </Box>
      </Container>
    );
}