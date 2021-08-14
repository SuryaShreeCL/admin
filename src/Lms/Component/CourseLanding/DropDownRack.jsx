import React, { useState } from 'react';
import { FormControl, InputLabel, Select, Grid } from '@material-ui/core';

import { createTheme, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import DropDown from '../../Utils/DropDown';

export default function DropDownRack() {
  const [value, setValue] = useState(0);
  const handleChange = event => {
    setValue(event.target.value);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <DropDown
          label='Subject'
          items={[
            { value: 1, label: 'GRE' },
            { value: 2, label: 'GMAT' },
            { value: 3, label: 'TOFEL' },
          ]}
          value={value}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <DropDown
          label='Course'
          items={[
            { value: 1, label: 'Verbal' },
            { value: 2, label: 'Quantitative' },
          ]}
          value={value}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <DropDown
          label='Concept'
          items={[
            { value: 1, label: 'Grammar' },
            { value: 2, label: 'Confidence' },
          ]}
          value={value}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
}
