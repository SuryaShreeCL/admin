import React from 'react';
import { Grid } from '@material-ui/core';

function DropDownRack() {
  return (
    <Grid>
      <Grid xs={12} sm={4}>
        <DropDownRack />
      </Grid>
      <Grid xs={12} sm={4}>
        <DropDownRack />
      </Grid>
      <Grid xs={12} sm={4}>
        <DropDownRack />
      </Grid>
      <Grid xs={12} sm={4}>
        <DropDownRack />
      </Grid>
      <Grid xs={12} sm={4}>
        <DropDownRack />
      </Grid>
      <Grid xs={12} sm={4}>
        <DropDownRack />
      </Grid>
    </Grid>
  );
}

export default DropDownRack;
