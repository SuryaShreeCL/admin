/**
 * (c) CareerLabs. All rights reserved.
 **/
import { Box, Divider } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import React, { Component } from "react";
import BookmarkIcon from "../../../../../Assets/icons/Bookmarks.svg";
import BottomBanner from "../../../../../../Asset/icons/BottomBanner.svg";
import MobileResponsiveImage from "../../../../../../Asset/icons/MobileBottomcontainer.svg";

import "../../../../../Assets/css/Preview/Preview.css";
import {
  BackIconTag,
  BookMarkContainer,
  Container,
  ContinueButton,
  Div,
  Footer,
  Icon,
  Next,
  Pause,
  PauseModelSubTitle,
  PauseModelTitle,
  QuestionBody as Body,
  QuestionCount,
  QuestionTitle,
  QuitButton,
  TestTitle,
  TimeRemaining,
  TitleContainer,
  TitleHeader,
} from "../../../../../Assets/css/Preview/TestComponent";
import PauseModelIcon from "../../../../../Assets/icons/pause.svg";
import PauseIcon from "../../../../../Assets/icons/pauseIcon.svg";
import Passage from "./Passage";
import SingleSelect from "./SingleSelect";
import { RenderBookMark } from "../../../../../Utils/Bookmark";
import { secondsToHms } from "../../../../../Utils/HelperFunction";
import { ArrowBack } from "@material-ui/icons";
import AesingleSelect from "./AESingleSelect";
import AeBundleType from "./AEBundle";
import AePassage from "./AePassage";
class Index extends Component {
  constructor(props) {
    super(props);
  }

  renderQuestion = () => {
    const deptName = window.sessionStorage.getItem("department");
    const {
      type,
      question,
      choices,
      description,
      imgURL,
      isHaveDescription,
      isHaveImage,
      totalBundle,
    } = this.props.testResponse.data;
      if (type === "SINGLE_SELECT") {
        return isHaveDescription || isHaveImage ? (
          <AePassage
            description={description}
            question={question}
            choices={choices}
            selectedChoice={[]}
            // imgUrl={imgURL}
            bundleLength={totalBundle}
          />
        ) : (
          <AesingleSelect
            question={question}
            options={choices}
            selectedChoice={[]}
            description={description}
            // imgUrl={imgURL}
          />
        );
      } else if (type === "SUBJECTIVE" || type === "DESCRIPTIVE") {
        return (
          <AePassage
            para={question}
            description={description}
            subjective={true}
            answer={null}
            imgUrl={imgURL}
            bundleLength={totalBundle}
          />
        );
      } else if (type === "BUNDLE") {
        return (
          <AePassage
            para={question}
            description={description}
            bundle={true}
            choices={choices}
            bundleLength={Math.max.apply(
              Math,
              choices.map((item) => item.bundleNo)
            )}
            selectedChoice={[]}
            imgUrl={imgURL}
            // bundleLength={totalBundle}
          />
        );
      } else if (type === "MULTI_CHOICE") {
        {
          return isHaveDescription || isHaveImage ? (
            <AePassage
              description={description}
              question={question}
              choices={choices}
              selectedChoice={[]}
              imgUrl={imgURL}
              isMulti={true}
              bundleLength={totalBundle}
            />
          ) : (
            <AesingleSelect
              question={question}
              options={choices}
              selectedChoice={[]}
              description={description}
              imgUrl={imgURL}
              isMulti={true}
            />
          );
        }
    
      }
      else if(type === "VIDEO")
      {
        return isHaveDescription || isHaveImage ? (
          <AePassage
            description={description}
            question={question}
            choices={choices}
            selectedChoice={[]}
            imgUrl={imgURL}
            isMulti={true}
            bundleLength={totalBundle}
          />
        ) : (
          <AesingleSelect
            question={question}
            options={choices}
            selectedChoice={[]}
            description={description}
            imgUrl={imgURL}
            isMulti={true}
          />
        );
      }
      else if(type === "FILE_UPLOAD")
      {
        return isHaveDescription || isHaveImage ? (
          <AePassage
            description={description}
            question={question}
            choices={choices}
            selectedChoice={[]}
            imgUrl={imgURL}
            isMulti={true}
            bundleLength={totalBundle}
          />
        ) : (
          <AesingleSelect
            question={question}
            options={choices}
            selectedChoice={[]}
            description={description}
            imgUrl={imgURL}
            isMulti={true}
          />
        );
      }
    
  };

  disabled = () => {
    const { type, choices } = this.props.testResponse.data;
    if (this.state.isLoading) {
      return true;
    } else if (
      type === "SINGLE_SELECT" ||
      type === "SINGLE_SELECT_PASSAGE" ||
      type === "SINGLE_SELECT_IMAGE" ||
      type === "MULTI_CHOICE"
    ) {
      return this.state.selectedChoice.length === 0;
    } else if (type === "SUBJECTIVE" || type === "DESCRIPTIVE") {
      return this.state.answer.trim().length === 0;
    } else if (type === "BUNDLE") {
      return (
        this.state.bundleSelect.length !==
        Math.max.apply(
          Math,
          choices.map((item) => item.bundleNo)
        )
      );
    }
    return true;
  };

  getRemainingTime = (time) => {
    this.time = time;
    if (time === 0) {
      this.setState({ stop: true });
      this.timeOver();
    }
  };

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
    } = this.props.testResponse.data;

    const test_type = sessionStorage.getItem("testType");
    const isQuestionBank = test_type && test_type === "QUESTIONBANK";
    return (
      <div>
        <Container>
          <TitleContainer>
            <Div display={"flex"}>
              {isQuestionBank && (
                <BackIconTag>
                  <ArrowBack />
                </BackIconTag>
              )}
              <TestTitle>{isQuestionBank ? "Question" : testTitle}</TestTitle>
            </Div>
            <TitleHeader>
              {isQuestionBank ? (
                <QuestionTitle padding={"0px"}>{conceptName}</QuestionTitle>
              ) : (
                <>
                  <Div display={"flex"}>
                    <QuestionTitle>{conceptName}</QuestionTitle>
                    <TimeRemaining>
                      {"Time Remaining"}
                      {" -"}
                    </TimeRemaining>
                    <QuestionCount bold={500}>
                      {remainingTime ? secondsToHms(remainingTime) : ""}
                    </QuestionCount>
                  </Div>
                </>
              )}
            </TitleHeader>
          </TitleContainer>
          <Body>{this.renderQuestion()}</Body>
          <Footer>
            <Box>
              {window.screen.width > 1000 ? (
                <img src={BottomBanner} alt={"Web Image"} width={"100%"} />
              ) : (
                <img
                  src={MobileResponsiveImage}
                  alt={"MobileImage"}
                  width={"100%"}
                />
              )}
            </Box>
          </Footer>
        </Container>
      </div>
    );
  }
}

export default Index;
