import React from "react";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export const SnackBar = (props) => {
  const { open, snackClose, snackType, message } = props.snackData;
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={snackClose}>
      <Alert
        onClose={snackClose}
        severity={snackType}
        elevation={8}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
