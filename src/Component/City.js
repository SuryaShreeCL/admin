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
  import TableComponent from "./TableComponent/TableComponent";
  import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
  import AddIcon from "@material-ui/icons/Add";
  import EditIcon from "@material-ui/icons/Edit";
  import DeleteIcon from "@material-ui/icons/Delete";
  import {connect} from 'react-redux';
  import {viewAllCities} from "../Actions/Student"
  import {viewCity,addCity,updateCity,deleteCity} from "../Actions/Aspiration"
export class City extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            id : "",
            name : "",
            stateName : "",
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
      { title: "City", fieldName: "name" },
      { title: "State", fieldName: "stateName" },
    ];
    // Row Click Handler
    rowClick = (rowData) => {
        
    };
    // Pagination
    paginate = (page, size, keyword) => {
        this.props.viewCity(page, size, keyword);
      };
    // Edit Handler
    handleEdit = (data) =>{
      this.setState({
        id : data.id,
        name : data.name,
        stateName : data.stateName,
        show : true,
      })
    } 
    // Dialog Open
    handleClickOpen = (e) => {
        this.setState({
           show: true,
          id : "",
          name : "",
          stateName : "",
          });
      };
    componentDidMount(){
        // this.props.viewCity(0, 20, null);
        this.props.viewAllCities()
        }
    // Add term
    addCity(){
        this.setState({ show: false });
        let newCityObj = {
          name: this.state.name,
          stateName : this.state.stateName,
        };
        if (this.state.name.length !== 0) {
          this.props.addCity(newCityObj);
          this.setState({
            id: "",
            name: "",
            stateName : "",
          });
        }
        this.props.viewCity(0, 20, null);
    }
    // Delete Handler
    deleteHandler = (data) =>{
      // this.props.deleteCity(data.id)
    }
    // Update Term
    updateCity(){
        this.setState({ show: false });
    let newCityObj = {
      id : this.state.id,
      name: this.state.name,
      stateName : this.state.stateName,
    };
    if (this.state.name.length !== 0) {
      this.props.updateCity(newCityObj);
      this.setState({
        id: "",
        name: "",
        stateName : "",
        update: true,
      });      
    }
    this.props.viewCity(0, 20, null);
    }
    render() {
      console.log(this.props.cityList)
        return (
            <div>
                <ThemeProvider theme={this.getmuitheme()}>
               <Grid container>
                   <Grid item md={12}>
                   {this.props.cityList.length !== 0 ? (
            <TableComponent
              data={
                    this.props.cityList.length !== 0
                  ? this.props.cityList
                  : null
              }
              cols={this.col}
              onRowClick={this.rowClick}
              onSearch={this.paginate}
              paginate={this.paginate}
              // totalCount={this.props.viewCityList.totalElements}
              title={"City"}
              // pageCount={this.props.viewCityList.totalPages}
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
                {/* Add and Edit City */}
                <ThemeProvider theme={this.modeltheme()}>
            <Dialog
            TransitionComponent={Transition}
              open={this.state.show}
              onClose={(e)=>this.setState({show : false})}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0 ? "Edit City" : "Add City"}
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
                  label="Enter City Name"
                  fullWidth
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  multiline
                />
                 <TextField
                  variant="outlined"
                  color="primary"
                  label="Enter State Name"
                  fullWidth
                  value={this.state.stateName}
                  onChange={(e) => this.setState({ stateName: e.target.value })}
                  multiline
                />
                         
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={
                    this.state.id.length === 0
                      ? this.addCity.bind(this)
                      : this.updateCity.bind(this)
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
    viewCityList: state.AspirationReducer.viewCityList,
    cityList : state.StudentReducer.cityList
  }
}
export default connect(mapStateToProps,{addCity, updateCity, viewCity, deleteCity, viewAllCities})(City)
