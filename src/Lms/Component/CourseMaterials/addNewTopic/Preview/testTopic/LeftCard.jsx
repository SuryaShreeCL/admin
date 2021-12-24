import { Box, Button, Card, Grid } from '@material-ui/core';
// import QueryString from 'qs';
import React from 'react';
import '../../../../../Assets/css/Preview/Preview.css';
import {
  BottomText,
  FlatTextContent,
  ImageSideText,
  TaskCard,
} from '../../../../../Assets/css/Preview/TaskDetailsStyledComponent';
import StatusIcon from '../../../../../Assets/icons/StatusIcon';
import activeBook from '../../../../../Assets/images/activeBook.png';
import activeClock from '../../../../../Assets/images/activeClock.png';
import activeVideo from '../../../../../Assets/images/activeVideo.png';
import Book from '../../../../../Assets/images/Book.png';
import ClockImage from '../../../../../Assets/images/ClockImage.png';
import testImage from '../../../../../Assets/images/infinity.png';
import notepad from '../../../../../Assets/images/notepad.png';
import questionAnswer from '../../../../../Assets/images/questionAnswer.png';
import ShapeImage from '../../../../../Assets/images/Shape.png';
// import { routePaths } from '../../../routes/RoutePath';

function LeftCard(props) {
  const topicTypeIcon = type => {
    if (type === 'TEXT') return Book;
    if (type === 'VIDEO') return ShapeImage;
  };

  const activeTopicTypeIcon = type => {
    if (type === 'TEXT') return activeBook;
    if (type === 'VIDEO') return activeVideo;
  };

  // const { topicId, type } = QueryString.parse(props.location.search, {
  //   ignoreQueryPrefix: true,
  // });
  // const { t } = props;
  return (
    <Grid container direction='column' className={'left-container-task-view'}>
      <Card className={'left-side-card'}>
        {props.topicResponse &&
          props.topicResponse.tasks.map((item, index) => {
            return (
              <div className='step'>
                <div>
                  <div style={{ position: 'absolute', top: 33 }}>
                    <img src={StatusIcon(item.status)} alt='Icons' />
                  </div>
                  <div className={'circle-line'}></div>
                </div>
                <div>
                  <TaskCard
                    id={item.id}
                    active={props.selectedStep === index}
                    // onClick={props.handleLeftCardClick}
                  >
                    <Box className={'task_title_style'} id={item.id}>
                      <FlatTextContent id={item.id}>
                        {item.title}
                      </FlatTextContent>
                    </Box>

                    <Grid container justifyContent='space-between' id={item.id}>
                      <div className={'right-side-card'} id={item.id}>
                        {props.selectedStep === index ? (
                          <img src={activeClock} alt='clock' id={item.id} />
                        ) : (
                          <img src={ClockImage} alt='clock' id={item.id} />
                        )}
                        <ImageSideText id={item.id}>
                          {item.duration}
                        </ImageSideText>
                      </div>
                      <div className={'right-side-card'} id={item.id}>
                        {props.selectedStep === index ? (
                          <img
                            src={activeTopicTypeIcon(item.type)}
                            alt='Icons'
                            id={item.id}
                          />
                        ) : (
                          <img
                            src={topicTypeIcon(item.type)}
                            alt='Icons'
                            id={item.id}
                          />
                        )}
                      </div>
                    </Grid>
                  </TaskCard>
                </div>
              </div>
            );
          })}
      </Card>
      <Box className={'left-side-below-card'}>
        <Box
          style={{
            backgroundImage: `url(${testImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            height: 150,
          }}
        >
          <div className={'btn-align'}>
            <Button
            // className='on-boost-mode'
            // onClick={() =>
            //   props.history.push(
            //     `${routePaths.dashboard.questionBank}?topicId=${topicId}&type=${type}`
            //     // routePaths.dashboard.questionBank + '?topicId=' + topicId
            //   )
            // }
            >
              {' '}
              <img
                src={questionAnswer}
                alt='Icons'
                // className='on-boost-mode'
              />{' '}
            </Button>
            <div style={{ visibility: 'hidden' }}>lesson</div>
            <Button>
              <img src={notepad} alt='Icons' />
            </Button>
          </div>
        </Box>
        <Box className={'bottom_text_style'}>
          <BottomText
          // onClick={() =>
          //   props.history.push(
          //     routePaths.dashboard.questionBank + '?topicId=' + topicId
          //   )
          // }
          >
            {'Question Bank and Topic Test'}
          </BottomText>
        </Box>
      </Box>
    </Grid>
  );
}
export default LeftCard;
