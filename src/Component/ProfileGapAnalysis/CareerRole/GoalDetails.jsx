import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ExpandMore from "@material-ui/icons/ExpandMore";
import {
  getStudentGoals,
  updateStudentGoals,
  deleteStudentGoals,
  getGoalsType,
} from "../../../Actions/CareerRoleGraph";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import MySnackBar from "../../MySnackBar";
import {Gridtheme} from './FormStyle'
import {ThemeProvider} from '@material-ui/core/styles'
class GoalDetails extends Component {
  constructor() {
    super();
    this.state = {
      goalArr: [
        {
          id: "",
          pgaCRGGoals: {
            id: "",
          },
          role: "",
          industry: "",
          company: "",
        },
      ],
      goallist: [],
      snackMsg: "",
      snackOpen: false,
      snackColor: "",
    };
  }
  componentDidMount() {
    this.props.getStudentGoals(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      (response) => {
        if (response.data.body.data.length > 0) {
          this.setState({
            goalArr: response.data.body.data,
          });
        }
      }
    );
    this.props.getGoalsType((response) => {
      if (response.status === 200) {
        this.setState({
          goallist: response.data.body.data,
        });
      }
    });
  }
  handleAdd = () => {
    let arr = this.state.goalArr;
    arr.push({
      id: "",
      pgaCRGGoals: {
        id: "",
      },
      role: "",
      industry: "",
      company: "",
    });
    this.setState({
      goalArr: arr,
    });
  };
  handleDelete = (data, index) => {
    if (this.state.goalArr.length > 1) {
      if (data.id.length > 0) {
        this.props.deleteStudentGoals(data.id, (response) => {
          if (response.status === 200) {
            this.props.getStudentGoals(
              this.props.match.params.studentId,
              this.props.match.params.productId,
              (response) => {
                this.setState({
                  goalArr: response.data.body.data,
                });
              }
            );
            this.setState({
              snackMsg: "Deleted SuccessFully",
              snackOpen: true,
              snackColor: "success",
            });
          }
        });
      } else {
        if (this.state.goalArr.length > 1) {
          let delarr = this.state.goalArr;
          delarr.splice(index, 1);
          this.setState({
            goalArr: delarr,
          });
        }
      }
    }
  };
  handleTextChange = (e, index, name) => {
    let items = [...this.state.goalArr];
    let item = { ...items[index] };
    item[name] = e.target.value;
    items[index] = item;
    this.setState({ goalArr: items });
  };
  handleOptionChange = (newValue, index, name) => {
    let items = [...this.state.goalArr];
    let item = { ...items[index] };
    item[name] = newValue;
    items[index] = item;
    this.setState({ goalArr: items });
  };
  handleSave = () => {
    let obj = this.state.goalArr.map((eachItem, index) => {
      if (eachItem.id.length === 0) {
        return {
          pgaCRGGoals: {
            id: eachItem.pgaCRGGoals.id,
          },
          role: eachItem.role,
          industry: eachItem.industry,
          company: eachItem.company,
        };
      } else {
        return {
          id: eachItem.id,
          pgaCRGGoals: {
            id: eachItem.id,
          },
          role: eachItem.role,
          industry: eachItem.industry,
          company: eachItem.company,
        };
      }
    });
    let error = false;
    for (let i = 0; i < obj.length; i++) {
      if (
        obj[i].pgaCRGGoals.length === 0 ||
        obj[i].role.length === 0 ||
        obj[i].industry.length === 0 ||
        obj[i].company.length === 0
      ) {
        error = true;
      }
    }
    if (!error) {
      this.props.updateStudentGoals(
        this.props.match.params.studentId,
        this.props.match.params.productId,
        obj,
        (response) => {
          if (response.status === 200) {
            this.props.getStudentGoals(
              this.props.match.params.studentId,
              this.props.match.params.productId,
              (response) => {
                this.setState({
                  goalArr: response.data.body.data,
                });
              }
            );
            this.setState({
              snackMsg: "Saved Successfully",
              snackOpen: true,
              snackColor: "success",
            });
          }
        }
      );
    } else {
      this.setState({
        snackMsg: "Please Fill the Required Field",
        snackOpen: true,
        snackColor: "error",
      });
    }
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <ThemeProvider theme={Gridtheme}>
        <Grid container spacing={2}>
          <Grid item md={12} className={"goaldetails"}>
            {this.state.goalArr &&
              this.state.goalArr.map((data, index) => (
                <Grid container spacing={2}>
                  <Grid item md={3}>
                    <Autocomplete
                      popupIcon={<ExpandMore />}
                      id="combo-box-demo"
                      options={this.state.goallist}
                      getOptionLabel={(option) => option.name}
                      value={data.pgaCRGGoals}
                      onChange={(e, newValue) =>
                        this.handleOptionChange(newValue, index, "pgaCRGGoals")
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Goals Type"
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={9}></Grid>
                  <Grid item md={3}>
                    <TextField
                      label="Role"
                      value={data.role}
                      onChange={(e) => this.handleTextChange(e, index, "role")}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      label="Industry"
                      value={data.industry}
                      onChange={(e) =>
                        this.handleTextChange(e, index, "industry")
                      }
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      label="Company Name"
                      value={data.company}
                      onChange={(e) =>
                        this.handleTextChange(e, index, "company")
                      }
                    />
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
          </Grid>
          <Grid item md={12} align="right">
            <Button
              color={"primary"}
              variant={"contained"}
              onClick={() => this.handleSave()}
            >
              Save
            </Button>
          </Grid>
        </Grid>
        <MySnackBar
          onClose={() => this.setState({ snackOpen: false })}
          snackOpen={this.state.snackOpen}
          snackVariant={this.state.snackColor}
          snackMsg={this.state.snackMsg}
        />
        </ThemeProvider>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    getStudentGoalsList: state.CRGReducer.getStudentGoals,
    updateStudentGoalsList: state.CRGReducer.updateStudentGoals,
    deleteStudentGoalsList: state.CRGReducer.deleteStudentGoals,
    getGoalsTypeList: state.CRGReducer.getGoalsType,
  };
};
export default connect(mapStateToProps, {
  getStudentGoals,
  updateStudentGoals,
  deleteStudentGoals,
  getGoalsType,
})(GoalDetails);
