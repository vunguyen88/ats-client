import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Box, Card, CardContent, Avatar, Divider, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    card: {
        borderRadius: 12,
        maxWidth: 250,
        minWidth: 250,
        textAlign: 'center',
        margin: '1rem'
    },
    avatar: {
        width: 120,
        height: 120,
        margin: 'auto',
    },
}));

export default function EmployeeCard({ firstName, lastName, avatarUrl, jobTitle, department, join }) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Avatar className={classes.avatar} src={avatarUrl} />
                <h3 >{ firstName + ' ' + lastName}</h3>
                <span>{ jobTitle }</span>
            </CardContent>
            <Divider light />
            <Box display={'flex'}>
                <Box p={0} flex={'auto'} >
                    <p>Department</p>
                    <p>{ department }</p>
                </Box>
                <Box p={0} flex={'auto'} >
                    <p>Since</p>
                    <p>{ join }</p>
                </Box>
            </Box>
        </Card>
    )
}
