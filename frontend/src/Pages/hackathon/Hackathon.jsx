import './hackathon.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Hackathontile from "../../components/hackathontile/Hackathontile";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
//material UI modal
import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

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
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(Date ? Date : null);
    const [time, setTime] = useState(Date ? Date : null);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
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
                    <ThemeProvider theme={theme}>
                        <div className="hackathonFloating">
                            <Fab color="primary" aria-label="add">
                                <AddIcon onClick={handleOpen} />
                            </Fab>
                        </div>
                    </ThemeProvider>
                </div>
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
                            <TextField label="Hackathon Tittle" variant="outlined" margin='dense' />
                            <TextField label="Hackathon Description" variant="outlined"
                                multiline
                                rows={4}
                                margin='dense'
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
                            <TextField label="winning points" variant="outlined" margin='dense' />
                            <div className='modalMiddleRowSeparation'>
                                <TextField label="Location" variant="outlined" margin='dense' />
                                <TextField label="Max Participants" variant="outlined" margin='dense' />
                            </div>
                        </div>
                        <div className="modalBottom">
                            <Button variant="outlined"> Submit </Button>
                        </div>
                    </div>
                </Modal>
            </ThemeProvider>

        </>
    );
}