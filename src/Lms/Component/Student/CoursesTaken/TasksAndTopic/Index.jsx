import { Box, Grid } from "@material-ui/core";
import React, { Component } from "react";
import { TaskTabs } from "../../../../Assets/css/StyledCourseTakenComponent/StyledCourseTaken";
import TodaysTask from "./TodaysTask";
import { StyledVerticalTaps } from "../../../../Utils/VerticalTab";
import PendingTask from "./PendingTask";
import CompletedTask from "./CompletedTask";
import OtherTask from "./OtherTasks";
import {
  getTaskTopic,
  clearFieldValue,
} from "../../../../Redux/Action/Student";
import { connect } from "react-redux";
import { SnackBar } from "../../../../Utils/SnackBar";
import LoadingSpinner from "../../../../Utils/LoadingSpinner";
import { CenterText } from "../../../../Assets/StyledComponents";

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
      open: false,
      message: "",
      color: "",
      taskTopicData: {},
    };
  }

  componentDidMount() {
    const { studentId, productId } = this.props;
    if (studentId.trim().length !== 0 && productId.trim().length !== 0)
      this.props.getTaskTopic(studentId, productId, this.props.category);
  }

  componentDidUpdate(prevProps) {
    const { studentId, productId, taskTopic } = this.props;
    if (
      studentId !== prevProps.studentId ||
      productId !== prevProps.productId
    ) {
      if (studentId.trim().length !== 0 && productId.trim().length !== 0) {
        this.setState({
          verticalTabId: 0,
          taskTopicData: {},
        });
        this.props.getTaskTopic(studentId, productId, this.props.category);
      }
    }
    if (taskTopic && prevProps.taskTopic !== taskTopic) {
      if (taskTopic.success) {
        this.setState({ taskTopicData: { ...taskTopic.data } });
      } else {
        this.setState({
          open: true,
          message: taskTopic.message,
          color: "error",
          taskTopicData: {},
        });
      }
    }
  }

  componentWillUnmount() {
    this.props.clearFieldValue("taskTopic");
  }

  handleSnackClose = () => {
    this.setState({
      open: false,
      message: "",
      color: "",
    });
  };

  render() {
    const { handleSnackClose } = this;
    const { verticalTabId, open, message, color, taskTopicData } = this.state;
    const { taskTopic, loading } = this.props;

    return (
      <>
        {loading ? (
          <Box position={"relative"}>
            <LoadingSpinner loading={loading} />
          </Box>
        ) : Object.keys(taskTopicData).length !== 0 ? (
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
                <TodaysTask todaysTasks={taskTopicData.todaysTopic} />
              </div>
              <div hidden={verticalTabId !== 1}>
                <PendingTask pendingTasks={taskTopicData.pendingTasks} />
              </div>
              <div hidden={verticalTabId !== 2}>
                <CompletedTask completedTasks={taskTopicData.completedTasks} />
              </div>
              <div hidden={verticalTabId !== 3}>
                <OtherTask otherTasks={taskTopicData.otherTasks} />
              </div>
            </Grid>
          </Grid>
        ) : (
          <CenterText paddingTop={"200px !important"}>
            {"Tasks & Topic not yet Discovered"}
          </CenterText>
        )}
        <SnackBar
          snackData={{
            open,
            snackClose: handleSnackClose,
            snackType: color,
            message: message,
          }}
        />
      </>
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
  clearFieldValue,
})(Index);
