import React, { Component } from "react";
import { Autocomplete } from "@material-ui/lab";
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

import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
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
      update: false,
      snackMsg: "",
      snackVariant: "",
      snackOpen: false,
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
    this.props.viewTerm(page, size, keyword);
  };
  // Edit Handler
  handleEdit = (data) => {
    console.log(data, "________________");
    this.setState({
      id: data.id,
      username: data.username,
      password: null,
      show: true,
    });
  };
  // Dialog Open
  handleClickOpen = (e) => {
    this.setState({
      show: true,
      id: "",
      name: "",
    });
  };
  deleteHandler = (data) => {
    // this.props.deleteTerm(data.id);
  };
  componentDidMount() {
    this.props.getUserDepartment();
    this.props.getUserDetails();
  }
  //   componentDidUpdate(prevProps, prevState) {
  //     if (
  //       this.props.addTermList !== prevProps.addTermList ||
  //       this.props.updateTermList !== prevProps.updateTermList
  //     ) {
  //       this.props.viewTerm(0, 20, null);
  //     }
  //   }
  //   // Add term
  // //   addTerm() {
  //     // this.setState({ show: false });
  //     let hlptxt = "please fill the required field";
  //     isEmptyString(this.state.name)
  //       ? this.setState({ nameErr: hlptxt })
  //       : this.setState({ nameErr: "" });
  //     let newTermObj = {
  //       name: this.state.name,
  //     };
  //     if (this.state.name.length !== 0) {
  //       this.props.addTerm(newTermObj);
  //       this.setState({
  //         id: "",
  //         name: "",
  //         snackMsg: "Added Successfully",
  //         snackOpen: true,
  //         snackVariant: "success",
  //       });
  //     }
  //     this.props.viewTerm(0, 20, null);
  //   }
  //   // Update Term
  //   updateTerm() {
  //     // this.setState({ show: false });
  //     let hlptxt = "please fill the required field";
  //     isEmptyString(this.state.name)
  //       ? this.setState({ nameErr: hlptxt })
  //       : this.setState({ nameErr: "" });
  //     let newTermObj = {
  //       id: this.state.id,
  //       name: this.state.name,
  //     };
  //     if (this.state.name.length !== 0) {
  //       this.props.updateTerm(newTermObj);
  //       this.setState({
  //         id: "",
  //         name: "",
  //         update: true,
  //         snackMsg: "Updated Successfully",
  //         snackOpen: true,
  //         snackVariant: "success",
  //       });
  //     }
  //     this.props.viewTerm(0, 20, null);
  //   }
  render() {
    console.log(this.state, "++++++++++++++++");
    return (
      <div>
        <ThemeProvider>
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
                  onDelete={true}
                  onDeleteClick={this.deleteHandler}
                  title={""}
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
          <ThemeProvider>
            <Dialog
              TransitionComponent={Transition}
              open={this.state.show}
              onClose={(e) => this.setState({ show: false })}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0
                    ? "Edit Username"
                    : "Add Username"}
                </div>
                <div className="model-close-button">
                  <IconButton
                    aria-label="close"
                    onClick={(e) => this.setState({ show: false })}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <TextField
                      variant="outlined"
                      color="primary"
                      label="Enter Username"
                      fullWidth
                      error={this.state.usernameErr.length > 0}
                      helperText={this.state.usernameErr}
                      value={this.state.username}
                      onChange={(e) => this.setState({ name: e.target.value })}
                      multiline
                    />
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      variant="outlined"
                      color="primary"
                      label="Enter Password"
                      fullWidth
                    />
                  </Grid>
                  <Grid md={12}>
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      value={this.state.department}
                      options={this.props.departmentList?.data}
                      getOptionLabel={(option) => option.name}
                      onChange={(e, newValue) =>
                        this.setState({ department: newValue })
                      }
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Enter Role"
                          variant="outlined"
                          placeholder="Role"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={
                    this.state.id.length === 0
                      ? this.addTerm.bind(this)
                      : this.updateTerm.bind(this)
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
  };
};
export default connect(mapStateToProps, {
  getUserDepartment,
  getUserDetails,
  editAdmin,
})(UserManagement);
