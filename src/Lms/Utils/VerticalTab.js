import React from "react";
import { Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  wrapper: {
    alignItems: "flex-start",
  },
});

export const StyledVerticalTaps = (props) => {
  const classes = useStyles();
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
      orientation={"vertical"}
      value={tabId}
      onChange={handleTabChange}
      style={{
        padding: "10px 0px",
        paddingBottom: 4,
        backgroundColor: "#FFFFFF",
      }}
      TabIndicatorProps={{
        style: {
          background: (tabsBackColor !== undefined && tabsBackColor) || "auto",
          width: 4,
        },
      }}
      variant="scrollable"
      scrollButtons="off"
    >
      {tabData.map((item, tabIndex) => {
        return (
          <Tab
            classes={{
              wrapper: classes.wrapper,
            }}
            className={
              (activeClass !== undefined &&
                tabId === tabIndex &&
                activeClass) ||
              ""
            }
            label={item.tabLabel}
            style={
              styleName !== undefined
                ? styleName === "courseTaken"
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

const courseStyle = {
  minHeight: 54,
  fontSize: "18px",
  color: "#052A4E",
  margin: "2px 0px",
  paddingLeft: "20px",
  background: "#fafafa",
};
