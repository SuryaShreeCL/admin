import React from "react";

import { TextField } from "@material-ui/core";

export const InputTextField = (props) => {
  return (
    <TextField
      {...props}
      required
      inputProps={{
        style: {
          color: "#052A4E",
          height: props.height !== undefined ? props.height : "auto",
        },
      }}
      InputLabelProps={{
        shrink: true,
        style: {
          top: props.height !== undefined && "-4px",
        },
      }}
      variant='outlined'
      fullWidth
    />
  );
};
