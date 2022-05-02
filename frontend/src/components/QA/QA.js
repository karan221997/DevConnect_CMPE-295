import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



export default function SimpleAccordion() {
  return (
    <div>
        <h1>Question and Answer Forum</h1>
        
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography><b>Q. How to return the response from an asynchronous call?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          In the following we will look at three different solutions that are all building on top of each other:

Promises with async/await (ES2017+, available in older browsers if you use a transpiler or regenerator)
Callbacks (popular in node)
Promises with then() (ES2015+, available in older browsers if you use one of the many promise libraries)
All three are available in current browsers, and node 7+.
          </Typography>
        </AccordionDetails>
       
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography><b>Q. Event binding on dynamically created elements?</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          I have a bit of code where I am looping through all the select boxes on a page and binding a .hover event to them to do a bit of twiddling with their width on mouse on/off.

This happens on page ready and works just fine.

The problem I have is that any select boxes I add via Ajax or DOM after the initial loop won't have the event bound.

I have found this plugin (jQuery Live Query Plugin), but before I add another 5k to my pages with a plugin, I want to see if anyone knows a way to do this, either with jQuery directly or by another option.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}
