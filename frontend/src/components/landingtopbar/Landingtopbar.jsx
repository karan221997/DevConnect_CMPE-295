import './landingtopbar.css';
export default function Landingtopbar() {
    return (
        <div className="landingtopbarContainer">
           <div className="landingtopbarLeft">
                <span className="logo">Dev Connect</span>
           </div>
           <div className="landingtopbarRight">
                <div className='landingtopbarButtons'>
                     <button className="loginButton"> Login</button>       
                     <button  className="signupButton"> Sign UP</button>        
                </div>               
           </div>
        </div>
    );
}
