/**
 * (c) CareerLabs. All rights reserved.
 **/
import React from "react";
import { Box, FormControlLabel, Checkbox } from "@material-ui/core";
import {
  SingleSelect as Style,
  Div,
} from "../../../../../Assets/css/Preview/TestComponent";
import Latex from "../../../../../Utils/LatexViewer";
import Grid from "@material-ui/core/Grid";
const SingleSelect = ({
  question,
  options,
  selectedChoice,
  isMulti,
  description,
  imgUrl,
}) => {
  const { Question, OptionContainer, Option, OptionBox, OptionTitle } = Style;
  const alpha = ["A", "B", "C", "D", "E", "F", "G"];

  const renderChoices = () => {
    if (isMulti) {
      return (
        <>
          {options.map((choice, index) => {
            if (choice.choiceImage)
              return (
                <FormControlLabel
                  id={choice.id}
                  control={
                    <Checkbox
                      name={choice.id}
                      id={choice.id}
                      color="primary"
                      checked={selectedChoice.some(
                        (selected) => selected === choice.id
                      )}
                    />
                  }
                  label={
                    <Box display={"flex"}>
                      {alpha[index]})&nbsp; <Latex math={choice.text || ""} />
                    </Box>
                  }
                />
              );
            else
              return (
                <FormControlLabel
                  id={choice.id}
                  control={
                    <Checkbox
                      name={choice.id}
                      id={choice.id}
                      color="primary"
                      checked={selectedChoice.some(
                        (selected) => selected === choice.id
                      )}
                    />
                  }
                  label={
                    <Box display={"flex"}>
                      <span>{alpha[index]})</span>
                      <Latex math={choice.text || ""} />
                    </Box>
                  }
                />
              );
          })}
        </>
      );
    } else {
      return options.map((choice, index) => {
        if (choice.choiceImage)
          return (
            <Option>
              <OptionBox active={selectedChoice.indexOf(choice.id) > -1}>
                {alpha[index]}
              </OptionBox>
              <img src={choice.choiceImage} alt="" />
            </Option>
          );
        else
          return (
            <Option>
              <OptionBox active={selectedChoice.indexOf(choice.id) > -1}>
                {alpha[index]}
              </OptionBox>
              <OptionTitle active={selectedChoice.indexOf(choice.id) > -1}>
                <Latex math={choice.text || ""} />
              </OptionTitle>
            </Option>
          );
      });
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid
          item
          md={6}
          sm={12}
          xs={12}
          style={{
            display: "flex",
            paddingTop: "3%",
          }}
        >
          <Div>
            <Question style={{}}>
              <Latex math={question} />
            </Question>
          </Div>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <Div>
            <Box>
              {imgUrl && (
                <img src={imgUrl} alt={""} width={"100%"} height={"100%"} />
              )}
            </Box>
            <OptionContainer>{renderChoices()}</OptionContainer>
          </Div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleSelect;
