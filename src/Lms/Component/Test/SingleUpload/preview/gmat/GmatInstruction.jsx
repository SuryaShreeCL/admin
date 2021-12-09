/**
 * (c) CareerLabs. All rights reserved.
 **/

import { Typography } from '@material-ui/core';
import _ from 'lodash';
import QueryString from 'qs';
import React, { useEffect } from 'react';
import {
  Bullet,
  BulletBox,
  ButtonBox,
  Main,
  SubTitle,
  Text,
  MainStyle,
} from '../../../../../assets/css/GmatStyles';
import ButtonImg from '../../../../../assets/images/ButtonImg.svg';

function GmatInstruction(props) {
  const { questionSet, section } = QueryString.parse(props.location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    if (section) props.getTestSection();
    // return () => {
    //   props.cleanUp();
    // };
  }, []);

  const instructions = instructionData => {
    if (instructionData !== null)
      return instructionData.data.instruction.map(item => {
        return (
          <Text>
            <BulletBox>
              <Bullet />
            </BulletBox>
            <Typography variant='body1' color='textSecondary'>
              {item}
            </Typography>
          </Text>
        );
      });
  };

  return (
    <MainStyle>
      {section ? (
        <>
          <Typography variant='h3' color='textPrimary' className={'gmat_head'}>
            {!_.isEmpty(props.section) && props.section.data.testSection.name}
            {` Section Instructions`}
          </Typography>

          <Typography
            variant='h3'
            color='textPrimary'
            className={'gmat_head_section'}
          >
            {!_.isEmpty(props.section) &&
              props.section.data.testSection.noOfQuestions}
            {` Questions`}
          </Typography>

          <Typography
            variant='h3'
            color='textPrimary'
            className={'gmat_head_section'}
          >
            {`Time- `}
            {!_.isEmpty(props.section) &&
              props.section.data.testSection.duration}
            {` minutes`}
          </Typography>
        </>
      ) : (
        <Typography variant='h3' color='textPrimary' className={'gmat_head'}>
          GMAT Calibration Test
        </Typography>
      )}
      <Main>
        <Typography variant='h2' color='textPrimary'>
          Test instructions
        </Typography>
      </Main>
      <SubTitle>
        <Typography variant='h4' color='textPrimary'>
          {props.getInstructionsResponse !== null &&
            props.getInstructionsResponse.data.instructionTitle}
        </Typography>
      </SubTitle>
      {instructions(props.getInstructionsResponse)}

      <ButtonBox>
        <Typography
          variant='h4'
          color='textPrimary'
          className='button_image_style'
        >
          Click &nbsp;
          <img src={ButtonImg} alt='' />
          &nbsp; to continue
        </Typography>
      </ButtonBox>
    </MainStyle>
  );
}

export default GmatInstruction;
