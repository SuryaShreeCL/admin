import { Divider, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import ProgramPreference from "./PreStrategyWorksheetTab";
import SchoolResearchWorksheet from "./SchoolResearchWorksheet";
import { useStyles } from "./Styles";

function PreStrategyWorkSheet(props) {
  const [tabValue, setTabValue] = useState(0);
  const classes = useStyles();
  const tabList = [
    "Pre Strategy Worksheet",
    "School Research Worksheet",
    "Essay Questionaire",
    "LOR Questionaire",
    "Miscellaneous/Handouts",
  ];
  const renderComponent = () => {
    if (tabValue === 0) {
      return <ProgramPreference {...props} />;
    }
    if(tabValue === 1) {
      return<SchoolResearchWorksheet {...props} />
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
        aria-label='basic tabs example'
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
