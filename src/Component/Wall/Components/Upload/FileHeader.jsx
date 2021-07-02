import { Button, Grid } from '@material-ui/core';
import React from 'react';

export function FileHeader({ file, onDelete }) {
  return (
    <Grid
      container
      justify='space-between'
      direction='row'
      alignItems='center'
      style={{ marginTop: 10 }}
    >
      <Grid item>{file.name}</Grid>
      <Grid item spacing={2}>
        <Button size='small' color='secondary' onClick={() => onDelete(file)}>
          Delete
        </Button>
      </Grid>
    </Grid>
  );
}
