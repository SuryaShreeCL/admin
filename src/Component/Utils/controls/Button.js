import React from "react";
import {
  Button as MuiButton,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: ({ loading }) => ({
    margin: theme.spacing(0.5),
    padding: loading && "6px 13px",
  }),
  label: ({ loading }) => ({
    textTransform: "none",
    width: loading && "calc(100% - 14px)",
  }),
  text: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));

export default function Button(props) {
  const {
    text,
    size,
    color,
    variant,
    onClick,
    startIcon,
    loading,
    disabled,
    ...other
  } = props;
  const classes = useStyles({ loading });

  return (
    <MuiButton
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      disabled={loading || disabled}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
      startIcon={
        (loading && <CircularProgress size={14} color={"inherit"} />) ||
        startIcon
      }
    >
      <span className={classes.text}>{text}</span>
    </MuiButton>
  );
}
