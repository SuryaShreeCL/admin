import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import DropDown from "../../../Utils/DropDown";
import { RadioButtonsGroup } from "../../../Utils/RadioButton";
import { InputTextField } from "../../../Utils/TextField";
import {
  Card,
  Box,
  TestTitle,
  Cancel,
  Save,
  Divider,
} from "../../../Assets/StyledComponents";
import CalibrationTestCard from "./CalibrationTestCard";
import TopicTestCard from "./TopicTestCard";
import TestAddButtonCard from "./TestAddButtonCard";
import { AutocompleteText } from "../../../Utils/Autocomplete";
import { getCourses } from "../../../Redux/Action/CourseMaterial";
import {
  createTestQuestionSet,
  getTopicByCourse,
} from "../../../Redux/Action/Test";
import { connect } from "react-redux";
import QueryString from "qs";
import { SnackBar } from "../../../Utils/SnackBar";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testQuestionSetId: null,
      type: "CALIBRATION",
      name: "",
      description: [],
      descriptionTitle: "",
      nameDescription: "",
      courseId: undefined,
      topicId: undefined,
      calibrationTestData: [],
      calibrationTotalSection: undefined,
      calibrationActiveSectionTab: 0,
      calibrationSectionTabLabels: [],
      topicTestData: [],
      questionBankData: [],
      snackOpen: false,
      snackType: "success",
      message: "",
    };
  }
  componentDidMount() {
    const { testQuestionSet_Id } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
    const { courses } = this.props;
    this.props.getCourses((response) => {
      if (response.success) {
        this.setState({
          courseId: courses.data[0].courseId,
        });
      }
    });
  }
  handleTestChange = (event) => {
    this.setState({ type: event.target.value });
  };

  handleInstructionChange = (e, newValue) => {
    this.setState({ description: newValue });
  };

  handleSectionChange = (e) => {
    const { calibrationSectionTabLabels } = this.state;
    const { value } = e.target;
    this.setState({ calibrationTotalSection: value });
    let tabArr = [];
    let testArr = [];
    if (calibrationSectionTabLabels.length > value) {
      tabArr = calibrationSectionTabLabels.slice(0, value);
    } else {
      for (let i = tabArr.length; i < value; i++) {
        tabArr.push({
          tabLabel: `Section ${i + 1}`,
        });
        testArr.push({
          id: null,
          name: "",
          duration: "",
          noOfQuestions: "",
        });
      }
    }
    this.setState({
      calibrationSectionTabLabels: tabArr,
      calibrationTestData: testArr,
      calibrationActiveSectionTab: value,
    });
  };

  handleTabChange = (e, newValue) => {
    this.setState({ calibrationActiveSectionTab: newValue + 1 });
  };

  handleAddQuestion = () => {};

  handleCalibrationTestProperties = (index, event) => {
    const calibrationTestData = [...this.state.calibrationTestData];
    const { name, value } = event.target;
    calibrationTestData[index][name] = value;
    this.setState({
      calibrationTestData,
    });
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
    if (name === "courseId") {
      this.props.getTopicByCourse(value, (topicResponse) => {
        if (topicResponse.success) {
          console.log("ok");
          this.setState({ topicId: this.props.topics.data[0].id });
        }
      });
    }
  };

  render() {
    const {
      type,
      description,
      calibrationTestData,
      testId,
      name,
      descriptionTitle,
      nameDescription,
      courseId,
      topicId,
      calibrationActiveSectionTab,
      calibrationTotalSection,
      calibrationSectionTabLabels,
      snackOpen,
      snackType,
      message,
    } = this.state;
    const { courses, topics } = this.props;
    //testQuestionSet
    return (
      <Card padding={"0px 20px"}>
        <Box display={"flex"} alignItems={"center"}>
          {/* Header */}
          <TestTitle flex={1}>Add new Test</TestTitle>
          <Box display={"flex"} gridGap={"30px"} overflow={"auto"}>
            {/* cancel */}
            <Cancel>Cancel</Cancel>
            {/* save */}
            <Save>Save</Save>
          </Box>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <DropDown
              label="Course"
              name="courseId"
              items={
                (courses.length !== 0 &&
                  courses.data.map((item) => ({
                    id: item.courseId,
                    title: item.title,
                  }))) ||
                []
              }
              value={courseId}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <RadioButtonsGroup
              radioData={{
                name: "type",
                activeValue: type,
                radioItemData: [
                  { id: "CALIBRATION", label: "Calibration Test" },
                  { id: "TOPIC", label: "Topic Test" },
                  { id: "QUESTIONBANK", label: "Question Bank" },
                ],
                handleRadioChange: this.handleTestChange,
                groupName: "Test Type",
                marginRightValue: "56px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            {type === "CALIBRATION" ? (
              <div>
                <InputTextField
                  name="name"
                  onChange={() => {}}
                  //value={""}
                  label="Test name"
                  height="11px"
                />
              </div>
            ) : (
              <DropDown
                label="Topic"
                name="topicId"
                items={topics.data}
                value={topicId}
                onhandleChange={this.handleChange}
              />
            )}
          </Grid>
          {type !== "QUESTIONBANK" ? (
            <>
              <Grid item xs={12} md={8}>
                <InputTextField
                  name="description"
                  onChange={() => {}}
                  //value={""}
                  label="Description"
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputTextField
                  name="descriptionTitle"
                  onChange={() => {}}
                  //value={""}
                  label="Test Instruction heading"
                  height="11px"
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <AutocompleteText
                  autoData={{
                    label: "Test Instruction Details",
                    placeholder: "Details Test Instruction",
                    defaultValue: description,
                    onChange: this.handleInstructionChange,
                  }}
                />
              </Grid>
            </>
          ) : (
            <Divider />
          )}
          {/* description */}
        </Grid>
        {type === "CALIBRATION" && (
          <CalibrationTestCard
            data={{
              tabValue: calibrationActiveSectionTab,
              testData: calibrationTestData,
              sectionChange: this.handleSectionChange,
              tabLabels: calibrationSectionTabLabels,
              totalSection: calibrationTotalSection,
              tabChange: this.handleTabChange,
              testPropertiesChange: this.handleCalibrationTestProperties,
            }}
          />
        )}
        {type === "TOPIC" && <TopicTestCard />}
        {type !== undefined && (
          <TestAddButtonCard addQuestion={this.handleAddQuestion} type={type} />
        )}
        <SnackBar
          snackData={{
            open: snackOpen,
            snackClose: () => {
              this.setState({ snackOpen: false });
            },
            snackType: snackType,
            message: message,
          }}
        />
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.CourseMaterialReducer,
    ...state.TestReducer,
  };
};

export default connect(mapStateToProps, {
  getCourses,
  getTopicByCourse,
  createTestQuestionSet,
})(Add);
