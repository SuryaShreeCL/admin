import QueryString from "qs";
import React, { Component } from "react";
import { connect } from "react-redux";
import { lms_add_test } from "../../../../Component/RoutePaths";
import { C2, H1 } from "../../../Assets/StyledComponents";
import {
  getConcepts,
  getSubjects,
  getTopics2,
  putImage,
} from "../../../Redux/Action/CourseMaterial";
import {
  cleanEditData,
  getQuestions,
  postQuestions,
} from "../../../Redux/Action/Test";
import Answer from "./Answer";
import Buttons from "./Buttons";
import DropDownRack from "./DropDownRack";
import Explanation from "./Explanation";
import PopUps from "./PopUps";
import Question from "./Question";
import QuestionPreview from "./preview/Index";

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

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
    };
  }

  componentDidMount() {
    const { questionId, courseId } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );

    if (questionId) {
      this.props.getQuestions(questionId, response => {
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
          } = response.data;
          // let diff = response.data.difficultyLevel[0] + response.data.difficultyLevel
          this.setState({
            activeLevel: toTitleCase(difficultyLevel),
            expectedTime,
            question,
            description,
            checked: type === "BUNDLE" ? true : false,
            answerType: type === "BUNDLE" ? "SINGLE_SELECT" : type,
            bucketArray: response.data.questionChoices,
            text: response.data.explanation,
            url: response.data.explanationVideo,
            activeSubject: subject !== null ? subject.id : null,
            activeConcept: concept !== null ? concept.id : null,
            activeTopic: topic !== null ? topic.id : null,
            // editableData: { response },
          });
        }
      });
    } else {
      this.props.getSubjects(courseId, subjectResponse => {
        if (subjectResponse.success) {
          this.props.getConcepts(
            subjectResponse.data[0].id,
            conceptResponse => {
              if (conceptResponse.success) {
                this.props.getTopics2(
                  conceptResponse.data[0].id,
                  topicsResponse => {
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
  }

  componentWillUnmount() {
    this.props.cleanEditData();
  }

  handleSubjectChange = event => {
    this.props.getConcepts(event.target.value, conceptResponse => {
      if (conceptResponse.success) {
        this.props.getTopics2(conceptResponse.data[0].id, topicsResponse => {
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

  handleConceptChange = e => {
    this.props.getTopics2(e.target.value, topicsResponse => {
      if (topicsResponse.success) {
        this.setState({
          activeConcept: e.target.value,
          activeTopic: topicsResponse.data[0].id,
        });
      }
    });
  };

  handleTopicChange = e => {
    this.setState({ activeTopic: e.target.value });
  };

  handleInputChange = e => {
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

  handleTabChange = value => {
    this.setState({ activeTab: value });
  };

  handleAddBucket = () => {
    let arr = this.state.bucketArray;
    let count = this.state.bucketArray.length + 1;
    arr.push({
      tabLabel: "Bucket " + count,

      choices: [{ text: "", image: null, selected: false }],
    });
    this.setState({ bucketArray: arr, activeTab: count - 1 });
  };

  handleRadioChange = e => {
    if (e.target.value === "SUBJECTIVE") {
      this.setState({
        answerType: e.target.value,
        bucketArray: [
          {
            choices: [{ id: null, text: "", image: null, selected: true }],
          },
        ],
      });
    } else
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

  handleCheckBoxes = e => {
    const { activeTab } = this.state;
    if (this.state.answerType === "SINGLE_SELECT") {
      let arr = this.state.bucketArray;
      if (arr[activeTab].choices[e.target.value].selected) {
        arr[activeTab].choices[e.target.value].selected = false;
        this.setState({ bucketArray: arr });
      } else {
        arr[activeTab].choices.map(item => (item.selected = false));
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
    if (this.state.bucketArray[this.state.activeTab].choices.length < 5) {
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
      this.props.putImage(formData, response => {
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

  handleThreeDotClick = e => {
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
        activeTab: this.state.activeTab - 1,
        bucketArray: arr,
        anchorEl: null,
      });
    }
  };

  handleDeleteIconClick = index => {
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

  handleUrlChange = e => {
    this.setState({
      url: e.target.value,
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
    } = this.state;

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
      activeLevel.length === 0 ||
      (this.props.topics && this.state.expectedTime.length === 0) ||
      question.length === 0 ||
      answerType.length === 0 ||
      this.choiceEmptyCheck() ||
      this.choicesSelectEmptyCheck()
    ) {
      this.setState({
        alert: {
          severity: "error",
          msg: "Please fill the required fields",
        },
      });
    } else if (this.hasDuplicates()) {
      this.setState({
        alert: {
          severity: "error",
          msg: "Please change duplicate options",
        },
      });
    } else {
      const obj = {
        id: questionId !== undefined ? questionId : null,
        name: "",
        type: this.getType(),
        difficultyLevel: activeLevel.toUpperCase(),
        expectedTime: expectedTime,
        topic: { id: activeTopic.length === 0 ? null : activeTopic },
        testSection: { id: sectionId },
        question,
        description,
        choices: this.getChoices(),
        explanation: this.state.text,
        explanationVideo: this.state.url,
      };

      this.props.postQuestions(testQuestionSetId, obj, response => {
        if (response.success) {
          this.props.history.push(
            lms_add_test + "?testQuestionSetId=" + testQuestionSetId
          );
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
              ? // || arr[i].choices[j].text.length !== 0
                arr[i].choices[j].image.fileName
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
            arr[i].choices[j].text.length === 0) &&
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

  handlePreviewClick = () => {
    this.setState({ openPreview: true });

    // this.props.history.push(gmat_preview);
  };

  handleClosePreview = () => {
    this.setState({ openPreview: false });
  };

  render() {
    const { subjects, concepts, topics, editData } = this.props;

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
    } = this;

    const { history, location, match } = this.props;

    const difficulty = [
      { id: "Easy", title: "Easy" },
      { id: "Medium", title: "Medium" },
      { id: "Hard", title: "Hard" },
    ];

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
    };

    const explanationProps = {
      text,
      url,
      handleExpTextChange,
      handleUrlChange,
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
          isHaveDescription: description,
          choices: this.getChoices(),
          description,
          totalBundle: bucketArray.length,
        },
      },
    };

    const id = QueryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).questionId;

    // console.log(this.state);
    return (
      <div>
        <C2>
          <H1>{id !== undefined ? "Edit Test" : "Add New Test"}</H1>
          <DropDownRack {...dropDownRackProps} />
          <Question {...questionProps} />
          <Answer {...answerProps} />
          <Explanation {...explanationProps} />
        </C2>
        <Buttons {...buttonsProps} />
        <PopUps {...popUpProps} />
        <QuestionPreview {...questionPreviewProps} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    subjects: state.CourseMaterialReducer.subjects,
    concepts: state.CourseMaterialReducer.concepts,
    topics: state.CourseMaterialReducer.topics,
    editData: state.TestReducer.editData,
  };
};

export default connect(mapStateToProps, {
  getSubjects,
  getConcepts,
  getTopics2,
  putImage,
  postQuestions,
  getQuestions,
  cleanEditData,
})(Index);
