import React from 'react'
import { Grid, Box, Typography, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
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

export default function UtilityBar() {
    const classes = useStyles();
    
    return (
        <div>
            <Box display='flex' m={3}> 
                <Typography display='inline'>Browse</Typography>
                <span style={{marginRight: '10%'}}></span>
                <Typography display='inline'>Sort by</Typography>
                <div style={{flexGrow: 1}}></div>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search employees"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
            </Box>    
        </div>
    )
}
