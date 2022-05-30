import './usersearch.css';
import StarPurple500SharpIcon from '@mui/icons-material/StarPurple500Sharp';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useReducer } from 'react';

export default function Usersearch({user, setSearchPopper, setSearchText}) {
    const navigate = useNavigate();
    
    const handleuserNameClick = (e) => {
        //redirect to user profile page and render the user profile page
         navigate("/profile", { state: { user } });

    }

    return (
        <div className="usersearch">
            <div className="usersearchProfile">
                <img src="/assets/person/defaultProfilePiture.jpg" alt="" className="userserachImg" />
            </div>
            <div className="userSerachInformation">
                 <div className="userInformationTop">
                   <span className="userNameInformation"
                    onClick={handleuserNameClick}>
                        <u>{user.userName}</u>
                   </span>
                   <span className="usserInformationBio">
                       <FiberManualRecordIcon
                       fontSize='smallest'
                       /> Expert in cpp and React
                   </span>
                 </div>
                 <div className="userinformationBottom">
                    <span className="userNameInformationReputation">
                        Reputation 
                   </span>
                   <StarPurple500SharpIcon htmlColor='#FFDB00'/>
                   <span className="userInformationReputation">
                    {/* +{user.reputationRating} */}
                    +23
                   </span>
                 </div>
            </div>
        </div>
    );
}
