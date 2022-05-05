import React, { useContext } from 'react';
import "./login.css";
import { useRef } from "react";
import {loginCall} from "../../apiCalls";
import { AuthContext } from '../../context/AuthContext';

export default function Login() {

  const email = useRef();
  const password = useRef();
  const {user,isFetching,error,dispatch} = useContext(AuthContext);

  const handleLoginClick = (e) => {

    e.preventDefault();
    console.log("clicked submit of login");
    console.log("email:" + email.current.value);
    console.log("password:" + password.current.value);
    loginCall({email:email.current.value,password:password.current.value},dispatch);
  }



  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h1 className="loginLogo">DevConnect</h1>
          <span className="loginDesc">
            One Bug At A Time.
          </span>
        </div>
        <div className="loginRight" onSubmit={handleLoginClick}>
          <form className="loginBox">
            <input placeholder="Email" type="email" required ref={email} className="loginInput" />
            <input placeholder="Password" type="password" ref={password} required className="loginInput" />
            <button className="loginButton">Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <span className="adminLogin">Admin Login?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}