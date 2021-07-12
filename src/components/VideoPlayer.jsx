import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Videocam, VideocamOff, Mic, MicOff } from '@material-ui/icons';
import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
    video: {
      width: '250px',
      [theme.breakpoints.down('xs')]: {
        width: '200px',
      },
    },
    gridContainer: {
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    paper: {
      padding: '5px',
      border: '2px solid black',
      margin: '5px',
    },
  }));


const VideoPlayer =() =>{
  const [isVideoOn, setVideoStatus] = useState(true);
  const [isAudioOn, setAudioStatus] = useState(true);
  const history = useHistory();
  const {
    name,
    setName,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    toggleAudioVideo,
    startVideoStream
  } = useContext(SocketContext);

  useEffect(() => {
    if (!name) {
      const getName = prompt('Please enter your name');
      if (!getName) {
        alert('You cannot enter without a name');
        history.push('/');
      } else {
        setName(getName);
        startVideoStream();
      }
    } else {
      startVideoStream();
    }
  }, []);

  const classes = useStyles();
  const toggleVideoStatus = () => {
    toggleAudioVideo(!isVideoOn, isAudioOn);
    setVideoStatus(!isVideoOn);
  };
  const toggleAudioStatus = () => {
    toggleAudioVideo(isVideoOn, !isAudioOn);
    setAudioStatus(!isAudioOn);
  };

  return(
    <Grid container className={classes.gridContainer}>
        {/*Own video*/}
        {stream && (
            <Paper className={classes.paper}>
                <Grid item xs={12} md={6}>
                    <Typography varient='h5' gutterBottom>{name || 'Name'}</Typography>
                    <video playsInline muted ref={myVideo} autoPlay className={classes.video}/>
                </Grid>
                    <Button color='fixed' onClick={toggleVideoStatus}>
                          {isVideoOn ? <Videocam/> : <VideocamOff/>}
                    </Button>
                    <Button onClick={toggleAudioStatus}>
                          {isAudioOn ? <Mic/> : <MicOff/>}
                    </Button>
            </Paper>
        )}
        {/*other user's video*/}
        {callAccepted && !callEnded && (
            <Paper className={classes.paper}>
              <Grid item xs={12} md={6}>
                <Typography varient='h5' gutterBottom>{call.name || 'Name'}</Typography>
                <video playsInline ref={userVideo} autoPlay className={classes.video} />
              </Grid>
            </Paper>
        )}
    </Grid>
  );
};

export default VideoPlayer