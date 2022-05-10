import './landingtopbar.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createTheme ,ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: '#f44336',
    },
  },
});


export default function Landingtopbar() {
  const navigate = useNavigate();
    return (
        <div className="landingtopbarContainer">
        
           <div className="landingtopbarLeft">
                <span className="logo">Dev Connect</span>
           </div>
           <div className="landingtopbarRight">
                <div className='landingtopbarButtons'>
               <ThemeProvider  theme={theme}>
                <Box
                     sx={{
                            '& > :not(style)': { m:2 ,width: '15ch',border :'1px solid black'},
                        }}
                    >
                     <Button variant="outlined" size='large'  onClick={()=> navigate("/login")}>Login</Button>      
                     <Button variant="contained" size='large'  onClick={()=> navigate("/Signup")}>Sign UP</Button>
                     
               </Box> 
              </ThemeProvider>            
                </div>               
           </div>
          
        </div>
    );
}
