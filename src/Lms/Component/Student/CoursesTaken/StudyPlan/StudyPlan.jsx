import { Box, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlexView } from "../../../../Assets/StyledComponents";
import { getStudyPlan } from "../../../../Redux/Action/Student";
import { DataTable } from "../../../../Utils/DataTable";
import { SelectDropDown } from "../../../../Utils/SelectField";
import React from "react";

const DEFAULT_OBJECT = {
  id: "default",
  date: null,
  topicName: null,
  conceptName: null,
  taskName: null,
  duration: null,
  status: null,
};

const DEFAULT_SELECT_OBJECT = {
  id: "all",
  title: "Select",
};

function StudyPlan({ studentId, courseId }) {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      hide: true,
    },
    {
      field: "date",
      headerName: "Date",
      sortable: false,
      width: 150,
    },
    {
      field: "topicName",
      headerName: "Topic Name",
      sortable: false,
      width: 360,
    },
    {
      field: "conceptName",
      headerName: "Concept Name",
      sortable: false,
      width: 360,
    },
    {
      field: "taskName",
      headerName: "Task Name",
      sortable: false,
      width: 360,
    },
    {
      field: "duration",
      headerName: "Duration",
      sortable: false,
      headerAlign: "center",
      align: "center",
      width: 160,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      headerAlign: "center",
      align: "center",
      width: 160,
    },
  ];
  const dispatch = useDispatch();
  const { studyPlanData } = useSelector((state) => state.LmsStudentReducer);
  const [state, setState] = useState({
    targetDate: null,
    selectedStudyPlan: null,
    studyPlanList: [],
    filterStudyPlanData: [],
    monthOptions: [],
    month: null,
  });
  const {
    targetDate,
    selectedStudyPlan,
    studyPlanList,
    filterStudyPlanData,
    monthOptions,
    month,
  } = state;

  useEffect(() => {
    if (studentId && courseId) dispatch(getStudyPlan(studentId, courseId));
  }, [studentId, courseId]);

  useEffect(() => {
    if (studyPlanData) {
      if (studyPlanData.success) {
        const { data } = studyPlanData;
        let monthArr = data.studyPlanModelList.filter(
          (a, i) =>
            data.studyPlanModelList.findIndex((s) => a.month === s.month) === i
        );
        monthArr =
          monthArr.length !== 0
            ? monthArr.map((a) => ({ id: a.month, title: a.month }))
            : [];
        let studyPlanArr =
          data.studyPlanModelList.length !== 0
            ? data.studyPlanModelList.map((a, i) => ({ id: i + 1, ...a }))
            : [];
        let monthValue = monthArr[0]?.id;
        let filterArr = studyPlanArr.filter((a) =>
          monthValue ? a.month === monthValue : true
        );
        setState({
          ...state,
          targetDate: data.targetDate,
          selectedStudyPlan: data.selectedStudyPlan,
          studyPlanList: studyPlanArr,
          filterStudyPlanData: filterArr,
          monthOptions: monthArr,
          month: monthValue,
        });
      } else {
        setState({
          ...state,
          targetDate: null,
          selectedStudyPlan: null,
          studyPlanList: [],
          filterStudyPlanData: [],
          monthOptions: [],
          month: null,
        });
      }
    }
  }, [studyPlanData]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    let arr = [...studyPlanList];
    arr = arr.filter((a) => a.month === value || value === "all");
    setState({ ...state, [name]: value, filterStudyPlanData: arr });
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box>
            <FlexView gap={"65px"}>
              <Box width={"200px"}>
                <SelectDropDown
                  name={"month"}
                  label={"Month"}
                  items={[DEFAULT_SELECT_OBJECT, ...monthOptions]}
                  value={month || "all"}
                  handleChange={handleChange}
                />
              </Box>
              <Box>
                <FlexView gap={"65px"}>
                  <Box>
                    <FlexView gap={"16px"}>
                      <Typography variant='subtitle1'>
                        {"Target Exam Date:"}
                      </Typography>
                      <Typography
                        variant='subtitle1'
                        style={{ fontWeight: 600 }}
                      >
                        {targetDate ? targetDate : "NA"}
                      </Typography>
                    </FlexView>
                  </Box>
                  <Box>
                    <FlexView gap={"16px"}>
                      <Typography variant='subtitle1'>
                        {"Selected study Plan"}
                      </Typography>
                      <Typography
                        variant='subtitle1'
                        style={{ fontWeight: 600 }}
                      >
                        {selectedStudyPlan
                          ? `${selectedStudyPlan} month`
                          : "NA"}
                      </Typography>
                    </FlexView>
                  </Box>
                </FlexView>
              </Box>
            </FlexView>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <DataTable
            dataTable={{
              rows:
                studyPlanList.length !== 0
                  ? filterStudyPlanData
                  : [DEFAULT_OBJECT],
              columns: columns,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
export default StudyPlan;
