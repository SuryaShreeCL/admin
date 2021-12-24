/**
 * (c) CareerLabs. All rights reserved.
 **/

import { Typography } from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import React from 'react';
import {
  IconButton,
  SubHeader as Main,
} from '../../../../../Assets/css/Preview/GmatStyles';

function SubHeader(props) {
  const { sectionTitle, section } = props;

  return (
    <Main>
      {section ? (
        <Typography variant='h6'>{sectionTitle}</Typography>
      ) : (
        <span />
      )}
      <Typography variant='body1' className='inline_class'>
        <IconButton onClick={props.bookmarkIconClick}>
          {props.isBookmarked ? (
            <BookmarkIcon style={{ fill: 'white' }} />
          ) : (
            <BookmarkBorderIcon style={{ fill: 'white' }} />
          )}
        </IconButton>
        &nbsp; Bookmark
      </Typography>
    </Main>
  );
}

export default SubHeader;
