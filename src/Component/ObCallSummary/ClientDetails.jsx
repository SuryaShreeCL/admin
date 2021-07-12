import {
  Grid,
  TextField,
  Typography,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getBranches, getDegree, getAllColleges } from "../../Actions/College";
import {
  getAllProductFamily,
  getProductByFamilyId,
} from "../../Actions/ProductAction";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { ExpandMore} from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const theme = createMuiTheme({
  overrides: {
    MuiSvgIcon: {
      root: {
        260: {
          color: "#1093FF",
        },
      },
    },
  },
});
class ClientDetails extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      number: "",
      email: "",
      clsid: "",
      ugdegree: "",
      collegename: "",
      department: "",
      sem: "",
      activebacklogs: "",
      cgpa: "",
      family: "",
      varient: "",
      intake: "",
      year: "",
      validity: "",
      endofservice: null,
      pricing: "",
      ameyoid: "",
      calldate: null,
      calltime: null,
      agent: "",
      callstatus: "",
      callbacktime: null,
      spedays: "",
      spetime: "",
      enrolldate: null,
      appdegree: "",
      order: "",
      countries: "",
      package: "",
      workexp: "",
      exptype: "",
      expfield: "",
      expmonth: "",
    };
  }
  componentDidMount() {
    this.props.getBranches();
    this.props.getDegree();
    this.props.getAllColleges();
    this.props.getAllProductFamily();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.family !== prevState.family) {
      this.props.getProductByFamilyId(
        this.state.family !== null ? this.state.family.id : ""
      );
    }
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <ThemeProvider theme={this.theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Typography style={{ fontWeight: "600", color: "#407BFF" }}>
                  Students Details
                </Typography>
              </Grid>
              <Grid item md={3}>
                <TextField
                  label="Client Name"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  label="Contact Number"
                  value={this.state.number}
                  onChange={(e) => this.setState({ number: e.target.value })}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  label="Email Address"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  disabled
                  label="CLS ID"
                  value={this.state.clsid}
                  onChange={(e) => this.setState({ clsid: e.target.value })}
                />
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                 popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                  id="combo-box-demo"
                  options={this.props.getDegreeList}
                  getOptionLabel={(option) => option.name}
                  //   style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="UG Degree"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                 popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                  id="combo-box-demo"
                  options={this.props.getCollegesList}
                  getOptionLabel={(option) => option.name}
                  //   style={{ width: 300 }}
                  value={this.state.collegename}
                  onChange={(e, newValue) =>
                    this.setState({ collegename: newValue })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="College Name"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                 popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                  id="combo-box-demo"
                  options={this.props.getBranchesList}
                  getOptionLabel={(option) => option.name}
                  //   style={{ width: 300 }}
                  value={this.state.department}
                  onChange={(e, newValue) =>
                    this.setState({ department: newValue })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Department"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  label="Present Semester"
                  value={this.state.sem}
                  onChange={(e) => this.setState({ sem: e.target.value })}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  label="Active Backlogs"
                  value={this.state.activebacklogs}
                  onChange={(e) =>
                    this.setState({ activebacklogs: e.target.value })
                  }
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  label="CGPA"
                  value={this.state.cgpa}
                  onChange={(e) => this.setState({ cgpa: e.target.value })}
                />
              </Grid>
              <Grid item md={6}></Grid>
              <Grid item md={12}>
                <Typography style={{ fontWeight: "600", color: "#407BFF" }}>
                  {" "}
                  Product Details
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                 popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                  id="combo-box-demo"
                  options={this.props.getAllProductFamilyList}
                  getOptionLabel={(option) => option.productName}
                  //   style={{ width: 300 }}
                  value={this.state.family}
                  onChange={(e, newValue) =>
                    this.setState({ family: newValue })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Product Family"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                 popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                  id="combo-box-demo"
                  options={this.props.getProductByFamilyIdList}
                  getOptionLabel={(option) => option.name}
                  //   style={{ width: 300 }}
                  value={this.state.family}
                  onChange={(e, newValue) =>
                    this.setState({ varient: newValue })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Product Varient"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  label="Intake"
                  value={this.state.intake}
                  onChange={(e) => this.setState({ intake: e.target.value })}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  type="number"
                  label="Year"
                  value={this.state.year}
                  onChange={(e) => this.setState({ year: e.target.value })}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  label="Product Validity"
                  value={this.state.validity}
                  onChange={(e) => this.setState({ validity: e.target.value })}
                />
              </Grid>
              <Grid item md={4}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="End of Service Date"
                  format="MM/dd/yyyy"
                  value={this.state.endofservice}
                  onChange={(e, newValue) =>
                    this.setState({ endofservice: newValue })
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  type="number"
                  label="Pricing"
                  value={this.state.pricing}
                  onChange={(e) => this.setState({ pricing: e.target.value })}
                />
              </Grid>
              <Grid item md={12}>
                <Typography style={{ fontWeight: "600", color: "#407BFF" }}>
                  Call Details
                </Typography>
              </Grid>
              <Grid item md={3}>
                <TextField label="Ameyo ID" />
              </Grid>
              <Grid item md={3}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="OB Call Date"
                  format="MM/dd/yyyy"
                  value={this.state.calldate}
                  onChange={(e, newValue) =>
                    this.setState({ calldate: newValue })
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
              <Grid item md={3}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="OB Call Time"
                  value={this.state.calltime}
                  onChange={(e, newValue) =>
                    this.setState({ calltime: newValue })
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  label="Onboarding Agent"
                  value={this.state.agent}
                  onChange={(e) => this.setState({ agent: e.target.value })}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  label="Call Status"
                  value={this.state.callstatus}
                  onChange={(e) =>
                    this.setState({ callstatus: e.target.value })
                  }
                />
              </Grid>
              <Grid item md={4}>
                <KeyboardDateTimePicker
                  variant="inline"
                  ampm={false}
                  label="Call Back Time"
                  value={this.state.callbacktime}
                  onChange={(e, newValue) =>
                    this.setState({ callbacktime: newValue })
                  }
                  onError={console.log}
                  // disablePast
                  format="yyyy/MM/dd HH:mm"
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  label="Specific Days to be contacted ?"
                  value={this.state.spedays}
                  onChange={(e) => this.setState({ spedays: e.target.value })}
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  label="Special Time to be Contacted ?"
                  value={this.state.spetime}
                  onChange={(e) => this.setState({ spetime: e.target.value })}
                />
              </Grid>
              <Grid item md={12}>
                <Typography style={{ fontWeight: "600", color: "#407BFF" }}>
                  Client Service Details
                </Typography>
              </Grid>
              <Grid item md={3}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Enrolment Date"
                  format="MM/dd/yyyy"
                  value={this.state.enrolldate}
                  onChange={(e, newValue) =>
                    this.setState({ enrolldate: newValue })
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
              <Grid item md={3}>
                {/* <TextField label="Applying Degree" /> */}
                <Autocomplete
                 popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                  id="combo-box-demo"
                  options={this.props.getAllProductFamilyList}
                  getOptionLabel={(option) => option.productName}
                  value={this.state.appdegree}
                  onChange={(e, newValue) =>
                    this.setState({ appdegree: newValue })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Applying Degree"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                {/* <TextField type="number" label="Intake Year" /> */}
                <Autocomplete
                 popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                  id="combo-box-demo"
                  options={this.props.getAllProductFamilyList}
                  getOptionLabel={(option) => option.productName}
                  // value={this.state.}
                  // onChange={(e,newValue)=>this.setState({ callbacktime : newValue})}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Intake Year"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                 popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                  id="combo-box-demo"
                  options={this.props.getAllProductFamilyList}
                  getOptionLabel={(option) => option.productName}
                  //   style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Intake Term"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                {/* <TextField label="Order Type" /> */}
                <Autocomplete
                 popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                  id="combo-box-demo"
                  options={this.props.getAllProductFamilyList}
                  getOptionLabel={(option) => option.productName}
                  value={this.state.order}
                  onChange={(e, newValue) => this.setState({ order: newValue })}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Order Type"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item md={6}>
                <Autocomplete
                 popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                  id="combo-box-demo"
                  options={this.props.getAllProductFamilyList}
                  getOptionLabel={(option) => option.productName}
                  value={this.state.countries}
                  onChange={(e, newValue) =>
                    this.setState({ countries: newValue })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Preferred Countries"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  label="Package"
                  value={this.state.package}
                  onChange={(e) => this.setState({ package: e.target.value })}
                />
              </Grid>
              <Grid item md={12}>
                <Typography style={{ fontWeight: "600", color: "#407BFF" }}>
                  Client's Educational Details
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                 popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                  id="combo-box-demo"
                  options={this.props.getDegreeList}
                  getOptionLabel={(option) => option.name}
                  // value={this.state.callbacktime}
                  // onChange={(e,newValue)=>this.setState({ callbacktime : newValue})}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="UG Degree"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                 popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                  id="combo-box-demo"
                  options={this.props.getCollegesList}
                  getOptionLabel={(option) => option.name}
                  //   style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="College Name"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                 popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                  id="combo-box-demo"
                  options={this.props.getBranchesList}
                  getOptionLabel={(option) => option.name}
                  //   style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Department"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <TextField label="Present Semester" />
              </Grid>
              <Grid item md={3}>
                <TextField label="CGPA" />
              </Grid>
              <Grid item md={3}>
                <TextField label="Backlogs" />
              </Grid>
              <Grid item md={12}>
                <Typography style={{ fontWeight: "600", color: "#407BFF" }}>
                  Client's Work Experience Background
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                  id="combo-box-demo"
                  popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                  options={this.props.getAllProductFamilyList}
                  getOptionLabel={(option) => option.productName}
                  value={this.state.workexp}
                  onChange={(e, newValue) =>
                    this.setState({ workexp: newValue })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Any Work Exps ?"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item md={5}>
                {/* <TextField fullWidth label="If yes, then type of Experience?" /> */}
                <Autocomplete
                  id="combo-box-demo"
                  popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                  options={this.props.getAllProductFamilyList}
                  getOptionLabel={(option) => option.productName}
                  value={this.state.exptype}
                  onChange={(e, newValue) =>
                    this.setState({ exptype: newValue })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="If yes, then type of Experience?"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  fullWidth
                  label="Field of Expertise"
                  value={this.state.expfield}
                  onChange={(e) => this.setState({ expfield: e.target.value })}
                />
              </Grid>
              <Grid item md={5}>
                <TextField
                  label="Work Experience(in Months)"
                  value={this.state.expmonth}
                  onChange={(e) => this.setState({ expmonth: e.target.value })}
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    getBranchesList: state.CollegeReducer.BranchList,
    getCollegesList: state.CollegeReducer.allCollegeList,
    getDegreeList: state.CollegeReducer.Degree,
    getProductByFamilyIdList: state.ProductReducer.getProductByFamilyId,
    getAllProductFamilyList: state.ProductReducer.getAllProductFamily,
  };
};

export default connect(mapStateToProps, {
  getBranches,
  getDegree,
  getAllColleges,
  getProductByFamilyId,
  getAllProductFamily,
})(ClientDetails);
