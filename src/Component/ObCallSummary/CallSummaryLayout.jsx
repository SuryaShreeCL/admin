import { Divider, Grid, Typography, Breadcrumbs } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import PrimaryButton from "../../Utils/PrimaryButton";
import { ThemedTab, ThemedTabs } from "../Utils/ThemedComponents";
import ClientDetails from "./ClientDetails";
import Question from "./textEditor";
import Rating from "./Rating";
import { completecall,skipcall } from "../../Actions/Calldetails";
import Mysnack from "../MySnackBar";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import BackButton from "../../Asset/Images/backbutton.svg";
import { studentPath } from "../RoutePaths";

class CallSummaryLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftTabCount: 0,
      rightTabCount: 0,
      snackmsg: "",
      snackopen: false,
      snackvariant: "",
    };
  }
  handlecomplete = () => {
    this.props.completecall(
      this.props.match.params.studentId,
      this.props.match.params.productId
    );
    this.setState({
      snackopen: true,
      snackmsg: "Call Completed Successfully",
      snackvariant: "success",
    });
  };
  handleskip = () => {
    this.props.skipcall(
      this.props.match.params.studentId,
      this.props.match.params.productId
    );
    this.setState({
      snackopen: true,
      snackmsg: "Call skipped Successfully",
      snackvariant: "success",
    });
  };
 
  renderLeftContent = (value) => {
    try {
      if (value === 0) {
        return <ClientDetails {...this.props} />;
      } else if (value === 1) {
        return <Question {...this.props} />;
      } else if (value === 2) {
        return <Rating {...this.props} />;
      }
    } catch (error) {}
  };

  renderRightContent = (value) => {
    try {
    } catch (error) {}
  };

  render() {
    return (
      <div style={{ marginTop: !this.props.hasBreadCrumbs && "15px" }}>
        {this.props.hasBreadCrumbs && (
          <div
            style={{ display: "flex", flexDirection: "row", margin: "10px" }}
          >
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
                Call Summary
              </Typography>
            </Breadcrumbs>
          </div>
        )}

        <Grid container spacing={2}>
          <Grid
            item
            md={12}
            container
            justify={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h6">OnBoarding Call Summary</Typography>
            <Grid item xs={2}></Grid>
            <PrimaryButton
              variant={"contained"}
              color={"primary"}
              style={{ textTransform: "none" }}
              onClick={() => this.handleskip()}
            >
              Skip Call Summary
            </PrimaryButton>
            <PrimaryButton
              variant={"contained"}
              color={"primary"}
              style={{ textTransform: "none" }}
              onClick={() => this.handlecomplete()}
            >
              Complete Call Summary
            </PrimaryButton>
          </Grid>
          <Grid item md={12}>
            <Divider style={{ backgroundColor: "#cacaca" }} />
          </Grid>
          <Grid item md={8}>
            <Grid container>
              <Grid item md={12}>
                <ThemedTabs
                  value={this.state.leftTabCount}
                  textColor={"inherit"}
                  onChange={(e, value) =>
                    this.setState({ leftTabCount: value })
                  }
                  aria-label="ant example"
                >
                  <ThemedTab label="Client Details" />
                  <ThemedTab label="Questions" />
                  <ThemedTab label="Rating" />
                </ThemedTabs>
              </Grid>
              <Grid item md={12}>
                {this.renderLeftContent(this.state.leftTabCount)}
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4}>
            <Grid container>
              <Grid item md={12}>
                <ThemedTabs
                  value={this.state.rightTabCount}
                  textColor={"inherit"}
                  onChange={(e, value) =>
                    this.setState({ rightTabCount: value })
                  }
                  aria-label="ant example"
                >
                  <ThemedTab label="Checklist" />
                  <ThemedTab label="Resources" />
                  <ThemedTab label="Verification" />
                </ThemedTabs>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Mysnack
          snackMsg={this.state.snackmsg}
          snackVariant={this.state.snackvariant}
          snackOpen={this.state.snackopen}
          onClose={() => this.setState({ snackopen: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    completecallList: state.CallReducer.completecall,
  };
};

export default connect(mapStateToProps, { completecall,skipcall })(CallSummaryLayout);
