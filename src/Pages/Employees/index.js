import React from 'react'
import NavBar from '../../components/NavBar';
import TopBar from '../../components/TopBar';
import MenuBar from './MenuBar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block'
        // display: 'flex',
        // justifyContent: 'flex-start',  
    },
    
}))
function EmployeePage() {
    const classes = useStyles();
    return (
        // <Grid container>
        //     <Grid item xs={12}>
        //     <NavBar />
        //     </Grid>
        //     <Grid item xs={12} style={{marginLeft: '75px'}}>
        //     <TopBar style={{marginLeft: '100px'}}/>
        //     </Grid>
        //     <Grid item xs={12}>
        //     <MenuBar style={{display: 'block'}}/>
        //     </Grid>
        // </Grid>
        <div>
            <NavBar className={classes.root}/>
            <TopBar style={{marginLeft: '75px'}}/>
            <MenuBar />
        </div>
            
            
       
    )
}

export default EmployeePage
