import React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AlarmIcon from '@material-ui/icons/Alarm';
import PeopleIcon from '@material-ui/icons/People';
import WorkIcon from '@material-ui/icons/Work';
import SettingsIcon from '@material-ui/icons/Settings';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        background: '#2b506e'
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
        background: '#2b506e'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const LIstItemStyle = {
    color: 'white',
}

export default function NavBar() {
    
    const classes = useStyles();
    const theme = useTheme();
    console.log(theme.direction)
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
    <div className={classes.root}>
        {/* <CssBaseline /> */}
       
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                { open  ?   <IconButton onClick={handleDrawerClose}>
                                <ChevronLeftIcon style={{ color: 'lightGrey' }} />
                            </IconButton> 
                       :  null
                }
            </div>
            <Divider />
            <List>
                <ListItem button>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                    })}
                >
                    <MenuIcon style={{ color: 'lightGrey' }}/>
                </IconButton>
                </ListItem>
                <ListItem button component={Link} to='/app/jobs'>
                    <ListItemIcon>
                        <WorkIcon style={{ color: 'lightGrey' }}/>
                    </ListItemIcon>
                    <ListItemText style={LIstItemStyle} primary="Jobs Opening" />
                </ListItem>
                <ListItem button component={Link} to='/app/candidates'>
                    <ListItemIcon>
                        <FileCopyIcon style={{ color: 'lightGrey' }}/>
                    </ListItemIcon>
                    <ListItemText style={LIstItemStyle} primary="New Hires" />
                </ListItem>
                <ListItem button component={Link} to='/app/employees'>
                    <ListItemIcon>
                        <PeopleIcon style={{ color: 'lightGrey' }}/>
                    </ListItemIcon>
                    <ListItemText style={LIstItemStyle} primary="Employees" />
                </ListItem>
                <ListItem button component={Link} to='/app/timeoff'>
                    <ListItemIcon>
                        <AlarmIcon style={{ color: 'lightGrey' }}/>
                    </ListItemIcon>
                    <ListItemText style={LIstItemStyle} primary="Time Off" />
                </ListItem>
                <ListItem button component={Link} to='/app/settings'>
                    <ListItemIcon>
                        <SettingsIcon style={{ color: 'lightGrey' }}/>
                    </ListItemIcon>
                    <ListItemText style={LIstItemStyle} primary="Settings" />
                </ListItem>
            </List>
        </Drawer>
    </div>
    );
}
