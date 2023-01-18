import { useContext, useEffect, useState } from "react"
import { ChatState } from "../Context/ChatProvider";
import axios from "axios"
import { SnackbarContext } from "../Context/snackbarProvider";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ChatLoading from "./ChatLoading";
import {getSender} from "../config/ChatLogics"
import GroupChatModal from "./Miscellaneous/GroupChatModel";

function Mychats({fetchAgain}){

   console.log(fetchAgain)

    const [loggedUser, setLoggedUser] = useState();
    const { user, setSelectedChat, selectedChat, chats, setChats } = ChatState();
    const {snackbar, setSnackbar} = useContext(SnackbarContext)
    console.log(selectedChat)

    const fetchChats = async() => {
        try{
   
         //setLoadingChat(true);
         const config = {
           "Content-type":"application/json",
           headers: {
             Authorization: `Bearer ${user.token}`
           }
         }
   
         const {data}= await axios.get("/api/chat/fetchchat",  config);
   
         console.log(data);
         setChats(data.results)
         //setLoadingChat(false);
         //setDrawerOpen(false);
   
   
   
   
        }catch(error){
         setSnackbar({isOpen: true,message: "Error Occured!"}) 
         //setLoadingChat(false)
        }
     }

     useEffect(() => {
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
      fetchChats();
     }, [fetchAgain])
   //console.log(chats.users[0].name)
   console.log(selectedChat)
    return (
       <Box 
       sx={{
        display: {xs: selectedChat ? "none" : "flex",sm: selectedChat ? "none" : "flex", md: "flex"},
        width: {xs: "100%",sm: "100%",md: "31%"},
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: "center",
        borderRadius: "5px",
        borderWidth: "1px"
       }}
       >
        <Box
        py={3}
        paddingLeft={5}
        fontSize={{md: '30px'}}
        fontFamily="Work sans"
        justifyContent={"space-between"}
        alignItems={"center"}
        display="flex"
        width={"100%"}
        >My Chats
      <GroupChatModal>
        <Button
        size="small"
        sx={{
          display: "flex",
          marginRight: '27px',
          textTransform: 'none',
          fontSize: {md: '15px'},
          color: 'black',
          backgroundColor: "#F0F0F0",
          ":hover": {
            backgroundColor:"#C0C0C0"
          }
        }}
        endIcon={<AddIcon/>}
        >New Group Chat</Button>
        </GroupChatModal>
        </Box>
        <Box
        display={"flex"}
        flexDirection={"column"}
        bgcolor={"white"}
        width="90%"
        height={"470px"}
        borderRadius="5px"  
        >
        {chats ? (
           <Stack sx={{overflowY: "scroll"}}>
              {
                chats.map((chat) => (
                  <Box mt={1}
                  onClick={()=>setSelectedChat(chat)}
                  bgcolor={selectedChat?._id === chat?._id ? "lightgreen" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  sx={{
                    cursor: "pointer"
                  }}
                  key={chat._id}
                  borderRadius="5px"
                  >
                  <Typography>
                    
                    
                      {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName }
                    
                  </Typography>
                  </Box>
                ))
              }
           </Stack>
        ) : (
          <ChatLoading/>
        )}
        </Box>
       </Box>
    )
}

export default Mychats