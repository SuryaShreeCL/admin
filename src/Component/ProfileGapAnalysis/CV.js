import { TextField, Grid, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { connect } from "react-redux";
class CV extends Component {
  constructor() {
    super();
    this.state = {
      count: 1,
      cvarr: [{ sectionname: "", comments: "" }],
    };
  }
  handleAdd = () => {
      console.log("handleAdd")
      let arr = this.state.cvarr
      arr.push({sectionname: 2, comments: "ewkjnwk"})
      this.setState({
          cvarr : arr
      })
  };
  handleDelete = (index) => {
      if(this.state.cvarr.length > 1){
        console.log(index,"Delete")
        let delarr = this.state.cvarr
        delarr.splice(index,1)
        this.setState({
            cvarr : delarr
        })
      }
  };

  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.cvarr.map((data, index) => (
          <Grid container spacing={1}>
            <Grid item md={12}>
              <TextField label="Section Name" />
            </Grid>
            <Grid item md={10}>
              <TextField fullWidth label="Editor/Mentor's Comment" />
            </Grid>
            <Grid item md={2} style={{ display: "flex",alignItems:"end" }}>
              <div style={{ display: "flex" }}>
                <AddCircleOutlineIcon
                  color="primary"
                  onClick={() => {
                    this.handleAdd();
                  }}
                />
                <DeleteOutlineIcon
                  color="secondary"
                  onClick={() => {
                    this.handleDelete(index);
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
const useStyles = (theme) => ({});
const mapStateToProps = (state) => {
  console.log(state);
  return {};
};
export default connect(mapStateToProps, {})(withStyles(useStyles)(CV));
