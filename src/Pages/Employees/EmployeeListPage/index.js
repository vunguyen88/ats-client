import React, { useEffect, useState } from 'react'
import NavBar from '../../../components/NavBar';
import TopBar from '../../../components/TopBar';
import MenuBar from './components/MenuBar';
import UtilityBar from './components/UtilityBar';
import EmployeeCard from './components/EmployeeCard';
import { Grid, Box, Typography, InputBase, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { getAllEmployees } from './state/EmployeesActions';
import { useForm } from 'react-hook-form';
import {checkAuth} from '../../../utils/Utils';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex', 
        backgroundColor: '#f0f0f5',
        minHeight: '100vh',
        maxHeight: '100%',
    },
    wrapper: {
        flexDirection: 'column', 
        width: '100%',
        flexGrow: 1,
        //height: '100%'
    },
    search: {
        display: 'inline',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        // backgroundColor: fade(theme.palette.common.white, 0.15),
        backgroundColor: 'whiteSmoke',
        '&:hover': {
        // backgroundColor: fade(theme.palette.common.white, 0.25),
        backgroundColor: theme.palette.common.red,
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '15%',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'inline',
        alignItems: 'center',
        justifyContent: 'center',
        top: '5px'
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        width: '20ch',
        },
    },
}))

function EmployeesPage() {
    const classes = useStyles();
    let employees = useSelector(state => state.employees || []);
    console.log('employees list ', employees)
    const dispatch = useDispatch();
    // checkAuth()
    useEffect(() => {
        dispatch(getAllEmployees());
    }, [])

    // if(employees) {
    //     setLoading(false)
    // }

    return (

        <div className={classes.root}>
            <NavBar style={{display: 'block'}}/>
            <div className={classes.wrapper}>
                <TopBar />
                <MenuBar style={{}}/>
                <UtilityBar />
                <Box display="flex" flexWrap="wrap">
                {employees.map(employee => {
                    return <EmployeeCard key={employee.userId} employeeInfo={employee} />
                })}
                </Box>
                {employees.length > 0 ? null : <CircularProgress size={50} value={100} thickness={2}/> }
            </div>
        </div>
    )
}

export default EmployeesPage
