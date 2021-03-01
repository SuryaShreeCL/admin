import React, { Component, forwardRef } from "react";
import "../Asset/StudentData.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import MaterialTable from "material-table";
import history from "./History";
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
import { getStudents, getStudentPaginate, postStudents, mernStudentSignUp } from "../Actions/Student";
import {getAllColleges,getBranches} from "../Actions/College"
import { connect } from "react-redux";
import { URL } from "../Actions/URL";
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
export class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dialogOpen : false,
      firstName : null,
      lastName : null,
      eMail : null,
      userName : null,
      college : null,
      department : null,
      phone : null,
      provider : false,
      toogleButton : false,
      password : "123456",
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
    this.props.getStudents();
    this.props.getStudentPaginate(0, 20);
    this.props.getAllColleges()
    this.props.getBranches()
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
    this.props.getStudentPaginate(page, size, keyword);
  };
  handleSubmit = (e) =>{
    let studentObj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.eMail,
      email: this.state.eMail,
      phone: this.state.phone,
      college: this.state.college,
      department: this.state.department,
      roles: ["Student"],
      password: this.state.password,
      provider: this.state.provider === true ? "Google" : "Local",
      privacyPolicy: true,
      avatar: "",
    };
    console.log(studentObj)
  }
  render() {  
    console.log(this.state.provider)
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

          {this.props.StudentFilterList.length !== 0 ? (
            <TableComponent
              data={
                this.props.StudentFilterList.length !== 0
                  ? this.props.StudentFilterList.content
                  : null
              }
              add={true}
              onAddClick={(e)=>this.setState({dialogOpen : true})}
              cols={this.stu_header}
              onRowClick={this.rowClick}
              onSearch={this.paginate}
              paginate={this.paginate}
              totalCount={this.props.StudentFilterList.totalElements}
              title={"Student"}
              pageCount={this.props.StudentFilterList.totalPages}
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
        <DialogTitle id="alert-dialog-title">{"Add New Student"}</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item md={6}>
               <TextField
               variant="outlined"
               size="small"
               fullWidth
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
               value={this.state.lastName}
               onChange={(e)=>this.setState({lastName : e.target.value})}
               label="Last Name"
               />
                  </Grid>
                  <Grid item md={6}>
                  <TextField
               variant="outlined"
               size="small"
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
                  options={this.props.allCollegeList}
                  onChange={(e,newValue)=>this.setState({college : newValue.id})}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params} size="small" label="College" variant="outlined" />}
                />
                  </Grid>
                  <Grid item md={6}>
                  <Autocomplete
                  id="combo-box-demo"
                  options={this.props.BranchList}
                  onChange={(e,newValue)=>this.setState({department : newValue.id})}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params} size="small" label="Department" variant="outlined" />}
                />
                  </Grid>
                  <Grid item md={6}>
                  <TextField
               variant="outlined"
               size="small"
               value={this.state.phone}
               onChange={(e)=>this.setState({phone : e.target.value})}
               fullWidth
               label="Phone Number"
               />
                  </Grid>
                  <Grid item md={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={this.state.toogleButton}
                        // onChange={(e)=>this.setState({toogleButton : e.target.checked})}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Google"
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
          
          <Button onClick={(e)=>this.handleSubmit(e)} color="primary" autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    StudentsList: state.StudentReducer.StudentsList,
    StudentFilterList: state.StudentReducer.StudentFilterList,
    allCollegeList : state.CollegeReducer.allCollegeList,
    BranchList : state.CollegeReducer.BranchList
  };
};
export default connect(mapStateToProps, { getStudents, getStudentPaginate, postStudents, getAllColleges, getBranches, mernStudentSignUp })(
  Student
);
