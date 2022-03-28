import { Box, Divider, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { CustomTab, CustomTabs } from "../Utils/controls/CustomTabComponent";

function Index(props) {
  const [state, setState] = useState({
    activeMainTabValue: "1",
    mainTabList: [
      "LOR Frameworks",
      "Essay Frameworks",
      "Additional Essay/Personal Statement Framework",
    ],
  });
  const { activeMainTabValue, mainTabList } = state;

  const renderComponent = () => {
    const { activeMainTabValue } = state;
    switch (activeMainTabValue) {
      case "LOR Frameworks":
        return <>{"LOR Frameworks"}</>;
      default:
        return null;
    }
  };

  const renderTabs = () => {
    return mainTabList.length !== 0
      ? mainTabList.map((item, index) => (
          <CustomTab
            value={item}
            label={item}
            id={`${item}${index}`}
            minWidth={"135px"}
          />
        ))
      : null;
  };

  const handleTabChange = (e, newValue) => {
    setState({ ...state, activeMainTabValue: newValue });
  };

  return (
    <div>
      <Grid container style={{ marginTop: "10px" }}>
        <Grid
          item
          md={12}
          style={{
            borderStyle: "groove",
            borderRadius: "10px",
          }}
        >
          <Box>
            <CustomTabs value={activeMainTabValue} onChange={handleTabChange}>
              {renderTabs()}
            </CustomTabs>
          </Box>
          {/* <Divider style={{ backgroundColor: "#D2D2D2" }} /> */}
          {renderComponent()}
        </Grid>
      </Grid>
    </div>
  );
}

export default Index;
