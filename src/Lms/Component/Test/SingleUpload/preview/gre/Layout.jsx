import { Typography } from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import React from 'react';
import {
  Container,
  Divider,
  Header,
  ImgBox,
  LeftBox,
  Main,
  RightBox,
  SubHeader,
  SubLeftBox,
} from '../../../../../Assets/css/Preview/GreStyles';
import CalculatorImg from '../../../../../Assets/icons/CalculatorImg.svg';
import GreIcon from '../../../../../Assets/icons/GREIcon.svg';
import { secondsToHms } from '../../../../../Utils/HelperFunction';
import Back from './components/Back';
import PrimaryButton from './components/PrimaryButton';
import SecondaryButton from './components/SecondaryButton';

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



      </Header>


      <SubHeader>
        <SubLeftBox>
          <Typography variant='body2' color='textPrimary'>
            {`Section ${currentTestSection} of ${totalNoOfTestSection}`}
          </Typography>
          <Divider orientation='vertical' />
          <Typography variant='body1' color='textPrimary'>
            {`Question ${currentQuestionNo} of ${
              totalNoOfQuestion && totalNoOfQuestion > 0 ? totalNoOfQuestion : 1
            }`}
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
