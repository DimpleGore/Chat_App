
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const ProfileModal = ({user, children}) => {
   
   const [open, setOpen] = useState(false);

   const handleClose = () =>{ 
    setOpen(false)
   };

   const useStyles = makeStyles((theme) => ({

    small: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },

  }));

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
  
   
    return (
        <>
         {
            children ? (
                <span onClick={()=>setOpen(true)} >{children}</span>
            ) : (
               <Button sx={{color: 'black'}} onClick={()=>setOpen(true)} ><VisibilityIcon/></Button> 
            )
         }
         <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="div" sx={style}>
          <Typography fontSize="30px" fontFamily="Work sans" fontWeight="bold" display="flex" justifyContent="center" id="modal-modal-title" variant="h6" component="h2">
            {user.name}
          </Typography>
          <Box sx={{display: "flex",justifyContent:"center",mt:"20px"}}>
          <img src={user.pic} alt={user.name} style={{borderRadius: "50%",height: '100px',width:"100px"}}/>
          </Box>
          <Typography fontFamily="Work sans" component="h2"display="flex" justifyContent="center" mt="20px">Email: {user.email}</Typography>
        </Box>
      </Modal>
    
        </>
    )
}

export default ProfileModal;