import React, { useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import Transition from "../../../../Utils/Transition";
import GmatPreview from "./gmat/Index";
import "../../../../Assets/css/Preview/Preview.css";
import GrePreview from "./gre/Test";

function Index(props) {
  useEffect(() => {
    if (props.open) window.addEventListener("click", handleClick, true);
  }, [props.open]);

  const handleClick = () => {
    window.removeEventListener("click", handleClick, true);
    props.handleClose();
  };

  const courseTitle = sessionStorage.getItem("courseTitle");

  // const testProps = {
  //   testResponse: {
  //     success: true,
  //     message: "TestExecution Created",
  //     isNextSection: false,
  //     data: {
  //       id: "10a63c69-98b0-4cd4-8b21-b06b577a4c86",
  //       name: "Model Question",
  //       question:
  //         "<p>Do the following statements agree with the claims of the writer in the text?</p>",
  //       type: "SINGLE_SELECT",
  //       description:
  //         "<p>Entrepreneurs regularly nurture ventures by other like-minded individuals. They also invest in community projects and provide financial support to local charities. This enables further development beyond their own ventures. Some famous entrepreneurs, like Bill Gates, have used their money to finance good causes, from education to public health. The qualities that make one an entrepreneur are the same qualities that motivate entrepreneurs to pay it forward. 1</p>",
  //       imgURL: null,
  //       questionBankId: null,
  //       testQuestionsSetId: "d994b5b5-dd9e-4457-a99a-47ba72154c39",
  //       orderNo: 1,
  //       currentQuestionNo: 1,
  //       totalBundle: null,
  //       conceptName: "Arithmetic",
  //       status: 0,
  //       testSectionId: "ab2730cc-7e39-472a-a5b1-bcd71914dfd1",
  //       topicId: "ad526d4e-f056-4697-a482-ab2694db1383",
  //       resetTime: true,
  //       testExecutionId: "2b9ae944-bd8a-48b3-9892-76a7579a3cdd",
  //       totalNoOfQuestion: 15,
  //       remainingTime: 1200,
  //       testTitle: "Calibration Test",
  //       testType: "CALIBRATION",
  //       questions: null,
  //       isBookmarked: false,
  //       isHaveDescription: true,
  //       isHaveImage: false,
  //       expectedTime: null,
  //       score: null,
  //       isCalculator: false,
  //       topText: null,
  //       bottomText: "Select one answer choice.",
  //       noOfAnswer: 1,
  //       testSectionName: "Section 2",
  //       currentTestSection: 1,
  //       totalNoOfTestSection: 2,
  //       choices: [
  //         {
  //           id: "72979667-6d3c-44cc-9c10-defa10cc2c86",
  //           type: "TEXT",
  //           text: "First",
  //           choiceImage: null,
  //           mappedCourses: [],
  //           bundleNo: null,
  //           orderNo: 1,
  //           createdAt: null,
  //           updatedAt: null,
  //           imageUrl: null,
  //           imageType: null,
  //           correctChoice: null,
  //         },
  //         {
  //           id: "afca3b57-6b78-4ffb-9215-693c47c65606",
  //           type: "TEXT",
  //           text: "Second",
  //           choiceImage: null,
  //           mappedCourses: [],
  //           bundleNo: null,
  //           orderNo: 2,
  //           createdAt: null,
  //           updatedAt: null,
  //           imageUrl: null,
  //           imageType: null,
  //           correctChoice: null,
  //         },
  //         {
  //           id: "cb2c2668-8521-4f40-9798-2e7fc96cc42f",
  //           type: "TEXT",
  //           text: "Thrird",
  //           choiceImage: null,
  //           mappedCourses: [],
  //           bundleNo: null,
  //           orderNo: 3,
  //           createdAt: null,
  //           updatedAt: null,
  //           imageUrl: null,
  //           imageType: null,
  //           correctChoice: null,
  //         },
  //         {
  //           id: "2b3cad2e-d14e-4cdc-ba85-bf267ae327f7",
  //           type: "TEXT",
  //           text: "Fourth",
  //           choiceImage: null,
  //           mappedCourses: [],
  //           bundleNo: null,
  //           orderNo: 4,
  //           createdAt: null,
  //           updatedAt: null,
  //           imageUrl: null,
  //           imageType: null,
  //           correctChoice: null,
  //         },
  //       ],
  //     },
  //   },
  // };

  // console.log(props);
  switch (courseTitle) {
    case "GMAT":
      return (
        <Dialog fullScreen TransitionComponent={Transition} open={props.open}>
          <GmatPreview {...props} />
        </Dialog>
      );
      break;

    case "GRE":
      return (
        <Dialog fullScreen TransitionComponent={Transition} open={props.open}>
          <GrePreview {...props} />
        </Dialog>
      );
      break;

    default:
      return (
        <Dialog fullScreen TransitionComponent={Transition} open={props.open}>
          <h1>hello</h1>
        </Dialog>
      );
  }
}

export default Index;
