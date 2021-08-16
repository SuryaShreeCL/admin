import React from "react";

import {
  TextField,
  InputLabel,
  Select,
  ThemeProvider,
  MenuItem,
  withStyles,
} from "@material-ui/core";

export const InputTextField = (props) => {
  return (
    <TextField
      {...props}
      inputProps={{ style: { color: "#052A4E" } }}
      variant="outlined"
    />
  );
};
