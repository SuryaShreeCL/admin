import { Box, Grid, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FlexView } from "../../../../Assets/StyledComponents";
import { getStudyPlan } from "../../../../Redux/Action/Student";
import { DataTable } from "../../../../Utils/DataTable";
import { SelectDropDown } from "../../../../Utils/SelectField";
import React from "react";

function StudyPlan({ studentId, courseId }) {
  const columns = [
    {
      field: "id",
      headerName: "Date",
      sortable: false,
      width: 200,
    },
    {
      field: "topicName",
      headerName: "Topic Name",
      sortable: false,
      width: 200,
    },
    {
      field: "conceptName",
      headerName: "Concept Name",
      sortable: false,
      width: 200,
    },
    {
      field: "taskName",
      headerName: "Task Name",
      sortable: false,
      width: 400,
    },
    {
      field: "duration",
      headerName: "Duration",
      sortable: false,
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      width: 200,
    },
  ];
  const rows = [
    {
      id: "1",
      topicName: "Arthematic",
      conceptName: "Algebra",
      taskName: "task",
      duration: "10min",
      status: "completed",
    },

    {
      id: "2",
      topicName: "Arthematic",
      conceptName: "Algebra",
      taskName: "task",
      duration: "10min",
      status: "Inprogress",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    if (studentId && courseId) dispatch(getStudyPlan(studentId, courseId));
  }, [studentId, courseId]);
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box>
            <FlexView>
              <Box width={"200px"}>
                <SelectDropDown />
              </Box>
              <Box>
                <FlexView gap={"65px"}>
                  <Box>
                    <FlexView gap={"16px"}>
                      <Typography variant='subtitle1'>
                        Target Exam Date:
                      </Typography>
                      <Typography
                        variant='subtitle1'
                        style={{ fontWeight: 600 }}
                      >
                        03/02/2022
                      </Typography>
                    </FlexView>
                  </Box>
                  <Box>
                    <FlexView gap={"16px"}>
                      <Typography variant='subtitle1'>
                        Selected study Plan
                      </Typography>
                      <Typography
                        variant='subtitle1'
                        style={{ fontWeight: 600 }}
                      >
                        6 Month
                      </Typography>
                    </FlexView>
                  </Box>
                </FlexView>
              </Box>
            </FlexView>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <DataTable dataTable={{ rows: rows, columns: columns }} />
        </Grid>
      </Grid>
    </>
  );
}
export default StudyPlan;
