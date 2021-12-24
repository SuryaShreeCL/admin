import { Dialog } from '@material-ui/core';
import React from 'react';

export default function Calculator({ open, close }) {
  return <Dialog fullWidth open={open} onClose={close}></Dialog>;
}
