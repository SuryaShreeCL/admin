/**
 * (c) CareerLabs. All rights reserved.
 **/
import React from 'react';
import { BookmarkButton } from '../Assets/css/Preview/TestComponent';
import BookmarkIcon from '../Assets/icons/BookmarkOutlined.svg';
import BookmarkFillIcon from '../Assets/icons/BookmarkFilled.svg';

export const RenderBookMark = props => {
  return (
    <BookmarkButton {...props}>
      <img src={props.bookMarked ? BookmarkFillIcon : BookmarkIcon} />
    </BookmarkButton>
  );
};
