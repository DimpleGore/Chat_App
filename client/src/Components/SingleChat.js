import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {getSender, getSenderFull} from '../config/ChatLogics'
import ProfileModal from './Miscellaneous/ProfileModal'
import UpdateGroupChatModel from "./Miscellaneous/UpdateGroupChatModel";

const SingleChat = ({fetchAgain, setFetchAgain}) => {

    const {user, selectedChat, setSelectedChat} = ChatState();

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
                         <UpdateGroupChatModel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
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
                    >
                       {/* Messages here */}
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