import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";

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
    backgroundColor: "#18AAE7",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: 500,
    fontSize: "14px",
    marginRight: theme.spacing(1),
    color: "#000000",
    "&.Mui-selected": {
      color: "#18AAE7",
      fontSize: "14px",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function CustomTabs({ value, handleChange, tabList }) {
  const renderTabs = () => {
    return tabList?.map(({ id, name }, index) => (
      <StyledTab key={`styled-tab-${index}`} id={id} value={id} label={name} />
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
