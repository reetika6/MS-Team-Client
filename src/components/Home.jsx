import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState('');
  const { setName } = useContext(SocketContext);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const goToNewMeeting = async () => {
    if (!value || !value.trim()) {
      alert('Please enter name');
      return;
    }
    setName(value);
    const url = `meeting/${uuidv4()}`;
    await navigator.clipboard.writeText(`${window.location.href}${url}`);
    alert('Link for the meeting copied to clipboard');
    history.push(url);
  };

  return (
    <Grid container
      component={Paper}
    >
      <form className={classes.root} noValidate autoComplete="off">
        <TextField required id="username" label="Enter your name" value={value} onChange={onChange} />
        <Button variant="outlined" color="primary" onClick={goToNewMeeting}>Create an instant meeting</Button>
        {/*<Button variant="outlined" color="secondary" onClick={goToVideoCall}>Call a friend</Button>*/}
      </form>
    </Grid>
  );
}
