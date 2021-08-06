import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import NavBar from '../../../components/NavBar';
import TopBar from '../../../components/TopBar';
import MenuBar from '../EmployeeListPage/components/MenuBar';
import axios from 'axios';
//import UtilityBar from './components/UtilityBar';
//import EmployeeCard from './components/EmployeeCard';
import { 
    Grid, 
    Box, 
    Typography, 
    InputBase, 
    IconButton, 
    Avatar, 
    Button, 
    Container, 
    Divider,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
//import SearchIcon from '@material-ui/icons/Search';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EmailIcon from '@material-ui/icons/Email';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import { Alert, AlertTitle } from '@material-ui/lab';
// import { getAllEmployees } from './state/EmployeesActions';
import { useForm } from 'react-hook-form';

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
    header: {
        //backgroundColor: 'black',
        paddingTop: '1.5rem',
        paddingLeft: '1rem',
        display: 'flex',
        flexDirection: 'row',
    },
    left: {
        width: '500px',
        //backgroundColor: 'brown',
    },
    right: {
        //width: '70%',
        //marginLeft: '1rem'
        // display: 'flex',
    },
    
}))

function EmployeeDetailPage(props) {
    const classes = useStyles();
    const history = useHistory();
    const [message, setMessage] = useState('');
    const [successCode, setSuccessCode] = useState(false);
    const [errorCode, setErrorCode] = useState();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openMessageDialog, setOpenMessageDialog] = useState(false);
    const [openAppointmentDialog, setOpenAppointmentDialog] = useState(false);
    let userId = props.location.pathname.split('/')[3];
    console.log('userId ', userId)
    const [userInfo, setUserInfo] = useState({});
    //let employees = useSelector(state => state.employees || []);
    //console.log('employees list ', employees)
    //const dispatch = useDispatch();

    useEffect(() => {
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.get(`https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/users/${userId}`, config)
        //axios.get(`http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/users/${userId}`, config)
            .then(res => {
                console.log('res is ', res.data);
                setUserInfo({...res.data});
                
            })
            .catch(err => {
                console.log(err)
            })
    }, [userId])
    console.log('user info ', userInfo)

    const handleClickMessageOpen = () => {
        setOpenMessageDialog(true);
    };
    
    const handleCloseMessageDialog = () => {
        setOpenMessageDialog(false);
    };

    const handleSendMessage = () => {
        let token = localStorage.getItem('token');
        const body = {
            body: message,
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/users/${userId}/messages`, body, config)
        //axios.post(`http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/users/${userId}/messages`, body, config)
            .then(res => {
                console.log('MESSAGE SENT SUCCESS');
                setSuccessCode(true);
                setOpenSnackbar(true);
                handleCloseMessageDialog();
            })
            .catch(err => {
                console.log(err);
                setErrorCode(err.response.status);
                setOpenSnackbar(true);
            })
        //handleClose();
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div className={classes.root}>
            <NavBar style={{display: 'block'}}/>
            <div className={classes.wrapper}>
                <TopBar />
                <MenuBar style={{}}/>
                {/* <UtilityBar /> */}
                <Box display="flex" alignItems='center'>
                    <IconButton 
                        aria-label="upload picture" 
                        component="span" 
                        style={{paddingLeft: '30px', color: '#404040', backgroundColor: 'none'}}
                        onClick={() => history.push(`/app/employees`)}
                    >
                        <ArrowBackIosIcon />
                        <Typography>See All</Typography>
                    </IconButton>
                </Box>

                <Box >
                    <Grid container>    
                        {/* === left section === */}
                        <Grid item md={7} xs={12}>
                            <Box height='80vh' ml={3} mr={3} style={{backgroundColor: 'white'}} >
                                <Box width='100vh' display='flex'>
                                    <Box width='33%'>
                                        <Box width='45%' m={3}>
                                            <Avatar variant="square" src={userInfo.avatarUrl || ''} style={{width: '100%', height: '100%'}}>avatar</Avatar>
                                        </Box>
                                    </Box>
                                    {/* === left header section === */}
                                    <Box ml={-10} mt={3}>
                                        <Typography align='left' display='block'>
                                            <Box fontWeight='Bold' fontSize={25}>
                                                {userInfo.firstName || ''} {userInfo.lastName || ''}
                                            </Box>
                                        </Typography>
                                        <Typography align='left' display='block'>
                                            <Box fontWeight='Bold' color='cadetBlue' fontSize={18}>
                                                {userInfo.jobTitle || ''} - {userInfo.company}
                                            </Box>
                                        </Typography>
                                        <Typography align='left'>
                                            <Box color='gray' fontSize={18}>
                                                {userInfo.department || ''}
                                            </Box>
                                        </Typography>
                                        <Box ml={-2}>
                                            <Grid container>
                                                <Grid item style={{marginLeft: '3px'}}>
                                                    <IconButton
                                                        //style={{backgroundColor: '#0077b3', color: 'white'}}
                                                        variant="contained"
                                                        onClick={setOpenMessageDialog}
                                                    >
                                                        <EmailIcon style={{color: '#0077b3'}}/>
                                                    </IconButton>

                                                    {/* Dialog to send message to specific user */}
                                                    <Dialog open={openMessageDialog} onClose={handleCloseMessageDialog} aria-labelledby="form-dialog-title">
                                                        <DialogTitle id="form-dialog-title">Message</DialogTitle>
                                                        <DialogContent>
                                                        <DialogContentText>
                                                            Enter the message you want to send to {userInfo.firstName} {userInfo.lastName}
                                                        </DialogContentText>
                                                        <TextField
                                                            autoFocus
                                                            margin="dense"
                                                            id="message"
                                                            label="Message body"
                                                            type="email"
                                                            fullWidth
                                                            onChange={(e) => setMessage(e.target.value)}
                                                        />
                                                        </DialogContent>
                                                        <DialogActions>
                                                        <Button onClick={handleCloseMessageDialog} color="primary">
                                                            Cancel
                                                        </Button>
                                                        <Button onClick={handleSendMessage} color="primary">
                                                            Send
                                                        </Button>
                                                        </DialogActions>
                                                    </Dialog>

                                                </Grid>
                                                <Grid item style={{marginLeft: '-10px'}}>
                                                    <IconButton
                                                        color="default"
                                                        variant="contained"
                                                        //type="submit"
                                                        onClick = {() => console.log('appt click')}
                                                    >
                                                        <EventAvailableIcon style={{color: '#0077b3'}}/>
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                    
                                </Box>
                                {/* === left divider section === */}
                                <Box ml={3} mr={3}>
                                    <Divider light />
                                </Box>
                                {/* === left body section === */}
                                <Box m={4}> 
                                    <Grid container spacing={2}>
                                        <Grid item md={6} sx={6}>
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                // name="lasttName"
                                                id="email"
                                                //required
                                                // variant="outlined"
                                                value={userInfo.email || ''}
                                                InputLabelProps={{shrink: true}}
                                                InputProps={{ disableUnderline: true }}
                                                //onChange={handleChange}
                                                // inputRef={register}
                                            />
                                        </Grid>
                                        <Grid item md={6} sx={6}>
                                            <TextField
                                                fullWidth
                                                label="Employee Id"
                                                // name="lasttName"
                                                id="id"
                                                //required
                                                // variant="outlined"
                                                value={userInfo.userId || ''}
                                                InputLabelProps={{shrink: true}}
                                                InputProps={{ disableUnderline: true }}
                                                //onChange={handleChange}
                                                // inputRef={register}
                                            />
                                        </Grid>
                                        <Grid item md={6} sx={6}>
                                            <TextField
                                                fullWidth
                                                label="Join in"
                                                // name="lasttName"
                                                id="join"
                                                //required
                                                // variant="outlined"
                                                value={userInfo.join || ''}
                                                InputLabelProps={{shrink: true}}
                                                InputProps={{ disableUnderline: true }}
                                                //onChange={handleChange}
                                                // inputRef={register}
                                            />
                                        </Grid>
                                        <Grid item md={6} sx={6}>
                                            <TextField
                                                fullWidth
                                                label="Phone"
                                                // name="lasttName"
                                                id="phone"
                                                // required
                                                // variant="outlined"
                                                value={userInfo.phone || ''}
                                                InputLabelProps={{shrink: true}}
                                                InputProps={{ disableUnderline: true }}
                                                //onChange={handleChange}
                                                // inputRef={register}
                                            />
                                        </Grid>
                                        <Grid item md={6} sx={6}>
                                            <TextField
                                                fullWidth
                                                label="Manager"
                                                // name="lasttName"
                                                id="manager"
                                                // required
                                                // variant="outlined"
                                                value={userInfo.manager || ''}
                                                InputLabelProps={{shrink: true}}
                                                InputProps={{ disableUnderline: true }}
                                                //onChange={handleChange}
                                                // inputRef={register}
                                            />
                                        </Grid>
                                        <Grid item md={6} sx={6}>
                                            <TextField
                                                fullWidth
                                                label="Location"
                                                id="location"
                                                value={userInfo.city + ', ' + userInfo.state || ''}
                                                InputLabelProps={{shrink: true}}
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Grid>
                                        <Grid item md={6} sx={6}>
                                            <div style={{position: 'relative', display: 'block'}}>
                                                <TextField
                                                    fullWidth
                                                    label="Social Media"
                                                    InputLabelProps={{shrink: true}}
                                                    InputProps={{ disableUnderline: true }}
                                                    //style={{textIndent: 30}}
                                                    //hintText="Search by Name"
                                                    //onChange={_.debounce((event, value) => this.handleSearch(value), 500)}
                                                />
                                                <FacebookIcon fontSize='large' style={{position: 'absolute', left: 0, top: 20, width: 30, height: 30, color:'darkBlue'}}/>
                                                <LinkedInIcon fontSize='large' style={{position: 'absolute', left: 30, top: 20, width: 30, height: 30, color:'darkBlue'}}/>
                                                <TwitterIcon fontSize='large' style={{position: 'absolute', left: 60, top: 20, width: 30, height: 30, color:'darkBlue'}}/>
                                            </div>
                                                
                                                
                                        </Grid>
                                    </Grid>
                                </Box >
                            </Box>
                        </Grid>
                        <Grid item md={5} xs={12}>
                            <Box height='80vh' mr={3} style={{backgroundColor: 'white'}}>
                                <Box  display='flex'>
                                    <Box m={3} >
                                        <Typography align='left' style={{color: '#999999', marginBottom: '5px'}} m={3}>Notes</Typography>
                                        <Typography align='left' style={{marginLeft: '20px'}}>- Taking Microservices with NodeJs and React</Typography>
                                        <Typography align='left' style={{marginLeft: '20px'}}>- Team meeting on Friday</Typography>
                                        <Typography align='left' style={{marginLeft: '20px'}}>- Fixing auth to return access level</Typography>
                                    </Box>
                                    
                                    
                                </Box>
                                <Box m={3} height='30%'>
                                    <Box >
                                        <Typography align='left' style={{color: '#999999', marginBottom: '5px'}} m={3}>Achievements</Typography>
                                        <Typography align='left' style={{marginLeft: '20px'}}>- Completed Agile course</Typography>
                                        <Typography align='left' style={{marginLeft: '20px'}}>- Completed Apache Kafka - Real-time Stream Processing</Typography>
                                        <Typography align='left' style={{marginLeft: '20px'}}>- Success integrate backend with MS Sharepoint</Typography>
                                    </Box>
                                </Box>

                                <Box m={3} height='30%'>
                                    <Box>
                                        <Typography align='left' style={{color: '#999999', marginBottom: '5px'}} m={3}>Activities</Typography>
                                        {/* <Typography align='left' style={{marginLeft: '20px'}}>- Completed Agile course</Typography>
                                        <Typography align='left' style={{marginLeft: '20px'}}>- Completed Apache Kafka - Real-time Stream Processing for Microservices</Typography>
                                        <Typography align='left' style={{marginLeft: '20px'}}>- Success integrate backend with MS Sharepoint</Typography> */}
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* Response Notification */}
                <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleSnackbarClose}>
                {(() => {
                    if (successCode === true) {
                        return <Alert onClose={handleSnackbarClose} severity="success">Message sent success! </Alert>
                        // return <Alert onClose={handleClose} severity="success">New job added! Click <Link to={{pathname:'/app/sendgrid', state:{data: newJobResponseData}}}>here </Link> to go to notification page.</Alert>
                    } else if (errorCode === 403) {
                        return <Alert onClose={handleSnackbarClose} severity="error">Authentication expired! Please click <Link to='/' >here</Link> to go back to Login</Alert>
                    } else {
                        return <Alert onClose={handleSnackbarClose} severity="error">Message sent fail!</Alert>
                    }
                })()}
            </Snackbar>
            </div>
        </div>
    )
}

export default EmployeeDetailPage
