import React from 'react'
import NavBar from '../../../components/NavBar';
import TopBar from '../../../components/TopBar';
import { makeStyles } from '@material-ui/core/styles';
import MenuBar from '../JobListPage/components/MenuBar';
// import UtilityBar from './components/UtilityBar';
import NewJobForm from '../JobListPage/components/NewJobForm';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex', 
        backgroundColor: '#f0f0f5',
        height: '100vh'
    },
    wrapper: {
        flexDirection: 'column', 
        width: '100%',
        flexGrow: 1
    },
}))

export default function JobsOpeningPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavBar style={{display: 'block'}}/>
            <div className={classes.wrapper}>
                <TopBar />
                <MenuBar addJob={false} />
                <NewJobForm />
                {/* <UtilityBar /> */}
                {/* <Box display="flex">
                {employees.map(employee => {
                    return <EmployeeCard key={employee.userId} firstName={employee.firstName} lastName={employee.lastName} avatarUrl={employee.avatarUrl} jobTitle={employee.jobTitle} department={employee.department} join={employee.join} />
                })}
                </Box> */}
            </div>
        </div>
    )
}
