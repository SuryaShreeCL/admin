import { Grid, TextField, Button } from "@material-ui/core";
import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {getPgaCvAndPpga, getppgaques} from "../../Actions/PgaAction";
import { connect } from "react-redux";


class CvAndPpga extends Component {
  constructor() {
    super();
    this.state = {
      cvCount: 4,
      ppgaCount: 4,
      snackColor : null,
      snackMsg : null,
      snackOpen : false,
      cvfactor : "",
      questions:null,
    };
  }
  cvfactor = [
    { title: "Work Experience " },
    { title: "Workshops" },
    { title: "Certification Courses" },
    { title: "Research Projects  " },
    { title: "Course Projects " },
    { title: "Patents" },
    { title: "Internships (Research)  " },
    { title: "Internships (Industrial)  " },
    { title: "Papers" },
    { title: "In-Plant Training" },
    { title: "Extra-curricular activities" },
    { title: "International Exposure" },
    { title: "Technical Skills" },
    { title: "Other" },
  ];
  ppgaques = [
    { title: "UG | School-Board-Grades" },
    { title: "Interested Subjects" },
    { title: "Confirm package (Placements/Masters)" },
    {
      title:
        "Higher Education Readiness (program, areas of study/specialization, location)",
    },
    { title: "Back-up options for Master’s" },
    { title: "Suggest a Specialization Track" },
    { title: "Ask the reason for the Job. Why now? What is the end goal?" },
    {
      title:
        "Ask about career interest. Clear? Suggest suitable courses. Unclear? Walk through steps options available",
    },
    {
      title:
        "If Backlogs.Ask for a reason. Cleared? If pending, when are they clearing?",
    },
    {
      title:
        "If gap in academics/career. Ask for reason. Will it affect chances? ",
    },
    { title: "Relevant research experience. " },
    { title: "Relevant work experience. " },
    { title: "Relevant Extracurricular activities" },
  ];
  handleChange = (e) =>{
    this.setState({[e.target.name] : e.target.value})
}
  renderCvForm = () => {
    let cvArr = [];
    for (let i = 1; i <= this.state.cvCount; i++) {
      cvArr.push({
        cvFactor: (
        <TextField
          variant = {"outlined"}
          fullWidth
          size="small"
          label="Factor From CV"
         
        />
         
        ),
        count: (
          <TextField
            variant="outlined"
            label="count"
            InputLabelProps={{ shrink: true }}
            type="number"
            size="small"
          />
        ),
        dataFactor: (
          <TextField variant="outlined" label="Data of Factor" size="small" />
        ),
        mentorComments: (
          <TextField variant="outlined" label="Mentor Comments" size="small" />
        ),
      });
    }
    return cvArr.map((eachData) => {
      return (
        <>
          <Grid item md={3}>
            {eachData.cvFactor}
          </Grid>
          <Grid item md={1}>
            {eachData.count}
          </Grid>
          <Grid item md={4}>
            {eachData.dataFactor}
          </Grid>
          <Grid item md={4}>
            {eachData.mentorComments}
          </Grid>
        </>
      );
    });
  };
  renderPpgaForm = () => {
    let ppgaArr = [];
    for (let i = 1; i <= this.state.ppgaCount; i++) {
      ppgaArr.push({
        questions: (
          <TextField
          variant = {"outlined"}
          fullWidth
          size="small"
          label="Question From Database"
          onChange={(e) => this.handleChange(e)}
          // value={this.props.}
        />
        ),
        notesBefore: (
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            label="Notes Before PPGA "
          />
        ),
        notesAfter: (
          <TextField
            variant="outlined"
            size="small"
            label="Notes After PPGA "
          />
        ),
      });
    }
    return ppgaArr.map((eachItem) => {
      return (
        <>
          <Grid item md={4}>
            {eachItem.questions}
          </Grid>
          <Grid item md={4}>
            {eachItem.notesBefore}
          </Grid>
          <Grid item md={4}>
            {eachItem.notesAfter}
          </Grid>
        </>
      );
    });
  };

  componentDidMount() {
    this.props.getPgaCvAndPpga(this.props.id)
    this.props.getppgaques(this.props.id)
  }

  render() {
    console.log(this.props.pgaCvAndPpga)
    return (

      <div>
        <h5 style={{ padding: "1%" }}>CV Details</h5>
        <Grid container spacing={2} style={{ padding: "2%" }}>
          {this.renderCvForm()}
        </Grid>
        <hr />
        <h5 style={{ padding: "1%" }}>PPGA Question</h5>
        <Grid container style={{ padding: "2%" }} spacing={2}>
          {this.renderPpgaForm()}
        </Grid>
        <Grid style={{ padding: "1%" }}>
         <Button
            variant="contained"
            color="primary"
            onClick={this.handleSaved}
          >
            Save
          </Button>
        </Grid>
        <Snackbar
          open={this.state.snackOpen}
          variant="filled"
          autoHideDuration={3000}
          onClose={() => this.setState({ snackOpen: false })}
        >
          <Alert
            onClose={() => this.setState({ snackOpen: false })}
            severity={this.state.snackColor}
          >
            {this.state.snackMsg}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
export const mapStateToProps = (state) =>{
 
  return {
    pgaCvAndPpga : state.PgaReducer.pgaCvAndPpga,
    getppgaques : state.PgaReducer.getppgaques


  }
}

export default connect(mapStateToProps,{getPgaCvAndPpga,getppgaques})(CvAndPpga)

