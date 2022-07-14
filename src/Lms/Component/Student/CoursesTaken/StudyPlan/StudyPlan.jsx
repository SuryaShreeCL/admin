import { Box, Grid, Typography } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlexView } from "../../../../Assets/StyledComponents";
import {
  getStudyPlan,
  updateStudyPlan,
} from "../../../../Redux/Action/Student";
import { customDateFormat } from "../../../../Utils/HelperFunction";
import { SelectDropDown } from "../../../../Utils/SelectField";
import EditableTable from "./EditableTable";
import React from "react";
import moment from "moment";
import { SnackBar } from "../../../../Utils/SnackBar";

const DEFAULT_SELECT_OBJECT = {
  id: "all",
  title: "Select",
};

const ROLES = { editor: "LMSEDITOR", checker: "LMSCHECKER" };

function StudyPlan({ studentId, courseId }) {
  const dispatch = useDispatch();
  const { studyPlanData } = useSelector((state) => state.LmsStudentReducer);
  const tableRef = useRef();
  const [state, setState] = useState({
    targetDate: null,
    selectedStudyPlan: null,
    studyPlanList: [],
    filterStudyPlanData: [],
    monthOptions: [],
    month: null,
    page: 0,
  });

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    color: "",
  });

  const {
    targetDate,
    selectedStudyPlan,
    studyPlanList,
    filterStudyPlanData,
    monthOptions,
    month,
    page,
  } = state;

  const { open, message, color } = snack;

  const handleSnackClose = () => {
    setSnack({
      open: false,
      message: "",
      color: "",
    });
  };

  useEffect(() => {
    if (studentId && courseId) dispatch(getStudyPlan(studentId, courseId));
  }, [studentId, courseId]);

  const role = sessionStorage.getItem("role");

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
            ? data.studyPlanModelList.map((a, i) => ({
                ...a,
                date: customDateFormat(a.date, "DD/MM/YYYY"),
              }))
            : [];
        let monthValue = month || monthArr[0]?.id;
        let filterArr = studyPlanArr.filter((a) =>
          monthValue && monthValue !== "all" ? a.month === monthValue : true
        );
        setState({
          ...state,
          targetDate: data.targetDate,
          selectedStudyPlan: data.selectedStudyPlan,
          studyPlanList: studyPlanArr,
          filterStudyPlanData: filterArr,
          monthOptions: monthArr,
          month: monthValue,
          page: 0,
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
          page: 0,
        });
      }
      tableRef.current.onQueryChange();
    }
  }, [studyPlanData]);

  const handleChange = (event) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const { value, name } = event.target;
          let arr = [...studyPlanList];
          arr = arr.filter((a) => a.month === value || value === "all");
          setState({
            ...state,
            [name]: value,
            filterStudyPlanData: arr,
            page: 0,
          });
          tableRef.current.onQueryChange();
        } catch (error) {
          console.log(error);
        }
        resolve();
      }, 1000);
    });
  };

  const onRowUpdate = (newData, oldData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // let dataUpdate = [...studyPlanList];
        // let index = dataUpdate.findIndex((a) => a.id === oldData.id);
        // dataUpdate[index] = newData;
        // let arr = dataUpdate.filter(
        //   (a) => a.month === month || month === "all"
        // );

        let obj = {
          date: moment(new Date(newData.date)).format("YYYY-MM-DD"),
        };
        dispatch(
          updateStudyPlan(studentId, oldData.id, oldData.taskId, obj, (res) => {
            if (res.success) {
              // setState({
              //   ...state,
              //   studyPlanList: [...dataUpdate],
              //   filterStudyPlanData: arr,
              // });
              // tableRef.current.onQueryChange();
              dispatch(getStudyPlan(studentId, courseId));
            } else {
              setSnack({
                open: true,
                color: "error",
                message: res.message,
              });
            }
          })
        );
        resolve();
      }, 1000);
    });
  };

  const handlePageChange = (newPage) => {
    if (page !== newPage)
      setState({
        ...state,
        page: newPage,
      });
    tableRef.current.onQueryChange();
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
                        {customDateFormat(targetDate, "DD/MM/YYYY") || "NA"}
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
          <EditableTable
            tableRef={tableRef}
            onRowUpdate={ROLES.checker === role ? onRowUpdate : null}
            data={(query) => {
              return new Promise((resolve, reject) => {
                const { pageSize } = query;
                const newPage = page;
                const totalCount = filterStudyPlanData.length;
                const startIndex = newPage * pageSize;
                const selectedItems = filterStudyPlanData.slice(
                  startIndex,
                  startIndex + pageSize
                );
                resolve({
                  ...query,
                  data: selectedItems,
                  totalCount: totalCount,
                  page: newPage,
                });
              });
            }}
            onChangePage={handlePageChange}
          />
        </Grid>
      </Grid>
      <SnackBar
        snackData={{
          open,
          snackClose: handleSnackClose,
          snackType: color,
          message: message,
        }}
      />
    </>
  );
}
export default StudyPlan;
