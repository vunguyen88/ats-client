import React from 'react'
import NavBar from '../../components/NavBar';
import TopBar from '../../components/TopBar';
import MenuBar from './MenuBar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex', 
    },
    wrapper: {
        display: 'flex', 
        flexDirection: 'column', 
        width: '100%',
        background: 'seaShell'
    }
}))
function EmployeePage() {
    const classes = useStyles();
    return (

        <div className={classes.root}>
            <NavBar style={{display: 'block'}}/>
           <div className={classes.wrapper}>
                <TopBar style={{flexGrow: 1}}/>
                <MenuBar style={{}}/>
           </div>
        </div>
    )
}

export default EmployeePage
