import './hackathon.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Hackathontile from "../../components/hackathontile/Hackathontile";

export default function Hackathon() {

    return (
        <>
            <Topbar />
            <div className="hackathon">
                <Sidebar />
                <div className="hackathonRight">
                    <Hackathontile />
                    <Hackathontile />
                    <Hackathontile />
                    <Hackathontile />
                    <Hackathontile />
                    <Hackathontile />
                    <Hackathontile />
                    <Hackathontile />
                    <Hackathontile />
                    <Hackathontile />
                    <Hackathontile />
                    <Hackathontile />
                    <Hackathontile />
                    <Hackathontile />
                    <Hackathontile />
                    <Hackathontile />
                </div>
            </div>
        </>
    );
}