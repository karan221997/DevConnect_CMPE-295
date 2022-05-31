//css import
import './login.css';
//component import
import Landingtopbar from '../../components/landingtopbar/Landingtopbar';
//react import
import { AuthContext } from '../../context/AuthContext';
import { useState, useContext ,useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { loginCall } from "../../apiCalls";
import {useLocation} from 'react-router-dom';
//material UI components import
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
//material UI styling
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
import Alert from '@mui/material/Alert';
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

   

    //sucess alter message
    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertMessage, setSuccessAlertMessage] = useState("");

          //get props from login page
          const location = useLocation();

    //main state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    //error handling
    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [AlertMessage, setAlertMessage] = useState("");
    const [AlertValue, setAlertValue] = useState(false);

    const {dispatch } = useContext(AuthContext);

    //useeffect to check if user is cooming from signup page
    useEffect(() => { 
        if(location.state){
            setSuccessAlert(true);
            setSuccessAlertMessage("You have successfully signed up. Please login to continue");
        }
    });
    
    const setEmailHandler = (e) => {
        setAlertValue(false);
        setAlertMessage("");
        setErrorMessageEmail("");
        setEmail(e.target.value);
    }
    const setPasswordHandler = (e) => {
        setAlertValue(false);
        setAlertMessage("");
        setErrorMessagePassword("");
        setPassword(e.target.value);
    }
    const loginHandler =  async () => {
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
            const res = await loginCall({ email: email, password: password }, dispatch);
            if (res.status !== 200) {
               // res.response.data.message
                setAlertValue(true);
                setAlertMessage(res.response.data.message);
            }else{
                setAlertValue(false);
                setAlertMessage("");
            }

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
                             {successAlert && 
                            <Alert severity="success"
                            variant='outlined'
                            style={{ width: '43ch' }}
                            >
                             {successAlertMessage}
                            </Alert>}
                            
                            <TextField id="outlined-basic"
                                label="Email "
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
                             <Button variant="contained"  endIcon={<LoginIcon />}
                               style={{ width: '43ch' }}
                                onClick={loginHandler}
                            >Login</Button>
                            {AlertValue && 
                            <Alert severity="error"
                            variant='outlined'
                            style={{ width: '43ch' }}
                            >
                             {AlertMessage}
                            </Alert>}
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
