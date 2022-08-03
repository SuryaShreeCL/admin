import { Box, Grid, InputAdornment, TextField } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { FlexView } from "../../../Assets/StyledComponents";

function FilterContainer({
  courseOptions = [],
  courseValue,
  subjectOptions = [],
  subjectValue,
  search,
  onChange,
  handleSearch,
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
      <Grid item xs>
        <Box textAlign={"right"}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position={"start"}>
                  <SearchOutlined color={"primary"} />
                </InputAdornment>
              ),
            }}
            name={"search"}
            value={search}
            variant={"outlined"}
            placeholder={"Search concept name"}
            onChange={onChange}
            onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default FilterContainer;
