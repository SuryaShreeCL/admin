import { Box, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { FlexView } from "../../../Assets/StyledComponents";

function FilterContainer({
  courseOptions = [],
  courseValue,
  subjectOptions = [],
  subjectValue,
  onChange,
}) {
  const getEventObjectModel = (name, value) => {
    return {
      target: {
        name: name,
        value: value,
      },
    };
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Autocomplete
          id={"course-combo-box"}
          options={courseOptions}
          value={courseValue}
          onChange={(e, val) => onChange(getEventObjectModel("course", val))}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField {...params} label={"Course"} variant={"outlined"} />
          )}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <Autocomplete
          id={"subject-combo-box"}
          options={subjectOptions}
          value={subjectValue}
          onChange={(e, val) => onChange(getEventObjectModel("subject", val))}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField {...params} label={"Subject"} variant={"outlined"} />
          )}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

export default FilterContainer;
