
import './share.css';
import {PermMedia ,Label,Room} from '@mui/icons-material';

export default function Share() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/assets/person/1.jpg" alt="" />
          <input
            placeholder="What is bugging you today?"
            className="shareInput"
          />
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    <PermMedia htmlColor="#ff3300" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                </div>
                <div className="shareOption">
                    <Label htmlColor="#ff9900" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="#0066ff" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
               
            </div>
            <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
}