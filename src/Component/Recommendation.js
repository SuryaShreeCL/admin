import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { getStudentsById } from "../Actions/Student";
import {
  getMarkettingRecommended,
  getServiceRecommended,
} from "../Actions/Course";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

export class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataFromdb: [],
      courses: [],
    };
  }

  componentDidMount() {
    this.props.getStudentsById(this.props.id);
    this.props.getMarkettingRecommended(this.props.id);
  }

  testcourses(arrayf, arrays) {
    for (let i = 0; i < arrayf.length; i++) {
      for (let j = 0; j < arrays.length; j++) {
        if (arrayf[i] === arrays[i]) {
          return (
            <tr>
              {" "}
              <td className="match">{arrayf[i]}</td>
            </tr>
          );
        }
      }
    }
  }
  addArray(val) {
    this.state({
      courses: val,
    });
  }

  getCourse = (name) => {
    if (this.props.MarkettingRecommended.length !== 0) {
      if (name === "recommended") {
        return this.props.MarkettingRecommended.recommendedCourses.map(
          (recommended) => {
            return (
              <tr>
                <td>{recommended.name}</td>
              </tr>
            );
          }
        );
      } else if (name === "services") {
        return this.props.MarkettingRecommended.svcRecommendedCourses.map(
          (service) => {
            return (
              <tr>
                <td>{service.name}</td>
              </tr>
            );
          }
        );
      } else if (name === "mentor") {
        return this.props.MarkettingRecommended.mentorRecommendedCourses.map(
          (mentor) => {
            return (
              <tr>
                <td>{mentor.name}</td>
              </tr>
            );
          }
        );
      }
    }
  };

  render() {
    // let result = [];
    // let dbres = [];
    // let flat = [];

    // let mentor = [];
    // let recommended = [];
    // if (this.props.StudentDetails.length !== 0) {
    //   //mentor
    //   let mentorArr = this.props.StudentDetails.mentorRecommendedCourses.map(
    //     (Mentor) => {
    //       if (mentor.indexOf(Mentor.name) === -1) {
    //         return mentor.push(Mentor.name);
    //       }
    //     }
    //   );
    //   console.log(mentor)
    //   recommendedCourses
    //   let recommendedArr = this.props.StudentDetails.recommendedCourses.map(
    //     (recommend) => {
    //       if (recommended.indexOf(recommend.name) === -1) {
    //         return recommended.push(recommend.name);
    //       }
    //     }
    //   );
    //   console.log(recommended)
    // }

    // function Recommendation() {
    //   return recommended.sort().map((recommended) => {
    //     if (mentor.indexOf(recommended) !== -1) {
    //       return (
    //         <tr>
    //           <td className="match_val">{recommended}</td>
    //         </tr>
    //       );
    //     } else {
    //       return (
    //         <tr>
    //           <td>{recommended}</td>
    //         </tr>
    //       );
    //     }
    //   });
    // }
    // function Mentor() {
    //   return mentor.sort().map((mentor) => {
    //     if (recommended.indexOf(mentor) === -1) {
    //       return (
    //         <tr>
    //           <td className="">{mentor}</td>
    //         </tr>
    //       );
    //     } else {
    //       return (
    //         <tr>
    //           <td className="">{mentor}</td>
    //         </tr>
    //       );
    //     }
    //   });
    // }

    return (
      <div>
        <div className="table-resonsive-sm">
          <div className="text-end">
            <Grid container spacing={3}>
              <Grid item md={4}>
                <Button
                  variant="contained"
                  color="primary"
                  className="text-margin-bottom"
                >
                  Run Marketing Recommendation
                </Button>
              </Grid>
              <Grid item md={4}>
                <Button
                  variant="contained"
                  color="primary"
                  className="text-margin-bottom"
                >
                  Run Service Recommendation
                </Button>
              </Grid>
              <Grid item md={4}></Grid>
            </Grid>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Marketting Recommendation</th>
                <th>Service Recommendation</th>
                <th>Mentor Recommendation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.getCourse("recommended")}</td>
                <td> {this.getCourse("services")} </td>
                <td> {this.getCourse("mentor")} </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    StudentDetails: state.StudentReducer.StudentList,
    MarkettingRecommended: state.CourseReducer.MarkettingRecommended,
    ServiceRecommended: state.CourseReducer.ServiceRecommended,
  };
};

export default connect(mapStateToProps, {
  getStudentsById,
  getMarkettingRecommended,
  getServiceRecommended,
})(Recommendation);
