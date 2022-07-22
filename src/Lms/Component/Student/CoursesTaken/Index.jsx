import { Box, Button, Grid } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CourseContainer,
  CourseTabs,
  CourseTabsDuplicateCard,
} from "../../../Assets/css/StyledCourseTakenComponent/StyledCourseTaken";
import { RadioButtonsGroup } from "../../../Utils/RadioButton";
import { StyledTaps } from "../../../Utils/Tabs";
import TasksAndTopic from "./TasksAndTopic/Index";
import {
  getTaskTopic,
  getProducts,
  strengthWeaknessExport,
  studyPlanExport,
  calibrationTestExport,
  topicTestExport,
  topicTestReportExport,
} from "../../../Redux/Action/Student";
import StrengthAndWeakness from "./StrengthAndWeakness/Index";
import TopicTest from "./TopicTest/Index";

import QueryString from "qs";
import { withRouter } from "react-router-dom";
import CalibrationTest from "./CalibrationTest/Index";

const tabsLabels = [
  { tabLabel: "Tasks & Topic" },
  { tabLabel: "Strength & Weakness" },
  { tabLabel: "Study Plan" },
  { tabLabel: "Calibration Test" },
  { tabLabel: "Topic Test" },
  // { tabLabel: 'Logs' },
];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      studentId: "",
      tabId: 0,
    };
    this.category = {
      taskAndTopic: "taskTopic",
      studyPlan: "studyPlans/monthlyDetails",
      strengthAndWeakNess: "strengthWeakness",
      calibrationReport: "calibrationReport",
    };
  }

  componentDidMount() {
    const { studentId } = QueryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    // var studentId = "";
    this.setState({ studentId: studentId });
    this.props.getProducts(studentId, (productResponse) => {
      if (productResponse.success) {
        this.setState({ productId: this.props.products.data[0].id });
      }
    });
  }

  renderComponent = () => {
    const { productId, studentId, tabId } = this.state;
    switch (tabId) {
      case 0:
        return (
          <TasksAndTopic
            productId={productId}
            studentId={studentId}
            category={this.category.taskAndTopic}
          />
        );
      case 1:
        return (
          <Box padding={"20px !important"}>
            <Box textAlign={"right"} padding={"0 0 10px !important"}>
              <Button
                variant="contained"
                onClick={() =>
                  this.props.strengthWeaknessExport(studentId, productId)
                }
              >
                {"Export"}
              </Button>
            </Box>
            <StrengthAndWeakness courseId={productId} studentId={studentId} />
          </Box>
        );
      case 2:
        return (
          <div className="flex-center">
            <Button
              variant="contained"
              onClick={() => this.props.studyPlanExport(studentId, productId)}
            >
              {"Export"}
            </Button>
          </div>
        );
      case 3:
        return (
          <Box padding={"20px !important"}>
            <Box textAlign={"right"} padding={"0 0 10px !important"}>
              <Button
                variant="contained"
                onClick={() =>
                  this.props.calibrationTestExport(studentId, productId)
                }
              >
                {"Export"}
              </Button>
            </Box>
            <CalibrationTest courseId={productId} studentId={studentId} />
          </Box>
        );
      case 4:
        return (
          // <div
          //   style={{
          //     display: "flex",
          //     flexDirection: "row",
          //     justifyContent: "space-evenly",
          //     padding: "32px",
          //   }}
          // >
          // {" "}
          <Box padding={"20px !important"}>
            <Box textAlign={"right"} padding={"0 0 10px !important"}>
              <Button
                variant="contained"
                onClick={() => this.props.topicTestExport(studentId, productId)}
              >
                {"Export TopicTest"}
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  this.props.topicTestReportExport(studentId, productId)
                }
              >
                {"Export TopicTestReport"}
              </Button>
            </Box>
            <TopicTest studentId={studentId} courseId={productId} />
          </Box>

          // </div>
        );
      default:
        return null;
    }
  };

  render() {
    const { productId, studentId, tabId } = this.state;
    const { products } = this.props;

    return (
      <CourseContainer>
        <Grid
          container
          spacing={2}
          justifyContent={"flex-end"}
          alignItems={"center"}
          style={{ paddingRight: 36, height: 56 }}
        >
          <RadioButtonsGroup
            radioData={{
              name: "Course",
              activeValue: productId,
              handleRadioChange: (e) => {
                this.setState({ productId: e.target.value });
              },
              radioItemData:
                (products.length !== 0 &&
                  products.data.map((item) => ({
                    id: item.id,
                    label: item.productName,
                  }))) ||
                [],
            }}
          />
        </Grid>
        <CourseTabs>
          <StyledTaps
            tabsData={{
              tabId: tabId,
              handleTabChange: (e, newValue) => {
                this.setState({ tabId: newValue });
              },
              tabsBackColor: "#FFE100",
              tabData: tabsLabels,
              activeClass: "course__task__tab",
              styleName: "courseTaken",
            }}
          />
          <CourseTabsDuplicateCard></CourseTabsDuplicateCard>
        </CourseTabs>
        {this.renderComponent()}
      </CourseContainer>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.LmsStudentReducer,
  };
};

export default connect(mapStateToProps, {
  getProducts,
  getTaskTopic,
  strengthWeaknessExport,
  studyPlanExport,
  calibrationTestExport,
  topicTestExport,
  topicTestReportExport,
})(withRouter(Index));
