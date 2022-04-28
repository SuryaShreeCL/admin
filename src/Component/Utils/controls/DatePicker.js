import React from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default function DatePicker(props) {
  const { name, label, value, onChange, width, InputProps, id } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant='inline'
        inputVariant='outlined'
        label={label}
        style={{ width: width ? width : '200px' }}
        format='MMM/dd/yyyy'
        name={name}
        value={value}
        InputProps={InputProps}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
        id={id}
      />
    </MuiPickersUtilsProvider>
  );
}
