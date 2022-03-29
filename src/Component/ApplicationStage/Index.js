import { Box, Divider, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { CustomTab, CustomTabs } from "../Utils/controls/CustomTabComponent";
import {} from "../../Asset/StyledComponents/ApplicationStage";
import { useStyles } from "../../Asset/StyledComponents/Styles";

function Index(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    activeMainTabValue: "LOR Frameworks",
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
            minHeight={"72px"}
          />
        ))
      : null;
  };

  const handleTabChange = (e, newValue) => {
    setState({ ...state, activeMainTabValue: newValue });
  };

  return (
    <Box className={classes.stageBoxLayoutStyle}>
      <Grid container>
        <Grid item lg={12}>
          <Box>
            <CustomTabs value={activeMainTabValue} onChange={handleTabChange}>
              {renderTabs()}
            </CustomTabs>
          </Box>
          <Divider className={classes.dividerStyle} />
        </Grid>
        <Grid item lg={12}>
          {renderComponent()}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
