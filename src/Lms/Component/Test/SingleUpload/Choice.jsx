import React from 'react';
import { T1, C1 } from '../../../Assets/StyledTest';
import InputBox from './InputBox';
import CheckedIcon from '../../../Assets/icons/Checked.svg';
import UnCheckedIcon from '../../../Assets/icons/UnChecked.svg';
import { FormControl, Checkbox, FormControlLabel } from '@material-ui/core';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

function Choice(props) {
  const { noOfChoices } = props;
  console.log(noOfChoices);
  return (
    <div>
      {[...Array(noOfChoices)].map((choice, index) => {
        return (
          <C1>
            <T1>{LETTERS[index]}</T1>
            <InputBox boxType='text' />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<img src={UnCheckedIcon} alt='' />}
                  checkedIcon={<img src={CheckedIcon} alt='' />}
                />
              }
            />
          </C1>
        );
      })}
    </div>
  );
}

export default Choice;
