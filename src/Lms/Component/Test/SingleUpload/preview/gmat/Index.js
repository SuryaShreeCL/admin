/**
 * (c) CareerLabs. All rights reserved.
 **/
import React, { Component } from "react";
import { ThemeProvider, Typography } from "@material-ui/core";
import {
  Box,
  Content,
  Filler,
  gmatTheme,
  Header,
  HeaderBox,
  Inline,
  TimerBox,
} from "../../../../../Assets/css/Preview/GmatStyles";
import ClockIcon from "../../../../../Assets/icons/ClockIconWhite.svg";
import MessageIcon from "../../../../../Assets/icons/MessageIconWhite.svg";
import { secondsToHms } from "../../../../../Utils/HelperFunction";
import Footer from "./Footer";
import SubHeader from "./SubHeader";
import Test from "./Test";

export class GmatLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modelOpen: false,
      selectedChoice: [],
      textAnswer: "",
      bundleSelect: [],
      time: -1,
      required: false,
      confirmation: false,
      bundleSelect: [],
      stopTimer: false,
      resetTime: false,
      bookmarkDialog: false,
      isBookmarked: false,
    };
  }

  render() {
    const {
      question,
      type,
      isHaveDescription,
      currentQuestionNo,
      choices,
      description,
      totalBundle,
      imgURL,
      isHaveImage,
      isCalculator,
      topText,
      bottomText,
      noOfAnswer,
      testSectionName,
      currentTestSection,
      totalNoOfTestSection,
      totalNoOfQuestion,
      remainingTime,
      testType,
      conceptName,
      testTitle,
      video,
      videoExplanation,
    } = this.props.testResponse.data;

    console.log(this.props);
    return (
      <Box className={"gmat_container"}>
        <ThemeProvider theme={gmatTheme}>
          <Header>
            <Typography variant="h1">GMAT Calibration Test</Typography>
            <HeaderBox>
              <Inline>
                <img src={ClockIcon} alt="" className="white_clock" />
                <Typography variant="body1" className="inline_class">
                  Time Remaining
                </Typography>

                <Typography variant="body1">
                  <TimerBox>
                    {remainingTime ? secondsToHms(remainingTime) : "23:59:59"}
                  </TimerBox>
                </Typography>
              </Inline>
              <Inline>
                <Filler />
                <img src={MessageIcon} alt="" className="white_clock" />
                <Typography variant="body1">
                  {`${currentQuestionNo} of ${
                    totalNoOfQuestion && totalNoOfQuestion > 0
                      ? totalNoOfQuestion
                      : 1
                  }`}
                </Typography>
              </Inline>
            </HeaderBox>
          </Header>
          <SubHeader
            sectionTitle={testSectionName}
            section={true}
            location={this.props.location}
            isBookmarked={false}
          />
          <Content>
            <Test {...this} {...this.props} />
          </Content>

          {/* -------- Footer --------- */}
          <Footer {...this} {...this.props} />
        </ThemeProvider>
      </Box>
    );
  }
}

export default GmatLayout;
