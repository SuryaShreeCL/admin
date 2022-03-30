import { Box, Button, Divider, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { CustomTab, CustomTabs } from "../Utils/controls/CustomTabComponent";
import {} from "../../Asset/StyledComponents/ApplicationStage";
import {
  customTheme,
  StyledStaticButton,
  useStyles,
} from "../../Asset/StyledComponents/Styles";
import { DownloadCvTable } from "../Utils/DownloadCvTable";

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
        return (
          <Box>
            <DownloadCvTable
              headers={["Version", "Uploaded date", "Comment", ""]}
              body={[
                {
                  comment: "hii",
                  createdBy: "",
                  id: 1,
                  path: "vvvv1",
                  isDownload: true,
                },
              ]}
              handleComment={() => {}}
              handleDownload={() => {}}
              handleDelete={() => {}}
            />
          </Box>
        );
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
          <Box display={"flex"} alignItems={"center"}>
            <Box flex={1}>
              <CustomTabs value={activeMainTabValue} onChange={handleTabChange}>
                {renderTabs()}
              </CustomTabs>
            </Box>
            <StyledStaticButton active={true} color={"primary"}>
              {"Miscellaneous / Handouts"}
            </StyledStaticButton>
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
