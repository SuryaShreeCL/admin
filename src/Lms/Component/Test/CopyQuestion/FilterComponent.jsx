import React from "react";
import { Grid } from "@material-ui/core";
import DropDown from "../../../Utils/DropDown";

const DEFAULT_OBJ = { id: "default", title: "Select" };
const SELECT_DEFAULT_OBJECT = {
  id: "default",
  title: "Select",
  disabled: true,
};

function FilterComponent({
  courseId,
  courses,
  subjectId,
  subjects,
  conceptId,
  concepts,
  filterData,
  testType,
  topicId,
  topicList,
  onChange,
}) {
  console.log(courseId, subjectId, conceptId, testType, topicId);
  return (
    <Grid container spacing={3}>
      <Grid item xs={4} md={4}>
        <DropDown
          label='Course'
          name='course'
          value={courseId || "default"}
          items={[
            testType === "CALIBRATION" ? DEFAULT_OBJ : SELECT_DEFAULT_OBJECT,
            ...(courses?.data || []),
          ]}
          onChange={onChange}
        />
      </Grid>

      <Grid item xs={4} md={4}>
        <DropDown
          label='Subject'
          name='subject'
          value={subjectId || "default"}
          items={[SELECT_DEFAULT_OBJECT, ...(subjects?.data || [])]}
          onChange={onChange}
          disabled={testType === "CALIBRATION"}
        />
      </Grid>

      <Grid item xs={4} md={4}>
        <DropDown
          label='Concept'
          name='concept'
          value={conceptId || "default"}
          items={[SELECT_DEFAULT_OBJECT, ...(concepts?.data || [])]}
          onChange={onChange}
          disabled={testType === "CALIBRATION"}
        />
      </Grid>

      <Grid item xs={4} md={4}>
        <DropDown
          label='Test'
          name='testType'
          value={testType || "default"}
          items={[DEFAULT_OBJ, ...(filterData?.data?.testTypes || [])]}
          onChange={onChange}
        />
      </Grid>

      <Grid item xs={4} md={4}>
        <DropDown
          label='TopicName'
          name='topicId'
          value={topicId || "default"}
          items={[SELECT_DEFAULT_OBJECT, ...(topicList ? topicList.data : [])]}
          onChange={onChange}
          disabled={testType === "CALIBRATION"}
        />
      </Grid>
    </Grid>
  );
}

export default FilterComponent;
