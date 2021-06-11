import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Box, Button } from '@material-ui/core';
import AddNewUserDialog from './AddNewUserDialog';

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

export default function MenuBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{background: '#f2f2f2'}}>
                <Toolbar variant="dense">
                    <Typography variant="h6" color="textPrimary">
                        Employees
                    </Typography>
                    <div className={classes.root} />
                    <Box display='flex'>              
                        <CustomButton>Import</CustomButton>
                        <CustomButton>Export</CustomButton>
                        {/* <CustomButton>Add Employee</CustomButton> */}
                        <AddNewUserDialog />
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}
