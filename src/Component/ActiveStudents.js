import React, { Component, forwardRef } from "react";
import "../Asset/StudentData.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import MaterialTable from "material-table";
import history from "./History";
import {isAlpha, isEmailSpecialChar, isNumber, isSpecialCharacter} from "./Validation"
import { createMuiTheme, MuiThemeProvider, ThemeProvider } from "@material-ui/core/styles";
import AddBox from "@material-ui/icons/AddBox";
import Autocomplete from '@material-ui/lab/Autocomplete';
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
import { getStudents, getStudentPaginate, postStudents, mernStudentSignUp, mernStudentEdit, getWhiteListedUser } from "../Actions/Student";
import {getAllColleges,getBranches} from "../Actions/College"
import { connect } from "react-redux";
import { URL } from "../Actions/URL";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { studentIdPath } from "./RoutePaths";
import TableComponent from "./TableComponent/TableComponent";
import {CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox
} from "@material-ui/core"
export class ActiveStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : null,
      snackOpen : false,
      snackColor : null,
      snackMessage : null,
      data: [],
      dialogOpen : false,
      firstName : null,
      lastName : null,
      eMail : null,
      userName : null,
      college : null,
      department : null,
      phone : null,
      provider : "",
      toogleButton : false,
      password : "123456",
      studentId : null,
      isActive : false,
      firstNameHelperText : null,
      lastNameHelperText : null,
      emailHelperText : null,
      collegeHelperText : null,
      departmentHelperText : null,
      phoneHelperText : null,
      studentIdHelperText : null,
      internAccess : false,
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
    { title: "Phone", fieldName: "phoneNumber" },
    { title: "Department", fieldName: "department.name" },
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
    this.props.getWhiteListedUser(0, 20);
    this.props.getAllColleges()
    this.props.getBranches()
  }

  componentDidUpdate(prevProps,prevState){
    if(this.props.signUpResponse !== prevProps.signUpResponse){
      if(this.props.signUpResponse.auth === true){
        this.setState({
          snackMessage : "Student Registered Successfully",
          snackColor : "success",
          snackOpen : true
        }) 
        
      }
      this.props.getWhiteListedUser(0, 20);
    }
    if(this.props.signUpError !== prevProps.signUpError){
      console.log("Something")
      this.setState({
        snackMessage : this.props.signUpError,
        snackColor : "error",
        snackOpen : true
      })
    }
    if(this.props.editStudentResponse !== prevProps.editStudentResponse){
      this.setState({
        snackMessage : "Student Edited Successfully",
        snackColor : "success",
        snackOpen : true
      }) 
      this.props.getWhiteListedUser(0, 20);
    } 
  }


  rowClick = (rowData) => {
    history.push(studentIdPath + rowData.id);
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
    spinnerTheme = () =>createMuiTheme({
      overrides :{
        MuiCircularProgress :  {
          colorPrimary:{
            color: "#009be5"
          }
        }
      }
    });
  paginate = (page, size, keyword) => {
    this.props.getWhiteListedUser(page, size, keyword);
  };
  handleSubmit = (e) =>{
    this.state.firstName === null || this.state.firstName.length === 0 ? this.setState({firstNameHelperText : "Please fill the required feild"}) : this.setState({firstNameHelperText : null})
    this.state.lastName === null || this.state.lastName.length === 0 ? this.setState({lastNameHelperText : "Please fill the required feild"}) : this.setState({lastNameHelperText : null})
    this.state.eMail === null || this.state.eMail.length === 0 ? this.setState({emailHelperText : "Please fill the required feild"}) : this.setState({emailHelperText : null})
    this.state.phone === null || this.state.phone.length === 0 ? this.setState({phoneHelperText : "Please fill the required feild"}) : this.setState({phoneHelperText : null})
    this.state.college === null || this.state.college.length === 0 ? this.setState({collegeHelperText : "Please fill the required feild"}) : this.setState({collegeHelperText : null})
    this.state.department === null || this.state.department.length === 0 ? this.setState({departmentHelperText : "Please fill the required feild"}) : this.setState({departmentHelperText : null})
    this.state.studentId === null || this.state.studentId.length === 0 ? this.setState({studentIdHelperText : "Please fill the required feild"}) : this.setState({studentIdHelperText : null})
    if(
     this.state.firstName !== null && this.state.firstName.length !== 0 &&
     this.state.lastName !== null && this.state.lastName.length !== 0 &&
     this.state.eMail !== null && this.state.eMail.length !== 0 &&
     this.state.phone !== null && this.state.phone.length !== 0 &&
     this.state.college !== null && this.state.college.length !== 0 &&
     this.state.department !== null && this.state.department.length !== 0 &&
     this.state.studentId !== null && this.state.studentId.length !== 0 
     ){
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
        internshipAccess : this.state.internAccess === false ? "no" : "yes",
        avatar: "",
        isActive: this.state.isActive,
        studentId: this.state.studentId,
        origin : "ADMIN Portal"
      };
      this.props.mernStudentSignUp(studentObj)
      console.log(studentObj)
      this.setState({
        dialogOpen : false,
        firstName : null,
        lastName : null,
        eMail : null,
        phone : null,
        college : null,
        internAccess : false,
        department : null,
        isActive : false,
        toogleButton : false,
        provider : "",
        studentId : null
      })
   }
   
  }
  handleEdit = () =>{
    this.state.firstName === null || this.state.firstName.length === 0 ? this.setState({firstNameHelperText : "Please fill the required feild"}) : this.setState({firstNameHelperText : null})
    this.state.lastName === null || this.state.lastName.length === 0 ? this.setState({lastNameHelperText : "Please fill the required feild"}) : this.setState({lastNameHelperText : null})
    this.state.eMail === null || this.state.eMail.length === 0  ? this.setState({emailHelperText : "Please fill the required feild"}) : this.setState({emailHelperText : null})
    this.state.phone === null || this.state.phone.length === 0 ? this.setState({phoneHelperText : "Please fill the required feild"}) : this.setState({phoneHelperText : null})
    this.state.college === null || this.state.college.length === 0 ? this.setState({collegeHelperText : "Please fill the required feild"}) : this.setState({collegeHelperText : null})
    this.state.department === null || this.state.department.length === 0 ? this.setState({departmentHelperText : "Please fill the required feild"}) : this.setState({departmentHelperText : null})
    this.state.studentId === null || this.state.studentId.length === 0 ? this.setState({studentIdHelperText : "Please fill the required feild"}) : this.setState({studentIdHelperText : null})
    if(
      this.state.firstName !== null && this.state.firstName.length !== 0 &&
     this.state.lastName !== null && this.state.lastName.length !== 0 &&
     this.state.eMail !== null && this.state.eMail.length !== 0 &&
     this.state.phone !== null && this.state.phone.length !== 0 &&
     this.state.college !== null && this.state.college.length !== 0 &&
     this.state.department !== null && this.state.department.length !== 0 &&
     this.state.studentId !== null && this.state.studentId.length !== 0 
      ){
    let studentObj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      college: this.state.college.id,
      department: this.state.department.id,
      isActive: this.state.isActive,
      avatar: "",
      internshipAccess : this.state.internAccess === false ? "no" : "yes",
      studentId: this.state.studentId,
      provider: this.state.toogleButton === true ? "Google" : "Local",
      password: this.state.password,
    };
    console.log(studentObj)
    this.props.mernStudentEdit(this.state.id,studentObj)
    this.setState({
      dialogOpen : false,
      firstName : null,
      lastName : null,
      eMail : null,
      phone : null,
      college : null,
      department : null,
      isActive : false,
      toogleButton : false,
      internAccess : false,
      provider : "",
      studentId : null
    })
  }
  }
  render() {  
    console.log("Props............",this.props.whiteListedUserDetails)
    return (
      <MuiThemeProvider theme={this.getmuitheme}>
        <div>
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

          {this.props.whiteListedUserDetails.length !== 0 ? (
            <TableComponent
              data={
                this.props.whiteListedUserDetails.length !== 0
                  ? this.props.whiteListedUserDetails.content
                  : null
              }
              add={true}
              onAddClick={(e)=>this.setState({
                dialogOpen : true,
                id : null,
                id : null,
                firstName : null,
                lastName : null,
                eMail : null,
                userName : null,
                college : null,
                department : null,
                phone : null,
                provider : "",
                toogleButton : false,
                studentId : null,
                isActive : false,

              })}
              action={true}
              onEdit={true}
              onEditClick={(rowdata)=>{
                console.log(rowdata)
                this.setState({
                  id : rowdata.id,
                  firstName : rowdata.firstName,
                  lastName : rowdata.lastName,
                  eMail : rowdata.emailId,
                  phone : rowdata.phoneNumber,
                  college : rowdata.college !== null ? {id : rowdata.college.id, name : rowdata.college.name} : null,
                  department : rowdata.department !== null ? {id :rowdata.department.id, name : rowdata.department.name} : null,
                  isActive : rowdata.isactive,
                  toogleButton : rowdata.provider === "Google" ? true : false,
                  provider : rowdata.provider,
                  studentId : rowdata.studentID,
                  dialogOpen : true
                })
              }}
              cols={this.stu_header}
              onRowClick={this.rowClick}
              onSearch={this.paginate}
              paginate={this.paginate}
              totalCount={this.props.whiteListedUserDetails.totalElements}
              title={"Student"}
              pageCount={this.props.whiteListedUserDetails.totalPages}
            />
          ) : (
            <ThemeProvider theme={this.spinnerTheme()}>
                <div style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "65vh",
                }}>
              <CircularProgress
             color="primary"
              variant="indeterminate"
              size = "3rem"
              thickness="3"
               />
               </div>
              </ThemeProvider>
          )}
        </div>
        <Dialog
        open={this.state.dialogOpen}
        onClose={(e)=>this.setState({dialogOpen : false})}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.state.id === null ? "Add New Student" : "Edit Student"}</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item md={6}>
               <TextField
               variant="outlined"
               size="small"
               fullWidth
               helperText={this.state.firstNameHelperText}
               onKeyPress={(evt)=>{ if (isAlpha(evt)) evt.preventDefault() }}
               value={this.state.firstName}
               onChange={(e)=>this.setState({firstName : e.target.value})}
               label="First Name"
               /> 
                </Grid>
                <Grid item md={6}>
                <TextField
               variant="outlined"
               size="small"
               fullWidth
               helperText={this.state.lastNameHelperText}
               onKeyPress={(evt)=>{ if (isAlpha(evt)) evt.preventDefault() }}
               value={this.state.lastName}
               onChange={(e)=>this.setState({lastName : e.target.value})}
               label="Last Name"
               />
                  </Grid>
                  <Grid item md={6}>
                  <TextField
               variant="outlined"
               size="small"
               helperText={this.state.emailHelperText}
               value={this.state.eMail}
               onChange={(e)=>this.setState({eMail : e.target.value})}
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
               InputLabelProps={{shrink : this.state.eMail !== null ? true : false}}
               fullWidth
               label="Username"
               />
                  </Grid>
                  <Grid item md={6}>
                  <Autocomplete
                  id="combo-box-demo"
                  value={this.state.college}
                  options={this.props.allCollegeList}
                  onChange={(e,newValue)=>this.setState({college : {id : newValue !== null ? newValue.id : null, name : newValue !== null ? newValue.name : null}})}
                  // onChange={(e,newValue)=>console.log(newValue)}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField helperText={this.state.collegeHelperText} {...params} size="small" label="College" variant="outlined" />}
                />
                  </Grid>
                  <Grid item md={6}>
                  <Autocomplete
                  id="combo-box-demo"
                  value={this.state.department}
                  options={this.props.BranchList}
                  onChange={(e,newValue)=>this.setState({department : {id :newValue !== null ?  newValue.id : null, name : newValue !== null ? newValue.name : null}})}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField helperText={this.state.departmentHelperText} {...params} size="small" label="Department" variant="outlined" />}
                />
                  </Grid>
                  <Grid item md={6}>
                  <TextField
               variant="outlined"
               size="small"
               helperText={this.state.phoneHelperText}
               onKeyPress={(evt)=>{ if (isNumber(evt)) evt.preventDefault() }}
               value={this.state.phone}
               onChange={(e)=>this.setState({phone : e.target.value})}
               fullWidth
               label="Phone Number"
               />
                  </Grid>
                  <Grid item md={6}>
                  <TextField
               variant="outlined"
               size="small"
                helperText={this.state.studentIdHelperText}
               value={this.state.studentId}
               onChange={(e)=>this.setState({studentId : e.target.value})}
               fullWidth
               label="Student ID"
               />
                  </Grid>
                  <Grid item md={4} align="center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.toogleButton}
                        onChange={(e)=>this.setState({toogleButton : e.target.checked})}
                        name="checkedB"
                        disabled={this.state.provider === null ? true : false}
                        color="primary"
                        
                      />
                    }
                    label={this.state.provider === null ? "App User" : "Google"}
                  />
                
                  </Grid>
                  <Grid item md={4} align="center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.isActive}
                        onChange={(e)=>this.setState({isActive : e.target.checked})}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Is Active"
                  />
                  </Grid>
                  <Grid item md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.internAccess}
                        onChange={(e)=>this.setState({internAccess : e.target.checked})}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Internship Access"
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
          
          <Button onClick={(e)=>this.state.id === null ? this.handleSubmit(e) : this.handleEdit(e)} color="primary" autoFocus>
           {this.state.id === null ? "Add" : "Edit"} 
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={this.state.snackOpen} autoHideDuration={3000} onClose={()=>this.setState({snackOpen : false})}>
        <Alert onClose={()=>this.setState({snackOpen : false})} severity={this.state.snackColor}>
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
    allCollegeList : state.CollegeReducer.allCollegeList,
    BranchList : state.CollegeReducer.BranchList,
    whiteListedUserDetails : state.StudentReducer.whiteListedUserDetails,
    signUpResponse : state.StudentReducer.signUpResponse,
    signUpError : state.StudentReducer.signUpError,
    editStudentResponse : state.StudentReducer.editStudentResponse
  };
};
export default connect(mapStateToProps, { getStudents, getStudentPaginate, getWhiteListedUser ,postStudents, getAllColleges, getBranches, mernStudentSignUp, mernStudentEdit })(
    ActiveStudents
);
