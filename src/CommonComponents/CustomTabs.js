import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { COLORS } from "../utills/Shared";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: "3px",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "calc(100% - 10px)",
    position: "relative",
    top: "-5px",
    backgroundColor: COLORS.lightBlue,
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: 600,
    fontSize: "17px",
    marginRight: theme.spacing(1),
    color: COLORS.black,
    "&.Mui-selected": {
      color: COLORS.lightBlue,
      fontSize: "17px",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function CustomTabs({ value, handleChange, tabList }) {
  const renderTabs = () => {
    return tabList.map(({ name, label }, index) => (
      <StyledTab
        key={`styled-tab-${index}`}
        id={name}
        value={name}
        label={label}
      />
    ));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <StyledTabs value={value} onChange={handleChange}>
        {renderTabs()}
      </StyledTabs>
    </Box>
  );
}

export default CustomTabs;
