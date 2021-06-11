import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddNewUserDialog from './AddNewUserButton';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '0.2rem',
    },
    typography: {
        padding: theme.spacing(2),
    },
}));

const CustomButton = withStyles({
    root: {
        boxShadow: 'none',
        color: 'white',
        height: '40px',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        marginLeft: '15px',
        border: '1px solid #dfdfdf',
        lineHeight: 1.5,
        backgroundColor: '#0077b3',
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
            backgroundColor: '#00aaff',
            borderColor: 'f2f2f2',
            boxShadow: 'none',
        },

        '&:active': {
        boxShadow: 'none',
        backgroundColor: '#33bbff',
        borderColor: '#f2f2f2',
        },

        '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    }
})(Button);

export default function SimplePopover() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className={classes.root}>
            <CustomButton aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                + Add New
            </CustomButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >
                <List>
                    {/* <ListItem button> */}
                        {/* <ListItemText primary={'Add User'} />     */}
                        <AddNewUserDialog setAnchorEl={setAnchorEl} />
                    {/* </ListItem> */}
                
                    <ListItem button component={Link} to='/app/newjob'> 
                        <ListItemText primary={'Add Job'} />    
                    </ListItem>
                
                    <ListItem button>
                        <ListItemText primary={'Add Candidate'} />    
                    </ListItem>
                </List>
            </Popover>
        </div>
    );
}