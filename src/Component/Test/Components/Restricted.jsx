import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => <MuiAlert elevation={6} variant='filled' {...props} />;

const Restricted = () => {
  return (
    <div style={{ width: '30%', margin: '5rem auto' }}>
      <Alert severity='error'>Permission denied</Alert>
    </div>
  );
};

export default Restricted;
