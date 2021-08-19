import { Card, Box, Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import "../Assets/App.css";
import { CardTitle } from "../Assets/StyledComponents";
import DropDown from "../Utils/DropDown";
import PlusButton from "../Utils/PlusButton";
import TabBar from "./TabBar";
import Table from "./Table";
import PaginationComponent from "../Utils/PaginationComponent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { getCourses,courseMonth,monthPlan } from "../Redux/Action/CourseMaterial";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {  createTheme, ThemeProvider } from "@material-ui/core";
const appBar = createTheme({
  overrides: {
    MuiAppBar: {
     colorPrimary:{
       backgroundColor:"#1093FF"
     }
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
      courseMonth : -1
    };
  }

  componentDidMount() {
    this.props.getCourses();
    
  }

  handleCourseChange = (e, newValue) => {
    this.setState({ courseValue: newValue });
    if (newValue) this.props.courseMonth(newValue.id);
    
  };

  months=[1,3,6,9]

  handleMonthChange = (event) => {
    this.setState({ courseMonth: event.currentTarget.id });
    console.log(event.currentTarget.id);
   
   
  };

  handleClick = (id) =>{
    this.props.monthPlan(id);
  }

  render() {
    console.log(this.props.monthResponse);
    console.log(this.props.courseMonthResponse)
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

            <Grid
              container
              justifyContent="space-between"
              style={{ padding: "12px" }}
            >
              <Grid item xs={3} sm={3} md={3} xl={3} lg={3}>
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
                xs={2}
                sm={2}
                md={2}
                xl={2}
                lg={2}
                className={"button_div"}
              >
                 <ThemeProvider theme={buttonTheme}>
                <PlusButton
                // onClick={handlePlusButton}
                >
                  Add New Study Plan
                </PlusButton>
                </ThemeProvider>
              </Grid>
            </Grid>

            {/* tabBar */}
            <Grid item md={12} xs={12} sm={12} md={12} xl={12} lg={12}>
            <ThemeProvider theme={appBar}>
              <AppBar position="static" >
                <Toolbar>
                 {this.months && this.months.map((month,index)=>{
                   return(
                     <div key={index} >
                   <Button
                   id={month}
                   onClick={this.handleMonthChange}
                   style={{textTransform:"none",margin:"7px 30px",backgroundColor:'unset'}}>
                     <Typography 
                     
                     style={{color:"#ffff"}}>
                     {month+ " Month"}
                     </Typography>
                   </Button>
                   </div>
                   )
                 })}
                  
                  
                </Toolbar>
              </AppBar>
              </ThemeProvider>
            </Grid>

            {/* table */}
            <Grid container>
              <Grid item md={3} style={{ backgroundColor: "#FAFAFA",display:"flex",flexDirection:"column"}}>
                {this.props.monthResponse && this.props.monthResponse.data.filter(item=>item.month<=this.state.courseMonth).map((month,index)=>{
                 return (
                   <div key={index}>
                      <List component="nav" aria-labelledby="nested-list-subheader">
                  <ListItem className={"list_button"} button>
                    <ListItemText onClick={()=>this.handleClick(month.id)}
                      className={"list_item"}
                      primary={`${month.month} month`}
                    />
                  </ListItem>
                  
                </List>
                   </div>
                 )
                })}
              </Grid>

              <Grid item md={9}>
                <Table item={this.props.courseMonthResponse}/>
                <Grid
                  item
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PaginationComponent pageCount={2} />
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
    courseMonthResponse : state.CourseMaterialReducer.monthlyPlan

  };
};

export default connect(mapStateToProps, {
  getCourses,
  courseMonth,
  monthPlan
})(Index);
