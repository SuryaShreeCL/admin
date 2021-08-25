import React from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  root: {
    minHeight: "250px !important",
    display: "contents",
    "& .MuiAutocomplete-inputRoot": {
      minHeight: "250px",
      alignItems: "start",
    },
  },
});

export const AutocompleteText = (props) => {
  const classes = useStyles();
  const { onChange, defaultValue, label, placeholder } = props.autoData;

  return (
    <Autocomplete
      classes={{ root: classes.root }}
      multiple
      onChange={onChange !== undefined && onChange}
      options={defaultValue !== undefined && defaultValue}
      defaultValue={defaultValue !== undefined && defaultValue}
      freeSolo
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant={"outlined"}
          label={label !== undefined && label}
          placeholder={placeholder !== undefined && placeholder}
        />
      )}
    />
  );
};
