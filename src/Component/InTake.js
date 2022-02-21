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
  addIntake,
  deleteIntake,
  getAllIntakes,
  getPaginateIntake,
  updateIntake,
} from "../Actions/InTake";
import "../Asset/All.css";
import MySnackBar from "./MySnackBar";
import TableComponent from "./TableComponent/TableComponent";

export class InTake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      id: "",
      intakeTerm: "",
      intakeYear: "",
      msg: false,
      update: false,
      snack: {
        open: false,
        message: "",
        color: "",
      },
    };
  }

  /**table columns */
  col = [
    {
      title: "ID",
      fieldName: "id",
    },
    { title: "Name", fieldName: "name" },
  ];

  componentDidMount() {
    this.props.getPaginateIntake(0, 20, null);
  }

  handleEdit = (data) => {
    this.setState({
      id: data.id,
      intakeTerm: data.term,
      intakeYear: data.year,
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
      intakeTerm: "",
      intakeYear: "",
    });
  };

  handleClose = (e) => {
    this.setState({ show: false });
  };
  paginate = (page, size, keyword) => {
    this.props.getPaginateIntake(page, size, keyword);
  };

  rowClick = (rowData) => {};
  deleteHandler = (data) => {
    this.props.deleteIntake(data.id);
  };
  // Add intake
  addIntake(e) {
    this.setState({ show: true });
    let reqBody = {
      term: this.state.intakeTerm,
      year: this.state.intakeYear,
    };

    if (
      this.state.intakeTerm.length !== 0 &&
      this.state.intakeYear.length !== 0
    ) {
      this.props.addIntake(reqBody);
      this.setState({
        id: "",
        intakeTerm: "",
        intakeYear: "",
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
  // Update intake
  updateIntake(e) {
    this.setState({ show: false });
    let reqBody = {
      term: this.state.intakeTerm,
      year: this.state.intakeYear,
    };
    if (
      (this.state.intakeTerm && this.state.intakeTerm.length !== 0) ||
      (this.state.intakeYear && this.state.intakeYear.length !== 0)
    ) {
      this.props.updateIntake(this.state.id, reqBody);
      this.setState({
        id: "",
        intakeTerm: "",
        intakeYear: "",
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
    this.props.getAllIntakes();
  }

  componentDidUpdate(prevProps) {
    /**add */
    if (this.props.addedIntake !== prevProps.addedIntake) {
      if (this.props.addedIntake.success) {
        this.props.getPaginateIntake(0, 20, null);
        this.setState({
          snack: {
            open: true,
            message: "Added Successfully",
            color: "success",
          },
        });
      } else {
        this.setState({
          snack: {
            open: true,
            message: this.props.addedIntake.message,
            color: "error",
          },
        });
      }
    }
    /**edit */
    if (this.props.updatedIntake !== prevProps.updatedIntake) {
      if (this.props.updatedIntake.statusCode === "OK") {
        this.props.getPaginateIntake(0, 20, null);
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
            message: this.props.updatedIntake.body.message,
            color: "error",
          },
        });
      }
    }
    /**delete  */
    if (this.props.deletedIntake !== prevProps.deletedIntake) {
      if (this.props.deletedIntake.status === 200) {
        this.props.getPaginateIntake(0, 20, null);
        this.setState({
          snack: {
            open: true,
            message: "Deleted Successfully",
            color: "success",
          },
        });
      } else {
        this.setState({
          snack: {
            open: true,
            message: this.props.deletedIntake.message,
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
          {this.props.paginatedFilteredIntake &&
          this.props.paginatedFilteredIntake.length !== 0 ? (
            <Grid container>
              <Grid item md={12}>
                <TableComponent
                  data={
                    this.props.paginatedFilteredIntake &&
                    this.props.paginatedFilteredIntake.length !== 0
                      ? this.props.paginatedFilteredIntake &&
                        this.props.paginatedFilteredIntake.content
                      : null
                  }
                  cols={this.col}
                  onRowClick={this.rowClick}
                  onSearch={this.paginate}
                  paginate={this.paginate}
                  totalCount={
                    this.props.paginatedFilteredIntake &&
                    this.props.paginatedFilteredIntake.totalElements
                  }
                  title={"InTake"}
                  pageCount={
                    this.props.paginatedFilteredIntake &&
                    this.props.paginatedFilteredIntake.totalPages
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

          {/* Add and Edit intake Dialog */}

          <ThemeProvider theme={this.modeltheme()}>
            <Dialog
              TransitionComponent={Transition}
              open={this.state.show}
              onClose={this.handleClose}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0 ? "Edit InTake" : "Add InTake"}
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
                  label="Enter Term"
                  fullWidth
                  value={this.state.intakeTerm}
                  onChange={(e) =>
                    this.setState({ intakeTerm: e.target.value })
                  }
                />
                <TextField
                  variant="outlined"
                  color="primary"
                  label="Enter Year"
                  rowsMin={3}
                  multiline
                  fullWidth
                  value={this.state.intakeYear}
                  onChange={(e) =>
                    this.setState({ intakeYear: e.target.value })
                  }
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={
                    this.state.id.length === 0
                      ? this.addIntake.bind(this)
                      : this.updateIntake.bind(this)
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
    addedIntake: state.InTakeReducer.addedIntake,
    updatedIntake: state.InTakeReducer.updatedIntake,
    allIntakeList: state.InTakeReducer.allIntakeList,
    deletedIntake: state.InTakeReducer.deletedIntake,
    paginatedFilteredIntake: state.InTakeReducer.paginatedFilteredIntake,
  };
};
export default connect(mapStateToProps, {
  addIntake,
  updateIntake,
  deleteIntake,
  getAllIntakes,
  getPaginateIntake,
})(InTake);
