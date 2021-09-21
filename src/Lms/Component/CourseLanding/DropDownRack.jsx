import { Grid } from '@material-ui/core';
import React from 'react';
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
  // console.log(courses);
  if (courses !== null && subjects !== null && concepts !== null)
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
  else return null;
}
