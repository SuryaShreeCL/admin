import React, { Component, useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  viewresettest,
  viewstudentmarkdetails,
} from "../Actions/StudentMarkDetails";
import { connect } from "react-redux";
import StudentMarkDetails from "../Reducer/MarkReducer";
import {
  Grid,
  Button,
  Typography,
  Collapse,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { careerTrackVideoSetPath } from "./RoutePaths";
import { viewanswers } from "../Actions/StudentMarkDetails";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

function CustomizedPrograss(props) {
  const [show, setShow] = useState(false);
  // const quesAns = []
  const [quesAns, setQuesAns] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackColor, setSnackColor] = useState("");
  React.useEffect(() => {
    props.viewstudentmarkdetails(props.id);
    // console.log(props.viewAnswers)
    console.log(Object.keys(props.viewAnswers).length);

    if (Object.keys(props.viewAnswers).length === 0) {
      for (const property in props.viewAnswers) {
        console.log(`${property}: ${props.viewAnswers[property]}`);
        setQuesAns(
          quesAns.push({
            question: property,
            answer: props.viewAnswers[property],
          })
        );
      }
    }
  }, [props.viewReseTestList, props.viewAnswers]);

  // const takeTestCompleted = props.takeTest !== undefined ? props.takeTest.map(test=>{
  //   return test.completed
  // })  : null
  // const [collapse,setCollapse] = React.useState(false)

  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#1a90ff",
    },
  }))(LinearProgress);

  const myclick = (testId) => {
    console.log(testId);
    props.viewresettest(props.id, testId);
  };

  const answers = (questionSetName) => {
    props.viewanswers(props.id, questionSetName);
    setShow(true);
  };

  console.log(quesAns);
  return (
    <div>
      <div style={{ position: "relative" }}>
        {props.viewstudentmarkdetailsList.length !== 0
          ? props.viewstudentmarkdetailsList.teststatus.map((singleObject) => {
              return (
                <>
                  <Grid container spacing={12}>
                    <Grid item md={6} align="center">
                      <label>
                        <Typography>{singleObject.questionSetName}</Typography>
                      </label>
                      <BorderLinearProgress
                        style={{ width: "50%" }}
                        variant="determinate"
                        value={singleObject.completed}
                      />
                      <h6>
                        <small>{singleObject.completed}%completed</small>
                      </h6>
                      <br />
                    </Grid>
                    <Grid item md={6}>
                      <Button
                        variant={"contained"}
                        size={"small"}
                        disabled={
                          window.sessionStorage.getItem("role") !==
                          "SUPER ADMIN"
                            ? true
                            : false
                        }
                        color={"primary"}
                        style={{ borderRadius: 30 }}
                        onClick={() => myclick(singleObject.testExecutionId)}
                      >
                        Reset Test
                      </Button>

                      <Button
                        Rounded
                        variant={"contained"}
                        size={"small"}
                        disabled
                        color={"primary"}
                        style={{ borderRadius: 30 }}
                        onClick={(e) => answers(singleObject.questionSetName)}
                      >
                        Answers
                      </Button>
                    </Grid>
                   
                  </Grid>
                </>
              );
            })
          : null}
        <Dialog open={show}>
          <DialogTitle>Answers</DialogTitle>
          <DialogContent>
            {quesAns.map((content) => {
              return (
                <Grid>
                  <Typography>{content.question}</Typography>
                  <Typography>{content.answer}</Typography>
                </Grid>
              );
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShow(false)}>okay</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    viewstudentmarkdetailsList:
      state.StudentMarkDetailReducer.viewStudentMarkDetailsList,
    viewReseTestList: state.StudentMarkDetailReducer.viewReseTestList,
    viewAnswers: state.StudentMarkDetailReducer.viewAnswersList,
  };
};
export default connect(mapStateToProps, {
  viewstudentmarkdetails,
  viewresettest,

  viewanswers,
})(CustomizedPrograss);
