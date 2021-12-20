/**
 * (c) CareerLabs. All rights reserved.
 **/

import React from "react";
import { Dialog, ThemeProvider, Typography } from "@material-ui/core";
import {
  //   DialogTitle,
  CloseSharp,
  //   DialogContent,
  //   DialogActions,
  //   Button,
  IconButton,
  gmatTheme,
} from "../../../../../../Assets/css/Preview/GmatStyles";

import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "../../../../../../Assets/css/Preview/GreStyles";

function Confirmation({ onYes, onNo, open }) {
  //   console.log(onYes, onNo);
  return (
    <ThemeProvider theme={gmatTheme}>
      <Dialog fullWidth maxWidth={"xs"} open={open}>
        <DialogTitle disableTypography>
          <span className="confirmation_dialog_header">
            Answer Confirmation
          </span>
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
          <Button variant="contained" onClick={onYes}>
            Yes
          </Button>
          <Button variant="contained" onClick={onNo}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default Confirmation;
