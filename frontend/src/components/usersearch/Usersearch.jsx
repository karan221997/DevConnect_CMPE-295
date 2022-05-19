import './usersearch.css';
export default function Usersearch({user}) {
    return (
        <div className="usersearch">
            <div className="usersearchProfile">
                <img src="/assets/person/defaultProfilePiture.jpg" alt="" className="userserachImg" />
            </div>
            <div className="userSerachInformation">
                {user.userName}
            </div>
        </div>
    );
}
