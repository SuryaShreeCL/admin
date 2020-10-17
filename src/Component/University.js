import React, { Component } from 'react';
import MaterialTable from 'material-table';
import {tableIcons} from './MaterialTableIcon';
import {ThemeProvider,createMuiTheme} from '@material-ui/core/styles'
import {connect} from 'react-redux';
import {getUniversity,addUniversity,updateUniversity} from '../Actions/College';
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
        this.props.getUniversity();
    }
    Col=[
        {field:'id',title:'Id'},
        {field:'name',title:'Name'},
        {field:'description',title:'Description'},
    ];

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
    }
    updateUniversity(){
        this.setState({ show: false });
    let newCollegeObj = {
      name: this.state.name,
      description: this.state.description,      
    };
    if (this.state.name.length !== 0) {
      //this.props.updateColleges(this.state.id, newCollegeObj);
      this.setState({
        id: "",
        name: "",
        description: "",        
        update: true,
      });      
    }
    this.props.getAllColleges();
    }

    handleClickOpen = (e) => {
        this.setState({ show: true });
      };
    
      handleClose = (e) => {
        this.setState({ show: false });
      };

    render() {        
        return (
            <div>
                <ThemeProvider theme={this.tableTheme}>
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
                </ThemeProvider>


                {/* add and edit university */}
                <ThemeProvider theme={this.modeltheme()}>
            <Dialog
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

const mapStateToProps=(state)=>{
    return { 
        University:state.CollegeReducer.University,        
    }    
}
export default connect(mapStateToProps,{getUniversity,addUniversity})(University)