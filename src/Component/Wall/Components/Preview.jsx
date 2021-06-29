import React from 'react';
import iPhoneFrame from '../Assets/Images/iphone-frame.png';
import { PreviewContainer, Frame, Post } from '../Assets/Styles/PreviewStyles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';

const Preview = () => {
  return (
    <PreviewContainer>
      <Frame>
        <img src={iPhoneFrame} alt='iPhone 8 Frame' />
        <Post>
          <div className='Poster'>
            <img
              src='https://previews.123rf.com/images/kho/kho1406/kho140600092/29092622-beautiful-girl-reading-book-in-the-summer-park-image-toned-.jpg'
              alt=''
            />
          </div>
          <div className='CaptionContainer'>
            <h5>#Science</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis facere at illo vel
              autem iste officia libero id debitis doloribus?
            </p>
          </div>
          <div className='BottomBar'>
            <span className='favIcon'>
              <FavoriteIcon style={{ color: 'red' }} />
              <span className='digits'>41</span>
            </span>
            <span className='commentIcon'>
              <CommentIcon />
              <span className='digits'>21</span>
            </span>
            <span className='shareIcon'>
              <ShareIcon />{' '}
            </span>
          </div>
        </Post>
      </Frame>
    </PreviewContainer>
  );
};

export default Preview;
