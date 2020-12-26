import React, { Component } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
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
} from "@material-ui/core";
import TableComponent from "../TableComponent/TableComponent";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import {viewSpecialization, addSpecialization, updateSpecialization, deleteSpecialization} from "../../Actions/Aspiration"

export class AspirationArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      id: "",
      name: "",
      update: false,
    };
  }
  // Component Theme
  getmuitheme = () =>
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
  // Model Theme
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
    col = [
      {
        title: "ID",
        fieldName: "id"},
      { title: "Area Of Specialization", fieldName: "name" },
    ];
  
  // Row Click Handler
  rowClick = (rowData) => {};
  // Pagination
  paginate = (page, size, keyword) => {
    this.props.viewSpecialization(page, size, keyword);
  };
  // Dialog Open
  handleClickOpen = (e) => {
    this.setState({ 
      show: true,
      id : "",
      name : "",
    });
  };
  // Component DidMount
  componentDidMount() {
    this.props.viewSpecialization(0, 20, null);
  }
  // Handle Edit
  handleEdit = (data) => {
    this.setState({
      id : data.id,
      name : data.name,
      show : true,
    })
};
  // Delete Handler
  deleteHandler = (data) =>{
    // this.props.deleteSpecialization(data.id)
  }
  // Add term
  addArea() {
    this.setState({ show: false });
    let newAreaObj = {
      name: this.state.name,
    };
    if (this.state.name.length !== 0) {
      this.props.addSpecialization(newAreaObj);
      this.setState({
        id: "",
        name: "",
      });
    }
    this.props.viewSpecialization(0, 20, null);
  }
  // Update Term
  updateArea() {
    this.setState({ show: false });
    let newAreaObj = {
      id : this.state.id,
      name: this.state.name,
    };
    if (this.state.name.length !== 0) {
      this.props.updateSpecialization(newAreaObj);
      this.setState({
        id: "",
        name: "",
        update: true,
      });
    }
    this.props.viewSpecialization(0, 20, null);
  }
  render() {
    return (
      <div>
        <ThemeProvider theme={this.getmuitheme()}>
          <Grid container>
            <Grid item md={12}>
              {this.props.viewSpecializationList.length !== 0 ? (
                <TableComponent
                  data={
                    this.props.viewSpecializationList.length !== 0
                      ? this.props.viewSpecializationList.content
                      : null
                  }
                  cols={this.col}
                  onRowClick={this.rowClick}
                  onSearch={this.paginate}
                  paginate={this.paginate}
                  totalCount={
                    this.props.viewSpecializationList.totalElements
                  }
                  title={"Area Of Specialization"}
                  pageCount={this.props.viewSpecializationList.totalPages}
                  onDelete={true}
                  onDeleteClick={this.deleteHandler}
                  action={true}
                  onEdit={true}
                  onEditClick={this.handleEdit}
                  add={true}
                  onAddClick={this.handleClickOpen}
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
            </Grid>
          </Grid>
          {/* Add and Edit Aspiration Area Of Specialization */}
          <ThemeProvider theme={this.modeltheme()}>
            <Dialog
            TransitionComponent={Transition}
              open={this.state.show}
              onClose={(e) => this.setState({ show: false })}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0
                    ? "Edit Area Of Specialization"
                    : "Add Area Of Specialization"}
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
                <TextField
                  variant="outlined"
                  color="primary"
                  label="Enter Area Of Specialization Name"
                  fullWidth
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  multiline
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={
                    this.state.id.length===0
                      ? this.addArea.bind(this)
                      : this.updateArea.bind(this)
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
const mapStateToProps=(state)=>{
    return {
      viewSpecializationList: state.AspirationReducer.viewSpecializationList,
    }
}
export default connect(mapStateToProps,{viewSpecialization, addSpecialization, updateSpecialization, deleteSpecialization})(AspirationArea)
