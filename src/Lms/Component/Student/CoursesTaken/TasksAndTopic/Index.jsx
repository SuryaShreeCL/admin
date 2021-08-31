import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import { TaskTabs } from "../../../../Assets/css/StyledCourseTakenComponent/StyledCourseTaken";
import TodaysTask from "./TodaysTask";
import { StyledVerticalTaps } from "../../../../Utils/VerticalTab";
import PendingTask from "./PendingTask";
import CompletedTask from "./CompletedTask";
import OtherTask from "./OtherTasks";
import { getTaskTopic } from "../../../../Redux/Action/Student";
import { connect } from "react-redux";

const verticalTabsLabels = [
  { tabLabel: "Today's Task" },
  { tabLabel: "Pending Task" },
  { tabLabel: "Completed Task" },
  { tabLabel: "Other Tasks" },
];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verticalTabId: 0,
    };
  }

  componentDidUpdate(prevProps) {
    const { studentId, productId } = this.props;
    if (
      studentId !== prevProps.studentId ||
      productId !== prevProps.productId
    ) {
      if (studentId.trim().length !== 0 && productId.trim().length !== 0)
        this.props.getTaskTopic(studentId, productId, this.props.category, {});
    }
  }

  render() {
    const { verticalTabId } = this.state;
    const { taskTopic } = this.props;

    return (
      <Grid container>
        <Grid item>
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
        <Grid item style={{ flex: 1 }}>
          <div hidden={verticalTabId !== 0}>
            <TodaysTask
              todaysTasks={
                taskTopic.length !== 0 &&
                taskTopic.data.length !== 0 &&
                taskTopic.data.todaysTopic
              }
            />
          </div>
          <div hidden={verticalTabId !== 1}>
            <PendingTask
              pendingTasks={
                taskTopic.length !== 0 &&
                taskTopic.data.length !== 0 &&
                taskTopic.data.pendingTasks
              }
            />
          </div>
          <div hidden={verticalTabId !== 2}>
            <CompletedTask
              completedTasks={
                taskTopic.length !== 0 &&
                taskTopic.data.length !== 0 &&
                taskTopic.data.completedTasks
              }
            />
          </div>
          <div hidden={verticalTabId !== 3}>
            <OtherTask
              otherTasks={
                taskTopic.length !== 0 &&
                taskTopic.data.length !== 0 &&
                taskTopic.data.otherTasks
              }
            />
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.LmsStudentReducer,
  };
};

export default connect(mapStateToProps, {
  getTaskTopic,
})(Index);
