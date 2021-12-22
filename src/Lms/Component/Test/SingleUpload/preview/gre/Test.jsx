import { Box } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
// import _ from 'lodash';
// import QueryString from 'qs';
import React, { Component } from "react";
// import { withTranslation } from 'react-i18next';
// import { connect } from "react-redux";
import {
  greTheme,
  ContinueButton,
} from "../../../../../Assets/css/Preview/GreStyles";

import {
  PauseModelSubTitle,
  PauseModelTitle,
  QuitButton,
} from "../../../../../Assets/css/Preview/TestComponent";

// import DialogComponent from '../../../../utils/components/DialogComponent';
import BookmarkIcon from "../../../../../Assets/icons/Bookmarks.svg";
// import PauseModelIcon from "../../../../../Assets/icons/pause.svg";
import PauseModelIcon from "../../../../../Assets/icons/pause.svg";

// import { retakeExam } from "../../../../../redux/action/Dashboard";
// import {
//   AddBookmarks,
//   removeDemoBookmark,
// } from "../../../../../redux/action/Practice";
// import {
//   getTestSection,
//   pauseExam,
//   startTest,
//   submitAnswer,
// } from "../../../../../redux/action/Test";
// import { routePaths } from "../../../../../routes/RoutePath";
// import DialogComponent from "../../../../../utils/components/DialogComponent";
// import PageLoader from "../../../../../utils/components/PageLoader";
// import Model from "../../../../../utils/Model";
import Bundle from "./components/Bundle";
// import Calculator from "./components/Calculator";
import Confirmation from "./components/Confirmation";
import Passage from "./components/Passage";
import SingleMulti from "./components/SingleMulti";
import Layout from "./Layout";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      selectedChoice: [],
      time: -1,
      answer: "",
      bundleSelect: [],
      modelOpen: false,
      isLoading: false,
      demoBookmark: false,
      bookMarked: false,
      question_Id: null,
      dialogOpen: false,
      showConfirmationDialog: false,
      showCalculator: false,
    };
    this.time = -1;
  }

  // componentDidMount() {
  //   const { testQuestionId, status } = QueryString.parse(
  //     this.props.location.search,
  //     {
  //       ignoreQueryPrefix: true,
  //     }
  //   );
  //   if (testQuestionId) {
  //     this.props.retakeExam(testQuestionId, status, response => {
  //       if (response.success) {
  //         if (response.message === "You already Complete the Test") {
  //           this.props.history.push(routePaths.report + "?page=insights");
  //         }
  //         let userProduct = JSON.parse(localStorage.getItem("userProduct"));
  //         userProduct.testExecutionId = response.data.testExecutionId;
  //         localStorage.setItem("userProduct", JSON.stringify(userProduct));
  //         this.setState({
  //           question: response.data,
  //           question_Id: response.data.id,
  //           bookMarked: response.data.isBookmarked,
  //         });
  //       }
  //     });
  //   } else {
  //     this.props.startTest(response => {
  //       if (response.success) {
  //         if (response.message === "You already Complete the Test") {
  //           this.props.history.push(routePaths.report + "?page=insights");
  //         }

  //         let userProduct = JSON.parse(localStorage.getItem("userProduct"));
  //         userProduct.testExecutionId = response.data.testExecutionId;
  //         localStorage.setItem("userProduct", JSON.stringify(userProduct));
  //         this.setState({
  //           question: response.data,
  //           question_Id: response.data.id,
  //           bookMarked: response.data.isBookmarked,
  //         });
  //       }
  //     });
  //   }

  //   if (_.isEmpty(this.props.sectionResponse)) {
  //     this.props.getTestSection();
  //     this.setState({ showSection: true, showBackButton: true });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps !== this.props) {
  //     const { testQuestionSetId, section } = QueryString.parse(
  //       this.props.location.search,
  //       {
  //         ignoreQueryPrefix: true,
  //       }
  //     );
  //     if (_.isEmpty(this.props.sectionResponse)) {
  //       this.props.getTestSection();
  //     }
  //   }
  // }

  // onSelect = choice => {
  //   this.setState({
  //     selectedChoice: choice.id,
  //   });
  // };

  // onMultiSelect = event => {
  //   const { selectedChoice } = this.state;
  //   const { noOfAnswer } = this.state.question;
  //   const { id, checked } = event.target;
  //   let arr = selectedChoice;
  //   if (checked && arr.length < noOfAnswer) arr.push(id);
  //   else arr = arr.filter(item => item !== id);
  //   this.setState({
  //     selectedChoice: arr,
  //   });
  // };

  // onBundleChange = (item, choice) => {
  //   const { bundleSelect } = this.state;
  //   var arr = [];
  //   if (bundleSelect.some(exist => exist.bundleNo === item.bundleNo)) {
  //     if (
  //       bundleSelect.some(
  //         exist => exist.bundleNo === item.bundleNo && exist.id === choice.id
  //       )
  //     ) {
  //       arr = bundleSelect.filter(
  //         exist => exist.bundleNo !== item.bundleNo && exist.id !== choice.id
  //       );
  //     } else {
  //       arr = bundleSelect
  //         .filter(exist => exist.bundleNo !== item.bundleNo)
  //         .concat({ ...item, ...choice });
  //     }
  //   } else {
  //     arr = bundleSelect.concat({ ...item, ...choice });
  //   }
  //   this.setState({ bundleSelect: arr });
  // };

  renderQuestion = () => {
    const {
      type,
      question,
      choices,
      description,
      imgURL,
      isHaveDescription,
      isHaveImage,
      bottomText,
      topText,
      isCalculator,
    } = this.state.question;
    if (type === "SINGLE_SELECT") {
      return isHaveDescription || isHaveImage ? (
        <Passage
          description={description}
          choices={choices}
          selectedChoice={this.state.selectedChoice}
          onSelect={this.onSelect}
          imgUrl={imgURL}
          isCalculator={isCalculator}
          question={question}
          bottomText={bottomText}
          topText={topText}
        />
      ) : (
        <SingleMulti
          question={question}
          options={choices}
          selectedChoice={this.state.selectedChoice}
          onSelect={this.onSelect}
          description={description}
          imgUrl={imgURL}
          isCalculator={isCalculator}
          bottomText={bottomText}
          topText={topText}
        />
      );
    } else if (type === "SUBJECTIVE" || type === "DESCRIPTIVE") {
      return (
        <Passage
          question={question}
          description={description}
          subjective={true}
          onChange={value => this.setState({ answer: value })}
          answer={this.state.answer}
          imgUrl={imgURL}
          isCalculator={isCalculator}
          bottomText={bottomText}
          topText={topText}
        />
      );
    } else if (type === "BUNDLE") {
      return isHaveDescription || isHaveImage ? (
        <Passage
          question={question}
          description={description}
          bundle={true}
          onChange={this.onBundleChange}
          choices={choices}
          bundleLength={Math.max.apply(
            Math,
            choices.map(item => item.bundleNo)
          )}
          selectedChoice={this.state.bundleSelect}
          imgUrl={imgURL}
          isCalculator={isCalculator}
          bottomText={bottomText}
          topText={topText}
        />
      ) : (
        <Bundle
          onChange={this.onBundleChange}
          choices={choices}
          bundleLength={Math.max.apply(
            Math,
            choices.map(item => item.bundleNo)
          )}
          selectedChoice={this.state.bundleSelect}
          question={question}
          bottomText={bottomText}
          topText={topText}
        />
      );
    } else if (type === "MULTI_CHOICE") {
      return isHaveDescription || isHaveImage ? (
        <Passage
          description={description}
          question={question}
          choices={choices}
          selectedChoice={this.state.selectedChoice}
          onSelect={this.onMultiSelect}
          imgUrl={imgURL}
          isMulti={true}
          isCalculator={isCalculator}
          bottomText={bottomText}
          topText={topText}
        />
      ) : (
        <SingleMulti
          question={question}
          options={choices}
          selectedChoice={this.state.selectedChoice}
          onSelect={this.onMultiSelect}
          description={description}
          imgUrl={imgURL}
          isMulti={true}
          isCalculator={isCalculator}
          bottomText={bottomText}
          topText={topText}
        />
      );
    }
  };

  // renderModel = t => {
  //   return (
  //     <Model open={this.state.modelOpen}>
  //       <Box
  //         display={"flex"}
  //         flexDirection={"column"}
  //         p={5}
  //         alignItems={"center"}
  //         justifyContent={"center"}
  //       >
  //         <Box>
  //           <img src={PauseModelIcon} alt="" />
  //         </Box>
  //         <PauseModelTitle>{"Test Paused"}</PauseModelTitle>
  //         <PauseModelSubTitle>
  //           {`Press "Continue" to continue the test`}
  //         </PauseModelSubTitle>
  //         <Box display={"flex"} gridGap={25}>
  //           <QuitButton onClick={this.pauseExam}>{"Quit"}</QuitButton>
  //           <ContinueButton onClick={() => this.setState({ modelOpen: false })}>
  //             {"Continue"}
  //           </ContinueButton>
  //         </Box>
  //       </Box>
  //     </Model>
  //   );
  // };

  // pauseExam = () => {
  //   const { testQuestionId } = QueryString.parse(this.props.location.search, {
  //     ignoreQueryPrefix: true,
  //   });
  //   this.props.pauseExam(
  //     this.state.question.id,
  //     this.state.question.testExecutionId,
  //     this.time,
  //     response => {
  //       if (response.success) {
  //         if (this.state.question.testType === "CALIBRATION") {
  //           if (localStorage.getItem("singleCourse") === "true") {
  //             this.props.history.push(routePaths.calibration);
  //           } else {
  //             this.props.history.push(routePaths.multi);
  //           }
  //         } else if (testQuestionId) {
  //           this.props.history.push(
  //             routePaths.dashboard.questionBank +
  //               "?topicId=" +
  //               this.state.question.topicId
  //           );
  //         }
  //       }
  //     }
  //   );
  // };

  // next = () => {
  //   this.setState({ isLoading: true });

  //   const { currentTestSection, totalNoOfTestSection } = this.state.question;

  //   const { testQuestionSetId } = QueryString.parse(
  //     this.props.location.search,
  //     {
  //       ignoreQueryPrefix: true,
  //     }
  //   );

  //   let obj = {
  //     testExecutionId: this.state.question.testExecutionId,
  //     questionId: this.state.question.id,
  //     choices:
  //       this.state.answer === ""
  //         ? this.state.question.type === "BUNDLE"
  //           ? this.state.bundleSelect.map(item => item.id)
  //           : this.state.question.type === "MULTI_CHOICE"
  //           ? this.state.selectedChoice
  //           : [this.state.selectedChoice]
  //         : [],
  //     answer: this.state.answer,
  //     time: this.time,
  //   };

  //   this.props.submitAnswer(obj, response => {
  //     this.setState({ isLoading: false });
  //     if (response.success) {
  //       // if (response.message === 'You Complete the Test') {
  //       // if (response.data.testType === 'TOPIC') {
  //       //   this.props.history.push(
  //       //     routePaths.dashboard.resultProgress +
  //       //       '?topic=' +
  //       //       this.state.question.testTitle +
  //       //       '&testExecutionId=' +
  //       //       this.state.question.testExecutionId
  //       //   );
  //       // } else {
  //       //   this.props.history.push(routePaths.progress);
  //       // }
  //       // }
  //       // else
  //       if (
  //         response.message === "Next TestSection" ||
  //         response.message === "You Complete the Test"
  //       ) {
  //         // localStorage.setItem(
  //         //   'calibrationSection',
  //         //   JSON.stringify({ section: 2 })
  //         // );
  //         this.props.history.push(
  //           `${
  //             routePaths.gre.end
  //           }?testQuestionSetId=${testQuestionSetId.trim()}&currentSection=${currentTestSection}&totalSection=${totalNoOfTestSection}`
  //           // this.props.history.push(routePaths.testInstructionSection
  //         );
  //       }
  //       this.setState({
  //         question: response.data,
  //         question_Id: response.data.id,
  //         bookMarked: response.data.isBookmarked,
  //         selectedChoice: [],
  //         answer: "",
  //         bundleSelect: [],
  //         showConfirmationDialog: false,
  //       });
  //     }
  //   });
  // };

  // timeOver = () => {
  //   const { testQuestionSetId } = QueryString.parse(
  //     this.props.location.search,
  //     {
  //       ignoreQueryPrefix: true,
  //     }
  //   );
  //   let obj = {
  //     testExecutionId: this.state.question.testExecutionId,
  //     questionId: this.state.question.id,
  //     choices: [],
  //     answer: this.state.answer,
  //     time: -1,
  //   };
  //   this.props.submitAnswer(obj, response => {
  //     if (response.success) {
  //       if (response.message === "You Complete the Test") {
  //         if (response.data.testType === "TOPIC") {
  //           this.props.history.push(
  //             routePaths.dashboard.resultProgress +
  //               "?topic=" +
  //               this.state.question.testTitle +
  //               "&testExecutionId=" +
  //               this.state.question.testExecutionId
  //           );
  //         } else {
  //           this.props.history.push(routePaths.progress);
  //         }
  //       } else if (response.message === "Next TestSection") {
  //         this.props.history.push(
  //           `${
  //             routePaths.gre.instruction
  //           }?testQuestionSetId=${testQuestionSetId.trim()}&section=true`
  //         );
  //       } else {
  //         this.setState({
  //           question: response.data,
  //           question_Id: response.data.id,
  //           bookMarked: response.data.isBookmarked,
  //           stop: false,
  //           selectedChoice: [],
  //           answer: "",
  //           bundleSelect: [],
  //           resetTime: true,
  //         });
  //       }
  //     }
  //   });
  // };

  // disabled = () => {
  //   const { noOfAnswer } = this.state.question;

  //   const { type, choices } = this.state.question;
  //   if (this.state.isLoading) {
  //     return true;
  //   } else if (
  //     type === "SINGLE_SELECT" ||
  //     type === "SINGLE_SELECT_PASSAGE" ||
  //     type === "SINGLE_SELECT_IMAGE"
  //   ) {
  //     return this.state.selectedChoice.length === 0;
  //   } else if (type === "MULTI_CHOICE") {
  //     return this.state.selectedChoice.length !== noOfAnswer;
  //   } else if (type === "SUBJECTIVE" || type === "DESCRIPTIVE") {
  //     return this.state.answer.trim().length === 0;
  //   } else if (type === "BUNDLE") {
  //     return (
  //       this.state.bundleSelect.length !==
  //       Math.max.apply(
  //         Math,
  //         choices.map(item => item.bundleNo)
  //       )
  //     );
  //   }
  //   return true;
  // };

  // handleBookmarkClick = () => {
  //   const { bookMarked } = this.state;
  //   if (bookMarked) this.setState({ dialogOpen: true });
  //   else this.handleButton2Click();
  // };

  // handleButton1Click = () => {
  //   this.setState({ dialogOpen: false });
  // };

  // handleButton2Click = () => {
  //   const { question_Id, demoBookmark } = this.state;
  //   var bookmarkData = { id: question_Id, type: "question" };
  //   this.props.AddBookmarks(bookmarkData, response => {
  //     if (response.success) {
  //       this.setState({
  //         bookMarked: response.data.isBookmarked,
  //         dialogOpen: false,
  //       });
  //     }
  //   });
  // };

  // getRemainingTime = time => {
  //   this.time = time;
  //   if (time === 0) {
  //     this.setState({ stop: true });
  //     this.timeOver();
  //   }
  // };

  render() {
    // if (this.state.question !== null) {
    // const { t } = this.props;
    // const {
    //   currentQuestionNo,
    //   totalNoOfQuestion,
    //   status,
    //   conceptName,
    // } = this.state.question;
    const {
      handleButton1Click,
      handleButton2Click,
      handleBookmarkClick,
    } = this;

    const layoutProps = {
      // handlePauseClick: this.pauseExam,
      showPrimaryButton: true,
      showBookmarkButton: true,
      showPauseButton: true,
      showSection: true,
      primaryButtonText: "Continue",
      isBookmark: this.state.bookMarked,
      loading: this.state.isLoading,
      // showCalculatorButton: this.state.question.isCalculator,
      showCalculatorButton: false,
      question: this.state.question,
      stop: this.state.stop,
      sectionData: this.props.sectionResponse,
      // disabled: this.disabled(),
      disabled: false,
      // handleNextClick: !this.disabled()
      //   ? () => this.setState({ showConfirmationDialog: true })
      //   : () => {},
      handleNextClick: () => {},
      getRemainingTime: this.getRemainingTime,
      handlePauseClick: () => this.setState({ modelOpen: true }),
      handleBookmarkClick: handleBookmarkClick,
      handleCalculatorClick: () => this.setState({ showCalculator: true }),
    };

    const confirmationDialogProps = {
      open: this.state.showConfirmationDialog,
      onYes: this.next,
      onNo: () => {
        this.setState({ showConfirmationDialog: false });
      },
    };
    return (
      <React.Fragment>
        <ThemeProvider theme={greTheme}>
          {/* <Layout {...layoutProps}>{this.renderQuestion()}</Layout> */}
          <Layout {...layoutProps}>hello</Layout>

          {/* Dialog Components */}
        </ThemeProvider>
        <Confirmation {...confirmationDialogProps} />
        {/* <DialogComponent
            open={this.state.dialogOpen}
            dialogContent={{
              icon: <img src={BookmarkIcon} />,
              title: `Are you sure you want remove bookmark?`,
              button1: "Cancel",
              button2: "Yes",
            }}
            handleButton1Click={handleButton1Click}
            handleButton2Click={handleButton2Click}
          /> */}
        {/* {this.renderModel()} */}
        {/* <Calculator
          open={this.state.showCalculator}
          close={() => this.setState({ showCalculator: false })}
        /> */}
      </React.Fragment>
    );
    // } else {
    // return <PageLoader />;
  }
}
// }

// const mapStateToProps = state => {
//   return {
//     sectionResponse: state.testReducer.testSection,
//   };
// };

// export default connect(mapStateToProps, {
//   startTest,
//   submitAnswer,
//   pauseExam,
//   retakeExam,
//   AddBookmarks,
//   removeDemoBookmark,
//   getTestSection,
// })(withTranslation()(Test));

export default Test;
