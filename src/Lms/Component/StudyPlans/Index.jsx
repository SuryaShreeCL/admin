import { Box, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { Component } from "react";
import { connect } from "react-redux";
import { lms_add_study_plan } from "../../../Component/RoutePaths";
import {
  Card,
  TabBarItem,
  TabBarMonthItem,
  TestTitle,
} from "../../Assets/StyledComponents";
import {
  courseMonth,
  getCourses,
  monthPlan,
} from "../../Redux/Action/CourseMaterial";
import PlusButton from "../../Utils/PlusButton";
import PopOver from "./Popover";
import Table from "./Table";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseValue: [],
      activeMonth: null,
      activeDownMonth: null,
      activeDownMonthIdx: -1,
    };
  }

  componentDidMount() {
    this.props.getCourses();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.courseMonthResponse !== this.props.courseMonthResponse) {
      this.handleDownMonthChange(this.props.courseMonthResponse.data[0], 0);
    }
    if (prevProps.monthResponse !== this.props.monthResponse) {
      this.handleMonthChange(this.props.monthResponse.data[0]);
    }
  }

  handleCourseChange = (e, newValue) => {
    this.setState({ courseValue: newValue });
    if (newValue) this.props.courseMonth(newValue.id);
  };

  handleMonthChange(month) {
    this.setState({ activeMonth: month });
    this.props.monthPlan(month.id);
  }

  handleDownMonthChange(month, idx) {
    this.setState({ activeDownMonth: month, activeDownMonthIdx: idx });
  }

  renderMonth() {
    return (
      <>
        {this.props.monthResponse.data.map((item, idx) => (
          <TabBarItem
            component={"button"}
            // flex={
            //   this.props.monthResponse.data.length === idx + 1 ? 1 : "unset"
            // }
            onClick={() => this.handleMonthChange(item)}
            active={this.state.activeMonth === item}
          >
            {item.month + " " + "Month"}
          </TabBarItem>
        ))}
        <div style={{ flex: 1 }}></div>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          {/* <PopOver options={['Delete']} color={'#ffff'} /> */}
        </Box>
      </>
    );
  }

  renderSideBarMonth() {
    return (
      <>
        {this.props.courseMonthResponse.data.map((item, idx) => (
          <TabBarMonthItem
            component={"button"}
            onClick={() => this.handleDownMonthChange(item, idx)}
            active={this.state.activeDownMonth === item}
          >
            {idx +
              1 +
              `${
                idx === 0
                  ? " st "
                  : idx === 1
                  ? " nd "
                  : idx === 2
                  ? "rd "
                  : "th "
              }` +
              "Month"}
          </TabBarMonthItem>
        ))}
      </>
    );
  }

  render() {
    return (
      <Card>
        <Grid container>
          <Grid item sm={12} md={12} style={{ padding: "20px" }}>
            <TestTitle>Study Plan</TestTitle>
          </Grid>

          <Grid item sm={12} md={12} style={{ padding: "20px" }}>
            <Box display={"flex"}>
              <Box flex={1}>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.props.coursesResponse.data || []}
                  value={this.state.courseValue}
                  onChange={this.handleCourseChange}
                  getOptionLabel={(option) => option.title}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Course" variant="outlined" />
                  )}
                />
              </Box>
              <Box>
                <PlusButton
                  style={{ width: "200px" }}
                  onClick={() => this.props.history.push(lms_add_study_plan)}
                >
                  Add New Study Plan
                </PlusButton>
              </Box>
            </Box>
          </Grid>

          <Grid sm={12} md={12}>
            <Box
              width={"100%"}
              bgcolor={"#1093FF"}
              padding={"0px !important"}
              display={"flex"}
              style={{ overflowX: "auto" }}
            >
              {this.props.monthResponse && this.renderMonth()}
            </Box>
          </Grid>
          <Grid
            item
            md={3}
            sm={3}
            style={{
              display: "flex",
              flexDirection: "column",
              gridGap: "10px",
              padding: "10px 0px",
            }}
          >
            {this.props.monthResponse &&
              this.props.courseMonthResponse &&
              this.renderSideBarMonth()}
          </Grid>
          <Grid item md={8} sm={8} style={{ padding: "20px" }}>
            {this.state.activeDownMonth && this.props.courseMonthResponse && (
              <Table
                item={
                  this.props.courseMonthResponse.data[
                    this.state.activeDownMonthIdx
                  ]
                }
              />
            )}
          </Grid>
        </Grid>
      </Card>
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
