import AddRoundedIcon from "@material-ui/icons/AddRounded";
import React from "react";
import { Button } from "@material-ui/core";

export const AddButton = (props) => {
  return (
    <Button
      // style={buttonStyled}
      style={{
        opacity: props.disabled ? 0.5 : 1,
        background: "#1093FF",
        color: "white",
        textTransform: "none",
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export const FillButton = (props) => {
  return (
    <Button
      style={{ ...fillbuttonStyled, opacity: props.disabled ? 0.5 : 1 }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export const OutlineButton = (props) => {
  return (
    <Button {...props} style={outlinebuttonstyled} variant='outlined'>
      {props.children}
    </Button>
  );
};

// const buttonStyled = {
//   background: '#1093FF',
//   color: 'white',
//   textTransform: 'none',
// };

const fillbuttonStyled = {
  background: "#1093FF",
  color: "white",
  textTransform: "none",
  height: 40,
  width: 162,
  fontWeight: 500,
  fontSize: "16px",
};

const outlinebuttonstyled = {
  background: "#ffffff",
  color: "#1093ff",
  textTransform: "none",
  height: 40,
  width: 162,
  fontWeight: 600,
  fontSize: "16px",
  border: "1px solid #1093ff",
};
