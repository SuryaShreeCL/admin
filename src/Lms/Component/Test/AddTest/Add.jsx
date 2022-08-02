// import MomentUtils from "@date-io/moment";
import {
  FormControlLabel,
  Grid,
  IconButton,
  FormGroup,Checkbox,
  Switch,
  Typography,
  Backdrop,
} from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import QueryString from "qs";
import MomentUtils from "@date-io/moment";
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { postTestBanner } from "../../../../AsyncApiCall/Student";
import {
  bulk_upload,
  lmsTest,
  single_upload,
  lms_copy_question,
} from "../../../../Component/RoutePaths";

import moment from "moment";
import {
  Box,
  Cancel,
  Card,
  Divider,
  Save,
  TestTitle,
} from "../../../Assets/StyledComponents";
import { getCourses } from "../../../Redux/Action/CourseMaterial";
import {
  aecreateTestQuestionSet,
  aedeleteQuestion,
  aedeleteSection,
  aegetTestQuestionSet,
  createTestQuestionSet,
  deleteQuestion,
  deleteSection,
  getTestQuestionSet,
  getTopicByCourse,
} from "../../../Redux/Action/Test";
import { AutocompleteText } from "../../../Utils/Autocomplete";
import DialogComponent from "../../../Utils/DialogComponent";
import DropDown from "../../../Utils/DropDown";
import { RadioButtonsGroup } from "../../../Utils/RadioButton";
import { SnackBar } from "../../../Utils/SnackBar";
import { InputTextField } from "../../../Utils/TextField";
import CalibrationTestCard from "./CalibrationTestCard";
import TestAddButtonCard from "./TestAddButtonCard";
import TopicTestCard from "./TopicTestCard";
import CircularProgress from "@material-ui/core/CircularProgress";
// import { CheckedButtonsGroup } from "../../../Utils/CheckButton";

const dialogContent = {
  type: "delete",
  icon: <DeleteRounded style={{ fontSize: "48px", fill: "#1093FF" }} />,
  title: "Are you sure you want to delete this question ?",
  button1: "No",
  button2: "Yes",
};

const sectionDialogContent = {
  type: "delete",
  icon: <DeleteRounded style={{ fontSize: "48px", fill: "#1093FF" }} />,
  title: "Are you sure you want to delete this section ?",
  // body: calibrationSectionTabLabels,
  button1: "No",
  button2: "Yes",
  
};

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testQuestionSetId: null,
      type: "CALIBRATION",
      description: [],
      descriptionTitle: "",
      proctor:false,
      nameDescription: "",
      courseId: undefined,
      topicId: undefined,
      name: undefined,
      cutOffScore: "",
      calibrationTestData: [],
      calibrationTotalSection: null,
      calibrationActiveSectionTab: 0,
      calibrationSectionTabLabels: [],
      questions: [],
      snackOpen: false,
      snackType: "success",
      message: "",
      sectionId: undefined,
      topicTestSections: {
        id: null,
        duration: null,
        noOfQuestions: null,
      },
      anchorEl: null,
      popUpId: null,

      dialogStatus: false,
      dialogContent: null,
      sectionDialogOpen: false,
      sectionAnchorEl: null,

      questions: null,
      disableAddButton: false,
      courseIdValue: "",
      posterUrl: [],
      scheduleTest: false,
      eventDate: null,
      eventEndDate: null,
      error: "",
      // eventDate: new Date(),
      // eventEndDate: new Date(),
      department: null,
      loading: false,
      calibrationTestCopyContent: [],
      topicTestCopySections: {},
    };
  }

  componentDidMount() {
    var deptName = window.sessionStorage.getItem("department");
    if (deptName === "assessment_engine_admin") {
      this.setState({
        department: deptName,
      });
    }
    window.scroll(0, 0);
    const { testQuestionSetId } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
    const { type } = this.state;
    deptName !== "assessment_engine_admin" &&
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
                      courseIdValue: response.data[0].id,
                    });
                  }
                }
              );
            } else {
              this.setState({
                courseId: response.data[0].courseId,
              });
            }
          }
        }
      });

    // Editable Mode
    if (testQuestionSetId !== undefined) {
      deptName === "assessment_engine_admin"
        ? this.props.aegetTestQuestionSet(testQuestionSetId, () => {})
        : this.props.getTestQuestionSet(testQuestionSetId, () => {});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const id = QueryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).testQuestionSetId;
    const { testQuestionSetId } = this.state;
    const { testQuestionSet } = this.props;
    if (
      (testQuestionSetId !== null || id !== undefined) &&
      prevProps.testQuestionSet !== testQuestionSet
    ) {
      const questionSet =
        (testQuestionSet.length !== 0 && testQuestionSet.data) || false;

      var defaultCloseObj = {
        popUpId: null,
        anchorEl: null,
        sectionAnchorEl: null,
        dialogStatus: false,
        dialogContent: null,
        sectionDialogOpen: false,
      };

      if (questionSet.type === "CALIBRATION") {
        let tabArr = [];
        questionSet.testSection.map((i, index) => {
          tabArr.push({
            tabLabel: `Section ${index + 1}`,
          });
        });
        this.setState({
          ...defaultCloseObj,
          testQuestionSetId: questionSet.id,
          courseId: questionSet.course,
          name: questionSet.name,
          type: questionSet.type,
          description: questionSet.description,
          descriptionTitle: questionSet.descriptionTitle,
          nameDescription: questionSet.nameDescription,
          calibrationTestData: questionSet.testSection,
          calibrationTestCopyContent: JSON.parse(
            JSON.stringify(questionSet.testSection)
          ),
          calibrationSectionTabLabels: tabArr,
          calibrationActiveSectionTab: 1,
          calibrationTotalSection: questionSet.testSection.length,
          courseIdValue: questionSet.productId,
        });
      }

      if (questionSet.type === "AE_TEST") {
        let tabArr = [];

        questionSet.testSection.map((i, index) => {
          tabArr.push({
            tabLabel: `Section ${index + 1}`,
          });
        });
        console.log(tabArr);
        this.setState({
          testQuestionSetId: questionSet.id,
          courseId: questionSet.course,
          name: questionSet.name,
          type: questionSet.type,
          description: questionSet.description,
          proctor:questionSet.proctor,
          descriptionTitle: questionSet.descriptionTitle,
          nameDescription: questionSet.nameDescription,
          calibrationTestData: questionSet.testSection,
          calibrationTestCopyContent: JSON.parse(
            JSON.stringify(questionSet.testSection)
          ),
          calibrationSectionTabLabels: tabArr,
          calibrationActiveSectionTab: 1,
          calibrationTotalSection: questionSet.testSection.length,
          courseIdValue: questionSet.productId,
          sectionId: questionSet?.testSection[0]?.id,
          cutOffScore: questionSet.cutOffScore,
          eventDate: questionSet.eventDate,
          eventEndDate: questionSet.eventEndDate,
          scheduleTest:
            questionSet.eventDate && questionSet.eventEndDate ? true : false,
          posterUrl: questionSet.posterUrl,
        });
      }

      if (questionSet.type === "TOPIC") {
        this.setState({
          ...defaultCloseObj,
          testQuestionSetId: questionSet.id,
          courseId: questionSet.course,
          type: questionSet.type,
          description: questionSet.description,
          descriptionTitle: questionSet.descriptionTitle,
          nameDescription: questionSet.nameDescription,
          topicTestSections: questionSet.testSection[0],
          topicTestCopySections: JSON.parse(
            JSON.stringify(questionSet.testSection[0])
          ),
          sectionId: questionSet.testSection[0].id,
          courseIdValue: questionSet.productId,
        });
      }

      if (questionSet.type === "QUESTIONBANK") {
        this.setState({
          ...defaultCloseObj,
          testQuestionSetId: questionSet.id,
          courseId: questionSet.course,
          type: questionSet.type,
          topicId: questionSet.topic,
          courseIdValue: questionSet.productId,
          questions: questionSet.questions,
        });
      }

      if (questionSet.type === "QUESTIONBANK" || questionSet.type === "TOPIC") {
        if (questionSet.course !== undefined) {
          this.props.getTopicByCourse(questionSet.course, (topicResponse) => {
            if (topicResponse.success) {
              this.setState({ topicId: questionSet.topic });
            }
          });
        }
      }
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
  handleProctoringChange=(event)=>{
    const { value } = event.target;
    this.setState({proctor:true});
    // if(value === "AE_TEST"){
    // this.setState({proctor:true});
    // }
    // else{
    //   this.setState({proctor:false});
    // }

  }
  handleInstructionChange = (e, newValue) => {
    this.setState({ description: newValue });
  };

  //handleSectionInstructionChange for Calibration Test
  handleSectionInstructionChange = (e, newValue) => {
    const calibrationTestData = [...this.state.calibrationTestData];
    calibrationTestData[this.state.calibrationActiveSectionTab - 1][
      "description"
    ] = newValue;
    this.setState({
      calibrationTestData,
    });
  };

  handleSectionChange = () => {
    const { calibrationSectionTabLabels, calibrationTestData } = this.state;
    let tabArr = [];
    let testArr = [];
    tabArr = calibrationSectionTabLabels;
    testArr = calibrationTestData;
    tabArr.push({
      tabLabel: `Section ${calibrationSectionTabLabels.length + 1}`,
    });
    testArr.push({
      id: null,
      name: "",
      duration: 0,
      noOfQuestions: null,
      description: [],
      descriptionTitle: null,
      nameDescription: null,
    });
    this.setState({
      calibrationSectionTabLabels: tabArr,
      calibrationTestData: testArr,
      calibrationActiveSectionTab: tabArr.length,
      calibrationTotalSection: tabArr.length,
    });
  };

  handleTabChange = (e, newValue) => {
    this.setState({ calibrationActiveSectionTab: newValue + 1 });
  };

  handleButton1Click = () => {
    this.setState({
      dialogStatus: false,
      dialogContent: null,
      anchorEl: null,
      sectionAnchorEl: null,
      sectionDialogOpen: false,
    });
  };

  handleCloseIconClick = () => {
    this.setState({
      popUpId: null,
      anchorEl: null,
      sectionAnchorEl: null,
      dialogStatus: false,
      dialogContent: null,
      sectionDialogOpen: false,
    });
  };

  handleAddQuestion = () => {
    const {
      testQuestionSetId,
      sectionId,
      type,
      calibrationActiveSectionTab,
      calibrationTestData,
      courseIdValue,
    } = this.state;

    this.setCourseTitle();

    if (testQuestionSetId !== null) {
      if (type === "QUESTIONBANK") {
        this.props.history.push(bulk_upload + `/${testQuestionSetId}`);
      } else {
        if (type === "CALIBRATION") {
          if (calibrationTestData.length !== 0) {
            if (
              calibrationTestData[calibrationActiveSectionTab - 1].id !== null
            ) {
              var calibrationSectionId =
                (calibrationTestData.length !== 0 &&
                  calibrationTestData[calibrationActiveSectionTab - 1].id) ||
                "";
              this.props.history.push(
                bulk_upload +
                  `/${testQuestionSetId}/${calibrationSectionId}/${courseIdValue}`
              );
            } else {
              this.setState({
                snackOpen: true,
                snackType: "warning",
                message: "Please save the test",
              });
            }
          } else {
            this.setState({
              snackOpen: true,
              snackType: "warning",
              message: "Please add the section",
            });
          }
        } else if (type === "AE_TEST") {
          if (calibrationTestData.length !== 0) {
            if (
              calibrationTestData[calibrationActiveSectionTab - 1].id !== null
            ) {
              var calibrationSectionId =
                (calibrationTestData.length !== 0 &&
                  calibrationTestData[calibrationActiveSectionTab - 1].id) ||
                "";
              this.props.history.push(
                bulk_upload + `/${testQuestionSetId}/${calibrationSectionId}`
              );
            } else {
              this.setState({
                snackOpen: true,
                snackType: "warning",
                message: "Please save the test",
              });
            }
          } else {
            this.setState({
              snackOpen: true,
              snackType: "warning",
              message: "Please add the section",
            });
          }
        } else {
          this.props.history.push(
            bulk_upload + `/${testQuestionSetId}/${sectionId}`
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

  handleCopyQuestion = () => {
    const {
      testQuestionSetId,
      sectionId,
      type,
      calibrationActiveSectionTab,
      calibrationTestData,
      calibrationTestCopyContent,
      topicTestCopySections,
    } = this.state;

    if (type === "QUESTIONBANK") {
      this.props.history.push(`${lms_copy_question}/${testQuestionSetId}`);
    } else {
      if (type === "CALIBRATION") {
        let limit =
          parseInt(
            calibrationTestCopyContent[calibrationActiveSectionTab - 1][
              "noOfQuestions"
            ]
          ) -
          calibrationTestCopyContent[calibrationActiveSectionTab - 1][
            "questions"
          ].length;
        var calibrationSectionId =
          (calibrationTestData.length !== 0 &&
            calibrationTestData[calibrationActiveSectionTab - 1].id) ||
          "";
        this.props.history.push(
          `${lms_copy_question}/${testQuestionSetId}/${calibrationSectionId}?limit=${limit}`
        );
      } else {
        let limit =
          parseInt(topicTestCopySections["noOfQuestions"]) -
          topicTestCopySections["questions"].length;
        this.props.history.push(
          `${lms_copy_question}/${testQuestionSetId}/${sectionId}?limit=${limit}`
        );
      }
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
    const { type, topicTestSections, calibrationTotalSection } = this.state;
    const { value, name } = e.target;
    if (name === "noOfQuestions" || name === "duration") {
      var tempTopicTestSections = topicTestSections;
      tempTopicTestSections[name] = value;
      this.setState({
        topicTestSections: tempTopicTestSections,
      });
    } else {
      this.setState({ [name]: value, [name + "Name"]: name });
    }

    if (name === "courseId" && type !== "CALIBRATION" && value !== undefined) {
      this.props.getTopicByCourse(value, (topicResponse) => {
        if (topicResponse.success) {
          this.setState({ topicId: topicResponse.data[0].id });
        }
      });
    }
    if (name === "courseId" && type === "CALIBRATION" && value !== undefined) {
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
    this.setState({
      loading: true,
    });
    const {
      testQuestionSetId,
      type,
      topicId,
      description,
      descriptionTitle,
      nameDescription,
      topicTestSections,
      proctor,
      name,
      courseId,
      calibrationTestData,
      cutOffScore,
      eventDate,
      eventEndDate,
    } = this.state;

    if (type === "QUESTIONBANK") {
      // QUESTIONBANK save action
      if (topicId !== undefined) {
        var questionBankSet = {
          id: testQuestionSetId,
          type: type,
          topic: { id: topicId },
        };
        this.state.department === "assessment_engine_admin"
          ? this.props.aecreateTestQuestionSet(
              questionBankSet,
              (questionBankResponse) => {
                if (questionBankResponse?.success) {
                  var message =
                    testQuestionSetId === null ? "ADDED" : "UPDATED";
                  this.setState({
                    snackOpen: true,
                    snackType: "success",
                    message: `${type} TEST ${message} SUCCESSFULLY`,
                    testQuestionSetId: questionBankResponse?.data?.id,
                    loading: false,
                  });
                }
              }
            )
          : this.props.createTestQuestionSet(
              questionBankSet,
              (questionBankResponse) => {
                if (questionBankResponse?.success) {
                  var message =
                    testQuestionSetId === null ? "ADDED" : "UPDATED";
                  this.setState({
                    snackOpen: true,
                    snackType: "success",
                    message: `${type} TEST ${message} SUCCESSFULLY`,
                    testQuestionSetId: questionBankResponse?.data?.id,
                    loading: false,
                  });
                }
              }
            );
      } else {
        this.setState({
          snackOpen: true,
          snackType: "warning",
          message: "Please fill all the fields",
          loading: false,
        });
      }
    }

    if (type === "TOPIC") {
      // TOPIC Save action
      if (
        nameDescription &&
        description &&
        descriptionTitle &&
        topicId !== undefined &&
        topicTestSections.duration &&
        topicTestSections.noOfQuestions &&
        nameDescription?.trim()?.length !== 0 &&
        description?.length !== 0 &&
        descriptionTitle?.trim()?.length !== 0
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
        this.state.department === "assessment_engine_admin"
          ? this.props.aecreateTestQuestionSet(
              topicTestSet,
              (topicTestResponse) => {
                if (topicTestResponse?.success) {
                  var message =
                    testQuestionSetId === null ? "ADDED" : "UPDATED";
                  var tempTopicTestSections = this.state.topicTestSections;
                  tempTopicTestSections.id =
                    topicTestResponse.data.testSection[0].id;
                  this.setState({
                    snackOpen: true,
                    snackType: "success",
                    message: `${type} TEST ${message} SUCCESSFULLY`,
                    testQuestionSetId: topicTestResponse.data.id,
                    sectionId: topicTestResponse.data.testSection[0].id,
                    topicTestSections: tempTopicTestSections,
                    topicTestCopySections: JSON.parse(
                      JSON.stringify(tempTopicTestSections)
                    ),

                    loading: false,
                  });
                }
              }
            )
          : this.props.createTestQuestionSet(
              topicTestSet,
              (topicTestResponse) => {
                if (topicTestResponse?.success) {
                  var message =
                    testQuestionSetId === null ? "ADDED" : "UPDATED";
                  var tempTopicTestSections = this.state.topicTestSections;
                  tempTopicTestSections.id =
                    topicTestResponse.data.testSection[0].id;
                  this.setState({
                    snackOpen: true,
                    snackType: "success",
                    message: `${type} TEST ${message} SUCCESSFULLY`,
                    testQuestionSetId: topicTestResponse.data.id,
                    sectionId: topicTestResponse.data.testSection[0].id,
                    topicTestSections: tempTopicTestSections,
                    topicTestCopySections: JSON.parse(
                      JSON.stringify(tempTopicTestSections)
                    ),
                    loading: false,
                  });
                }
              }
            );
      } else {
        this.setState({
          snackOpen: true,
          snackType: "warning",
          message: "Please fill all the fields",
          loading: false,
        });
      }
    }

    if (type === "CALIBRATION") {
      // CALIBRATION Save action
      var calibrationTestDataTotalValidation = calibrationTestData.map(
        (item) =>
          item?.name !== null &&
          item?.name.trim().length !== 0 &&
          item?.duration !== null &&
          item?.noOfQuestions !== null &&
          item?.nameDescription !== null &&
          item?.nameDescription.trim().length !== 0 &&
          item?.description !== null &&
          item?.description.length !== 0 &&
          item?.descriptionTitle !== null &&
          item?.descriptionTitle.trim().length !== 0
      );
      if (
        name &&
        nameDescription &&
        name.trim().length !== 0 &&
        nameDescription.trim().length !== 0 &&
        description.length !== 0 &&
        descriptionTitle.trim().length !== 0 &&
        courseId !== undefined
      ) {
        if (calibrationTestData.length !== 0) {
          if (!calibrationTestDataTotalValidation.includes(false)) {
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
                if (calibrationTestResponse?.success) {
                  var message =
                    testQuestionSetId === null ? "ADDED" : "UPDATED";
                  var tempcalibrationTestData = calibrationTestData;
                  calibrationTestResponse.data.testSection.map(
                    (item, index) => {
                      if (calibrationTestData.length > index) {
                        tempcalibrationTestData[index].id = item.id;
                      }
                    }
                  );
                  this.setState({
                    snackOpen: true,
                    snackType: "success",
                    message: `${type} TEST ${message} SUCCESSFULLY`,
                    testQuestionSetId: calibrationTestResponse.data.id,
                    courseIdValue: calibrationTestResponse.data.productId,

                    calibrationTestData: tempcalibrationTestData,
                    calibrationTestCopyContent: JSON.parse(
                      JSON.stringify(tempcalibrationTestData)
                    ),
                    loading: false,
                  });
                } else {
                  this.setState({
                    snackOpen: true,
                    snackType: "warning",
                    message: calibrationTestResponse?.message,
                    loading: false,
                  });
                }
              }
            );
          } else {
            this.setState({
              snackOpen: true,
              snackType: "warning",
              message: "Please fill all the section fields",
              loading: false,
            });
          }
        } else {
          this.setState({
            snackOpen: true,
            snackType: "warning",
            message: "Please add the section",
            loading: false,
          });
        }
      } else {
        this.setState({
          snackOpen: true,
          snackType: "warning",
          message: "Please fill all the fields",
          loading: false,
        });
      }
    }

    if (type === "AE_TEST") {
      // CALIBRATION Save action
      var calibrationTestDataTotalValidation = calibrationTestData.map(
        (item) =>
          item.name !== null &&
          item.name.trim().length !== 0 &&
          item.duration !== null &&
          item.noOfQuestions !== null &&
          item.nameDescription !== null &&
          item.nameDescription.trim().length !== 0 &&
          item.description !== null &&
          item.description.length !== 0 &&
          item.descriptionTitle !== null &&
          item.descriptionTitle.trim().length !== 0
      );
      if (
        name &&
        nameDescription &&
        name.trim().length !== 0 &&
        nameDescription.trim().length !== 0 &&
        description.length !== 0 &&
        descriptionTitle.trim().length !== 0 &&
        cutOffScore.length !== 0 &&
        ((this.state.scheduleTest && eventDate && eventEndDate) ||
          !this.state.scheduleTest)
        // courseId !== undefined
      ) {
        if (
          this.state.scheduleTest &&
          moment(eventEndDate).isSameOrBefore(eventDate)
        ) {
          this.setState({
            snackOpen: true,
            snackType: "warning",
            message: "Please add proper timing & date",
            loading: false,
          });
          // return false;
        } else if (
          !this.state.scheduleTest ||
          (this.state.scheduleTest &&
            !moment(eventEndDate).isSameOrBefore(eventDate))
        ) {
          if (calibrationTestData.length !== 0) {
            if (!calibrationTestDataTotalValidation.includes(false)) {
              var calibrationTestSet = {
                id: testQuestionSetId,
                name: name,
                type: type,
                proctor:proctor,
                // course: { id: courseId },
                description: description,
                descriptionTitle: descriptionTitle,
                nameDescription: nameDescription,
                testSections: calibrationTestData,
                cutOffScore: parseInt(cutOffScore),
                eventDate,
                eventEndDate,
              };

              // console.log(eventDate, eventEndDate, calibrationTestSet,"1234")

              // this.props.createTestQuestionSet(
              //   calibrationTestSet,
              //   (calibrationTestResponse) => {
              //     if (calibrationTestResponse.success) {
              //       var message =
              //         testQuestionSetId === null ? "ADDED" : "UPDATED";
              //       var tempcalibrationTestData = calibrationTestData;
              //       calibrationTestResponse.data.testSection.map(
              //         (item, index) => {
              //           if (calibrationTestData.length > index) {
              //             tempcalibrationTestData[index].id = item.id;
              //           }
              //         }
              //       );
              //       this.setState({
              //         snackOpen: true,
              //         snackType: "success",
              //         message: `${type} TEST ${message} SUCCESSFULLY`,
              //         testQuestionSetId: calibrationTestResponse.data.id,
              //         courseIdValue: calibrationTestResponse.data.productId,
              //         sectionId: calibrationTestResponse.data.testSection[0].id,
              //         calibrationTestData: tempcalibrationTestData,
              //       });
              //       this.handleBannerUpload(calibrationTestResponse.data.id);
              //     } else {
              //       this.setState({
              //         snackOpen: true,
              //         snackType: "warning",
              //         message: calibrationTestResponse.message,
              //       });
              //     }
              //   }
              // );
              this.props.aecreateTestQuestionSet(
                calibrationTestSet,
                (calibrationTestResponse) => {
                  if (calibrationTestResponse?.success) {
                    console.log(
                      calibrationTestResponse,
                      "calibrationTestResponse"
                    );
                    // console.log(moment(),moment.utc(),moment.parseZone,"momenttttt")
                    var message =
                      testQuestionSetId === null ? "ADDED" : "UPDATED";
                    var tempcalibrationTestData = calibrationTestData;
                    calibrationTestResponse.data.testSection.map(
                      (item, index) => {
                        if (calibrationTestData?.length > index) {
                          tempcalibrationTestData[index].id = item.id;
                        }
                      }
                      // }
                    );
                    this.setState({
                      snackOpen: true,
                      snackType: "success",
                      message: `${type} TEST ${message} SUCCESSFULLY`,
                      testQuestionSetId: calibrationTestResponse?.data?.id,
                      courseIdValue: calibrationTestResponse?.data?.productId,
                      sectionId:
                        calibrationTestResponse?.data?.testSection[0]?.id,
                      calibrationTestData: tempcalibrationTestData,
                      loading: false,
                    });
                    this.handleBannerUpload(calibrationTestResponse?.data?.id);
                  } else {
                    const aedept = window.sessionStorage.getItem("department");
                    this.setState({
                      snackOpen: true,
                      snackType: "warning",
                      message:
                        aedept !== "assessment_engine_admin"
                          ? "Network Failed"
                          : "Session Expired Please login to the page again",
                      loading: false,
                    });
                  }
                }
              );
            } else {
              this.setState({
                snackOpen: true,
                snackType: "warning",
                message: "Please fill all the section fields",
                loading: false,
              });
            }
          } else {
            this.setState({
              snackOpen: true,
              snackType: "warning",
              message: "Please add the section",
              loading: false,
            });
          }
        }
      } else {
        this.setState({
          snackOpen: true,
          snackType: "warning",
          message: "Please fill all the fields",
          loading: false,
        });
      }
    }
  };

  handleThreeDotClick = (event, questionId) => {
    this.setState({
      anchorEl: event.currentTarget,
      popUpId: questionId,
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, popUpId: null, sectionAnchorEl: null });
  };

  handleDelete = (type) => {
    if (type === "Delete")
      this.setState({ dialogStatus: true, dialogContent: dialogContent });
    else {
      this.setCourseTitle();
      this.props.history.push(
        single_upload + "?questionId=" + this.state.popUpId,
        {
          testQuestionSetId: this.state.testQuestionSetId,
          topicId: this.state.topicId,
          sectionId: this.state.sectionId,
        }
      );
    }
  };

  handleSectionThreeDotClick = (event) => {
    this.setState({
      sectionAnchorEl: event.currentTarget,
    });
  };

  handleMenuItemDelete = () => {
    this.setState({
      sectionDialogOpen: true,
    });
  };

  removeArrayItem = (arr, index) => {
    for (var i = 0; i < arr.length; i++) {
      if (i === index) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };

  // Delete individual question
  handlePrimaryButtonClick = () => {
    const { testQuestionSetId } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
    console.log(testQuestionSetId);
    console.log(this.state.popUpId);
    this.state.department === "assessment_engine_admin"
      ? this.props.aedeleteQuestion(this.state.popUpId, (response) => {
          if (response.success) {
            this.props.aegetTestQuestionSet(
              testQuestionSetId,
              (testResponse) => {
                if (testResponse.success) {
                  this.handleCloseIconClick();
                }
              }
            );
          }
        })
      : this.props.deleteQuestion(this.state.popUpId, (response) => {
          if (response.success) {
            this.props.getTestQuestionSet(testQuestionSetId, () => {});
          }
        });
  };

  handleSectionDelete = () => {
    const { calibrationActiveSectionTab, calibrationTestData } = this.state;
    const { testQuestionSetId } = this.state;
    console.log(testQuestionSetId);
    if (calibrationTestData.length !== 0) {
      var deleteSectionId =
        calibrationTestData[calibrationActiveSectionTab - 1]["id"];
      if (deleteSectionId !== null) {
        this.state.department === "assessment_engine_admin"
          ? this.props.aedeleteSection(deleteSectionId, (response) => {
              if (response.success) {
                this.props.aegetTestQuestionSet(testQuestionSetId, (res) => {
                  if (res.success) this.handleCloseIconClick();
                });
              }
            })
          : this.props.deleteSection(deleteSectionId, (response) => {
              if (response.success) {
                this.props.getTestQuestionSet(testQuestionSetId, () => {});
              }
            });
      } else {
        let tabArr = [];
        let testArr = [];
        testArr = this.removeArrayItem(
          calibrationTestData,
          calibrationActiveSectionTab - 1
        );
        testArr.map((i, index) => {
          tabArr.push({
            tabLabel: `Section ${index + 1}`,
          });
        });

        this.setState({
          calibrationActiveSectionTab: tabArr.length,
          calibrationTotalSection: tabArr.length,
          calibrationSectionTabLabels: tabArr,
          calibrationTestData: testArr,
        });
        this.handleCloseIconClick();
      }
    }
  };

  getQuestionData = () => {
    const {
      type,
      calibrationTestData,
      calibrationActiveSectionTab,
      topicTestSections,
      questions,
    } = this.state;

    if (type === "CALIBRATION" || type === "AE_TEST")
      return calibrationTestData[calibrationActiveSectionTab - 1] !== undefined
        ? calibrationTestData[calibrationActiveSectionTab - 1].questions
        : null;
    else if (type === "TOPIC") return topicTestSections.questions;
    else if (type === "QUESTIONBANK") return questions;
  };

  setCourseTitle = () => {
    if (this.props.courses.data) {
      const courseObj = this.props.courses.data.filter(
        (item) => item.id === this.state.courseIdValue
      );
      sessionStorage.setItem(
        "courseTitle",
        courseObj.length !== 0 ? courseObj[0]["title"] : null
      );
      sessionStorage.setItem("testType", this.state.type);
      sessionStorage.setItem("topicId", this.state.topicId);
    }
  };

  onDrop = (files) => {
    this.setState({ posterUrl: files });
  };

  renderFileName = () => {
    if (
      Array.isArray(this.state.posterUrl) &&
      this.state.posterUrl.length !== 0
    ) {
      return this.state.posterUrl[0].name;
    } else {
      return "";
    }
  };

  handleFileDelete = () => {
    this.setState({
      posterUrl: [],
    });
  };

  handleBannerUpload = (testQuesSetId) => {
    const { posterUrl } = this.state;
    if (posterUrl && Array.isArray(posterUrl) && posterUrl.length !== 0) {
      const formData = new FormData();
      formData.append("file", posterUrl[0], posterUrl[0].name);
      postTestBanner(testQuesSetId, formData).then((response) => {
        if (response?.status === 202) {
          this.setState({
            posterUrl: response.data.posterUrl,
          });
          // const { posterUrl } = response.data;
          // toDataURL(posterUrl).then((dataUrl) => {
          //   const fileArr = [];
          //   var fileData = dataURLtoFile(dataUrl, "");
          //   fileArr.push(fileData);
          // });
        } else {
          this.setState({
            snackOpen: true,
            snackType: "error",
            message: "Invalid File",
          });
        }
      });
    }
  };

  renderFile = () => {
    if (typeof this.state.posterUrl === "string") {
      return (
        <div style={{ position: "relative" }}>
          <img
            src={this.state.posterUrl}
            alt={"poster"}
            style={{ width: "100%", objectFit: "contain" }}
          />
          <IconButton
            style={{ position: "absolute", top: 2, right: 2 }}
            color={"secondary"}
            size='small'
            onClick={this.handleFileDelete}
          >
            <DeleteRoundedIcon />
          </IconButton>
        </div>
      );
    } else {
      return (
        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section
              style={{
                border: "2px dashed #1792fa",
                borderRadius: "5px",
                margin: "auto",
                background: "#f5fbff",
                boxSizing: "border-box",
                padding: "5% 10% 5% 10%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} accept={".jpg,.png,.gif"} />
                <p style={{ cursor: "pointer" }}>
                  Drag 'n' drop some files here, or click to select files
                </p>
              </div>
              <aside>
                <h5 style={{ cursor: "pointer" }}>Banner</h5>
              </aside>
            </section>
          )}
        </Dropzone>
      );
    }
  };

  render() {
    const {
      type,
      proctor,
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
      anchorEl,
      popUpId,
      dialogStatus,
      dialogContent,
      sectionDialogOpen,
      sectionAnchorEl,
      cutOffScore,
      scheduleTest,
      eventDate,
      eventEndDate,
      department,
      calibrationTestCopyContent,
      topicTestCopySections,
    } = this.state;

    const AVOID_INPUT = ["E", "e", "+", "-", "."];
    const { courses, topics } = this.props;
    const id = QueryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).testQuestionSetId;
    const aedept = window.sessionStorage.getItem("department");
    const {
      handleThreeDotClick,
      handleClose,
      handleDelete,
      handleButton1Click,
      handleCloseIconClick,
      handlePrimaryButtonClick,
      handleSectionDelete,
      handleMenuItemDelete,
      handleSectionThreeDotClick,
      handleCopyQuestion,
    } = this;

    // console.log(this.state.scheduleTest,"scheduleTest")
    // console.log(this.state.eventDate,"scheduleTest")
    // console.log(this.state.eventEndDate,"scheduleTest")
   
    return (
      <>
        <Card padding={"12px 20px"}>
          <Box display={"flex"} alignItems={"center"}>
            {/* Header */}
            <TestTitle flex={1}>
              {id !== undefined ? "Edit Test" : "Add New Test"}
            </TestTitle>
            {aedept === "assessment_engine_admin" ?(

           <FormGroup style={{marginRight:"700px"}}>
           <FormControlLabel control={<Checkbox  checked={proctor} color={"primary"}
           onChange ={()=>this.setState({proctor:!this.state.proctor})}
           
           />} label="Proctor" />
         </FormGroup>) :<></>}
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
              {aedept !== "assessment_engine_admin" && (
                <DropDown
                  label='Course'
                  name='courseId'
                  items={
                    (courses.length !== 0 &&
                      courses.data.map((item) => ({
                        id: item.courseId,
                        title: item.title,
                      }))) ||
                    []
                  }
                  value={courseId ? courseId : undefined}
                  onChange={this.handleChange}
                  disabled={testQuestionSetId !== null ? true : false}
                  placeholder='Course'
                />
              )}
            </Grid>
            <Grid item xs={12} md={8}>
              {aedept !== "assessment_engine_admin" ? (
                <RadioButtonsGroup
                  radioData={{
                    name: "type",
                    activeValue: type,
                    radioItemData: [
                      { id: "CALIBRATION", label: "Calibration Test" },
                      { id: "TOPIC", label: "Topic Test" },
                      { id: "QUESTIONBANK", label: "Question Bank" },
                      // { id: "AE_TEST", label: "Assessment Engine" },
                    ],
                    handleRadioChange: this.handleTestChange,
                    groupName: "Test Type",
                    marginRightValue: "56px",
                  }}
                />
              ) : (
                <RadioButtonsGroup
                  radioData={{
                    name: "type",
                    activeValue: type,
                    radioItemData: [
                      // { id: "CALIBRATION", label: "Calibration Test" },
                      // { id: "TOPIC", label: "Topic Test" },
                      // { id: "QUESTIONBANK", label: "Question Bank" },
                      { id: "AE_TEST", label: "Assessment Engine" },
                    ],
                    handleRadioChange: this.handleTestChange,
                    groupName: "Test Type",
                    marginRightValue: "56px",
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {type === "CALIBRATION" || type === "AE_TEST" ? (
                <div>
                  <InputTextField
                    name='name'
                    onChange={this.handleChange}
                    value={name}
                    label={"Test name"}
                    height='11px'
                    placeholder={"Test name"}
                    required
                  />
                </div>
              ) : (
                <DropDown
                  label='Topic'
                  name='topicId'
                  items={topics.data}
                  value={topicId}
                  onChange={this.handleChange}
                  placeholder='Topic'
                  disabled={testQuestionSetId !== null ? true : false}
                />
              )}
            </Grid>
            {type !== "QUESTIONBANK" ? (
              <>
                <Grid item xs={12} md={8}>
                  <InputTextField
                    name='nameDescription'
                    onChange={this.handleChange}
                    value={nameDescription}
                    label='Description'
                    multiline
                    rows={3}
                    placeholder='Description'
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <InputTextField
                    name='descriptionTitle'
                    onChange={this.handleChange}
                    value={descriptionTitle}
                    label='Test Instruction heading'
                    height='11px'
                    placeholder='Test Instruction heading'
                    required
                  />
                </Grid>
                {type === "AE_TEST" && (
                  <Grid item xs={12} md={4}>
                    <InputTextField
                      name='cutOffScore'
                      type={"number"}
                      onKeyDown={(evt) =>
                        (AVOID_INPUT.includes(evt.key) ||
                          // Up arrow and down arrow disabling
                          evt.keyCode === 38 ||
                          evt.keyCode === 40) &&
                        evt.preventDefault()
                      }
                      // onChange={this.handleChange}

                      onChange={(e) => {
                        if (e.target.value.length <= 3) {
                          this.handleChange(e);
                        } else {
                          e.preventDefault();
                        }
                      }}
                      value={cutOffScore}
                      label={"Cut Off"}
                      height='11px'
                      placeholder={"Cut Off"}
                      required
                    />
                  </Grid>
                )}
                <Grid item xs={12} md={8}>
                  <AutocompleteText
                    autoData={{
                      label: "Test Instruction Details",
                      placeholder: "List The Instruction",
                      title: "Type the content and press enter",
                      value: description !== null ? description : [],
                      onChange: this.handleInstructionChange,
                    }}
                  />
                </Grid>

                {aedept === "assessment_engine_admin" && (
                  <Grid item xs={12} md={8}>
                    {this.renderFile()}
                    {this.renderFileName() && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          marginTop: "5px",
                        }}
                      >
                        <Typography>{this.renderFileName()}</Typography>
                        <IconButton
                          color={"secondary"}
                          size='small'
                          onClick={this.handleFileDelete}
                        >
                          <DeleteRoundedIcon />
                        </IconButton>
                      </span>
                    )}
                  </Grid>
                )}

                {aedept === "assessment_engine_admin" && (
                  <Grid item md={4} container spacing={3}>
                    <Grid item md={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={scheduleTest}
                            onChange={(e) => {
                              if (e.target.checked) {
                                this.setState({
                                  eventDate: new Date(),
                                  eventEndDate: new Date(),
                                });
                              } else {
                                this.setState({
                                  eventDate: null,
                                  eventEndDate: null,
                                });
                              }
                              this.setState({ scheduleTest: e.target.checked });
                            }}
                            name='scheduleTest'
                            color='primary'
                          />
                        }
                        label='Schedule test'
                      />
                    </Grid>
                    {scheduleTest && (
                      <React.Fragment>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <Grid item md={6}>
                            <DateTimePicker
                              label='Start date and time'
                              inputVariant='outlined'
                              value={eventDate}
                              disablePast
                              onChange={
                                (value) =>
                                  // {
                                  this.setState({ eventDate: value })
                                // console.log(this.state.eventDate,"1111111")}
                              }
                            />
                          </Grid>
                          <Grid item md={6}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                              <DateTimePicker
                                label='End date and time'
                                inputVariant='outlined'
                                disablePast
                                value={eventEndDate}
                                onChange={(value) =>
                                  this.setState({ eventEndDate: value })
                                }
                              />
                            </MuiPickersUtilsProvider>
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </React.Fragment>
                    )}
                  </Grid>
                )}
              </>
            ) : (
              <Divider />
            )}
            {/* description */}
          </Grid>
          {type === "CALIBRATION" || type === "AE_TEST" ? (
            <CalibrationTestCard
              data={{
                tabValue: calibrationActiveSectionTab,
                testData: calibrationTestData,
                sectionChange: this.handleSectionChange,
                tabLabels: calibrationSectionTabLabels,
                totalSection: calibrationTotalSection,
                tabChange: this.handleTabChange,
                testPropertiesChange: this.handleCalibrationTestProperties,
                sectionInstructionChange: this.handleSectionInstructionChange,
                handleClose: handleClose,
                anchorEl: sectionAnchorEl,
                handleMenuItemDelete: handleMenuItemDelete,
                handleThreeDotClick: handleSectionThreeDotClick,
              }}
            />
          ) : null}
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
              sectionData={calibrationTestData}
              tabValue={calibrationActiveSectionTab}
              id={testQuestionSetId}
              questions={this.getQuestionData()}
              handleThreeDotClick={handleThreeDotClick}
              handleClose={handleClose}
              anchorEl={anchorEl}
              popUpId={popUpId}
              handleDelete={handleDelete}
              onCopyQuestion={handleCopyQuestion}
              department={department}
              calibrationTestCopyContent={calibrationTestCopyContent}
              topicTestCopySections={topicTestCopySections}
            />
          )}
          <DialogComponent
            open={sectionDialogOpen}
            dialogContent={sectionDialogContent}
            handleButton1Click={handleButton1Click}
            handleCloseIconClick={handleCloseIconClick}
            handleButton2Click={handleSectionDelete}
          />
          <DialogComponent
            open={dialogStatus}
            dialogContent={dialogContent}
            handleButton1Click={handleButton1Click}
            handleCloseIconClick={handleCloseIconClick}
            handleButton2Click={handlePrimaryButtonClick}
          />
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
        <Backdrop
          style={{
            color: "#fff",
            zIndex: 10000,
          }}
          open={this.state.loading}
        >
          <CircularProgress color='inherit' />
          {/* hello */}
        </Backdrop>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    testQuestionSet: state.TestReducer.testQuestionSetResponse,
    ...state.CourseMaterialReducer,
    ...state.TestReducer,
  };
};

export default connect(mapStateToProps, {
  getCourses,
  getTopicByCourse,
  createTestQuestionSet,
  aecreateTestQuestionSet,
  getTestQuestionSet,
  aegetTestQuestionSet,
  deleteQuestion,
  aedeleteQuestion,
  deleteSection,
  aedeleteSection,
})(withRouter(Add));
