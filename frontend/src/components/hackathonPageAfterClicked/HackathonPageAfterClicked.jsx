import './HackathonPageAfterClicked.css';
import Topbar from "../topbar/Topbar";
import {  useState} from "react";
import Sidebar from "../sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import {useLocation} from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

export default function HackathonPageAfterClicked() {
    const location = useLocation();
    const {name, description, date, time, maxTeamSize, winningPoints,participants} = location.state.data;
    const hackathonLocation = location.state.data.location;
    const hacakthonDate = new Date(date).toDateString();
    const hackathonTime = new Date(time).toLocaleTimeString();
    const currentParticipants = participants.length;
    const [buttonText, setButtonText] = useState("View All Participants");
    const [viewParticipants, setViewParticipants] = useState(false);

    const clickedParticipants = () => {
        if(buttonText === "View All Participants"){
            setViewParticipants(true);
            setButtonText("Hide Participants");
        }else{
            setButtonText("View All Participants");
            setViewParticipants(false);
        }

    }



    return (
        <>
          <Topbar />
            <div className="hackathon">
                <Sidebar />
                <div className='hackathonpageMain'>
                    <div className='HackathonTitle'>
                        {name}
                    </div>
                    <div className='hackathonRow'> 
                        <div className='hackathonLeft'>
                            <DescriptionIcon/>
                            <span className='hackathonText'>
                                Description
                            </span>
                        </div>
                          <div className='hackathonRight'>
                            <span className='hackathonText'>
                                {description}
                            </span>
                        </div>
                    </div>
                    <div className='hackathonRow'> 
                        <div className='hackathonLeft'>
                            <CalendarMonthIcon/>
                            <span className='hackathonText'>
                                Date
                            </span>
                        </div>
                          <div className='hackathonRight'>
                            <span className='hackathonText'>
                                {hacakthonDate}
                            </span>
                        </div>
                    </div>
                     <div className='hackathonRow'> 
                        <div className='hackathonLeft'>
                            <AccessTimeIcon/>
                            <span className='hackathonText'>
                                Time
                            </span>
                        </div>
                          <div className='hackathonRight'>
                            <span className='hackathonText'>
                                {hackathonTime}
                            </span>
                        </div>
                    </div>
                    <div className='hackathonRow'> 
                        <div className='hackathonLeft'>
                            <LocationOnIcon/>
                            <span className='hackathonText'>
                                Location
                            </span>
                        </div>
                          <div className='hackathonRight'>
                            <span className='hackathonText'>
                                {hackathonLocation}
                            </span>
                        </div>
                    </div>
                    <div className='hackathonRow'> 
                        <div className='hackathonLeft'>
                            <EmojiEventsIcon/>
                            <span className='hackathonText'>
                                Winning Points
                            </span>
                        </div>
                          <div className='hackathonRight'>
                            <span className='hackathonText'>
                                {winningPoints}
                            </span>
                        </div>
                    </div>
                    <div className='hackathonRow'> 
                        <div className='hackathonLeft'>
                            <GroupIcon/>
                            <span className='hackathonText'>
                                Max Team Size
                            </span>
                        </div>
                          <div className='hackathonRight'>
                            <span className='hackathonText'>
                                {maxTeamSize}
                            </span>
                        </div>
                    </div>
                    <div className='hackathonRow'> 
                        <div className='hackathonLeft'>
                            <PeopleOutlineIcon/>
                            <span className='hackathonText'>
                                Current Participants
                            </span>
                        </div>
                          <div className='hackathonRight'>
                            <span className='hackathonText'>
                                {currentParticipants}
                            </span>
                        </div>
                    </div>
                     <div className='hackathonRowEnd'> 
                            <div>
                            </div>  
                          <div className='hackathonRight'>
                            <button className='ViewAllButton'
                            onClick={clickedParticipants}
                            >{buttonText}</button>
                        </div>
                    </div>
                    {viewParticipants ?(
                        participants.map((participant) => (
                            <div className='hackathonRow'>
                                <div className='hackathonLeft'>
                                    <span className='hackathonText'>
                                        {participant.userName}
                                    </span>
                                </div>
                                <div className='hackathonRight'>
                                    <span className='hackathonTextBlue'>
                                        {participant.userEmail}
                                    </span>
                                </div>
                            </div>
                        ))
                    ):(
                        <div>
                        </div>
                    )}
                </div>
                <Rightbar profile={"home"}/>
            </div>
        </>   
    );
}
