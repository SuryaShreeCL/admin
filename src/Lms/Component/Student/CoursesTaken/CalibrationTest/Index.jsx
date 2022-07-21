import { Box, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FlexColumnView,
  FlexView,
  InsightSubTitle,
  LevelContent,
  SideContent,
} from "../../../../Assets/StyledComponents";
import { SnackBar } from "../../../../Utils/SnackBar";
import React from "react";
import { getCalibrationTestReport } from "../../../../Redux/Action/Student";
import { customDateFormat } from "../../../../Utils/HelperFunction";
import { useStyles } from "./Style";

const BOX_COLOR = "rgba(254, 187, 44, 0.5)";

function CalibrationTest({ studentId, courseId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { calibrationTestReport } = useSelector(
    (state) => state.LmsStudentReducer
  );
  const [state, setState] = useState({
    insights: null,
    review: [],
    page: 0,
  });

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    color: "",
  });

  const { insights, review, page } = state;

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
      if (!calibrationTestReport.success) {
        console.log(calibrationTestReport);
        setState({
          ...state,
          insights: calibrationTestReport.data?.insights,
          review: calibrationTestReport.data?.review || [],
        });
      } else {
        setSnack({
          open: true,
          message: calibrationTestReport.message,
          color: "error",
        });
      }
    }
  }, [calibrationTestReport]);

  const handlePageChange = (newPage) => {
    if (page !== newPage)
      setState({
        ...state,
        page: newPage,
      });
  };

  return (
    <Box padding={"15px 0px !important"}>
      <Grid container spacing={2}>
        {insights && (
          <>
            <Grid item xs={12}>
              <Box>
                <FlexView gap={"30px"}>
                  <Box>
                    <FlexView gap={"8px"}>
                      <InsightSubTitle>
                        {insights?.donut?.overall?.title}
                      </InsightSubTitle>
                      <InsightSubTitle>{`${insights?.donut?.overall?.score}/${insights?.donut?.overall?.total}`}</InsightSubTitle>
                    </FlexView>
                  </Box>
                  <Box>
                    <FlexView gap={"50px"}>
                      <Box>
                        <FlexView gap={"16px"}>
                          <Typography
                            variant={"subtitle1"}
                            style={{ fontWeight: 600 }}
                          >
                            {"Start Date:"}
                          </Typography>
                          <Typography variant={"subtitle1"}>
                            {customDateFormat(
                              insights?.reportDate,
                              "DD MMM YYYY"
                            ) || "NA"}
                          </Typography>
                        </FlexView>
                      </Box>
                      <Box>
                        <FlexView gap={"16px"}>
                          <Typography
                            variant={"subtitle1"}
                            style={{ fontWeight: 600 }}
                          >
                            {"End Date:"}
                          </Typography>
                          <Typography variant={"subtitle1"}>
                            {customDateFormat(
                              insights?.startDate,
                              "DD MMM YYYY"
                            ) || "NA"}
                          </Typography>
                        </FlexView>
                      </Box>
                    </FlexView>
                  </Box>
                </FlexView>
              </Box>
            </Grid>
            {insights.donut.total.length !== 0 &&
              insights.donut.total.map((item, index) => (
                <Grid item xs={3}>
                  <Box bgcolor={BOX_COLOR} padding={"24px !important"}>
                    <FlexView>
                      <Typography
                        variant={"subtitle1"}
                        className={classes.subText}
                      >
                        {item.label}
                      </Typography>
                      <Typography variant={"h5"} className={classes.subText}>
                        {item.total
                          ? `${insights.donut.score[index]}/${item.total}`
                          : insights.donut.score[index]}
                      </Typography>
                    </FlexView>
                  </Box>
                </Grid>
              ))}
            {insights.pie.card.length !== 0 &&
              insights.pie.card.map(({ title, events }, index) => (
                <Grid item xs={4}>
                  <Box
                    bgcolor={BOX_COLOR}
                    padding={"20px 16px !important"}
                    minHeight={"100%"}
                  >
                    <FlexColumnView gap={"20px"}>
                      <LevelContent>{title}</LevelContent>
                      {events &&
                        events.length !== 0 &&
                        events.map((item) => (
                          <FlexView>
                            <SideContent>{item.title}</SideContent>
                            <Typography
                              variant={"subtitle1"}
                              className={classes.subText}
                            >
                              {`${item.time} mins`}
                            </Typography>
                          </FlexView>
                        ))}
                    </FlexColumnView>
                  </Box>
                </Grid>
              ))}
          </>
        )}
        {review.length !== 0 && <Grid item xs={12}></Grid>}
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
