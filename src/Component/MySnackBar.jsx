import React from 'react'
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function MySnackBar(props) {
    return (
        <Snackbar
        open={props.snackOpen}
        autoHideDuration={2000}
        onClose={props.onClose}
      >
        <Alert
          variant="filled"
          severity={props.snackVariant}
        >
          {props.snackMsg}
        </Alert>
      </Snackbar>
        
    )
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default MySnackBar
