import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container, Card, CardMedia, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        // marginTop: theme.spacing(8),
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        background: '#e6e6e6'
    },
    header: {
        //backgroundColor: 'black',
        paddingTop: '1.5rem',
        paddingLeft: '1rem',
        display: 'flex',
        flexDirection: 'row',
    },
    left: {
        width: '9%',
        //backgroundColor: 'brown',
    },
    right: {
        width: '91%',
        //marginLeft: '1rem'
        // display: 'flex',
    },
    avatar: {
        backgroundColor: 'red',
        marginLeft: '1rem',
        marginTop: '0.5rem',
    },
    title: {
        backgroundColor: 'yellow',
    },
    body: {
        //backgroundColor: 'green',
        marginTop: '1rem',
        paddingLeft: '2rem',
        paddingRight: '1.5rem'
        //height: '50px'
    },
    footer: {
        //backgroundColor: 'blue',
        marginTop: '1rem',
        marginLeft: '2rem',
        marginRight: '1.5rem',
        paddingBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between'
        // height: '50px'
    }    
}));

const ApplyButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        marginRight: '1rem',
        border: '1px solid #dfdfdf',
        lineHeight: 1.5,
        color: 'white',
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

export default function Job(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.left}>
                    <Avatar variant="square" className={classes.avatar}>{props.clientName.slice(0,1)}</Avatar>
                </div>
                <div className={classes.right}>
                    <Typography align='left' display='block'>
                        <Box fontWeight='Bold' fontSize={14}>
                            {/* Senior System Engineer Manager */}{props.jobTitle}
                        </Box></Typography>
                    <Typography align='left' display='block'>
                        <Box fontWeight='Bold' color='cadetBlue' fontSize={14}>
                            {/* CyberCoders */}{props.clientName}
                        </Box>
                    </Typography>
                    <Typography align='left'>
                        <Box color='gray' fontSize={12}>
                            {/* Oviedo, FL */}{props.city}, {props.state}
                        </Box>
                    </Typography>
                </div>
            </div>
            <div className={classes.body}>
                <Typography align='left'>
                    <Box fontSize={13}>
                        {/* If you are a Senior Systems Engineering Manager with experience, please read on!
                        We are a leading simulation company that is looking to add a top engineering manager to our team! If you have ever wanted to work for an Employee owned simulation company where you would report directly to our chief engineer and have a say in everything that happens in our organization while still getting to work on the same government contracts as Lockheed, Raytheon, etc... then this is the position for you! */}{props.jobSummary} ...
                    </Box>
                </Typography>

            </div>
            <div className={classes.footer}>
                <Typography align='left' display='inline' style={{paddingTop: '0.5rem', color: 'gray'}}>
                    <Box fontSize={13}>
                        {/* 2 days ago */}{props.daysPosted} days ago
                    </Box>
                </Typography>
                <ApplyButton>Apply</ApplyButton>
            </div>
        </div>
    )
}
