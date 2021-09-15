import React from 'react';
import { Grid } from '@material-ui/core';
import DropDown from '../../../Utils/DropDown';

function DropDownRack() {
  return (
    <div>
      <Grid container>
        <Grid xs={12} sm={4}>
          <DropDown />
        </Grid>
        <Grid xs={12} sm={4}>
          <DropDown />
        </Grid>
        <Grid xs={12} sm={4}>
          <DropDown />
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} sm={4}>
          <DropDown />
        </Grid>
        <Grid xs={12} sm={4}>
          <DropDown />
        </Grid>
        <Grid xs={12} sm={4}>
          <DropDown />
        </Grid>
      </Grid>
    </div>
  );
}

export default DropDownRack;
