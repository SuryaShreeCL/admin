/**
 * (c) CareerLabs. All rights reserved.
 **/

import { Dialog, ThemeProvider, Typography } from '@material-ui/core';
import React from 'react';
import {
  CloseSharp,
  gmatTheme,
  IconButton,
} from '../../../../../../Assets/css/Preview/GmatStyles';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '../../../../../../Assets/css/Preview/GreStyles';

function Confirmation({ onYes, onNo, open }) {
  return (
    <ThemeProvider theme={gmatTheme}>
      <Dialog fullWidth maxWidth={'xs'} open={open}>
        <DialogTitle disableTypography>
          <span className='confirmation_dialog_header'>
            Answer Confirmation
          </span>
          <IconButton onClick={onNo}>
            <CloseSharp color='secondary' />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant='h4' className='confirmation_dialog_body'>
            Click Yes to confirm your answer and continue to the next Question
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={onYes}>
            Yes
          </Button>
          <Button variant='contained' onClick={onNo}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default Confirmation;
