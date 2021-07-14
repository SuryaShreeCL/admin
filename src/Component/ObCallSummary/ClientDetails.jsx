import {
  Grid,
  TextField,
  Typography,
  ThemeProvider,
  createMuiTheme,
  Button
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getBranches, getDegree, getAllColleges } from "../../Actions/College";
import {
  getAllProductFamily,
  getProductByFamilyId,
} from "../../Actions/ProductAction";
import {getAllDegree,getAllTerms,viewCountry,getallcountry} from '../../Actions/Aspiration'
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
import { ExpandMore } from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { isEmptyString } from "../Validation";

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      root: {
          whiteSpace : "nowrap",
          fontSize: "inherit",
      },
    },
    MuiFormControl : {
      marginNormal : {
          marginTop : "0px",
          marginBottom : "0px"
      }
    },
    
  },
});
class ClientDetails extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      nameErr: "",
      number: "",
      numberErr: "",
      email: "",
      emailErr: "",
      clsid: "",
      ugdegree: "",
      ugdegreeErr: "",
      collegename: "",
      collegeErr: "",
      department: "",
      departmentErr: "",
      sem: "",
      semErr: "",
      activebacklogs: "",
      activebacklogsErr: "",
      cgpa: "",
      cgpaErr: "",
      family: "",
      familyErr: "",
      varient: "",
      varientErr: "",
      intake: "",
      intakeErr: "",
      year: "",
      yearErr: "",
      validity: "",
      validityErr: "",
      endofservice: null,
      endofserviceErr: "",
      pricing: "",
      pricingErr: "",
      ameyoid: "",
      ameyoidErr: "",
      calldate: null,
      calldateErr: "",
      calltime: null,
      calltimeErr: "",
      agent: "",
      agentErr: "",
      callstatus: "",
      callstatusErr: "",
      callbacktime: new Date(),
      callbacktimeErr: "",
      spedays: "",
      speDaysErr: "",
      spetime: "",
      speErr: "",
      enrolldate: null,
      enrolldateErr: "",
      appdegree: "",
      appdegreeErr: "",
      order: "",
      orderErr: "",
      countries: "",
      countriesErr: "",
      package: "",
      packageErr: "",
      workexp: "",
      workexpErr: "",
      exptype: "",
      exptypeErr: "",
      expfield: "",
      expfieldErr: "",
      expmonth: "",
      expmonthErr: "",
      term : "",
      termErr:"",
      intakeyear:"",
      intakeyearErr:""
    };
  }
  componentDidMount() {
    this.props.getBranches();
    this.props.getDegree();
    this.props.getAllColleges();
    this.props.getAllProductFamily();
    this.props.getAllDegree();
    this.props.getAllTerms();
    this.props.getallcountry();
    // this.props.viewCountry();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.family !== prevState.family) {
      this.props.getProductByFamilyId(
        this.state.family !== null ? this.state.family.id : ""
      );
    }
  }
  // componentWillUnmount(){
  //   console.log(this.state)
  //   let hlptxt = "Please Fill the Required Field";
  //   isEmptyString(this.state.name)
  //     ? this.setState({ nameErr: hlptxt })
  //     : this.setState({ nameErr: "" });
  //   isEmptyString(this.state.number)
  //     ? this.setState({ numberErr: hlptxt })
  //     : this.setState({ numberErr: "" });
  //   isEmptyString(this.state.email)
  //     ? this.setState({ emailErr: hlptxt })
  //     : this.setState({ emailErr: "" });
  //   isEmptyString(this.state.ugdegree)
  //     ? this.setState({ ugdegreeErr: hlptxt })
  //     : this.setState({ ugdegreeErr: "" });
  //   isEmptyString(this.state.department)
  //     ? this.setState({ departmentErr: hlptxt })
  //     : this.setState({ departmentErr: "" });
  //   isEmptyString(this.state.collegename)
  //     ? this.setState({ collegeErr: hlptxt })
  //     : this.setState({ collegeErr: "" });
  //   isEmptyString(this.state.sem)
  //     ? this.setState({ semErr: hlptxt })
  //     : this.setState({ semErr: "" });
  //   isEmptyString(this.state.activebacklogs)
  //     ? this.setState({ activebacklogsErr: hlptxt })
  //     : this.setState({ activebacklogsErr: "" });
  //   isEmptyString(this.state.cgpa)
  //     ? this.setState({ cgpaErr: hlptxt })
  //     : this.setState({ cgpaErr: "" });
  //   isEmptyString(this.state.family)
  //     ? this.setState({ familyErr: hlptxt })
  //     : this.setState({ familyErr: "" });
  //   isEmptyString(this.state.varient)
  //     ? this.setState({ varientErr: hlptxt })
  //     : this.setState({ varientErr: "" });
  //   isEmptyString(this.state.intake)
  //     ? this.setState({ intakeErr: hlptxt })
  //     : this.setState({ intakeErr: "" });
  //   isEmptyString(this.state.year)
  //     ? this.setState({ yearErr: hlptxt })
  //     : this.setState({ yearErr: "" });
  //   isEmptyString(this.state.validity)
  //     ? this.setState({ validityErr: hlptxt })
  //     : this.setState({ validityErr: "" });
  //   this.state.endofservice === null
  //     ? this.setState({ endofserviceErr: hlptxt })
  //     : this.setState({ endofserviceErr: "" });
  //   isEmptyString(this.state.pricing)
  //     ? this.setState({ pricingErr: hlptxt })
  //     : this.setState({ pricingErr: "" });
  //   isEmptyString(this.state.ameyoid)
  //     ? this.setState({ ameyoidErr: hlptxt })
  //     : this.setState({ ameyoidErr: "" });
  //   this.state.calldate === null
  //     ? this.setState({ calldateErr: hlptxt })
  //     : this.setState({ calldateErr: "" });
  //   this.state.calltime === null
  //     ? this.setState({ calltimeErr: hlptxt })
  //     : this.setState({ calltimeErr: "" });
  //   isEmptyString(this.state.agent)
  //     ? this.setState({ agentErr: hlptxt })
  //     : this.setState({ agentErr: "" });
  //   isEmptyString(this.state.callstatus)
  //     ? this.setState({ callstatusErr: hlptxt })
  //     : this.setState({ callstatusErr: "" });
  //   this.state.callbacktime === null
  //     ? this.setState({ callbacktimeErr: hlptxt })
  //     : this.setState({ callbacktimeErr: "" });
  //   isEmptyString(this.state.spedays)
  //     ? this.setState({ speDaysErr: hlptxt })
  //     : this.setState({ speDaysErr: "" });
  //   isEmptyString(this.state.spetime)
  //     ? this.setState({ speErr: hlptxt })
  //     : this.setState({ speErr: "" });
  //   this.state.enrolldate === null
  //     ? this.setState({ enrolldateErr: hlptxt })
  //     : this.setState({ enrolldateErr: "" });
  //   isEmptyString(this.state.appdegree)
  //     ? this.setState({ appdegreeErr: hlptxt })
  //     : this.setState({ appdegreeErr: "" });
  //   isEmptyString(this.state.order)
  //     ? this.setState({ orderErr: hlptxt })
  //     : this.setState({ orderErr: "" });
  //   isEmptyString(this.state.countries)
  //     ? this.setState({ countriesErr: hlptxt })
  //     : this.setState({ countriesErr: "" });
  //   isEmptyString(this.state.package)
  //     ? this.setState({ packageErr: hlptxt })
  //     : this.setState({ packageErr: "" });
  //   isEmptyString(this.state.workexp)
  //     ? this.setState({ workexpErr: hlptxt })
  //     : this.setState({ workexpErr: "" });
  //   isEmptyString(this.state.exptype)
  //     ? this.setState({ exptypeErr: hlptxt })
  //     : this.setState({ exptypeErr: "" });
  //   isEmptyString(this.state.expfield)
  //     ? this.setState({ expfieldErr: hlptxt })
  //     : this.setState({ expfieldErr: "" });
  //   isEmptyString(this.state.expmonth)
  //     ? this.setState({ expmonthErr: hlptxt })
  //     : this.setState({ expmonthErr: "" });
  //     console.log(this.state)
  // }
  CallStatus = [
    {title : "Completed"},
    {title : "Pending"},
    {title : "DNP"},
    {title : "Reschedule"}
  ]
  Days = [
     {title : "Monday"},
     {title : "Tuesday"},
     {title : "Wednesday"},
     {title : "Thursday"},
     {title : "Friday"},
     {title : "Saturday"},
     {title : "Sunday"}
  ]
  Order=[
    {title : "Technical"},
    {title : "Managerial"},
    {title : "Techno-Managerial"},
    {title : "Custom"},
  ]
  Workexp = [
    {title : "Yes"},
    {title : "No"},
  ]
  ExpType = [
    {title : "Internship"},
    {title : "Fulltime"},
    {title : "Parttime"},
    {title : "Freelance"},
  ]
  handleSaved = () => {
    console.log(this.state)
    let hlptxt = "Please Fill the Required Field";
    isEmptyString(this.state.name)
      ? this.setState({ nameErr: hlptxt })
      : this.setState({ nameErr: "" });
    isEmptyString(this.state.number)
      ? this.setState({ numberErr: hlptxt })
      : this.setState({ numberErr: "" });
    isEmptyString(this.state.email)
      ? this.setState({ emailErr: hlptxt })
      : this.setState({ emailErr: "" });
    isEmptyString(this.state.ugdegree)
      ? this.setState({ ugdegreeErr: hlptxt })
      : this.setState({ ugdegreeErr: "" });
    isEmptyString(this.state.department)
      ? this.setState({ departmentErr: hlptxt })
      : this.setState({ departmentErr: "" });
    isEmptyString(this.state.collegename)
      ? this.setState({ collegeErr: hlptxt })
      : this.setState({ collegeErr: "" });
    isEmptyString(this.state.sem)
      ? this.setState({ semErr: hlptxt })
      : this.setState({ semErr: "" });
    isEmptyString(this.state.activebacklogs)
      ? this.setState({ activebacklogsErr: hlptxt })
      : this.setState({ activebacklogsErr: "" });
    isEmptyString(this.state.cgpa)
      ? this.setState({ cgpaErr: hlptxt })
      : this.setState({ cgpaErr: "" });
    isEmptyString(this.state.family)
      ? this.setState({ familyErr: hlptxt })
      : this.setState({ familyErr: "" });
    isEmptyString(this.state.varient)
      ? this.setState({ varientErr: hlptxt })
      : this.setState({ varientErr: "" });
    isEmptyString(this.state.intake)
      ? this.setState({ intakeErr: hlptxt })
      : this.setState({ intakeErr: "" });
    isEmptyString(this.state.year)
      ? this.setState({ yearErr: hlptxt })
      : this.setState({ yearErr: "" });
    isEmptyString(this.state.validity)
      ? this.setState({ validityErr: hlptxt })
      : this.setState({ validityErr: "" });
    this.state.endofservice === null
      ? this.setState({ endofserviceErr: hlptxt })
      : this.setState({ endofserviceErr: "" });
    isEmptyString(this.state.pricing)
      ? this.setState({ pricingErr: hlptxt })
      : this.setState({ pricingErr: "" });
    isEmptyString(this.state.ameyoid)
      ? this.setState({ ameyoidErr: hlptxt })
      : this.setState({ ameyoidErr: "" });
    this.state.calldate === null
      ? this.setState({ calldateErr: hlptxt })
      : this.setState({ calldateErr: "" });
    this.state.calltime === null
      ? this.setState({ calltimeErr: hlptxt })
      : this.setState({ calltimeErr: "" });
    isEmptyString(this.state.agent)
      ? this.setState({ agentErr: hlptxt })
      : this.setState({ agentErr: "" });
    isEmptyString(this.state.callstatus)
      ? this.setState({ callstatusErr: hlptxt })
      : this.setState({ callstatusErr: "" });
    this.state.callbacktime === null
      ? this.setState({ callbacktimeErr: hlptxt })
      : this.setState({ callbacktimeErr: "" });
    isEmptyString(this.state.spedays)
      ? this.setState({ speDaysErr: hlptxt })
      : this.setState({ speDaysErr: "" });
    isEmptyString(this.state.spetime)
      ? this.setState({ speErr: hlptxt })
      : this.setState({ speErr: "" });
    this.state.enrolldate === null
      ? this.setState({ enrolldateErr: hlptxt })
      : this.setState({ enrolldateErr: "" });
    isEmptyString(this.state.appdegree)
      ? this.setState({ appdegreeErr: hlptxt })
      : this.setState({ appdegreeErr: "" });
    isEmptyString(this.state.order)
      ? this.setState({ orderErr: hlptxt })
      : this.setState({ orderErr: "" });
    isEmptyString(this.state.countries)
      ? this.setState({ countriesErr: hlptxt })
      : this.setState({ countriesErr: "" });
    isEmptyString(this.state.package)
      ? this.setState({ packageErr: hlptxt })
      : this.setState({ packageErr: "" });
    isEmptyString(this.state.workexp)
      ? this.setState({ workexpErr: hlptxt })
      : this.setState({ workexpErr: "" });
    isEmptyString(this.state.exptype)
      ? this.setState({ exptypeErr: hlptxt })
      : this.setState({ exptypeErr: "" });
    isEmptyString(this.state.expfield)
      ? this.setState({ expfieldErr: hlptxt })
      : this.setState({ expfieldErr: "" });
    isEmptyString(this.state.expmonth)
      ? this.setState({ expmonthErr: hlptxt })
      : this.setState({ expmonthErr: "" });
      isEmptyString(this.state.term)
      ? this.setState({ termErr: hlptxt })
      : this.setState({ termErr: "" });
      isEmptyString(this.state.intakeyear)
      ? this.setState({ intakeyearErr: hlptxt })
      : this.setState({ intakeyearErr: "" });
      console.log(this.state)
  };

  render() {
    console.log(this.state);
    console.log(this.props)
    return (
      <div>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item md={12}>
                <Typography
                  style={{
                    fontWeight: "600",
                    color: "#407BFF",
                    // fontFamily: "Montserrat",
                    // fontSize: "18px",
                    // fontStyle: "normal",
                    // lineHeight: "22px",
                    // letter-spacing: 0em;
                    // text-align: left
                  }}
                >
                  Students Details
                </Typography>
              </Grid>
              <Grid item md={3}>
                <TextField
                  label="Client Name"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  error={this.state.nameErr.length > 0}
                  helperText={this.state.nameErr}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  disabled
                  label="Contact Number"
                  value={this.state.number}
                  onChange={(e) => this.setState({ number: e.target.value })}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                disabled
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
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getDegreeList}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="UG Degree"
                      variant="standard"
                      error={this.state.ugdegreeErr.length > 0}
                      helperText={this.state.ugdegreeErr}
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getCollegesList}
                  getOptionLabel={(option) => option.name}
                  value={this.state.collegename}
                  onChange={(e, newValue) =>
                    this.setState({ collegename: newValue })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="College Name"
                      variant="standard"
                      error={this.state.collegeErr.length > 0}
                      helperText={this.state.collegeErr}
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getBranchesList}
                  getOptionLabel={(option) => option.name}
                  value={this.state.department}
                  onChange={(e, newValue) =>
                    this.setState({ department: newValue })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Department"
                      variant="standard"
                      error={this.state.departmentErr.length > 0}
                      helperText={this.state.departmentErr}
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  type="number"
                  label="Present Semester"
                  value={this.state.sem}
                  onChange={(e) => this.setState({ sem: e.target.value })}
                  error={this.state.semErr.length > 0}
                  helperText={this.state.semErr}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  label="Active Backlogs"
                  type="number"
                  value={this.state.activebacklogs}
                  onChange={(e) =>
                    this.setState({ activebacklogs: e.target.value })
                  }
                  error={this.state.activebacklogsErr.length > 0}
                  helperText={this.state.activebacklogsErr}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  label="CGPA"
                  type="number"
                  value={this.state.cgpa}
                  onChange={(e) => this.setState({ cgpa: e.target.value })}
                  error={this.state.cgpaErr.length > 0}
                  helperText={this.state.cgpaErr}
                />
              </Grid>
              <Grid item md={6}></Grid>
              <Grid item md={12}>
                <Typography
                  style={{
                    fontWeight: "600",
                    color: "#407BFF",
                    // fontFamily: "Montserrat",
                    // fontSize: "18px",
                    // fontStyle: "normal",
                    // lineHeight: "22px",
                  }}
                >
                  {" "}
                  Product Details
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                disabled
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getAllProductFamilyList}
                  getOptionLabel={(option) => option.productName}
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
                disabled
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getProductByFamilyIdList}
                  getOptionLabel={(option) => option.name}
                  value={this.state.varient}
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
                  disabled
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  type="number"
                  label="Year"
                  value={this.state.year}
                  onChange={(e) => this.setState({ year: e.target.value })}
                  disabled
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  label="Product Validity"
                  value={this.state.validity}
                  onChange={(e) => this.setState({ validity: e.target.value })}
                  disabled
                />
              </Grid>
              <Grid item md={4}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="End of Service Date"
                  format="MM/dd/yyyy"
                  value={this.state.endofservice}
                  disabled
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
                  disabled
                />
              </Grid>
              <Grid item md={12}>
                <Typography
                  style={{
                    fontWeight: "600",
                    color: "#407BFF",
                    // fontFamily: "Montserrat",
                    // fontSize: "18px",
                    // fontStyle: "normal",
                    // lineHeight: "22px",
                  }}
                >
                  Call Details
                </Typography>
              </Grid>
              <Grid item md={3}>
                <TextField label="Ameyo ID"
                 value={this.state.ameyoid}
                 onChange={(e)=>this.setState({ameyoid : e.target.value})}
                 error={this.state.ameyoidErr.length > 0}
                 helperText={this.state.ameyoidErr} />
              </Grid>
              <Grid item md={3}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="OB Call Date"
                  format="MM/dd/yyyy"
                  value={this.state.calldate}
                  error={this.state.calldateErr.length > 0}
                  helperText={this.state.calldateErr} 
                  onChange={(e, newValue) =>
                    this.setState({ calldate: newValue })
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
              <Grid item md={3}>
                <KeyboardDateTimePicker
                 ampm={false}
                variant="dialog"
                  margin="normal"
                  id="time-picker"
                  label="OB Call Time"
                  value={this.state.calltime}
                  error={this.state.calltimeErr.length > 0}
                  helperText={this.state.calltimeErr} 
                  onChange={(e, newValue) =>{
                    this.setState({ calltime: newValue });
                    console.log(this.state.calltime)
                  }
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
                  error={this.state.agentErr.length > 0}
                  helperText={this.state.agentErr} 
                />
              </Grid>
              <Grid item md={4}>
                 <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.CallStatus}
                  getOptionLabel={(option) => option.title}
                  //   style={{ width: 300 }}
                  value={this.state.callstatus}
                  onChange={(e, newValue) =>
                    this.setState({ callstatus: newValue })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Call Status"
                      variant="standard"
                      error={this.state.callstatusErr.length > 0}
                  helperText={this.state.callstatusErr} 
                    />
                  )}
                />
              </Grid>
              <Grid item md={4}>
                <KeyboardDateTimePicker
                  variant="inline"
                  ampm={false}
                  label="Call Back Time"
                  value={this.state.callbacktime}
                  error={this.state.callbacktimeErr.length > 0}
                  helperText={this.state.callbacktimeErr} 
                  onChange={(e, newValue) =>
                    this.setState({ callbacktime: newValue })
                  }
                  onError={console.log}
                  // disablePast
                  format="yyyy/MM/dd HH:mm"
                />
              </Grid>
              <Grid item md={4}>
                {/* <TextField
                  label="Specific Days to be contacted?"
                  value={this.state.spedays}
                  onChange={(e) => this.setState({ spedays: e.target.value })}
                /> */}
                <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.Days}
                  getOptionLabel={(option) => option.title}
                  //   style={{ width: 300 }}
                  value={this.state.spedays}
                  onChange={(e,newValue) => this.setState({ spedays: newValue })}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Specific Days to be contacted?"
                      variant="standard"
                      error={this.state.speDaysErr.length > 0}
                      helperText={this.state.speDaysErr} 
                    />
                  )}
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  label="Specific Time to be Contacted?"
                  value={this.state.spetime}
                  onChange={(e) => this.setState({ spetime: e.target.value })}
                  error={this.state.speErr.length > 0}
                  helperText={this.state.speErr} 
                />
              </Grid>
              <Grid item md={12}>
                <Typography
                  style={{
                    fontWeight: "600",
                    color: "#407BFF",
                    // fontFamily: "Montserrat",
                    // fontSize: "18px",
                    // fontStyle: "normal",
                    // lineHeight: "22px",
                  }}
                >
                  Client Service Details
                </Typography>
              </Grid>
              <Grid item md={3}>
                <KeyboardDatePicker
                  margin="normal"
                  disableFuture
                  id="date-picker-dialog"
                  label="Enrolment Date"
                  format="MM/dd/yyyy"
                  value={this.state.enrolldate}
                  error={this.state.enrolldateErr.length > 0}
                  helperText={this.state.enrolldateErr} 
                  onChange={(e, newValue) =>
                    this.setState({ enrolldate: newValue })
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getAspDegreeList}
                  getOptionLabel={(option) => option.name}
                  value={this.state.appdegree}
                  onChange={(e, newValue) =>
                    this.setState({ appdegree: newValue })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Applying Degree"
                      variant="standard"
                      error={this.state.appdegreeErr.length > 0}
                      helperText={this.state.appdegreeErr} 
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getAllProductFamilyList}
                  getOptionLabel={(option) => option.productName}
                  value={this.state.intakeyear}
                  onChange={(e,newValue)=>this.setState({ intakeyear : newValue})}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Intake Year"
                      variant="standard"
                      error={this.state.intakeyearErr.length > 0}
                      helperText={this.state.intakeyearErr}
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getAspTermsList}
                  getOptionLabel={(option) => option.name}
                  value={this.state.term}
                  onChange={(e,newValue)=>this.setState({ term : newValue})}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Intake Term"
                      variant="standard"
                      error={this.state.termErr.length > 0}
                      helperText={this.state.termErr}
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.Order}
                  getOptionLabel={(option) => option.title}
                  value={this.state.order}
                  onChange={(e, newValue) => this.setState({ order: newValue })}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Order Type"
                      variant="standard"
                      error={this.state.orderErr.length > 0}
                  helperText={this.state.orderErr} 
                    />
                  )}
                />
              </Grid>
              <Grid item md={6}>
                <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getallcountryList}
                  getOptionLabel={(option) => option.name}
                  value={this.state.countries}
                  onChange={(e, newValue) =>
                    this.setState({ countries: newValue })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Preferred Countries"
                      variant="standard"
                      error={this.state.countriesErr.length > 0}
                      helperText={this.state.countriesErr} 
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  label="Package"
                  value={this.state.package}
                  onChange={(e) => this.setState({ package: e.target.value })}
                  error={this.state.packageErr.length > 0}
                  helperText={this.state.packageErr} 
                />
              </Grid>
              <Grid item md={12}>
                <Typography
                  style={{
                    fontWeight: "600",
                    color: "#407BFF",
                    // fontFamily: "Montserrat",
                    // fontSize: "18px",
                    // fontStyle: "normal",
                    // lineHeight: "22px",
                  }}
                >
                  Client's Educational Background
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getDegreeList}
                  getOptionLabel={(option) => option.name}
                  value={this.state.ugdegree}
                  onChange={(e,newValue)=>this.setState({ ugdegree : newValue})}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="UG Degree"
                      variant="standard"
                      error={this.state.ugdegreeErr.length > 0}
                      helperText={this.state.ugdegreeErr}
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getCollegesList}
                  getOptionLabel={(option) => option.name}
                  value={this.state.collegename}
                  onChange={(e,newValue)=>this.setState({collegename : newValue})}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="College Name"
                      variant="standard"
                      error={this.state.collegeErr.length > 0}
                      helperText={this.state.collegeErr}
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getBranchesList}
                  getOptionLabel={(option) => option.name}
                  value={this.state.department}
                  onChange={(e,newValue)=>this.setState({department : newValue})}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Department"
                      variant="standard"
                      error={this.state.departmentErr.length > 0}
                      helperText={this.state.departmentErr}
                    />
                  )}
                />
              </Grid>
              <Grid item md={3}>
              <TextField
                label="Present Semester"
                type="number"
                value={this.state.sem}
                onChange={(e) => this.setState({ sem: e.target.value })}
                error={this.state.semErr.length > 0}
                helperText={this.state.semErr}
                    />
              </Grid>
              <Grid item md={3}>
                <TextField label="CGPA" 
                  type="number"
                  value={this.state.cgpa}
                  onChange={(e) => this.setState({ cgpa: e.target.value })}
                  error={this.state.cgpaErr.length > 0}
                  helperText={this.state.cgpaErr}/>
              </Grid>
              <Grid item md={3}>
                <TextField label="Backlogs"
                  type="number"
                  value={this.state.activebacklogs}
                  onChange={(e) => this.setState({ activebacklogs: e.target.value })}
                  error={this.state.activebacklogsErr.length > 0}
                  helperText={this.state.activebacklogsErr}/>
              </Grid>
              <Grid item md={12}>
                <Typography
                  style={{
                    fontWeight: "600",
                    color: "#407BFF",
                    // fontFamily: "Montserrat",
                    // fontSize: "18px",
                    // fontStyle: "normal",
                    // lineHeight: "22px",
                  }}
                >
                  Client's Work Experience Background
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                  id="combo-box-demo"
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  options={this.Workexp}
                  getOptionLabel={(option) => option.title}
                  value={this.state.workexp}                 
                  onChange={(e, newValue) =>
                    this.setState({ workexp: newValue })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Any Work Exps ?"
                      variant="standard"
                      error={this.state.workexpErr.length > 0}
                      helperText={this.state.workexpErr} 
                    />
                  )}
                />
              </Grid>
              <Grid item md={5}>
                <Autocomplete
                  id="combo-box-demo"
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  options={this.ExpType}
                  getOptionLabel={(option) => option.title}
                  value={this.state.exptype}
                  onChange={(e, newValue) =>
                    this.setState({ exptype: newValue })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="If yes, then type of Experience?"
                      variant="standard"
                      error={this.state.exptypeErr.length > 0}
                      helperText={this.state.exptypeErr} 
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
                  error={this.state.expfieldErr.length > 0}
                  helperText={this.state.expfieldErr} 
                />
              </Grid>
              <Grid item md={5}>
                <TextField
                  label="Work Experience(in Months)"
                  value={this.state.expmonth}
                  onChange={(e) => this.setState({ expmonth: e.target.value })}
                  error={this.state.expmonthErr.length > 0}
                  helperText={this.state.expmonthErr} 
                />
              </Grid>
              <Grid item md={12}>
                {/* <Button onClick={()=>this.handleSaved()}>Save</Button> */}
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
    getAspDegreeList : state.AspirationReducer.allDegreeList,
    getAspTermsList :state.AspirationReducer.allTermList,
    getcountrylist : state.AspirationReducer.viewCountryList,
    getallcountryList : state.AspirationReducer.getallcountry
  };
};

export default connect(mapStateToProps, {
  getBranches,
  getDegree,
  getAllColleges,
  getProductByFamilyId,
  getAllProductFamily,
  getAllDegree,
  getAllTerms,
  viewCountry,
  getallcountry
})(ClientDetails);
