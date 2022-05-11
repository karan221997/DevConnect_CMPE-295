import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { grey, red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const themeColor = createTheme({
    palette: {
        primary: {
            main: grey[900],
        },
        secondary: {
            main: red[500],
        },
    },
});


const images = [
  {
      
   
    imgPath:
      'https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2021/02/T-Mobile-header.jpg?w=2000&quality=82&strip=all&ssl=1',
  },
  {
   
    imgPath:
      'https://i.ytimg.com/vi/kfaIZsWoIr8/maxresdefault.jpg',
  },
  {
   
    imgPath:
      'http://highergroundtv.com/wp-content/uploads/2015/04/iWatchHG1.jpg',
  },
  {
    
    imgPath:
      'https://cdn.arstechnica.net/wp-content/uploads/2019/04/Oculus-Quest-2-760x380.jpg',
  },
];

export default function Addvertisement() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className='rightbarAd'>
    <ThemeProvider theme={themeColor}>
    <Box sx={{ 
    maxWidth: 400,
     flexGrow: 1,
     color: 'primary',
     }}>
    
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'primary',
        }}
      >
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%',
                  color: 'primary',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="none" 
      />
     
    </Box>
    </ThemeProvider>
    </div>
  );
}

