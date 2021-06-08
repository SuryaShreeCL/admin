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
    CircularProgress,
    Slide,
    Tab,
    Tabs,
    Snackbar,
  } from "@material-ui/core";
  import Autocomplete from '@material-ui/lab/Autocomplete';
  import TableComponent from "../TableComponent/TableComponent";
  import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
  import AddIcon from "@material-ui/icons/Add";
  import EditIcon from "@material-ui/icons/Edit";
  import DeleteIcon from "@material-ui/icons/Delete";
  import {connect} from 'react-redux';
  import {viewCollege, addCollege, updateCollege, deleteCollege, viewCountry, viewCountryForSelect} from "../../Actions/Aspiration"
import { isEmptyString } from '../Validation';
import MySnackBar from '../MySnackBar';

export class AspirationCollege extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            id : "",
            name : "",
            countryForUniv : "",
            update : false,
            nameErr:"",
            countryErr:"",
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
    countryForUnivHandler = (event,value) =>{
      this.setState({
        countryForUniv : value
      })
    }
    // Row Click Handler
    rowClick = (rowData) => {
        
    };
    // Pagination
    paginate = (page, size, keyword) => {
        this.props.viewCollege(page, size, keyword);
      };
    // Edit Handler
    handleEdit = (data) =>{
      this.setState({
        id : data.id,
        name : data.name,
        show : true,
      })
    } 
    // Handle Delete
    deleteHandler = (data) =>{
        this.props.deleteCollege(data.id)
    }
    // Column
    col = [
      {
        title: "ID",
        fieldName: "id"},
      { title: "Dream College", fieldName: "name" },
    ];
    // Dialog Open
    handleClickOpen = (e) => {
        this.setState({
           show: true,
           id : "",
            name : "",
          });
          
      };
    componentDidMount(){
        this.props.viewCollege(0, 20, null);
        this.props.viewCountryForSelect()
        }
        componentDidUpdate(prevProps,prevState){
         if(prevProps.addCollegeList !== this.props.addCollegeList || prevProps.updateCollegeList !== this.props.updateCollegeList){
          this.props.viewCollege(0, 20, null);
          this.props.viewCountryForSelect()
         }
        }
    // Add term
    addCollege(){
        // this.setState({ show: false });
        let hlptxt = "Please fill the Required Field"
        isEmptyString(this.state.name) ? this.setState({ nameErr : hlptxt }) : this.setState ({ nameErr : "" });
         this.state.countryForUniv === "" ? this.setState ({countryErr : hlptxt }) : this.setState({ countryErr : ""})
        let newCollegeObj = {
          name: this.state.name,
          country : {
            id : this.state.countryForUniv.id
          }
        };
        if (this.state.name.length !== 0 
          //  isEmptyString(this.state.countryForUniv)
          ) {
          this.props.addCollege(newCollegeObj);
          this.setState({
            id: "",
            name: "",
            snackMsg:"Added Successfully",
            snackOpen:true,
            snackVariant:"success",
          });
        }
        this.props.viewCollege(0, 20, null);
    }
    // Update Term
    updateCollege(){
        // this.setState({ show: false });
        let hlptxt = "Please fill the Required Field"
        isEmptyString(this.state.name) ? this.setState({ nameErr : hlptxt }) : this.setState ({ nameErr : "" });
        isEmptyString( this.state.countryForUniv) ? this.setState ({countryErr : hlptxt }) : this.setState({ countryErr : ""})
    let newCollegeObj = {
      id : this.state.id,
      name: this.state.name,
      country : {
        id : this.state.countryForUniv.id
      }
    };
    if (this.state.name.length !== 0 
      // isEmptyString(this.state.countryForUniv)
      ) {
      this.props.updateCollege(this.state.id, newCollegeObj);
      this.setState({
        id: "",
        name: "",
        update: true,
        snackMsg:"Updated Successfully",
        snackOpen:true,
        snackVariant:"success",
      });      
    }
    this.props.viewCollege(0, 20, null);
  
    }
    render() {
        return (
            <div>
                <ThemeProvider theme={this.getmuitheme()}>
               <Grid container>
                   <Grid item md={12}>
                   {this.props.viewCollegeList.length !== 0 ? (
            <TableComponent
              data={
                this.props.viewCollegeList.length !== 0
                  ? this.props.viewCollegeList.content
                  : null
              }
              cols={this.col}
              onRowClick={this.rowClick}
              onSearch={this.paginate}
              paginate={this.paginate}
              totalCount={this.props.viewCollegeList.totalElements}
              title={"Dream College"}
              pageCount={this.props.viewCollegeList.totalPages}
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
                {/* Add and Edit Aspiration Dream College */}
                <ThemeProvider theme={this.modeltheme()}>
            <Dialog
            TransitionComponent={Transition}
              open={this.state.show}
              onClose={(e)=>this.setState({show : false})}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0 ? "Edit College" : "Add College"}
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
                  label="Enter College Name"
                  fullWidth
                  error={this.state.nameErr.length > 0 }
                  helperText={this.state.nameErr}
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  multiline
                />
                 <Autocomplete
                id="combo-box-demo"
                options={this.props.viewCountryForSelectList}
                getOptionLabel={(option) => option.name}
                onChange={this.countryForUnivHandler}
                renderInput={(params) => <TextField 
                  {...params} 
                  label="Select Country"
                  fullWidth
                  error={this.state.countryErr.length > 0}
                  helperText={this.state.countryErr}
                   variant="outlined" />}
              />
                       
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={
                    this.state.id.length === 0
                      ? this.addCollege.bind(this)
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
    viewCollegeList: state.AspirationReducer.viewCollegeList,
    viewCountryList: state.AspirationReducer.viewCountryList,
    viewCountryForSelectList : state.AspirationReducer.viewCountryForSelectList,
    addCollegeList : state.AspirationReducer.addCollegeList,
    updateCollegeList : state.AspirationReducer.updateCollegeList
  }
}
export default connect(mapStateToProps,{viewCollege, addCollege, updateCollege, deleteCollege ,viewCountry, viewCountryForSelect})(AspirationCollege)
