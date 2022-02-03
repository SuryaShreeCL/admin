import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllColleges,
  addColleges,
  updateColleges,
  deleteCollege
} from "../Actions/College";
import {getPaginateCollege} from "../Actions/College"
import TableComponent from "./TableComponent/TableComponent";
import { ThemeProvider, createMuiTheme, CircularProgress , Slide} from "@material-ui/core";
import MaterialTable from "material-table";
import { tableIcons } from "./MaterialTableIcon";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import MySnackBar from "./MySnackBar";
export class College extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      id: "",
      name: "",
      description: "",
      logoURL: "",
      msg: false,
      update: false,
      description : null,
      snack : {
        open : false,
        message : "",
        color : ""
      }
    };
  }

  col = [
    {
      title: "ID",
      fieldName: "id"},
    { title: "Name", fieldName: "name" },
  ];

  componentDidMount() {
    // this.props.getAllColleges();
    this.props.getPaginateCollege(0, 20, null);
  }
  handleEdit = (data) => {
    console.log(data)
    this.setState({
      id : data.id,
      name : data.name,
      logoURL : data.logoURL,
      description : data.description,
      show : true,
    })
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
    spinnerTheme = () =>createMuiTheme({
      overrides :{
        MuiCircularProgress :  {
          colorPrimary:{
            color: "#009be5"
          }
        }
      }
    });
  handleClickOpen = (e) => {
    this.setState({ 
      show: true,
    id : "",
    name : "",
    description : "",
    logoURL : ""
    });
  };

  handleClose = (e) => {
    this.setState({ show: false });
  };
  paginate = (page, size, keyword) => {
    this.props.getPaginateCollege(page, size, keyword);
  };

  rowClick = (rowData) => {
      
  };
  deleteHandler = (data) =>{
    this.props.deleteCollege(data.id)
  }
  // Add College
  newCollege(e) {
    this.setState({ show: false });
    let newCollegeObj = {
      name: this.state.name,
      description: this.state.description,
      logoURL : this.state.logoURL,
      status : null
    };
    if (this.state.name.length !== 0) {
      this.props.addColleges(newCollegeObj);
      this.setState({
        id: "",
        name: "",
        description: "",
        logoURL : "",   
      });
    }
  }
  // Update College
  updateCollege(e) {
    this.setState({ show: false });
    let newCollegeObj = {
      name: this.state.name,
      description: this.state.description,
      logoURL: this.state.logoURL,
    };
    if (this.state.name.length !== 0) {
      this.props.updateColleges(this.state.id, newCollegeObj);
      this.setState({
        id: "",
        name: "",
        description: "",
        logoURL: "",
        update: true,
      });      
    }
    this.props.getAllColleges();
  }

  componentDidUpdate(prevProps){
    if(this.props.addCollegeStatus !== prevProps.addCollegeStatus){
      if(this.props.addCollegeStatus.success){
        this.props.getAllColleges();
      }else{
        this.setState({
          snack : {
            open : true,
            message : this.props.addCollegeStatus.message,
            color : "error"
          }
        })
      }
    }
    if(this.props.updateCollegeStatus !== prevProps.updateCollegeStatus){
      if(this.props.updateCollegeStatus.success){
        this.props.getAllColleges();
      }else{
        this.setState({
          snack : {
            open : true,
            message : this.props.updateCollegeStatus.message,
            color : "error"
          }
        })
      }
    }
  }

  render() {   
    
    console.log(this.props, "+++++++++++++++++")
    return (
      <ThemeProvider theme={this.tableTheme()}>
        <div>
        {this.props.paginateCollegeList.length !== 0 ? (
            <TableComponent
              data={
                this.props.paginateCollegeList.length !== 0
                  ? this.props.paginateCollegeList.content
                  : null
              }
              cols={this.col}
              onRowClick={this.rowClick}
              onSearch={this.paginate}
              paginate={this.paginate}
              totalCount={this.props.paginateCollegeList.totalElements}
              title={"College"}
              pageCount={this.props.paginateCollegeList.totalPages}
              action={true}
              disableDelete
              onDelete={true}
              onDeleteClick={this.deleteHandler}
              onEdit={true}              
              onEditClick={this.handleEdit}
              add={true}
              onAddClick={this.handleClickOpen}
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
         
          {/* Add and Edit College Dialog */}

          <ThemeProvider theme={this.modeltheme()}>
            <Dialog
            TransitionComponent={Transition}
              open={this.state.show}
              onClose={this.handleClose}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0 ? "Edit College" : "Add College"}
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
                  label="Enter College Name"
                  fullWidth
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
                <TextField
                  variant="outlined"
                  color="primary"
                  label="description"
                  rowsMin={3}
                  multiline
                  fullWidth
                  value={this.state.description}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
                <TextField
                  variant="outlined"
                  color="primary"
                  label="Logo Url"
                  rowsMin={3}
                  multiline
                  fullWidth
                  value={this.state.logoURL}
                  onChange={(e) => this.setState({ logoURL: e.target.value })}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={
                    this.state.id.length === 0
                      ? this.newCollege.bind(this)
                      : this.updateCollege.bind(this)
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
        onClose={()=>this.setState({
          snack : {
            open : false,
            message : "",
            color : ""
          }
        })}
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
    AllCollegeList: state.CollegeReducer.allCollegeList,
    paginateCollegeList: state.CollegeReducer.paginateCollegeList,
    addCollegeStatus : state.CollegeReducer.addCollegeStatus,
    updateCollegeStatus : state.CollegeReducer.updateCollegeStatus

  };
};
export default connect(mapStateToProps, {
  getAllColleges,
  addColleges,
  updateColleges,
  deleteCollege,
  getPaginateCollege,
})(College);
