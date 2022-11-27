import './hackathon.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Hackathontile from "../../components/hackathontile/Hackathontile";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
//material UI modal
import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import axios from 'axios';

//creating theme to override material UI colors
const theme = createTheme({
    palette: {
        primary: {
            main: grey[900],
        },
        secondary: {
            main: red[500],
        },
    },
});


export default function Hackathon() {
     const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(Date ? Date : null);
    const [time, setTime] = useState(Date ? Date : null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [Location, setLocation] = useState("");
    const [winningPoints, setWinningPoints] = useState("");
    const [maxTeamSize, setMaxTeamSize] = useState("");
    const [hackathonData , setHackathonData] = useState([]);
    
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
 async function fetchhackathons() {
       const result =  await axios.get("api/hackathon");
       setHackathonData(result.data);
    }

   useEffect(() => {
    fetchhackathons();
  }, [open]);


    const Submit = () => {
        const data = {
            name : title,
            description : description,
            location : Location,
            date : value,
            time : time,
            winningPoints : winningPoints,
            maxTeamSize : maxTeamSize
        }
        setOpen(false);
        //send data to backend
       const res = axios.post("api/hackathon/", data);
       if(res.status === 200) {
             fetchhackathons();
       }
       else {
           console.log("error");
       }
        
    }

    return (
        <>
             <Topbar />
            <div className="hackathon">
                <Sidebar />
                <div className="hackathonRight">
                   {hackathonData.map((data) => (
                             <Hackathontile key={data._id} data={data} />       
                    ))}           
                </div>
                 <ThemeProvider theme={theme}>
                        <div className="hackathonFloating">
                            <Fab color="primary" aria-label="add">
                                <AddIcon onClick={handleOpen} />
                            </Fab>
                        </div>
                    </ThemeProvider>
            </div>
            <ThemeProvider theme={theme}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    disableEnforceFocus
                   
                >
                    <div className='ModalPosition'>
                        <div className="ModalTop">
                            <span className="ModalHeader">
                                Create New Hackathon
                            </span>
                            <IconButton onClick={handleClose} >
                                <CloseRoundedIcon sx={{
                                    color: 'white',
                                }} />
                            </IconButton>
                        </div>
                        <div className="modalMiddle">
                            <TextField label="Hackathon Tittle" variant="outlined" margin='dense' 
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            />
                            <TextField label="Hackathon Description" variant="outlined"
                                multiline
                                rows={4}
                                margin='dense'
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                
                            />
                            <div className='modalMiddleRowSeparation'>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Start Date"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField margin='dense' {...params} />}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        label="Time"
                                        value={time}
                                        onChange={(newValue) => {
                                            setTime(newValue);
                                        }}
                                        renderInput={(params) => <TextField margin='dense' {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <TextField label="winning points" variant="outlined" margin='dense' 
                            onChange={(e) => {
                                setWinningPoints(e.target.value);
                            }}
                            />
                            <div className='modalMiddleRowSeparation'>
                                <TextField label="Location" variant="outlined" margin='dense'
                                onChange={(e) => {
                                    setLocation(e.target.value);
                                }}
                                 />
                                <TextField label="Max Team Size" variant="outlined" margin='dense' 
                                onChange={(e) => {
                                    setMaxTeamSize(e.target.value);

                                }}
                                />
                            </div>
                        </div>
                        <div className="modalBottom">
                            <Button variant="outlined"
                                onClick={Submit}
                            > Submit </Button>
                        </div>
                    </div>
                </Modal>
            </ThemeProvider> 
           
        </>
    );
}