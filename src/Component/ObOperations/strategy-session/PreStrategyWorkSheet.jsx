import { Tabs, Tab, Divider } from "@material-ui/core";
import React, { useState } from "react";
import ProgramPreference from "./ProgramPreference";
import { useStyles } from "./Styles";
import GraduateExamScores from "./GraduateExamScores";
import KeyHighlights from "./KeyHighlights";
import Recommenders from "./Recommenders";
import Story from "./YourStoryForEssay"

function PreStrategyWorkSheet() {
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();
  const tabList = [
    "Program Preference",
    "Graduate exam scores",
    "Key Highlights",
    "Recommenders",
    "Your story for your essays",
    "fit with Graduate School/ Program",
  ];
  const renderComponent = () => {
    if (tabValue === 0) {
      return <ProgramPreference />;
    } else if (tabValue === 1) {
      return <GraduateExamScores />;
    } else if (tabValue == 2) {
      return <KeyHighlights />;
    }
    else if(tabValue == 3) {
      return<Recommenders/>;
    }
    else if(tabValue == 4){
      return<Story/>;
    }
  };
  return (
    <div className={classes.preStrategyWorkSheetContainer}>
      <Tabs
        TabIndicatorProps={{
          style: {
            display: "none",
          },
        }}
        value={tabValue}
        onChange={(e, value) => setTabValue(value)}
        aria-label="basic tabs example"
      >
        {tabList.map((el, ind) => (
          <Tab style={{ color: ind === tabValue && "#18AAE7" }} label={el} />
        ))}
      </Tabs>
      <Divider style={{ backgroundColor: "#D2D2D2" }} />
      {renderComponent()}
    </div>
  );
}

export default PreStrategyWorkSheet;
