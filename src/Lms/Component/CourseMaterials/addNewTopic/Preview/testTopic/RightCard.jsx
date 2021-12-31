import { Box, Button } from "@material-ui/core";
import React from "react";
import "../../../../../Assets/css/Preview/Preview.css";
import {
  DividerBookmark,
  SubHeading,
  TopGridSubPara,
  PlayerBox
} from "../../../../../Assets/css/Preview/TaskDetailsStyledComponent";
import ClockImage from "../../../../../Assets/images/ClockImage.png";
import { RenderBookMark } from "../../../../../Utils/Bookmark";
import VideoPlayer from "../../../../../Utils/VideoPlayer";

function RightCard(props) {
  const videos = props.content.contentVideo;

  return (
    <div className={"main-card-align left-container-task-view"}>
      <Box className={"main_card_pad"}>
        <DividerBookmark>
          <div style={{ padding: "4px 20px 0 0" }}>
            <RenderBookMark bookMarked={props.isBookmarked} />
          </div>
        </DividerBookmark>
        <SubHeading>{props.content && props.content.title}</SubHeading>
        <Box className={"left-side-card-text"}>
          <img src={ClockImage} alt="clockImage" style={{ width: 17 }} />
          &nbsp;&nbsp;&nbsp;
          {`${
            props.content && props.content.duration ? props.content.duration : 0
          } Mins`}
        </Box>

        <TopGridSubPara>
          {videos.map(item => (
            <PlayerBox>
              <VideoPlayer
                playBackInfo={item.videoPlaybackInfo}
                otp={item.videoOtp}
              />
            </PlayerBox>
          ))}
          <p
            className={"copy__allowed"}
            dangerouslySetInnerHTML={{
              __html: props.content && props.content.content
            }}
          />
        </TopGridSubPara>
      </Box>

      <div className={"bottom-card-align"}>
        <Button variant="outlined" color="primary" className={"footer-align"}>
          {"Mark as Read"}
        </Button>
      </div>
    </div>
  );
}

export default RightCard;
