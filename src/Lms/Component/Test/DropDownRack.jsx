import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DropDown from "../../Utils/DropDown";

const DEFAULT_OBJ = { id: "default", title: "Select" };

export default function DropDownRack(props) {
  const {
    handleDropDownChange,
    filterData,
    testType,
    topicId,
    status,
    courses,
    subjects,
    concepts,
    handleChange,
    courseId,
    subjectId,
    conceptId,
    topicOptions,
  } = props;
  const aedept = window.sessionStorage.getItem("department");

  let [state, setState] = useState({ testTypes: [], status: [] });

  useEffect(() => {
    setState({
      testTypes: [DEFAULT_OBJ, ...filterData.testTypes],
      status: [DEFAULT_OBJ, ...filterData.status],
    });
  }, []);

  return (
    <Grid container spacing={3}>
      {aedept !== "assessment_engine_admin" ? (
        <>
          {courses && subjects && concepts && (
            <>
              <Grid item xs={12} md={4}>
                <DropDown
                  label='Course'
                  name='course'
                  items={courses?.data}
                  value={courseId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DropDown
                  label='Subject'
                  name='subject'
                  items={subjects?.data}
                  value={subjectId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DropDown
                  label='Concept'
                  name='concept'
                  items={concepts?.data}
                  value={conceptId}
                  onChange={handleChange}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} md={4}>
            <DropDown
              label='Test Type'
              name='testType'
              items={state.testTypes}
              value={testType}
              onChange={handleDropDownChange}
            />
          </Grid>
        </>
      ) : (
        <></>
      )}

      {testType !== "CALIBRATION" && aedept !== "assessment_engine_admin" ? (
        <Grid item xs={12} md={4}>
          <DropDown
            label='Topic Name'
            name='topicId'
            items={[DEFAULT_OBJ, ...topicOptions]}
            value={topicId}
            onChange={handleDropDownChange}
            disabled={testType === "CALIBRATION"}
          />
        </Grid>
      ) : (
        <></>
      )}
      <Grid item xs={12} md={4}>
        <DropDown
          label='Status'
          name='status'
          items={state.status}
          value={status}
          onChange={handleDropDownChange}
        />
      </Grid>
    </Grid>
  );
  // } else return null;
}
