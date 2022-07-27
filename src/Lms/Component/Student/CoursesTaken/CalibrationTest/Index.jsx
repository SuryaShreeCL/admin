import { Box, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CenterText } from "../../../../Assets/StyledComponents";
import { getCalibrationTestReport } from "../../../../Redux/Action/Student";
import { SnackBar } from "../../../../Utils/SnackBar";
import OverAllScoreCard from "./OverAllScoreCard";
import SubjectCard from "./SubjectCard";
import React from "react";

function CalibrationTest({ studentId, courseId }) {
  const dispatch = useDispatch();
  const { calibrationTestReport } = useSelector(
    (state) => state.LmsStudentReducer
  );
  const [state, setState] = useState({
    insights: null,
  });

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    color: "",
  });

  const { insights } = state;

  const { open, message, color } = snack;

  const handleSnackClose = () => {
    setSnack({
      open: false,
      message: "",
      color: "",
    });
  };

  useEffect(() => {
    if (studentId && courseId) {
      dispatch(getCalibrationTestReport(studentId, courseId));
    }
  }, [studentId, courseId]);

  useEffect(() => {
    if (calibrationTestReport) {
      if (calibrationTestReport.success) {
        setState({
          ...state,
          insights: calibrationTestReport.data?.insights,
        });
      } else {
        setState({
          ...state,
          insights: null,
        });
        setSnack({
          open: true,
          message: calibrationTestReport.message,
          color: "error",
        });
      }
    }
  }, [calibrationTestReport]);

  return (
    <Box padding={"15px 0px !important"}>
      <Grid container spacing={2}>
        {insights ? (
          <>
            <OverAllScoreCard insights={insights} />
            <SubjectCard subjects={insights?.subjects} />
          </>
        ) : (
          <Grid item xs={12}>
            <CenterText paddingTop={"200px !important"}>
              {"Calibration Test not yet Initiated"}
            </CenterText>
          </Grid>
        )}
      </Grid>
      <SnackBar
        snackData={{
          open,
          snackClose: handleSnackClose,
          snackType: color,
          message: message,
        }}
      />
    </Box>
  );
}
export default CalibrationTest;
