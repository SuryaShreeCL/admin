import {
  Accordion,
  AccordionSummary,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import RadioButton from "./RadioButtons";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Divider,
  H2,
  InsideContainer,
  RightContent,
  SideContainer,
  SideContent,
} from "../../../../Assets/StyledComponents";
import { useStyles } from "./Style";
import { getStrengthAndWeekness } from "../../../../Redux/Action/Student";
import { useDispatch, useSelector } from "react-redux";

function Index({ studentId, productId }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    if (studentId && productId)
      dispatch(getStrengthAndWeekness(studentId, productId));
  }, [studentId, productId]);

  const { strengthAndWeekness } = useSelector(
    (state) => state.LmsStudentReducer
  );

  const [state, setState] = useState({
    productId: null,
  });
  const radioItemData = strengthAndWeekness;
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} justifyContent={"flex-start"}>
        <RadioButton radioItemData={radioItemData.data} />
      </Grid>

      <div className={classes.root}>
        <Grid item>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={classes.Icon} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <H2 className={classes.heading}>Arthematic</H2>
              <Typography variant="subtitle1" className={classes.heading1}>
                {"Skill score"}
              </Typography>
              <Typography variant="subtitle1" className={classes.score}>
                <b>89</b>
              </Typography>
            </AccordionSummary>
            <Divider />
            <Typography
              variant="h6"
              style={{ color: "#4BAEFF", marginLeft: "42%" }}
            >
              {"Topic Test Insights"}
            </Typography>
            <Divider />

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <InsideContainer>
                  <SideContainer>
                    <SideContent>Quantitative Attempted</SideContent>
                  </SideContainer>
                  <RightContent>30/30</RightContent>
                </InsideContainer>

                <InsideContainer>
                  <SideContainer>
                    <SideContent>Quantitative Attempted</SideContent>
                  </SideContainer>
                  <RightContent>30/30</RightContent>
                </InsideContainer>

                <InsideContainer>
                  <SideContainer>
                    <SideContent>Quantitative Attempted</SideContent>
                  </SideContainer>
                  <RightContent>30/30</RightContent>
                </InsideContainer>
              </Grid>
            </Grid>
          </Accordion>
        </Grid>
      </div>
    </Grid>
  );
}
export default Index;
