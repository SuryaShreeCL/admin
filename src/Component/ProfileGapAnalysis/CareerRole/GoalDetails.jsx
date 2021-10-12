import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
export default class GoalDetails extends Component {
  constructor() {
    super();
    this.state = {
      goalArr: [
        {
          id: "",
          goalType: "",
          role: "",
          industry: "",
          companyname: "",
        },
      ],
    };
  }
  handleAdd = () => {
    let arr = this.state.goalArr;
    arr.push({
      id: "",
      goalType: "",
      role: "",
      industry: "",
      companyname: "",
    });
    this.setState({
      goalArr: arr,
    });
  };
  handleDelete = (data, index) => {
    if (this.state.goalArr.length > 1) {
      console.log(index, "Delete");
      let delarr = this.state.goalArr;
      delarr.splice(index, 1);
      this.setState({
        goalArr: delarr,
      });
    }
  };
  render() {
    return (
      <div>
        {this.state.goalArr.map((data, index) => (
          <Grid container spacing={2}>
            <Grid item md={3}>
              <TextField label="Goal Type" />
            </Grid>
            <Grid item md={9}></Grid>
            <Grid item md={3}>
              <TextField label="Role" />
            </Grid>
            <Grid item md={4}>
              <TextField label="Industry" />
            </Grid>
            <Grid item md={4}>
              <TextField label="Company Name" />
            </Grid>
            <Grid item md={1} className={"careericongrid"}>
              <div>
                <AddCircleOutlineIcon
                  color="primary"
                  onClick={() => {
                    this.handleAdd();
                  }}
                />
                <DeleteOutlineIcon
                  color="secondary"
                  onClick={() => {
                    this.handleDelete(data, index);
                  }}
                />
              </div>
            </Grid>
          </Grid>
        ))}
      </div>
    );
  }
}
