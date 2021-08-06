import React from 'react';
import { useHistory } from "react-router-dom";
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

export default function EmployeeCard({ employeeInfo }) {
    const classes = useStyles();
    const history = useHistory();
    console.log('employee info in card ', employeeInfo)

    return (
        <Card className={classes.card}>
            <CardContent>
                <Avatar className={classes.avatar} src={employeeInfo.avatarUrl} />
                <h3 style={{marginBottom: '-10px'}}>
                    <Button 
                        style={{color: '#2b506e', fontWeight: 'bold', fontSize: '16px'}}
                        onClick={() => history.push(`/app/employees/${employeeInfo.userId}`)}
                    >
                        { employeeInfo.firstName + ' ' + employeeInfo.lastName}
                    </Button>
                </h3>
                <p>{ employeeInfo.jobTitle || ''}</p>
                <p>{ employeeInfo.company || ''}</p>
            </CardContent>
            <Divider light style={{marginTop: '-10px'}}/>
            <Box display={'flex'}>
                <Box p={0} flex={'auto'} >
                    <p style={{fontWeight: 'bold', fontSize: '14px', color: '#b2b2b2'}}>Department</p>
                    <p>{ employeeInfo.department || ''}</p>
                </Box>
                <Box p={0} flex={'auto'} >
                    <p style={{fontWeight: 'bold', fontSize: '14px',  color: '#b2b2b2'}}>Since</p>
                    <p>{ employeeInfo.join || ''}</p>
                </Box>
            </Box>
        </Card>
    )
}
