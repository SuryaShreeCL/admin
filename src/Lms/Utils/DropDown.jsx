import React from 'react';
import {
  createTheme,
  FormControl,
  InputLabel,
  Select,
  ThemeProvider,
  MenuItem,
} from '@material-ui/core';

const selectTheme = createTheme({
  overrides: {
    MuiSelect: {
      select: {
        minWidth: '250px',
        maxWidth: '350px',
      },
    },
    // MuiInputLabel: {
    //   FormControl: {
    //     // top: '-6px',
    //     // left: '12px',
    //   },
    // },
    // MuiFormLabel: {
    //   root: {
    //     bottom: '6px !important',
    //   },
    // },
  },
});
export default function DropDown(props) {
  // label and items array as props
  const { label, items, value } = props;
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <ThemeProvider theme={selectTheme}>
        <FormControl>
          <InputLabel id={label}>{label}</InputLabel>

          <Select fullWidth variant='outlined' labelId={label} label={label}>
            {props.items !== undefined &&
              props.items.map(item => (
                <MenuItem value={item.value}>{item.label}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  );
}
