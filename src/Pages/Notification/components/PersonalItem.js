import React, { useState, useEffect } from 'react';
import cx from 'clsx';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoTitle, InfoSubtitle, InfoCaption } from '@mui-treasury/components/info';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Grid, Avatar, Button, Chip } from '@material-ui/core';
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic';
import { useTrendInfoStyles } from '@mui-treasury/styles/info/trend';
import { useChatzInfoStyles } from '@mui-treasury/styles/info/chatz';



// import UtilityBar from './components/UtilityBar';

const usePersonStyles = makeStyles(() => ({
    text: {
      fontFamily: 'Barlow, san-serif',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    name: {
      fontWeight: 600,
      fontSize: '1rem',
      color: '#122740',
      marginBottom: 5
    },
    caption: {
      fontSize: '0.875rem',
      color: '#758392',
      //marginTop: 5,
    },
    btn: {
      borderRadius: 20,
      padding: '0.125rem 0.75rem',
      borderColor: '#becddc',
      fontSize: '0.75rem',
    },
}));

export default function PersonalItem({ senderId, senderName, body, createdOn, avatarUrl, unreadCount, handleSenderClick }) {
    const avatarStyles2 = useDynamicAvatarStyles({ size: 56 });
    const styles = usePersonStyles();
    const [messages, setMessages] = useState();


    return (
        <Column gap={2}>
        {/* <Row alignItems={'center'}>
          <Item position={'middle'}>
            <div className={avatarStyles2.root}>
              <Avatar src={'https://avatarfiles.alphacoders.com/816/81602.jpg'} />
            </div>
          </Item>
          <Info useStyles={useChatzInfoStyles}>
            <InfoTitle>Phawta Tuntayakul</InfoTitle>
            <InfoSubtitle>Great, I'll join you tomorrow...</InfoSubtitle>
            <InfoCaption>10 m</InfoCaption>
          </Info>
          <Item minWidth={48} textAlign={'right'}>
            <Chip color={'secondary'} label={2} size={'small'} />
          </Item>
        </Row> */}
            <Row mt={0} alignItems={'center'}>
                <Item position={'middle'}>
                    <Avatar
                        classes={avatarStyles2}
                        src={avatarUrl}
                    />
                </Item>
                <Info useStyles={useChatzInfoStyles} minWidth='65%' onClick={() => handleSenderClick(senderId)}>
                    <InfoTitle>{senderName}</InfoTitle>
                    <InfoSubtitle>{body}</InfoSubtitle>
                    <InfoCaption>{createdOn}</InfoCaption>
                </Info>
                <Item minWidth={48} textAlign={'right'}>
                    <Chip color={'secondary'} label={unreadCount} size={'small'} style={{}}/>
                </Item>
            </Row>
        </Column>
    )
}
