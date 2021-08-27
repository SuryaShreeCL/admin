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
  getSubjectsByCourse,
  getTestQuestionSet,
} from "../../../Redux/Action/Test";
import { connect } from "react-redux";
import QueryString from "qs";
import { SnackBar } from "../../../Utils/SnackBar";
import { withRouter } from "react-router-dom";
import { bulk_upload, lmsTest } from "../../../../Component/RoutePaths";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testQuestionSetId: null,
      type: "CALIBRATION",
      description: [],
      descriptionTitle: "",
      nameDescription: "",
      courseId: undefined,
      topicId: undefined,
      name: undefined,
      calibrationTestData: [],
      calibrationTotalSection: null,
      calibrationActiveSectionTab: 0,
      calibrationSectionTabLabels: [],
      snackOpen: false,
      snackType: "success",
      message: "",
      sectionId: undefined,
      topicTestSections: {
        id: null,
        duration: null,
        noOfQuestions: null,
      },
    };
  }
  componentDidMount() {
    const { testQuestionSetId } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
    const { type } = this.state;
    this.props.getCourses((response) => {
      if (response.success) {
        if (testQuestionSetId === undefined) {
          if (
            type !== "CALIBRATION" &&
            response.data[0].courseId !== undefined
          ) {
            this.props.getTopicByCourse(
              response.data[0].courseId,
              (topicResponse) => {
                if (topicResponse.success) {
                  this.setState({
                    courseId: response.data[0].courseId,
                    topicId: topicResponse.data[0].id,
                  });
                }
              }
            );
          } else {
            this.setState({
              courseId: response.data[0].courseId,
            });
          }
          if (type === "CALIBRATION") {
            this.props.getSubjectsByCourse(response.data[0].courseId);
          }
        }
      }
    });

    // Editable Mode
    if (testQuestionSetId !== undefined) {
      this.props.getTestQuestionSet(
        testQuestionSetId,
        (testQuestionSetResponse) => {
          if (testQuestionSetResponse.success) {
            const { testQuestionSet } = this.props;
            const questionSet =
              (testQuestionSet.length !== 0 && testQuestionSet.data) || false;

            if (questionSet.type === "CALIBRATION") {
              let tabArr = [];
              questionSet.testSection.map((i, index) => {
                tabArr.push({
                  tabLabel: `Section ${index + 1}`,
                });
              });
              this.props.getSubjectsByCourse(questionSet.course, () => {
              });
              this.setState({
                testQuestionSetId: questionSet.id,
                courseId: questionSet.course,
                name: questionSet.name,
                type: questionSet.type,
                description: questionSet.description,
                descriptionTitle: questionSet.descriptionTitle,
                nameDescription: questionSet.nameDescription,
                calibrationTestData: questionSet.testSection,
                calibrationSectionTabLabels: tabArr,
                calibrationActiveSectionTab: 1,
                calibrationTotalSection: questionSet.testSection.length,
              });
            }

            if (questionSet.type === "TOPIC") {
              this.setState({
                testQuestionSetId: questionSet.id,
                courseId: questionSet.course,
                type: questionSet.type,
                description: questionSet.description,
                descriptionTitle: questionSet.descriptionTitle,
                nameDescription: questionSet.nameDescription,
                topicTestSections: questionSet.testSection[0],
                sectionId: questionSet.testSection[0].id,
              });
            }

            if (questionSet.type === "QUESTIONBANK") {
              this.setState({
                testQuestionSetId: questionSet.id,
                courseId: questionSet.course,
                type: questionSet.type,
                topicId: questionSet.topic,
              });
            }

            if (
              questionSet.type === "QUESTIONBANK" ||
              questionSet.type === "TOPIC"
            ) {
              if (questionSet.course !== undefined) {
                this.props.getTopicByCourse(
                  questionSet.course,
                  (topicResponse) => {
                    if (topicResponse.success) {
                      this.setState({ topicId: questionSet.topic });
                    }
                  }
                );
              }
            }
          }
        }
      );
    }
  }
  handleTestChange = (event) => {
    const { value } = event.target;
    this.setState({ type: value });
    const { courseId } = this.state;
    if (value !== "CALIBRATION" && courseId !== undefined) {
      this.props.getTopicByCourse(courseId, (topicResponse) => {
        if (topicResponse.success) {
          this.setState({
            topicId: topicResponse.data[0].id,
          });
        }
      });
    }
  };

  handleInstructionChange = (e, newValue) => {
    this.setState({ description: newValue });
  };

  handleSectionChange = (e) => {
    const { calibrationSectionTabLabels, calibrationTestData } = this.state;
    const { value } = e.target;
    this.setState({ calibrationTotalSection: value });
    let tabArr = [];
    let testArr = [];
    if (calibrationSectionTabLabels.length > value) {
      tabArr = calibrationSectionTabLabels.slice(0, value);
      testArr = calibrationTestData.slice(0, value);
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

  handleAddQuestion = () => {
    const {
      testQuestionSetId,
      sectionId,
      type,
      calibrationActiveSectionTab,
      calibrationTestData,
    } = this.state;
    if (testQuestionSetId !== null) {
      if (type === "QUESTIONBANK") {
        this.props.history.push(
          bulk_upload + `?testQuestionSetId=${testQuestionSetId}`
        );
      } else {
        if (type === "CALIBRATION") {
          var calibrationSectionId =
            (calibrationTestData.length !== 0 &&
              calibrationTestData[calibrationActiveSectionTab - 1].id) ||
            "";
          this.props.history.push(
            bulk_upload +
              `?testQuestionSetId=${testQuestionSetId}&sectionId=${calibrationSectionId}`
          );
        } else {
          this.props.history.push(
            bulk_upload +
              `?testQuestionSetId=${testQuestionSetId}&sectionId=${sectionId}`
          );
        }
      }
    } else {
      this.setState({
        snackOpen: true,
        snackType: "warning",
        message: "Please save the test",
      });
    }
  };

  handleCalibrationTestProperties = (index, event) => {
    const calibrationTestData = [...this.state.calibrationTestData];
    const { name, value } = event.target;
    calibrationTestData[index][name] = value;
    this.setState({
      calibrationTestData,
    });
  };

  handleChange = (e) => {
    const {
      type,
      topicTestSections,
      calibrationTotalSection,
    } = this.state;
    const { value, name } = e.target;
    if (name === "noOfQuestions" || name === "duration") {
      var tempTopicTestSections = topicTestSections;
      tempTopicTestSections.[name] = value;
      this.setState({
        topicTestSections: tempTopicTestSections,
      });
    } else {
      this.setState({ [name]: value });
    }

    if (name === "courseId" && type !== "CALIBRATION" && value !== undefined) {
      this.props.getTopicByCourse(value, (topicResponse) => {
        if (topicResponse.success) {
          this.setState({ topicId: topicResponse.data[0].id });
        }
      });
    }
    if (name === "courseId" && type === "CALIBRATION" && value !== undefined) {
      this.props.getSubjectsByCourse(value);
      if (calibrationTotalSection !== null) {
        this.setState({
          calibrationSectionTabLabels: [],
          calibrationTestData: [],
          calibrationActiveSectionTab: 0,
          calibrationTotalSection: null,
        });
      }
    }
  };

  handleSaveButton = () => {
    const {
      testQuestionSetId,
      type,
      topicId,
      description,
      descriptionTitle,
      nameDescription,
      topicTestSections,
      name,
      courseId,
      calibrationTestData,
    } = this.state;

    if (type === "QUESTIONBANK") {
      // QUESTIONBANK save action
      if (topicId !== undefined) {
        var questionBankSet = {
          id: testQuestionSetId,
          type: type,
          topic: { id: topicId },
        };
        this.props.createTestQuestionSet(
          questionBankSet,
          (questionBankResponse) => {
            if (questionBankResponse.success) {
              var message = testQuestionSetId === null ? "ADDED" : "UPDATED";
              this.setState({
                snackOpen: true,
                snackType: "success",
                message: `${type} TEST ${message} SUCCESSFULLY`,
                testQuestionSetId: questionBankResponse.data.id,
              });
            }
          }
        );
      } else {
        this.setState({
          snackOpen: true,
          snackType: "warning",
          message: "Please fill all the fields",
        });
      }
    }

    if (type === "TOPIC") {
      // TOPIC Save action
      if (
        nameDescription &&
        topicId !== undefined &&
        topicTestSections.duration > 0 &&
        topicTestSections.noOfQuestions > 0 &&
        nameDescription.trim().length !== 0 &&
        description.length !== 0 &&
        descriptionTitle.trim().length !== 0
      ) {
        var topicTestSet = {
          id: testQuestionSetId,
          type: type,
          topic: { id: topicId },
          description: description,
          descriptionTitle: descriptionTitle,
          nameDescription: nameDescription,
          testSections: [topicTestSections],
        };
        this.props.createTestQuestionSet(topicTestSet, (topicTestResponse) => {
          if (topicTestResponse.success) {
            var message = testQuestionSetId === null ? "ADDED" : "UPDATED";
            var tempTopicTestSections = this.state.topicTestSections;
            tempTopicTestSections.["id"] = topicTestResponse.data.testSection[0].id;
            this.setState({
              snackOpen: true,
              snackType: "success",
              message: `${type} TEST ${message} SUCCESSFULLY`,
              testQuestionSetId: topicTestResponse.data.id,
              topicTestSection: tempTopicTestSections,
              sectionId: topicTestResponse.data.testSection[0].id,
            });
          }
        });
      } else {
        this.setState({
          snackOpen: true,
          snackType: "warning",
          message: "Please fill all the fields",
        });
      }
    }

    if (type === "CALIBRATION") {
      // CALIBRATION Save action
      var calibrationTestDataTotalValidation = calibrationTestData.map(
        (item) =>
          item.name.trim().length !== 0 &&
          item.duration > 0 &&
          item.noOfQuestions > 0
      );
      if (
        name &&
        nameDescription &&
        name.trim().length !== 0 &&
        nameDescription.trim().length !== 0 &&
        description.length !== 0 &&
        descriptionTitle.trim().length !== 0 &&
        courseId !== undefined &&
        calibrationTestData.length !== 0 &&
        !calibrationTestDataTotalValidation.includes(false)
      ) {
        var calibrationTestSet = {
          id: testQuestionSetId,
          name: name,
          type: type,
          course: { id: courseId },
          description: description,
          descriptionTitle: descriptionTitle,
          nameDescription: nameDescription,
          testSections: calibrationTestData,
        };
        this.props.createTestQuestionSet(
          calibrationTestSet,
          (calibrationTestResponse) => {
            if (calibrationTestResponse.success) {
              var message = testQuestionSetId === null ? "ADDED" : "UPDATED";
              var tempcalibrationTestData = calibrationTestData;
              calibrationTestResponse.data.testSection.map((item, index) => {
                tempcalibrationTestData.[index].id = item.id;
              });
              this.setState({
                snackOpen: true,
                snackType: "success",
                message: `${type} TEST ${message} SUCCESSFULLY`,
                testQuestionSetId: calibrationTestResponse.data.id,
                calibrationTestData: tempcalibrationTestData,
              });
            } else {
              this.setState({
                snackOpen: true,
                snackType: "warning",
                message: calibrationTestResponse.message,
              });
            }
          }
        );
      } else {
        this.setState({
          snackOpen: true,
          snackType: "warning",
          message: "Please fill all the fields",
        });
      }
    }
  };

  render() {
    const {
      type,
      description,
      calibrationTestData,
      testQuestionSetId,
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
      topicTestSections,
      name,
    } = this.state;
    const { courses, topics, subjects } = this.props;
    const id = QueryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).testQuestionSetId;
    return (
      <Card padding={"0px 20px"}>
        <Box display={"flex"} alignItems={"center"}>
          {/* Header */}
          <TestTitle flex={1}>
            {id !== undefined ? "Edit Test" : "Add New Test"}
          </TestTitle>
          <Box display={"flex"} gridGap={"30px"} overflow={"auto"}>
            {/* cancel */}
            <Cancel
              onClick={() => {
                this.props.history.push(lmsTest);
              }}
            >
              Cancel
            </Cancel>
            {/* save */}
            <Save onClick={this.handleSaveButton}>Save</Save>
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
              disabled={testQuestionSetId !== null ? true : false}
              placeholder="Course"
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
                disabled: testQuestionSetId !== null ? true : false,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            {type === "CALIBRATION" ? (
              <div>
                <InputTextField
                  name="name"
                  onChange={this.handleChange}
                  value={name}
                  label={"Test name"}
                  height="11px"
                  placeholder={"Test name"}
                />
              </div>
            ) : (
              <DropDown
                label="Topic"
                name="topicId"
                items={topics.data}
                value={topicId}
                onChange={this.handleChange}
                placeholder="Topic"
                disabled={testQuestionSetId !== null ? true : false}
              />
            )}
          </Grid>
          {type !== "QUESTIONBANK" ? (
            <>
              <Grid item xs={12} md={8}>
                <InputTextField
                  name="nameDescription"
                  onChange={this.handleChange}
                  value={nameDescription}
                  label="Description"
                  multiline
                  rows={3}
                  placeholder="Description"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputTextField
                  name="descriptionTitle"
                  onChange={this.handleChange}
                  value={descriptionTitle}
                  label="Test Instruction heading"
                  height="11px"
                  placeholder="Test Instruction heading"
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <AutocompleteText
                  autoData={{
                    label: "Test Instruction Details",
                    placeholder: "List The Instruction",
                    title: "Type the content and press enter",
                    value: description,
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
              subjects: (subjects.length !== 0 && subjects.data) || [],
            }}
          />
        )}
        {type === "TOPIC" && (
          <TopicTestCard
            data={{
              testSections: topicTestSections,
              handleChange: this.handleChange,
            }}
          />
        )}
        {type !== undefined && (
          <TestAddButtonCard
            addQuestion={this.handleAddQuestion}
            type={type}
            id={testQuestionSetId}
          />
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
  getSubjectsByCourse,
  getTestQuestionSet,
})(withRouter(Add));
