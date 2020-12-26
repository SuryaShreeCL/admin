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
  import TableComponent from "../TableComponent/TableComponent";
  import {viewDegree,addDegree,updateDegree,deleteDegree} from "../../Actions/Aspiration"
  import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
  import AddIcon from "@material-ui/icons/Add";
  import EditIcon from "@material-ui/icons/Edit";
  import DeleteIcon from "@material-ui/icons/Delete";
  import {connect} from 'react-redux';
export class AspirationDegree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            id : "",
            name : "",
            update : false,
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
    col = [
      {
        title: "ID",
        fieldName: "id"},
      { title: "Degree", fieldName: "name" },
    ];
    // Row Click Handler
    rowClick = (rowData) => {
        
    };
    // Pagination
    paginate = (page, size, keyword) => {
        this.props.viewDegree(page, size, keyword);
      };
    // Edit Handler
    handleEdit = (data) => {
      this.setState({
        id : data.id,
        name : data.name,
        show : true,
      })
  };
    // Dialog Open
    handleClickOpen = (e) => {
        this.setState({ 
          show: true,
        id : "",
        name : ""
        });
      };
    componentDidMount(){
        this.props.viewDegree(0, 20, null);
        }
    // Add term
    addDegree(){
        this.setState({ show: false });
        let newDegreeObj = {
          name: this.state.name,
        };
        if (this.state.name.length !== 0) {
          this.props.addDegree(newDegreeObj);
          this.setState({
            id: "",
            name: "",
          });
        }
        this.props.viewDegree(0, 20, null);
    }
    // Delete 
    deleteHandler = (data) =>{
      // this.props.deleteDegree(data.id)
    }
    // Update Term
    updateDegree(){
        this.setState({ show: false });
    let newDegreeObj = {
      id : this.state.id,
      name: this.state.name,
    };
    if (this.state.name.length !== 0) {
      this.props.updateDegree(this.state.id, newDegreeObj);
      this.setState({
        id: "",
        name: "",
        update: true,
      });      
    }
    this.props.viewDegree(0, 20, null);
  
    }
    render() {
        return (
            <div>
                <ThemeProvider theme={this.getmuitheme()}>
               <Grid container>
                   <Grid item md={12}>
                   {this.props.viewDegreeList.length !== 0 ? (
            <TableComponent
              data={
                this.props.viewDegreeList.length !== 0
                  ? this.props.viewDegreeList.content
                  : null
              }
              cols={this.col}
              onRowClick={this.rowClick}
              onSearch={this.paginate}
              paginate={this.paginate}
              totalCount={this.props.viewDegreeList.totalElements}
              title={"Degree"}
              pageCount={this.props.viewDegreeList.totalPages}
              action={true}
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
                   </Grid>
               </Grid>
                {/* Add and Edit Aspiration Degree */}
                <ThemeProvider theme={this.modeltheme()}>
            <Dialog
            TransitionComponent={Transition}
              open={this.state.show}
              onClose={(e)=>this.setState({show : false})}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0 ? "Edit Degree" : "Add Degree"}
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
                  label="Enter Degree"
                  fullWidth
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  multiline
                />
                       
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={
                    this.state.id.length === 0
                      ? this.addDegree.bind(this)
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
    viewDegreeList: state.AspirationReducer.viewDegreeList,

  }
}
export default connect(mapStateToProps,{viewDegree, addDegree, updateDegree,deleteDegree})(AspirationDegree)
