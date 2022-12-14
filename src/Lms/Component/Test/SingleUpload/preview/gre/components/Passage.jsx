import { Box, Typography } from '@material-ui/core';
import React from 'react';
import {
  DescriptionBox,
  DescriptionHeader,
  Grid,
  OutlineLeft,
  OutlineRight,
  TextBox,
} from '../../../../../../Assets/css/Preview/GreStyles';
import Latex from '../../../../../../Utils/LatexViewer';
import Bundle from './Bundle';
import SingleMulti from './SingleMulti';

const Passage = ({
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
  isCalculator,
  bottomText,
  topText,
}) => {
  return (
    <Grid container>
      <Grid item md={6}>
        <OutlineLeft>
          <DescriptionHeader>
            Question 7 is based on this passage.
          </DescriptionHeader>
          <DescriptionBox>
            {subjective && (
              <Typography variant='h6' color='textPrimary'>
                <Latex math={question} />
              </Typography>
            )}

            <Typography variant='h6' color='textPrimary'>
              <Latex math={description} />
            </Typography>
            <Box>
              {imgUrl && (
                <img src={imgUrl} alt={''} width={'100%'} height={'100%'} />
              )}
            </Box>
          </DescriptionBox>
        </OutlineLeft>
      </Grid>
      <Grid item md={6}>
        <OutlineRight>
          {bundle ? (
            <Bundle
              bundleLength={bundleLength}
              choices={choices}
              selectedChoice={selectedChoice}
              question={question}
              isCalculator={isCalculator}
              bottomText={bottomText}
              topText={topText}
            />
          ) : subjective ? (
            <TextBox
              type={'text'}
              placeholder={'Enter your answer here'}
              value={answer}
            />
          ) : (
            <SingleMulti
              question={question}
              options={choices}
              selectedChoice={selectedChoice}
              isMulti={isMulti}
              isCalculator={isCalculator}
              bottomText={bottomText}
              topText={topText}
            />
          )}
        </OutlineRight>
      </Grid>
    </Grid>
  );
};

export default Passage;
