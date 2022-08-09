import { Box, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";

function AddStudyPlanMonth({
  courseOptions = [],
  durationOptions = [],
  planCourseValue,
  planDuration,
  planName,
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
    <Box padding={"20px 0px 40px !important"}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Autocomplete
            id={"course-combo-box"}
            options={courseOptions}
            value={planCourseValue}
            onChange={(e, newVal) =>
              onChange(getEventObjectModel("planCourseValue", newVal))
            }
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} label={"Course"} variant={"outlined"} />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id={"plan-duration-combo-box"}
            options={durationOptions}
            value={planDuration}
            onChange={(e, newVal) =>
              onChange(getEventObjectModel("planDuration", newVal))
            }
            getOptionLabel={(option) => `${option} month`}
            renderInput={(params) => (
              <TextField
                {...params}
                label={"Plan Duration"}
                variant={"outlined"}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={"Plan Name"}
            name={"planName"}
            value={planName}
            onChange={onChange}
            variant={"outlined"}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddStudyPlanMonth;
