//css import
import './login.css';
//component import
import Landingtopbar from '../../components/landingtopbar/Landingtopbar';
//react import
import { AuthContext } from '../../context/AuthContext';
import { useState, useContext ,useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { loginCall } from "../../apiCalls";
//material UI components import
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
//material UI styling
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
//Material UI icons
import LoginIcon from '@mui/icons-material/Login';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ChatIcon from '@mui/icons-material/Chat';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

//creating theme to override material UI colors
const theme = createTheme({
    palette: {
        primary: {
            main: grey[900],
        },
        secondary: {
            main: red[500],
        },
    },
});





export default function Login() {

   const navigate = useNavigate();

    //main state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    //error handling
    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    const { user, isFetching, error, dispatch } = useContext(AuthContext);
    
    const setEmailHandler = (e) => {
        setEmail(e.target.value);
    }
    const setPasswordHandler = (e) => {
        setPassword(e.target.value);
    }
    const loginHandler = () => {
        //validation 
        if (email === "") {
            setErrorMessageEmail("Email is required");
            setErrorEmail(true);
        }
        if (password === "" && email !== "") {
            setErrorMessagePassword("Password is required");
            setErrorPassword(true);
            setErrorEmail(false);
            setErrorMessageEmail("");
        }
        if (password !== "" && email === "") {
            setErrorMessageEmail("Email is required");
            setErrorEmail(true);
            setErrorPassword(false);
            setErrorMessagePassword("");
        }

        if (password === "") {
            setErrorMessagePassword("Password is required");
            setErrorPassword(true);
        }
        if (email !== "" && password !== "") {
            setErrorMessageEmail("");
            setErrorMessagePassword("");
            setErrorEmail(false);
            setErrorPassword(false);
            loginCall({ email: email, password: password }, dispatch);
            console.log(email);
            console.log(password);
        }

    }

    return (
        <>
            <Landingtopbar />
            <div className="loginContainer">
                <div className="loginContainerleft">
                    <div className="loginleftBox">
                        <div className="leftboxContaints">
                            <div className="leftboxContaint">
                                <LiveHelpIcon className='leftboxContaintIcon' />
                                <span className="leftboxtext">
                                    Get unstuck — ask a question
                                </span>
                            </div>
                            <div className="leftboxContaint">
                                <GroupAddIcon className='leftboxContaintIcon' />
                                <span className="leftboxtext">
                                    Stay connected with community of devlopers
                                </span>
                            </div>
                            <div className="leftboxContaint">
                                <ChatIcon className='leftboxContaintIcon' />
                                <span className="leftboxtext">
                                    Chat with your friends and colleagues
                                </span>
                            </div>
                            <div className="leftboxContaint">
                                <EmojiEventsIcon className='leftboxContaintIcon' />
                                <span className="leftboxtext">
                                    Participate in Hackathon and win prizes
                                </span>
                            </div>
                            <div className="leftboxContaint">
                                <WorkOutlineIcon className='leftboxContaintIcon' />
                                <span className="leftboxtext">
                                    job Search
                                </span>
                            </div>
                        </div>
                        <div className="loginleftBoxBottom">
                        </div>
                    </div>

                </div>
                <div className="loginContainerRight">
                    <ThemeProvider theme={theme}>
                        <Box component="form" className="loginContainerRightForm"
                            sx={{
                                '& > :not(style)': { m: 1, width: '40ch', color: 'primary' },
                            }}
                            noValidate
                            autoComplete="off">
                            <TextField id="outlined-basic"
                                label="Email or Username"
                                variant="outlined"
                                error={errorEmail}
                                onChange={setEmailHandler}
                                helperText={errorMessageEmail} />
                            <TextField id="outlined-basic"
                                label="Password"
                                type="password"
                                variant="outlined"
                                error={errorPassword}
                                onChange={setPasswordHandler}
                                helperText={errorMessagePassword} />
                            <Button variant="contained" endIcon={<LoginIcon />}
                                sx={{
                                    '& > not(style)': {
                                        m: 2,
                                        width: '100%',
                                        marginLeft: '10px',
                                    },
                                }}
                                onClick={loginHandler}
                            >Login</Button>

                        </Box>
                        <span className="loginbottomText">
                            forget password ?
                        </span>
                        <span className="loginbottomText" onClick={()=> navigate("/signup")}>
                            Create a new account ?
                        </span>
                    </ThemeProvider>
                </div>
            </div>
        </>
    );
}
