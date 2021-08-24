import React from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  root: {
    "& .MuiAutocomplete-inputRoot": {
      height: "250px",
    },
    "& .MuiAutocomplete-root": {
      height: "250px",
    },
  },
});

export const AutocompleteText = () => {
  const classes = useStyles();
  const top100Films = [
    { title: "Inglourious Basterds", year: 2009 },
    { title: "Snatch", year: 2000 },
    { title: "3 Idiots", year: 2009 },
    { title: "Monty Python and the Holy Grail", year: 1975 },
  ];

  return (
    <Autocomplete
      classes={{ root: classes.root, combobox: classes.root }}
      multiple
      style={{ height: "80px" }}
      onChange={(e, newValue) => {
        console.log(newValue);
      }}
      options={top100Films.map((option) => option.title)}
      defaultValue={[top100Films[1].title, top100Films[2].title]}
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
          label="freeSolo"
          placeholder="Favorites"
        />
      )}
    />
  );
};
