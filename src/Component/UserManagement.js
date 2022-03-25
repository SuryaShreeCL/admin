import React, { Component } from "react";
import { Autocomplete } from "@material-ui/lab";
import { Link } from "react-router-dom";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  Tab,
  Tabs,
  Snackbar,
  CircularProgress,
  ThemeProvider,
} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import TableComponent from "../Component/TableComponent/TableComponent";
import {
  getUserDepartment,
  getUserDetails,
  editAdmin,
} from "../Actions/UserManagement";
import { isEmptyString } from "../Component/Validation";
import { isEmptyArray } from "../Component/Validation";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import MySnackBar from "./MySnackBar";
export class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      id: "",
      username: "",
      password: "",
      department: [],
      usernameErr: "",
      passwordErr: "",
      departmentErr: "",
      update: false,
      snackMsg: "",
      snackVariant: "",
      snackOpen: false,
      passwordEnable: true,
      // modalClose: true,
    };
  }
  // Component Theme
  getmuitheme = () =>
    createTheme({
      palette: {
        primary: {
          main: "#007bff",
        },
      },
      overrides: {
        MuiTypography: {
          h6: {
            fontWeight: "bold",
          },
        },
        MuiIconButton: {
          root: {
            "&:hover": {
              backgroundColor: "none",
              borderRadius: 0,
            },
          },
        },
      },
    });
  // Model Theme
  modeltheme = () =>
    createTheme({
      overrides: {
        MuiDialog: {
          paperWidthSm: {
            width: 500,
          },
        },
        MuiDialogTitle: {
          root: {
            padding: "8px 24px",
          },
        },
        MuiTypography: {
          h6: {
            display: "flex",
            alignItems: "center",
          },
        },
        MuiSvgIcon: {
          root: {
            margin: 0,
          },
        },
        MuiDialogActions: {
          root: {
            justifyContent: "center",
          },
        },
        MuiDialogContentText: {
          root: {
            textAlign: "center",
            display: "block",
            marginBottom: 34,
            color: "rgba(0,0,0,0.7)",
          },
        },
        MuiTextField: {
          root: {
            marginBottom: 15,
          },
        },
      },
    });
  spinnerTheme = () =>
    createTheme({
      overrides: {
        MuiCircularProgress: {
          colorPrimary: {
            color: "#009be5",
          },
        },
      },
    });
  col = [
    {
      title: "ID",
      fieldName: "id",
    },
    { title: "Username", fieldName: "username" },

    {
      title: "Roles",
      fieldName: "roles.name",
    },
  ];
  // Row Click Handler
  rowClick = (rowData) => {};
  // Pagination
  paginate = (page, size, keyword) => {
    this.props.getUserDetails(page, size, keyword);
  };
  // Edit Handler
  handleEdit = (data) => {
    console.log(data, "________________");
    this.setState({
      id: data.id,
      username: data.username,
      department: data.departments,
      password: null,
      show: true,
      passwordEnable: true,
      passwordErr: "",
      usernameErr: "",
      departmentErr: "",
    });
  };
  // Dialog Open
  handleClickOpen = (e) => {
    this.setState({
      show: true,
      id: "",
      username: "",
      password: "",
      department: [],
      passwordEnable: false,
      passwordErr: "",
      usernameErr: "",
      departmentErr: "",
    });
  };
  // deleteHandler = (data) => {
  //   // this.props.deleteTerm(data.id);
  // };
  componentDidMount() {
    this.props.getUserDepartment();
    this.props.getUserDetails();
    this.props.getUserDetails(0, 20, null);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.AdminList !== prevProps.AdminList) {
      // console.log(this.props.AdminList, prevProps.AdminList);
      this.props.getUserDetails();
    }
  }

  handleUpdate = () => {
    let helperTxt = "Please fill the Required Field";
    isEmptyString(this.state.username)
      ? this.setState({ usernameErr: helperTxt })
      : this.setState({ usernameErr: "" });

    isEmptyArray(this.state.department)
      ? this.setState({ departmentErr: helperTxt })
      : this.setState({ departmentErr: "" });

    if (
      !isEmptyString(this.state.username) &&
      !isEmptyArray(this.state.department)
    ) {
      let reqBody = {
        Id: this.state.id, // if updating the user details mean pass the id
        username: this.state.username,
        password: this.state.password,
        userDetails: this.state.department,
      };
      this.setState({
        snackMsg: "Update sucessfully",
        snackOpen: true,
        snackVariant: "success",
        show: false,
      });
      this.props.editAdmin(reqBody);

      console.log(reqBody);
    }
  };

  handleSave = () => {
    let helperTxt = "Please fill the Required Field";
    isEmptyString(this.state.username)
      ? this.setState({ usernameErr: helperTxt })
      : this.setState({ usernameErr: "" });

    isEmptyString(this.state.password)
      ? this.setState({ passwordErr: helperTxt })
      : this.setState({ passwordErr: "" });

    isEmptyArray(this.state.department)
      ? this.setState({ departmentErr: helperTxt })
      : this.setState({ departmentErr: "" });

    if (
      !isEmptyString(this.state.username) &&
      !isEmptyString(this.state.password) &&
      !isEmptyArray(this.state.department)
    ) {
      let reqBody = {
        Id: this.state.id, // if updating the user details mean pass the id
        username: this.state.username,
        password: this.state.password,
        userDetails: this.state.department,
      };
      this.setState({
        snackMsg: "Add sucessfully",
        snackOpen: true,
        snackVariant: "success",
        show: false,
      });
      this.props.editAdmin(reqBody);
      console.log(reqBody);
    }
  };

  render() {
    console.log(this.state, "++++++++++++++++");
    console.log(this.props.AdminList, "++++++++++++++++++++");
    return (
      <div>
        <ThemeProvider theme={this.getmuitheme()}>
          <Grid container>
            <Grid item md={12}>
              {this.props.getList && this.props.getList.length !== 0 ? (
                <TableComponent
                  data={
                    this.props.getList.length !== 0
                      ? this.props.getList.data
                      : null
                  }
                  cols={this.col}
                  onSearch={this.paginate}
                  paginate={this.paginate}
                  onDelete={false}
                  // onDeleteClick={this.deleteHandler}
                  title={"User Management"}
                  action={true}
                  onEdit={true}
                  onEditClick={this.handleEdit}
                  add={true}
                  onAddClick={this.handleClickOpen}
                />
              ) : (
                <ThemeProvider>
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
          size = "3rem"
          thickness="3"
           /> */}
                    {/* <Loader /> */}
                  </div>
                </ThemeProvider>
              )}
            </Grid>
          </Grid>
          {/* Add and Edit Aspiration Term */}
          <ThemeProvider theme={this.modeltheme()}>
            <Dialog
              TransitionComponent={Transition}
              open={this.state.show}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0
                    ? "Edit Username"
                    : "Add Username"}

                  <div
                    className="model-close-button"
                    style={{
                      position: "relative",
                      marginLeft: "90%",
                      marginTop: "-7%",
                    }}
                  >
                    <IconButton
                      aria-label="close"
                      onClick={(e) => this.setState({ show: false })}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                </div>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item md={12}>
                    <TextField
                      variant="outlined"
                      color="primary"
                      label="Enter Username"
                      fullWidth
                      error={this.state.usernameErr.length > 0}
                      helperText={this.state.usernameErr}
                      value={this.state.username}
                      onChange={(e) =>
                        this.setState({
                          username: e.target.value,
                          usernameErr: "",
                        })
                      }
                      multiline
                    />
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      disabled={this.state.passwordEnable}
                      variant="outlined"
                      color="primary"
                      label="Enter Password"
                      value={this.state.password}
                      error={this.state.passwordErr.length > 0}
                      helperText={this.state.passwordErr}
                      onChange={(e) =>
                        this.setState({
                          password: e.target.value,
                          passwordErr: "",
                        })
                      }
                      fullWidth
                    />
                    <Link
                      href="#"
                      onClick={() =>
                        this.setState({
                          passwordEnable: !this.state.passwordEnable,
                        })
                      }
                    >
                      Edit Password
                    </Link>
                  </Grid>
                  <Grid md={12}>
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      value={this.state.department}
                      options={this.props.departmentList?.data}
                      getOptionLabel={(option) => option.name}
                      onChange={(e, newValue) =>
                        this.setState({
                          department: newValue,
                          departmentErr: "",
                        })
                      }
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Enter Role"
                          variant="outlined"
                          placeholder="Role"
                          error={this.state.departmentErr.length > 0}
                          helperText={this.state.departmentErr}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={
                    this.state.id.length !== 0
                      ? this.handleUpdate
                      : this.handleSave
                  }
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                >
                  {this.state.id.length !== 0 ? "Update" : "Add"}
                </Button>
              </DialogActions>
            </Dialog>
          </ThemeProvider>
          <MySnackBar
            snackMsg={this.state.snackMsg}
            snackVariant={this.state.snackVariant}
            snackOpen={this.state.snackOpen}
            onClose={() => this.setState({ snackOpen: false })}
          />
        </ThemeProvider>
      </div>
    );
  }
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const mapStateToProps = (state) => {
  console.log(state);
  return {
    getList: state.UserManagementReducer.getUserDetails,
    departmentList: state.UserManagementReducer.getUserDepartment,
    AdminList: state.UserManagementReducer.editAdmin,
  };
};
export default connect(mapStateToProps, {
  getUserDepartment,
  getUserDetails,
  editAdmin,
})(UserManagement);
