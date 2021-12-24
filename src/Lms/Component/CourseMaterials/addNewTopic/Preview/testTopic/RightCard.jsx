import { Box, Button, IconButton } from '@material-ui/core';
import React from 'react';
import '../../../../../Assets/css/Preview/Preview.css';
// import { ToolTip } from '../../../assets/css/MuiStyles';
import {
  CommentIcon,
  DividerBookmark,
  SubHeading,
  TopGridSubPara,
} from '../../../../../Assets/css/Preview/TaskDetailsStyledComponent';
import Comment from '../../../../../Assets/icons/comment.svg';
import ClockImage from '../../../../../Assets/images/ClockImage.png';
import { RenderBookMark } from '../../../../../Utils/Bookmark';
// import Notes from './Notes';

function RightCard(props) {
  return (
    <div className={'main-card-align left-container-task-view'}>
      <Box className={'main_card_pad'}>
        <DividerBookmark>
          <div style={{ padding: '4px 20px 0 0' }}>
            <RenderBookMark
              bookMarked={props.isBookmarked}
              // onClick={props.handleBookmarkClick}
            />
          </div>
        </DividerBookmark>
        {/* <ToolTip title={'All Notes'} placement='left' arrow>
        <CommentIcon>
          <IconButton
           onClick={props.handleNotesIconClick}
          >
            <img src={Comment} />
          </IconButton>
        </CommentIcon>
        </ToolTip> */}
        <SubHeading>{props.content && props.content.title}</SubHeading>
        <Box className={'left-side-card-text'}>
          <img src={ClockImage} alt='clockImage' style={{ width: 17 }} />
          &nbsp;&nbsp;&nbsp;
          {`${
            props.content && props.content.duration ? props.content.duration : 0
          } Mins`}
        </Box>

        <TopGridSubPara>
          {/* {renderHighlightedTask()} */}
          <p
            className={'copy__allowed'}
            dangerouslySetInnerHTML={{
              __html: props.content && props.content.content,
            }}
          />
        </TopGridSubPara>
      </Box>

      <div className={'bottom-card-align'}>
        {/* {!(props.currentStatus === 'COMPLETED') ? ( */}
        <Button
          variant='outlined'
          color='primary'
          className={'footer-align'}
          // onClick={props.handleReadClick}
        >
          {'Mark as Read'}
        </Button>
        {/* ) : (
          <div style={{ height: '46px' }} />
        )} */}
      </div>
      {/* <Notes {...props.notesPops} /> */}
    </div>
  );
}

export default RightCard;
