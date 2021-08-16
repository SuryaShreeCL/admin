import AddRoundedIcon from "@material-ui/icons/AddRounded";

import React from "react";
import { Button, createTheme, ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const buttonTheme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        background: "#1093FF",
        color: "white",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#1093FF",
        },
      },
    },
  },
});

export default function PlusButton(props) {
  return (
    <ThemeProvider theme={buttonTheme}>
      <Button startIcon={<AddRoundedIcon />} {...props}>
        {props.children}
      </Button>
    </ThemeProvider>
  );
}
