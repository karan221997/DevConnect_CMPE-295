import "./message.css";
// import { format } from "timeago.js";

export default function Message({ message, own }) {

  const timeElasped = new Date(message.createdAt).getTime() - new Date().getTime();
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
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="/assets/person/defaultProfilePiture.jpg"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{timeToDisplay}</div>
    </div>
  );
}