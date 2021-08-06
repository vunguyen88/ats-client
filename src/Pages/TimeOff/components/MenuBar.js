import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@material-ui/core';

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

export default function MenuBar(props) {
    // console.log('props', props)
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{background: '#f2f2f2'}}>
                <Toolbar variant="dense">
                    <Typography variant="h6" color="textPrimary">
                        Time Off
                    </Typography>
                    <div className={classes.root} />
                    <Box>              
                        {/* <CustomButton>Import</CustomButton> */}
                        <CustomButton>Export</CustomButton>
                        {/* { props.addJob === false ? null : <CustomButton component={Link} to='/app/newjob'>Add Candidate</CustomButton> } */}
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}
