import React from "react";
import "./RightBar.css";

function RightBar(props) {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <h4 className="rightbarTitle">Things You Might be Intersted In</h4>
        <img
          className="rightbarAd"
          src="https://cdn1.vectorstock.com/i/1000x1000/94/60/program-coding-advertising-posters-set-vector-30489460.jpg"
          alt=""
        />
        <img
          className="rightbarAd"
          src="https://m.media-amazon.com/images/I/51xhK2j3r+L._AC_SY780_.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default RightBar;
