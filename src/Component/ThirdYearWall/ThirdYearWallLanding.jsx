import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Container, TopTab, TopTabs } from "./Assets/Styles/WallStyles";
import { useLocation } from "react-router-dom";
import Webinars from "./Pages/ThirdYearWebinars";
import ConversionPopup from "./Pages/ConversionPopup";

// export const Lms_Roles = ["LMSCHECKER", "LMSEDITOR"];
// export const isLms_Role = (role) => {
//   return Lms_Roles.indexOf(role) > -1;
// };

// const Lms_Tabs = [
//   {
//     label: "Webinars",
//   },
//   {
//     label: "Recorded videos",
//   },
// ];

const ThirdYearWallLanding = () => {
  // let role = window.sessionStorage.getItem("role");
  // console.log();
  let location = useLocation();
  const [tabCount, setTabCount] = useState(location.tab ?? 0);

  const renderContent = (value) => {
    try {
      if (value === 0) {
        return <Webinars />;
      } else if (value === 1) {
        return <ConversionPopup />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const renderLmsWebinarContent = (value) => {
  //   try {
  //     if (value === 0) {
  //       return <Webinars />;
  //     } else if (value === 1) {
  //       return <RecordedVideos />;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const renderLmsTab = () => {
  //   return Lms_Tabs.map(({ label }) => <TopTab label={label} />);
  // };
  console.log(tabCount, "tabCount");
  return (
    <Container>
      <Grid container>
        <Grid item md={12}>
          <TopTabs
            value={tabCount}
            textColor={"inherit"}
            onChange={(e, value) => setTabCount(value)}
            aria-label="tabs"
          >
            <TopTab label="3rd Year Webinars" />
            <TopTab label="Customize Conversion Pop-up" />
          </TopTabs>
        </Grid>
        <Grid item md={12} overflow="auto">
          {renderContent(tabCount)}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ThirdYearWallLanding;
