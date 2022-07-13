import React from "react";
import {
  ExplanationContainer,
  ExplanationTitle,
  Explanation as ExpDiv,
} from "../../../../Assets/css/Preview/PreviewStyles";
import LatexViewer from "../../../../Utils/LatexViewer";
import VideoPlayer from "../../../../Utils/VideoPlayer";
import { Box } from "@material-ui/core";
import Carousel from "../../../../Utils/Carousel";

function Explanation({ testResponse }) {
  const { video, videoExplanation } = testResponse.data;

  const renderVideo = () => {
    return video && video.length !== 0 ? (
      <>
        <Carousel>
          {video.map((item, index) => (
            <VideoPlayer key={index} videoId={item.videoUrl} />
          ))}
        </Carousel>
      </>
    ) : null;
  };

  if (videoExplanation || video)
    return (
      <ExplanationContainer>
        <ExplanationTitle>Explanatory Answer</ExplanationTitle>
        <ExpDiv>
          <LatexViewer math={videoExplanation} />
        </ExpDiv>
        {video && video.length !== 0 && (
          <Box p={"1rem 2rem !important"} className={"explain_video"}>
            {renderVideo()}
          </Box>
        )}
      </ExplanationContainer>
    );
  else return null;
}

export default Explanation;
