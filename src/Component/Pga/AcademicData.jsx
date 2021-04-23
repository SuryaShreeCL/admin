import { Button, Divider, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
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

  handleChange = (e,value) =>{
   
      this.setState({
        [e.target.name] : e.target.value
      })
    
   
  }

  renderUgDegreeDetails = () => {
    let myArr = [];
    for (let i = 1; i <= this.state.sem; i++) {
      myArr.push({
        sem: (
          <TextField
            variant={"outlined"}
            name={"sem".concat(i)}
            onChange={this.handleChange}
            label={"Semester ".concat(i)}
            size={"small"}
          />
        ),
        scoreScale: (
          <FormControl size="small" fullWidth variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Score Scale</InputLabel>
        <Select
        fullWidth
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={this.handleChange}
          label="Score Scale"
          name={"scoreScaleSem".concat(i)}

        >
          {this.choice.map(eachChoice=>{
            return(
              <MenuItem value={eachChoice.value}>{eachChoice.title}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
        ),
        score: (
          <TextField variant={"outlined"} name={"sem".concat(i).concat("score")} onChange={this.handleChange} label={"Score"} size={"small"} />
        ),
        topThreeSub: (
          <TextField
            variant={"outlined"}
            name={"sem".concat(i).concat("top3")}
            onChange={this.handleChange}
            label={"Top 3 Subjects"}
            size={"small"}
          />
        ),
        activeBackLog: (
          <TextField
            variant={"outlined"}
            name={"sem".concat(i).concat("activeBacklog")}
            onChange={this.handleChange}
            label={"#Active Backlog"}
            size={"small"}
          />
        ),
        backLogSub: (
          <TextField
            variant={"outlined"}
            name={"sem".concat(i).concat("backlogSub")}
            onChange={this.handleChange}
            label={"Backlog Subject"}
            size={"small"}
          />
        ),
        clearBacklog: (
          <TextField
            variant={"outlined"}
            name={"sem".concat(i).concat("clearedBacklog")}
            onChange={this.handleChange}
            label={"#Cleared Backlog"}
            size={"small"}
          />
        ),
        clearBacklogSub: (
          <TextField
            variant={"outlined"}
            name={"sem".concat(i).concat("clearedSub")}
            onChange={this.handleChange}
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
    console.log(this.state)
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
