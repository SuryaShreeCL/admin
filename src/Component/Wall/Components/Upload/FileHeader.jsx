import { Grid, LinearProgress, Typography, Button, withStyles } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { FileHeaderContainer } from '../../Assets/Styles/FileHeaderStyles';
import Controls from '../../../Utils/controls/Controls';

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
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}

export function FileHeader({ file, onDelete, url, progress }) {
  return (
    <FileHeaderContainer>
      <div className='img-container'>
        <img
          src={
            url ?? 'https://i1.wp.com/bigtechquestion.com/wp-content/uploads/2020/09/Blue-spin.gif'
          }
          alt='upload-img'
          width='100px'
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
          <Typography variant='caption' color='textSecondary'>{`${Math.round(
            progress
          )}%`}</Typography>
        </div>
      </div>
      <Controls.ActionButton onClick={() => onDelete(file)}>
        <CloseIcon fontSize='small' color='secondary' />
      </Controls.ActionButton>
    </FileHeaderContainer>
  );
}
