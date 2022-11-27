import './hackathontile.css';
//material UI icon
import { useNavigate } from 'react-router-dom';
import {  useState} from "react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import { useEffect } from 'react';
import axios from 'axios';
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

export default function Hackathontile({data}) {

const {name, description, date, time, location, maxTeamSize, winningPoints,participants} = data;
const hackathonID = data._id;
const [participateText, setParticipateText] = useState("Participate");
const [participateButtonState, setParticipateButtonState] = useState(false);

useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    console.log("participants data ",participants);

    const isParticipating = participants.some((participant) => participant.userId === user._id);
    if(isParticipating){
        setParticipateText("Participating");
        setParticipateButtonState(true);
    }

}, [participants,participateButtonState]);



const participateClicked = async() => {

    //get user from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    const payloadData={
        userId: user._id,
        userName: user.userName,  
        userEmail: user.email, 
        hackathonId:hackathonID,
    }
    //send request to backend
    const res = await axios.post('/api/hackathon/addParticipants', payloadData);
    if(res.status === 200){
        setParticipateText("Participated");
        setParticipateButtonState(true);
    }
}
//change date format
const navigate = useNavigate();
const date1 = new Date(date).toDateString();
const time1 = new Date(time).toLocaleTimeString();

    return (
        <>
            <div className="hackathontile">
                <ThemeProvider theme={theme}>
                    <div className="hackathontileTop">
                        <span className="hackathontileTopTittle"
                        onClick={
                            () => {
                             // navigate to hackathon details page and send props
                                navigate('/hackathonPageAfterClicked', {
                                    state: { data },
                                });
                            }
                        }
                        >
                          {name}
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
                    <div className="hackathontileMiddle">
                        <div className="middleInfo">
                            <AccessTimeOutlinedIcon sx={{
                                color: '#808080',
                                fontSize: '1.5rem',

                            }} />
                            <span className="middleInfoText">
                               {date1} at {time1}
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
                            <GroupOutlinedIcon sx={{
                                color: '#808080',
                                fontSize: '1.5rem',

                            }} />
                            <span className="middleInfoText">
                                {maxTeamSize} members
                            </span>
                        </div>
                        <div className="middleInfo">
                            <EmojiEventsOutlinedIcon sx={{
                                color: '#808080',
                                fontSize: '1.5rem',

                            }} />
                            <span className="middleInfoText">
                                +{winningPoints} points
                            </span>
                        </div>
                    </div>
                    <div className="hackathontileBottom">
                        <span className="hackathontileBottomButtons">
                            <Button variant="outlined"
                                onClick={participateClicked}
                                disabled={participateButtonState}
                            > {participateText} </Button>
                        </span>
                    </div>
                </ThemeProvider>
            </div>
        </>
    );
}