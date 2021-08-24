import { Grid } from "@material-ui/core";
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
import { getTaskTopic, getProducts } from "../../../Redux/Action/Student";

const tabsLabels = [
  { tabLabel: "Tasks & Topic" },
  { tabLabel: "Strength & Weekness" },
  { tabLabel: "Study Plan" },
  { tabLabel: "Calibration Test" },
  { tabLabel: "Topic Test" },
  { tabLabel: "Logs" },
];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      studentId: "",
      tabId: 0,
    };
  }

  componentDidMount() {
    var studentId = "7ae9216c-30bf-4c23-a492-4a1fca510b8b";
    this.setState({ studentId: studentId });
    this.props.getProducts(studentId, (productResponse) => {
      if (productResponse.success) {
        this.setState({ productId: this.props.products.data[0].id });
      }
    });
  }

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
        <div hidden={tabId !== 0}>
          <TasksAndTopic productId={productId} studentId={studentId} />
        </div>
        <div hidden={tabId !== 1}></div>
        <div hidden={tabId !== 2}></div>
        <div hidden={tabId !== 3}></div>
        <div hidden={tabId !== 4}></div>
        <div hidden={tabId !== 5}></div>
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
})(Index);
