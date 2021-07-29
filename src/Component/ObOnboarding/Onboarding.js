import {
  createMuiTheme, Drawer, Grid, IconButton, List, ListItem, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { ExpandMore } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@material-ui/lab";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllAdminUsers, getStudentByStages } from "../../Actions/AdminAction";
import { getAllTerms } from "../../Actions/Aspiration";
import { getAllColleges, getBranches } from "../../Actions/College";
import { filterStageBaseUsers, viewAllCities } from "../../Actions/Student";
import Call from "../../Asset/Images/callImg.png";
import PrimaryButton from "../../Utils/PrimaryButton";
import {
  callSummaryLayoutPath, stagedTabsPath
} from "../RoutePaths";
const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "white",
      },
    },
  },
});
export class Onboarding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shrink: false,
      draweropen: false,
      college: null,
      department: null,
      intake: null,
      city: null,
      bda: null,
      // search : "",
      listOfusers : []
    };
  }

  componentDidMount() {
    // To get the users based on stages
    this.props.getStudentByStages(this.props.stageDetails.stepName);
    this.props.getBranches();
    this.props.getAllColleges();
    this.props.getAllTerms();
    this.props.viewAllCities();
    this.props.getAllAdminUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    // Setting the users in state
    if(this.props.studentsByStagesList !== prevProps.studentsByStagesList){
      this.setState({
        listOfusers : this.props.studentsByStagesList
      })
    }

    //Setting the filtered users in state
    if(this.props.filteredStageBasedUsers !== prevProps.filteredStageBasedUsers){
      let listOfUsersArr = []
      this.props.filteredStageBasedUsers.map((eachUser,index)=>{
        listOfUsersArr.push({
          activatedBy : eachUser.adminUser,
          allocatedAt : eachUser.allocatedAt,
          allocatedBy : eachUser.allocatedBy,
          amountPaid : eachUser.product.sellingPrice,
          clsId : eachUser.student.studentID,
          college : eachUser.student.college !== null && eachUser.student.college.name,
          degree : eachUser.student.ugDegree !== null && eachUser.student.ugDegree.name,
          department : eachUser.student.department !== null && eachUser.student.department.name,
          emailId : eachUser.student.emailId,
          firstName : eachUser.student.firstName,
          fullName : eachUser.student.fullName,
          lastName : eachUser.student.lastName,
          obCallStatus : null,
          orderDate : eachUser.enrollmentDate,
          paymentId : eachUser.paymentId,
          paymentProvider : eachUser.paymentProvider,
          percentage : null,
          phoneNumber : eachUser.student.phoneNumber,
          products : null,
          punchedBy : eachUser.adminUsers,
          stage : eachUser.stage,
          studentId : eachUser.student.id
        })
      })
      this.setState({
        listOfusers : listOfUsersArr
      })
    }

  }
  shrink() {
    this.setState({ shrink: true });
  }

  // To open the filter drawer
  filterfunction = () => {
    this.setState({
      draweropen: true,
    });
  };

// Apply filter function


  applyFilter = () =>{
    console.log(this.state)
    let collegeId = this.state.college !== null ? this.state.college.id : ""
    let departmentId = this.state.department !== null ? this.state.department.id : ""
    let cityId = this.state.city !== null ? this.state.city.id : ""
    let bdaName = this.state.bda !== null ? this.state.bda.name : ""
    let intake = this.state.intake !== null ? this.state.intake.name : ""
    this.props.filterStageBaseUsers(collegeId,departmentId,cityId,bdaName,intake)
  }
  handleReset = () =>{
    this.setState({
      college: null,
      department: null,
      intake: null,
      city: null,
      bda: null,
    })
    this.props.getStudentByStages(this.props.stageDetails.stepName);

  }
  render() {
    console.log(this.props);
    const { HeadStyle, HeadDisplay } = style;
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <TableContainer component={Paper}>
              <div style={HeadDisplay}>
                <p style={HeadStyle}> List of Users in On Boarding Stage </p>
                {/* <div> */}
                <TextField
                  label={
                    <Typography
                      style={{ fontSize: "13px", marginLeft: "30px" }}
                    >
                      Search by Email ID / Mobile / Full Name / CLS ID
                    </Typography>
                  }
                  variant="outlined"
                  // value={this.state.search}
                  // onChange={(e)=>{
                  //   console.log(e)
                  //   this.setState({search : e.target.value})}}
                  InputLabelProps={{
                    shrink: this.state.shrink,
                  }}
                  onFocus={() => this.shrink()}
                  type="search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  style={{ width: "45%", marginLeft: "23%" }}
                />
                <PrimaryButton
                  style={{
                    height: 30,
                    width: 107,
                    marginRight: 70,
                    marginTop: 10,
                    textTransform: "none",
                  }}
                  variant={"contained"}
                  color={"primary"}
                  size={"small"}
                  onClick={() => this.filterfunction()}
                >
                  Filter
                </PrimaryButton>
              </div>
              <Table aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">CLS ID</TableCell>
                    <TableCell align="left">Client Name</TableCell>
                    <TableCell align="left">Email Address</TableCell>
                    <TableCell align="left">Phone Number</TableCell>
                    <TableCell align="left">OB Call Status</TableCell>
                    <TableCell align="left">Completion %</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.listOfusers.length !== 0 &&
                    this.state.listOfusers.map((eachItem, index) => {
                      console.log(eachItem.percentage)
                      return (
                        <TableRow>
                          <TableCell>{eachItem.clsId}</TableCell>
                          <TableCell>
                            {eachItem.fullName !== null
                              ? eachItem.fullName
                              : eachItem.firstName + " " + eachItem.lastName}
                          </TableCell>
                          <TableCell>{eachItem.emailId}</TableCell>
                          <TableCell>{eachItem.phoneNumber}</TableCell>
                          <TableCell>{eachItem.obCallStatus}</TableCell>
                          <TableCell align="center">
                            {eachItem.percentage !== null ? eachItem.percentage + "%" : null}
                          </TableCell>
                          <TableCell>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginLeft: 50,
                              }}
                            >
                              <img
                                onClick={() =>
                                  this.props.history.push(
                                    callSummaryLayoutPath +
                                      eachItem.studentId +
                                      "/product/" +
                                      this.props.productId
                                  )
                                }
                                src={Call}
                                style={{
                                  height: 30,
                                  width: 30,
                                  marginRight: 10,
                                }}
                              />
                              <PrimaryButton
                                onClick={() =>
                                  this.props.history.push(
                                    stagedTabsPath + eachItem.studentId
                                  )
                                }
                                variant={"contained"}
                                color={"primary"}
                                size={"small"}
                                style={{ textTransform: "none" }}
                              >
                                Manage
                              </PrimaryButton>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <ThemeProvider theme={theme}>
          <Drawer
            anchor={"right"}
            color="white"
            open={this.state.draweropen}
            onClose={() => this.setState({ draweropen: false })}
          >
            <div>
              <List>
                <ListItem>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Typography>Filter</Typography>
                    <IconButton
                      style={{ marginLeft: "230px", marginTop: "-10px" }}
                      onClick={() => this.setState({ draweropen: false })}
                    >
                      <CloseIcon style={{ color: "#1093FF" }} />
                    </IconButton>
                  </div>
                </ListItem>
                <ListItem>
                  {/* <TextField
                label = "College"
                variant="outlined"
                /> */}
                  <Autocomplete
                    popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                    id="combo-box-demo"
                    options={this.props.getCollegesList}
                    getOptionLabel={(option) => option.name}
                    value={this.state.college}
                    style={{ width: 300 }}
                    onChange={(e, value) => this.setState({ college: value })}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="College"
                        variant="outlined"
                      />
                    )}
                  />
                </ListItem>
                <ListItem>
                  {/* <TextField
                label = "Department"
                variant="outlined"
                /> */}
                  <Autocomplete
                    popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                    id="combo-box-demo"
                    options={this.props.getBranchesList}
                    getOptionLabel={(option) => option.name}
                    onChange={(e,value)=>this.setState({department : value})}
                   value={this.state.department}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Department"
                        variant="outlined"
                      />
                    )}
                  />
                </ListItem>
                <ListItem>
                  {/* <TextField
                label = "Intake"
                variant="outlined"
                /> */}
                  <Autocomplete
                    popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                    id="combo-box-demo"
                    options={this.props.getAspTermsList}
                    getOptionLabel={(option) => option.name}
                    onChange={(e,value)=>this.setState({intake : value})}
                   value={this.state.intake}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Intake"
                        variant="outlined"
                      />
                    )}
                  />
                </ListItem>
                <ListItem>
                  <Autocomplete
                    popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                    id="combo-box-demo"
                    options={this.props.cityList}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    value={this.state.city}
                    onChange={(e,value)=>this.setState({city : value})}
                    renderInput={(params) => (
                      <TextField {...params} label="City" variant="outlined" />
                    )}
                  />
                </ListItem>
                <ListItem>
                  <Autocomplete
                    popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                    id="combo-box-demo"
                    options={this.props.adminUserList}
                    onChange={(e, value) => this.setState({ bda: value })}
                    value={this.state.bda}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="BDA Name"
                        variant="outlined"
                      />
                    )}
                  />
                </ListItem>
                <ListItem>
                  <PrimaryButton
                    color={"primary"}
                    variant={"contained"}
                    onClick={this.applyFilter}
                    style={{ textTransform: "none", width: "300px" }}
                  >
                    Apply Filter
                  </PrimaryButton>
                </ListItem>
                <ListItem>
                  <PrimaryButton
                    color={"primary"}
                    variant={"outlined"}
                    onClick={this.handleReset}
                    style={{ textTransform: "none", width: "300px" }}
                  >
                    Reset Filter
                  </PrimaryButton>
                </ListItem>
              </List>
            </div>
          </Drawer>
        </ThemeProvider>
      </div>
    );
  }
  title;
}
const style = {
  HeadStyle: {
    fontStyle: "Poppins",
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: "18px",
    color: "#052A4E",
    // padding:15
  },
  HeadDisplay: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 20,
  },
};

const mapStateToProps = (state) => {
  return {
    studentsByStagesList: state.AdminReducer.studentsByStagesList,
    getBranchesList: state.CollegeReducer.BranchList,
    getCollegesList: state.CollegeReducer.allCollegeList,
    getAspTermsList: state.AspirationReducer.allTermList,
    cityList: state.StudentReducer.cityList,
    adminUserList: state.AdminReducer.adminUserList,
    filteredStageBasedUsers: state.StudentReducer.filteredStageBasedUsers,
    // getsearchlistresponse : state.CallReducer.getsearchlist
  };
};

export default connect(mapStateToProps, {
  getStudentByStages,
  getBranches,
  getAllTerms,
  getAllColleges,
  viewAllCities,
  getAllAdminUsers,
  filterStageBaseUsers,
})(Onboarding);
