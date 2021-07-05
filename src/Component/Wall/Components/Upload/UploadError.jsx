import { LinearProgress, Typography, Button, withStyles } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { FileHeaderContainer } from '../../Assets/Styles/FileHeaderStyles';
import Controls from '../../../Utils/controls/Controls';
import Spinner from '../../Assets/Images/Blue-spin.gif';
import { bytesToSize } from '../../../Utils/Helpers';

const ErrorLinearProgress = withStyles((theme) => ({
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
    backgroundColor: theme.palette.error.main,
  },
}))(LinearProgress);

export function UploadError({ file, onDelete, errors }) {
  return (
    <FileHeaderContainer>
      <div className='img-container'>
        <img
          src='https://image.flaticon.com/icons/png/512/2621/2621165.png'
          alt='upload-img'
          width='60px'
        />
      </div>
      <div className='img-details'>
        <Typography variant='caption' color='textSecondary'>
          {file.name}
        </Typography>
        <div className='img-progress'>
          <ErrorLinearProgress variant='determinate' value={100} style={{ width: '100%' }} />
        </div>
        <div className='img-info'>
          <Typography variant='caption' color='textSecondary'>
            {bytesToSize(file.size)}
          </Typography>
          {errors.map((error) => (
            <div key={error.code}>
              <Typography color='error'>{error.message}</Typography>
            </div>
          ))}
          <Typography variant='caption' color='textSecondary'>
            100%
          </Typography>
        </div>
      </div>
      <Controls.ActionButton onClick={() => onDelete(file)}>
        <CloseIcon fontSize='small' color='secondary' />
      </Controls.ActionButton>
    </FileHeaderContainer>
  );
}
