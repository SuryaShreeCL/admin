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
} from '../../../../../Assets/css/Preview/GreStyles';

import GreIcon from '../../../../../Assets/icons/GREIcon.svg';
import PrimaryButton from './components/PrimaryButton';
import SecondaryButton from './components/SecondaryButton';
import Back from './components/Back';
import CalculatorImg from '../../../../../Assets/icons/CalculatorImg.svg';
import { secondsToHms } from '../../../../../Utils/HelperFunction';

function Layout(props) {
  const {
    currentTestSection,
    totalNoOfTestSection,
    totalNoOfQuestion,
    currentQuestionNo,
    remainingTime,
    showBookmarkButton,
    showCalculatorButton,
    showBackButton,
    showPauseButton,
    showPrimaryButton,
    primaryButtonText,
    disabled,
    children,
  } = props;
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
          {showCalculatorButton && (
            <SecondaryButton icon={<img src={CalculatorImg} alt='' />}>
              Calculator
            </SecondaryButton>
          )}

          {/* BookmarkButton  */}
          {showBookmarkButton && (
            <SecondaryButton
              icon={
                props.isBookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />
              }
            >
              Bookmark
            </SecondaryButton>
          )}

          {showBackButton && <Back />}

          {showPauseButton && <SecondaryButton>Pause Exam</SecondaryButton>}

          {showPrimaryButton && (
            <PrimaryButton disabled={disabled}>
              {primaryButtonText}
            </PrimaryButton>
          )}
        </RightBox>

        {/* <Continue>hello</Continue> */}
      </Header>

      <SubHeader>
        <SubLeftBox>
          <Typography variant='body2' color='textPrimary'>
            {`Section ${currentTestSection} of ${totalNoOfTestSection}`}
          </Typography>
          <Divider orientation='vertical' />
          <Typography variant='body1' color='textPrimary'>
            {`Question ${currentQuestionNo} of ${totalNoOfQuestion}`}
          </Typography>
        </SubLeftBox>
        <Typography variant='body2' color='textPrimary'>
          {remainingTime ? secondsToHms(remainingTime) : '23:59:59'}
        </Typography>
      </SubHeader>
      <Main>{children}</Main>
    </Container>
  );
}

export default Layout;
