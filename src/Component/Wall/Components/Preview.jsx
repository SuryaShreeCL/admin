import React from 'react';
import iPhoneFrame from '../Assets/Images/iphone-12s.png';
import { PreviewContainer, Frame, Post } from '../Assets/Styles/PreviewStyles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Empty from '../Assets/Images/empty.png';
import sample from '../Assets/Audio/iphone.mp3';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player/lazy';

const Preview = ({ state }) => {
  const { category, caption, likes, posters, audio, video, postType } = state;
  return (
    <PreviewContainer>
      <Frame>
        <img src={iPhoneFrame} alt='iPhone 8 Frame' />
        <Post>
          <div className='Poster'>
            {postType === 'Image' && posters.length > 1 && (
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
            {/* If No Image Found */}
            {postType === 'Image' && posters.length === 0 && (
              <img style={{ maxHeight: '250px', width: '100%' }} src={Empty} />
            )}
            {/* If No Audio Found */}
            {postType === 'Audio' && (
              <ReactAudioPlayer
                style={{ backgroundColor: '#f0f3f4' }}
                src={audio || sample}
                controls
              />
            )}
            {/* If No Video Found */}
            {postType === 'Video' && (
              <ReactPlayer
                width={300}
                height={200}
                url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
              />
            )}
          </div>
          <div className='CaptionContainer'>
            <h6 style={{ marginTop: '7px' }}>#{category || 'Category Name'}</h6>
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
            {/* <span className='commentIcon'>
              <CommentIcon />
              <span className='digits'>{comments || '000'} </span>
            </span>
            <span className='shareIcon'>
              <ShareIcon />{' '}
            </span> */}
          </div>
        </Post>
      </Frame>
    </PreviewContainer>
  );
};

export default Preview;
