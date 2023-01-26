import { Box } from "@mui/material";
import { useState } from "react";
import ChatBox from "../Components/ChatBox";
import SideDrawer from "../Components/Miscellaneous/SideDrawer";
import Mychats from "../Components/MyChats";
import { ChatState } from "../Context/ChatProvider"


const ChatPage = () => {
    const {user} = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <div style={{width: '100%'}}>
           {user && <SideDrawer setFetchAgain={setFetchAgain} fetchAgain={fetchAgain}/>}
           <Box component="div" sx={{ display: 'flex'}} justifyContent="space-between"  h="91.5vh" p="10px">
           {user && <Mychats fetchAgain={fetchAgain}/>}
           {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
           </Box>
        </div>
    )
}

export default ChatPage