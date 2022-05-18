import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
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
      
    label: 'Image 1',
    imgPath:
      'https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2021/02/T-Mobile-header.jpg?w=2000&quality=82&strip=all&ssl=1',
  },
  {
    label: 'Image 2',
    imgPath:
      'https://i.ytimg.com/vi/kfaIZsWoIr8/maxresdefault.jpg',
  },
  {
    label: 'Image 3',
    imgPath:
      'http://highergroundtv.com/wp-content/uploads/2015/04/iWatchHG1.jpg',
  },
  {
    label: 'Image 4',
    imgPath:
      'https://cdn.arstechnica.net/wp-content/uploads/2019/04/Oculus-Quest-2-760x380.jpg',
  },
];

export default function Addvertisement() {
  const theme = useTheme();
  const maxSteps = images.length;

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
      <AutoPlaySwipeableViews>
        {images.map((step ,key) => (
          <div key={step.label}>
            { (
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
            ) }
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
    </ThemeProvider>
    </div>
  );
}

