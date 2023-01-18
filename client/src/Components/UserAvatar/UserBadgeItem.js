import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';

const UserBadgeItem = ({user, handleFunction}) => {
    
    return (
        <Box
        sx={{cursor: 'pointer'}}
        borderRadius='8px'
        m={"3px"}
        mb={"2px"}
        px={1}
        py={"1px"}
        color="white"
        fontSize={8}
        bgcolor="purple"
        display={"flex"}
        >
            <Typography>{user.name}</Typography>
            <CloseIcon  sx={{pl: "1px"}} onClick={handleFunction}/>
        </Box>
    )
}

export default UserBadgeItem