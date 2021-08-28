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
      alignContent: "flex-start",
    },
  },
});

export const AutocompleteText = (props) => {
  const classes = useStyles();
  const { onChange, value, label, placeholder, title, key } = props.autoData;
  return (
    <Autocomplete
      key={key !== undefined && key}
      title={title !== undefined && title}
      classes={{ root: classes.root }}
      multiple
      onChange={onChange !== undefined && onChange}
      options={[]}
      freeSolo
      value={value}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant={"outlined"}
          InputLabelProps={{
            shrink: true,
          }}
          label={label !== undefined && label}
          placeholder={placeholder !== undefined && placeholder}
        />
      )}
    />
  );
};
