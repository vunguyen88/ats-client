import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import EditIcon from '@material-ui/icons/Edit';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import WorkIcon from '@material-ui/icons/Work';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Alert, AlertTitle } from '@material-ui/lab';
import TextsmsIcon from '@material-ui/icons/Textsms';
import { useHistory } from "react-router-dom";
import {useForm, Controller} from 'react-hook-form';
import FileIcon from '../../../../icons/fileIcon.png';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {
    Avatar,
    Box,
    Badge,
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

const StyledButton = withStyles({
    root: {
      //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      //color: 'white',
      height: 48,
      padding: '0 30px',
      //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
      textTransform: 'capitalize',
    },
})(Button);

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
        marginLeft: '2rem',
        display: 'block'
    },
    nameContainer: {
        marginTop: '0.5rem'
    },
    media: {
        margin: 'auto',
        width: 80,
        height: 80
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

export default function JobDetail({ jobDetails }) {
    console.log('JOB DETAILS PROPS ', jobDetails);

    const [openSMSDialog, setOpenSMSDialog] = useState(false);
    const [smsMessage, setSmsMessage] = useState("");
    const history = useHistory();
    const classes = useStyles();
    const [successCode, setSuccessCode] = useState(false);
    const [errorCode, setErrorCode] = useState();
    const [open, setOpen] = useState(false);

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

    const handleNameClick = (candidateId) => {
        console.log('candidateId', candidateId)
        history.push(`/app/candidates/${candidateId}`);
    }

    const handleAddFile = (event) => {
        let formData = new FormData(); 
        // formData.append('firstName', userProfile.firstName);  
        // formData.append('lastName', userProfile.lastName);
        // formData.append('userId', userProfile.userId);
        formData.append('logo', event.target.files[0]);
        console.log('ADD FILE')
        let token = localStorage.getItem('token');
        const config = {     
            headers: { 
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${token}` 
            }
        }
        axios.put(`https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/jobs/${jobDetails.jobId}/logo`, formData, config,
        //axios.put(`http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/jobs/${jobDetails.jobId}/logo`, formData, config
        )
            .then(res => {
                console.log('update success')
                setSuccessCode(true);
                setOpen(true);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                setErrorCode(err.response.status);
                setOpen(true);
            })
        //setState({...state, fileUpload: event.target.files[0]})
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    
    return (
        <Container maxWidth={false}>
            <Box display="flex">
                <Box display="flex" width="100%" className={classes.titleBox}>
                    <div className={classes.left}>
                        {/* <CardMedia className={classes.media}><Avatar className={classes.purple, classes.media} src={jobDetails.logoUrl}><WorkIcon fontSize="large"/></Avatar></CardMedia> */}
                        {/* <CardMedia className={classes.media}>{jobDetails.logoUrl ? (<Avatar className={classes.purple, classes.media} src={jobDetails.logoUrl}></Avatar>) : <Avatar className={classes.purple, classes.media} src={jobDetails.logoUrl}><WorkIcon fontSize="large"/></Avatar>}</CardMedia> */}
                        <CardMedia className={classes.media}>{
                            jobDetails.logoUrl 
                                ?   (<Avatar variant='square' className={classes.purple, classes.media} src={jobDetails.logoUrl}></Avatar>) 
                                :   (<Badge
                                        overlap="circle"
                                        anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                        }}
                                        badgeContent={
                                            <label htmlFor="fileUpload">
                                                <input 
                                                    accept="image/*" 
                                                    id="fileUpload" 
                                                    multiple 
                                                    type="file" 
                                                    style={{display: 'none'}} 
                                                    onChange={handleAddFile}
                                                />
                                                <Button component="span" style={{position: 'fixed', left:'-15px', top:'5px'}} >
                                                    <CameraAltIcon style={{color: '#2b506e'}}/>
                                                </Button>
                                            </label>
                                        }
                                        // onClick={() => console.log('click badge')}
                                    >
                                        {/* <Avatar src={jobDetails.logoUrl} className={classes.avatar} /> */}

                                    </Badge>)}
                            </CardMedia>

                    </div>
                    <div className={classes.right}>
                        <Typography variant="h4" fontWeight="bold" align="left">{jobDetails.jobTitle}</Typography>
                        <Typography align="left">{jobDetails.jobStatus}</Typography>
                    </div>
                </Box>
                <Box flexShrink={1} p={3} mr={3}>
                    <Link to={{pathname:`/app/jobs/${jobDetails.jobId}/edit`, state: {details: jobDetails}}}>
                        <EditIcon fontSize="large" style={{ color: '#2b506e', paddingTop: '15px', paddingRight: '10px' }}></EditIcon>
                    </Link>
                </Box>
            </Box>

            <Card>
                <CardContent className={classes.cardContent}>
                    <Box width={1}>
                        <Table size="small" className={classes.table}>
                            <TableHead>
                                <TableRow className={classes.tableRow}>
                                    <StyledTableCell  className={classes.tableCellHead} >
                                        Applied
                                    </StyledTableCell >
                                    <StyledTableCell  className={classes.tableCellHead} >
                                        Contacted
                                    </StyledTableCell  >
                                    <StyledTableCell  className={classes.tableCellHead}>
                                        Hired
                                    </StyledTableCell >
                                    <StyledTableCell  Cell className={classes.tableCellHead}>
                                        Needed
                                    </StyledTableCell >
                                </TableRow>  
                            </TableHead>
                            <TableBody>
                                <TableRow >
                                    <TableCell className={classes.summaryTableCell}>
                                        {jobDetails.appliedCandidates.length}
                                    </TableCell>
                                    <TableCell className={classes.summaryTableCell}>
                                        {/* {jobDetails.interviewedCandidates.length} */}interview candidate
                                    </TableCell>
                                    <TableCell className={classes.summaryTableCell}>
                                        {jobDetails.numberOfHired ? jobDetails.numberOfHired : 0} 
                                    </TableCell>
                                    <TableCell className={classes.summaryTableCell}>
                                        {jobDetails.numberOfPositions}
                                    </TableCell>
                                </TableRow>
                            </TableBody>  
                        </Table>
                    </Box>
                    <Grid container spacing={2} alignItems="center" justify="flex-start"> 
                        <Grid item md={12} xs={12} >
                            <Typography component="div" align="left" className={classes.typography} >
                                <Box fontWeight="fontWeightBold">
                                    Job Opening Information
                                </Box>
                            </Typography>
                        </Grid >
                        <Grid item md={6} xs={12} >
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Job Title"
                                placeholder="Job Title"
                                name="jobTitle"
                                required
                                //variant="outlined"
                                // inputRef={register}
                                value={jobDetails.jobTitle}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Job ID"
                                name="jobId"
                                required
                                //variant="outlined"
                                // inputRef={register}
                                value={jobDetails.jobId}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Job Status"
                                name="jobStatus"
                                //variant="outlined"
                                // inputRef={register}
                                value={jobDetails.jobStatus}
                            >
                            </TextField>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Modified By"
                                name="modifiedBy"
                                required
                                //variant="outlined"
                                // inputRef={register}
                                value={jobDetails.modifiedBy}
                            />
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                //floatingLabelFixed={true}
                                label={"Priority"}
                                placeholder="Priority"
                                name="priority"
                                required
                                
                                // inputRef={register}
                                value={jobDetails.priority}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Salary"
                                name="salary"
                                required
                                //variant="outlined"
                                // inputRef={register}
                                value={jobDetails.salary}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Skill set"
                                name="skillset"
                                required
                                //variant="outlined"
                                // inputRef={register}
                                value={jobDetails.skillset}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="State"
                                name="state"
                                required
                                //variant="outlined"
                                // inputRef={register}
                                value={jobDetails.state}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Target Date"
                                name="targetDate"
                                required
                                //variant="outlined"
                                // inputRef={register}
                                value={moment(jobDetails.targetDate).format('MM-DD-YYYY')}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Work Experience"
                                name="workExperience"
                                required
                                //variant="outlined"
                                // inputRef={register}
                                value={jobDetails.workExperience}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Zip Code"
                                name="zipCode"
                                required
                                //variant="outlined"
                                // inputRef={register}
                                value={jobDetails.zipCode}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Client Name"
                                name="clientName"
                                required
                                //variant="outlined"
                                // inputRef={register}
                                value={jobDetails.clientName}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Assigned Recruiter"
                                name="assignedRecruiter"
                                required
                                //variant="outlined"
                                // inputRef={register}
                                value={jobDetails.assignedRecruiter}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="City"
                                name="city"
                                required
                                //variant="outlined"
                                // inputRef={register}
                                value={jobDetails.city}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Created By"
                                name="createdBy"
                                required
                                //variant="outlined"
                                // inputRef={register}
                                value={jobDetails.createdBy}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Created On"
                                name="createdOn"
                                required
                                //variant="outlined"
                                // inputRef={register}
                                value={moment(jobDetails.createdOn).format('MM-DD-YYYY')}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Employment Type"
                                name="employmentType"
                                required
                                //variant="outlined"
                                // inputRef={register}
                                value={jobDetails.employmentType}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                className={classes.textFieldWidth}
                                fullWidth
                                label="Industry"
                                name="industry"
                                required
                                //variant="outlined"
                                // inputRef={register}
                                value={jobDetails.industry}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Typography component="div" align="left" className={classes.typography} >
                                <Box fontWeight="fontWeightBold">
                                    Applied Candidates
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Table size="small" className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell >
                                            Name
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            ID
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Applied On
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Phone Number
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Email
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Resume
                                        </StyledTableCell >
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {jobDetails.appliedCandidates.map(candidate => 
                                    (
                                    <TableRow
                                        hover
                                        key={candidate.candidateId}
                                        //selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                                        // button key='job' component={Link} to='/app/job/:jobId'
                                        //onClick={()=> handleRowClick(candidate.candidateId)}
                                    >
                                        <TableCell className={classes.tableCellData} > 
                                            <StyledButton onClick={()=> handleNameClick(candidate.candidateId)}>{candidate.candidateName}</StyledButton>
                                        </TableCell>
                                        <TableCell className={classes.tableCellData}>
                                            {candidate.candidateId}
                                        </TableCell >
                                        <TableCell className={classes.tableCellData}>
                                            {new Date(candidate.appliedOn).toLocaleDateString('en-US')}
                                        </TableCell>
                                        <TableCell className={classes.tableCellData}>
                                            {/* ({candidate.phoneNumber.slice(0,3)}) {candidate.phoneNumber.slice(3,6)}-{candidate.phoneNumber.slice(6,10)} */} N/A
                                        </TableCell>
                                        <TableCell className={classes.tableCellData}>
                                            {candidate.email}
                                        </TableCell>
                                        <TableCell className={classes.tableCellData}>
                                            <IconButton color="primary" aria-label="Download" href={candidate.resume}>
                                                <GetAppIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    )
                                )}
                                </TableBody>

                            </Table>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Typography component="div" align="left" className={classes.typography} >
                                <Box fontWeight="fontWeightBold">
                                    Interviewed Candidates
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Table size="small" className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell >
                                            Name
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Interview On
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Interview By
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Rating
                                        </StyledTableCell >
                                        <StyledTableCell >
                                            Note
                                        </StyledTableCell >
                                    </TableRow>
                                </TableHead>
                                {/* <TableBody>
                                {jobDetails.interviewedCandidates.map(candidate => 
                                    (
                                    <TableRow key={candidate.interviewedOn}>
                                        <TableCell>
                                            {candidate.candidateName}
                                        </TableCell>
                                        <TableCell>
                                            {moment(candidate.interviewedOn).format('YYYY-MM-DD')}
                                        </TableCell>
                                        <TableCell>
                                            {candidate.interviewedBy}
                                        </TableCell>
                                        <TableCell>
                                            {candidate.rating}
                                        </TableCell>
                                        <TableCell>
                                            {candidate.notes}
                                        </TableCell>
                                    </TableRow>
                                    )
                                )}
                                </TableBody> */}

                            </Table>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Typography component="div" align="left" className={classes.typography} >
                                <Box fontWeight="fontWeightBold">
                                    Job Description
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item md={12} xs={12} >
                            <Box pl={7} pr={4}> 
                                <CKEditor
                                    editor={ ClassicEditor }
                                    // data= { (event, editor) => {
                                    //     console.log('data is ', jobDetails.jobDescription)
                                    // }}
                                    onReady={ editor => {
                                        editor.editing.view.change((writer) => {
                                            writer.setStyle(
                                                "height",
                                                "450px",
                                                editor.editing.view.document.getRoot()
                                            );
                                        });
                                        //editor.data = jobDetails.jobDescription
                                    } }
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        //setEditor(data);
                                        //setFormData({...formData, jobDescription: data})
                                        console.log( { event, editor, data } );
                                    } }
                                    onBlur={ ( event, editor ) => {
                                        console.log( 'Blur.', editor );
                                    } }
                                    onFocus={ ( event, editor ) => {
                                        console.log( 'Focus.', editor );
                                    } }
                                    data={jobDetails.jobDescription}

                                />
                            </Box>
                        </Grid>

                    </Grid>

                </CardContent>
            </Card>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                {(() => {
                    if (successCode === true) {
                        return <Alert onClose={handleClose} severity="success">Update success </Alert>
                        // return <Alert onClose={handleClose} severity="success">New job added! Click <Link to={{pathname:'/app/sendgrid', state:{data: newJobResponseData}}}>here </Link> to go to notification page.</Alert>
                    } else if (errorCode === 403) {
                        return <Alert onClose={handleClose} severity="error">Authentication expired! Please click <Link to='/' >here</Link> to go back to Login</Alert>
                    } else {
                        return <Alert onClose={handleClose} severity="error">Update fail!</Alert>
                    }
                })()}
            </Snackbar>
        </Container>
    )
}
