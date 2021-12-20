/**
 * (c) CareerLabs. All rights reserved.
 **/

import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider, Typography } from "@material-ui/core";
import {
  Content,
  gmatTheme,
  HeaderBox,
  Inline,
  TimerBox,
  Header,
  Box,
  Filler,
} from "../../../../../Assets/css/Preview/GmatStyles";

import QueryString from "qs";
import Footer from "./Footer";
import { connect } from "react-redux";

import SubHeader from "./SubHeader";
import Test from "./Test";
import MessageIcon from "../../../../../Assets/icons/MessageIconWhite.svg";
import ClockIcon from "../../../../../Assets/icons/ClockIconWhite.svg";
import BookmarkIcon from "../../../../../Assets/icons/Bookmarks.svg";
import Transition from "../../../../../Utils/Transition";
import Dialog from "@material-ui/core/Dialog";
// import PauseExamPopup from "./PauseExamPopup";
// import {
//   getInstructions,
//   getTestSection,
//   sectionOrder,
//   cleanUp,
//   pauseExam,
//   startTest2,
//   submitAnswer,
// } from "../../../../../redux/action/Test";
// import GmatInstruction from "./GmatInstruction";
// import Section from "./Section";
// import EndSection from "./EndSection";
// import _ from "lodash";
// import { retakeExam } from "../../../../../redux/action/Dashboard";
// import { routePaths } from "../../../../../routes/RoutePath";
// import Timer from "../../../../../utils/components/Timer";
// import Confirmation from "./Confirmation";
// import RequiredPopup from "./RequiredPopup";
// import DialogComponent from "../../../../../utils/components/DialogComponent";
// import {
//   AddBookmarks,
//   removeDemoBookmark,
// } from "../../../../../redux/action/Practice";

// import { withTranslation } from "react-i18next";

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

    // this.gmatRoutes = [
    // {
    //   path: `${routePaths.gmat.instruction}`,
    //   render: props => <GmatInstruction {...this} {...this.props} />,
    //   exact: true,
    // },
    // {
    //   path: `${routePaths.gmat.section}`,
    //   render: props => <Section {...this} {...this.props} />,
    //   exact: true,
    // },
    // {
    //   path: `${routePaths.gmat.endSection}`,
    //   render: props => <EndSection {...this} {...this.props} />,
    //   exact: true,
    // },
    // {
    //   path: `${routePaths.gmat.test}`,
    //   render: () => <Test {...this} {...this.props} />,
    //   exact: true,
    // },
    // ];
    // }

    // componentDidMount() {
    //   const { testQuestionSetId, section } = QueryString.parse(
    //     this.props.location.search,
    //     {
    //       ignoreQueryPrefix: true,
    //     }
    //   );

    //   this.props.getInstructions(testQuestionSetId, response => {});
    // }

    // Pause button on the bottom
    // handlePause = pathName => {
    //   this.setState({ modelOpen: true });
    // };

    // Closing the pause dialog
    // handleContinueClick = () => {
    //   this.setState({ modelOpen: false });
    // };

    // Previous button ont he footer
    // handlePrevious = () => {
    // const { pathname: pathName } = this.props.location;
    // const { testQuestionSetId, section, resume } = QueryString.parse(
    //   this.props.location.search,
    //   {
    //     ignoreQueryPrefix: true,
    //   }
    // );
    // if (section)
    //   this.props.history.push(
    //     routePaths.gmat.section + "?testQuestionSetId=" + testQuestionSetId
    //   );
    // else if (pathName === routePaths.gmat.section)
    //   this.props.history.push(
    //     routePaths.gmat.instruction + "?testQuestionSetId=" + testQuestionSetId
    //   );
    // else if (pathName === routePaths.gmat.instruction && resume) {
    //   // Test Resume Route
    //   if (JSON.parse(localStorage.getItem("singleCourse")))
    //     this.props.history.push(routePaths.calibration);
    //   else this.props.history.push(routePaths.multi);
    // } else if (pathName === routePaths.gmat.instruction)
    //   this.props.history.push(routePaths.start);
    // };

    // Next button on footer
    // handleNext = () => {
    // const { pathname: pathName } = this.props.location;
    // const { testQuestionSetId, section } = QueryString.parse(
    //   this.props.location.search,
    //   {
    //     ignoreQueryPrefix: true,
    //   }
    // );
    // if (pathName === routePaths.gmat.instruction && !section) {
    //   if (this.props.getInstructionsResponse.data.exist === null) {
    //     this.props.history.push(
    //       routePaths.gmat.section + "?testQuestionSetId=" + testQuestionSetId
    //     );
    //   } else {
    //     this.props.history.push(
    //       `${routePaths.gmat.test}?testQuestionSetId=${testQuestionSetId}&section=true`
    //     );
    //   }
    // } else if (pathName === routePaths.gmat.section) {
    //   this.props.history.push(
    //     `${routePaths.gmat.instruction}?testQuestionSetId=${testQuestionSetId}&section=true`
    //   );
    // } else if (pathName === routePaths.gmat.instruction && section)
    //   this.props.history.push(
    //     `${routePaths.gmat.test}?testQuestionSetId=${testQuestionSetId}&section=true`
    //   );
    // else if (pathName === routePaths.gmat.endSection) {
    //   if (this.props.testResponse !== null)
    //     if (this.props.testResponse.message === "You Complete the Test") {
    //       this.props.history.push(routePaths.progress);
    //     } else if (this.props.testResponse.message === "Next TestSection") {
    //       // localStorage.setItem(
    //       //   'calibrationSection',
    //       //   JSON.stringify({ section: 2 })
    //       // );Timer
    //       this.props.history.push(
    //         `${routePaths.gmat.instruction}?testQuestionSetId=${testQuestionSetId}&section=true`
    //       );
    //     }
    // } else if (pathName === routePaths.gmat.test) {
    //   if (
    //     this.state.textAnswer === "" &&
    //     this.state.selectedChoice.length === 0 &&
    //     this.state.bundleSelect.length !==
    //       this.props.testResponse.data.totalBundle
    //   )
    //     this.setState({ required: true });
    //   else this.setState({ confirmation: true });
    // }
    // };

    // pauseExam = () => {
    // const { pathname: pathName } = this.props.location;
    // const { testQuestionId } = QueryString.parse(this.props.location.search, {
    //   ignoreQueryPrefix: true,
    // });
    // if (
    //   pathName === routePaths.gmat.instruction ||
    //   pathName === routePaths.gmat.section ||
    //   pathName === routePaths.gmat.endSection
    // ) {
    //   if (localStorage.getItem("singleCourse") === "true") {
    //     this.props.history.push(routePaths.calibration);
    //   } else {
    //     console.log(JSON.parse(localStorage.getItem("singleCourse")));
    //     this.props.history.push(routePaths.multi);
    //   }
    // } else if (pathName === routePaths.gmat.test) {
    //   this.props.pauseExam(
    //     this.props.testResponse.data.id,
    //     this.props.testResponse.data.testExecutionId,
    //     this.state.time,
    //     response => {
    //       if (response.success) {
    //         if (this.props.testResponse.data.testType === "CALIBRATION") {
    //           if (localStorage.getItem("singleCourse") === "true") {
    //             this.props.history.push(routePaths.calibration);
    //           } else {
    //             this.props.history.push(routePaths.multi);
    //           }
    //         }
    //       }
    //     }
    //   );
    // }
    // };

    // Handling section selection page radio change
    // handleRadioChange = e => {
    //   let obj = {
    //     testSections: this.props.getInstructionsResponse.data.testSections[
    //       parseInt(e.target.value)
    //     ],
    //   };

    //   const { testQuestionSetId } = QueryString.parse(
    //     this.props.location.search,
    //     {
    //       ignoreQueryPrefix: true,
    //     }
    //   );

    //   this.props.sectionOrder(obj, res => {
    //     if (res) this.props.getInstructions(testQuestionSetId, response => {});
    //   });
    // };

    // onSelect = e => {
    //   this.setState({
    //     selectedChoice: e.target.value,
    //   });
    // };

    // onMultiSelect = event => {
    //   const { selectedChoice } = this.state;
    //   const { value, checked } = event.target;
    //   let arr = selectedChoice;
    //   if (checked) arr.push(value);
    //   else arr = arr.filter(item => item !== value);
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

    // onTextChange = e => {
    //   this.setState({ textAnswer: e.target.value });
    // };

    // // Required Popup Ok Button Click && Confirmation Dialog No Click
    // handleOkClick = () => {
    //   this.setState({ required: false, confirmation: false });
    // };

    // handleYesClick = () => {
    // const { testQuestionSetId } = QueryString.parse(
    //   this.props.location.search,
    //   {
    //     ignoreQueryPrefix: true,
    //   }
    // );
    // let obj = {
    //   testExecutionId: this.props.testResponse.data.testExecutionId,
    //   questionId: this.props.testResponse.data.id,
    //   choices:
    //     this.state.textAnswer === ""
    //       ? this.props.testResponse.data.type === "BUNDLE"
    //         ? this.state.bundleSelect.map(item => item.id)
    //         : this.props.testResponse.data.type === "MULTI_CHOICE"
    //         ? this.state.selectedChoice
    //         : [this.state.selectedChoice]
    //       : [],
    //   answer: this.state.textAnswer,
    //   time: this.state.time,
    // };
    // this.props.submitAnswer(obj, response => {
    //   this.setState({ isLoading: false });
    //   if (response.success) {
    //     if (response.message === "You Complete the Test") {
    //       this.props.history.push(
    //         `${routePaths.gmat.endSection}?testQuestionSetId=${testQuestionSetId}&section=true`
    //       );
    //     } else if (response.message === "Next TestSection") {
    //       this.props.history.push(
    //         `${routePaths.gmat.endSection}?testQuestionSetId=${testQuestionSetId}&section=true`
    //       );
    //     }
    //     this.setState({
    //       selectedChoice: [],
    //       textAnswer: "",
    //       bundleSelect: [],
    //       confirmation: false,
    //     });
    //   }
    // });
  }

  // timeOver = () => {
  // const { testQuestionSetId } = QueryString.parse(
  //   this.props.location.search,
  //   {
  //     ignoreQueryPrefix: true,
  //   }
  // );
  // let obj = {
  //   testExecutionId: this.props.testResponse.data.testExecutionId,
  //   questionId: this.props.testResponse.data.id,
  //   choices: [],
  //   answer: this.state.textAnswer,
  //   time: -1,
  // };
  // this.props.submitAnswer(obj, response => {
  //   if (response.success) {
  //     if (response.message === "You Complete the Test") {
  //       this.props.history.push(routePaths.progress);
  //       // }
  //     } else if (response.message === "Next TestSection") {
  //       this.props.history.push(
  //         `${routePaths.gmat.instruction}?testQuestionSetId=${testQuestionSetId}&section=true`
  //       );
  //     } else {
  //       this.setState({
  //         stopTimer: false,
  //         selectedChoice: [],
  //         answer: "",
  //         bundleSelect: [],
  //         resetTime: true,
  //       });
  //     }
  //   }
  // });
  // };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.time !== this.state.time) {
  //     if (this.state.time === 0) {
  //       this.setState({ stopTimer: true });
  //       this.timeOver();
  //     }
  //   }

  //   if (prevProps.testResponse !== this.props.testResponse) {
  //     this.setState({
  //       resetTime: !this.state.resetTime,
  //       isBookmarked: this.props.testResponse.data.isBookmarked,
  //     });
  //   }
  // }

  // // Bookmark dialog buttons

  // handleBookmarkIconClick = () => {
  //   if (this.state.isBookmarked) this.setState({ bookmarkDialog: true });
  //   else this.handleButton2Click();
  // };

  // handleButton1Click = () => {
  //   this.setState({ bookmarkDialog: false });
  // };

  // handleButton2Click = () => {
  //   const id = this.props.testResponse.data.id;
  //   const bookmarkData = { id: id, type: "question" };
  //   this.props.AddBookmarks(bookmarkData, response => {
  //     if (response.success) {
  //       if (false) {
  //         this.removeDemoBookmarkFunction();
  //       }
  //       this.setState({
  //         isBookmarked: response.data.isBookmarked,
  //         bookmarkDialog: false,
  //       });
  //     }
  //   });
  // };

  render() {
    const { section } = QueryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    const { pathname: pathName } = this.props.location;
    const { t } = this.props;

    const { open, handleClose } = this.props;

    // console.log(this.props);
    return (
      <Box style={{ height: "100vh" }}>
        <ThemeProvider theme={gmatTheme}>
          {/* Header */}
          <Header>
            <Typography variant="h1">GMAT Calibration Test</Typography>
            {/* {this.props.testResponse && ( */}
            <HeaderBox>
              <Inline>
                {/* <Filler /> */}
                <img src={ClockIcon} alt="" className="white_clock" />
                <Typography variant="body1" className="inline_class">
                  Time Remaining
                </Typography>

                <Typography variant="body1">
                  <TimerBox>23:59:59</TimerBox>
                </Typography>
              </Inline>
              <Inline>
                <Filler />
                <img src={MessageIcon} alt="" className="white_clock" />
                <Typography variant="body1">{`1 of 99`}</Typography>
              </Inline>
            </HeaderBox>
          </Header>
          <SubHeader
            sectionTitle={
              // !_.isEmpty(this.props.section) &&
              // this.props.section.data.testSection.name
              "Section 99"
            }
            section={true}
            location={this.props.location}
            // bookmarkIconClick={this.handleBookmarkIconClick}
            isBookmarked={false}
          />
          <Content>
            <Test {...this} {...this.props} />
            {/* <Switch>
              {this.gmatRoutes.map(item => (
                <Route {...item} />
              ))}
            </Switch> */}
          </Content>

          {/* -------- Footer --------- */}
          <Footer {...this} {...this.props} />
          {/* <RequiredPopup onOk={this.handleOkClick} open={this.state.required} /> */}
          {/* <Confirmation
            open={this.state.confirmation}
            onNo={this.handleOkClick}
            onYes={this.handleYesClick}
          /> */}
        </ThemeProvider>
        {/* <PauseExamPopup {...this} />
        <DialogComponent
          open={this.state.bookmarkDialog}
          dialogContent={{
            icon: <img src={BookmarkIcon} />,
            title: t(`Are you sure you want remove bookmark?`),
            button1: t("Cancel"),
            button2: t("Yes"),
          }}
          handleButton1Click={this.handleButton1Click}
          handleButton2Click={this.handleButton2Click}
        /> */}
      </Box>
    );
  }
}

const mapStateToProps = state => {
  return {
    // getInstructionsResponse: state.testReducer.instructions,
    // section: state.testReducer.testSection,
    // testResponse: state.testReducer.testResponse,
  };
};

export default connect(mapStateToProps, {})(GmatLayout);

// {
//   ()=>{},
//   // getInstructions,
//   // getTestSection,
//   // sectionOrder,
//   // cleanUp,
//   // pauseExam,
//   // startTest2,
//   // submitAnswer,
//   // // retakeExam,
//   // AddBookmarks,
//   // removeDemoBookmark,
// }
