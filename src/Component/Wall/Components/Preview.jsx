import React from 'react';
import iPhoneFrame from '../Assets/Images/iphone-12s.png';
import { PreviewContainer, Frame, Post } from '../Assets/Styles/PreviewStyles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const posters = [
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

const Preview = ({ category, caption, likes, comments }) => {
  return (
    <PreviewContainer>
      <Frame>
        <img src={iPhoneFrame} alt='iPhone 8 Frame' />
        <Post>
          <div className='Poster'>
            {posters.length > 1 && (
              <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} showThumbs={false}>
                {posters.map((image) => {
                  return (
                    <img
                      style={{ maxHeight: '250px' }}
                      src={
                        image.src ||
                        'https://media.istockphoto.com/photos/beautiful-lady-reading-a-book-picture-id183825490'
                      }
                    />
                  );
                })}
              </Carousel>
            )}
            {posters.length === 0 && (
              <img
                style={{ maxHeight: '250px', width: '100%' }}
                src={
                  'https://media.istockphoto.com/photos/beautiful-lady-reading-a-book-picture-id183825490'
                }
              />
            )}
          </div>
          <div className='CaptionContainer'>
            <h6 style={{marginTop:'7px'}} >#{category || 'Category Name'}</h6>
            <p>
              {caption ||
                ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis error harum maiores iusto, repellendus suscipit!'}
            </p>
          </div>
          <div className='BottomBar'>
            <span className='favIcon'>
              <FavoriteIcon style={{ color: 'red' }} />
              <span className='digits'>{likes || '000'} </span>
            </span>
            <span className='commentIcon'>
              <CommentIcon />
              <span className='digits'>{comments || '000'} </span>
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
