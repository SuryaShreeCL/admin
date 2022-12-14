import React, { Component } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
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
  Breadcrumbs,
} from "@material-ui/core";
import TableComponent from "./TableComponent/TableComponent";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import { viewAllCities } from "../Actions/Student";
import {
  viewCity,
  addCity,
  updateCity,
  deleteCity,
} from "../Actions/Aspiration";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import BackButton from "../Asset/Images/backbutton.svg";
import { studentPath } from "../Component/RoutePaths";
import Loader from "./Utils/controls/Loader";
export class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      id: "",
      name: "",
      stateName: "",
      nameHlpTxt: "",
      stateHlpTxt: "",
      update: false,
    };
  }
  // Component Theme
  getmuitheme = () =>
    createTheme({
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
    createTheme({
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
    createTheme({
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
      fieldName: "id",
    },
    { title: "City", fieldName: "name" },
    { title: "State", fieldName: "stateName" },
  ];
  // Row Click Handler
  rowClick = (rowData) => {};
  // Pagination
  paginate = (page, size, keyword) => {
    this.props.viewCity(page, size, keyword);
  };
  // Edit Handler
  handleEdit = (data) => {
    this.setState({
      id: data.id,
      name: data.name,
      stateName: data.stateName,
      show: true,
    });
  };
  // Dialog Open
  handleClickOpen = (e) => {
    this.setState({
      show: true,
      id: "",
      name: "",
      stateName: "",
    });
  };
  componentDidMount() {
    // this.props.viewCity(0, 20, null);
    this.props.viewAllCities();
  }
  // Add term
  addCity() {
    let helpTxt = "Please fill the required feild";
    this.state.name.length === 0
      ? this.setState({ nameHlpTxt: helpTxt })
      : this.setState({ nameHlpTxt: "" });
    this.state.stateName.length === 0
      ? this.setState({ stateHlpTxt: helpTxt })
      : this.setState({ stateHlpTxt: "" });
    if (this.state.name.length !== 0 && this.state.stateName.length !== 0) {
      let newCityObj = {
        name: this.state.name,
        stateName: this.state.stateName,
      };
      this.props.addCity(newCityObj);
      this.setState({
        id: "",
        name: "",
        stateName: "",
        show: false,
      });
    }
  }
  // Delete Handler
  deleteHandler = (data) => {
    // this.props.deleteCity(data.id)
  };
  // Update Term
  updateCity() {
    let helpTxt = "Please fill the required feild";

    this.state.name.length === 0
      ? this.setState({ nameHlpTxt: helpTxt })
      : this.setState({ nameHlpTxt: "" });
    this.state.stateName.length === 0
      ? this.setState({ stateHlpTxt: helpTxt })
      : this.setState({ stateHlpTxt: "" });

    if (this.state.name.length !== 0 && this.state.stateName.length !== 0) {
      let newCityObj = {
        id: this.state.id,
        name: this.state.name,
        stateName: this.state.stateName,
      };
      this.props.updateCity(newCityObj);
      this.setState({
        id: "",
        name: "",
        stateName: "",
        update: true,
        show: false,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.addCityList !== prevProps.addCityList) {
      this.props.viewAllCities();
    }
    if (this.props.updateCityList !== prevProps.updateCityList) {
      this.props.viewAllCities();
    }
  }

  render() {
    console.log(this.props.cityList);
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
          <img
            src={BackButton}
            style={{ cursor: "pointer", marginTop: "-10px" }}
            onClick={() => this.props.history.goBack()}
          />
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <Typography
              style={{
                cursor: "pointer",
                fontWeight: "600",
                marginLeft: "10px",
              }}
              onClick={() => this.props.history.push(studentPath)}
            >
              Home
            </Typography>
            <Typography style={{ cursor: "pointer", fontWeight: "600" }}>
              City
            </Typography>
          </Breadcrumbs>
        </div>
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "65vh",
                    }}
                  >
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
          {/* Add and Edit City */}
          <ThemeProvider theme={this.modeltheme()}>
            <Dialog
              TransitionComponent={Transition}
              open={this.state.show}
              onClose={(e) => this.setState({ show: false })}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title">
                <div className="flex-1 text-center">
                  {this.state.id.length !== 0 ? "Edit City" : "Add City"}
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
    );
  }
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const mapStateToProps = (state) => {
  return {
    viewCityList: state.AspirationReducer.viewCityList,
    cityList: state.StudentReducer.cityList,
    addCityList: state.AspirationReducer.addCityList,
    updateCityList: state.AspirationReducer.updateCityList,
  };
};
export default connect(mapStateToProps, {
  addCity,
  updateCity,
  viewCity,
  deleteCity,
  viewAllCities,
})(City);
