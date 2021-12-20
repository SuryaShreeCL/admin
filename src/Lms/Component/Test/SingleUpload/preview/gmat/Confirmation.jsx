/**
 * (c) CareerLabs. All rights reserved.
 **/

import React from "react";
import { Dialog, Typography } from "@material-ui/core";
import {
  DialogTitle,
  CloseSharp,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "../../../../../assets/css/GmatStyles";

function Confirmation({ onYes, onNo, open }) {
  return (
    <Dialog fullWidth maxWidth={"xs"} open={open}>
      <DialogTitle disableTypography>
        <span className="confirmation_dialog_header">Answer Confirmation</span>
        <IconButton onClick={onNo}>
          <CloseSharp color="secondary" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h4" className="confirmation_dialog_body">
          Click Yes to confirm your answer and continue to the next Question
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onYes}>
          Yes
        </Button>
        <Button variant="contained" color="primary" onClick={onNo}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Confirmation;
