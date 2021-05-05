import { Grid, TextField, Icon, IconButton } from "@material-ui/core";
import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IndeterminateCheckBoxRoundedIcon from "@material-ui/icons/IndeterminateCheckBoxRounded";
import { connect } from "react-redux";
import {getQuarterPlan} from "../../Actions/PgaAction"
 class commentandpoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
  }
  choice = [
    { title: "Option 1" },
    { title: "Option 2" },
    { title: "Option 3" },
    { title: "Option 4" },
    { title: "Option 5" },
  ];
  status = [
    { title: "Not started" },
    { title: "In progress" },
    { title: "Completed" },
    { title: "Backlog" },
  ];
  renderAditionalPoints = () => {
    let myArr = [];
    for (let i = 1; i <= this.state.count; i++) {
      myArr.push({
        category: (
          <Autocomplete
            id="combo-box-demo"
            options={this.choice}
            getOptionLabel={(option) => option.title}
            fullWidth
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Category" variant="outlined" />
            )}
          />
        ),
        remark: (
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Category Remark"
          />
        ),
      });
    }
    return myArr.map((eachContent) => {
      return (
        <>
          <Grid item md={3}>
            {eachContent.category}
          </Grid>
          <Grid item md={8}>
            {eachContent.remark}
          </Grid>
          <Grid item md={1} align={"right"}>
            <IconButton
              onClick={() =>
                this.setState({
                  count: this.state.count !== 1 ? this.state.count - 1 : 1,
                })
              }
            >
              <IndeterminateCheckBoxRoundedIcon />
            </IconButton>
          </Grid>
        </>
      );
    });
  };

  componentDidMount() {
    this.props.getQuarterPlan(this.props.id)
  }
  
  // componentDidUpdate(prevProps, prevState) {
  //   if(this.props.quarterPlanDetails !== prevProps.quarterPlanDetails){
  //     this.props.quarterPlanDetails.map((eachData,index)=>{
  //       this.setState({
  //         ["focus".concat(index+1).concat("enrollmentPeriod")] : eachData.enrollmentPeriod,
  //         ["focus".concat(index+1).concat("")]
  //       })
  //     })
  //   }
  // }
  

  render() {
    console.log(this.props.quarterPlanDetails)
    return (
      <div>
        <h6 style={{ padding: "1%" }}>
          Following Block Reports for Each Quarter in the given Year
        </h6>
        <Grid container spacing={2} style={{ padding: "2%" }}>
          <Grid item md={2}>
            <h6>Focus 1 (Focus_Quarter)</h6>
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              options={this.props.quarterPlanDetails}
              getOptionLabel={(option) => option.quarterPlanCourse.name}
              // value={}
              fullWidth
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  //   helperText={}
                  label="Focus 1"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              variant="outlined"
              size="small"
              label="Category Description"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              variant="outlined"
              size="small"
              label="Category Remark"
            />
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              options={this.status}
              getOptionLabel={(option) => option.title}
              // value={}
              fullWidth
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  //   helperText={}
                  label="Status"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item md={2}>
            <h6>Focus 2 (Focus_Quarter)</h6>
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              options={this.props.quarterPlanDetails}
              getOptionLabel={(option) => option.quarterPlanCourse.name}
              // value={}
              fullWidth
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  //   helperText={}
                  label="Focus 2"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              variant="outlined"
              size="small"
              label="Category Description"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              variant="outlined"
              size="small"
              label="Category Remark"
            />
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              options={this.status}
              getOptionLabel={(option) => option.title}
              // value={}
              fullWidth
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  //   helperText={}
                  label="Status"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item md={2}>
            <h6>Focus 3 (Focus_Quarter)</h6>
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              options={this.props.quarterPlanDetails}
              getOptionLabel={(option) => option.quarterPlanCourse.name}
              // value={}
              fullWidth
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  //   helperText={}
                  label="Focus 3"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              variant="outlined"
              size="small"
              label="Category Description"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              variant="outlined"
              size="small"
              label="Category Remark"
            />
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              options={this.status}
              getOptionLabel={(option) => option.title}
              // value={}
              fullWidth
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  //   helperText={}
                  label="Status"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item md={2}>
            <h6>Focus 4 (Focus_Quarter)</h6>
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              // value={}
              options={this.props.quarterPlanDetails}
              getOptionLabel={(option) => option.quarterPlanCourse.name}
              fullWidth
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  //   helperText={}
                  label="Focus 4"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              variant="outlined"
              size="small"
              label="Category Description"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              variant="outlined"
              size="small"
              label="Category Remark"
            />
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              // value={}
              options={this.status}
              getOptionLabel={(option) => option.title}
              fullWidth
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  //   helperText={}
                  label="Status"
                  variant="outlined"
                />
              )}
            />
          </Grid>
        </Grid>
        <hr />
        <h6 style={{ padding: "1%" }}>Additional Points</h6>
        <Grid container spacing={2} style={{ padding: "1%" }}>
          <Grid item md={11}>
            <Grid container spacing={2}>
              {this.renderAditionalPoints()}
            </Grid>
          </Grid>

          <Grid item md={1} align={"left"} style={{display : "flex", alignItems : "flex-end"}}>
            <IconButton
              onClick={() => this.setState({ count: this.state.count + 1 })}
            >
              <Icon>
                <AddCircleIcon />
              </Icon>
            </IconButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}

 const mapStateToProps = (state) =>{
   console.log(state)
  return {
    quarterPlanDetails : state.PgaReducer.quarterPlan
  }
}

export default connect(mapStateToProps, {getQuarterPlan})(commentandpoints)