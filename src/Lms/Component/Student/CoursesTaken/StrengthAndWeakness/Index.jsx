import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useEffect, useState } from "react";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import {
  CenterText,
  Divider,
  FlexColumnView,
  FlexView,
  H2,
  InsideContainer,
  LevelContent,
  RightContent,
  SideContainer,
  SideContent,
  VerticalDivider,
} from "../../../../Assets/StyledComponents";
import {
  clearFieldValue,
  getStrengthAndWeakness,
  strengthWeaknessExport,
} from "../../../../Redux/Action/Student";
import RadioGroupContainer from "./RadioGroupContainer";
import { useStyles } from "./Style";
import React from "react";
import { SnackBar } from "../../../../Utils/SnackBar";
import { ReactComponent as Easy } from "../../../../Assets/icons/easy.svg";
import { ReactComponent as Medium } from "../../../../Assets/icons/medium.svg";
import { ReactComponent as Hard } from "../../../../Assets/icons/hard.svg";
import LoadingSpinner from "../../../../Utils/LoadingSpinner";

const ICONS = {
  easy: <Easy />,
  medium: <Medium />,
  hard: <Hard />,
};

function Index({ studentId, courseId }) {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up("sm"));
  const isMD = useMediaQuery(theme.breakpoints.up("md"));

  const classes = useStyles();

  const dispatch = useDispatch();

  const [state, setState] = useState({
    data: [],
    activeIndex: 0,
  });

  const { data, activeIndex } = state;

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    color: "",
  });

  const { open, message, color } = snack;

  const { strengthAndWeakness, loading } = useSelector(
    (state) => state.LmsStudentReducer
  );

  useEffect(() => {
    if (studentId && courseId)
      dispatch(getStrengthAndWeakness(studentId, courseId));
  }, [studentId, courseId]);

  const handleSnackClose = () => {
    setSnack({
      open: false,
      message: "",
      color: "",
    });
  };

  useEffect(() => {
    if (strengthAndWeakness) {
      if (strengthAndWeakness.success) {
        setState({
          ...state,
          data: [...strengthAndWeakness.data],
        });
      } else {
        setState({
          ...state,
          data: [],
        });
        // setSnack({
        //   open: true,
        //   message: strengthAndWeakness.message,
        //   color: "error",
        // });
      }
      dispatch(clearFieldValue("strengthAndWeakness"));
    }
  }, [strengthAndWeakness]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: parseInt(value),
    });
  };

  const handleExport = () => {
    dispatch(strengthWeaknessExport(studentId, courseId));
  };

  const content = data.length !== 0 ? data[activeIndex]["topics"] : [];

  return (
    <>
      {!loading && data.length !== 0 && (
        <Box textAlign={"right"} padding={"0 0 10px !important"}>
          <Button
            variant='contained'
            onClick={handleExport}
            disabled={content.length === 0}
          >
            {"Export"}
          </Button>
        </Box>
      )}
      <Box padding={"0 20px !important"} position={"relative"}>
        {loading ? (
          <LoadingSpinner loading={loading} />
        ) : data.length !== 0 ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RadioGroupContainer
                value={activeIndex}
                onChange={handleChange}
                name={"activeIndex"}
                options={data}
              />
            </Grid>

            {content &&
              content.length !== 0 &&
              content.map(({ name, score, id, insights }) => (
                <Grid item xs={12}>
                  <Accordion
                    classes={{
                      rounded: classes.accordionPaperStyle,
                    }}
                  >
                    <AccordionSummary
                      classes={{
                        content: classes.accordionSummaryStyle,
                      }}
                      expandIcon={<ExpandMoreIcon className={classes.icon} />}
                      id={id}
                    >
                      <H2>{name}</H2>
                      <div>
                        <FlexView gap={"10px"}>
                          <Typography className={classes.heading1}>
                            {"Skill score"}
                          </Typography>
                          <Typography className={classes.score}>
                            {score}
                          </Typography>
                        </FlexView>
                      </div>
                    </AccordionSummary>
                    <Divider style={{ margin: 0 }} />
                    <Typography className={classes.insightStyle}>
                      {"Topic Test Insights"}
                    </Typography>
                    <Divider style={{ margin: 0 }} />
                    <Grid container spacing={2}>
                      {insights && insights.length !== 0 ? (
                        insights.map((item, index) => {
                          let isDivider =
                            insights.length - 1 !== index &&
                            isSM &&
                            ((!isMD && index !== 1) || (isMD && index !== 2));
                          return (
                            <Grid item xs={12} sm={6} md={4}>
                              <Box position={"relative"}>
                                <FlexColumnView
                                  gap={"24px"}
                                  padding={"24px 40px !important"}
                                >
                                  <FlexView
                                    justifyContent={"start"}
                                    gap={"12px"}
                                  >
                                    {ICONS[item.icon]}
                                    <LevelContent>{item.name}</LevelContent>
                                  </FlexView>
                                  {item.status && item.status.length !== 0 ? (
                                    item.status.map((list) => (
                                      <InsideContainer>
                                        <SideContent>{list.name}</SideContent>
                                        <RightContent>
                                          {list.result}
                                        </RightContent>
                                      </InsideContainer>
                                    ))
                                  ) : (
                                    <SideContent>
                                      {"Test not attempted"}
                                    </SideContent>
                                  )}
                                </FlexColumnView>
                                {isDivider && <VerticalDivider />}
                              </Box>
                            </Grid>
                          );
                        })
                      ) : (
                        <Grid item xs>
                          <Box textAlign={"center"} padding={"20px !important"}>
                            <SideContent>{"Test not attempted"}</SideContent>
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </Accordion>
                </Grid>
              ))}

            {content.length === 0 && (
              <Grid item xs>
                <CenterText
                  padding={"100px !important"}
                >{`No ${data[activeIndex]["title"]} Discovered`}</CenterText>
              </Grid>
            )}
          </Grid>
        ) : (
          <CenterText paddingTop={"200px !important"}>
            {"Strengths & Weakness not yet Discovered"}
          </CenterText>
        )}
        <SnackBar
          snackData={{
            open,
            snackClose: handleSnackClose,
            snackType: color,
            message: message,
          }}
        />
      </Box>
    </>
  );
}
export default Index;
