import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system"
import { makeStyles } from '@material-ui/core/styles';

const UserListItem = ({user,handleFunction}) => {

    const useStyles = makeStyles((theme) => ({

        small: {
          width: theme.spacing(3),
          height: theme.spacing(3),
        },
    
      }));
      const classes = useStyles();

    return (
       <Box onClick={handleFunction} sx={{
        display: "flex",
        cursor: "pointer",
        ":hover": {
            backgroundColor: "lightgreen",
            color: "white"
        },
        backgroundColor: "#E8E8E8",
        width: "90%",
        alignItems: "center",
        color: "black",
        padding: "5px 4px 5px 4px",
        margin:"10px 0 0 16px",
        borderRadius: "5px"
       }}>
        <Avatar src={user.pic}  className={classes.small} />
        <Box>
            <Typography>{user.name}</Typography>
            <Typography fontSize="15px"><b>Email: </b>{user.email}</Typography>
        </Box>
       </Box>
    )
}

export default UserListItem