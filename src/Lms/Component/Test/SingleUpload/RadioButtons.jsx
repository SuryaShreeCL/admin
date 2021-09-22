import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Radio, T2 } from '../../../Assets/StyledTest';
import { Label } from '../../../Assets/StyledTest';

function RadioButtons(props) {
  let { checked, handleRadioChange, answerType, editData } = props;
  // console.log(editData);
  return (
    <FormControl
      className='radio_group_style'
      component='fieldset'
      // style={{ background: 'purple' }}
    >
      <RadioGroup
        row
        aria-label='choice'
        name='row-radio-buttons-group'
        onChange={handleRadioChange}
        value={answerType}
      >
        <FormControlLabel
          value='SINGLE_SELECT'
          control={<Radio color='primary' />}
          label={
            <Label active={answerType === 'SINGLE_SELECT'}>Single Choice</Label>
          }
          disabled={editData}
        />
        {!checked && (
          <>
            <FormControlLabel
              value='MULTI_CHOICE'
              control={<Radio color='primary' />}
              label={
                <Label active={answerType === 'MULTI_CHOICE'}>
                  Multi Choice
                </Label>
              }
              disabled={editData}
            />
            <FormControlLabel
              value='SUBJECTIVE'
              control={<Radio color='primary' />}
              label={
                <Label active={answerType === 'SUBJECTIVE'}>Subjective</Label>
              }
              disabled={editData}
            />
          </>
        )}
      </RadioGroup>
      {answerType && <T2>Correct Answer</T2>}
    </FormControl>
  );
}

export default RadioButtons;
