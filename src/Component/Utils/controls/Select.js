import React from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from '@material-ui/core';

export default function Select(props) {
  const { name, label, value, onChange, options, size = '200px' } = props;

  return (
    <FormControl variant='outlined' style={{ width: size }}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value=''>None</MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.title || item.name}>
            {item.title || item.name}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
