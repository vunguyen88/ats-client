import React from 'react';
import { Markup } from 'interweave';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container, Card, CardMedia, CardContent } from '@material-ui/core';
import ApplyJobDialog from './ApplyJobDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        // marginTop: theme.spacing(8),
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        background: ''
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
        marginLeft: '2em',
        marginTop: '0.6em',
        //marginLeft: '1rem'
        // display: 'flex',
    },
    avatar: {
        backgroundColor: '#6495ED',
        marginLeft: '1rem',
        marginTop: '0.5rem',
    },
    title: {
        backgroundColor: 'yellow',
    },
    body: {
        //backgroundColor: 'green',
        marginTop: '1rem',
        //marginLeft: '0',
        paddingLeft: '2rem',
        paddingRight: '1.5rem',
        //textJustify: 'left',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'left',
        //alignSelf: 'left',
        //align: 'left'
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

const CustomButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        marginRight: '1rem',
        border: '1px solid #dfdfdf',
        lineHeight: 1.5,
        color: 'white',
        backgroundColor: '#696969',
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
        backgroundColor: 'black',
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

export default function JobDetails({ jobDetails, clickOpenJob }) {
    
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.left}>
                    {jobDetails.logoUrl !== undefined ? <Avatar variant="square" className={classes.avatar} style={{width: '3.5em', height: '3.5em'}} src={jobDetails.logoUrl} /> : <Avatar variant="square" className={classes.avatar}>{jobDetails.clientName.slice(0,1)}</Avatar>}
                </div>
                <div className={classes.right}>
                    <Typography align='left' display='block'>
                        <Box fontWeight='Bold' fontSize={14}>
                            {/* Senior System Engineer Manager */}{jobDetails.jobTitle}
                        </Box></Typography>
                    <Typography align='left' display='block'>
                        <Box fontWeight='Bold' color='cadetBlue' fontSize={14}>
                            {/* CyberCoders */}{jobDetails.clientName}
                        </Box>
                    </Typography>
                    <Typography align='left'>
                        <Box color='gray' fontSize={12}>
                            {/* Oviedo, FL */}{jobDetails.city}, {jobDetails.state}
                        </Box>
                    </Typography>
                </div>
            </div>
            <div className={classes.body}>
                <Typography align='left'>
                    <Box fontSize={13}>
                    <Markup content={jobDetails.jobDescription} /> 
                    </Box>
                </Typography>

            </div>
            {/* <div className={classes.body} dangerouslySetInnerHTML={{__html: jobDetails.jobDescription}}/> */}
            <div className={classes.footer}>
                <Typography align='left' display='inline' style={{paddingTop: '0.5rem', color: 'gray'}}>
                    <Box fontSize={13}>
                        {/* 2 days ago */}{jobDetails.daysPosted} days ago
                    </Box>
                </Typography>
                <Box display='flex'>
                <CustomButton onClick={() => clickOpenJob({props: {}, isOpen: false})}>Back</CustomButton>
                <ApplyJobDialog jobId={jobDetails.jobId} jobTitle={jobDetails.jobTitle} clientName={jobDetails.clientName}>Apply</ApplyJobDialog>
                </Box>
                
                {/* ////// */}
                {/* <Button onClick={() => jobDetails.clickOpenJob({jobDetails, isOpen: true})}>Read more</Button> */}
            </div>
        </div>
    )
}
