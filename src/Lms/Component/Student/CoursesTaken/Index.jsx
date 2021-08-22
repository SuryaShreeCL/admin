import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import {
  CourseContainer,
  CourseTabs,
  CourseTabsDuplicateCard,
} from "../../../Assets/css/StyledCourseTakenComponent/StyledCourseTaken";
import { RadioButtonsGroup } from "../../../Utils/RadioButton";
import { StyledTaps } from "../../../Utils/Tabs";
import TasksAndTopic from "./TasksAndTopic/Index";

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
      courseId: "1",
      tabId: 0,
    };
  }

  render() {
    const { courseId, tabId } = this.state;
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
              activeValue: courseId,
              handleRadioChange: (e) => {
                this.setState({ courseId: e.target.value });
              },
              radioItemData: [
                { id: "1", label: "One" },
                { id: "2", label: "Two" },
              ],
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
          <TasksAndTopic />
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

export default Index;
