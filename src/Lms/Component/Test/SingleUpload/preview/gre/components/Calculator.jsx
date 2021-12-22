import { Dialog, DialogTitle } from "@material-ui/core";
// import { ReactCalculator } from 'simple-react-calculator';

import React from "react";

export default function Calculator({ open, close }) {
  return (
    <Dialog fullWidth open={open} onClose={close}>
      {/* <ReactCalculator /> */}
    </Dialog>
  );
}
