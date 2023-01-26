import { Box, CircularProgress, FormControl, IconButton, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {getSender, getSenderFull} from '../config/ChatLogics'
import ProfileModal from './Miscellaneous/ProfileModal'
import UpdateGroupChatModel from "./Miscellaneous/UpdateGroupChatModel";
import { height } from "@mui/system";
import axios from "axios";
import { SnackbarContext } from "../Context/snackbarProvider";
import useStyles from "./style";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import Lottie from 'react-lottie'
import animationData from '../animations/typing.json'

//const ENDPOINT = "http://localhost:5000";
const ENDPOINT = "https://chat-dskr2pgg7-dimplegore.vercel.app/";
var socket, selectedChatCompare;

const SingleChat = ({fetchAgain, setFetchAgain}) => {

    const {user, selectedChat, setSelectedChat, notification, setNotification} = ChatState();
    const {setSnackbar, snackbar} = useContext(SnackbarContext);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("")
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const classes = useStyles();

    const defaultOptions = {
      animationData : animationData
    }

    useEffect(() => {
      //console.log(user);
      socket = io(ENDPOINT);
      socket.emit("setup", user);
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
    },[])

    const fetchMessages = async() => {
       if(!selectedChat) return;

       try{

        const config = {
          "Content-type":"application/json",
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        };

        setLoading(true);

        const {data} = await axios.get(
          `/api/message/${selectedChat._id}`,
          config
        )

        setMessages(data);
        setLoading(false);
        socket.emit("join chat", selectedChat._id);
       }catch(error){
        setSnackbar({isOpen: true, message: "Error Occured!"});
        setLoading(false);
       }
    }

    const sendMessage = async(e) => {
       if(e.key === "Enter" && newMessage){
        socket.emit("stop typing", selectedChat._id);
         try{
          const config = {
            "Content-type":"application/json",
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          };
          setNewMessage("");
          const {data} = await axios.post("/api/message",{
            content: newMessage,
            chatId: selectedChat._id
          },config);

          socket.emit("new message", data);
          setMessages([...messages,data])
         }catch(error){
            setSnackbar({isOpen: true, message: "Error Occured!"})
         }
       }
           
    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if(!socketConnected) return;

        if(!typing){
          setTyping(true);
          socket.emit("typing", selectedChat._id);
        }

        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;

        setTimeout(() => {
           var timeNow = new Date().getTime();
           var timeDiff = timeNow-lastTypingTime;

          if(timeDiff >= timerLength && typing){
            socket.emit("stop typing", selectedChat._id);
            setTyping(false);
          }
        },timerLength)
        
        

    }

    useEffect(() => {
      fetchMessages();
      selectedChatCompare = selectedChat;
    },[selectedChat])


    useEffect(() => {
      socket.on("message received", (newMessageReceived) => {
        if(!selectedChatCompare || (selectedChatCompare._id !== newMessageReceived.chat._id)){
          if(!notification.includes(newMessageReceived)){
            setNotification([newMessageReceived, ...notification]);
            setFetchAgain(!fetchAgain);
          }
        }else{
          setMessages([...messages, newMessageReceived]);
          console.log(messages)
        }
      })
    })


    return (
           <>
             {
                selectedChat ? (
                <>
                
                
               <Typography
                 component={"div"}
                 sx={{
                    fontSize: {xs: '25px',sm: '28px', md: '30px'},
                    fontFamily: "Work scans",
                    pb: "3px",
                    px: "2px",
                    display: "flex",
                    width: '100%',
                    alignItems: "center",
                    justifyContent: {xs: "center",sm: "center",md:"normal"},
                 }}
                >
                  <IconButton aria-label="Example" onClick={() => setSelectedChat("")}
                 >
                        <ArrowBackIcon sx={{display: {sm: "flex",md: "none"}
                 //justifyContent: "flex-start",
                 }} /> 
                   </IconButton>
                    {
                     !selectedChat.isGroupChat ? (
                        <>
                          <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                          {getSender(user, selectedChat.users)}
                          <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                          </Box>
                        </>
                     ) : (
                       <>
                        <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                         {selectedChat.chatName.toUpperCase()}
                         <UpdateGroupChatModel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages}/>
                         </Box>
                       </>
                     )
                    }
                    </Typography>
                    <Box
                     display={"flex"}
                     flexDirection={"column"}
                     justifyContent="flex-end"
                     p={3}
                     bgcolor="#E8E8E8"
                     width={"93%"}
                     height="80%"
                     borderRadius={"5px"}
                     sx={{height: {xs: "430px",sm: "430px",md: "480px"}}}
                    >
                       {
                        loading ? (
                          
                          <CircularProgress
                          sx={{
                            margin: "auto"
                            
                          }}
                          />
                          
                        ) : (
                          <div className={classes.messages}>
                             <ScrollableChat messages={messages} />
                          </div>
                        )
                       }
                       <FormControl onKeyDown={sendMessage} required >
                        {isTyping && <div>
                            <Lottie
                            options={defaultOptions}
                            width={70}
                            style={{marginBottom: 15, marginLeft: 0}}
                            />
                          </div>}
                       <TextField  sx={{mb: "-15px",}}
          id="outlined-password-input"
          label="Enter Message..."
          type="text"
          onChange={typingHandler}
          value={newMessage}
        />
        </FormControl>
                    </Box>

                </>) : ( 

                <>
                  <Box  display={"flex"} alignItems={"center"} justifyContent={"center"} height="100%" >
                     <Typography fontSize={25} pb={3} fontFamily={"work sans"} fontWeight="bold">Click on a user to start chatting</Typography>
                  </Box>
                </>
                )
             }
           </>
    )
}

export default SingleChat;