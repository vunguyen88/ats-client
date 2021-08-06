import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import NavBar from '../../components/NavBar';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TopBar from '../../components/TopBar';
import { Row, Item } from '@mui-treasury/components/flex';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Grid } from '@material-ui/core';
import MenuBar from './components/MenuBar';
import PersonalItem from './components/PersonalItem';
import { sortMessage } from '../../utils/Utils';
import CustomizedInputBase from './components/CustomInput';
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';
import {
    EmailSubscribe,
    EmailTextInput,
    SubmitButton,
} from '@mui-treasury/components/EmailSubscribe';
import CircularProgress from '@material-ui/core/CircularProgress';

// import UtilityBar from './components/UtilityBar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex', 
        backgroundColor: '#f0f0f5',
        height: '100vh'
    },
    wrapper: {
        flexDirection: 'column', 
        width: '100%',
        flexGrow: 1,
    },
}))

export default function NotificationPage() {
    const classes = useStyles();
    const [senderList, setSenderList] = useState();
    const [senderMessages, setSenderMessages] = useState();
    const [currentSender, setCurrentSender] = useState();
    const [formData, setFormData] = useState({}); 
    const [sending, setSending] = React.useState(false)

    useEffect(() => {
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.get('https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/users/currentuser/messages', config)
        //axios.get(`http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/users/currentuser/messages`, config)
        .then(res => {
            console.log('data res ', typeof(res.data))
            setSenderList(res.data.sender);
            setSenderMessages(res.data.senderMessages)
            //res.data.jobId = id;
            //console.log('data get in timeoff', res.data);
            //setLoading(false);
            //setUserDetails({...res.data});
            //let messages = sortMessage(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const handleSenderClick = (senderId) => {
        setCurrentSender(senderId);
    }

    const displaySenderMessage = (senderId) => {
        if (senderMessages[`${senderId}`]) {
            console.log('AVATAR ', currentSender.avatarUrl)
            let displayMessage = []
            senderMessages[`${senderId}`].messages.forEach(message => displayMessage.push(message.body));
            return (
                <ChatMsg
                    avatar={senderMessages[`${senderId}`].avatarUrl}
                    messages={displayMessage}
                />
                // senderMessages[`${senderId}`].messages.map(message => {
                //     return <p>{message.body}</p>
                // })
            )
        } else {
            return null
        }
    }

    const onSubmitMessage = (messageBody) => {
        //console.log('message body ', messageBody);
        let token = localStorage.getItem('token');
        const body = {
            body: messageBody,
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`https://us-east1-applicant-tracking-syste-74466.cloudfunctions.net/api/users/${currentSender}/messages`, body, config)
        //axios.post(`http://localhost:5000/applicant-tracking-syste-74466/us-east1/api/users/${currentSender}/messages`, body, config)
            .then(res => {
                console.log('MESSAGE SENT SUCCESS');
                // setSuccessCode(true);
                // setOpenSnackbar(true);
                // handleCloseMessageDialog();
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                // setErrorCode(err.response.status);
                // setOpenSnackbar(true);
            })
    }
    console.log('CUrent sentDEr ', currentSender)

    return (
        <div className={classes.root}>
            <NavBar style={{display: 'block'}}/>
            <div className={classes.wrapper}>
                <TopBar />
                <MenuBar />
                <Grid container>
                    <Grid item md={4} align='left'>
                        <Box m={1} width='100%' height='86vh' borderRadius={16} style={{backgroundColor:'#d9d9d9'}}>
                            {/* {messages ? messages.map(sender => <p>{sender[0].senderName}</p>) : null} */}
                            {senderList ? senderList.map(sender => {
                                return <PersonalItem senderId={sender.senderId} senderName={sender.senderName} body={sender.body} createdOn={moment(sender.createdOn).format('MM/DD/YYYY')} avatarUrl={sender.avatarUrl} unreadCount={sender.unreadCount} handleSenderClick={handleSenderClick}/>
                            }) : null}
                        </Box>
                    </Grid>
                    <Grid item md={8}>
                        <Box width='100%' height='100%' style={{backgroundColor:''}} position='relative'>
                            <Box minHeight='56vh' m={3}>
                                {currentSender ? displaySenderMessage(currentSender) : null}
                            </Box>   
                            {/* <Box m={3} position='absolute' bottom='5px' width='95%'>
                                <EmailSubscribe >
                                    <EmailTextInput />
                                    <SubmitButton disabled={sending}>
                                        {sending ? <CircularProgress /> : 'Send'}
                                    </SubmitButton>
                                </EmailSubscribe>
                            </Box> */}
                            <Box m={3} position='absolute' bottom='10px' width='95%'>
                                <CustomizedInputBase onSubmitMessage={onSubmitMessage} />
                            </Box>
                            {/* <Box m={3}>
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data="<p>Job description goes here!"
                                    onReady={ editor => {
                                        editor.editing.view.change((writer) => {
                                            writer.setStyle(
                                                "height",
                                                "150px",
                                                editor.editing.view.document.getRoot()
                                            );
                                        });
                                    } }
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        //setEditor(data);
                                        setFormData({...formData, jobDescription: data})
                                        console.log( { event, editor, data } );
                                    } }
                                    onBlur={ ( event, editor ) => {
                                        console.log( 'Blur.', editor );
                                    } }
                                    onFocus={ ( event, editor ) => {
                                        console.log( 'Focus.', editor );
                                    } }
                                />
                            </Box> */}
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
