import { useContext, useState } from "react"
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography,Divider, Input, TextField } from "@mui/material";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ChatState } from "../../Context/ChatProvider";
import { makeStyles } from '@material-ui/core/styles';
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import axios from "axios";
import { SnackbarContext } from "../../Context/snackbarProvider";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";



function SideDrawer() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user, setSelectedChat, chats, setChats } = ChatState()
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {snackbar, setSnackbar} = useContext(SnackbarContext)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(user.name)
  const logoutHandler = () => {
    localStorage.removeItem("userInfo")
    navigate("/")
  }

  const useStyles = makeStyles((theme) => ({

    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },

  }));
  const classes = useStyles();


  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    console.log(name)
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const handleSearch = async () => {
      if(!search){
        setSnackbar({isOpen: true,message: "Please Enter something in search"})
        return;
      }

      try{

        setLoading(true)

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }

        const {data} = await axios.get(`/api/user/search?search=${search}`,config);
        setLoading(false);
        setSearchResult(data.users);
        //console.log(searchResult)

      }catch(error){

        setSnackbar({isOpen: true,message: "Error Occured!"})
        setLoading(false)

      }

  }

  const accessChat = async(userId) => {
     try{

      setLoadingChat(true);
      const config = {
        "Content-type":"application/json",
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const {data}= await axios.post("/api/chat/createchat", {userId}, config);

      console.log(!chats.find((c) => c._id === data?.chat?._id))
      
      if(!chats.find((c) => c._id === data?.chat?._id)) setChats([data.chat, ...chats])
       console.log(data);
      setSelectedChat(data.chat)
      setLoadingChat(false);
      setDrawerOpen(false);




     }catch(error){
      setSnackbar({isOpen: true,message: "Error Occured!"}) 
      setLoadingChat(false)
     }
  }


  return (
    <>
      <Box component="div" sx={{
        display: "flex",
        justifyContent: "space-between",
        bgcolor: "white",
        p: '5px 10px 5px 10px',
        borderWidth: "5px"
      }}>

        <Tooltip title="Search Users to Chat">

          <Button sx={{
            '&:hover': {
              backgroundColor: '#ffffff'
            }, color: 'black'
          }}  onClick={()=>setDrawerOpen(true)}>
            <SearchIcon />
            <Typography sx={{ display: { xs: 'none', md: 'block', lg: 'block' }, mt: '2', paddingLeft: "4" }}>Search User</Typography>
          </Button>

        </Tooltip>
        <Typography style={{ fontSize: "18px", fontFamily: "work-sans", padding: "3px" }}>Talk-A-Tive</Typography>
        <div>
          <Button sx={{ color: "black" }}><NotificationsActiveIcon /></Button>
          <Button endIcon={<KeyboardArrowDownIcon />} onClick={handleClick}>
            <Avatar src={user.pic} {...stringAvatar(user.name)} className={classes.small} />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <ProfileModal handleClose1={handleClose} user={user}>
              <MenuItem >My Profile</MenuItem>
              </ProfileModal>
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </Menu>
        </div>

      </Box>
      
      <Drawer sx={{
        "& .MuiDrawer-paper":{width: "22%"}
      }}
 anchor="left" open={drawerOpen} onClose={()=>setDrawerOpen(false)}>
  <Typography sx={{fontSize:"20px",margin: "10px 0 5px 16px"}} variant="h3">Search Users</Typography>
  <Divider/>
      <Box display="flex"  margin="10px 0 0 16px">
        <TextField
         placeholder="Search by name or email"
         value={search}
         onChange={(e) => setSearch(e.target.value)}
         variant="outlined"
         
        />
        <Button onClick={handleSearch} style={{marginLeft: '5px'}}>Go</Button>
      </Box>
      {loading ? (
        <ChatLoading/>) : (
          searchResult?.map((user) => 
          (
            <UserListItem
             key={user._id}
             user={user}
             handleFunction={() => accessChat(user._id)}
            />
          )
          )
        )
      }
      </Drawer>
      

    </>
  )
}

export default SideDrawer