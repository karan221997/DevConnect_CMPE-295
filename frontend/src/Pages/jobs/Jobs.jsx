import './jobs.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Jobtile from "../../components/jobtile/Jobtile";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
//material UI modal
import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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


export default function Jobs() {
    const [open, setOpen] = useState(false);
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [jobsalary , setJobsalary] = useState("");
    const [Company, setCompany] = useState("");
    const [Skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [jobData , setJobData] = useState([]);
    
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const fetchJobs = async () => {
        const result = await axios.get("api/job");
        setJobData(result.data);
    }

     const Submit = async () => {
       
        const job = {
        title: jobTitle,
        description: jobDescription,
        location: jobLocation,
        salary: jobsalary,
        company: Company,
        skills: Skills,
        experience: experience,
        type: jobType,
        };
         setOpen(false);
        //send data to backend
       const res = await axios.post("api/job/", job);
       if(res.status === 200) {
              console.log("job added successfully");
             fetchJobs();
       }
       else {
           console.log("error");
       }

    };

      useEffect(() => {
    fetchJobs();
  }, [open]);

    
   


    return (
        <>
             <Topbar />
            <div className="jobs">
                <Sidebar />
                <div className="jobsRight">
                           {jobData.map((data) => (
                        <Jobtile data={data} />
                    ))}   
                </div>
                 <ThemeProvider theme={theme}>
                        <div className="jobsFloating">
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
                                Create New Job Posting
                            </span>
                            <IconButton onClick={handleClose} >
                                <CloseRoundedIcon sx={{
                                    color: 'white',
                                }} />
                            </IconButton>
                        </div>
                        <div className="modalMiddle">
                            <TextField label="Jobs Title" variant="outlined" margin='dense' 
                            onChange={(e) => setJobTitle(e.target.value)} />
                            <TextField label="Jobs Description" variant="outlined"
                                multiline
                                rows={2}
                                margin='dense'
                                onChange={(e) => setJobDescription(e.target.value)} />
                            
                             <TextField label="Company" variant="outlined" margin='dense'
                             onChange={(e) => setCompany(e.target.value)} />
                            <div className='modalMiddleRowSeparation'>
                               <TextField label="Location" variant="outlined" margin='dense' 
                               onChange={(e) => setJobLocation(e.target.value)} 
                               />
                               <TextField label="Salary" variant="outlined" margin='dense' type="number"
                               onChange={(e) => setJobsalary(e.target.value)} 
                               />
                            </div>
                             <TextField label="Skills Required" variant="outlined" margin='dense'
                             onChange={(e) => setSkills(e.target.value)}
                             />
                            <div className='modalMiddleRowSeparation'>
                                <TextField label="type" variant="outlined" margin='dense' 
                                onChange={(e) => setJobType(e.target.value)}
                                />
                                <TextField label="Experience" variant="outlined" margin='dense' 
                                onChange={(e) => setExperience(e.target.value)}
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