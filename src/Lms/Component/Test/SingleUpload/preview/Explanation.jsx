import React from "react";
import {
  ExplanationContainer,
  ExplanationTitle,
  Explanation as ExpDiv,
} from "../../../../Assets/css/Preview/PreviewStyles";
import LatexViewer from "../../../../Utils/LatexViewer";
import VideoPlayer from "../../../../Utils/VideoPlayer";
import { Box } from "@material-ui/core";

function Explanation({ testResponse }) {
  const { video, videoExplanation } = testResponse.data;
  if (videoExplanation || video)
    return (
      <ExplanationContainer>
        <ExplanationTitle>Explanatory Answer</ExplanationTitle>
        <ExpDiv>
          <LatexViewer math={videoExplanation} />
        </ExpDiv>
        

        {video ? (
          <Box p={"1rem"}>

            <VideoPlayer videoId={video} />
          </Box>
        ) : (
          <></>
        )}
      </ExplanationContainer>
    );
  else return null;
}

export default Explanation;
