import { Box } from "@mui/material";
import ChatBox from "../Components/ChatBox";
import SideDrawer from "../Components/Miscellaneous/SideDrawer";
import Mychats from "../Components/MyChats";
import { ChatState } from "../Context/ChatProvider"


const ChatPage = () => {
    const {user} = ChatState();

    return (
        <div style={{width: '100%'}}>
           {user && <SideDrawer/>}
           <Box component="div" sx={{ display: 'flex' }} justifyContent="space-between"  h="91.5vh" p="10px">
           {user && <Mychats/>}
           {user && <ChatBox/>}
           </Box>
        </div>
    )
}

export default ChatPage