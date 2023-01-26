import { Avatar, Tooltip } from '@mui/material';
//import { makeStyles } from '@mui/styles';
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogics';
import { ChatState } from '../Context/ChatProvider';
import { makeStyles } from '@material-ui/core/styles';


const ScrollableChat = ({ messages }) => {

    const { user } = ChatState();

    const useStyles = makeStyles((theme) => ({

        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },

    }));

    const classes = useStyles();
    return (
        <ScrollableFeed>
            {messages && messages.map((m, i) => (
                <div style={{ display: 'flex' }} key={m._id}>
                    {

                        (isSameSender(messages, m, i, user._id) ||
                            isLastMessage(messages, i, user._id)) && (
                            <Tooltip title={m.sender.name} placement="bottom-start">
                                <Avatar
                                    sx={{
                                        mt: "7px",
                                        mr: "1px",
                                        cursor: 'pointer'
                                    }}
                                    src={m.sender.pic} className={classes.small} />
                            </Tooltip>
                        )
                    }
                    <span style={{
                        backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                            }`,
                        marginLeft: isSameSenderMargin(messages, m, i, user._id),
                        marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                        borderRadius: "20px",
                        padding: "5px 15px",
                        maxWidth: "75%",
                        marginBottom: '5px'
                    }}>{m.content}</span>
                </div>
            ))}
        </ScrollableFeed>
    )
}

export default ScrollableChat;