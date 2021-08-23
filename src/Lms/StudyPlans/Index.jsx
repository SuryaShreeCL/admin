import { Card, Grid } from "@material-ui/core";
import React, { Component } from "react";

import "../Assets/App.css";
import { CardTitle } from "../Assets/StyledComponents";
import PlusButton from "../Utils/PlusButton";
import TabBar from "./TabBar";
import Table from "./Table";

import {
  getCourses,
  courseMonth,
  monthPlan,
} from "../Redux/Action/CourseMaterial";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { createTheme, ThemeProvider } from "@material-ui/core";
import { lms_add_study_plan } from "../../Component/RoutePaths";

import { StyledVerticalTaps } from "./VerticalTab";
import { TaskTabs } from "../Assets/css/StyledCourseTakenComponent/StyledCourseTaken";

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

const verticalTabsLabels = [
  { tabLabel: "Today's Task" },
  { tabLabel: "Pending Task" },
  { tabLabel: "Completed Task" },
  { tabLabel: "Other Tasks" },
  { tabLabel: "Last Topic" },
];

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
      open: false,
      anchorEl: null,
      verticalTabId: 1,
      tabId: 1,
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

  handleClickOpen = () => {
    console.log("click");
    this.setState({
      open: true,
    });
  };

  handleClickClose = () => {
    console.log("click");
    this.setState({
      open: false,
    });
  };
  handleOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { tabId, verticalTabId } = this.state;
    console.log(this.props.monthResponse);
    console.log(this.props.courseMonthResponse);
    return (
      <div>
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
                <TabBar item={this.props.monthResponse} />
              </ThemeProvider>
            </Grid>

            {/* table */}
            <Grid container>
              <Grid
                item
                md={3}
                style={{
                  // backgroundColor: "#FAFAFA",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {this.props.monthResponse &&
                  this.props.monthResponse.data

                    .filter((item) => item.month <= this.state.courseMonth)
                    .map((month, index) => {
                      return (
                        <div key={index}>
                          <TaskTabs>
                            <StyledVerticalTaps
                              tabsData={{
                                tabId: verticalTabId,
                                handleTabChange: (e, newValue) => {
                                  this.setState({ verticalTabId: newValue });
                                },
                                tabsBackColor: "#1093FF",
                                tabData: this.props.monthResponse.data.filter(
                                  (item) => item.month <= this.state.courseMonth
                                ),
                                activeClass: "active__task__tab",
                                styleName: "courseTaken",
                              }}
                              onClick={() => this.handleClick(month.id)}
                            />
                          </TaskTabs>
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
