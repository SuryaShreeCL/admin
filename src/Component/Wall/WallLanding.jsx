import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import LivePost from "./Pages/LivePost";
import DraftPost from "./Pages/DraftPost";
import ScheduledPost from "./Pages/ScheduledPost";
import { Container, TopTab, TopTabs } from "./Assets/Styles/WallStyles";
import Events from "./Pages/Events";
import { useLocation } from "react-router-dom";
import Webinars from "./Pages/Webinars";
import RecordedVideos from "./Pages/RecordedVideos";

export const Lms_Roles = ["LMSCHECKER", "LMSEDITOR"];
export const isLms_Role = (role) => {
  return Lms_Roles.indexOf(role) > -1;
};

const Lms_Tabs = [
  {
    label: "Webinars",
  },
  {
    label: "Recorded videos",
  },
];

const WallLanding = () => {
  let role = window.sessionStorage.getItem("role");
  console.log();
  let location = useLocation();
  const [tabCount, setTabCount] = useState(location.tab ?? 0);

  const renderContent = (value) => {
    try {
      if (value === 0) {
        return <LivePost />;
      } else if (value === 1) {
        return <DraftPost />;
      } else if (value === 2) {
        return <ScheduledPost />;
      }
      // else if (value === 3) {
      //   return <Events />;
      // }
      else if (value === 3) {
        return <Webinars />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderLmsWebinarContent = (value) => {
    try {
      if (value === 0) {
        return <Webinars />;
      } else if (value === 1) {
        return <RecordedVideos />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderLmsTab = () => {
    return Lms_Tabs.map(({ label }) => <TopTab label={label} />);
  };

  return (
    <Container>
      <Grid container>
        <Grid item md={12}>
          {isLms_Role(role) ? (
            <TopTabs
              value={tabCount}
              textColor={"inherit"}
              onChange={(e, value) => setTabCount(value)}
              aria-label="tabs"
            >
              {renderLmsTab()}
            </TopTabs>
          ) : (
            <TopTabs
              value={tabCount}
              textColor={"inherit"}
              onChange={(e, value) => setTabCount(value)}
              aria-label="tabs"
            >
              <TopTab label="Live Posts" />
              <TopTab label="Draft Posts" />
              <TopTab label="Scheduled Posts" />
              {/* <TopTab label='Events' /> */}
              <TopTab label="Webinars" />
            </TopTabs>
          )}
        </Grid>
        <Grid item md={12} overflow="auto">
          {isLms_Role(role)
            ? renderLmsWebinarContent(tabCount)
            : renderContent(tabCount)}
        </Grid>
      </Grid>
    </Container>
  );
};

export default WallLanding;
