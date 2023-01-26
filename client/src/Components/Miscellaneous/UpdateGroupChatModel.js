import { Box, Button, CircularProgress, FormControl, Modal, TextField, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useContext, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { SnackbarContext } from "../../Context/snackbarProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import ChatLoading from "../ChatLoading";

const UpdateGroupChatModel = ({ fetchAgain, setFetchAgain, fetchMessages }) => {

  const [open, setOpen] = useState(false);
  const { selectedChat, setSelectedChat, user } = ChatState();
  const { snackbar, setSnackbar } = useContext(SnackbarContext)

  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  //const handleOpen = () => setOpen(true);
  const handleClose = () => {
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

  const handleRemove = async (user1) => {


    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      setSnackbar({ isOpen: true, message: "Only admins can remove someone!" });
      return;
    }

    try {
      setLoading(true);

      const config = {
        "Content-type": "application/json",
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.post("/api/chat/groupremove", {
        chatId: selectedChat._id,
        userId: user1._id
      }, config);

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data.removed)
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);

    } catch (error) {
      setSnackbar({ isOpen: true, message: "Error Occured!" });
      setLoading(false);
    }

  }

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.get(`/api/user/search?search=${search}`, config);
      setLoading(false);
      setSearchResult(data.users);


    } catch (error) {
      setSnackbar({ isOpen: true, message: "Error Occured!" })
      setLoading(false)

    }
  }


  const handleRename = async () => {
    if (!groupChatName) return

    try {
      setRenameLoading(true);
      const config = {
        "Content-type": "application/json",
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.post("/api/chat/rename", {
        chatId: selectedChat._id,
        chatName: groupChatName
      }, config)

      setSelectedChat(data.updatedChat);
      //console.log(selectedChat)
      setFetchAgain(!fetchAgain);
      //console.log(fetchAgain)
      setRenameLoading(false)
      setGroupChatName("");
    } catch (error) {
      setSnackbar({ isOpen: true, message: "Error Occured!" })
      setRenameLoading(false);
      setGroupChatName("");
    }
  }

  const handleGroupFunction = async (usersToAdd) => {
    if (selectedChat.users.find((u) => u._id === usersToAdd._id)) {
      setSnackbar({ isOpen: true, message: "User Already in Group" });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      setSnackbar({ isOpen: true, message: "Only admins can add someone!" });
      return;
    }

    try {
      setLoading(true);

      const config = {
        "Content-type": "application/json",
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.post("/api/chat/groupadd", {
        chatId: selectedChat._id,
        userId: usersToAdd._id
      }, config);

      setSelectedChat(data.added);
      setFetchAgain(!fetchAgain);
      setLoading(false);

    } catch (error) {
      setSnackbar({ isOpen: true, message: "Error Occured!" });
      setLoading(false);
    }

  }


  return (
    <>

      <Button sx={{ color: "black" }} onClick={() => setOpen(true)} ><VisibilityIcon /></Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="div" sx={style}>
          <Typography fontSize="30px" fontFamily="Work sans" fontWeight="bold" display="flex" justifyContent="center" id="modal-modal-title" variant="h6" component="h2">
            {selectedChat.chatName}
          </Typography>
          <Box width={"100%"} display="flex" flexWrap={"wrap"} p={3} >
            {selectedChat.users.map((user) => (
              <UserBadgeItem key={user._id} user={user}
                handleFunction={() => handleRemove(user)} />
            ))}
          </Box>
          <Box display={"flex"} mb={1} >
            <TextField sx={{ mb: "2px", width: '400px' }}
              id="outlined-password-input"
              label="Chat Name"
              type="text"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />


            <LoadingButton
              loading={renameLoading} variant="contained" color="success" sx={{ textTransform: "none", ml: "2px" }}
              onClick={handleRename}>Update</LoadingButton>


          </Box>
          <FormControl required >
            <TextField sx={{ mb: "1px", width: '400px' }}
              fullWidth
              id="outlined-password-input"
              label="Add Users eg: John, Piyush, Jane"
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
            />

          </FormControl>
          <Box>
            {
              loading ? (
                <CircularProgress
                          sx={{
                            margin: "auto"
                            
                          }}/> 
              ) : (
                searchResult?.slice(0, 4).map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroupFunction(user)}
                  />
                )
                ))
            }
          </Box>
          <Button sx={{ mt: "10px", ml: "260px" }} variant="contained" color="error" onClick={() => handleRemove(user)}>Leave Group</Button>
        </Box>
      </Modal>



    </>
  )
}

export default UpdateGroupChatModel;