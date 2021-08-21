import { Card, Box, Grid, Typography, IconButton,ListItemIcon} from "@material-ui/core";
import React, { Component } from "react";
import CloseIcon from '@material-ui/icons/Close';

import Button from "@material-ui/core/Button";
import "../Assets/App.css";
import { CardTitle, DeleteCard,DeleteTitle,Close,DialogBox } from "../Assets/StyledComponents";
import DropDown from "../Utils/DropDown";
import PlusButton from "../Utils/PlusButton";
import TabBar from "./TabBar";
import Table from "./Table";
import PaginationComponent from "../Utils/PaginationComponent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  getCourses,
  courseMonth,
  monthPlan,
} from "../Redux/Action/CourseMaterial";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { lms_add_study_plan } from "../../Component/RoutePaths";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FillButton, OutlineButton } from "../Utils/Buttons";
import DeleteImage  from '../Assets/images/DeleteImage.png'
 



const appBar = createTheme({
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#1093FF",
      },
    },
  },
});

const buttonTheme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        background: "#1093FF",
        color: "white",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#1093FF",
        },
      },
    },
  },
});

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseValue: [],
      courses: "",
      month: "",
      monthValue: "",
      productId: null,
      courseMonth: -1,
      open:false,
      anchorEl:null
    };
  }

  componentDidMount() {
    this.props.getCourses();
  }

  handleCourseChange = (e, newValue) => {
    this.setState({ courseValue: newValue });
    if (newValue) this.props.courseMonth(newValue.id);
  };

  months = [1, 3, 6, 9];

  handleMonthChange = (event) => {
    this.setState({ courseMonth: event.currentTarget.id });
    console.log(event.currentTarget.id);
  };

  handleClick = (id) => {
    this.props.monthPlan(id);
  };

  // open = Boolean(this.state.anchorEl);

  handleClickOpen = ()=>{
    console.log("click")
    this.setState({
      open:true
    })
  }

  handleClickClose = ()=>{
    console.log("click")
    this.setState({
      open:false
    })
  }
  handleOpen = (event) => {
    this.setState({
          anchorEl : event.currentTarget
        })
  };

  handleClose = () => {
    this.setState({
      anchorEl : null
    })
  };

  

  render() {
    
    console.log(this.props.monthResponse);
    console.log(this.props.courseMonthResponse);
    return (
      <div
      // style={{ padding: "10px 5px 5px" }}
      >
        <Card className={"card"}>
          <Grid container spacing={3} style={{ padding: "12px" }}>
            {/* title */}

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              xl={12}
              lg={12}
              style={{ padding: "15px" }}
            >
              <CardTitle>Study plan</CardTitle>
            </Grid>

            {/* dropdown and button */}

            {/* <Grid
              container
             
              style={{ padding: "12px" }}
            > */}
            <Grid item md={9}>
              <Autocomplete
                id="combo-box-demo"
                options={this.props.coursesResponse.data || []}
                value={this.state.courseValue}
                onChange={this.handleCourseChange}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Courses" variant="outlined" />
                )}
              />
            </Grid>

            <Grid
              item
              // xs={2}
              // sm={2}
              md={3}
              // xl={2}
              // lg={2}
              // className={"button_div"}
              style={{ display: "flex", alignItems: "center" }}
            >
              <ThemeProvider theme={buttonTheme}>
                <PlusButton
                  style={{ width: "200px" }}
                  onClick={() => this.props.history.push(lms_add_study_plan)}
                >
                  Add New Study Plan
                </PlusButton>
              </ThemeProvider>
            </Grid>
            {/* </Grid> */}

            {/* tabBar */}
            <Grid
              item
              md={12}
              xs={12}
              sm={12}
              md={12}
              xl={12}
              lg={12}
              style={{ position: "relative" }}
            >
              <ThemeProvider theme={appBar}>
                <AppBar position="static" style={{ overflowX: "scroll" }}>
                  <Toolbar>
                    {this.props.monthResponse &&
                      this.props.monthResponse.data.map((month, index) => {
                        return (
                          <div
                            key={index}
                            style={{ margin: "5px 27px", whiteSpace: "nowrap" }}
                          >
                            <Typography
                              id={month.month}
                              onClick={this.handleMonthChange}
                              style={{ color: "#ffff" }}
                            >
                              {month.month + " Month"}
                            </Typography>
                          </div>
                        );
                      })}
                    <div>
                      <MoreVertIcon onClick={this.handleOpen} />
                      <Menu
                        //  className={"delete_modal"}
                        id="fade-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={this.state.anchorEl}
                        onClose={this.handleClose}
                        TransitionComponent={Fade}
                      >
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <MenuItem
                            onClick={this.handleClickOpen}
                            // onClick={() => handleDelete(topicId, topicName)}
                          >
                            <ListItemIcon>
                              <DeleteIcon style={{ fill: "#1093ff" }} />
                            </ListItemIcon>
                            <Typography className={"menu-item-text"}>
                              Delete
                            </Typography>
                          </MenuItem>
                        </div>
                      </Menu>
                    </div>
                    {/* <Dialog
                      open={this.state.open}
                      onClose={this.handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                     
                        <CloseIcon 
                        onClick={this.handleClickClose}
                        />
                        <DeleteIcon color='primary' style={{ fontSize: '48px' }} />
                     
                      <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to Delete?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Let Google help apps determine location. This means
                          sending anonymous location data to Google, even when
                          no apps are running.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                          Disagree
                        </Button>
                        <Button
                          onClick={this.handleClose}
                          color="primary"
                          autoFocus
                        >
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog> */}
                    <DialogBox>
                    <Dialog
                      className={"dialog_alignment"}
                      onClose={this.handleClose}
                      aria-labelledby="customized-dialog-title"
                      open={this.state.open}
                    >
                      <Box>
                        <Box pt={3}>
                          <DialogTitle
                           
                            id="customized-dialog-title"
                            onClose={this.handleClose}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <img src={DeleteImage} />
                            </div>
                            <div style={{display:"flex"}}>
                             <Close>
                             <CloseIcon  
                              style={{fill:"#1093FF"}}
                              onClick={this.handleClickClose}/>
                             </Close>
                            </div>

                            <DeleteTitle>
                              Are you sure you want to Delete?
                            </DeleteTitle>
                          </DialogTitle>
                        </Box>
                        {/* dialog content */}
                        <DialogContent>
                          <DialogContentText id="customized-dialog-content">
                            {/* dropdown */}
                            <Grid item md={12}>
                              <Autocomplete
                                id="combo-box-demo"
                                options={this.props.coursesResponse.data || []}
                                value={this.state.courseValue}
                                onChange={this.handleCourseChange}
                                getOptionLabel={(option) => option.title}
                                style={{ width: 400 }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Courses"
                                    variant="outlined"
                                  />
                                )}
                              />
                            </Grid>
                          </DialogContentText>
                        </DialogContent>
                        
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            paddingBottom: "15px",
                            paddingTop:"15px"
                          }}
                        >
                          <OutlineButton  onClick={this.handleClickClose}>No</OutlineButton>
                          <FillButton>Yes</FillButton>
                        </div>
                      </Box>
                    </Dialog>
                    </DialogBox>
                  </Toolbar>
                </AppBar>
              </ThemeProvider>
            </Grid>

            {/* table */}
            <Grid container>
              <Grid
                item
                md={3}
                style={{
                  backgroundColor: "#FAFAFA",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {this.props.monthResponse &&
                  this.props.monthResponse.data
                    .sort((a, b) => a - b)
                    .filter((item) => item.month <= this.state.courseMonth)
                    .map((month, index) => {
                      return (
                        <div key={index}>
                          <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                          >
                            <ListItem className={"list_button"} button>
                              <ListItemText
                                onClick={() => this.handleClick(month.id)}
                                className={"list_item"}
                                // style={{background:"#FAFAFA"}}
                                primary={`${month.month} Month`}
                              />
                            </ListItem>
                          </List>
                        </div>
                      );
                    })}
              </Grid>

              <Grid item md={9}>
                <Table item={this.props.courseMonthResponse} />
                <Grid
                  item
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <PaginationComponent pageCount={2} /> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    coursesResponse: state.CourseMaterialReducer.courses,
    monthResponse: state.CourseMaterialReducer.monthlyCourse,
    courseMonthResponse: state.CourseMaterialReducer.monthlyPlan,
  };
};

export default connect(mapStateToProps, {
  getCourses,
  courseMonth,
  monthPlan,
})(Index);
