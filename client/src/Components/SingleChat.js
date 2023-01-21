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

const SingleChat = ({fetchAgain, setFetchAgain}) => {

    const {user, selectedChat, setSelectedChat} = ChatState();
    const {setSnackbar, snackbar} = useContext(SnackbarContext);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("")
    const classes = useStyles()

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

        console.log(data)

        setMessages(data);
        setLoading(false);

       }catch(error){
        setSnackbar({isOpen: true, message: "Error Occured!"});
        setLoading(false);
       }
    }

    const sendMessage = async(e) => {
       if(e.key === "Enter" && newMessage){
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

          console.log(data)
          setMessages([...messages,data])
         }catch(error){
            setSnackbar({isOpen: true, message: "Error Occured!"})
         }
       }
           
    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value);
    }

    useEffect(() => {
      fetchMessages()
    },[selectedChat])

    return (
           <>
             {
                selectedChat ? (
                <>
                
                
               <Typography
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