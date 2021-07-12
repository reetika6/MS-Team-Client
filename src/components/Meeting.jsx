import React, { useEffect, useContext, useState } from 'react';
import { useParams } from "react-router";
import { Typography, AppBar, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideoPlayer from '../components/VideoPlayer';
import Notifications from '../components/Notifications';
import Options from '../components/Options';
import Chat from '../components/Chat';
import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },

  gridContainer: {
    flexDirection: 'row'
  },

  paperLeft: {
    flex: 4,
    height: '100%',
    margin: 10,
    textAlign: 'center',
    padding: 10
  },

  paperRight: {
    height: 400,
    flex: 1,
    margin: 10,
    textAlign: 'center',

  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },

}));

const Meeting = () => {
  const [history, setHistory] = useState([]);
  const { I, messages } = useContext(SocketContext);
  const classes = useStyles();
  let { id } = useParams();
  useEffect(() => {
    if (I) {
      fetch(`https://msteamsserver.herokuapp.com/history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ meetingId: id, user: I })
      })
      .then(res => res.json())
      .then((result) => {
        console.log(result, '=============');
        setHistory(result.texts || []);
      },
      (error) => {
        console.log(error);
      });
    }
  }, [I]);

  useEffect(() => {
    if (messages && messages.length) {
      const currentGroupMessages = messages.find(obj => obj.receiver === id);
      if (currentGroupMessages) {
        const newMessages = currentGroupMessages.texts || [];
        setHistory([...history, ...newMessages]);
      }
    }
  }, [messages]);
  
  return(
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant='h2' align='center'>MS Teams Video Chat</Typography>
      </AppBar>
      <Grid container className={classes.gridContainer} >
       <Paper className={classes.paperLeft}>
        <Grid>
      <VideoPlayer />
      <Options >
        <Notifications />
      </Options>
      </Grid>
      </Paper>
      <Paper className={classes.paperRight}>
       <Grid><Chat id={id} messages={history} /></Grid>
      </Paper>
    </Grid>
    {/*Options-> Notifications */}
      
    </div>
  );
}

export default Meeting;
