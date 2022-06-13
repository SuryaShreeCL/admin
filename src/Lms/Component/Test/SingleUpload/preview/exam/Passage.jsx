/**
 * (c) CareerLabs. All rights reserved.
 **/
import React from "react";
import { Grid, Box, Divider } from "@material-ui/core";
import {
  Passage as passage,
  TextBox,
} from "../../../../../Assets/css/Preview/TestComponent";
import SingleSelect from "./SingleSelect";
import Bundle from "./Bundle";
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
  let deptName = window.sessionStorage.getItem("department");
  return (
    <Grid container id="test-container">
      {deptName === "assessment_engine_admin" ? (
        <></>
      ) : (
        <Grid item md={6} id="inside-test-container">
          <Box
            display={"flex"}
            className={"overflow-scroll"}
            height={"inherit"}
          >
            <Box flex={1} className={"question-left-container"}>
              <Para>
                <Latex math={para} />
              </Para>

              <Box fontSize={16} color={"#052A4E"} lineHeight={"30px"}>
                <Latex math={description} />
              </Box>

              <Box>
                {imgUrl && (
                  <img src={imgUrl} alt={""} width={"100%"} height={"100%"} />
                )}
              </Box>
            </Box>
            <Box>
              <Divider variant="middle" orientation={"vertical"} />
            </Box>
          </Box>
        </Grid>
      )}

      <Grid item md={6} id="inside-test-container-right">
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
