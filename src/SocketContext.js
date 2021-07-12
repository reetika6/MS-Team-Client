import React, {createContext, useState, useRef, useEffect} from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('https://msteamsserver.herokuapp.com/');
// const socket = io('http://localhost:5000/');

const ContextProvider = ({children}) =>{
    const [stream,setStream] = useState(null);
    const [I,setMe]= useState('');
    const [call,setCall] = useState({});
    const [callAccepted,setCallAccepted] = useState(false);
    const [callEnded, setCallEnded]= useState(false);
    const [name, setName]=useState('');
    const [messages, setMessages]=useState([]);

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    //get audio video stream and sets it as myVideo
    const startVideoStream = async () => {
        const currentStream = await navigator.mediaDevices.getUserMedia({ video:true, audio:true})
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
    };
    
    //Adds messages to existing meetingid or adds a new meeting id and its corresponding messagelists 
    useEffect(() => {
        socket.on('I',(id) => setMe(id));
        socket.on('recieved_message', (data)=> {
            let isHistoryAvailable = false;
            const messagelist = [...messages];
            const { receiver, senderId, senderName, message } = data;
            for(let i=0;i< messagelist.length;i++){
                if(receiver === messagelist[i].receiver){
                    const texts = [...messagelist[i].texts];
                    texts.push({ senderId, senderName, message });
                    messagelist[i].texts = texts;
                    isHistoryAvailable=true;
                }
            }
            if (!isHistoryAvailable) {
                messagelist.push({ receiver, texts: [{ senderId, senderName, message }]});
            }
            setMessages(messagelist);
        });

        socket.on('calluser',( {from,name:callerName, signal}) =>{
            setCall({ isReceivedCall:true, from, name: callerName,signal})
        });
    }, []);

    //Accepts the incoming call and connects the users
    const answerCall =() => {
        setCallAccepted(true);

        const peer = new Peer({ initiator : false,trickle:false, stream});

         peer.on('signal',(data)=>{
             socket.emit('answercall',{signal:data,to:call.from});
         });

         peer.on('stream',(currentStream)=>{
             userVideo.current.srcObject= currentStream;
         });

         peer.signal(call.signal);

         connectionRef.current = peer;

    }

    const sendMessage = (receiver,message,isGroupChat) =>{
        let messageContent ={
            receiver,
            senderId: I,
            senderName: name,
            message,
            isGroupChat,
        };
            socket.emit('Message', messageContent);
    }

    // Initiates the call to the desired id
    const callUser =(id) => {
        const peer = new Peer({ initiator : true,trickle:false, stream});

        peer.on('signal',(data)=>{
            socket.emit('calluser',{ userToCall: id, signalData: data, from:I, name});
        });

        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObject= currentStream;
        });

        socket.on('callaccepted',(signal)=>{
            setCallAccepted(true);

            peer.signal(signal);
        });
        connectionRef.current = peer;


    }

    //ends the call
    const leaveCall =() =>{
        setCallEnded(true);
        connectionRef.current.destroy();

        window.location.reload();

    }


    const toggleAudioVideo = (isVideoOn, isAudioOn) => {
            stream.getTracks().forEach(track => {
                if (track.readyState === 'live' && track.kind === 'video') {
                    track.enabled=isVideoOn;
                }
                if (track.readyState === 'live' && track.kind === 'audio') {
                    track.enabled=isAudioOn;
                }
            });
    };
    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            I,
            callUser,
            leaveCall,
            answerCall,
            toggleAudioVideo,
            sendMessage,
            messages,
            startVideoStream
        }}>
            {children}
        </SocketContext.Provider>
    );
}

export { ContextProvider, SocketContext};
