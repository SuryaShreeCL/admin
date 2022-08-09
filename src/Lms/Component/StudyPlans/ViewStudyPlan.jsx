import { Box, Grid, IconButton } from "@material-ui/core";
import { Component } from "react";
import { connect } from "react-redux";
import {
  BackIconBox,
  Card,
  TabBarMonthItem,
  TestTitle,
} from "../../Assets/StyledComponents";
import { monthPlan } from "../../Redux/Action/CourseMaterial";
import { SnackBar } from "../../Utils/SnackBar";
import Table from "./Table";
import React from "react";
import { ArrowBack } from "@material-ui/icons";

const MONTH_END_KEY = {
  0: "st",
  1: "nd",
  2: "rd",
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDownMonth: null,
      activeDownMonthIdx: 0,
      snackOpen: false,
      snackColor: "",
      snackMessage: "",
    };

    this.handleSnackClose = this.handleSnackClose.bind(this);
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.props.monthPlan(params.studyPlanId, () => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.courseMonthResponse !== this.props.courseMonthResponse) {
      this.handleDownMonthChange(this.props.courseMonthResponse.data[0], 0);
    }
  }

  handleDownMonthChange(month, idx) {
    this.setState({ activeDownMonth: month, activeDownMonthIdx: idx });
  }

  renderSideBarMonth() {
    const { courseMonthResponse } = this.props;
    return (
      <>
        {courseMonthResponse.data.length !== 0 &&
          courseMonthResponse.data.map((item, idx) => (
            <TabBarMonthItem
              component={"button"}
              onClick={() => this.handleDownMonthChange(item, idx)}
              active={this.state.activeDownMonth === item}
            >
              {`${idx + 1}${MONTH_END_KEY.idx || "th"} Month`}
            </TabBarMonthItem>
          ))}
      </>
    );
  }

  handleSnackClose() {
    this.setState({
      snackOpen: false,
      snackMessage: "",
      snackColor: "",
    });
  }

  handleBackIconClick = () => {
    this.props.history.goBack();
  };

  render() {
    const { snackOpen, snackColor, snackMessage } = this.state;
    const { handleSnackClose, handleBackIconClick } = this;

    return (
      <div>
        <BackIconBox>
          <IconButton color='primary' onClick={handleBackIconClick}>
            <ArrowBack color='primary' />
          </IconButton>
        </BackIconBox>
        <Card>
          <Grid container>
            <Grid item sm={12} md={12} style={{ padding: "20px" }}>
              <TestTitle>{"View Study Plan"}</TestTitle>
            </Grid>
            <Box padding={"10px 0px !important"}>
              <Grid
                item
                md={3}
                sm={3}
                container
                direction='column'
                gridGap='10px'
              >
                {this.props.courseMonthResponse && this.renderSideBarMonth()}
              </Grid>
            </Box>
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

        <SnackBar
          snackData={{
            open: snackOpen,
            snackClose: handleSnackClose,
            snackType: snackColor,
            message: snackMessage,
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    courseMonthResponse: state.CourseMaterialReducer.monthlyPlan,
  };
};

export default connect(mapStateToProps, {
  monthPlan,
})(Index);
