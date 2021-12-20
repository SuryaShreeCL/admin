import { Typography } from '@material-ui/core';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import React from 'react';
import {
  Divider,
  Header,
  ImgBox,
  LeftBox,
  Main,
  RightBox,
  SubHeader,
  SubLeftBox,
  Container,
} from '../../../../../assets/css/GreStyles';
import GreIcon from '../../../../../assets/icons/GREIcon.svg';
import PrimaryButton from './components/PrimaryButton';
import SecondaryButton from './components/SecondaryButton';
import _ from 'lodash';
import Back from './components/Back';
import Timer from '../../../../../utils/components/Timer';
import CalculatorImg from '../../../../../assets/images/CalculatorImg.svg';

function Layout(props) {
  return (
    <Container>
      <Header>
        <LeftBox>
          <ImgBox>
            <img src={GreIcon} alt='' />
          </ImgBox>
          <Typography color='textSecondary' variant='h4'>
            Calibration Test
          </Typography>
        </LeftBox>

        {/* Buttons */}
        <RightBox>
          {props.showCalculatorButton && (
            <SecondaryButton
              icon={<img src={CalculatorImg} alt='' />}
              onClick={props.handleCalculatorClick}
            >
              Calculator
            </SecondaryButton>
          )}

          {/* BookmarkButton  */}
          {props.showBookmarkButton && (
            <SecondaryButton
              onClick={props.handleBookmarkClick}
              icon={
                props.isBookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />
              }
            >
              Bookmark
            </SecondaryButton>
          )}

          {props.showBackButton && <Back onClick={props.handleBackClick} />}

          {props.showPauseButton && (
            <SecondaryButton onClick={props.handlePauseClick}>
              Pause Exam
            </SecondaryButton>
          )}

          {props.showPrimaryButton && (
            <PrimaryButton
              onClick={props.handleNextClick}
              disabled={props.disabled}
            >
              {props.primaryButtonText}
            </PrimaryButton>
          )}
        </RightBox>

        {/* <Continue>hello</Continue> */}
      </Header>

      <SubHeader>
        {props.showSection && !_.isEmpty(props.sectionData) && (
          <>
            <SubLeftBox>
              <Typography variant='body2' color='textPrimary'>
                {`Section ${props.sectionData.data.currentSection} of ${props.sectionData.data.totalSections}`}
              </Typography>
              {props.question !== null && props.question !== undefined && (
                <>
                  <Divider orientation='vertical' />
                  <Typography variant='body1' color='textPrimary'>
                    {`Question ${props.question.currentQuestionNo} of ${props.question.totalNoOfQuestion}`}
                  </Typography>
                </>
              )}
            </SubLeftBox>
            <Typography variant='body2' color='textPrimary'>
              {props.question !== undefined && (
                <Timer
                  time={1000 * props.question.remainingTime}
                  getRemainingTime={props.getRemainingTime}
                  reset={props.question.resetTime}
                  stop={props.stop}
                />
              )}
            </Typography>
          </>
        )}
      </SubHeader>
      <Main>{props.children}</Main>
    </Container>
  );
}

export default Layout;
