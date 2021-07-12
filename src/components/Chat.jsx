import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { SocketContext } from '../SocketContext';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '0.5px solid #e0e0e0'
  },
  messageArea: {
    height: '60vh',
    overflowY: 'auto'
  }
});


const Chat = ({
  id,
  messages
}) => {
  const classes = useStyles();
  const { sendMessage } = useContext(SocketContext);
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const sendAndClear = (id, value, isGroupMessage) => {
    sendMessage(id, value, isGroupMessage);
    setValue('');
  };

  useEffect(()=> {
    var objDiv = document.getElementById('history');
    objDiv.scrollTop = objDiv.scrollHeight;
  });

  return (
      <div>
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
        </Grid>
        <Grid container
            component={Paper}
            className={classes.chatSection}
            id="chats"
        >
            <Grid item xs={24}>
                <List className={classes.messageArea} id="history">
                    { messages && messages.map(({ senderName, message }, index) => (
                        <ListItem key={index}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="right" primary={message}></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary={senderName}></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    )) }
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" value={value} onChange={onChange} onKeyPress={(e) =>{ 
                          if(e.key=='Enter'){
                            sendAndClear(id, value, true)
                          }
                        }} label="Type Something" fullWidth />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add" onClick={() => sendAndClear(id, value, true)}><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}

export default Chat;