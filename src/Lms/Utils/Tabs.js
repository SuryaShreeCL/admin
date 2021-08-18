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
      TabIndicatorProps={{
        style: {
          background: (tabsBackColor !== undefined && tabsBackColor) || "auto",
        },
      }}
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
  margin: "0px 40px",
  padding: 0,
};
