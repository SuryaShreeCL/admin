import { LinearProgress, Typography, Button, withStyles } from '@material-ui/core';
import React from 'react';
import { FileHeaderContainer } from '../../Assets/Styles/FileHeaderStyles';
import { bytesToSize } from '../../../Utils/Helpers';

export function FileProgress({ file, progress, message }) {
  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
      width: '100%',
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: !message.success ? '#ff2b2b' : '#06a92c',
    },
  }))(LinearProgress);
  return (
    <FileHeaderContainer>
      <div className='img-container'>
        <img
          src='https://cdn-icons-png.flaticon.com/512/1205/1205526.png'
          alt='upload-img'
          width='60px'
        />
      </div>
      <div className='img-details'>
        <Typography variant='caption' color='textSecondary'>
          {file.name}
        </Typography>
        <div className='img-progress'>
          <BorderLinearProgress variant='determinate' value={progress} />
        </div>
        <div className='img-info'>
          <Typography variant='caption' color='textSecondary'>
            {bytesToSize(file.size)}
          </Typography>
          {!message?.success && (
            <Typography variant='caption' style={{ color: 'red' }}>
              {message.message}
            </Typography>
          )}
          {!isNaN(Math.round(progress)) && (
            <Typography variant='caption' color='textSecondary'>{`${Math.round(
              progress
            )}%`}</Typography>
          )}
        </div>
      </div>
    </FileHeaderContainer>
  );
}
