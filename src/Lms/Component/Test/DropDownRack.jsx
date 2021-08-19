import React from 'react';
import { Grid } from '@material-ui/core';
import DropDown from '../../Utils/DropDown';

export default function DropDownRack(props) {
  const { handleChange } = props;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <DropDown
          label='Test Type'
          name='testType'
          //   items={courses.data}
          value={1}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <DropDown
          label='Topic Name'
          name='topicName'
          //   items={subjects.data}
          value={2}
          onChange={2}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <DropDown
          label='Status'
          name='status'
          //   items={concepts.data}
          value={3}
          onChange={3}
        />
      </Grid>
    </Grid>
    // null
  );
}
