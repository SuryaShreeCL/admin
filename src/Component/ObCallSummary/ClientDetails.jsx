import DateFnsUtils from "@date-io/date-fns";
import {
  createMuiTheme,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import {
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getallcountry,
  getAllDegree,
  getAllTerms,
  viewCountry,
} from "../../Actions/Aspiration";
import {
  getClientInfo,
  getIntakeTerm,
  updateclientdetails,
} from "../../Actions/Calldetails";
import { getAllColleges, getBranches, getDegree } from "../../Actions/College";
import { storeItInState } from "../../Actions/HelperAction";
import {
  getAllProductFamily,
  getProductByFamilyId,
  getvarientByid,
} from "../../Actions/ProductAction";
import { getStudentsById } from "../../Actions/Student";
import PrimaryButton from "../../Utils/PrimaryButton";
import Mysnack from "../MySnackBar";
import { isEmptyString } from "../Validation";

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      root: {
        whiteSpace: "nowrap",
        fontSize: "inherit",
      },
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: "0px",
        marginBottom: "0px",
      },
    },
    MuiIconButton: {
      root: {
        color: "#1093FF",
      },
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
      spetime: null,
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
      term: "",
      termErr: "",
      intakeyear: "",
      intakeyearErr: "",
      snackmsg: "",
      snackvariant: "",
      snackopen: false,
      formSubmitted: false,
      intakeYear: [],
    };
  }
  componentDidMount() {
    this.props.getBranches();
    this.props.getAllColleges();
    this.props.getAllProductFamily();
    this.props.getAllDegree();
    // this.props.getAllTerms();
    this.props.getallcountry();
    this.props.getStudentsById(this.props.match.params.studentId);
    this.props.getvarientByid(this.props.match.params.productId);
    this.props.getIntakeTerm();
    this.props.getClientInfo(
      this.props.match.params.studentId,
      this.props.match.params.productId
    );
    for (let i = 0; i < 10; i++) {
      let arr = new Date().getFullYear() + i;
      this.state.intakeYear.push({ title: arr.toString() });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.family !== prevState.family) {
      this.props.getProductByFamilyId(
        this.state.family !== null ? this.state.family.id : ""
      );
    }
    if (this.props.getStudentsByIdList !== prevProps.getStudentsByIdList) {
      this.setState({
        name:
          this.props.getStudentsByIdList.firstName +
          this.props.getStudentsByIdList.lastName,
        number: this.props.getStudentsByIdList.phoneNumber,
        email: this.props.getStudentsByIdList.emailId,
        // sem: isEmptyString(this.state.sem) && this.props.getStudentsByIdList.currentSem,
        // department: this.props.getStudentsByIdList.department,
        // collegename: this.props.getStudentsByIdList.college,
        // ugdegree: this.props.getStudentsByIdList.ugDegree,
        // cgpa: isEmptyString(this.state.cgpa) && this.props.getStudentsByIdList.uggpa,
        // activebacklogs: isEmptyString(this.state.activebacklogs) && this.props.getStudentsByIdList.noOfBacklogs,
        clsid: this.props.getStudentsByIdList.studentID,
      });
    }
    if (this.props.getvarientByidList !== prevProps.getvarientByidList) {
      this.setState({
        intake: this.props.getvarientByidList.intake,
        year: this.props.getvarientByidList.year,
        validity: this.props.getvarientByidList.validity,
        family: this.props.getvarientByidList.productFamily,
        endofservice: this.props.getvarientByidList.endOfServiceDate,
        pricing: this.props.getvarientByidList.sellingPrice,
        varient: this.props.getvarientByidList,
      });
    }
    if (this.props.getClientInfoList !== prevProps.getClientInfoList) {
      const {
        college,
        degreeId,
        department,
        clientName,
        presentSem,
        activeBacklogs,
        cgpa,
        ameyoId,
        callBackTime,
        obCallDate,
        obCallTime,
        agent,
        callStatus,
        specificDays,
        specificTime,
        enrollmentDate,
        aspirationDegrees,
        aspirationCountries,
        aspirationTerms,
        year,
        orderType,
        packages,
        experience,
        typeOfExperience,
        fieldOfExperience,
        months,
        firstName,
        lastName,
      } = this.props.getClientInfoList;
      this.setState({
        // name: clientName,
        name: firstName + lastName,
        ugdegree: this.props.getClientInfoList.degree,
        collegename: college,
        department: department,
        sem: presentSem,
        activebacklogs: activeBacklogs,
        cgpa: cgpa,
        ameyoid: ameyoId,
        calldate: obCallDate,
        calltime: obCallTime,
        agent: agent,
        callstatus: { title: callStatus },
        callbacktime: new Date(callBackTime),
        spedays: { title: specificDays },
        spetime: specificTime,
        enrolldate: this.props.getClientInfoList.enrollmentDate,
        appdegree:
          aspirationDegrees && aspirationDegrees.length !== 0
            ? { ...aspirationDegrees[0] }
            : null,
        order: { title: orderType },
        countries:
          aspirationCountries && aspirationCountries.length !== 0
            ? { ...aspirationCountries[0] }
            : null,
        package: { name: packages },
        workexp: { title: experience },
        exptype: { title: typeOfExperience },
        expfield: fieldOfExperience,
        expmonth: months,
        term:
          aspirationTerms && aspirationTerms.length !== 0
            ? { ...aspirationTerms[0] }
            : null,
        intakeyear: year ? { title: year.toString() } : null,
        intake: aspirationTerms,
        term: { title: aspirationTerms },
        year: year,
      });
    }

    if (
      this.props.updateclientdetailsList !== prevProps.updateclientdetailsList
    ) {
      if (
        this.props.updateclientdetailsList === "updated" ||
        this.props.updateclientdetailsList === "created"
      ) {
        this.setState({
          formSubmitted: true,
          snackmsg: "Updated Successfully",
          snackvariant: "success",
          snackopen: true,
        });
      } else {
        this.setState({
          snackmsg: "Network Failed",
          snackvariant: "error",
          snackopen: true,
        });
      }
    }
  }
  intakeTermList = [
    { title: "Fall" },
    { title: "Summer" },
    { title: "Spring" },
  ];
  CallStatus = [
    { title: "Completed" },
    { title: "Pending" },
    { title: "DNP" },
    { title: "Reschedule" },
  ];
  Days = [{ title: "WeekEnd" }, { title: "WeekDays" }];
  Order = [
    { title: "Technical" },
    { title: "Managerial" },
    { title: "Techno-Managerial" },
    { title: "Custom" },
  ];
  emptype = [
    { title: "Full_time" },
    { title: "Part_time" },
    { title: "Self_Employed" },
    { title: "FreeLance" },
    { title: "Internship" },
    { title: "Trainee" },
  ];
  package = [{ name: "1" }, { name: "3" }, { name: "5" }];
  Workexp = [{ title: "Yes" }, { title: "No" }];

  ExpType = [
    { title: "Internship" },
    { title: "Fulltime" },
    { title: "Parttime" },
    { title: "Freelance" },
    { title: "SelfEmployed" },
    { title: "Trainee" },
  ];
  handleSaved = () => {
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

    this.state.endofservice === null
      ? this.setState({ endofserviceErr: hlptxt })
      : this.setState({ endofserviceErr: "" });
    isEmptyString(this.state.pricing)
      ? this.setState({ pricingErr: hlptxt })
      : this.setState({ pricingErr: "" });
    // isEmptyString(this.state.ameyoid)
    //   ? this.setState({ ameyoidErr: hlptxt })
    //   : this.setState({ ameyoidErr: "" });
    // this.state.calldate === null
    //   ? this.setState({ calldateErr: hlptxt })
    //   : this.setState({ calldateErr: "" });
    // this.state.calltime === null
    //   ? this.setState({ calltimeErr: hlptxt })
    //   : this.setState({ calltimeErr: "" });
    // isEmptyString(this.state.agent)
    //   ? this.setState({ agentErr: hlptxt })
    //   : this.setState({ agentErr: "" });
    // isEmptyString(this.state.callstatus)
    //   ? this.setState({ callstatusErr: hlptxt })
    //   : this.setState({ callstatusErr: "" });
    // this.state.callbacktime === null
    //   ? this.setState({ callbacktimeErr: hlptxt })
    //   : this.setState({ callbacktimeErr: "" });
    // (this.state.spedays && this.state.spedays.title === undefined) ||
    // isEmptyString(this.state.spedays)
    //   ? this.setState({ speDaysErr: hlptxt })
    //   : this.setState({ speDaysErr: "" });
    // this.state.spetime === null
    //   ? this.setState({ speErr: hlptxt })
    //   : this.setState({ speErr: "" });
    // this.state.enrolldate === "" || this.state.enrolldate === null
    //   ? this.setState({ enrolldateErr: hlptxt })
    //   : this.setState({ enrolldateErr: "" });
    // isEmptyString(this.state.appdegree)
    //   ? this.setState({ appdegreeErr: hlptxt })
    //   : this.setState({ appdegreeErr: "" });
    // (this.state.order && this.state.order.title === undefined) ||
    // isEmptyString(this.state.order)
    //   ? this.setState({ orderErr: hlptxt })
    //   : this.setState({ orderErr: "" });
    // isEmptyString(this.state.countries)
    //   ? this.setState({ countriesErr: hlptxt })
    //   : this.setState({ countriesErr: "" });
    // isEmptyString(this.state.package)
    //   ? this.setState({ packageErr: hlptxt })
    //   : this.setState({ packageErr: "" });
    isEmptyString(this.state.workexp)
      ? this.setState({ workexpErr: hlptxt })
      : this.setState({ workexpErr: "" });

    if (
      !isEmptyString(this.state.name) &&
      !isEmptyString(this.state.number) &&
      !isEmptyString(this.state.email) &&
      this.state.ugdegree !== null &&
      this.state.department !== null &&
      this.state.collegename !== null &&
      this.state.name !== null &&
      !isEmptyString(this.state.sem) &&
      !isEmptyString(this.state.activebacklogs) &&
      !isEmptyString(this.state.cgpa) &&
      // !isEmptyString(this.state.ameyoid) &&
      // this.state.calltime !== null &&
      // !isEmptyString(this.state.agent) &&
      // !isEmptyString(this.state.callstatus) &&
      // this.state.callbacktime !== null &&
      // !isEmptyString(this.state.spedays) &&
      // this.state.spetime !== null &&
      // this.state.enrolldate !== null &&
      // !isEmptyString(this.state.appdegree) &&
      // !isEmptyString(this.state.order) &&
      // !isEmptyString(this.state.countries) &&
      // !isEmptyString(this.state.package) &&
      !isEmptyString(this.state.workexp)
    ) {
      let obj = {
        ugDegree: {
          name:
            typeof this.state.ugdegree === "string"
              ? this.state.ugdegree
              : this.state.ugdegree?.name,
        },
        studentCollege: {
          name:
            typeof this.state.collegename === "string"
              ? this.state.collegename
              : this.state.collegename?.name,
        },
        studentDepartment: {
          name:
            typeof this.state.department === "string"
              ? this.state.department
              : this.state.department?.name,
        },
        studentCurrentSem: this.state.sem.toString(),
        studentCgpa: this.state.cgpa.toString(),
        ameyoId: this.state.ameyoid,
        // obCallDate: new Date(this.state.calldate),
        obCallTime: new Date(this.state.calltime),
        onBoardingAgent: this.state.agent,
        callStatus: this.state.callstatus?.title,
        callBackTime: new Date(this.state.callbacktime),
        weekDays: this.state.spedays?.title,
        specificTime: this.state.spetime,
        clientName: this.state.name,

        aspirationDegrees:
          window.sessionStorage.getItem("adminUserId") === "115" &&
          this.state.appdegree
            ? [
                {
                  id: this.state.appdegree?.id,
                },
              ]
            : [],
        aspirationCountries:
          window.sessionStorage.getItem("adminUserId") === "115" &&
          this.state.countries
            ? [
                {
                  id: this.state.countries?.id,
                },
              ]
            : [],
        term: this.state.term ? this.state.term.title : null,
        enrollmentDate: new Date(this.state.enrolldate),
        orderType:
          window.sessionStorage.getItem("adminUserId") === "115"
            ? this.state.order?.title
            : "",
        intakeYear: this.state.intakeyear ? this.state.intakeyear.title : null,
        // packages: typeof this.state.package ? this.state.package : this.state.package.name,  //Createable dropdown
        packages: this.state.package && this.state.package.name,
        workExperience: this.state.workexp?.title,
        typeOfExperience:
          this.state.exptype !== null ? this.state.exptype.title : null,
        fieldOfExpertise: this.state.expfield,
        experienceMonths: this.state.expmonth,
        degree: {
          name:
            typeof this.state.ugdegree === "string"
              ? this.state.ugdegree
              : this.state.ugdegree?.name,
        },
        department: {
          name:
            typeof this.state.department === "string"
              ? this.state.department
              : this.state.department?.name,
        },
        college: {
          name:
            typeof this.state.collegename === "string"
              ? this.state.collegename
              : this.state.collegename?.name,
        },
        presentSem: this.state.sem.toString(),
        backlogs: this.state.activebacklogs.toString(),
        activeBacklogs: this.state.activebacklogs.toString(),
        cgpa: this.state.cgpa.toString(),
      };

      this.props.updateclientdetails(
        this.props.match.params.studentId,
        this.props.match.params.productId,
        obj,
        (response) => {
          if (response.status === 200) {
            this.setState({
              formSubmitted: true,
              snackmsg: "Updated Successfully",
              snackvariant: "success",
              snackopen: true,
            });
          } else {
            this.setState({
              snackmsg: "Network Failed",
              snackvariant: "error",
              snackopen: true,
            });
          }
        }
      );
    }
  };

  render() {
    const filter = createFilterOptions();
    const productFamilyId = window.sessionStorage.getItem("adminUserId");

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
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      this.setState({
                        ugdegree: newValue,
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      this.setState({
                        ugdegree: newValue.inputValue,
                      });
                    } else {
                      this.setState({
                        ugdegree: newValue,
                      });
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    // Suggest the creation of a new value
                    if (params.inputValue !== "") {
                      filtered.push({
                        inputValue: params.inputValue,
                        name: `Add "${params.inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === "string") {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.name;
                  }}
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getDegreeList}
                  // getOptionLabel={(option) => option.name}
                  value={this.state.ugdegree}
                  // onChange={(e, newValue) =>
                  //   this.setState({ ugdegree: newValue })
                  // }
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
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      this.setState({
                        collegename: newValue,
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      this.setState({
                        collegename: newValue.inputValue,
                      });
                    } else {
                      this.setState({
                        collegename: newValue,
                      });
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    // Suggest the creation of a new value
                    if (params.inputValue !== "") {
                      filtered.push({
                        inputValue: params.inputValue,
                        name: `Add "${params.inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === "string") {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.name;
                  }}
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getCollegesList}
                  // getOptionLabel={(option) => option.name}
                  value={this.state.collegename}
                  // onChange={(e, newValue) =>
                  //   this.setState({ collegename: newValue })
                  // }
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
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      this.setState({
                        department: newValue,
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      this.setState({
                        department: newValue.inputValue,
                      });
                    } else {
                      this.setState({
                        department: newValue,
                      });
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    // Suggest the creation of a new value
                    if (params.inputValue !== "") {
                      filtered.push({
                        inputValue: params.inputValue,
                        name: `Add "${params.inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === "string") {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.name;
                  }}
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getBranchesList}
                  // getOptionLabel={(option) => option.name}
                  value={this.state.department}
                  // onChange={(e, newValue) =>
                  //   this.setState({ department: newValue })
                  // }
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
                  format="dd/MM/yyyy"
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
                  }}
                >
                  Call Details
                </Typography>
              </Grid>
              <Grid item md={4}>
                <TextField
                  label="AMEYO ID"
                  value={this.state.ameyoid}
                  onChange={(e) => this.setState({ ameyoid: e.target.value })}
                  error={this.state.ameyoidErr.length > 0}
                  helperText={this.state.ameyoidErr}
                />
              </Grid>
              <Grid item md={4}>
                <KeyboardDateTimePicker
                  ampm={false}
                  variant={"dialog"}
                  margin="normal"
                  // id="time-picker"
                  label="OB Call Time"
                  value={this.state.calltime}
                  error={this.state.calltimeErr.length > 0}
                  helperText={this.state.calltimeErr}
                  onChange={(newValue) => {
                    this.setState({ calltime: newValue });
                    //
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                  // format="dd/MM/yyyy HH:mm"
                />
              </Grid>
              <Grid item md={4}>
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
                  disabled={
                    this.state.callstatus !== null &&
                    ["Completed", "Pending"].indexOf(
                      this.state.callstatus.title
                    ) > -1
                  }
                  value={this.state.callbacktime}
                  error={this.state.callbacktimeErr.length > 0}
                  helperText={this.state.callbacktimeErr}
                  onChange={(e, newValue) =>
                    this.setState({ callbacktime: newValue })
                  }
                  onError={console.log}
                  // disablePast
                  format="dd/MM/yyyy HH:mm"
                />
              </Grid>
              <Grid item md={4}>
                <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.Days}
                  getOptionLabel={(option) => option.title}
                  //   style={{ width: 300 }}
                  value={this.state.spedays}
                  onChange={(e, newValue) =>
                    this.setState({ spedays: newValue })
                  }
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
                <KeyboardTimePicker
                  margin="normal"
                  // format="HH:mm"
                  label="Specific Time to be Contacted?"
                  value={this.state.spetime}
                  onChange={(newValue) => {
                    this.setState({ spetime: newValue });
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                  error={this.state.speErr.length > 0}
                  helperText={this.state.speErr}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item md={12}>
                <Typography
                  style={{
                    fontWeight: "600",
                    color: "#407BFF",
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
                  label="Enrollment Date"
                  format="dd/MM/yyyy"
                  value={this.state.enrolldate}
                  error={this.state.enrolldateErr.length > 0}
                  helperText={this.state.enrolldateErr}
                  onChange={(newValue) =>
                    this.setState({ enrolldate: newValue })
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
              {productFamilyId === "115" && (
                <Grid item md={3}>
                  <Autocomplete
                    popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                    id="combo-box-demo"
                    // options={this.props.getDegreeList}
                    // getOptionLabel={(option) => option.name}
                    options={this.props.getAspDegreeList}
                    getOptionLabel={(option) => option.name}
                    value={this.state.appdegree}
                    onChange={(e, newValue) => {
                      this.setState({ appdegree: newValue });
                    }}
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
              )}
              <Grid item md={3}>
                <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  // disabled
                  options={this.state.intakeYear}
                  getOptionLabel={(option) => option.title}
                  value={this.state.intakeyear}
                  onChange={(e, newValue) =>
                    this.setState({ intakeyear: newValue })
                  }
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
                  // disabled
                  options={this.intakeTermList}
                  getOptionLabel={(option) => option.title}
                  value={this.state.term}
                  onChange={(e, newValue) => this.setState({ term: newValue })}
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
              {productFamilyId === "115" && (
                <>
                  <Grid item md={3}>
                    <Autocomplete
                      popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                      id="combo-box-demo"
                      options={this.Order}
                      getOptionLabel={(option) => option.title}
                      value={this.state.order}
                      onChange={(e, newValue) =>
                        this.setState({ order: newValue })
                      }
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
                      // multiple
                      popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                      // id="combo-box-demo"
                      options={this.props.getallcountryList || []}
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
                </>
              )}
              <Grid item md={3}>
                <Autocomplete
                  id="combo-box-demo"
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  options={this.package}
                  getOptionLabel={(option) => option.name}
                  value={this.state.package}
                  onChange={(e, newValue) =>
                    this.setState({ package: newValue })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Package"
                      variant="standard"
                      error={this.state.packageErr.length > 0}
                      helperText={this.state.packageErr}
                    />
                  )}
                />
              </Grid>
              <Grid item md={12}>
                <Typography
                  style={{
                    fontWeight: "600",
                    color: "#407BFF",
                  }}
                >
                  Client's Educational Background
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Autocomplete
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      this.setState({
                        ugdegree: newValue,
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      this.setState({
                        ugdegree: newValue.inputValue,
                      });
                    } else {
                      this.setState({
                        ugdegree: newValue,
                      });
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    // Suggest the creation of a new value
                    if (params.inputValue !== "") {
                      filtered.push({
                        inputValue: params.inputValue,
                        name: `Add "${params.inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === "string") {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.name;
                  }}
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getDegreeList}
                  // getOptionLabel={(option) => option.name}
                  value={this.state.ugdegree}
                  // onChange={(e, newValue) =>
                  //   this.setState({ ugdegree: newValue })
                  // }
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
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      this.setState({
                        collegename: newValue,
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      this.setState({
                        collegename: newValue.inputValue,
                      });
                    } else {
                      this.setState({
                        collegename: newValue,
                      });
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    // Suggest the creation of a new value
                    if (params.inputValue !== "") {
                      filtered.push({
                        inputValue: params.inputValue,
                        name: `Add "${params.inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === "string") {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.name;
                  }}
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getCollegesList}
                  // getOptionLabel={(option) => option.name}
                  value={this.state.collegename}
                  // onChange={(e, newValue) =>
                  //   this.setState({ collegename: newValue })
                  // }
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
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      this.setState({
                        department: newValue,
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      this.setState({
                        department: newValue.inputValue,
                      });
                    } else {
                      this.setState({
                        department: newValue,
                      });
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    // Suggest the creation of a new value
                    if (params.inputValue !== "") {
                      filtered.push({
                        inputValue: params.inputValue,
                        name: `Add "${params.inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === "string") {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.name;
                  }}
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  options={this.props.getBranchesList}
                  // getOptionLabel={(option) => option.name}
                  value={this.state.department}
                  // onChange={(e, newValue) =>
                  //   this.setState({ department: newValue })
                  // }
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
                <TextField
                  label="CGPA"
                  type="number"
                  value={this.state.cgpa}
                  onChange={(e) => this.setState({ cgpa: e.target.value })}
                  error={this.state.cgpaErr.length > 0}
                  helperText={this.state.cgpaErr}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  label="Backlogs"
                  type="number"
                  value={this.state.activebacklogs}
                  onChange={(e) =>
                    this.setState({ activebacklogs: e.target.value })
                  }
                  error={this.state.activebacklogsErr.length > 0}
                  helperText={this.state.activebacklogsErr}
                />
              </Grid>
              <Grid item md={12}>
                <Typography
                  style={{
                    fontWeight: "600",
                    color: "#407BFF",
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
                      label="Any Work Exp?"
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
              <Grid item md={12} align="center">
                <PrimaryButton
                  style={{ width: "130px" }}
                  color={"primary"}
                  variant={"contained"}
                  onClick={() => this.handleSaved()}
                >
                  Save
                </PrimaryButton>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
        <Mysnack
          snackMsg={this.state.snackmsg}
          snackVariant={this.state.snackvariant}
          snackOpen={this.state.snackopen}
          onClose={() => this.setState({ snackopen: false })}
        />
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
    getAspDegreeList: state.AspirationReducer.allDegreeList,
    getAspTermsList: state.AspirationReducer.allTermList,
    getcountrylist: state.AspirationReducer.viewCountryList,
    getallcountryList: state.AspirationReducer.getallcountry,
    getStudentsByIdList: state.StudentReducer.StudentList,
    getvarientByidList: state.ProductReducer.getvarientByid,
    updateclientdetailsList: state.CallReducer.updateclientdetails,
    getClientInfoList: state.CallReducer.getClientInfo,
    tempState: state.HelperReducer.tempState,
    getIntakeTermList: state.CallReducer.getIntakeTermList,
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
  getallcountry,
  getStudentsById,
  getvarientByid,
  updateclientdetails,
  getClientInfo,
  storeItInState,
  getIntakeTerm,
})(ClientDetails);
