import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar,
    Box,
    Button,
    CardActions,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    ImageListItem,
    Paper,
    Popper,
    Stack,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import './style.css';

// service providers
import { useDispatch, useSelector } from 'store';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';

// assets
import chatGpt from 'assets/images/icons/chatgpt.png';
import { sendMessage } from 'store/slices/chatgpt';

// notification status options
const useStyles = makeStyles({
    chatContainer: {
        height: '100%'
    },
    messageList: {
        height: 'calc(100% - 68px)',
        overflowY: 'auto',
        padding: '16px'
    },
    messageItem: {
        marginBottom: '16px',
        borderRadius: '8px',
        padding: '8px',
        border: '.5px solid'
    },
    formContainer: {
        padding: '16px'
    },
    inputField: {
        marginRight: '16px'
    }
});

interface Message {
    id: number;
    text: string;
    createdAt: Date;
}

// ==============================|| NOTIFICATION ||============================== //

const ChatSection = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    /* const [value, setValue] = useState(''); */
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    const anchorRef = useRef<any>(null);
    const { messageChat } = useSelector((state) => state.chatGpt);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<HTMLDivElement> | MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    useEffect(() => {
        const storedMessages = localStorage.getItem('messages');
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);

    const handleSendMessage = () => {
        setIsLoading(true);
        if (message !== '') {
            dispatch(sendMessage(message));
        }
        const newMessage: Message = {
            id: messages.length + 1,
            text: message,
            createdAt: new Date()
        };
        setMessages([...messages, newMessage]);
        setMessage('');
    };
    console.log(messageChat, isLoading, 'chat');

    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    mr: 3,
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}
            >
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        width: '40px',
                        height: '40px',
                        padding: '5px',
                        transition: 'all 1s ease-in-out',
                        background: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.secondary.light,
                        color: theme.palette.mode === 'dark' ? theme.palette.warning.dark : theme.palette.secondary.dark,
                        borderRadius: '50%',
                        '&[aria-controls="menu-list-grow"],&:hover': {
                            background: theme.palette.mode === 'dark' ? '#00A67E' : '#00A67E',
                            color: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.secondary.light,
                            transform: 'rotate(90deg)'
                        }
                    }}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    color="inherit"
                >
                    <ImageListItem
                        sx={{
                            transition: 'all 1s ease-in-out',
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                transform: 'rotate(360deg)'
                            }
                        }}
                    >
                        <img src={chatGpt} alt={chatGpt} width="20" />
                    </ImageListItem>
                </Avatar>
            </Box>

            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
                sx={{ width: '400px' }}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                            <Paper>
                                {open && (
                                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item xs={12}>
                                                <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }}>
                                                    <Grid item>
                                                        <Stack direction="row" spacing={2}>
                                                            <Typography variant="subtitle1">All Notification</Typography>
                                                            <Chip
                                                                size="small"
                                                                label="01"
                                                                sx={{
                                                                    color: theme.palette.background.default,
                                                                    bgcolor: theme.palette.warning.dark
                                                                }}
                                                            />
                                                        </Stack>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography component={Link} to="#" variant="subtitle2" color="primary">
                                                            Mark as all read
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container direction="column" className={classes.chatContainer}>
                                                    <Grid item className={classes.messageList}>
                                                        <PerfectScrollbar
                                                            style={{
                                                                height: '100%',
                                                                maxHeight: 'calc(100vh - 505px)',
                                                                overflowX: 'hidden'
                                                            }}
                                                        >
                                                            {messages.map((mess) => (
                                                                <div key={mess.id} className={classes.messageItem}>
                                                                    <p>{mess.text}</p>
                                                                    <small>{mess.createdAt.toLocaleString()}</small>
                                                                </div>
                                                            ))}
                                                        </PerfectScrollbar>
                                                    </Grid>
                                                    <Grid item className={classes.formContainer}>
                                                        <TextField
                                                            label="Type your message"
                                                            variant="outlined"
                                                            size="small"
                                                            className={classes.inputField}
                                                            value={message}
                                                            onChange={(e) => setMessage(e.target.value)}
                                                        />
                                                        <Button variant="contained" color="primary" onClick={handleSendMessage}>
                                                            Send
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                        <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                                            <Button size="small" disableElevation>
                                                View All
                                            </Button>
                                        </CardActions>
                                    </MainCard>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    );
};

export default ChatSection;
