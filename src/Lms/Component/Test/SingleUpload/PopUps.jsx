import React from 'react';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

function PopUps(props) {
  const { handlePopUpClose, alert } = props;
  //   console.log(handlePopUpClose);
  return (
    <Snackbar open={alert} onClose={handlePopUpClose}>
      <Alert
        // onClose={() => this.setState({ alertState: false })}
        autoHideDuration={6000}
        severity={alert === null ? '' : alert.severity}
        variant='filled'
      >
        {alert === null ? '' : alert.msg}
      </Alert>
    </Snackbar>
  );
}

export default PopUps;
