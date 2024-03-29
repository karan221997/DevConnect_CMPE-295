import './jobtile.css';
//material UI icon
import axios from 'axios';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SchoolIcon from '@mui/icons-material/School';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import { set } from 'date-fns';
import { useEffect,useState } from 'react';
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

export default function Jobtile({data}) {

const {title,company,salary,description,location,type,skills,experience,applicants}=data;
const jobId = data._id;

    const[buttonText,setButtonText]=useState("Apply");
    const [buttonState, setButtonState] = useState(false);
    useEffect (()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        const isApplying = applicants.some((applicants) => applicants.userId === user._id);
        if(isApplying){
            setButtonText("Applied");
            setButtonState(true);
        }
    },[applicants,buttonText]);


    const applyClicked = async() => {
        //get the user from local storage
        const user = JSON.parse(localStorage.getItem("user"));
        const payload = {
        userId: user._id,
        userName: user.userName,  
        userEmail: user.email, 
        jobId:jobId
        }

        const result = await axios.post("api/job/apply", payload);
        if(result.status === 200){
            setButtonText("Applied");
            setButtonState(true);
        }
    }


    return (
        <>
            <div className="jobtile">
                <ThemeProvider theme={theme}>
                    <div className="jobtileTop">
                        <span className="jobtileTopTittle">
                         {title}
                            <Tooltip title={description}>
                            <InfoOutlinedIcon sx={{
                                color: '#808080',
                                fontSize: '1.2rem',
                                marginBottom: '0.8rem',
                                marginTop: '0.1rem',
                                cursor: 'pointer'
                            }} />
                            </Tooltip>
                        </span>
                    </div>
                    <div className="jobtileMiddle">
                        <div className="middleInfo">
                            <BusinessIcon sx={{
                                color: '#808080',
                                fontSize: '1.5rem',

                            }} />
                            <span className="middleInfoText">
                                 {company}
                            </span>
                        </div>
                        <div className="middleInfo">
                            <AttachMoneyIcon sx={{
                                color: '#808080',
                                fontSize: '1.5rem',

                            }} />
                            <span className="middleInfoText">
                                 {salary}K offered per year
                            </span>
                        </div>
                         <div className="middleInfo">
                            <LocationOnOutlinedIcon sx={{
                                color: '#808080',
                                fontSize: '1.5rem',

                            }} />
                            <span className="middleInfoText">
                                {location}
                            </span>
                        </div>
                        <div className="middleInfo">
                            <SchoolIcon sx={{
                                color: '#808080',
                                fontSize: '1.5rem',

                            }} />
                            <span className="middleInfoText">
                               {skills}
                            </span>
                        </div>
                        <div className="middleInfo">
                            <WorkHistoryIcon sx={{
                                color: '#808080',
                                fontSize: '1.5rem',

                            }} />
                            <span className="middleInfoText">
                               {experience} of experience required
                            </span>
                        </div>
                         <div className="middleInfo">
                            <PendingActionsIcon sx={{
                                color: '#808080',
                                fontSize: '1.5rem',

                            }} />
                            <span className="middleInfoText">
                               {type} opportunity
                            </span>
                        </div>
                    </div>
                    <div className="jobtileBottom">
                        <span className="jobtileBottomButtons">
                            <Button variant="outlined"
                            onClick={applyClicked}
                            disabled={buttonState}
                            > {buttonText}</Button>
                        </span>
                    </div>
                </ThemeProvider>
            </div>
        </>
    );
}