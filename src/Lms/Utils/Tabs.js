import React from "react";
import { Tab, Tabs } from "@material-ui/core";

export const StyledTaps = (props) => {
  const {
    tabId,
    handleTabChange,
    tabsBackColor,
    tabData,
    activeClass,
    styleName,
  } = props.tabsData;
  return (
    <Tabs
      value={tabId}
      onChange={handleTabChange}
      style={{
        padding: "0px 40px",
        minHeight: (styleName === "courseTaken" && 56) || "auto",
      }}
      TabIndicatorProps={{
        style: {
          background: (tabsBackColor !== undefined && tabsBackColor) || "auto",
          height: 4,
        },
      }}
      variant="scrollable"
      scrollButtons="off"
    >
      {tabData.map((item, tabIndex) => {
        return (
          <Tab
            className={
              (activeClass !== undefined &&
                tabId === tabIndex &&
                activeClass) ||
              ""
            }
            label={item.tabLabel}
            style={
              styleName !== undefined
                ? styleName === "addNewTask"
                  ? taskStyle
                  : styleName === "courseTaken"
                  ? courseStyle
                  : {}
                : {}
            }
          ></Tab>
        );
      })}
    </Tabs>
  );
};

const taskStyle = {
  minWidth: 40,
  fontSize: "18px",
  marginRight: "40px",
  padding: 0,
};

const courseStyle = {
  minHeight: 56,
  fontSize: "16px",
  color: "#FFFFFF",
  marginRight: "40px",
  padding: "0 10px",
};
