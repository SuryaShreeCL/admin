/**
 * (c) CareerLabs. All rights reserved.
 **/

import React, { useEffect } from "react";
import Latex from "../../../../../Utils/LatexViewer";
import {
  Radio,
  Typography,
  Grid,
  Divider,
  Box,
  Checkbox,
} from "@material-ui/core";
import {
  FormControlLabel2,
  QuestionDiv,
  RadioGroup,
  FormGroup,
  BundleDiv,
} from "../../../../../Assets/css/Preview/GmatStyles";
import QueryString from "qs";
import { TextBox } from "../../../../../Assets/css/Preview/GmatStyles";
import BundleComp from "./Bundle";

const SingleSelect = (testResponse, state, onSelect) => {
  if (testResponse.data.isHaveDescription || testResponse.data.isHaveImage) {
    return (
      <Grid container>
        <Grid item xs={6} className="blue_border">
          <QuestionDiv>
            {testResponse.data.isHaveDescription && (
              <Typography variant="h4" color="textPrimary">
                <Latex math={testResponse.data.description} />
              </Typography>
            )}
            {testResponse.data.isHaveImage && (
              <img src={testResponse.data.imgURL} />
            )}
          </QuestionDiv>
        </Grid>
        <Grid item xs={6}>
          <QuestionDiv>
            <Typography variant="h4" color="textPrimary">
              <Latex math={testResponse.data.question} />
            </Typography>
            <RadioGroup value={state.selectedChoice}>
              {testResponse.data.choices.map((choice, index) => (
                <FormControlLabel2
                  control={<Radio color="secondary" />}
                  value={choice.id}
                  onChange={onSelect}
                  label={
                    <Typography variant="h4" color="textPrimary">
                      {choice.text ? (
                        <Latex math={choice.text} />
                      ) : (
                        <img src={choice.choiceImage} alt="" />
                      )}
                    </Typography>
                  }
                />
              ))}
            </RadioGroup>
          </QuestionDiv>
        </Grid>
      </Grid>
    );
  } else
    return (
      // ------------- Single Select With Image Choice and Text ------------------
      <QuestionDiv>
        <Typography variant="h5" color="textPrimary">
          <Latex math={testResponse.data.question} />
        </Typography>
        <RadioGroup value={state.selectedChoice}>
          {testResponse.data.choices.map((choice, index) => (
            <FormControlLabel2
              control={<Radio color="secondary" />}
              value={choice.id}
              onChange={onSelect}
              label={
                <Typography variant="h4" color="textPrimary">
                  {choice.text ? (
                    <Latex math={choice.text} />
                  ) : (
                    <img src={choice.choiceImage} alt="" />
                  )}
                </Typography>
              }
            />
          ))}
        </RadioGroup>
      </QuestionDiv>
    );
};

const Passage = (testResponse, state, onTextChange) => (
  <Grid container>
    <Grid item xs={6} className="blue_border">
      <Box display="flex" height="100%" justifyContent="space-between">
        <QuestionDiv>
          <Typography variant="h5" color="textPrimary">
            <Latex math={testResponse.data.question} />
          </Typography>
          {testResponse.data.isHaveDescription && (
            <Typography variant="h4" color="textPrimary">
              <Latex math={testResponse.data.description} />
            </Typography>
          )}
          {testResponse.data.isHaveImage && (
            <img src={testResponse.data.imgURL} />
          )}
        </QuestionDiv>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <QuestionDiv>
        <TextBox
          type={"text"}
          placeholder={"Enter your answer here"}
          onChange={onTextChange}
          value={state.textAnswer}
        />
      </QuestionDiv>
    </Grid>
  </Grid>
);

const MultiChoice = (testResponse, state, onMultiSelect) => {
  if (testResponse.data.isHaveDescription || testResponse.data.isHaveImage) {
    return (
      <Grid container>
        <Grid item xs={6} className="blue_border">
          <QuestionDiv>
            {testResponse.data.isHaveDescription && (
              <Typography variant="h4" color="textPrimary">
                <Latex math={testResponse.data.description} />
              </Typography>
            )}
            {testResponse.data.isHaveImage && (
              <img src={testResponse.data.imgURL} />
            )}
          </QuestionDiv>
        </Grid>
        <Grid item xs={6}>
          <QuestionDiv>
            <Typography variant="h4" color="textPrimary">
              <Latex math={testResponse.data.question} />
            </Typography>
            <FormGroup value={state.selectedChoice}>
              {testResponse.data.choices.map((choice, index) => (
                <FormControlLabel2
                  control={<Checkbox color="secondary" />}
                  value={choice.id}
                  checked={state.selectedChoice.indexOf(choice.id) > -1}
                  onChange={onMultiSelect}
                  label={
                    <Typography variant="h4" color="textPrimary">
                      {choice.text ? (
                        <Latex math={choice.text} />
                      ) : (
                        <img src={choice.choiceImage} alt="" />
                      )}
                    </Typography>
                  }
                />
              ))}
            </FormGroup>
          </QuestionDiv>
        </Grid>
      </Grid>
    );
  } else
    return (
      // ------------- Multi Select With Image Choice and Text ------------------
      <QuestionDiv>
        <Typography variant="h5" color="textPrimary">
          <Latex math={testResponse.data.question} />
        </Typography>
        <FormGroup value={state.selectedChoice}>
          {testResponse.data.choices.map((choice, index) => (
            <FormControlLabel2
              control={<Checkbox color="secondary" />}
              value={choice.id}
              checked={state.selectedChoice.indexOf(choice.id) > -1}
              onChange={onMultiSelect}
              label={
                <Typography variant="h4" color="textPrimary">
                  {choice.text ? (
                    <Latex math={choice.text} />
                  ) : (
                    <img src={choice.choiceImage} alt="" />
                  )}
                </Typography>
              }
            />
          ))}
        </FormGroup>
      </QuestionDiv>
    );
};

const Bundle = (testResponse, state, onBundleChange) => {
  return (
    <Grid container>
      <Grid item xs={6} className="blue_border">
        <QuestionDiv>
          <Typography variant="h5" color="textPrimary">
            <Latex math={testResponse.data.question} />
          </Typography>
          {testResponse.data.isHaveDescription && (
            <Typography variant="h4" color="textPrimary">
              <Latex math={testResponse.data.description} />
            </Typography>
          )}
          {testResponse.data.isHaveImage && (
            <img src={testResponse.data.imgURL} />
          )}
        </QuestionDiv>
      </Grid>
      <Grid item xs={6}>
        <QuestionDiv>
          <BundleDiv>
            <BundleComp
              bundleLength={testResponse.data.totalBundle}
              choices={testResponse.data.choices}
              onChange={onBundleChange}
              selectedChoice={state.bundleSelect}
            />
          </BundleDiv>
        </QuestionDiv>
      </Grid>
    </Grid>
  );
};

function Test({
  testResponse,
  state,
  onSelect,
  startTest2,
  location,
  onTextChange,
  onMultiSelect,
  onBundleChange,
  getTestSection,
}) {
  // console.log(testResponse);
  if (testResponse !== null) {
    if (testResponse.data.type === "SINGLE_SELECT") {
      return SingleSelect(testResponse, state, onSelect);
    } else if (testResponse.data.type === "SUBJECTIVE")
      return Passage(testResponse, state, onTextChange);
    else if (testResponse.data.type === "MULTI_CHOICE")
      return MultiChoice(testResponse, state, onMultiSelect);
    else if (testResponse.data.type === "BUNDLE")
      return Bundle(testResponse, state, onBundleChange);
    else return null;
  }
  return null;
}

export default Test;
