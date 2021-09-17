import {
  Grid,
  TextField,
  Icon,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IndeterminateCheckBoxRoundedIcon from "@material-ui/icons/IndeterminateCheckBoxRounded";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  getQuarterPlan,
  getAllQuarterPlan,
  postCommentsAndPoints,
  getAdditionalPoints,
  postAdditionalPoints,
} from "../../Actions/PgaAction";
class commentandpoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      focusId1: null,
      focusId2: null,
      focusId3: null,
      focusId4: null,
      focus1: null,
      focus2: null,
      focus3: null,
      focus4: null,
      description1: null,
      description2: null,
      description3: null,
      description4: null,
      catRemark1: null,
      catRemark2: null,
      catRemark3: null,
      catRemark4: null,
      status1: null,
      status2: null,
      status3: null,
      status4: null,
      period1: null,
      period2: null,
      period3: null,
      period4: null,
      snackOpen: false,
      snackMessage: null,
      snackVariant: null,
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
          <FormControl size="small" fullWidth variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              {"Category ".concat(i)}
            </InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label={"Category ".concat(i)}
              value={this.state["aditionalCat".concat(i)]}
              name={"aditionalCat".concat(i)}
              onChange={this.handleChange}
            >
              {this.props.allQuarterPlan.map((eachPlan) => {
                return (
                  <MenuItem value={eachPlan.name}>{eachPlan.name}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        ),
        remark: (
          <TextField
            fullWidth
            name={"additionalRemark".concat(i)}
            value={this.state["additionalRemark".concat(i)]}
            onChange={this.handleChange}
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
    this.props.getQuarterPlan(this.props.id);
    this.props.getAllQuarterPlan();
    this.props.getAdditionalPoints(this.props.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.quarterPlanDetails !== prevProps.quarterPlanDetails) {
      this.props.quarterPlanDetails.map((eachData, index) => {
        this.setState({
          ["focus".concat(index + 1)]: eachData.quarterPlanCourse,
          ["description".concat(index + 1)]: eachData.quarterPlanCourse
            .description,
          ["catRemark".concat(index + 1)]: eachData.remark,
          ["status".concat(index + 1)]:
            eachData.status !== null ? { title: eachData.status } : null,
          ["period".concat(index + 1)]: eachData.enrollmentPeriod,
          ["focusId".concat(index + 1)]: eachData.id,
        });
      });
    }
    if (
      this.props.postCommentsAndPointsResponse !==
      prevProps.postCommentsAndPointsResponse
    ) {
      this.setState({
        snackMessage: "Data Saved Successfully",
        snackVariant: "success",
        snackOpen: true,
      });
    }
    // if(this.props.additionalPointsDetails !== prevProps.additionalPointsDetails){
    //   if(this.props.additionalPointsDetails.length !== 0){
    //     for(let i=0; i<=this.props.additionalPointsDetails.length; i++){
    //       if(this.props.additionalPointsDetails[i] !== undefined){
    //         this.setState({
    //           count : this.props.additionalPointsDetails.length,
    //           ["additionalId".concat(i+1)] : this.props.additionalPointsDetails[i].id,
    //           ["aditionalCat".concat(i+1)] : this.props.additionalPointsDetails[i].category,
    //           ["additionalRemark".concat(i+1)] : this.props.additionalPointsDetails[i].remark
    //         })
    //       }

    //     }
    //   }
    // }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSave = () => {
    let postArr = [];
    for (let i = 1; i <= 4; i++) {
      postArr.push({
        id: this.state["focusId".concat(i)],
        enrollmentPeriod: this.state["period".concat(i)],
        quarterPlanCourse: this.state["focus".concat(i)],
        student: { id: this.props.id },
        remark: this.state["catRemark".concat(i)],
        status:
          this.state["status".concat(i)] !== null
            ? this.state["status".concat(i)].title
            : null,
      });
    }

    let postAdditionalPointsArr = [];

    for (let i = 1; i <= this.state.count; i++) {
      postAdditionalPointsArr.push({
        category: this.state["aditionalCat".concat(i)],
        remark: this.state["additionalRemark".concat(i)],
      });
    }

    console.log(postAdditionalPointsArr);
    this.props.postAdditionalPoints(this.props.id, postAdditionalPointsArr);
    this.props.postCommentsAndPoints(postArr);
    console.log(postArr);
  };

  render() {
    console.log(this.props.quarterPlanDetails);
    console.log(this.props.allQuarterPlan);
    console.log(this.state);
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
              options={this.props.allQuarterPlan}
              getOptionLabel={(option) => option.name}
              value={this.state.focus1}
              fullWidth
              onChange={(e, newValue) => this.setState({ focus1: newValue })}
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
              multiline
              disabled
              InputLabelProps={{ shrink: true }}
              rows={4}
              value={this.state.description1}
              name={"description1"}
              onChange={this.handleChange}
              size="small"
              label="Category Description"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              variant="outlined"
              size="small"
              value={this.state.catRemark1}
              name="catRemark1"
              InputLabelProps={{ shrink: true }}
              onChange={this.handleChange}
              label="Category Remark"
            />
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              options={this.status}
              getOptionLabel={(option) => option.title}
              value={this.state.status1}
              fullWidth
              onChange={(e, newValue) => this.setState({ status1: newValue })}
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
              options={this.props.allQuarterPlan}
              getOptionLabel={(option) => option.name}
              value={this.state.focus2}
              fullWidth
              onChange={(e, newValue) => this.setState({ focus2: newValue })}
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
              value={this.state.description2}
              InputLabelProps={{ shrink: true }}
              rows={4}
              multiline
              disabled
              onChange={this.handleChange}
              name={"description2"}
              size="small"
              label="Category Description"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={this.state.catRemark2}
              onChange={this.handleChange}
              name={"catRemark2"}
              size="small"
              label="Category Remark"
            />
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              options={this.status}
              getOptionLabel={(option) => option.title}
              value={this.state.status2}
              onChange={(e, newValue) => this.setState({ status2: newValue })}
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
              options={this.props.allQuarterPlan}
              getOptionLabel={(option) => option.name}
              value={this.state.focus3}
              fullWidth
              onChange={(e, newValue) => this.setState({ focus3: newValue })}
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
              name={"description3"}
              InputLabelProps={{ shrink: true }}
              rows={4}
              multiline
              disabled
              value={this.state.description3}
              onChange={this.handleChange}
              size="small"
              label="Category Description"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              variant="outlined"
              size="small"
              name={"catRemark3"}
              InputLabelProps={{ shrink: true }}
              value={this.state.catRemark3}
              onChange={this.handleChange}
              label="Category Remark"
            />
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              options={this.status}
              getOptionLabel={(option) => option.title}
              value={this.state.status3}
              onChange={(e, newValue) => this.setState({ status3: newValue })}
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
              value={this.state.focus4}
              onChange={(e, newValue) => this.setState({ focus4: newValue })}
              options={this.props.allQuarterPlan}
              getOptionLabel={(option) => option.name}
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
              name={"description4"}
              disabled
              InputLabelProps={{ shrink: true }}
              rows={4}
              multiline
              value={this.state.description4}
              onChange={this.handleChange}
              size="small"
              label="Category Description"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              variant="outlined"
              name={"catRemark4"}
              InputLabelProps={{ shrink: true }}
              value={this.state.catRemark4}
              onChange={this.handleChange}
              size="small"
              label="Category Remark"
            />
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              id="combo-box-demo"
              value={this.state.status4}
              onChange={(e, newValue) => this.setState({ status4: newValue })}
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

          <Grid
            item
            md={1}
            align={"left"}
            style={{ display: "flex", alignItems: "flex-end" }}
          >
            <IconButton
              onClick={() => this.setState({ count: this.state.count + 1 })}
            >
              <Icon>
                <AddCircleIcon />
              </Icon>
            </IconButton>
          </Grid>
          <Grid item md={12}>
            <Button
              onClick={this.handleSave}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          open={this.state.snackOpen}
          autoHideDuration={3000}
          onClose={() => this.setState({ snackOpen: false })}
        >
          <Alert
            variant="filled"
            onClose={() => this.setState({ snackOpen: false })}
            severity={this.state.snackVariant}
          >
            {this.state.snackMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    quarterPlanDetails: state.PgaReducer.quarterPlan,
    allQuarterPlan: state.PgaReducer.allQuarterPlan,
    postCommentsAndPointsResponse:
      state.PgaReducer.postCommentsAndPointsResponse,
    additionalPointsDetails: state.PgaReducer.additionalPointsDetails,
    postAdditionalPointsResponse: state.PgaReducer.postAdditionalPointsResponse,
  };
};

export default connect(mapStateToProps, {
  getQuarterPlan,
  getAllQuarterPlan,
  postCommentsAndPoints,
  getAdditionalPoints,
  postAdditionalPoints,
})(commentandpoints);
