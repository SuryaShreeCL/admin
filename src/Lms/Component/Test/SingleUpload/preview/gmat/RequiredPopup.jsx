/**
 * (c) CareerLabs. All rights reserved.
 **/
import { Dialog, Typography } from '@material-ui/core';
import React from 'react';
import {
  Button,
  CloseSharp,
  DialogActions,
  DialogContent2,
  DialogTitle,
  IconButton,
} from '../../../../../assets/css/GmatStyles';

function RequiredPopup({ onOk, open }) {
  return (
    <Dialog fullWidth maxWidth={'xs'} open={open}>
      <DialogTitle disableTypography>
        <span className='confirmation_dialog_header'>Answer Required</span>
        <IconButton onClick={onOk}>
          <CloseSharp color='secondary' />
        </IconButton>
      </DialogTitle>
      <DialogContent2>
        <Typography variant='h4' className='confirmation_dialog_body'>
          You can not continue with this question unanswered
        </Typography>
      </DialogContent2>
      <DialogActions>
        <Button variant='contained' color='primary' onClick={onOk}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RequiredPopup;
