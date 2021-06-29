import React from 'react';
import iPhoneFrame from '../Assets/Images/iphone-frame.png';
import { PreviewContainer, Frame, Post } from '../Assets/Styles/PreviewStyles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Images = [
  {
    src:
      'https://previews.123rf.com/images/kho/kho1406/kho140600092/29092622-beautiful-girl-reading-book-in-the-summer-park-image-toned-.jpg',
  },
  {
    src: 'https://image.freepik.com/free-photo/cute-young-lady-reading-book_23-2148204301.jpg',
  },
  {
    src: 'https://media.istockphoto.com/photos/beautiful-lady-reading-a-book-picture-id183825490',
  },
];

const Preview = ({ posters, category, caption, likes, comments }) => {
  return (
    <PreviewContainer>
      <Frame>
        <img src={iPhoneFrame} alt='iPhone 8 Frame' />
        <Post>
          <div className='Poster'>
            <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} showThumbs={false}>
              {Images.map((image) => {
                return <img style={{ maxHeight: '300px' }} src={image.src} />;
              })}
            </Carousel>
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
