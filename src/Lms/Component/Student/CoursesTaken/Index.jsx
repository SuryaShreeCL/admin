import { Box, Grid } from "@material-ui/core";
import React, { Component } from "react";
import {
  CourseContainer,
  CourseTabs,
  CourseTabsDuplicateCard,
  TaskTabs,
} from "../../../Assets/css/StyledCourseTakenComponent/StyledCourseTaken";
import { DataTable } from "./TasksAndTopic/TodaysTask";
import { RadioButtonsGroup } from "../../../Utils/RadioButton";
import { StyledTaps } from "../../../Utils/Tabs";
import { StyledVerticalTaps } from "../../../Utils/VerticalTab";

const tabsLabels = [
  { tabLabel: "Tasks & Topic" },
  { tabLabel: "Strength & Weekness" },
  { tabLabel: "Study Plan" },
  { tabLabel: "Calibration Test" },
  { tabLabel: "Topic Test" },
  { tabLabel: "Logs" },
];

const verticalTabsLabels = [
  { tabLabel: "Today's Task" },
  { tabLabel: "Pending Task" },
  { tabLabel: "Completed Task" },
  { tabLabel: "Other Tasks" },
];

const rows = [
  { id: 1, taskName: "Snow", topicName: "Jon", status: 35 },
  { id: 2, taskName: "Lannister", topicName: "Cersei", status: 42 },
  { id: 3, taskName: "Lannister", topicName: "Jaime", status: 45 },
  { id: 4, taskName: "Stark", topicName: "Arya", status: 16 },
  { id: 5, taskName: "Targaryen", topicName: "Daenerys", status: null },
  { id: 6, taskName: "Melisandre", topicName: null, status: 150 },
  { id: 7, taskName: "Clifford", topicName: "Ferrara", status: 44 },
  { id: 8, taskName: "Frances", topicName: "Rossini", status: 36 },
  { id: 9, taskName: "Roxie", topicName: "Harvey", status: 65 },
];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: "1",
      tabId: 1,
      verticalTabId: 1,
    };
  }

  render() {
    const { courseId, tabId, verticalTabId } = this.state;
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
        <Grid container>
          <Grid item md={3}>
            <TaskTabs>
              <StyledVerticalTaps
                tabsData={{
                  tabId: verticalTabId,
                  handleTabChange: (e, newValue) => {
                    this.setState({ verticalTabId: newValue });
                  },
                  tabsBackColor: "#1093FF",
                  tabData: verticalTabsLabels,
                  activeClass: "active__task__tab",
                  styleName: "courseTaken",
                }}
              />
            </TaskTabs>
          </Grid>
          <Grid item md={9}>
            <DataTable dataTable={{ rows: rows }} />
          </Grid>
        </Grid>
      </CourseContainer>
    );
  }
}

export default Index;
