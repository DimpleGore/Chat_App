import { useState } from "react"
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ChatState } from "../../Context/ChatProvider";
import { makeStyles } from '@material-ui/core/styles';



function SideDrawer() {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user } = ChatState()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(user.name)

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
          }} >
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
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>

      </Box>
    </>
  )
}

export default SideDrawer