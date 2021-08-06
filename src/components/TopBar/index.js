import React, { useState, useEffect } from 'react';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import { useHistory, Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
//import AddNewUserDialog from '../../Pages/Employees/components/AddNewUserDialog';
//import AddNewButton from './AddNewUserDialog';
import PopOverButton from './PopOverButton';
import axios from 'axios';

// const CustomButton = withStyles({
//     root: {
//         boxShadow: 'none',
//         color: 'white',
//         height: '40px',
//         textTransform: 'none',
//         fontSize: 16,
//         padding: '6px 12px',
//         marginLeft: '15px',
//         border: '1px solid #dfdfdf',
//         lineHeight: 1.5,
//         backgroundColor: '#0077b3',
//         borderColor: 'f2f2f2',
//         fontFamily: [
//         '-apple-system',
//         'BlinkMacSystemFont',
//         '"Segoe UI"',
//         'Roboto',
//         '"Helvetica Neue"',
//         'Arial',
//         'sans-serif',
//         '"Apple Color Emoji"',
//         '"Segoe UI Emoji"',
//         '"Segoe UI Symbol"',
//         ].join(','),

//         '&:hover': {
//             backgroundColor: '#00aaff',
//             borderColor: 'f2f2f2',
//             boxShadow: 'none',
//         },

//         '&:active': {
//         boxShadow: 'none',
//         backgroundColor: '#33bbff',
//         borderColor: '#f2f2f2',
//         },

//         '&:focus': {
//         boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
//         },
//     }
// })(Button);

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
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
        width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
        display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
        display: 'none',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [message, setMessage] = useState([]);
    const [notification, setNotification] = useState([]);
    ///
    const [anchorNotificationEl, setAnchorNotificationEl] = useState(null);
    const handleMNotificationIconClick = (event) => {
        setAnchorNotificationEl(event.currentTarget);
    };
    const notificationIconOpen = Boolean(anchorNotificationEl);
    const notificationIconId = notificationIconOpen ? 'simple-popover' : undefined;
    ///
    const [anchorMessageEl, setAnchorMessageEl] = useState(null);
    const handleMessageIconClick = (event) => {
        setAnchorMessageEl(event.currentTarget);
    };
    const messageIconOpen = Boolean(anchorMessageEl);
    const messageIconId = messageIconOpen ? 'simple-popover' : undefined;
    ///
    const history= useHistory();
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAnchorClose = () => {
        setAnchorMessageEl(null);
        setAnchorNotificationEl(null);
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const onSignOutClick = (event) => {
        localStorage.removeItem('token');
        //window.location.href = "http://localhost:3000/";
        window.location.href = "https://applicant-tracking-syste-74466.web.app/";
    }
    // const handleAddNewUserOpen = () => {
    //     console.log('click')
    //     return <AddNewUserDialog setModalOpen={true} />
    // }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
            <MenuItem onClick={onSignOutClick}>Sign Out</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                >
                <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    useEffect(() => {
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.get('https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/profile', config)
        //axios.get('http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/profile', config)
            .then(res => {
                let unreadMessage = res.data.messages.filter(message => {
                    return message.status !== 'read'
                })
                let unreadNotification = res.data.notifications.filter(notification => {
                    return notification.status !== 'read'
                })
                console.log('unread message is ', unreadMessage)
                setMessage([...unreadMessage]);
                setNotification([...unreadNotification]);
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div className={classes.grow}>
            <AppBar position="static" style={{ background: 'white', color: 'black' }}>
                <Toolbar>
                {/* <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon />
                </IconButton> */}
                    <Typography className={classes.title} variant="h6" noWrap>
                        Your ATS
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {/* <CustomButton onClick={ handleAddNewUserOpen }>+ Add New</CustomButton> */}
                        {/* <AddNewUserDialog /> */}
                        {/* <AddNewButton /> */}
                        <PopOverButton />


                        <IconButton aria-label="show 4 new mails" color="inherit" onClick={handleMessageIconClick}>
                            <Badge badgeContent={message.length > 0 ? message.length : 0} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        {message.length === 0 
                            ? null 
                            : <Popover
                                id={messageIconId}
                                open={messageIconOpen}
                                anchorEl={anchorMessageEl}
                                onClose={handleAnchorClose}
                                anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                                }}
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                                }}
                            >
                                <Link to="/app/notification" style={{ textDecoration: 'none', color: 'black' }}>
                                    <Typography color='primary' variant='subtitle1' style={{margin: '7px'}}>You have new message from {message[message.length - 1].sender}.</Typography>
                                </Link>
                            </Popover>
                        }

                        <IconButton aria-label="show 17 new notifications" color="inherit" onClick={handleMNotificationIconClick}>
                            <Badge badgeContent={notification.length >0 ? notification.length : 0} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        {notification.length === 0 
                            ? null 
                            : <Popover
                                id={notificationIconId}
                                open={notificationIconOpen}
                                anchorEl={anchorNotificationEl}
                                onClose={handleAnchorClose}
                                anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                                }}
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                                }}
                            >
                                <Link to="/app/notification" style={{ textDecoration: 'none', color: 'black' }}>
                                    <Typography color='primary' variant='subtitle1' style={{margin: '7px'}}>You have new message.</Typography>
                                </Link>
                            </Popover>
                        }

                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}
