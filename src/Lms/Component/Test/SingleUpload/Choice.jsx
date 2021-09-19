import React from 'react';
import { T1, C1, Checkbox, FormControlLabel } from '../../../Assets/StyledTest';
import InputBox from './InputBox';
import CheckedIcon from '../../../Assets/icons/Checked.svg';
import UnCheckedIcon from '../../../Assets/icons/UnChecked.svg';
import { Button, ThemeProvider, createTheme } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';
// import { ThemeProvider } from 'styled-components';
// import { FormControlLabel } from '@material-ui/core';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

function Choice(props) {
  const {
    noOfChoices,
    handleCheckBoxes,
    handleAddOption,
    handleImageUpload,
    bucketArray,
    activeTab,
  } = props;
  return (
    <div>
      {bucketArray[activeTab].choices.map((choice, index) => {
        return (
          <C1>
            <T1>{LETTERS[index]}</T1>
            <InputBox boxType='text' handleImageUpload={handleImageUpload} />
            <FormControlLabel
              disabledRipple
              control={
                <Checkbox
                  value={index}
                  checked={choice.selected}
                  onChange={e => handleCheckBoxes(e)}
                  disableRipple
                  icon={<img src={UnCheckedIcon} alt='' />}
                  checkedIcon={<img src={CheckedIcon} alt='' />}
                />
              }
            />
          </C1>
        );
      })}
      <ThemeProvider theme={buttonTheme}>
        <Button
          variant='text'
          startIcon={<AddRounded />}
          onClick={handleAddOption}
        >
          Add Option
        </Button>
      </ThemeProvider>
    </div>
  );
}

const buttonTheme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '16px',
        lineHeight: '16px',
        textAlign: 'right',
        background: 'white',
        color: '#1093FF',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'white',
        },
        marginLeft: '40px',
        marginTop: '26px',
      },
    },
  },
});

export default Choice;
