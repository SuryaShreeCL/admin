import { Tabs } from "@material-ui/core";
import React from "react";
import { StyledTab } from "./Styles";

function CustomTabs({
  value,
  indicatorColor,
  textColor,
  onChange,
  variant,
  TabIndicatorProps,
  children,
  ...props
}) {
  return (
    <Tabs
      value={value}
      indicatorColor={indicatorColor ? indicatorColor : "none"}
      textColor={textColor ? textColor : "primary"}
      onChange={onChange}
      variant={variant ? variant : "standard"}
      TabIndicatorProps={TabIndicatorProps}
      {...props}
    >
      {children}
    </Tabs>
  );
}

function CustomTab({ label, value, id, minWidth, minHeight, ...props }) {
  return (
    <StyledTab
      label={label}
      value={value}
      id={id}
      minWidth={minWidth}
      minHeight={minHeight}
      {...props}
    />
  );
}

export { CustomTab, CustomTabs };
