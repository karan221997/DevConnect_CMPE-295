import './comment.css';
import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Comment({comment}) {

const timeElasped = new Date(comment.createdAt).getTime() - new Date().getTime();
const timeElaspedInMinutes = timeElasped / 60000;
const timeElaspedInMinutesRounded = Math.round(timeElaspedInMinutes)*-1;
//round to nearest minute and take modulus of 60 to get seconds
const timeElaspedInSeconds = Math.round(timeElaspedInMinutes % 60) ;
//round to nearest minute and take modulus of 60 to get minutes
const timeElaspedInSecondsRounded = Math.round(timeElaspedInMinutesRounded % 60)*-1;

const timeElaspedInHours = timeElaspedInMinutes / 60;
//round to nearest hour
const timeElaspedInHoursRounded = Math.round(timeElaspedInHours)*-1;
//round to nearest day
const timeElaspedInDays = timeElaspedInHours / 24;
const timeElaspedInDaysRounded = Math.round(timeElaspedInDays)*-1;
//round to nearest week
const timeElaspedInWeeks = timeElaspedInDays / 7;
const timeElaspedInWeeksRounded = Math.round(timeElaspedInWeeks)*-1;

let timeToDisplay = "";
if (timeElaspedInWeeksRounded > 0) {
  timeToDisplay = timeElaspedInWeeksRounded + " weeks ago";
} else if (timeElaspedInDaysRounded > 0) {
  timeToDisplay = timeElaspedInDaysRounded + " days ago";
} else if (timeElaspedInHoursRounded > 0) {
  timeToDisplay = timeElaspedInHoursRounded + " hours ago";
} else if (timeElaspedInMinutesRounded > 0) {
  timeToDisplay = timeElaspedInMinutesRounded + " minutes ago";
} else {
  timeToDisplay = timeElaspedInSecondsRounded + " seconds ago";
}

    return (
        <div className="comment">
           <div className="comment__top">
                <div className='comment__top_left'>
                    <img src={comment.commentCreatorProfilePicture} alt="" className="comment__top__left__image"></img>
                </div>
                <div className='comment__top__middle'>
                    <span className="comment__top__middle__username">
                        {comment.commentCreatorUserName}
                    </span>
                </div>

                <div className='comment__top__right'>
                    <AccessTimeIcon  htmlColor="grey" className="Comment__InfoIcons"/>
                    <span className="commentDate">{timeToDisplay}</span>
                </div>
           </div>
              <div className="comment__bottom">
                    <span className="comment__bottom__text">
                        {comment.commentText}
                    </span>
              </div>
        </div>
    )
}