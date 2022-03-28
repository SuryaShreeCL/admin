import { Tabs } from "@material-ui/core";
import React from "react";
import { StyledTab } from "./Styles";

function CustomTabs({
  value,
  indicatorColor,
  textColor,
  onChange,
  variant,
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
      {...props}
    >
      {children}
    </Tabs>
  );
}

function CustomTab({ label, value, id, minWidth, ...props }) {
  return (
    <StyledTab
      label={label}
      value={value}
      id={id}
      minWidth={minWidth}
      {...props}
    />
  );
}

export { CustomTab, CustomTabs };
