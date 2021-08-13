import React, { useState } from 'react';
import { FormControl, InputLabel, Select, Grid } from '@material-ui/core';

import { createTheme, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import DropDown from '../../Utils/DropDown';

const useStyles = makeStyles(theme => ({
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120,
  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },
}));

export default function DropDownRack() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = event => {
    setValue(event.target.value);
  };
  console.log(value);
  return (
    <Grid container>
      <Grid item xs={12} lg={4}>
        <DropDown
          label='Subject'
          items={[
            { value: 1, label: 'One' },
            { value: 2, label: 'Two' },
            { value: 3, label: 'Three' },
          ]}
          value={value}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <DropDown
          label='Subject'
          items={[
            { value: 1, label: 'One' },
            { value: 2, label: 'Two' },
            { value: 3, label: 'Three' },
          ]}
          value={value}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <DropDown
          label='Subject'
          items={[
            { value: 1, label: 'One' },
            { value: 2, label: 'Two' },
            { value: 3, label: 'Three' },
          ]}
          value={value}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
}
