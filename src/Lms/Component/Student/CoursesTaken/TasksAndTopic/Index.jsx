import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import { TaskTabs } from "../../../../Assets/css/StyledCourseTakenComponent/StyledCourseTaken";
import TodaysTask from "./TodaysTask";
import { StyledVerticalTaps } from "../../../../Utils/VerticalTab";
import PendingTask from "./PendingTask";
import CompletedTask from "./CompletedTask";
import OtherTask from "./OtherTasks";

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
      verticalTabId: 0,
    };
  }

  render() {
    const { verticalTabId } = this.state;
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
            <TodaysTask rows={rows} />
          </div>
          <div hidden={verticalTabId !== 1}>
            <PendingTask rows={rows} />
          </div>
          <div hidden={verticalTabId !== 2}>
            <CompletedTask rows={rows} />
          </div>
          <div hidden={verticalTabId !== 3}>
            <OtherTask rows={rows} />
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default Index;
