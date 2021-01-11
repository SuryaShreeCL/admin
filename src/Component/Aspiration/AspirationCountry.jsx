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
    CircularProgress,
    Tab,
    Tabs,
    Snackbar,
  } from "@material-ui/core";
  import TableComponent from "../TableComponent/TableComponent";
  import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
  import AddIcon from "@material-ui/icons/Add";
  import EditIcon from "@material-ui/icons/Edit";
  import DeleteIcon from "@material-ui/icons/Delete";
  import {connect} from 'react-redux';
  import {viewCountry, addCountry, updateCountry, deleteCountry} from "../../Actions/Aspiration"
export class AspirationCountry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            id : '',
            name : '',
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
    // Row Click Handler
    rowClick = (rowData) => {
        
    };
     // Column
     col = [
      {
        title: "ID",
        fieldName: "id"},
      { title: "Country", fieldName: "name" },
    ];
    // Pagination
    paginate = (page, size, keyword) => {
        this.props.viewCountry(page, size, keyword);
      };
    // Edit Handler
    handleEdit = (data) =>{
      this.setState({
        id : data.id,
        name : data.name,
        show : true,
      })
    } 
    // Delete Handler
    deleteHandler = (data) =>{
      // this.props.deleteCountry(data.id)
    }
    // Dialog Open
    handleClickOpen = (e) => {
        this.setState({ 
          show: true,
          name : "",
          id : "",
        });
      };
    componentDidMount(){
        this.props.viewCountry(0, 20, null);
        }
    // Add term
    addCountry(){
        this.setState({ show: false });
        let newCountryObj = {
          name: this.state.name,
        };
        if (this.state.name.length !== 0) {
          this.props.addCountry(newCountryObj);
          this.setState({
            id: "",
            name: "",
          });
        }
        this.props.viewCountry(0, 20, null);
    }
    // Update Term
    updateCountry(){
        this.setState({ show: false });
    let newCountryObj = {
      id : this.state.id,
      name: this.state.name,
    };
    if (this.state.name.length !== 0) {
      this.props.updateCountry(this.state.id, newCountryObj);
      this.setState({
        id: "",
        name: "",
        update: true,
      });      
    }
    this.props.viewCountry(0, 20, null);
  
    }
    render() {
      console.log(this.props)
        return (
            <div>
                <ThemeProvider theme={this.getmuitheme()}>
               <Grid container>
                   <Grid item md={12}>
                   {this.props.viewCountryList.length !== 0 ? (
            <TableComponent
              data={
                this.props.viewCountryList.length !== 0
                  ? this.props.viewCountryList.content
                  : null
              }
              cols={this.col}
              onRowClick={this.rowClick}
              onSearch={this.paginate}
              paginate={this.paginate}
              totalCount={this.props.viewCountryList.totalElements}
              title={"Country Of Dream College"}
              pageCount={this.props.viewCountryList.totalPages}
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
                {/* Add and Edit Aspiration Country Of Dream College */}
                <ThemeProvider theme={this.modeltheme()}>
            <Dialog
            TransitionComponent={Transition}
              open={this.state.show}
              onClose={(e)=>this.setState({show : false})}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0 ? "Edit Country Of Dream College" : "Add Country Of Dream College"}
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
                  label="Enter Country Of Dream College"
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
                      ? this.addCountry.bind(this)
                      : this.updateCountry.bind(this)
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
    viewCountryList: state.AspirationReducer.viewCountryList,

  }
}
export default connect(mapStateToProps,{viewCountry, addCountry, updateCountry,deleteCountry})(AspirationCountry)
