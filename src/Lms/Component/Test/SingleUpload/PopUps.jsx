import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React from "react";

function PopUps(props) {
  const { handlePopUpClose, alert } = props;
  return (
    <Snackbar open={alert} onClose={handlePopUpClose}>
      <Alert
        autoHideDuration={6000}
        severity={alert === null ? "" : alert.severity}
        variant="filled"
      >
        {alert === null ? "" : alert.msg}
      </Alert>
    </Snackbar>
  );
}

export default PopUps;
