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
  const {
    caption,
    totalLikes,
    buttonText,
    wallFiles = [],
    supportingMedia,
    redirectionUrl,
    videoUrl,
    wallFilesUpdate = [],
  } = state;

  // Upload merge where wallFilesUpdate will be merged with wallFiles into uploadedMedia 
  let uploadedMedia = [...wallFiles, ...wallFilesUpdate];

  return (
    <PreviewContainer>
      <Frame>
        <img src={iPhoneFrame} alt='iPhone 12 Frame' />
        <Post>
          <div className='Poster'>
            {/* Multiple Images Carousel */}
            {supportingMedia === 'image' && uploadedMedia?.length > 0 && (
              <Carousel showArrows={true} infiniteLoop={true} showThumbs={false}>
                {uploadedMedia.map((image) => {
                  return (
                    <img
                      style={{ maxHeight: '250px' }}
                      src={`${process.env.REACT_APP_API_URL}/api/v1/wallfile?fileName=${image.url}&type=image`}
                    />
                  );
                })}
              </Carousel>
            )}
            {/* If No Image Found */}
            {supportingMedia === 'image' && wallFiles.length === 0 && (
              <img style={{ maxHeight: '250px', width: '100%' }} src={Empty} />
            )}
            {/* Audio Container */}
            {supportingMedia === 'audio' && (
              <ReactAudioPlayer
                style={{ backgroundColor: '#f0f3f4' }}
                src={
                  wallFiles[0]?.isUploaded === true
                    ? `${process.env.REACT_APP_API_URL}/api/v1/wallfile?fileName=${wallFiles[0]?.url}&type=video`
                    : sample
                }
                controls
              />
            )}
            {/* Video Container */}
            {supportingMedia === 'video' && (
              <ReactPlayer
                width={300}
                height={200}
                controls={true}
                url={
                  wallFiles[0]?.isUploaded === true
                    ? `${process.env.REACT_APP_API_URL}/api/v1/wallfile?fileName=${wallFiles[0]?.url}&type=video`
                    : videoUrl || 'https://www.youtube.com/watch?v=sGCXQxhAsq8'
                }
              />
            )}
          </div>
          <div className='CaptionContainer'>
            {/* <h6 style={{ marginTop: '7px' }}>#{category || 'Category Name'}</h6> */}
            <p>
              {caption ||
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis error harum maiores iusto, repellendus suscipit!'}
            </p>
          </div>
          <div className='BottomBar'>
            <span className='favIcon'>
              <FavoriteIcon style={{ color: 'red' }} />
              <span className='digits'>{totalLikes || '000'} </span>
            </span>
            {/* <span className='commentIcon'>
              <CommentIcon />
              <span className='digits'>{comments || '000'} </span>
            </span> */}
            {/* <span className='shareIcon'>
              <ShareIcon />{' '}
            </span> */}
            {redirectionUrl?.length > 1 && buttonText?.length > 1 && (
              <a href={redirectionUrl} className='redirectionBtn'>
                {buttonText || 'Text'}
              </a>
            )}
          </div>
        </Post>
      </Frame>
    </PreviewContainer>
  );
};

export default Preview;
