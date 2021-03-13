import React from 'react';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';

export default function Select(props) {
  const { name, label, value, error = null, onChange, options } = props;

  return (
    <FormControl
      variant='outlined'
      style={{ width: '200px', margin: '10px' }}
      {...(error && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value=''>None</MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.title || item.name}>
            {item.title || item.name}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
