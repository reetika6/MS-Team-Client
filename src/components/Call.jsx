// import React from 'react';
// // import { useHistory } from 'react-router-dom';
// import { Typography, AppBar } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import VideoPlayer from './VideoPlayer';
// import Notifications from './Notifications';
// import Options from './Options';
// // import { v4 as uuidv4 } from "uuid";
// // import { SocketContext } from '../SocketContext';

// const useStyles = makeStyles((theme) => ({
//   appBar: {
//     borderRadius: 15,
//     margin: '30px 100px',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '600px',
//     border: '2px solid black',

//     [theme.breakpoints.down('xs')]: {
//       width: '90%',
//     },
//   },
//   wrapper: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     width: '100%',
//   },

// }));



// const Call = () => {
//   const classes = useStyles();
//   // const { startVideoStream } = useContext(SocketContext);

//   // useEffect(() => {
//   //   startVideoStream();
//   // }, []);
//   // const history = useHistory();
//   // const goToNewMeeting = async () => {
//   //   const url = `meeting/${uuidv4()}`;
//   //   await navigator.clipboard.writeText(`${window.location.href}${url}`);
//   //   history.push(url);
//   // };
//   return(
//     <div className={classes.wrapper}>
//       <AppBar className={classes.appBar} position="static" color="inherit">
//         <Typography variant='h2' align='center'>MS Teams Video Chat</Typography>
//       </AppBar>
//       {/* <Button onClick={goToNewMeeting}>Create a meeting
//       </Button> */}
//       <VideoPlayer />
//       <Options>
//         <Notifications />
//       </Options>
//     {/*Options-> Notifications */}
      
//     </div>
//   );
// }

// export default Call;