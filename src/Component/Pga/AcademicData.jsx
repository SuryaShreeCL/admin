import { Button, Divider, Grid, TextField } from "@material-ui/core";
import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";

class AcademicData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sem: 6,
    };
  }
  choice = [
    { title: "10", value: 10 },
    { title: "7", value: 7 },
    { title: "4", value: 4 },
    { title: "%", value: 100 },
  ];

  handleSaved = () => {
    alert("Data Saved");
  };

  renderUgDegreeDetails = () => {
    let myArr = [];
    for (let i = 1; i <= this.state.sem; i++) {
      myArr.push({
        sem: (
          <TextField
            variant={"outlined"}
            label={"Semester ".concat(i)}
            size={"small"}
          />
        ),
        scoreScale: (
          <Autocomplete
            id="combo-box-demo"
            options={this.choice}
            getOptionLabel={(option) => option.title}
            fullWidth
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                //   helperText={}
                label="Score Scale"
                variant="outlined"
              />
            )}
          />
        ),
        score: (
          <TextField variant={"outlined"} label={"Score"} size={"small"} />
        ),
        topThreeSub: (
          <TextField
            variant={"outlined"}
            label={"Top 3 Subjects"}
            size={"small"}
          />
        ),
        activeBackLog: (
          <TextField
            variant={"outlined"}
            label={"#Active Backlog"}
            size={"small"}
          />
        ),
        backLogSub: (
          <TextField
            variant={"outlined"}
            label={"Backlog Subject"}
            size={"small"}
          />
        ),
        clearBacklog: (
          <TextField
            variant={"outlined"}
            label={"#Cleared Backlog"}
            size={"small"}
          />
        ),
        clearBacklogSub: (
          <TextField
            variant={"outlined"}
            label={"#Cleared Backlog Subject"}
            size={"small"}
          />
        ),
      });
    }
    return myArr.map((eachData) => {
      return (
        <>
          <Grid item md={1}>
            {eachData.sem}
          </Grid>
          <Grid item md={1}>
            {eachData.scoreScale}
          </Grid>
          <Grid item md={1}>
            {eachData.score}
          </Grid>
          <Grid item md={2}>
            {eachData.topThreeSub}
          </Grid>
          <Grid item md={1}>
            {eachData.activeBackLog}
          </Grid>
          <Grid item md={2}>
            {eachData.backLogSub}
          </Grid>
          <Grid item md={1}>
            {eachData.clearBacklog}
          </Grid>
          <Grid item md={2}>
            {eachData.clearBacklogSub}
          </Grid>
          <Grid item md={1}></Grid>
        </>
      );
    });
  };

  render() {
    return (
      <div>
        <h5 style={{ padding: "1%" }}>10th Details</h5>
        <Grid container spacing={1} style={{ padding: "1%" }}>
          <Grid item md={2}>
            <TextField
              variant="outlined"
              size="small"
              label="Name of the School(10th)"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              variant="outlined"
              size="small"
              label="Exam Board Name(10th)"
            />
          </Grid>
          <Grid item md={1}>
            <Autocomplete
              id="combo-box-demo"
              options={this.choice}
              getOptionLabel={(option) => option.title}
              // value={}
              fullWidth
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  //   helperText={}
                  label="Score Scale"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item md={1}>
            <TextField variant="outlined" size="small" label="Score" />
          </Grid>
          <Grid item md={2}>
            <TextField
              variant="outlined"
              size="small"
              label="Name of the School(12th)"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              variant="outlined"
              size="small"
              label="Exam Board Name(12th)"
            />
          </Grid>
          <Grid item md={1}>
            <Autocomplete
              id="combo-box-demo"
              options={this.choice}
              getOptionLabel={(option) => option.title}
              // value={}
              fullWidth
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  //   helperText={}
                  label="Score Scale"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item md={1}>
            <TextField variant="outlined" size="small" label="Score" />
          </Grid>
        </Grid>
        <hr />
        <h5 style={{ padding: "1%" }}>UnderGraduate Degree Details</h5>
        <Grid container spacing={2} style={{padding : "1%"}}>
          {this.renderUgDegreeDetails()}
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
      </div>
    );
  }
}

export default AcademicData;
