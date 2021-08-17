import React, { useState } from 'react';
import { FormControl, InputLabel, Select, Grid } from '@material-ui/core';

import { createTheme, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import DropDown from '../../Utils/DropDown';

export default function DropDownRack(props) {
  // const [value, setValue] = useState(0);
  // const handleChange = event => {
  //   setValue(event.target.value);
  // };

  const {
    courses,
    subjects,
    concepts,
    handleChange,
    courseId,
    subjectId,
    conceptId,
  } = props;
  // console.log(courseId);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <DropDown
          label='Course'
          name='course'
          items={courses.data}
          value={courseId}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <DropDown
          label='Subject'
          name='subject'
          items={subjects.data}
          value={subjectId}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <DropDown
          label='Concept'
          name='concept'
          items={concepts.data}
          value={conceptId}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
}
