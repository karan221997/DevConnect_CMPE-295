import './jobtile.css';
//material UI icon
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
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

export default function Jobtile() {

//change date format


    return (
        <>
            <div className="jobtile">
                <ThemeProvider theme={theme}>
                    <div className="jobtileTop">
                        <span className="jobtileTopTittle">
                          "name"
                            <Tooltip title="decribtion">
                            <InfoOutlinedIcon sx={{
                                color: '#808080',
                                fontSize: '1.2rem',
                                marginBottom: '0.8rem',
                                marginTop: '0.1rem',
                                cursor: 'pointer'
                            }} />
                            </Tooltip>
                        </span>
                    </div>
                    <div className="jobtileMiddle">
                        <div className="middleInfo">
                            <AccessTimeOutlinedIcon sx={{
                                color: '#808080',
                                fontSize: '1.5rem',

                            }} />
                            <span className="middleInfoText">
                                 "date1" at "time1"
                            </span>
                        </div>
                        <div className="middleInfo">
                            <LocationOnOutlinedIcon sx={{
                                color: '#808080',
                                fontSize: '1.5rem',

                            }} />
                            <span className="middleInfoText">
                                "location"
                            </span>
                        </div>
                        <div className="middleInfo">
                            <GroupOutlinedIcon sx={{
                                color: '#808080',
                                fontSize: '1.5rem',

                            }} />
                            <span className="middleInfoText">
                                "maxTeamSize"
                            </span>
                        </div>
                        <div className="middleInfo">
                            <EmojiEventsOutlinedIcon sx={{
                                color: '#808080',
                                fontSize: '1.5rem',

                            }} />
                            <span className="middleInfoText">
                                "winningPoints"
                            </span>
                        </div>
                    </div>
                    <div className="jobtileBottom">
                        <span className="jobtileBottomButtons">
                            <Button variant="outlined"> Participate </Button>
                        </span>
                    </div>
                </ThemeProvider>
            </div>
        </>
    );
}