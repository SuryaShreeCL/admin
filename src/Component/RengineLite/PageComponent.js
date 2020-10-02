import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Image from "../../Asset/Images/leftpic.png";
import logo from "../../Asset/Images/logo.png";
import Grid from "@material-ui/core/Grid";
import CareerImage from "../../Asset/Images/cimg.png";
import "../../Asset/All.css";
import "bootstrap/dist/css/bootstrap.css";
import $ from "jquery";
import Home from "./Home";
import Student_data from "../StudentData";
import { connect } from "react-redux";
import {
  postStudents,
  studentCollegeInformation,
  postQuestions,
} from "../../Actions/Student";

export class PageComponent extends Component {
  
  componentDidMount() {
    $(document).ready(function(){
      $('form').submit(function(){
        return false;
      });
      
    })
  }

  handleClick = (e) => {
    var prograssIncrementValue = 100 / 8;
    if (this.props.match.path === "/Rengine/") {
      // console.log(window.sessionStorage.getItem('studentDetail'))
      let stuData = JSON.parse(window.sessionStorage.getItem("studentDetail"));
      console.log(window.sessionStorage.getItem("status"));
      if (stuData.emailId != "" && stuData.fullName != "") {
        if (window.sessionStorage.getItem("status") == 0) {
          this.props.postStudents(stuData);
          window.sessionStorage.setItem("status", 1);
        } else {
          console.log("update student");
        }
      }

      console.log(stuData);
      this.props.history.push("/Rengine/college");
    } else if (this.props.match.path === "/Rengine/college") {
      //update collegeinfo
      if (
        window.sessionStorage.getItem("studentId") != null ||
        window.sessionStorage.getItem("studentId") != undefined
      ) {
        let collegeInfo = JSON.parse(
          window.sessionStorage.getItem("collegeInfo")
        );
        console.log(collegeInfo);
        this.props.studentCollegeInformation(collegeInfo);
      }
      this.props.history.push("/Rengine/study");
    } else if (this.props.match.path === "/Rengine/study") {
      //Post FieldOfStudt
      if (
        window.sessionStorage.getItem("fieldOfStudy") != undefined ||
        window.sessionStorage.getItem("fieldOfStudy") != null
      ) {
        let fieldOfStudy = JSON.parse(
          window.sessionStorage.getItem("fieldOfStudy")
        );
        this.props.postQuestions(fieldOfStudy);
      }
      this.props.history.push("/Rengine/careerOption");
    } else if (this.props.match.path === "/Rengine/careerOption") {
      //Post careerOption
      if (
        window.sessionStorage.getItem("careerOption") != undefined ||
        window.sessionStorage.getItem("careerOption") != null
      ) {
        let careerOption = JSON.parse(
          window.sessionStorage.getItem("careerOption")
        );
        this.props.postQuestions(careerOption);
      }

      this.props.history.push("/Rengine/personality");
    } else if (this.props.match.path === "/Rengine/personality") {
      //postPersonality
      if (
        window.sessionStorage.getItem("personality") != undefined ||
        window.sessionStorage.getItem("personality") != null
      ) {
        let personality = JSON.parse(
          window.sessionStorage.getItem("personality")
        );
        this.props.postQuestions(personality);
      }

      this.props.history.push("/Rengine/careerInterest");
    } else if (this.props.match.path === "/Rengine/careerInterest") {
      //careerInterestRole
      if (
        window.sessionStorage.getItem("careerInterestRole") != undefined ||
        window.sessionStorage.getItem("careerInterestRole") != null
      ) {
        let careerInterestRole = JSON.parse(
          window.sessionStorage.getItem("careerInterestRole")
        );
        this.props.postQuestions(careerInterestRole);
      }
      this.props.history.push("/Rengine/careerInterest1");
    } else if (this.props.match.path === "/Rengine/careerInterest1") {
      //CareerInteresDomain
      if (
        window.sessionStorage.getItem("CareerInterestDomain") != undefined ||
        window.sessionStorage.getItem("CareerInterestDomain") != null
      ) {
        let CareerInterestDomain = JSON.parse(
          window.sessionStorage.getItem("CareerInterestDomain")
        );
        this.props.postQuestions(CareerInterestDomain);
      }

      this.props.history.push("/Rengine/careerInterest2");
    } else if (this.props.match.path === "/Rengine/careerInterest2") {
      //CareerInterestCategory
      if (
        window.sessionStorage.getItem("CareerInterestCategory") != undefined ||
        window.sessionStorage.getItem("CareerInterestCategory") != null
      ) {
        let CareerInterestCategory = JSON.parse(
          window.sessionStorage.getItem("CareerInterestCategory")
        );
        this.props.postQuestions(CareerInterestCategory);
      }
      this.props.history.push("/Rengine/careerInterest3");
    } else if (this.props.match.path === "/Rengine/careerInterest3") {
      //CareerInterestCAtegory1
      if (
        window.sessionStorage.getItem("CareerInterestCategory1") != undefined ||
        window.sessionStorage.getItem("CareerInterestCategory1") != null
      ) {
        let CareerInterestCategory1 = JSON.parse(
          window.sessionStorage.getItem("CareerInterestCategory1")
        );
        this.props.postQuestions(CareerInterestCategory1);
      }
      this.props.history.push("/Rengine/careerTrack");
    } else if (this.props.match.path === "/Rengine/careerTrack") {
      this.props.history.push("/Rengine/feedback");
    }
  };

  handlePrevClick = (e) => {
    if (this.props.match.path === "/Rengine/study") {
      this.props.history.push("/Rengine/college");
    } else if (this.props.match.path === "/Rengine/college") {
      this.props.history.push("/Rengine/");
    } else if (this.props.match.path === "/Rengine/careerOption") {
      this.props.history.push("/Rengine/study");
    } else if (this.props.match.path === "/Rengine/personality") {
      this.props.history.push("/Rengine/careerOption");
    } else if (this.props.match.path === "/Rengine/careerInterest") {
      this.props.history.push("/Rengine/personality");
    } else if (this.props.match.path === "/Rengine/careerInterest1") {
      this.props.history.push("/Rengine/careerInterest");
    } else if (this.props.match.path === "/Rengine/careerInterest2") {
      this.props.history.push("/Rengine/careerInterest1");
    } else if (this.props.match.path === "/Rengine/careerInterest3") {
      this.props.history.push("/Rengine/careerInterest2");
    } else if (this.props.match.path === "/Rengine/careerTrack") {
      this.props.history.push("/Rengine/careerInterest3");
    } else if (this.props.match.path === "/Rengine/careerTrack") {
      this.props.history.push("/Rengine/feedback");
    }
    var prograssIncrementValue = 100 / 7;
    var prograssbarValue = prograssIncrementValue * 1;
    this.setState({ prograssbarValue: prograssbarValue });
  };

  gridThemeContent = () =>
    createMuiTheme({
      overrides: {
        MuiGrid: {
          root: {
            // height:'89vh',
          },
        },
      },
    });



  render() {
    const PageComponent = this.props.component;
    return (
      <ThemeProvider theme={this.gridThemeContent()}>
        <CssBaseline />
        <nav class="navbar navbar-inverse navbar-fixed-top bg-primary">
          <img src={logo} className="logo" />
        </nav>

        {this.props.sidecontainer ? (
          <>
          <form onSubmit={this.handleClick}>
            <Grid container component="main" className="page-component-main">
              <Hidden xsDown>
                <Grid item xs={false} sm={4} md={4}>
                  <img src={Image} className="left-side-img"></img>
                </Grid>
              </Hidden>
              <Grid item xs={12} sm={8} md={8} elevation={6} square>
                <div className="item-container">
                  {this.props.match.path != "/Rengine/feedback" &&
                  this.props.match.path != "/Rengine/" ? (
                    <div className="prograss-bar-body">
                      <div
                        className="prograss-bar"
                        style={{
                          width:
                            "" + this.props.prograssCount * (100 / 8) + "%",
                        }}
                      >
                        {this.props.prograssCount === 1 ? (
                          <label className="prograss-value">0%</label>
                        ) : (
                          <label className="prograss-value">
                            {Math.round(this.props.prograssCount * (100 / 8))}%
                          </label>
                        )}
                      </div>
                    </div>
                  ) : null}
                  <div className="page-container">
                    <PageComponent {...this.props} />
                  </div>
                  {this.props.welcome ? (
                    <div className="item-footer-">
                      <Button
                        variant="contained"
                        name="start"
                        color="primary"
                        small="small"
                        className="item-btn"
                        type='submit'                        
                      >
                        Get Started
                      </Button>
                    </div>
                  ) : null}
                  {this.props.match.path != "/Rengine/feedback" &&
                  this.props.match.path != "/Rengine/" ? (
                    // <nav class="navbar navbar-expand-sm .bg-light navbar-dark fixed-bottom">
                    <div className="item-footer- bottom-footer-">
                      <Button
                        variant="outlined"
                        color="primary"
                        small="small"
                        id="previous"
                        className="item-btn"
                        onClick={this.handlePrevClick}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        small="small"
                        id="next"
                        className="item-btn"
                        type='submit'
                      >
                        Next
                      </Button>
                    </div>
                  ) :
                  null}
                </div>
              </Grid>
            </Grid>
            </form>
          </>
        ) : (
          <div className="page-container">
            <PageComponent {...this.props} />
          </div>
        )}
      </ThemeProvider>
    );
  }
}

const mapStateToprops = (state) => {
  console.log(state);
  if (state.StudentReducer.StudentList != undefined) {
    window.sessionStorage.setItem(
      "studentId",
      state.StudentReducer.StudentList.id
    );
  }
  return { StudentList: state.StudentReducer.StudentList };
};

export default connect(mapStateToprops, {
  postStudents,
  studentCollegeInformation,
  postQuestions,
})(PageComponent);
