/**
 * (c) CareerLabs. All rights reserved.
 **/
import React from "react";
import { Grid, Box, Divider } from "@material-ui/core";
import {
  Passage as passage,
  TextBox,
} from "../../../../../Assets/css/Preview/TestComponent";
import SingleSelect from "./AESingleSelect";
import Bundle from "./AEBundle";
import Latex from "../../../../../Utils/LatexViewer";

const Passage = ({
  para,
  question,
  choices,
  bundle,
  selectedChoice,
  subjective,
  bundleLength,
  answer,
  description,
  imgUrl,
  isMulti,
}) => {
  const { Para } = passage;
  return (
    <Grid container id="test-container">
      <Grid item md={12} id="inside-test-container-right">
        <Box
          minHeight={400}
          className={"overflow-scroll"}
          id="inside-test-container"
        >
          {bundle ? (
            <Bundle
              bundleLength={bundleLength}
              choices={choices}
              selectedChoice={selectedChoice}
              question={para}
            />
          ) : subjective ? (
            <TextBox
              type={"text"}
              placeholder={"Enter your answer here"}
              value={answer}
            />
          ) : (
            <SingleSelect
              question={question}
              options={choices}
              selectedChoice={selectedChoice}
              isMulti={isMulti}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Passage;
