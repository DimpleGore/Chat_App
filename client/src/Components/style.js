import { makeStyles } from "@mui/styles";
import { flexbox } from "@mui/system";

const useStyles = makeStyles((theme)=>({

 messages: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    scrollBarWidth: 'none'
 }

}))

export default useStyles;