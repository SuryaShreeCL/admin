import React, { Component, forwardRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { URL } from "../Actions/URL";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {addDepartment, updateNewDepartment,deleteDepartment} from "../Actions/Department"
import { getBranches, getPaginateDegree } from "../Actions/College";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TableComponent from "./TableComponent/TableComponent";
import Snackbar from '@material-ui/core/Snackbar';
import MaterialTable from "material-table";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  CircularProgress,
Slide
} from "@material-ui/core"
import { isEmptyString } from "./Validation";

export class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id : "",
      description : "",
      show : false,
      name : "",
      update : false,
      snack : false,
      nameErr : "",
      descErr : ""
    };
  }

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

  col = [
    { title: "Id", fieldName: "id" },
    { title: "Name", fieldName: "name" },
  ];

  componentDidMount() {
    this.props.getPaginateDegree(0, 20, null);
  }

  rowClick = (rowData) => {

  };

  paginate = (page, size, keyword) => {
    this.props.getPaginateDegree(page, size, keyword);
  };

  handleEdit = (data) => {
      this.setState({
        id : data.id,
        name : data.name,
        show : true,
      })
  };
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
  // Dialog Open
  handleOpen = () =>{
    this.setState({
      show : true,
      id : "",
      name : "",
      description : "",
    })
  }
  // Delete Handler
  deleteHandler = (data) =>{
    // this.props.deleteDepartment(data.id)
  }
  // Add And Edit For Department
  newDepartment = ()=>{
    // this.setState({ show: false });
    let hlptxt = "Please fill the Required Field"
    isEmptyString(this.state.description) ? this.setState ({ descErr : hlptxt }) : this.setState ({ descErr : "" }) 
    isEmptyString(this.state.name) ? this.setState ({ nameErr : hlptxt }) : this.setState ({ nameErr : ""})
    let newDeptObj = {
      name: this.state.name, 
      description : this.state.description       
    };
    if (this.state.name.length !== 0 &&
        !isEmptyString(this.state.description) &&
        !isEmptyString(this.state.name)
      ) {
      this.props.addDepartment(newDeptObj);
      this.setState({
        id: "",
        name: "",    
        description : "",
        snack : true,              
      });
    }
    this.props.getPaginateDegree(0, 20, null);

}

updateDepartment = () =>{
    // this.setState({ show: false });
    let hlptxt = "Please fill the Required Field"
    isEmptyString(this.state.description) ? this.setState ({ descErr : hlptxt }) : this.setState ({ descErr : "" }) 
    isEmptyString(this.state.name) ? this.setState ({ nameErr : hlptxt }) : this.setState ({ nameErr : ""})
let newDeptObj = {
  name: this.state.name,
  description: this.state.description,      
};
if (this.state.name.length !== 0 &&
  !isEmptyString(this.state.description) &&
  !isEmptyString(this.state.name)
  ) {
  this.props.updateNewDepartment(this.state.id, newDeptObj);
  this.setState({
    id: "",
    name: "",
    description: "",        
    update: true,
  });      
}
this.props.getPaginateDegree(0, 20, null);

}

  render() {
    console.log(this.props.PaginateDegreeList)
    return (
      <ThemeProvider theme={this.tableTheme()}>
        <div>
          {this.props.PaginateDegreeList.length !== 0 ? (
            <TableComponent
              data={
                this.props.PaginateDegreeList.length !== 0
                  ? this.props.PaginateDegreeList.content
                  : null
              }
              cols={this.col}
              onRowClick={this.rowClick}
              onSearch={this.paginate}
              paginate={this.paginate}
              totalCount={this.props.PaginateDegreeList.totalElements}
              title={"Department"}
              pageCount={this.props.PaginateDegreeList.totalPages}
              action={true}
              onDelete={true}
              onDeleteClick={this.deleteHandler}
              onEdit={true}              
              onEditClick={this.handleEdit}
              add={true}
              onAddClick={this.handleOpen}
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
         {/* Add and Edit Department */}
         <ThemeProvider theme={this.modeltheme()}>
            <Dialog
            TransitionComponent={Transition}
              open={this.state.show}
              onClose={(e)=>this.setState({show : false})}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0 ? "Edit Department" : "Add Department"}
                </div>
                <div className="model-close-button">
                  <IconButton aria-label="close" onClick={(e)=>this.setState({show : false})}>
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
                  error={this.state.nameErr.length > 0 }
                  helperText={this.state.nameErr}
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  multiline
                />
                <TextField
                  variant="outlined"
                  color="primary"
                  label="Description"
                  rowsMin={3}
                  multiline
                  fullWidth
                  error={this.state.descErr.length > 0}
                  helperText= {this.state.descErr}
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
                      ? this.newDepartment
                      : this.updateDepartment
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
    );
  }
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const mapStateToProps = (state) => {
  return {
    DepartmentList: state.CollegeReducer.BranchList,
    PaginateDegreeList: state.CollegeReducer.PaginateDegreeList,
  };
};
export default connect(mapStateToProps, { getBranches, getPaginateDegree, addDepartment, updateNewDepartment ,deleteDepartment})(
  Department
);
