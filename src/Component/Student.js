import React, { Component, forwardRef } from "react";
import "../Asset/StudentData.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import MaterialTable from "material-table";
import history from "./History";
import {
  isAlpha,
  isEmailSpecialChar,
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
import {
  studentIdPath,
  productuserPunchingPath,
  lms_course_taken,
} from "./RoutePaths";
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
import CloseIcon from "@material-ui/icons/Close";
import { Breadcrumbs, Typography, IconButton } from "@material-ui/core";
import styled from "styled-components";
import {
  getAllLmsProduct,
  postStudentLmsProduct,
  getStudentProducts,
} from "../Lms/Redux/Action/Student";
import { keys } from "@material-ui/core/styles/createBreakpoints";

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
      firstNameHelperText: null,
      lastNameHelperText: null,
      emailHelperText: null,
      collegeHelperText: null,
      departmentHelperText: null,
      phoneHelperText: null,
      studentIdHelperText: null,
      internAccess: false,
      lmsAccess: false,
      prevEmail: null,

      product: [],
      selectedProduct: [],
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

  LMS_STUDENT_HEADER = [
    { title: "ID", fieldName: "studentID" },
    // { title: 'Last Name', field: 'lastName' },
    { title: "Full Name", fieldName: "fullName" },
    { title: "Email Id", fieldName: "emailId" },
    // { title: "College", fieldName: "college.name" },
    // { title: "Department", fieldName: "department.name" },
    { title: "Phone", fieldName: "phoneNumber" },
    // { title: "Degree", fieldName: "ugDegree.name" },
    // { title: 'UGGPA', field: 'uggpa' },k
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
    this.props.getAllLmsProduct(() => {});
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
        this.setState({
          lmsAccess: false,
          //   //   snackMessage : "Student Registered Successfully",
          //   //   snackColor : "success",
          //   //   snackOpen : true
        });
      }
      this.props.getStudentPaginate(0, 20);
    }
    if (this.props.signUpError !== prevProps.signUpError) {
      console.log("Something");
      // this.setState({
      //   snackMessage : this.props.signUpError,
      //   snackColor : "error",
      //   snackOpen : true
      // })
    }
    if (this.props.editStudentResponse !== prevProps.editStudentResponse) {
      // this.setState({
      //   snackMessage : "Student Edited Successfully",
      //   snackColor : "success",
      //   snackOpen : true
      // })
      this.props.getStudentPaginate(0, 20);
    }
  }

  rowClick = (rowData) => {
    if (
      ["LMSEDITOR", "LMSCHECKER"].indexOf(sessionStorage.getItem("role")) === -1
    ) {
      window.sessionStorage.setItem("student", rowData);
      this.props.match.path !== "/admin/productpunching"
        ? this.props.history.push(studentIdPath + "/" + rowData.id)
        : this.props.history.push(productuserPunchingPath + rowData.id);
    } else {
      if (rowData.isLMSUser)
        this.props.history.push(lms_course_taken + "?studentId=" + rowData.id);
    }
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
    this.props.getStudentPaginate(page, size, keyword);
  };

  isEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  handleSubmit = (e) => {
    this.setState({ isLoading: true });
    this.state.firstName === null || this.state.firstName.length === 0
      ? this.setState({
          firstNameHelperText: "Please fill the required feild",
          isLoading: false,
        })
      : this.setState({ firstNameHelperText: null });
    this.state.lastName === null || this.state.lastName.length === 0
      ? this.setState({
          lastNameHelperText: "Please fill the required feild",
          isLoading: false,
        })
      : this.setState({ lastNameHelperText: null });
    this.state.eMail === null || this.state.eMail.length === 0
      ? this.setState({
          emailHelperText: "Please fill the required feild",
          isLoading: false,
        })
      : this.setState({ emailHelperText: null });
    this.state.phone === null || this.state.phone.length === 0
      ? this.setState({
          phoneHelperText: "Please fill the required feild",
          isLoading: false,
        })
      : this.setState({ phoneHelperText: null });
    this.state.college === null || this.state.college.length === 0
      ? this.setState({
          collegeHelperText: "Please fill the required feild",
          isLoading: false,
        })
      : this.setState({ collegeHelperText: null });
    this.state.department === null || this.state.department.length === 0
      ? this.setState({
          departmentHelperText: "Please fill the required feild",
          isLoading: false,
        })
      : this.setState({ departmentHelperText: null });
    this.state.studentId === null || this.state.studentId.length === 0
      ? this.setState({
          studentIdHelperText: "Please fill the required feild",
          isLoading: false,
        })
      : this.setState({ studentIdHelperText: null });

    if (this.state.eMail && !this.isEmail(this.state.eMail)) {
      this.setState({
        emailHelperText: "Please fill valid email",
        isLoading: false,
      });
    } else if (this.isEmail(this.state.eMail)) {
      this.setState({ emailHelperText: null });
    }

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
      this.props.mernStudentSignUp(studentObj, (response) => {
        if (response.auth) {
          this.props.postStudentLmsProduct(
            response.studentInfo.id,
            {
              products: this.state.product.map((item) => ({
                productId: item.product.id,
                expirationDate: item.expirationDate,
              })),
            },
            () => {}
          );
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
        product: [],
        selectedProduct: [],
      });
    } else {
      this.setState({ isLoading: false });
    }
  };

  handleEdit = () => {
    this.setState({ isLoading: true });
    this.state.firstName === null || this.state.firstName.length === 0
      ? this.setState({
          firstNameHelperText: "Please fill the required feild",
          isLoading: false,
        })
      : this.setState({ firstNameHelperText: null });
    this.state.lastName === null || this.state.lastName.length === 0
      ? this.setState({
          lastNameHelperText: "Please fill the required feild",
          isLoading: false,
        })
      : this.setState({ lastNameHelperText: null });
    this.state.eMail === null || this.state.eMail.length === 0
      ? this.setState({
          emailHelperText: "Please fill the required feild",
          isLoading: false,
        })
      : this.setState({ emailHelperText: null });
    this.state.phone === null || this.state.phone.length === 0
      ? this.setState({
          phoneHelperText: "Please fill the required feild",
          isLoading: false,
        })
      : this.setState({ phoneHelperText: null });
    this.state.college === null || this.state.college.length === 0
      ? this.setState({
          collegeHelperText: "Please fill the required feild",
          isLoading: false,
        })
      : this.setState({ collegeHelperText: null });
    this.state.department === null || this.state.department.length === 0
      ? this.setState({
          departmentHelperText: "Please fill the required feild",
          isLoading: false,
        })
      : this.setState({ departmentHelperText: null });
    this.state.studentId === null || this.state.studentId.length === 0
      ? this.setState({
          studentIdHelperText: "Please fill the required feild",
          isLoading: false,
        })
      : this.setState({ studentIdHelperText: null });
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

      this.props.postStudentLmsProduct(
        this.state.id,
        {
          products: this.state.product.map((item) => ({
            productId: item.product.id,
            expirationDate: item.expirationDate,
          })),
        },
        () => {}
      );

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
        provider: "",
        studentId: null,
        isLoading: false,
      });
    }
  };

  addProduct = () => {
    let arr = this.state.product;

    if (
      Object.keys(this.props.lmsProducts).length &&
      this.props.lmsProducts.data.length > this.state.product.length
    ) {
      arr.push({
        product: {
          id: "",
        },
        expirationDate: "",
      });
      this.setState({ product: arr });
    }
  };

  removeProduct = (index) => {
    if (this.state.product.length > 0) {
      let items = this.state.product;
      items.splice(index, 1);
      this.setState({
        product: items,
      });
    }
  };

  removeSelectedItem = (id) => {
    this.setState({
      selectedProduct: this.state.selectedProduct.filter((el) => el.id !== id),
    });
  };

  onChange = (name, value, idx) => {
    let arr = this.state.product;
    let each = {
      ...this.state.product[idx],
      [name]: value,
    };
    arr[idx] = each;
    this.setState({ product: arr });
  };

  renderProduct = () => {
    return this.state.product.map((item, idx) => {
      return (
        <>
          <Grid item sm={6} md={6}>
            <Autocomplete
              options={
                Object.keys(this.props.lmsProducts).length !== 0
                  ? this.props.lmsProducts.data.filter(
                      (item) =>
                        this.state.selectedProduct
                          .map((el) => el.id)
                          .indexOf(item.id) === -1
                    )
                  : []
              }
              value={item.product || null}
              getOptionLabel={(option) => option.title}
              onChange={(e, newValue) => {
                if (newValue) {
                  this.onChange("product", newValue, idx);
                  let arr = this.state.selectedProduct.filter(
                    (item) => item.id !== newValue.id
                  );
                  arr.push(newValue);
                  this.setState({ selectedProduct: arr });
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Product Name"
                  variant="outlined"
                />
              )}
              fullWidth
            />
          </Grid>
          <Grid item sm={5} md={5}>
            <TextField
              type={"date"}
              color={"primary"}
              variant={"outlined"}
              onChange={(e) => {
                this.onChange("expirationDate", new Date(e.target.value), idx);
              }}
              value={
                item.expirationDate
                  ? new Date(item.expirationDate)
                      .toISOString()
                      .replace(/T.*/, "")
                      .split("-")
                      .join("-")
                  : item.expirationDate
              }
              label={"expiry Date"}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: {
                  min: new Date()
                    .toISOString()
                    .replace(/T.*/, "")
                    .split("-")
                    .join("-"),
                },
              }}
              fullWidth
              disablePast
            />
          </Grid>
          <Grid item sm={1} md={1}>
            <IconButton
              onClick={() => {
                this.removeProduct(idx);
                this.removeSelectedItem(item.product.id);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </>
      );
    });
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
              // data={data.length !== 0 ? data : null}
              add={
                this.props.match.path === "/admin/productpunching"
                  ? false
                  : true
              }
              onAddClick={(e) =>
                this.setState({
                  dialogOpen: true,
                  id: null,
                  product: [],
                  selectedProduct: [],
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
                this.props.getStudentProducts(rowdata.id, (response) => {
                  // expiryDate
                  let arr = [];
                  let selectedProductArr = [];
                  response.data.map((item) => {
                    let product = {
                      courseId: "",
                      id: item.id,
                      title: item.productName,
                    };
                    let expiryDate = item.expiryDate;
                    arr.push({
                      product: product,
                      expirationDate: expiryDate,
                    });
                    selectedProductArr.push(product);
                  });
                  this.setState({
                    product: arr,
                    selectedProduct: selectedProductArr,
                  });
                });
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
                    rowdata.isLMSUser === null || rowdata.isLMSUser === false
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
              onSearch={this.paginate}
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
                <CircularProgress
                  color="primary"
                  variant="indeterminate"
                  size="3rem"
                  thickness="3"
                />
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

              <Grid
                item
                md={12}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <LinkButton onClick={this.addProduct}>+ Add Product</LinkButton>
              </Grid>
              {this.renderProduct()}
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

const LinkButton = styled.button`
  background: none;
  outline: none;
  border: none;
  text-decoration: underline;
  color: blue;
  text-align: end;
`;

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
    lmsProducts: state.LmsStudentReducer.lmsProducts,
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
  getAllLmsProduct,
  postStudentLmsProduct,
  getStudentProducts,
})(Student);

const data = [
  {
    id: "0bc82206-7dae-486b-80f2-15fad4357b79",
    studentID: "DEV1",
    username: "devo1",
    password: null,
    firstName: "dev",
    lastName: "ops",
    fullName: null,
    emailId: "developer1@gmail.com",
    altEmailId: null,
    isactive: true,
    phoneNumber: "077552001",
    altPhoneNumber: null,
    linkedInProfile: null,
    address: null,
    faceBookUrl: null,
    twitterUrl: null,
    isLMSUser: null,
    dob: null,
    provider: "Local",
    ugDegree: null,
    college: null,
    department: null,
    university: null,
    expectedYrOfGrad: 0,
    currentSem: 0,
    noOfBacklogs: 0,
    noOfClearedBacklogs: 0,
    testExecutions: [],
    recommendedCourses: [],
    mentorRecommendedCourses: [],
    svcRecommendedCourses: [],
    city: null,
    mentor: null,
    oldUser: null,
    createdAt: null,
    updatedAt: null,
    lastLoginDate: null,
    enrollmentPeriod: null,
    initialQuarterPlan: null,
    studentGrade: null,
    commonFocusCourse: null,
    product: null,
    chosenTrack: null,
    studentHsc: null,
    studentSsc: null,
    studentDiploma: null,
    studentUgs: null,
    uggpa: 0,
    uggpascale: 0,
  },
];
