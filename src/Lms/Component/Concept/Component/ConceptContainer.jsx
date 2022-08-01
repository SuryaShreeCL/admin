import { Box, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { FileUploadField } from "./FileUploadField";

function ConceptContainer({
  courseOptions = [],
  courseValue,
  subjectOptions = [],
  subjectValue,
  conceptName,
  onChange,
  imageUrl,
  isEdit,
  setFile,
  conceptDescription,
  fileSize,
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
    <Box padding={"20px 0px 30px !important"}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Autocomplete
            id={"course-combo-box"}
            options={courseOptions}
            value={courseValue}
            onChange={(e, val) =>
              onChange(getEventObjectModel("conceptCourseValue", val))
            }
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} label={"Course"} variant={"outlined"} />
            )}
            disabled={isEdit}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id={"subject-combo-box"}
            options={subjectOptions}
            value={subjectValue}
            onChange={(e, val) =>
              onChange(getEventObjectModel("conceptSubjectValue", val))
            }
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} label={"Subject"} variant={"outlined"} />
            )}
            disabled={isEdit}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={"Concept Name"}
            name={"conceptName"}
            variant={"outlined"}
            value={conceptName}
            onChange={onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={"Concept Description"}
            name={"conceptDescription"}
            variant={"outlined"}
            value={conceptDescription}
            onChange={onChange}
            maxRows={3}
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FileUploadField
            fileType={"image"}
            imageUrl={imageUrl}
            setFile={setFile}
            fileSize={fileSize}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ConceptContainer;
