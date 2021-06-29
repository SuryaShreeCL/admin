import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const CustomTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'lightgrey',
        borderRadius: '50px',
      },
    },
  },
})(TextField);

export default function RoundedInput(props) {
  const { name, label, value, error = null, onChange, ...other } = props;
  return (
    <CustomTextField
      variant='outlined'
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
