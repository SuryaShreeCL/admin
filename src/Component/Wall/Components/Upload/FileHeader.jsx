import { Grid, LinearProgress, Typography, Button } from '@material-ui/core';
import React from 'react';

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}

export function FileHeader({ file, onDelete, url, progress }) {
  return (
    <Grid container direction='row' style={{ marginTop: 10 }}>
      <Grid item>
        <img src={url} alt='' width='100px' />
      </Grid>
      <Grid item>
        <Typography variant='caption' color='textSecondary'>
          {file.name}
        </Typography>
        <Grid item>
          <LinearProgress variant='determinate' value={progress} />{' '}
          <Button size='small' color='secondary' onClick={() => onDelete(file)}>
            Delete
          </Button>
        </Grid>
        <Grid item justify='space-between'>
          <Typography variant='caption' color='textSecondary'>{`${Math.round(
            progress
          )}%`}</Typography>
          <Typography variant='caption' color='textSecondary'>
            {bytesToSize(file.size)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
