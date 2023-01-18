import { Box, Button, FormControl, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { SnackbarContext } from "../../Context/snackbarProvider";
import ChatLoading from "../ChatLoading";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";

const GroupChatModal = ({children}) => {

    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false)

    const {user, chats, setChats} = ChatState();

    const {snackbar, setSnackbar} = useContext(SnackbarContext)

    const [open, setOpen] = useState(false);
   //const handleOpen = () => setOpen(true);
   const handleClose = () =>{ 
    setOpen(false)
    console.log(open)
   };

   const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleSearch = async(query) => {
    setSearch(query);
    if(!query){
        return;
    }
    try{
       setLoading(true);
       const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const {data} = await axios.get(`/api/user/search?search=${search}`,config);
      setLoading(false);
      setSearchResult(data.users);
      

    }catch(error){
        setSnackbar({isOpen: true,message: "Error Occured!"})
        setLoading(false)

    }
  }

  const handleGroupFunction = (usersToAdd) => {
         if(selectedUsers.includes(usersToAdd)){
            setSnackbar({isOpen: true,message: "User already added"});
            return;
         }

         setSelectedUsers([...selectedUsers, usersToAdd]);

  }

  const handleDelete = (delUser) => {
       setSelectedUsers(
        selectedUsers.filter((sel) => sel._id !== delUser._id)
       )
  }

  const handleSubmit = async() => {
      if(!groupChatName || !selectedUsers){
        setSnackbar({isOpen: true,message: "Please select all the fields"});
        return;
      }

      try{
        const config = {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }

        const {data} = await axios.post('/api/chat/group',{
            name: groupChatName,
            users: JSON.stringify(selectedUsers.map((users) => users._id))
        },
        config);
        setChats([data.fullGroupChat, ...chats]);
        setOpen(false);
        setSnackbar({status: "success", isOpen: true,message: "New Group Chat Created!"});
      }catch(error){
        setSnackbar({isOpen: true,message: "Failed to Create the Chat!"});
      }
  }

    return <>
     <span onClick={()=> setOpen(true)}>{children}</span>
     
     <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
                <Box component="div" sx={style}>
          <Typography fontSize="30px" fontFamily="Work sans" fontWeight="bold" display="flex" justifyContent="center" id="modal-modal-title" variant="h6" component="h2">
            Create Group Chat
          </Typography>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>          <FormControl required >
          <TextField sx={{mb: "7px",width: '400px'}}
          id="outlined-password-input"
          label="Chat Name"
          type="text"
          onChange={(e) => setGroupChatName(e.target.value)}
        />
         
            </FormControl>
            <FormControl required >
          <TextField sx={{mb: "1px", width: '400px'}}
          fullWidth
          id="outlined-password-input"
          label="Add Users eg: John, Piyush, Jane"
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
        />
         
            </FormControl>

            <Box width="100%" display={"flex"} flex={"wrap"}>
            {
                selectedUsers.map((user) => (
                    <UserBadgeItem key={user._id} user={user} 
                    handleFunction={() => handleDelete(user)} />
                ))
            }
            </Box>
            { 
              loading ? (
                <ChatLoading/>
              ) : (
                searchResult?.slice(0,4).map((user) => (
                    <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroupFunction(user)}
                     />
                )
              ))
            }
            </Box>

            <Button sx={{mt:"10px",ml: "260px"}} variant="contained" onClick={handleSubmit} >Create Chat</Button>

          </Box>
      </Modal>
    </>
}

export default GroupChatModal