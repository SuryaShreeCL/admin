import React, { Component } from "react";
import { TextField, Grid, Divider, Typography } from "@material-ui/core";
import PrimaryButton from "../../Utils/PrimaryButton";
import "./InterestDetail.css";

export default class PpgaCallNotes extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      tenthTwelfthGrades: {
        fieldTitle: "10th and 12th Details | School-Board-Grades",
        ppgaNotes: "",
        postPpgaNotes: "",
        mentorNotes: "",
      },
      ugGrades: {
        fieldTitle: "UG | School-Board-Grades",
        ppgaNotes: "",
        postPpgaNotes: "",
        mentorNotes: "",
      },
      interestedSubject: {
        fieldTitle: "Interested Subjects",
        ppgaNotes: "",
        postPpgaNotes: "",
        mentorNotes: "",
      },
      confirmPackage: {
        fieldTitle: "Confirm package (Placements/Masters)",
        ppgaNotes: "",
        postPpgaNotes: "",
        mentorNotes: "",
      },
      higherEducationReadiness: {
        fieldTitle: "Higher Education Readiness (program, areas of study/specialization, location)",
        ppgaNotes: "",
        postPpgaNotes: "",
        mentorNotes: "",
      },
      masterBackUp: {
        fieldTitle: "Back-up options for Master’s",
        ppgaNotes: "",
        postPpgaNotes: "",
        mentorNotes: "",
      },
      specializationTrack: {
        fieldTitle: "Suggest a Specialization Track",
        ppgaNotes: "",
        postPpgaNotes: "",
        mentorNotes: "",
      },
      endGoal: {
        fieldTitle: "Ask the reason for the Job. Why now? What is the end goal?",
        ppgaNotes: "",
        postPpgaNotes: "",
        mentorNotes: "",
      },
      careerInterest: {
        fieldTitle: "Ask about career interest. Clear? Suggest suitable courses. Unclear? Walk through steps options available",
        ppgaNotes: "",
        postPpgaNotes: "",
        mentorNotes: "",
      },
      workExperience: {
        fieldTitle: "Relevant work experience",
        ppgaNotes: "",
        postPpgaNotes: "",
        mentorNotes: "",
      },
      gapInAcademics: {
        fieldTitle: "If gap in academics/career. Ask for reason. Will it affect chances?",
        ppgaNotes: "",
        postPpgaNotes: "",
        mentorNotes: "",
      },
      researchExperience: {
        fieldTitle: "Relevant research experience",
        ppgaNotes: "",
        postPpgaNotes: "",
        mentorNotes: "",
      },
      backlogReason: {
        fieldTitle: "If Backlogs.Ask for a reason. Cleared? If pending, when are they clearing?",
        ppgaNotes: "",
        postPpgaNotes: "",
        mentorNotes: "",
      },

    };
  }
  
  render() {
    return (

      <div>
        <Grid container spacing={3} style={{ height: "100vh" }}>
          <Grid
            item
            md={12}
            xs={12}
            sm={12}
            xl={12}
            lg={12}
            style={{ maxHeight: "92%", overflowY: "scroll", padding: "15px" }}
          >
            <Grid container spacing={3}>
              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <p>10th and 12th Details | School-Board-Grades</p>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  label="PPGA Notes"
                  className="ppgaTextField_align"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Post PPGA Notes"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Mentor Notes"
                ></TextField>
              </Grid>
            </Grid>

            {/* UG | School-Board-Grades */}
            <Grid container spacing={3}>
              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <p>UG | School-Board-Grades</p>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  label="PPGA Notes"
                  className="ppgaTextField_align"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Post PPGA Notes"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Mentor Notes"
                ></TextField>
              </Grid>
            </Grid>

            {/* Interested Subjects */}
            <Grid container spacing={3}>
              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <p>Interested Subjects</p>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  label="PPGA Notes"
                  className="ppgaTextField_align"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Post PPGA Notes"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Mentor Notes"
                ></TextField>
              </Grid>
            </Grid>

            {/* Confirm package (Placements/Masters) */}
            <Grid container spacing={3}>
              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <p>Confirm package (Placements/Masters)</p>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  label="PPGA Notes"
                  className="ppgaTextField_align"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Post PPGA Notes"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Mentor Notes"
                ></TextField>
              </Grid>
            </Grid>

            {/* Higher Education Readiness (program, areas of study/specialization, location) */}
            <Grid container spacing={3}>
              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <p>
                  Higher Education Readiness (program, areas of
                  study/specialization, location)
                </p>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  label="PPGA Notes"
                  className="ppgaTextField_align"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Post PPGA Notes"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Mentor Notes"
                ></TextField>
              </Grid>
            </Grid>

            {/* Back-up options for Master’s */}
            <Grid container spacing={3}>
              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <p>Back-up options for Master’s</p>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  label="PPGA Notes"
                  className="ppgaTextField_align"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Post PPGA Notes"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Mentor Notes"
                ></TextField>
              </Grid>
            </Grid>

            {/*Suggest a Specialization Track  */}
            <Grid container spacing={3}>
              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <p>Suggest a Specialization Track</p>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  label="PPGA Notes"
                  className="ppgaTextField_align"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Post PPGA Notes"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Mentor Notes"
                ></TextField>
              </Grid>
            </Grid>

            {/* Ask the reason for the Job. Why now? What is the end goal? */}
            <Grid container spacing={3}>
              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <p>
                  Ask the reason for the Job. Why now? What is the end goal?
                </p>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  label="PPGA Notes"
                  className="ppgaTextField_align"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Post PPGA Notes"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Mentor Notes"
                ></TextField>
              </Grid>
            </Grid>

            {/* Ask about career interest. Clear? Suggest suitable courses. Unclear? Walk through steps options available*/}
            <Grid container spacing={3}>
              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <p>
                  Ask about career interest. Clear? Suggest suitable courses.
                  Unclear? Walk through steps options available
                </p>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  label="PPGA Notes"
                  className="ppgaTextField_align"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Post PPGA Notes"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Mentor Notes"
                ></TextField>
              </Grid>
            </Grid>

            {/* Relevant work experience.  */}
            <Grid container spacing={3}>
              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <p>Relevant work experience. </p>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  label="PPGA Notes"
                  className="ppgaTextField_align"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Post PPGA Notes"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Mentor Notes"
                ></TextField>
              </Grid>
            </Grid>

            {/* If gap in academics/career. Ask for reason. Will it affect chances?  */}
            <Grid container spacing={3}>
              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <p>
                  If gap in academics/career. Ask for reason. Will it affect
                  chances?{" "}
                </p>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  label="PPGA Notes"
                  className="ppgaTextField_align"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Post PPGA Notes"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Mentor Notes"
                ></TextField>
              </Grid>
            </Grid>

            {/* Relevant research experience.  */}
            <Grid container spacing={3}>
              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <p>Relevant research experience. </p>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  label="PPGA Notes"
                  className="ppgaTextField_align"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Post PPGA Notes"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Mentor Notes"
                ></TextField>
              </Grid>
            </Grid>

            {/* If Backlogs.Ask for a reason. Cleared? If pending, when are they clearing? */}
            <Grid container spacing={3}>
              <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
                <p>
                  If Backlogs.Ask for a reason. Cleared? If pending, when are
                  they clearing?
                </p>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  label="PPGA Notes"
                  className="ppgaTextField_align"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Post PPGA Notes"
                ></TextField>
              </Grid>
              <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  className="ppgaTextField_align"
                  label="Mentor Notes"
                ></TextField>
              </Grid>
            </Grid>
          </Grid>

          {/* button */}
          <Grid container>
            <Grid item md={12} xs={12} sm={12} xl={12} lg={12}>
              <hr />
            </Grid>
            {/* button and text main div */}
            <Grid
              item
              md={12}
              xs={12}
              sm={12}
              xl={12}
              lg={12}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "-15px",
                alignItems: "center",
                padding: "5px",
              }}
            >
              <div>
                <Typography className={"footer_text"}>
                  PPGA Call - Verification/Change Details
                </Typography>
              </div>
              <div className={"button_div"}>
                <PrimaryButton
                  variant={"contained"}
                  color={"primary"}
                  style={{
                    width: "100px",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  Save
                </PrimaryButton>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
