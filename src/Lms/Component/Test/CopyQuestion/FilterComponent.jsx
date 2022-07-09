import React from "react";
import { Grid } from "@material-ui/core";
import DropDown from "../../../Utils/DropDown";

const DEFAULT_OBJ = { id: "default", title: "Select" };

function FilterComponent({
  courseId,
  courses,
  onChange,
  subjectId,
  subjects,
  conceptId,
  concepts,
  filterData,
  testType,
  topicId,
  topicList,
}) {
  console.log(courses, "courses");
  return (
    <Grid container spacing={3}>
      <Grid item xs={4} md={4}>
        <DropDown
          label="Course"
          name="course"
          value={courseId || "default"}
          items={[DEFAULT_OBJ, ...(courses?.data || [])]}
          onChange={onChange}
        />
      </Grid>

      <Grid item xs={4} md={4}>
        <DropDown
          label="Subject"
          name="subject"
          value={subjectId || "default"}
          items={[DEFAULT_OBJ, ...(subjects?.data || [])]}
          onChange={onChange}
        />
      </Grid>

      <Grid item xs={4} md={4}>
        <DropDown
          label="Concept"
          name="concept"
          value={conceptId || "default"}
          items={[DEFAULT_OBJ, ...(concepts?.data || [])]}
          onChange={onChange}
        />
      </Grid>

      <Grid item xs={4} md={4}>
        <DropDown
          label="Test"
          name="testType"
          value={testType || "default"}
          items={[DEFAULT_OBJ, ...(filterData?.data?.testTypes || [])]}
          onChange={onChange}
        />
      </Grid>

      <Grid item xs={4} md={4}>
        <DropDown
          label="TopicName"
          name="topic"
          value={topicId || "default"}
          items={[DEFAULT_OBJ, ...(topicList?.data || [])]}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
}

export default FilterComponent;
