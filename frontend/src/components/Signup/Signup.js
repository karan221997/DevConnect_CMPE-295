import "./signup.css";
import { useRef,useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

export default function Signup() {

  const userName = useRef();
  const phoneNumber = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  

  const handleClick = async (e) => {

    e.preventDefault();
    console.log("clicked submit of signup");
    console.log("email:" + email.current.value);
    console.log("password:" + password.current.value);

    if (password.current.value !== passwordAgain.current.value) {
      console.log("password not matched");
      passwordAgain.current.setCustomValidity("Passwords does not match");
    } else {
      const user = {
        email:email.current.value,
        userName: userName.current.value,
        phoneNumber: phoneNumber.current.value,
        password: password.current.value,
        passwordAgain: passwordAgain.current.value
      }
      try {
         await axios.post("/api/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }


    }



  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h1 className="loginLogo">DevConnect</h1>
          <span className="loginDesc">
          Making Developers Life Easy.<br></br> One Bug At A Time.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" ref={userName} required className="loginInput" />
            <input placeholder="Phone Number" ref={phoneNumber} required className="loginInput" />
            <input placeholder="Email" type="email" ref={email} required className="loginInput" />
            <input placeholder="Password" type="password" ref={password} required className="loginInput" />
            <input placeholder="Password Again" type="password" ref={passwordAgain} required className="loginInput" />
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton" onClick={()=> navigate("/Login")}>
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}