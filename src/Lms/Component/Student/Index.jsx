import React, { Component } from "react";
import CourseTaken from "./CoursesTaken/Index";
import { LmsTabs } from "../../Assets/css/StyledCourseTakenComponent/StyledCourseTaken";
import { StyledTaps } from "../../Utils/Tabs";
import { Grid } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import Group from "../../Assets/icons/Group.svg";

const tabsLabels = [{ tabLabel: "LMS" }];
const studentTabsLabels = [
  // { tabLabel: "Student Profile" },
  { tabLabel: "Courses Taken" },
  // { tabLabel: "Activity" },
];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { tabValue: 0, studentTab: 1 };
  }

  render() {
    const { tabValue, studentTab } = this.state;
    return (
      <>
        <LmsTabs>
          <StyledTaps
            tabsData={{
              tabId: tabValue,
              handleTabChange: (e, newValue) => {
                this.setState({ tabValue: newValue });
              },
              tabsBackColor: "#1093FF",
              tabData: tabsLabels,
              activeClass: "active__task__tab",
              styleName: "lms",
            }}
          />
        </LmsTabs>

        <Grid
          container
          style={{ flexWrap: "nowrap", overflowX: "auto", paddingBottom: 10 }}
        >
          <Grid item style={{ flex: 1 }}>
            <LmsTabs>
              <StyledTaps
                tabsData={{
                  tabId: studentTab,
                  handleTabChange: (e, newValue) => {
                    this.setState({ studentTab: newValue });
                  },
                  tabsBackColor: "#1093FF",
                  tabData: studentTabsLabels,
                  activeClass: "active__task__tab",
                  styleName: "student",
                }}
              />
            </LmsTabs>
          </Grid>
          <Grid item>
            <IconButton
              style={{
                boxShadow: "0px 4px 4px rgba(16, 147, 255, 0.25)",
                borderRadius: "4px",
                width: 60,
                marginLeft: 20,
              }}
            >
              <img src={Group} />
            </IconButton>
          </Grid>
        </Grid>

        <CourseTaken />
      </>
    );
  }
}

export default Index;
