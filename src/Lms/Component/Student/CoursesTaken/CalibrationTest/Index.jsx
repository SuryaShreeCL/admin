import { Box, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlexView } from "../../../../Assets/StyledComponents";
import { SnackBar } from "../../../../Utils/SnackBar";
import React from "react";

function CalibrationTest({ studentId, courseId }) {
  const dispatch = useDispatch();
  const { studyPlanData } = useSelector((state) => state.LmsStudentReducer);
  const [state, setState] = useState({
    page: 0,
  });

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    color: "",
  });

  const { page } = state;

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
    }
  }, [studentId, courseId]);

  //   useEffect(() => {}, []);

  const handlePageChange = (newPage) => {
    if (page !== newPage)
      setState({
        ...state,
        page: newPage,
      });
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box>
            <FlexView gap={"65px"}>
              <Box>
                <FlexView gap={"65px"}>
                  <Box>
                    <FlexView gap={"16px"}>
                      <Typography variant='subtitle1'>
                        {"Start Date:"}
                      </Typography>
                      <Typography
                        variant='subtitle1'
                        style={{ fontWeight: 600 }}
                      >
                        {/* {customDateFormat(targetDate, "DD/MM/YYYY") || "NA"} */}
                      </Typography>
                    </FlexView>
                  </Box>
                  <Box>
                    <FlexView gap={"16px"}>
                      <Typography variant='subtitle1'>{"End Date:"}</Typography>
                      <Typography
                        variant='subtitle1'
                        style={{ fontWeight: 600 }}
                      >
                        {/* {selectedStudyPlan
                          ? `${selectedStudyPlan} month`
                          : "NA"} */}
                      </Typography>
                    </FlexView>
                  </Box>
                </FlexView>
              </Box>
            </FlexView>
          </Box>
        </Grid>
        <Grid item xs={12}></Grid>
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
export default CalibrationTest;
