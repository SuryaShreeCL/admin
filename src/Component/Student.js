import React, { Component, forwardRef } from "react";
import "../Asset/StudentData.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import MaterialTable from "material-table";
import history from "./History";
import {
  isAlpha,
  isEmailSpecialChar,
  isEmptyString,
  isNumber,
  isSpecialCharacter,
} from "./Validation";
import {
  createMuiTheme,
  MuiThemeProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import AddBox from "@material-ui/icons/AddBox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import {
  getStudents,
  getStudentPaginate,
  postStudents,
  mernStudentSignUp,
  mernStudentEdit,
} from "../Actions/Student";
import { getAllColleges, getBranches } from "../Actions/College";
import { updateLmsAccess } from "../Actions/AdminAction";
import { connect } from "react-redux";
import { URL } from "../Actions/URL";
import { studentIdPath, productuserPunchingPath } from "./RoutePaths";
import TableComponent from "./TableComponent/TableComponent";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { studentPath } from "./RoutePaths";
import BackButton from "../Asset/Images/backbutton.svg";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Breadcrumbs, Typography } from "@material-ui/core";
import Loader from "./Utils/controls/Loader";
export class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      data: [],
      snackOpen: false,
      snackColor: null,
      snackMessage: null,
      dialogOpen: false,
      firstName: null,
      lastName: null,
      eMail: null,
      userName: null,
      college: null,
      department: null,
      phone: null,
      provider: "",
      toogleButton: false,
      password: "123456",
      studentId: null,
      isActive: true,
      firstNameHelperText: "",
      lastNameHelperText: "",
      emailHelperText: "",
      collegeHelperText: "",
      departmentHelperText: "",
      phoneHelperText: "",
      studentIdHelperText: "",
      internAccess: false,
      lmsAccess: false,
      prevEmail: null,
      search: {
        page: 0,
        size: "",
        keyword: "",
      },
    };
  }

  // stu_header = [
  //   { title: 'ID', field: 'studentID' },
  //   // { title: 'Last Name', field: 'lastName' },
  //   { title: 'Full Name', field: 'fullName' },
  //   { title: 'Email Id', field: 'emailId' },
  //   { title: 'Phone', field: 'phoneNumber' },
  //   { title: 'Department', field: 'department.name' },
  //   // { title: 'UGGPA', field: 'uggpa' },
  // ];

  stu_header = [
    { title: "ID", fieldName: "studentID" },
    // { title: 'Last Name', field: 'lastName' },
    { title: "Full Name", fieldName: "fullName" },
    { title: "Email Id", fieldName: "emailId" },
    { title: "College", fieldName: "college.name" },
    { title: "Department", fieldName: "department.name" },
    { title: "Phone", fieldName: "phoneNumber" },
    { title: "Degree", fieldName: "ugDegree.name" },
    // { title: 'UGGPA', field: 'uggpa' },
  ];

  tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  componentDidMount() {
    // this.props.getStudents();
    this.props.getStudentPaginate(0, 20);
    this.props.getAllColleges();
    this.props.getBranches();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.signUpResponse !== prevProps.signUpResponse) {
      if (this.props.signUpResponse.auth === true) {
        let lmsobj = {
          isActive: this.state.isActive,
          provider: this.state.toogleButton === true ? "Google" : "Local",
          isLMSUser: this.state.lmsAccess === false ? "false" : "true",
        };
        this.props.updateLmsAccess(
          this.props.signUpResponse.studentInfo.id,
          lmsobj
        );
      }
      this.props.getStudentPaginate(0, 20);
    }
    if (this.props.editStudentResponse !== prevProps.editStudentResponse) {
      this.props.getStudentPaginate(0, 20);
    }
    // TO search users when the input feild for search is empty
    if (this.state.search.keyword !== prevState.search.keyword) {
      if (isEmptyString(this.state.search.keyword)) {
        this.props.getStudentPaginate(0, 20);
      }
    }
  }
  rowClick = (rowData) => {
    window.sessionStorage.setItem("student", rowData);
    this.props.match.path !== "/admin/productpunching"
      ? this.props.history.push(studentIdPath + "/" + rowData.id)
      : this.props.history.push(productuserPunchingPath + rowData.id);
  };

  getmuitheme = () =>
    createMuiTheme({
      overrides: {
        MuiTypography: {
          h6: {
            fontWeight: "bold",
          },
        },
      },
    });
  spinnerTheme = () =>
    createMuiTheme({
      overrides: {
        MuiCircularProgress: {
          colorPrimary: {
            color: "#009be5",
          },
        },
      },
    });
  paginate = (page, size, keyword) => {
    console.log(page, size, keyword);
    var tempSearchHolder = { ...this.state.search };
    tempSearchHolder.page = page;
    tempSearchHolder.size = size;
    tempSearchHolder.keyword = keyword;
    console.log(tempSearchHolder);
    this.setState({
      search: tempSearchHolder,
    });
    if (
      // this.state.search.page !== 0 &&
      this.state.search.page !== page
    ) {
      this.props.getStudentPaginate(page, size, keyword);
    }
  };

  isEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  handleSubmit = (e) => {
    this.setState({ isLoading: true });
    this.state.firstName === null || this.state.firstName.length === 0
      ? this.setState({ firstNameHelperText: "Please fill the required feild" })
      : this.setState({ firstNameHelperText: "" });
    this.state.lastName === null || this.state.lastName.length === 0
      ? this.setState({ lastNameHelperText: "Please fill the required feild" })
      : this.setState({ lastNameHelperText: "" });
    this.state.eMail === null || this.state.eMail.length === 0
      ? this.setState({ emailHelperText: "Please fill the required feild" })
      : this.setState({ emailHelperText: "" });
    this.state.college === null || this.state.college.length === 0
      ? this.setState({ collegeHelperText: "Please fill the required feild" })
      : this.setState({ collegeHelperText: "" });
    this.state.department === null || this.state.department.length === 0
      ? this.setState({
          departmentHelperText: "Please fill the required feild",
        })
      : this.setState({ departmentHelperText: "" });
    this.state.studentId === null || this.state.studentId.length === 0
      ? this.setState({ studentIdHelperText: "Please fill the required feild" })
      : this.setState({ studentIdHelperText: "" });
    if (this.state.eMail && !this.isEmail(this.state.eMail)) {
      this.setState({ emailHelperText: "Please fill valid email" });
    } else if (this.isEmail(this.state.eMail)) {
      this.setState({ emailHelperText: "" });
    }
    if (isEmptyString(this.state.phone)) {
      this.setState({ phoneHelperText: "Please fill the required feild" });
    } else if (this.state.phone.length !== 10) {
      this.setState({ phoneHelperText: "Enter the valid phone number" });
    } else {
      this.setState({
        phoneHelperText: "",
      });
    }

    if (
      this.state.firstName !== null &&
      this.state.firstName.length !== 0 &&
      this.state.lastName !== null &&
      this.state.lastName.length !== 0 &&
      this.state.eMail !== null &&
      this.state.eMail.length !== 0 &&
      this.state.phone !== null &&
      this.state.phone.length === 10 &&
      this.state.college !== null &&
      this.state.college.length !== 0 &&
      this.state.department !== null &&
      this.state.department.length !== 0 &&
      this.state.studentId !== null &&
      this.state.studentId.length !== 0 &&
      this.isEmail(this.state.eMail)
    ) {
      let studentObj = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.eMail,
        email: this.state.eMail,
        phone: this.state.phone,
        college: this.state.college.id,
        department: this.state.department.id,
        roles: ["Student"],
        password: this.state.password,
        provider: this.state.toogleButton === true ? "Google" : "Local",
        privacyPolicy: true,
        avatar: "",
        isActive: this.state.isActive,
        studentId: this.state.studentId,
        internshipAccess: this.state.internAccess === false ? "no" : "yes",
        origin: "ADMIN Portal",
      };
      console.log(studentObj);
      this.props.mernStudentSignUp(studentObj, (response) => {
        if (response.auth) {
          this.setState({
            isLoading: false,
            snackMessage: "Student Registered Successfully",
            snackColor: "success",
            snackOpen: true,
            dialogOpen: false,
          });
        } else {
          this.setState({
            isLoading: false,
            snackMessage: response,
            snackColor: "error",
            snackOpen: true,
            dialogOpen: false,
          });
        }
      });

      this.setState({
        firstName: null,
        isLoading: false,
        lastName: null,
        eMail: null,
        phone: null,
        college: null,
        department: null,
        isActive: true,
        toogleButton: false,
        provider: "",
        internAccess: false,
        studentId: null,
        lmsAccess: false,
      });
    } else {
      this.setState({ isLoading: false });
    }
  };
  handleEdit = () => {
    this.setState({ isLoading: true });
    this.state.firstName === null || this.state.firstName.length === 0
      ? this.setState({ firstNameHelperText: "Please fill the required feild" })
      : this.setState({ firstNameHelperText: '' });
    this.state.lastName === null || this.state.lastName.length === 0
      ? this.setState({ lastNameHelperText: "Please fill the required feild" })
      : this.setState({ lastNameHelperText: '' });
    this.state.eMail === null || this.state.eMail.length === 0
      ? this.setState({ emailHelperText: "Please fill the required feild" })
      : this.setState({ emailHelperText: '' });
    this.state.phone === null || this.state.phone.length === 0
      ? this.setState({ phoneHelperText: "Please fill the required feild" })
      : this.setState({ phoneHelperText: '' });
    this.state.college === null || this.state.college.length === 0
      ? this.setState({ collegeHelperText: "Please fill the required feild" })
      : this.setState({ collegeHelperText: '' });
    this.state.department === null || this.state.department.length === 0
      ? this.setState({
          departmentHelperText: "Please fill the required feild",
        })
      : this.setState({ departmentHelperText: '' });
    this.state.studentId === null || this.state.studentId.length === 0
      ? this.setState({ studentIdHelperText: "Please fill the required feild" })
      : this.setState({ studentIdHelperText: '' });
    if (
      this.state.firstName !== null &&
      this.state.firstName.length !== 0 &&
      this.state.lastName !== null &&
      this.state.lastName.length !== 0 &&
      this.state.eMail !== null &&
      this.state.eMail.length !== 0 &&
      this.state.phone !== null &&
      this.state.phone.length !== 0 &&
      this.state.college !== null &&
      this.state.college.length !== 0 &&
      this.state.department !== null &&
      this.state.department.length !== 0 &&
      this.state.studentId !== null &&
      this.state.studentId.length !== 0
    ) {
      let studentObj = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        college: this.state.college.id,
        department: this.state.department.id,
        email_id: this.state.eMail,
        isActive: this.state.isActive,
        avatar: "",
        studentId: this.state.studentId,
        internshipAccess: this.state.internAccess === false ? "no" : "yes",
        lmsAccess: this.state.lmsAccess === false ? "false" : "true",
        provider: this.state.toogleButton === true ? "Google" : "Local",
        password: this.state.password,
      };
      console.log(studentObj);
      this.props.mernStudentEdit(this.state.id, studentObj, (response) => {
        this.setState({
          isLoading: false,
          snackMessage: "Student Edited Successfully",
          snackColor: "success",
          snackOpen: true,
          dialogOpen: false,
        });
      });
      this.setState({
        firstName: null,
        lastName: null,
        eMail: null,
        phone: null,
        college: null,
        department: null,
        isActive: true,
        toogleButton: false,
        internshipAccess: false,
        lmsAccess: false,
        provider: "",
        studentId: null,
      });
    }
  };

  // Function that handle search
  handleSearch = () => {
    // this.state.search.page
    this.props.getStudentPaginate(
      0,
      this.state.search.size,
      this.state.search.keyword
    );
  };
  render() {
    return (
      <MuiThemeProvider theme={this.getmuitheme}>
        <div>
          {/* <div style={{display:"flex",flexDirection:"row",margin:"10px"}}>
          <img
            src={BackButton}
            style={{ cursor: "pointer",marginTop:"-10px" }}
            onClick={() => this.props.history.goBack()}
             />
               <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <Typography style={{ cursor: "pointer", fontWeight: "600",marginLeft:"10px" }} onClick={()=>this.props.history.push(studentPath)}>
                Home
              </Typography>
              <Typography style={{ cursor: "pointer", fontWeight: "600" }}>
                Product Punching
              </Typography>
            </Breadcrumbs>
            </div> */}
          {/* <MaterialTable            
            columns={this.stu_header}
            icons={this.tableIcons}
            data={this.props.StudentsList}
            isLoading={(this.props.StudentsList.length===0) ? true : false}
            title="Student Details"
            onRowClick={this.rowClick}
            options={{
              search:true,
              headerStyle: {
                fontWeight: "bold",
              },
              minBodyHeight: '420px',
              maxBodyHeight: '420px'
            }}
          /> */}

          {this.props.StudentFilterList.length !== 0 ? (
            <TableComponent
              data={
                this.props.StudentFilterList.length !== 0
                  ? this.props.StudentFilterList.content
                  : null
              }
              add={
                this.props.match.path === "/admin/productpunching"
                  ? false
                  : true
              }
              needSearch
              onKeyUp={(e) => {
                if (e.keyCode === 13) {
                  e.preventDefault();
                  document.getElementById("search").click();
                }
              }}
              onSearchClick={this.handleSearch}
              onAddClick={(e) =>
                this.setState({
                  dialogOpen: true,
                  id: null,
                  // firstName : null,
                  // lastName : null,
                  // eMail : null,
                  // userName : null,
                  // college : null,
                  // department : null,
                  // phone : null,
                  // internAccess : false,
                  // provider : "",
                  // toogleButton : false,
                  // studentId : null,
                  // isActive : true,
                  // lmsAccess : false
                })
              }
              action={
                this.props.match.path === "/admin/productpunching"
                  ? false
                  : true
              }
              onEdit={true}
              onEditClick={(rowdata) => {
                this.setState({
                  id: rowdata.id,
                  firstName: rowdata.firstName,
                  lastName: rowdata.lastName,
                  eMail: rowdata.emailId,
                  prevEmail: rowdata.emailId,
                  phone: rowdata.phoneNumber,
                  college:
                    rowdata.college !== null
                      ? { id: rowdata.college.id, name: rowdata.college.name }
                      : null,
                  department:
                    rowdata.department !== null
                      ? {
                          id: rowdata.department.id,
                          name: rowdata.department.name,
                        }
                      : null,
                  isActive: rowdata.isactive,
                  internAccess:
                    rowdata.oldUser === null || rowdata.oldUser === "no"
                      ? false
                      : true,
                  lmsAccess:
                    rowdata.oldUser === null || rowdata.oldUser === "no"
                      ? false
                      : true,
                  provider: rowdata.provider,
                  toogleButton: rowdata.provider === "Google" ? true : false,
                  studentId: rowdata.studentID,
                  dialogOpen: true,
                });
              }}
              cols={this.stu_header}
              onRowClick={(rowData) => this.rowClick(rowData)}
              paginate={this.paginate}
              totalCount={this.props.StudentFilterList.totalElements}
              title={"Student"}
              pageCount={this.props.StudentFilterList.totalPages}
            />
          ) : (
            <ThemeProvider theme={this.spinnerTheme()}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "65vh",
                }}
              >
                {/* <CircularProgress
                  color="primary"
                  variant="indeterminate"
                  size="3rem"
                  thickness="3"
                /> */}
                <Loader/>
              </div>
            </ThemeProvider>
          )}
        </div>
        <Dialog
          open={this.state.dialogOpen}
          onClose={(e) => this.setState({ dialogOpen: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {this.state.id === null ? "Add New Student" : "Edit Student"}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={this.state.firstNameHelperText.length !== 0}
                  helperText={this.state.firstNameHelperText}
                  onKeyPress={(evt) => {
                    if (isAlpha(evt)) evt.preventDefault();
                  }}
                  value={this.state.firstName}
                  onChange={(e) => this.setState({ firstName: e.target.value })}
                  label="First Name"
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={this.state.lastNameHelperText.length !== 0}
                  helperText={this.state.lastNameHelperText}
                  onKeyPress={(evt) => {
                    if (isAlpha(evt)) evt.preventDefault();
                  }}
                  value={this.state.lastName}
                  onChange={(e) => this.setState({ lastName: e.target.value })}
                  label="Last Name"
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  variant="outlined"
                  size="small"
                  error={this.state.emailHelperText.length !== 0}
                  helperText={this.state.emailHelperText}
                  value={this.state.eMail}
                  onChange={(e) => this.setState({ eMail: e.target.value })}
                  fullWidth
                  label="E-Mail"
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  variant="outlined"
                  size="small"
                  disabled
                  value={this.state.eMail}
                  InputLabelProps={{
                    shrink: this.state.eMail !== null ? true : false,
                  }}
                  fullWidth
                  label="Username"
                />
              </Grid>
              <Grid item md={6}>
                <Autocomplete
                  id="combo-box-demo"
                  value={this.state.college}
                  options={this.props.allCollegeList}
                  onChange={(e, newValue) =>
                    this.setState({
                      college: {
                        id: newValue !== null ? newValue.id : null,
                        name: newValue !== null ? newValue.name : null,
                      },
                    })
                  }
                  // onChange={(e,newValue)=>console.log(newValue)}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      helperText={this.state.collegeHelperText}
                      error={this.state.collegeHelperText.length !== 0}
                      {...params}
                      size="small"
                      label="College"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item md={6}>
                <Autocomplete
                  id="combo-box-demo"
                  value={this.state.department}
                  options={this.props.BranchList}
                  onChange={(e, newValue) =>
                    this.setState({
                      department: {
                        id: newValue !== null ? newValue.id : null,
                        name: newValue !== null ? newValue.name : null,
                      },
                    })
                  }
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      helperText={this.state.departmentHelperText}
                      error={this.state.departmentHelperText.length !== 0}
                      {...params}
                      size="small"
                      label="Department"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  variant="outlined"
                  size="small"
                  helperText={this.state.phoneHelperText}
                  error={this.state.phoneHelperText.length !== 0}
                  onKeyPress={(evt) => {
                    if (isNumber(evt)) evt.preventDefault();
                  }}
                  value={this.state.phone}
                  onChange={(e) => this.setState({ phone: e.target.value })}
                  fullWidth
                  label="Phone Number"
                  inputProps={{
                    maxLength: 10,
                  }}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  variant="outlined"
                  size="small"
                  error={this.state.studentIdHelperText.length !== 0}
                  helperText={this.state.studentIdHelperText}
                  value={this.state.studentId}
                  onChange={(e) => this.setState({ studentId: e.target.value })}
                  fullWidth
                  label="Student ID"
                />
              </Grid>

              <Grid item md={3} align="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.toogleButton}
                      disabled={this.state.provider === null ? true : false}
                      onChange={(e) =>
                        this.setState({ toogleButton: e.target.checked })
                      }
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label={this.state.provider === null ? "App User" : "Google"}
                />
              </Grid>
              <Grid item md={3} align="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.isActive}
                      onChange={(e) =>
                        this.setState({ isActive: e.target.checked })
                      }
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Is Active"
                />
              </Grid>
              <Grid item md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.internAccess}
                      onChange={(e) =>
                        this.setState({ internAccess: e.target.checked })
                      }
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Internship Access"
                />
              </Grid>
              <Grid item md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.lmsAccess}
                      onChange={(e) =>
                        this.setState({ lmsAccess: e.target.checked })
                      }
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="LMS Access"
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  variant="outlined"
                  size="small"
                  disabled
                  value={this.state.password}
                  fullWidth
                  label="Password"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(e) =>
                this.state.id === null
                  ? this.handleSubmit(e)
                  : this.handleEdit(e)
              }
              color="primary"
              disabled={this.state.isLoading}
              autoFocus
            >
              {this.state.isLoading && (
                <CircularProgress
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />
              )}{" "}
              {this.state.id === null ? "Add" : "Update"}
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={this.state.snackOpen}
          autoHideDuration={3000}
          onClose={() => this.setState({ snackOpen: false })}
        >
          <Alert
            onClose={() => this.setState({ snackOpen: false })}
            severity={this.state.snackColor}
          >
            {this.state.snackMessage}
          </Alert>
        </Snackbar>
      </MuiThemeProvider>
    );
  }
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mapStateToProps = (state) => {
  return {
    StudentsList: state.StudentReducer.StudentsList,
    StudentFilterList: state.StudentReducer.StudentFilterList,
    allCollegeList: state.CollegeReducer.allCollegeList,
    BranchList: state.CollegeReducer.BranchList,
    signUpResponse: state.StudentReducer.signUpResponse,
    signUpError: state.StudentReducer.signUpError,
    editStudentResponse: state.StudentReducer.editStudentResponse,
    updateLmsAccessList: state.AdminReducer.updateLmsAccess,
  };
};
export default connect(mapStateToProps, {
  getStudents,
  updateLmsAccess,
  getStudentPaginate,
  postStudents,
  getAllColleges,
  getBranches,
  mernStudentSignUp,
  mernStudentEdit,
})(Student);
