import {
  CircularProgress,
  createTheme,
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
  addDegree,
  deleteDegree,
  getAllDegrees,
  getDegreePaginate,
  updateDegree,
} from "../Actions/Degree";
import "../Asset/All.css";
import MySnackBar from "./MySnackBar";
import TableComponent from "./TableComponent/TableComponent";

export class Degree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      id: "",
      degreeName: "",
      degreeType: "",
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
    this.props.getDegreePaginate(0, 20, null);
  }

  handleEdit = (data) => {
    this.setState({
      id: data.id,
      degreeName: data.name,
      degreeType: data.type,
      show: true,
    });
  };

  tableTheme = () =>
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
  handleClickOpen = (e) => {
    this.setState({
      show: true,
      id: "",
      degreeName: "",
      degreeType: "",
    });
  };

  handleClose = (e) => {
    this.setState({ show: false });
  };
  paginate = (page, size, keyword) => {
    this.props.getDegreePaginate(page, size, keyword);
  };

  rowClick = (rowData) => {};
  deleteHandler = (data) => {
    this.props.deleteDegree(data.id);
  };
  // Add Degree
  newDegree(e) {
    this.setState({ show: true });
    let newDegreeObj = {
      name: this.state.degreeName,
      type: this.state.degreeType,
    };

    if (this.state.degreeName.length !== 0) {
      this.props.addDegree(newDegreeObj);
      this.setState({
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
  updateDegree(e) {
    this.setState({ show: false });
    let newDegreeObj = {
      name: this.state.degreeName,
      type: this.state.degreeType,
    };
    if (this.state.degreeName.length !== 0) {
      this.props.updateDegree(this.state.id, newDegreeObj);

      this.setState({
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.addedDegree !== prevProps.addedDegree) {
      if (this.props.addedDegree.success) {
        this.props.getDegreePaginate(0, 20, null);
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
            message: this.props.addedDegree.message,
            color: "error",
          },
        });
      }
    }

    if (this.props.updatedDegree !== prevProps.updatedDegree) {
      if (this.props.updatedDegree.success) {
        this.props.getDegreePaginate(0, 20, null);
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
            message: this.props.updatedDegree.message,
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
          {this.props.paginatedAndFilteredDegree &&
          this.props.paginatedAndFilteredDegree.length !== 0 ? (
            <Grid container>
              <Grid item md={12}>
                <TableComponent
                  data={
                    this.props.paginatedAndFilteredDegree &&
                    this.props.paginatedAndFilteredDegree.length !== 0
                      ? this.props.paginatedAndFilteredDegree &&
                        this.props.paginatedAndFilteredDegree.content
                      : null
                  }
                  cols={this.col}
                  onRowClick={this.rowClick}
                  onSearch={this.paginate}
                  paginate={this.paginate}
                  totalCount={
                    this.props.paginatedAndFilteredDegree &&
                    this.props.paginatedAndFilteredDegree.totalElements
                  }
                  title={"Degree"}
                  pageCount={
                    this.props.paginatedAndFilteredDegree &&
                    this.props.paginatedAndFilteredDegree.totalPages
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

          {/* Add and Edit Degree Dialog */}

          <ThemeProvider theme={this.modeltheme()}>
            <Dialog
              TransitionComponent={Transition}
              open={this.state.show}
              // onClose={this.handleClose}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0 ? "Edit Degree" : "Add Degree"}
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
                  label="Enter Degree Name"
                  fullWidth
                  value={this.state.degreeName}
                  onChange={(e) =>
                    this.setState({ degreeName: e.target.value })
                  }
                />
                <TextField
                  variant="outlined"
                  color="primary"
                  label="Enter DegreeType"
                  rowsMin={3}
                  multiline
                  fullWidth
                  value={this.state.degreeType}
                  onChange={(e) =>
                    this.setState({ degreeType: e.target.value })
                  }
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={
                    this.state.id.length === 0
                      ? this.newDegree.bind(this)
                      : this.updateDegree.bind(this)
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
    addedDegree: state.DegreeReducer.addedDegree,
    updatedDegree: state.DegreeReducer.updatedDegree,
    allDegreeList: state.DegreeReducer.allDegreeList,
    deletedDegree: state.DegreeReducer.deletedDegree,
    paginatedAndFilteredDegree: state.DegreeReducer.paginatedAndFilteredDegree,
  };
};
export default connect(mapStateToProps, {
  getDegreePaginate,
  getAllDegrees,
  addDegree,
  updateDegree,
  deleteDegree,
})(Degree);
