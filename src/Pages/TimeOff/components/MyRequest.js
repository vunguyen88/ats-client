import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import { AppBar, Toolbar, Typography, Box, Button, Card, Grid, TextField } from '@material-ui/core';

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

const timeOffTypes = [
    {
        value: 'VC',
        label: 'Vacation'
    },
    {
        value: 'SL',
        label: 'Sick Leave'
    },
    {
        value: 'ML',
        label: 'Maternity Leave'
    },
    {
        value: 'PL',
        label: 'Paternity Leave'
    },
    {
        value: 'BL',
        label: 'Bereavement Leave'
    }
];


export default function TimeOffRequest(timeoffData) {
    console.log('timeoff data in my request', timeoffData)
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box mx={3} mt={3} mb={1} backgroundColor='white'>
                <Grid container>
                    <Grid item md={12} xs={12}>
                        <Card>
                            <Box height="700px">
                                <DataGrid
                                    {...timeoffData}
                                    //loading={loading}
                                    pageSize={50}
                                    //onRowSelected={handleRowClick}
                                    // components={{
                                    //     LoadingOverlay: CustomLoadingOverlay
                                    // }}
                                >
                                </DataGrid>
                            </Box>
                        </Card>                
                    </Grid>
                </Grid>
                
            </Box>
        </div>
    )
}
