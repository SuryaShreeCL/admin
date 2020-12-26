import React, { Component } from 'react';
import MaterialTable from 'material-table';
import {tableIcons} from './MaterialTableIcon';
import {ThemeProvider,createMuiTheme} from '@material-ui/core/styles'
import {connect} from 'react-redux';
import TableComponent from "./TableComponent/TableComponent";
import {getPaginateUniversity} from "../Actions/College"
import {getUniversity,addUniversity,updateUniversity,deleteUniversity} from '../Actions/College';
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
import {CircularProgress, Slide} from "@material-ui/core";

export  class University extends Component {

    constructor(props){
        super(props);
        this.state = {
            show: false,
            id: "",
            name: "",
            description: "",            
            msg: false,
            update: false,
          };
    }

    componentDidMount(){
        // this.props.getUniversity();
        this.props.getPaginateUniversity(0, 20, null);

    }
    col=[
        {fieldName:'id',title:'Id'},
        {fieldName:'name',title:'Name'},
    ];
    paginate = (page, size, keyword) => {
      this.props.getPaginateUniversity(page, size, keyword);
    };
  
    rowClick = (rowData) => {
        
    };
    handleEdit = (data) => {
      this.setState({
        id : data.id,
        name : data.name,
        show : true,
      })
  };
  
  deleteHandler = (data) =>{
      // this.props.deleteUniversity(data.id)
  }

    tableTheme = () =>
    createMuiTheme({
      overrides: {
        MuiSvgIcon: {
          root: {
            color: "unset",
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

    newUniversity(){
        this.setState({ show: false });
        let newCollegeObj = {
          name: this.state.name,
          description: this.state.description,          
        };
        if (this.state.name.length !== 0) {
          this.props.addUniversity(newCollegeObj);
          this.setState({
            id: "",
            name: "",
            description: "",                   
          });
        }
        this.props.getPaginateUniversity(0, 20, null);
    }
    updateUniversity(){
        this.setState({ show: false });
    let newCollegeObj = {
      name: this.state.name,
      description: this.state.description,      
    };
    if (this.state.name.length !== 0) {
      this.props.updateUniversity(this.state.id, newCollegeObj);
      this.setState({
        id: "",
        name: "",
        description: "",        
        update: true,
      });      
    }
    this.props.getPaginateUniversity(0, 20, null);
  
    }

    handleClickOpen = (e) => {
        this.setState({ 
          show: true,
          id : "",
          name : "",
          description : "",
        });
      };
    
      handleClose = (e) => {
        this.setState({ show: false });
      };

    render() {    
      console.log(this.props)    
        return (
            <div>
              {this.props.paginateUniversityList.length !== 0 ? (
                <ThemeProvider theme={this.tableTheme()}>
            <TableComponent
              data={
                this.props.paginateUniversityList.length !== 0
                  ? this.props.paginateUniversityList.content
                  : null
              }
              cols={this.col}
              onRowClick={this.rowClick}
              onSearch={this.paginate}
              paginate={this.paginate}
              totalCount={this.props.paginateUniversityList.totalElements}
              title={"University"}
              pageCount={this.props.paginateUniversityList.totalPages}
              action={true}
              onDelete={true}
              onDeleteClick={this.deleteHandler}
              onEdit={true}              
              onEditClick={this.handleEdit}
              add={true}
              onAddClick={this.handleClickOpen}
            />
            </ThemeProvider>
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
                {/* <ThemeProvider theme={this.tableTheme}>
                <MaterialTable 
                icons={tableIcons}
                columns={this.Col}
                data={this.props.University}
                title='University'
                actions={[
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddIcon />}
                          size="small"
                        >
                          Add University
                        </Button>
                      ),
                      tooltip: "Create Course",
                      isFreeAction: true,
                      onClick: (e) =>
                        this.setState({
                          id: "",
                          name: "",
                          description: "",                          
                          show: true,
                        }),
                    },
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<EditIcon />}
                          size="small"
                        >
                          Edit
                        </Button>
                      ),
                      tooltip: "Edit Course",
                      onClick: (e, row) => {
                        this.setState({
                          id: row.id,
                          name: row.name,
                          description: row.description,                          
                          show: true,
                        });
                      },
                    },
                    {
                      icon: () => (
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<DeleteIcon />}
                          size="small"
                          disabled
                        >
                          Delete
                        </Button>
                      ),
                      tooltip: "Delete Course",
                    },
                  ]}
                  options={{
                    actionsColumnIndex: -1,
                    search: true,
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    minBodyHeight: "420px",
                    maxBodyHeight: "420px",
                  }}               
                />
                </ThemeProvider> */}


                {/* add and edit university */}
                <ThemeProvider theme={this.modeltheme()}>
            <Dialog
            TransitionComponent={Transition}
              open={this.state.show}
              onClose={this.handleClose}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0 ? "Edit University" : "Add University"}
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
                  label="Enter University Name"
                  fullWidth
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  multiline
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
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={
                    this.state.id.length === 0
                      ? this.newUniversity.bind(this)
                      : this.updateUniversity.bind(this)
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
        )
    }
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const mapStateToProps=(state)=>{
    return { 
        University:state.CollegeReducer.University,  
        paginateUniversityList: state.CollegeReducer.paginateUniversityList,
      
    }    
}
export default connect(mapStateToProps,{getUniversity,addUniversity,updateUniversity,deleteUniversity,getPaginateUniversity})(University)