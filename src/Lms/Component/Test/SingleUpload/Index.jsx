import QueryString from "qs";
import React, { Component } from "react";
import { connect } from "react-redux";
import { lms_add_test } from "../../../../Component/RoutePaths";
import { C2, H1, BackIconBox } from "../../../Assets/StyledComponents";
import {
  getConcepts,
  getSubjects,
  getTopics2,
  putImage,
} from "../../../Redux/Action/CourseMaterial";
import {
  cleanEditData,
  getQuestions,
  aegetQuestions,
  postQuestions,
  aepostQuestions,
  previewTestData,
  aepreviewTestData,
  getCourseByTestQuestionSetId,
  getQuestionTypeList,
} from "../../../Redux/Action/Test";
import Answer from "./Answer";
import Buttons from "./Buttons";
import DropDownRack from "./DropDownRack";
import Explanation from "./Explanation";
import PopUps from "./PopUps";
import Question from "./Question";
import { getAllPassages } from "../../../Redux/Action/Passage";
import QuestionPreview from "./preview/Index";
import { IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const DEPT_NAMES = {
  assessment_engine_admin: "assessment_engine_admin",
};

const EXPLANATION_VIDEO_LIMIT = 5;
export class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSubject: "",
      activeConcept: "",
      activeTopic: "",
      activeLevel: "",
      expectedTime: 0,
      checked: false,
      activeTab: 0,
      bucketArray: [],
      answerType: "",
      anchorEl: null,
      text: "",
      question: "",
      description: "",
      url: "",
      alert: null,
      editableData: null,
      openPreview: false,
      imgURL: "",
      previewTestDataModel: null,
      videoContent: [{ id: null, videoUrl: "" }],
      separateScore: 0,
      isValidCourse: false,
      isCalibration: false,
      questionType: null,
      subjectName: null,
      courseName: null,
      questionTypeOptions: [],
      test_question_set_id: null,
    };
  }

  videoContentArray(data) {
    if (data && Array.isArray(data) && data.length !== 0) return data;
    else return [{ id: null, videoUrl: "" }];
  }

  isShowQuestionDropDown = () => {
    const deptName = window.sessionStorage.getItem("department");
    const {
      isValidCourse,
      subjectName,
      courseName,
      answerType,
      checked,
    } = this.state;
    const validSubject = "Quant";
    const choiceTypes = ["SINGLE_SELECT", "MULTI_CHOICE", "SUBJECTIVE"];
    var newSubjectName = subjectName || "";
    let isValidSubject = newSubjectName.includes(validSubject);
    return Boolean(
      deptName !== "assessment_engine_admin" &&
        isValidCourse &&
        isValidSubject &&
        !checked &&
        answerType &&
        ((courseName === "GMAT" && answerType === choiceTypes[0]) ||
          courseName === "GRE")
    );
  };

  componentDidMount() {
    var deptName = window.sessionStorage.getItem("department");
    const { questionId, courseId } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
    if (questionId) {
      deptName === "assessment_engine_admin"
        ? this.props.aegetQuestions(questionId, (response) => {
            if (response.success) {
              const {
                difficultyLevel,
                expectedTime,
                question,
                description,
                separateScore,
                type,
                subject,
                concept,
                topic,
                imgURL,
              } = response.data;
              // let diff = response.data.difficultyLevel[0] + response.data.difficultyLevel
              this.setState({
                activeLevel: toTitleCase(difficultyLevel),
                expectedTime,
                separateScore,
                question,
                // separateScore,
                description,
                checked: type === "BUNDLE" ? true : false,
                answerType: type === "BUNDLE" ? "SINGLE_SELECT" : type,
                bucketArray: response.data.questionChoices,
                text: response.data.explanation,
                url: response.data.video ? response.data.video.videoUrl : "",
                activeSubject: subject !== null ? subject.id : null,
                activeConcept: concept !== null ? concept.id : null,
                activeTopic: topic !== null ? topic.id : null,
                imgURL: imgURL,
                // editableData: { response },
              });
            }
          })
        : this.props.getQuestions(questionId, (response) => {
            if (response.success) {
              const {
                difficultyLevel,
                expectedTime,
                question,
                description,
                type,
                subject,
                concept,
                topic,
                imgURL,
              } = response.data;
              // let diff = response.data.difficultyLevel[0] + response.data.difficultyLevel
              console.log(response.data.questionChoices);
              this.setState({
                activeLevel: toTitleCase(difficultyLevel),
                expectedTime,
                question,
                description,
                checked: type === "BUNDLE" ? true : false,
                answerType: type === "BUNDLE" ? "SINGLE_SELECT" : type,
                bucketArray: response.data.questionChoices,
                text: response.data.explanation,
                videoContent: this.videoContentArray(response.data.video),
                activeSubject: subject !== null ? subject.id : null,
                activeConcept: concept !== null ? concept.id : null,
                activeTopic: topic !== null ? topic.id : null,
                imgURL: imgURL,
                // editableData: { response },
                questionType: response.data.optionalType,
              });
            }
          });
    } else {
      this.props.getSubjects(courseId, (subjectResponse) => {
        if (subjectResponse.success) {
          this.props.getConcepts(
            subjectResponse.data[0].id,
            (conceptResponse) => {
              if (conceptResponse.success) {
                this.props.getTopics2(
                  conceptResponse.data[0].id,
                  (topicsResponse) => {
                    if (topicsResponse.success) {
                      this.setState({
                        activeSubject: subjectResponse.data[0].id,
                        activeConcept: conceptResponse.data[0].id,
                        activeTopic: topicsResponse.data[0].id,
                      });
                    }
                  }
                );
              }
            }
          );
        }
      });
    }
    if (deptName !== "assessment_engine_admin") {
      this.props.getAllPassages();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    var deptName = window.sessionStorage.getItem("department");
    const { testQuestionSetId } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
    var newTestQuestionSetId =
      testQuestionSetId || this.props.editData?.data?.testQuestionsSetId;

    const {
      previewTestDataModel,
      isCalibration,
      activeSubject,
      subjectName,
      answerType,
      questionType,
      test_question_set_id,
    } = this.state;
    const { previewData, subjects } = this.props;
    if (
      previewData &&
      previewData.success &&
      previewData !== prevProps.previewData
    ) {
      this.setState({ previewTestDataModel: previewData.data });
    }

    if (isCalibration && prevState.activeSubject !== activeSubject) {
      var newSubjectName = "";
      const subjectsList =
        subjects && subjects.data && Array.isArray(subjects.data)
          ? subjects.data
          : [];
      let obj = subjectsList.filter(({ id }) => id === activeSubject)[0];
      newSubjectName = obj?.title || "";
      if (subjectName !== newSubjectName) {
        this.setState({
          subjectName: newSubjectName,
        });
      }
    }
    if (
      deptName !== "assessment_engine_admin" &&
      newTestQuestionSetId &&
      newTestQuestionSetId !== test_question_set_id
    ) {
      this.setState({ test_question_set_id: newTestQuestionSetId });
      this.props.getCourseByTestQuestionSetId(newTestQuestionSetId, (res) => {
        if (res.success) {
          this.setState({
            isValidCourse: res.data.isValidCourse,
            isCalibration: !Boolean(res.data.subjectName),
            subjectName: res.data.subjectName || "",
            courseName: res.data.courseName || "",
          });
        }
      });
    }

    if (
      this.isShowQuestionDropDown() &&
      (prevState.answerType !== answerType ||
        prevState.activeSubject !== activeSubject ||
        prevState.subjectName !== subjectName)
    ) {
      this.props.getQuestionTypeList(
        newTestQuestionSetId,
        subjectName,
        answerType,
        (res) => {
          if (res.success) {
            let newQuestionType = res.data.some(
              ({ name }) => name === questionType
            )
              ? questionType
              : res.data[0]?.name;
            this.setState({
              questionType: newQuestionType,
              questionTypeOptions: res.data,
            });
          } else {
            this.setState({
              questionTypeOptions: [],
            });
          }
        }
      );
    }
  }

  componentWillUnmount() {
    this.props.cleanEditData();
  }

  handleSubjectChange = (event) => {
    this.props.getConcepts(event.target.value, (conceptResponse) => {
      if (conceptResponse.success) {
        this.props.getTopics2(conceptResponse.data[0].id, (topicsResponse) => {
          if (topicsResponse.success) {
            this.setState({
              activeSubject: event.target.value,
              activeConcept: conceptResponse.data[0].id,
              activeTopic: topicsResponse.data[0].id,
            });
          }
        });
      }
    });
  };

  handleConceptChange = (e) => {
    this.props.getTopics2(e.target.value, (topicsResponse) => {
      if (topicsResponse.success) {
        this.setState({
          activeConcept: e.target.value,
          activeTopic: topicsResponse.data[0].id,
        });
      }
    });
  };

  handleTopicChange = (e) => {
    this.setState({ activeTopic: e.target.value });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSwitch = () => {
    if (!this.state.checked) {
      this.setState({
        checked: !this.state.checked,
        answerType: "SINGLE_SELECT",
        bucketArray: [
          {
            tabLabel: "Bucket 1",
            choices: [
              { id: null, text: "", image: null, selected: false },
              { id: null, text: "", image: null, selected: false },
            ],
          },
          {
            tabLabel: "Bucket 2",
            choices: [
              { id: null, text: "", image: null, selected: false },
              { id: null, text: "", image: null, selected: false },
            ],
          },
        ],
      });
    } else {
      this.setState({
        checked: !this.state.checked,
        answerType: "",
        bucketArray: [],
        activeTab: 0,
      });
    }
  };

  handleTabChange = (value) => {
    this.setState({ activeTab: value });
  };

  handleAddBucket = () => {
    let arr = this.state.bucketArray;
    let count = this.state.bucketArray.length + 1;
    arr.push({
      tabLabel: "Bucket " + count,

      choices: [
        { id: null, text: "", image: null, selected: false },
        { id: null, text: "", image: null, selected: false },
      ],
    });
    this.setState({ bucketArray: arr, activeTab: count - 1 });
  };

  handleRadioChange = (e) => {
    if (e.target.value === "SUBJECTIVE") {
      this.setState({
        answerType: e.target.value,
        bucketArray: [
          {
            choices: [{ id: null, text: "", image: null, selected: true }],
          },
        ],
      });
    } else if (e.target.value === "VIDEO") {
      this.setState({
        answerType: e.target.value,
        expectedTime: 360,
      });
    }
    // else if(e.target.value === "FILE_UPLOAD" ){
    //   this.setState({
    //     answerType:e.target.value,
    //     separateScore:0,
    //   })
    // }
    else if(e.target.value === "VIDEO" ){
      this.setState({
        answerType:e.target.value,
        separateScore:0,
      })
    }
    //  window.location.reload(false);
    else
      this.setState({
        answerType: e.target.value,
        bucketArray: [
          {
            choices: [
              { id: null, text: "", image: null, selected: false },
              { id: null, text: "", image: null, selected: false },
            ],
          },
        ],
      });
  };

  handleCheckBoxes = (e) => {
    const { activeTab } = this.state;
    if (this.state.answerType === "SINGLE_SELECT") {
      let arr = this.state.bucketArray;
      if (arr[activeTab].choices[e.target.value].selected) {
        arr[activeTab].choices[e.target.value].selected = false;
        this.setState({ bucketArray: arr });
      } else {
        arr[activeTab].choices.map((item) => (item.selected = false));
        arr[activeTab].choices[e.target.value].selected = true;
        this.setState({ bucketArray: arr });
      }
    }
    if (this.state.answerType === "MULTI_CHOICE") {
      let arr = this.state.bucketArray;

      arr[activeTab].choices[e.target.value].selected = !arr[activeTab].choices[
        e.target.value
      ].selected;
      this.setState({ bucketArray: arr });
    }
  };

  handleAddOption = () => {
    let limit = 5;
    if (this.state.answerType === "MULTI_CHOICE") limit = 10;

    if (this.state.bucketArray[this.state.activeTab].choices.length < limit) {
      let arr = this.state.bucketArray;
      arr[this.state.activeTab].choices.push({
        id: null,
        text: "",
        image: null,
        selected: false,
      });
      this.setState({ bucketArray: arr });
    }
  };

  handleImageUpload = (e, index) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    if (e.target.files[0].name.match(/.(png|svg|jpeg|jpg)$/i)) {
      this.props.putImage(formData, (response) => {
        if (response.success) {
          let arr = this.state.bucketArray;
          arr[this.state.activeTab].choices[index].image = response.data;
          arr[this.state.activeTab].choices[index].text = null;
          this.setState({ bucketArray: arr });
        }
      });
    } else
      this.setState({
        alert: {
          severity: "error",
          msg: "Please select a valid image (.jpeg | .png | .jpg | .svg )",
        },
      });
  };

  handleThreeDotClick = (e) => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDelete = () => {
    let arr = this.state.bucketArray;
    if (arr.length > 2) {
      arr.pop();
      this.setState({
        activeTab: this.state.activeTab > 0 ? this.state.activeTab - 1 : 0,
        bucketArray: arr,
        anchorEl: null,
      });
    }
  };

  handleDeleteIconClick = (index) => {
    let arr = this.state.bucketArray;
    arr[this.state.activeTab].choices[index].image = null;
    this.setState({ bucketArray: arr });
  };

  handleTextChange = (e, index) => {
    let arr = this.state.bucketArray;
    arr[this.state.activeTab].choices[index].text = e.target.value;
    this.setState({ bucketArray: arr });
  };

  handleExpTextChange = (e, editor) => {
    const data = editor.getData();
    this.setState({ text: data });
  };

  handleUrlChange = (e) => {
    this.setState({
      url: e.target.value,
    });
  };

  handleDeleteChoiceClick = (ind) => {
    console.log(ind, "ind");
    let copyOfBucketArr = [...this.state.bucketArray];
    copyOfBucketArr[this.state.activeTab].choices.splice(ind, 1);
    this.setState({
      bucketArray: copyOfBucketArr,
    });
  };

  // Save Button

  handleSaveClick = () => {
    const {
      activeLevel,
      expectedTime,
      activeTopic,
      question,
      description,
      answerType,
      text,
      url,
      separateScore,
    } = this.state;
    let deptName = window.sessionStorage.getItem("department");

    let { questionId, sectionId, testQuestionSetId } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );

    if (testQuestionSetId === undefined)
      testQuestionSetId = this.props.editData.data.testQuestionsSetId;

    if (sectionId === undefined)
      sectionId =
        this.props.editData !== null
          ? this.props.editData.data.testSectionId
          : null;

    if (
      //       activeLevel.length === 0 ||
      //       (this.props.topics && this.state.expectedTime.length === 0) ||
      //       question.length === 0 ||
      //       answerType.length === 0 &&
      // (answerType!=="VIDEO" &&  this.choiceEmptyCheck()||  this.choicesSelectEmptyCheck())
      // this.choiceEmptyCheck()||
      // this.choicesSelectEmptyCheck()
      activeLevel.length === 0 ||
      (this.props.topics && this.state.expectedTime.length === 0 && this.state.separateScore.length === 0) ||
      question.length === 0 ||
      answerType.length === 0 ||
      // (deptName === "assessment_engine_admin" 
      // &&
        // this.state.separateScore.length === 0
        // )
        
      // this.choiceEmptyCheck() ||
      // this.choicesSelectEmptyCheck()
      (answerType !== "VIDEO" &&
        answerType !== "FILE_UPLOAD" &&
        (this.choiceEmptyCheck() || this.choicesSelectEmptyCheck()))
        // ||
        // this.state.separateScore.length === 0
    ) {
      this.setState({
        alert: {
          severity: "error",
          msg: "Please fill the required fields",
        },
      });
    } else if (answerType !== "VIDEO" && answerType!=="FILE_UPLOAD" && (this.hasDuplicates())) {
      this.setState({
        alert: {
          severity: "error",
          msg: "Please change duplicate options",
        },
      });
    } else if (this.props.topics && Number(this.state.expectedTime <= 0)) {
      this.setState({
        alert: {
          severity: "warning",
          msg: "Please enter a valid expected time",
        },
      });
    } else {
      let deptName = window.sessionStorage.getItem("department");
      const obj =
        deptName === "assessment_engine_admin"
          ? {
              id: questionId !== undefined ? questionId : null,
              name: "",
              type: this.getType(),
              difficultyLevel: activeLevel.toUpperCase(),
              expectedTime: expectedTime,
              topic: { id: activeTopic?.length === 0 ? null : activeTopic },
              testSection: { id: sectionId },
              question,
              choices: this.getChoices(),
              explanation: this.state.text,
              explanationVideo: this.state.url,
              // video: { videoUrl: this.state.url },
              separateScore: separateScore,
            }
          : {
              id: questionId !== undefined ? questionId : null,
              name: "",
              type: this.getType(),
              difficultyLevel: activeLevel.toUpperCase(),
              expectedTime: expectedTime,
              topic: { id: activeTopic?.length === 0 ? null : activeTopic },
              testSection: { id: sectionId },
              question,
              description,
              choices: this.getChoices(),
              explanation: this.state.text,
              explanationVideo: this.state.url,
              video: this.state.videoContent,
              optionalType: this.isShowQuestionDropDown()
                ? this.state.questionType
                : null,
            };

      if (deptName === "assessment_engine_admin" && answerType === "VIDEO") {
        delete obj.choices;
      }

      deptName === "assessment_engine_admin"
        ? this.props.aepostQuestions(testQuestionSetId, obj, (response) => {
            if (response.success) {
              this.props.history.push(
                lms_add_test + "?testQuestionSetId=" + testQuestionSetId
              );
            } else {
              this.setState({
                alert: {
                  severity: "error",
                  msg: response.message,
                },
              });
            }
          })
        : this.props.postQuestions(testQuestionSetId, obj, (response) => {
            if (response.success) {
              this.props.history.push(
                lms_add_test + "?testQuestionSetId=" + testQuestionSetId
              );
            } else {
              this.setState({
                alert: {
                  severity: "error",
                  msg: response.message,
                },
              });
            }
          });
    }
  };

  handleCancelClick = () => {
    let { testQuestionSetId } = QueryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });

    if (testQuestionSetId === undefined)
      testQuestionSetId = this.props.editData.data.testQuestionsSetId;

    this.props.history.push(
      lms_add_test + "?testQuestionSetId=" + testQuestionSetId
    );
  };

  handleQuestionChange = (e, editor) => {
    const data = editor.getData();
    this.setState({ question: data });
  };

  handleDescriptionChange = (e, editor) => {
    const data = editor.getData();
    this.setState({ description: data });
  };

  handlePopUpClose = () => {
    this.setState({ alert: null });
  };

  getType = () => {
    if (this.state.checked) {
      return "BUNDLE";
    } else return this.state.answerType;
  };

  getChoices = () => {
    let arr = this.state.bucketArray;
    let choices = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].choices.length; j++) {
        choices.push({
          id: arr[i].choices[j].id,
          type: arr[i].choices[j].text === null ? "IMAGE" : "TEXT",
          text:
            arr[i].choices[j].text === null
              ? arr[i].choices[j].image.fileName
              : this.state.answerType === "SUBJECTIVE"
              ? arr[i].choices[j].text?.trim()
              : arr[i].choices[j].text,
          orderNo: j + 1,
          bundleNo: arr.length > 1 ? i + 1 : null,
          correctChoice: arr[i].choices[j].selected,
        });
      }
    }
    return choices;
  };

  choiceEmptyCheck = () => {
    let arr = this.state.bucketArray;
    let choices = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].choices.length; j++) {
        if (
          (arr[i].choices[j].text === null ||
            (arr[i].choices[j].text &&
              arr[i].choices[j].text.trim().length === 0)) &&
          arr[i].choices[j].image === null
        ) {
          return true;
        }
      }
    }
    return false;
  };

  choicesSelectEmptyCheck = () => {
    let arr = this.state.bucketArray;
    let choices = [];

    if (this.getType() === "BUNDLE") {
      let value = 0;

      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].choices.length; j++) {
          if (arr[i].choices[j].selected) {
            value++;
          }
        }
      }

      return !(arr.length === value);

      // return false;
    } else
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].choices.length; j++) {
          if (arr[i].choices[j].selected) {
            return false;
          }
        }
      }
    return true;
  };

  hasDuplicates = () => {
    let arr = this.state.bucketArray;
    let choices = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].choices.length; j++) {
        choices.push(arr[i].choices[j].text);
      }
    }
    return new Set(choices).size !== choices.length;
  };

  isEmptyCheck = (string) => {
    if (string && string.toString().trim().length !== 0) return true;
    else return false;
  };

  handlePreviewClick = () => {
    const { description, activeLevel, question, answerType } = this.state;
    let { questionId, sectionId, testQuestionSetId } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
    const topicId = sessionStorage.getItem("topicId");

    let requestBody = {
      choices: this.getChoices(),
      isHaveDescription: this.isEmptyCheck(description),
      // topicId: this.props.location.state.topicId
      //   ? this.props.location.state.topicId
      //   : null,
      testQuestionsSetId: testQuestionSetId ? testQuestionSetId : null,
      testSectionId: sectionId ? sectionId : null,
      type: this.getType(),
    };
    let question_id = questionId ? questionId : "NO_QUESTION";

    if (
      question.length === 0 ||
      answerType.length === 0 ||
      activeLevel.length === 0 ||
      // this.choiceEmptyCheck() ||
      // this.choicesSelectEmptyCheck()
      (answerType !== "VIDEO" &&
        answerType !== "FILE_UPLOAD" &&
        (this.choiceEmptyCheck() || this.choicesSelectEmptyCheck()))
        
    ) {
      this.setState({
        alert: {
          severity: "error",
          msg: "Please fill the required fields",
        },
      });
    } else {
      let deptName = window.sessionStorage.getItem("department");
      deptName === "assessment_engine_admin"
        ? this.props.aepreviewTestData(question_id, requestBody)
        : this.props.previewTestData(question_id, requestBody);
      this.setState({ openPreview: true });
    }
  };

  handleClosePreview = () => {
    this.setState({ openPreview: false });
  };

  handleBackIconClick = () => {
    this.props.history.goBack();
  };

  handleVideoContentAdd = () => {
    const { videoContent } = this.state;
    if (videoContent.length < EXPLANATION_VIDEO_LIMIT) {
      let arr = [...videoContent, { id: null, videoUrl: "" }];
      this.setState({ videoContent: arr });
    }
  };

  handleVideoContentDelete = (index, event) => {
    const { videoContent } = this.state;
    let arr = [...videoContent];
    if (arr.length > 1) arr.pop();
    this.setState({ videoContent: arr });
  };

  handleVideoContentChange = (e) => {
    const { id, value } = e.target;
    const { videoContent } = this.state;
    let arr = [...videoContent];
    arr[id].videoUrl = value;
    this.setState({ videoContent: arr });
  };

  handlePassage = (e, newValue) => {
    this.setState({ description: newValue?.content });
  };

  handleQuestionType = (e, val) => {
    const { questionType } = this.state;
    this.setState({
      questionType: val?.name || questionType,
    });
  };

  render() {
    const { subjects, concepts, topics, editData, passageOptions } = this.props;

    const {
      activeSubject,
      activeConcept,
      activeTopic,
      activeLevel,
      expectedTime,
      checked,
      activeTab,
      bucketArray,
      answerType,
      anchorEl,
      text,
      url,
      question,
      description,
      alert,
      openPreview: open,
      imgURL,
      previewTestDataModel,
      videoContent,
      separateScore,
      questionType,
      questionTypeOptions,
    } = this.state;

    const {
      handleSubjectChange,
      handleConceptChange,
      handleTopicChange,
      handleInputChange,
      handleSwitch,
      handleTabChange,
      handleAddBucket,
      handleRadioChange,
      handleCheckBoxes,
      handleAddOption,
      handleImageUpload,
      handleThreeDotClick,
      handleClose,
      handleDelete,
      handleDeleteIconClick,
      handleTextChange,
      handleExpTextChange,
      handleUrlChange,
      handleSaveClick,
      handleCancelClick,
      handleQuestionChange,
      handleDescriptionChange,
      handlePopUpClose,
      handlePreviewClick,
      handleClosePreview,
      handleVideoContentAdd,
      handleVideoContentDelete,
      handleVideoContentChange,
      handlePassage,
      isShowQuestionDropDown,
      handleQuestionType,
    } = this;

    const { history, location, match } = this.props;
    const { questionId, sectionId, testQuestionSetId } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
    const difficulty = [
      { id: "Easy", title: "Easy" },
      { id: "Medium", title: "Medium" },
      { id: "Hard", title: "Hard" },
    ];

    let deptName = window.sessionStorage.getItem("department");

    let dropDownRackProps = {
      subjects,
      concepts,
      topics,
      activeSubject,
      activeConcept,
      activeTopic,
      handleSubjectChange,
      handleConceptChange,
      handleTopicChange,
      activeLevel,
      difficulty,
      handleInputChange,
      expectedTime,
      type: answerType,
      testQuestionSetId,
      separateScore,
      
    };

    let answerProps = {
      checked,
      handleSwitch,
      activeTab,
      handleTabChange,
      handleAddBucket,
      bucketArray,
      handleRadioChange,
      answerType,
      handleCheckBoxes,
      handleAddOption,
      handleImageUpload,
      handleThreeDotClick,
      anchorEl,
      handleClose,
      handleDelete,
      handleDeleteIconClick,
      handleTextChange,
      editData,
      isShowQuestionDropDown: isShowQuestionDropDown(),
      questionType,
      questionTypeOptions,
      handleQuestionType,
    };

    const explanationProps = {
      text,
      url,
      handleExpTextChange,
      handleUrlChange,
      handleVideoContentAdd,
      handleVideoContentDelete,
      handleVideoContentChange,
      videoContent,
      deptName,
      videoContentLimit: EXPLANATION_VIDEO_LIMIT,
    };

    const buttonsProps = {
      handleSaveClick,
      handleCancelClick,
      handlePreviewClick,
    };

    const questionProps = {
      handleQuestionChange,
      handleDescriptionChange,
      question,
      description,
      passageOptions: { data: [], ...passageOptions }.data,
      handlePassage,
    };

    const popUpProps = {
      handlePopUpClose,
      alert,
    };

    const questionPreviewProps = {
      open,
      handleClose: handleClosePreview,
      history,
      location,
      match,
      testResponse: {
        data: {
          question,
          type: this.getType(),
          isHaveDescription: this.isEmptyCheck(description),
          choices: this.getChoices(),
          description,
          totalBundle: bucketArray.length,
          imgURL,
          isHaveImage: false,
          ...previewTestDataModel,
          video:
            deptName === DEPT_NAMES.assessment_engine_admin
              ? url
              : videoContent,
          videoExplanation: text,
          deptName,
        },
      },
    };

    const id = QueryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).questionId;

    return (
      <div>
        <BackIconBox>
          <IconButton color='primary' onClick={this.handleBackIconClick}>
            <ArrowBack color='primary' />
          </IconButton>
        </BackIconBox>
        <C2>
          <H1>{id !== undefined ? "Edit Test" : "Add New Test"}</H1>
          <DropDownRack {...dropDownRackProps} />
          <Question {...questionProps} />
          <Answer
            handleDeleteChoiceClick={this.handleDeleteChoiceClick}
            {...answerProps}
          />
          <Explanation {...explanationProps} />
        </C2>
        <Buttons {...buttonsProps} />
        <PopUps {...popUpProps} />
        {previewTestDataModel && <QuestionPreview {...questionPreviewProps} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subjects: state.CourseMaterialReducer.subjects,
    concepts: state.CourseMaterialReducer.concepts,
    topics: state.CourseMaterialReducer.topics,
    editData: state.TestReducer.editData,
    previewData: state.TestReducer.previewData,
    passageOptions: state.PassageReducer.nameList,
  };
};

export default connect(mapStateToProps, {
  getSubjects,
  getConcepts,
  getTopics2,
  putImage,
  postQuestions,
  aepostQuestions,
  getQuestions,
  aegetQuestions,
  cleanEditData,
  previewTestData,
  aepreviewTestData,
  getAllPassages,
  getCourseByTestQuestionSetId,
  getQuestionTypeList,
})(Index);
