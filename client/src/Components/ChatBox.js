import { Box } from "@mui/material";
import { borderRadius } from "@mui/system";
import { ChatState } from "../Context/ChatProvider"
import SingleChat from "./SingleChat";

function ChatBox({fetchAgain, setFetchAgain}){

    const {selectedChat} = ChatState();

    return (
        <Box
          sx={{
            display: {xs: selectedChat ? "flex" : "none",sm: selectedChat ? "flex" : "none",md: "flex"},
            width: {md:"68%",sm:"100%",xs:"100%"},
            bgcolor: "white",
            alignItems: "center",
            flexDirection: "column",
            p: "3px",
            borderRadius: "5px",
            borderWidth: "1px",
            maxHeight: '100%',
          }}
        >
         <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
        </Box>
    )
}

export default ChatBox