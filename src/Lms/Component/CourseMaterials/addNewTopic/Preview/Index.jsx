import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Transition from '../../../../Utils/Transition';
import TaskDetail from './testTopic/TaskDetail';

function Index(props) {
  useEffect(() => {
    if (props.open) window.addEventListener('click', handleClick, true);
  }, [props.open]);

  const handleClick = () => {
    window.removeEventListener('click', handleClick, true);
    props.handleClose();
  };

  return (
    <Dialog fullScreen TransitionComponent={Transition} open={props.open}>
      <TaskDetail {...props} />
    </Dialog>
  );
}

export default Index;
