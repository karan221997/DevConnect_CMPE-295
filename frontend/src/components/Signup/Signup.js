//import css
import '../Login/login.css';
//react imports
import { useContext ,useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
//components import
import Landingtopbar from '../../components/landingtopbar/Landingtopbar';
//material UI componets import
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

//material UI icons import
import LoginIcon from '@mui/icons-material/Login';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ChatIcon from '@mui/icons-material/Chat';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
//material UI styling imports
import { grey } from '@mui/material/colors';
import { createTheme ,ThemeProvider } from '@mui/material/styles';

//creating theme to override material UI colors
const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: '#f44336',
    },
  },
});


export default function Signup() {

  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const navigate = useNavigate();

  //error message
  const [errorMessageUserName, setErrorMessageUserName] = useState("");
  const [errorMessagePhoneNumber, setErrorMessagePhoneNumber] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [errorMessagePasswordAgain, setErrorMessagePasswordAgain] = useState("");
 
 //error states
  const [errorUserName, setErrorUserName] = useState(false);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPasswordAgain, setErrorPasswordAgain] = useState(false);


  //setting up context
  const UsernameHandler = (e) => {
    setUserName(e.target.value);
  }
  const PhoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  }
  const EmailHandler = (e) => {
    setEmail(e.target.value);
  }
  const PasswordHandler = (e) => {
    setPassword(e.target.value);
  }
  const PasswordAgainHandler = (e) => {
    setPasswordAgain(e.target.value);
  }

//submitting context

const SignupHandler = async() => {
  console.log("clicked submit of signup");
  console.log("username:" + userName);
  console.log("email:" + email);
  console.log("phoneNumber:" + phoneNumber);
  console.log("password Again:" + passwordAgain);
  console.log("password:" + password);
  
  //validations 
  
  if(userName === "" || password === "" || email === "" || phoneNumber === "" || passwordAgain === ""){
    //something is blank
      if(userName === ""){
      setErrorMessageUserName("UserName is required");
      setErrorUserName(true);
    }
    if(password === ""){
      setErrorMessagePassword("Password is required");
      setErrorPassword(true);
    }
    if(email === ""){
      setErrorMessageEmail("Email is required");
      setErrorEmail(true);
    }
    if(phoneNumber === ""){
      setErrorMessagePhoneNumber("Phone Number is required");
      setErrorPhoneNumber(true);
    }
    if(passwordAgain === ""){
      setErrorMessagePasswordAgain("Password Again is required");
      setErrorPasswordAgain(true);
    }

  }
  else{
    //all fields are filled
    if(password !== passwordAgain){
      setErrorMessagePasswordAgain("Passwords do not match");
      setErrorPasswordAgain(true);
    }
    else{
       //all fields are filled and passwords match
       //setting up the data to be sent to the server
       //signing up user
        const user = {
              email:email,
              userName: userName,
              phoneNumber: phoneNumber,
              password: password,
              passwordAgain: passwordAgain
            }
            try {
              await axios.post("/api/auth/register", user);
              navigate("/login");
            } catch (err) {
              console.log(err);
            }
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
                                        <LiveHelpIcon className='leftboxContaintIcon'/>
                                        <span className="leftboxtext">
                                        Get unstuck — ask a question     
                                        </span>
                                    </div>
                                    <div className="leftboxContaint">
                                        <GroupAddIcon className='leftboxContaintIcon'/>
                                        <span className="leftboxtext">
                                        Stay connected with community of devlopers   
                                        </span>
                                    </div>
                                    <div className="leftboxContaint">
                                        <ChatIcon className='leftboxContaintIcon'/>
                                        <span className="leftboxtext">
                                        Chat with your friends and colleagues    
                                        </span>
                                    </div>
                                     <div className="leftboxContaint">
                                        <EmojiEventsIcon className='leftboxContaintIcon'/>
                                        <span className="leftboxtext">
                                         Participate in Hackathon and win prizes    
                                        </span>
                                    </div>
                                     <div className="leftboxContaint">
                                        <WorkOutlineIcon className='leftboxContaintIcon'/>
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
                            '& > :not(style)': { m: 1, width: '40ch' , color:"primary" },
                        }}
                        noValidate
                        autoComplete="off">
                        <TextField 
                        id="outlined-basic"
                        label="Username" 
                        variant="outlined"
                        error={errorUserName}
                        helperText={errorMessageUserName}
                        onChange={UsernameHandler}
                        />
                        <TextField 
                        id="outlined-basic" 
                        label="Phone Number"
                        type = "phone" 
                        variant="outlined"
                        error={errorPhoneNumber}
                        helperText={errorMessagePhoneNumber}
                        onChange={PhoneNumberHandler}
                        />
                        <TextField 
                        id="outlined-basic" 
                        label="Email" 
                        variant="outlined"
                        error={errorEmail}
                        helperText={errorMessageEmail}
                        onChange={EmailHandler} 
                        />  
                        <TextField 
                        id="outlined-basic" 
                        label="Password" 
                        type="password"
                        variant="outlined"
                        error={errorPassword}
                        helperText={errorMessagePassword}
                        onChange={PasswordHandler}
                         />
                        <TextField 
                        id="outlined-basic" 
                        label="Confirm Password" 
                        variant="outlined"
                        type="password"
                        error={errorPasswordAgain}
                        helperText={errorMessagePasswordAgain}
                        onChange={PasswordAgainHandler}
                         />    
                          <Button variant="contained" endIcon={<LoginIcon />}
                            sx={{
                                '& > not(style)': { m: 2,
                                 width: '100%' ,
                                  marginLeft: '10px',
                                   },
                            }}
                            onClick={SignupHandler}
                          >SignUp</Button> 
                            
                      </Box> 
                      <span className="loginbottomText" onClick={()=> navigate("/Login")}>
                            Already have an account? Login
                        </span>
                    </ThemeProvider>                
                </div>
            </div>
        </>
    );
}
