import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import EditIcon from '@material-ui/icons/Edit';
import TextsmsIcon from '@material-ui/icons/Textsms';
import { useHistory } from "react-router-dom";
import {useForm, Controller} from 'react-hook-form';
import FileIcon from '../../../../icons/fileIcon.png';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, 
    Grid,
    IconButton,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Container,
    withStyles,
    makeStyles,
    CardMedia,
    Snackbar
} from '@material-ui/core';

const styles = {
    image: {
        width: '40px'
    }
}

const StyledTableCell  = withStyles((theme) => ({
    head: {
      backgroundColor: '#2b506e',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
    titleBox: {
        display: 'flex',
        //justifyContent: 'center',
        marginBottom: '1rem',
        //marginTop: '2rem',
        backgroundColor: 'none'
    },
    left: {
        marginTop: '2rem',
        marginLeft: '1rem'
    },
    right:{
        marginTop: '2rem',
    },
    nameContainer: {
        marginTop: '0.5rem'
    },
    media: {
        margin: 'auto',
        width: 60,
        height: 60
    },
    fileIcon: {
        //width: '10px',
        height: '10px'
    },
    cardContent: {
        padding: '1rem'
    },
    textFieldWidth: {
        width: '85%'
    },
    typography: {
        paddingLeft: 55
    },
    table: {
        width: '94%',
        marginLeft: '55px',
    },
    appliedJobTableHead: {
        background: 'black',
    }
}))


export default function CandidateDetail({ candidateDetails }) {
    console.log('CANDIDATE DETAILS COMP ', candidateDetails);
    const [openSMSDialog, setOpenSMSDialog] = useState(false);
    const [smsMessage, setSmsMessage] = useState("");
    const history = useHistory();
    const classes = useStyles();

    const handleSMSDialogClickOpen = () => {
        setOpenSMSDialog(true);
    };

    const handleDialogClose = () => {
        setOpenSMSDialog(false);
    };

    const handleRowClick = (jobId) => {
        console.log('ROUTING TO JOBID ', jobId)
        history.push(`/app/jobs/${jobId}`);
    }
    // Nothing yet
    const onSendSMS = () => {}

    const handleSMSMessageChange = (event) => {
        console.log(event.target.value);
        setSmsMessage(event.target.value);
    };

    return (
        <Container maxWidth={false}>
            <Box display="flex">
                <Box display="flex" width="100%" className={classes.titleBox}>
                    <div className={classes.left}>
                        <CardMedia className={classes.media}>
                            <Avatar className={classes.purple, classes.media}>
                                <Typography variant="h5" >{candidateDetails.firstName.split('')[0]}</Typography>
                            </Avatar>
                        </CardMedia>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Rating
                                size="small"
                                name="simple-controlled"
                                readOnly
                                // value={candidateDetails.rating}
                                // onChange={(event, newValue) => {
                                //     setValue(newValue);
                                // }}
                            />
                        </Box>
                    </div>
                    <div className={classes.right}>
                        <Box display="flex" alignItems="center" className={classes.nameContainer}>
                            <Typography variant="h3" fontWeight="bold">{candidateDetails.firstName + ' ' + candidateDetails.lastName}</Typography>
                            <IconButton color="primary" aria-label="Download" href={'resume'} className={classes.fileIcon}>
                                <img src={FileIcon} alt='file icon' style={styles.image}/>   
                            </IconButton>
                            <Typography>{candidateDetails.resume}</Typography>
                        </Box>
                    </div>
                </Box>
                <Box display="flex" alignItems="center" p={3} mr={3}>
                    
                    <IconButton color="primary" aria-label="Download" onClick={handleSMSDialogClickOpen} className={classes.fileIcon}>
                        <TextsmsIcon fontSize="large" style={{ color: '#2b506e' }}/> 
                    </IconButton>
                    {/* <IconButton onClick={()=>(<Link to={{pathname:`/app/candidates/${candidateDetails.candidateId}/edit`, state: {details: candidateDetails}}}>
                        <EditIcon color="primary" fontSize="large" ></EditIcon>
                    </Link>)}><EditIcon color="primary" fontSize="large" ></EditIcon></IconButton> */}
                    <Link to={{pathname:`/app/candidates/${candidateDetails.candidateId}/edit`, state: {details: candidateDetails}}}>
                        <EditIcon color="primary" fontSize="large" style={{ color: '#2b506e' }}></EditIcon>
                    </Link>
                </Box>
            </Box>
            <Card>
                <CardContent>
                    <Grid container spacing={1} alignItems="center" justify="flex-start">
                        <Grid item md={12} xs={12} order={1}>
                            <Typography component="div" align="left" className={classes.typography}>
                                <Box fontWeight="fontWeightBold">
                                    Candidate Info
                                </Box>
                            </Typography>
                        </Grid >   
                        <Grid item md={6} xs={12} >
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Candidate Name"
                                placeholder="Candidate Name"
                                name="name"
                                readOnly
                                //variant="outlined"
                                // inputRef={register}
                                value={candidateDetails.firstName + ' ' + candidateDetails.lastName}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                label="Candidate ID"
                                name="candidateId"
                                readOnly
                                //variant="outlined"
                                // inputRef={register}
                                value={candidateDetails.candidateId}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Phone Number"
                                name="phoneNumber"
                                readOnly
                                //variant="outlined"
                                // inputRef={register}
                                // value={'(' + (candidateDetails.phoneNumber.slice(0,3)) + ') ' + candidateDetails.phoneNumber.slice(3,6) + '-' + candidateDetails.phoneNumber.slice(6,10)} 
                            />
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                //floatingLabelFixed={true}
                                label={"Email"}
                                placeholder="Email"
                                name="email"
                                readOnly
                                // inputRef={register}
                                value={candidateDetails.email}
                            />
                        </Grid>
                        <Grid item md={12} xs={12} >
                            <Typography component="div" align="left" className={classes.typography} >
                                <Box fontWeight="fontWeightBold" paddingTop={2}>
                                    Address Info
                                </Box>
                            </Typography>
                        </Grid >
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Street"
                                name="street"
                                InputLabelProps={{ shrink: true }}
                                //required
                                //variant="outlined"
                                //inputRef={register}
                                value={candidateDetails.street}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="City"
                                name="city"
                                InputLabelProps={{ shrink: true }}
                                //required
                                //variant="outlined"
                                //inputRef={register}
                                value={candidateDetails.city}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Zip Code"
                                name="zipCode"
                                InputLabelProps={{ shrink: true }}
                                //required
                                //variant="outlined"
                                //inputRef={register}
                                value={candidateDetails.zipCode}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="State"
                                name="state"
                                InputLabelProps={{ shrink: true }}
                                //required
                                //variant="outlined"
                                //inputRef={register}
                                value={candidateDetails.state}
                            />
                        </Grid>
                        <Grid item md={12} xs={12} >
                            <Typography component="div" align="left" className={classes.typography} >
                                <Box fontWeight="fontWeightBold" paddingTop={2}>
                                    Educational Details
                                </Box>
                            </Typography>
                        </Grid >

                        <Grid item md={12} xs={12}></Grid>

                        <Grid item md={12} xs={12} >
                            <Typography component="div" align="left" className={classes.typography} >
                                <Box fontWeight="fontWeightBold" paddingTop={2}>
                                    Experience Details
                                </Box>
                            </Typography>
                        </Grid >

                        <Grid item md={12} xs={12}></Grid>

                        <Grid item md={12} xs={12} >
                            <Typography component="div" align="left" className={classes.typography} >
                                <Box fontWeight="fontWeightBold" paddingTop={2}>
                                    Professional Details
                                </Box>
                            </Typography>
                        </Grid >

                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Skill set"
                                name="skillSet"
                                InputLabelProps={{ shrink: true }}
                                //required
                                //variant="outlined"
                                // inputRef={register}
                                //inputRef={register}
                                value={candidateDetails.skillSet}
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="On Call"
                                name="isOnCall"
                                required
                                //variant="outlined"
                                // inputRef={register}
                                value={candidateDetails.isOnCall === true ? 'Yes' : 'No'}
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Work Experience"
                                name="workExperience"
                                InputLabelProps={{ shrink: true }}
                                //required
                                //variant="outlined"
                                // inputRef={register}
                                value={candidateDetails.workExperience}
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Position"
                                name="position"
                                //required
                                //variant="outlined"
                                // inputRef={register}
                                value={candidateDetails.position}
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Type"
                                name="type"
                                //required
                                //variant="outlined"
                                // inputRef={register}
                                value={candidateDetails.type}
                            />
                        </Grid>

                        <Grid item md={12} xs={12}>
                            <Typography component="div" align="left" className={classes.typography} >
                                <Box fontWeight="fontWeightBold" paddingTop={2} paddingBottom={2}>
                                    Applied Jobs
                                </Box>
                            </Typography>
                        </Grid>

                        <Grid item md={12} xs={12}>
                            <Table size="small" className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell >
                                            Job Title
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Job ID
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Applied On
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            City
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Assigned Recruiter
                                        </StyledTableCell >
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {candidateDetails.appliedJobs.map(job => 
                                    (
                                    <TableRow 
                                        hover
                                        key={job.jobId}
                                        // //selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                                        // // button key='job' component={Link} to='/app/job/:jobId'
                                        onClick={()=> handleRowClick(job.jobId)}
                                    >
                                        <TableCell>
                                            {job.jobTitle}
                                        </TableCell>
                                        <TableCell>
                                            {job.jobId}
                                        </TableCell>
                                        <TableCell>
                                            {job.appliedOn}
                                        </TableCell>
                                        <TableCell>
                                            {job.city}
                                        </TableCell>
                                        <TableCell>
                                            {job.assignedRecruiter}
                                        </TableCell>
                                        
                                    </TableRow>
                                    )
                                )}
                                </TableBody>

                            </Table>
                        </Grid>

                        <Grid item md={12} xs={12}>
                            <Typography component="div" align="left" className={classes.typography} >
                                <Box fontWeight="fontWeightBold" paddingTop={2} paddingBottom={2}>
                                    Notes
                                </Box>
                            </Typography>
                        </Grid>

                        <Grid item md={12} xs={12}>
                            <Table size="small" className={classes.table}>
                                <TableHead >
                                    <TableRow >
                                        <StyledTableCell >
                                            Recruiter
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Recruiter ID
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Created On
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Interview
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Job Interviewed
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Note
                                        </StyledTableCell >
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {/* {candidateDetails.notes.map(note => 
                                    (
                                    <TableRow 
                                        hover
                                        key={note.createdOn}
                                        // //selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                                        // // button key='job' component={Link} to='/app/job/:jobId'
                                        // onClick={()=> handleRowClick(candidate.candidateId)}
                                    >
                                        <TableCell>
                                            {note.recruiter}
                                        </TableCell>
                                        <TableCell>
                                            {note.recruiterId}
                                        </TableCell>
                                        <TableCell>
                                            {moment(note.createdOn).format('MM-DD-YYYY') }
                                        </TableCell>
                                        <TableCell>
                                            {note.interview === true ? 'Yes' : 'No'}
                                        </TableCell>
                                        <TableCell>
                                            {note.interviewedJob}
                                        </TableCell>
                                        <TableCell>
                                            {note.notes}
                                        </TableCell>
                                        
                                    </TableRow>
                                    )
                                )} */}
                                </TableBody>
                            </Table>
                        </Grid>

                        <Grid item md={12} xs={12}></Grid >

                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Updated By"
                                name="updatedBy"
                                InputLabelProps={{ shrink: true }}
                                //required
                                //variant="outlined"
                                // inputRef={register}
                                //inputRef={register}
                                value={candidateDetails.updatedBy}
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Rating"
                                name="rating"
                                type="number"
                                id="rating"
                                InputLabelProps={{ shrink: true }}
                                //variant="outlined"
                                defaultValue={candidateDetails.rating}
                                //inputRef={register}
                                
                                value={candidateDetails.rating}
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Hired"
                                name="isHired"
                                required
                                //variant="outlined"
                                // inputRef={register}
                                value={candidateDetails.isHired === true ? 'Yes' : 'No'}
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Status"
                                name="isHired"
                                required
                                //variant="outlined"
                                // inputRef={register}
                                value={candidateDetails.isHired === true ? 'Yes' : 'No'}
                            />
                        </Grid>

                        <Grid item md={12} xs={12}></Grid >
                        <Grid item md={12} xs={12}></Grid >
                    </Grid>

                    <Dialog open={openSMSDialog} onClose={openSMSDialog} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">SMS</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <p>Please enter the message you want to send to this contact.</p>
                                <p>SMS sent from here will not be saved into candidate sms history, to save sms record add this candidate into contact then send sms.</p>
                            </DialogContentText>
                            <TextField
                                autoFocus
                                onChange={handleSMSMessageChange}
                                margin="dense"
                                id="message"
                                label="Message Body"
                                //type="mes"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDialogClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleDialogClose, onSendSMS} color="primary">
                                Send
                            </Button>
                        </DialogActions>
                    </Dialog> 

                </CardContent>
            </Card>

        </Container>
    )
}
