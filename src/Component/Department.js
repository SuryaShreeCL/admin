import {
  CircularProgress,
  createMuiTheme,
  Grid,
  Slide,
  ThemeProvider,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addDepartment,
  deleteDepartment,
  getAllDepartments,
  getDepartmentPaginate,
  updateNewDepartment,
} from "../Actions/Department";
import "../Asset/All.css";
import MySnackBar from "./MySnackBar";
import TableComponent from "./TableComponent/TableComponent";

export class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      id: "",
      departmentName: "",
      description: "",
      msg: false,
      update: false,
      snack: {
        open: false,
        message: "",
        color: "",
      },
    };
  }

  col = [
    {
      title: "ID",
      fieldName: "id",
    },
    { title: "Name", fieldName: "name" },
  ];

  componentDidMount() {
    this.props.getDepartmentPaginate(0, 20, null);
  }

  handleEdit = (data) => {
    this.setState({
      id: data.id,
      departmentName: data.name,
      description: data.description,
      show: true,
    });
  };

  tableTheme = () =>
    createMuiTheme({
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

  modeltheme = () =>
    createMuiTheme({
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
    createMuiTheme({
      overrides: {
        MuiCircularProgress: {
          colorPrimary: {
            color: "#009be5",
          },
        },
      },
    });
  handleClickOpen = (e) => {
    this.setState({
      show: true,
      id: "",
      departmentName: "",
      description: "",
    });
  };

  handleClose = (e) => {
    this.setState({ show: false });
  };
  paginate = (page, size, keyword) => {
    this.props.getDepartmentPaginate(page, size, keyword);
  };

  rowClick = (rowData) => {};
  deleteHandler = (data) => {
    this.props.deleteDepartment(data.id);
  };
  // Add Degree
  addDepartment(e) {
    this.setState({ show: true });
    let reqBody = {
      name: this.state.departmentName,
      description: this.state.description,
    };

    if (this.state.departmentName.length !== 0) {
      this.props.addDepartment(reqBody);
      this.setState({
        id: "",
        departmentName: "",
        description: "",
        show: false,
      });
    } else {
      this.setState({
        show: true,
        snack: {
          open: true,
          message: "Please Fill the Required Field",
          color: "error",
        },
      });
    }
  }
  // Update degree
  updateDepartment(e) {
    this.setState({ show: false });
    let reqBody = {
      name: this.state.departmentName,
      description: this.state.description,
    };
    if (this.state.departmentName.length !== 0) {
      this.props.updateNewDepartment(this.state.id, reqBody);
      this.setState({
        id: "",
        departmentName: "",
        description: "",
        update: true,
        show: false,
      });
    } else {
      this.setState({
        show: true,
        snack: {
          open: true,
          message: "Please Fill the Required Field",
          color: "error",
        },
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.addedDepartment !== prevProps.addedDepartment) {
      if (this.props.addedDepartment.statusText === "Created") {
        this.setState({
          snack: {
            open: true,
            message: "Added Successfully",
            color: "success",
          },
        });
        this.props.getDepartmentPaginate(0, 20, null);
      } else {
        this.setState({
          snack: {
            open: true,
            message: this.props.addedDepartment.message,
            color: "error",
          },
        });
      }
    }

    if (this.props.updatedDepartment !== prevProps.updatedDepartment) {
      if (this.props.updatedDepartment.success) {
        this.props.getDepartmentPaginate(0, 20, null);
        this.setState({
          snack: {
            open: true,
            message: "Updated Successfully",
            color: "success",
          },
        });
      } else {
        this.setState({
          snack: {
            open: true,
            message: this.props.updatedDepartment.message,
            color: "error",
          },
        });
      }
    }
  }

  render() {
    return (
      <ThemeProvider theme={this.tableTheme()}>
        <div>
          {this.props.paginatedAndFilteredDepartment &&
          this.props.paginatedAndFilteredDepartment.length !== 0 ? (
            <Grid container>
              <Grid item md={12}>
                <TableComponent
                  data={
                    this.props.paginatedAndFilteredDepartment &&
                    this.props.paginatedAndFilteredDepartment.length !== 0
                      ? this.props.paginatedAndFilteredDepartment &&
                        this.props.paginatedAndFilteredDepartment.content
                      : null
                  }
                  cols={this.col}
                  onRowClick={this.rowClick}
                  onSearch={this.paginate}
                  paginate={this.paginate}
                  totalCount={
                    this.props.paginatedAndFilteredDepartment &&
                    this.props.paginatedAndFilteredDepartment.totalElements
                  }
                  title={"Department"}
                  pageCount={
                    this.props.paginatedAndFilteredDepartment &&
                    this.props.paginatedAndFilteredDepartment.totalPages
                  }
                  action={true}
                  disableDelete
                  onDelete={true}
                  onDeleteClick={this.deleteHandler}
                  onEdit={true}
                  onEditClick={this.handleEdit}
                  add={true}
                  onAddClick={this.handleClickOpen}
                />
              </Grid>
            </Grid>
          ) : (
            <ThemeProvider theme={this.spinnerTheme()}>
              <div className={"circularProgress_div"}>
                <CircularProgress
                  color="primary"
                  variant="indeterminate"
                  size="3rem"
                  thickness="3"
                />
              </div>
            </ThemeProvider>
          )}

          {/* Add and Edit department Dialog */}

          <ThemeProvider theme={this.modeltheme()}>
            <Dialog
              TransitionComponent={Transition}
              open={this.state.show}
              // onClose={this.handleClose}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0
                    ? "Edit Department"
                    : "Add Department"}
                </div>
                <div className="model-close-button">
                  <IconButton aria-label="close" onClick={this.handleClose}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </DialogTitle>
              <DialogContent>
                <TextField
                  variant="outlined"
                  color="primary"
                  label="Enter Department Name"
                  fullWidth
                  value={this.state.departmentName}
                  onChange={(e) =>
                    this.setState({ departmentName: e.target.value })
                  }
                />
                <TextField
                  variant="outlined"
                  color="primary"
                  label="Enter Description"
                  rowsMin={3}
                  multiline
                  fullWidth
                  value={this.state.description}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={
                    this.state.id.length === 0
                      ? this.addDepartment.bind(this)
                      : this.updateDepartment.bind(this)
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
        </div>
        <MySnackBar
          snackOpen={this.state.snack.open}
          snackVariant={this.state.snack.color}
          snackMsg={this.state.snack.message}
          onClose={() =>
            this.setState({
              snack: {
                open: false,
                message: "",
                color: "",
              },
            })
          }
        />
      </ThemeProvider>
    );
  }
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const mapStateToProps = (state) => {
  return {
    paginatedAndFilteredDepartment:
      state.DepartmentReducer.paginatedAndFilteredDepartment,
    addedDepartment: state.DepartmentReducer.addedDepartment,
    updatedDepartment: state.DepartmentReducer.updatedDepartment,
  };
};
export default connect(mapStateToProps, {
  addDepartment,
  updateNewDepartment,
  deleteDepartment,
  getDepartmentPaginate,
  getAllDepartments,
})(Department);
