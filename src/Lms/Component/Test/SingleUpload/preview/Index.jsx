import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Transition from '../../../../Utils/Transition';
import GmatPreview from './gmat/Index';
import '../../../../Assets/css/Preview/Preview.css';
import GrePreview from './gre/Test';
import DefaultPreview from './exam/Index';

function Index(props) {
  useEffect(() => {
    if (props.open) window.addEventListener('click', handleClick, true);
  }, [props.open]);

  const handleClick = () => {
    window.removeEventListener('click', handleClick, true);
    props.handleClose();
  };

  const courseTitle = sessionStorage.getItem('courseTitle');
  const testType = sessionStorage.getItem('testType');

  switch (testType) {
    case 'CALIBRATION': {
      if (courseTitle === 'GMAT') {
        return (
          <Dialog fullScreen TransitionComponent={Transition} open={props.open}>
            <GmatPreview {...props} />
          </Dialog>
        );
      } else if (courseTitle === 'GRE') {
        return (
          <Dialog fullScreen TransitionComponent={Transition} open={props.open}>
            <GrePreview {...props} />
          </Dialog>
        );
      } else {
        return (
          <Dialog fullScreen TransitionComponent={Transition} open={props.open}>
            <DefaultPreview {...props} />
          </Dialog>
        );
      }
      break;
    }
    default:
      return (
        <Dialog fullScreen TransitionComponent={Transition} open={props.open}>
          <DefaultPreview {...props} />
        </Dialog>
      );
  }
}

export default Index;
