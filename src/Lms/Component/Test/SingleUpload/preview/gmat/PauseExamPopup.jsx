/**
 * (c) CareerLabs. All rights reserved.
 **/

import React from 'react';
import Model from '../../../../../utils/Model';
import PauseModelIcon from '../../../../../Assets/icons/pause.svg';
import {
  PauseModelTitle,
  PauseModelSubTitle,
  QuitButton,
  ContinueButton,
} from '../../../../../assets/css/test/TestComponent';
import Box from '@material-ui/core/Box';

function PauseExamPopup(props) {
  return (
    <Model open={props.state.modelOpen}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        p={5}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box>
          <img src={PauseModelIcon} alt='' />
        </Box>
        <PauseModelTitle>Test Paused</PauseModelTitle>
        <PauseModelSubTitle>
          Press "Continue" to continue the test
        </PauseModelSubTitle>
        <Box display={'flex'} gridGap={25}>
          <QuitButton onClick={props.pauseExam}>Quit</QuitButton>
          <ContinueButton onClick={props.handleContinueClick}>
            Continue
          </ContinueButton>
        </Box>
      </Box>
    </Model>
  );
}

export default PauseExamPopup;
