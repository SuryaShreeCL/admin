import React from 'react';
import { ButtonBox, buttonTheme } from '../../../Assets/StyledTest';
import { ThemeProvider } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Triangle from '../../../Assets/icons/Triangle.svg';

function Buttons(props) {
  const { handleSaveClick, handleCancelClick } = props;
  return (
    <ButtonBox>
      <ThemeProvider theme={buttonTheme}>
        <Button variant='outlined' color='primary' onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button variant='contained' color='primary' onClick={handleSaveClick}>
          Save
        </Button>
      </ThemeProvider>
    </ButtonBox>
  );
}

export default Buttons;
