import { LinearProgress, Typography, Button, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { FileHeaderContainer } from '../../Assets/Styles/FileHeaderStyles';
import Controls from '../../../Utils/controls/Controls';
import Spinner from '../../Assets/Images/Blue-spin.gif';
import axios from 'axios';
import Media from '../../Assets/Images/media.png';

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

export function ExistingMedia(props, progress = 100) {
  const [isDeleted, setIsDeleted] = useState(false);

  //Removing the file from aws based on id
  const deletePost = async (id) => {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/wallfile/${id}`, {
      crossDomain: true,
      headers: {
        admin: 'yes',
        Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
      },
    });
    setIsDeleted(true);
  };

  const { url, type, id } = props.media;
  return (
    <FileHeaderContainer>
      <div className='img-container'>
        <img
          src={
            ((url?.includes('.mp4') || url?.includes('.mp3')) && Media) ||
            `${process.env.REACT_APP_ASSETS}/images/wall/${url}` ||
            Spinner
          }
          alt='upload-img'
          width='60px'
        />
      </div>
      <div className='img-details'>
        <Typography variant='caption' color='textSecondary'>
          {url}
        </Typography>
        <div className='img-progress'>
          {isDeleted ? (
            <ErrorLinearProgress variant='determinate' value={100} style={{ width: '100%' }} />
          ) : (
            <BorderLinearProgress variant='determinate' value={100} />
          )}
        </div>
        <div className='img-info'>
          <Typography variant='caption' color='textSecondary'>
            {isDeleted ? 'Deleted' : type}
          </Typography>
          {!isNaN(Math.round(progress)) && (
            <Typography variant='caption' color='textSecondary'>{`${Math.round(
              progress
            )}%`}</Typography>
          )}
        </div>
      </div>
      <Controls.ActionButton>
        <DeleteIcon fontSize='small' color='secondary' onClick={() => deletePost(id)} />
      </Controls.ActionButton>
    </FileHeaderContainer>
  );
}
