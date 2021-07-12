import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => <MuiAlert elevation={6} variant='filled' {...props} />;

const ScheduledPost = () => {
  return (
    <div style={{ width: '30%', margin: '5rem auto' }}>
      <Alert severity='info'>Coming Soon</Alert>
    </div>
  );
};

export default ScheduledPost;
