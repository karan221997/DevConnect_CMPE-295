import "./signup.css";

export default function Signup() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h1 className="loginLogo">DevConnect</h1>
          <span className="loginDesc">
            One Bug At A Time
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Username" className="loginInput" />
            <input placeholder="Phone Number" className="loginInput" />
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            <input placeholder="Password Again" className="loginInput" />
            <button className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}