import { Grid, LinearProgress, Typography, Button, withStyles } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { FileHeaderContainer } from '../../Assets/Styles/FileHeaderStyles';
import Controls from '../../../Utils/controls/Controls';
import Spinner from '../../Assets/Images/Blue-spin.gif';
import Media from '../../Assets/Images/media.png';
import { bytesToSize } from '../../../Utils/Helpers';

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

export function FileProgress({ file, onDelete, url, progress }) {
  return (
    <FileHeaderContainer>
      <div className='img-container'>
        <img
          src={((url?.includes('.mp4') || url?.includes('.mp3')) && Media) || url || Spinner}
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
          {!isNaN(Math.round(progress)) && (
            <Typography variant='caption' color='textSecondary'>{`${Math.round(
              progress
            )}%`}</Typography>
          )}
        </div>
      </div>
      <Controls.ActionButton onClick={() => onDelete(file)}>
        <CloseIcon fontSize='small' color='secondary' />
      </Controls.ActionButton>
    </FileHeaderContainer>
  );
}
