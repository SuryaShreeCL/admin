import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "../Asset/EditCourse.css";
import $ from "jquery";
import Select from "react-select";
import { coursePath } from "./RoutePaths";
import { connect } from "react-redux";
import { addCourses } from "../Actions/Course";

export class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: [
        { value: "Starter", label: "Starter" },
        { value: "Regular", label: "Regular" },
        { value: "Advance", label: "Advance" },
      ],
      id: "",
      name: "",
      description: "",
      lmsUrl: "",
      displayImageUrl: "",
      thumbnailUrl: "",
      courseLevel: "",
      courseCategory: "",
      domains: "",
      parentBranchVal: "",
      branchVal: "",
      preRequisiteName: "",
    };
  }

  options = [{ value: "chocolate", label: "Chocolate" }];

  componentDidMount() {
    $("#inputGroupFile01").on("change", function() {
      //get the file name
      var fileName0 = $(this).val();
      //replace the "Choose a file" label
      $(this)
        .next(".f1")
        .html(fileName0);
    });
    $("#inputGroupFile02").on("change", function() {
      //get the file name
      var fileName1 = $(this).val();
      //replace the "Choose a file" label
      $(this)
        .next(".f2")
        .html(fileName1);
    });
    $("#inputGroupFile03").on("change", function() {
      //get the file name
      var fileName2 = $(this).val();
      //replace the "Choose a file" label
      $(this)
        .next(".f3")
        .html(fileName2);
    });
  }

  newCourse(e) {
    let newObj = {
      courseId: this.state.id,
      name: this.state.name,
      description: this.state.description,
      lmsURL: this.state.lmsUrl,
      displayImageURL: this.state.displayImageUrl,
      thumnailImageURL: this.state.thumbnailUrl,
      courseLevel: this.state.courseLevel,
      courseCategory: this.state.courseCategory,
      domains: this.state.domains,
      parentBranchVal: this.state.parentBranchVal,
      branchVal: this.state.branchVal,
      preRequisiteName: this.state.preRequisiteName,
    };
    if (this.state.name !== "") {
      this.props.addCourses(newObj);
      this.props.history.push(coursePath);
    }
  }

  render() {
    return (
      <div>
        <div className="edit-course-root container">
          <div className="edit-course-content">
            <div className="edit-form-header">
              <div className="edit-header-label">
                <label>ADD Course </label>
              </div>
            </div>
            <div className="edit-body">
              <div className="edit-row-1 ">
                <TextField
                  id="filled-search"
                  label="Course Id"
                  type="search"
                  variant="outlined"
                  size="small"
                  className="edit-text-box t1 col-xs-
                  12"
                  value={this.state.id}
                  onChange={(e) => this.setState({ id: e.target.value })}
                />
                <TextField
                  id="filled-search"
                  label="Course Name"
                  type="search"
                  variant="outlined"
                  size="small"
                  className="edit-text-box t2"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              </div>
              <div className="edit-row-2 ">
                <TextField
                  id="filled-search"
                  label="Course Description"
                  type="search"
                  variant="outlined"
                  size="small"
                  fullWidth
                  multiline
                  className="course-desc"
                  value={this.state.description}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </div>
              <div className="edit-row-3">
                <div class="custom-file">
                  <TextField
                    label="Lms Url"
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    className="course-desc"
                    value={this.state.lmsUrl}
                    onChange={(e) => this.setState({ lmsUrl: e.target.value })}
                  />
                </div>

                <div class="custom-file">
                  <TextField
                    label="Display Image Url"
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    className="course-desc"
                    value={this.state.displayImageUrl}
                    onChange={(e) =>
                      this.setState({ displayImageUrl: e.target.value })
                    }
                    // value={this.state.displayImageUrl}
                  />
                </div>

                <div class="custom-file">
                  <TextField
                    label="thumnail Image URL"
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    className="course-desc"
                    value={this.state.thumbnailUrl}
                    onChange={(e) =>
                      this.setState({ thumbnailUrl: e.target.value })
                    }
                    // value={this.state.thumbnailUrl}
                  />
                </div>
              </div>
              <div className="edit-row-4">
                <Select
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  isClearable={true}
                  options={this.state.option}
                  placeholder="Course Level"
                  value={this.state.courseLevel}
                  // onChange={(e)=>this.setState({courseLevel:e.value})}
                />

                <Select
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  isClearable={true}
                  options={this.state.option}
                  placeholder="tags"
                />
              </div>
              <div className="edit-row-5">
                <Select
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  isClearable={true}
                  options={this.state.option}
                  placeholder="Similar Courses"
                />

                <Select
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  isClearable={true}
                  options={this.state.option}
                  placeholder="vendor"
                />
              </div>
              <div className="edit-row-6">
                <Select
                  closeMenuOnSelect={true}
                  isSearchable={true}
                  isClearable={true}
                  fullWidth
                  options={this.state.option}
                  placeholder="Skill  provided"
                />
              </div>
              <div className="edit-row-7">
                <Button
                  variant="contained"
                  color="secondary"
                  size="medium"
                  onClick={(e) => this.props.history.push(coursePath)}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  className="edit-save-btn btn-blue margin-left-space"
                  size="medium"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={this.newCourse.bind(this)}
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToprops = (state) => {
  return { AddCourse: state.CourseReducer.AddCourse };
};

export default connect(mapStateToprops, { addCourses })(AddCourse);
