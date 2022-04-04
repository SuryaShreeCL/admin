import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.12)",
      },
    },
  },
});

export default function Input(props) {
  const classes = useStyles();
  const { name, type, label, value, onChange, ...other } = props;
  return (
    <TextField
      type={type}
      className={classes.root}
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
    />
  );
}
