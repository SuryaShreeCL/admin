import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Radio } from '../../../Assets/StyledTest';
import { Label } from '../../../Assets/StyledTest';

function RadioButtons(props) {
  let { checked, handleRadioChange, answerType } = props;
  console.log(answerType === 'singleChoice');
  return (
    <FormControl className='radio_group_style' component='fieldset'>
      <RadioGroup
        row
        aria-label='choice'
        name='row-radio-buttons-group'
        onChange={handleRadioChange}
        value={answerType}
      >
        <FormControlLabel
          value='singleChoice'
          control={<Radio color='primary' />}
          label={
            <Label active={answerType === 'singleChoice'}>Single Choice</Label>
          }
        />
        {!checked && (
          <>
            <FormControlLabel
              value='multiChoice'
              control={<Radio color='primary' />}
              label={
                <Label active={answerType === 'multiChoice'}>
                  Multi Choice
                </Label>
              }
            />
            <FormControlLabel
              value='subjective'
              control={<Radio color='primary' />}
              label={
                <Label active={answerType === 'subjective'}>Subjective</Label>
              }
            />
          </>
        )}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioButtons;
