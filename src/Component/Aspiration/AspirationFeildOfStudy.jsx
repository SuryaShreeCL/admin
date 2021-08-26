import React, { Component } from 'react'
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
  import {addFeild, viewFeild, updateFeild, deleteFeild} from "../../Actions/Aspiration"
  import TableComponent from "../TableComponent/TableComponent";
  import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
  import AddIcon from "@material-ui/icons/Add";
  import EditIcon from "@material-ui/icons/Edit";
  import DeleteIcon from "@material-ui/icons/Delete";
  import {connect} from 'react-redux';
import { data } from 'jquery';
import MySnackBar from '../MySnackBar';
import { isEmptyString } from '../Validation';
import Loader from '../Utils/controls/Loader'

export class AspirationFeildOfStudy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            id : "",
            name : "",
            nameErr:"",
            update : false,
            snackMsg: "",
            snackVariant: "",
            snackOpen: false,
        }
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
    spinnerTheme = () =>createMuiTheme({
      overrides :{
        MuiCircularProgress :  {
          colorPrimary:{
            color: "#009be5"
          }
        }
      }
    });
    // Row Click Handler
    rowClick = (rowData) => {
        
    };
    // Column
    col = [
      {
        title: "ID",
        fieldName: "id"},
      { title: "Feild Of Study", fieldName: "name" },
    ];
    // Pagination
    paginate = (page, size, keyword) => {
        this.props.viewFeild(page, size, keyword);
      };
    // Edit Handler
    handleEdit = (data) =>{
      this.setState({
        id : data.id,
        name : data.name,
        show : true,
      })
    } 
    // Dialog Open
    handleClickOpen = (e) => {
        this.setState({ 
          show: true,
          id : "",
          name : "",
        });
      };
      // Delete Handler

      deleteHandler = (data) =>{
        this.props.deleteFeild(data.id)
      }
    componentDidMount(){
        this.props.viewFeild(0, 20, null);
        }
        componentDidUpdate(prevProps,prevState){
          if(this.props.updateFeildList !== prevProps.updateFeildList || this.props.addFeildList !== prevProps.addFeildList) {
            this.props.viewFeild(0, 20, null);
          }
        }
    // Add term
    addFeild(){
        // this.setState({ show: false });
        let hlptxt = "please fill the required field"
        isEmptyString(this.state.name) ? this.setState({nameErr : hlptxt}) : this.setState({nameErr : ""})
        let newFeildObj = {
          name: this.state.name,
        };
        if (this.state.name.length !== 0) {
          this.props.addFeild(newFeildObj);
          this.setState({
            id: "",
            name: "",
            snackMsg:"Added Successfully",
            snackOpen:true,
            snackVariant:"success",
          });
        }
        this.props.viewFeild(0, 20, null);
    }
    // Update Term
    updateFeild(){
        // this.setState({ show: false });
        let hlptxt = "please fill the required field"
        isEmptyString(this.state.name) ? this.setState({nameErr : hlptxt}) : this.setState({nameErr : ""})
    let newFeildObj = {
      id : this.state.id,
      name: this.state.name,
    };
    if (this.state.name.length !== 0) {
      this.props.updateFeild(this.state.id, newFeildObj);
      this.setState({
        id: "",
        name: "",
        update: true,
        snackMsg:"Updated Successfully",
        snackOpen:true,
        snackVariant:"success",
      });      
    }
    this.props.viewFeild(0, 20, null);
  
    }
    render() {
        return (
            <div>
                <ThemeProvider theme={this.getmuitheme()}>
               <Grid container>
                   <Grid item md={12}>
                   {this.props.viewFeildList.length !== 0 ? (
            <TableComponent
              data={
                this.props.viewFeildList.length !== 0
                  ? this.props.viewFeildList.content
                  : null
              }
              cols={this.col}
              onRowClick={this.rowClick}
              onSearch={this.paginate}
              paginate={this.paginate}
              totalCount={this.props.viewFeildList.totalElements}
              title={"Feild Of Study"}
              pageCount={this.props.viewFeildList.totalPages}
              action={true}
              onEdit={true}              
              onEditClick={this.handleEdit}
              onDelete={true}
              onDeleteClick = {this.deleteHandler}
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
          {/* <CircularProgress
         color="primary"
          variant="indeterminate"
          size = "3rem"
          thickness="3"
           /> */}
           <Loader />
           </div>
          </ThemeProvider>
          )}
                   </Grid>
               </Grid>
                {/* Add and Edit Aspiration Feild Of Study */}
                <ThemeProvider theme={this.modeltheme()}>
            <Dialog
            TransitionComponent={Transition}
              open={this.state.show}
              onClose={(e)=>this.setState({show : false})}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0 ? "Edit Feild Of Study" : "Add Feild Of Study"}
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
                  label="Enter Feild Of Study"
                  fullWidth
                  value={this.state.name}
                  error={this.state.nameErr.length > 0}
                  helperText={this.state.nameErr}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  multiline
                />
                       
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={
                    this.state.id.length === 0
                      ? this.addFeild.bind(this)
                      : this.updateFeild.bind(this)
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
                <MySnackBar 
                snackMsg={this.state.snackMsg}
                snackVariant={this.state.snackVariant}
                snackOpen={this.state.snackOpen}
                onClose={() => this.setState({ snackOpen: false })}
                />
            </div>
        )
    }
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const mapStateToProps=(state)=>{
  return {
    viewFeildList: state.AspirationReducer.viewFeildList,
    addFeildList : state.AspirationReducer.addFeildList,
    updateFeildList : state.AspirationReducer.updateFeildList

  }
}
export default connect(mapStateToProps,{viewFeild, addFeild, updateFeild, deleteFeild})(AspirationFeildOfStudy)
