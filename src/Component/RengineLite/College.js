import React, { Component } from "react";
import CreatableSelect from "react-select/creatable";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import $ from "jquery";
import { getColleges, getBranches } from "../../Actions/College";

export class College extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collegeName: "",
      branch: "",
      cgpa: "",
    };
  }

  componentDidMount() {
    this.props.getColleges();
    this.props.getBranches();
    // $(document).ready(function(){
    //   $('.college-select1__control').prepend('<div class="react-select-label">Which college are you studying in?</div>');
    //   $(document).click(function(e){
    //     var target=e.target.className;
    //     var parent=$('.css-2b097c-container');
    //     //college-select1__indicator
    //     if($('.college-select1__value-container').hasClass(target) || $('.react-select-label').hasClass(target) || $('.college-select1__indicator').hasClass(target) ){
    //       $('.react-select-label').addClass('focused');
    //     }
    //     else{
    //       $('.react-select-label').removeClass('focused');
    //     }
    //   })

    // });
  }

  handleCollegeChange = (e) => {
    if (e != null) {
      this.setState({ collegeName: e.value });
    }
  };
  handleBranchChange = (e) => {
    if (e != null) {
      this.setState({ branch: e.value });
    }
  };
  handleCgpaval = (e) => {
    this.setState({ cgpa: e.target.value });
  };

  render() {
    var Collegeoptions = this.props.CollegeList.slice(0, 10).map((college) => {
      return { value: college.name, label: college.name };
    });
    var Branchoptions = this.props.BranchList.map((branch) => {
      return { value: branch.name, label: branch.name };
    });

    var collegeInfo = {
      studentId: window.sessionStorage.getItem("studentId"),
      collegeName: this.state.collegeName,
      departmentName: this.state.branch,
      cgpa: this.state.cgpa,
    };

    if (
      this.state.collegeName != "" ||
      this.state.branch ||
      this.state.cgpa != ""
    ) {
      window.sessionStorage.setItem("collegeInfo", JSON.stringify(collegeInfo));
    }
    var clgInfo = JSON.parse(window.sessionStorage.getItem("collegeInfo"));
    if (clgInfo != undefined || clgInfo != null) {
      this.state.collegeName = clgInfo.collegeName;
      this.state.branch = clgInfo.departmentName;
      this.state.cgpa = clgInfo.cgpa;
    }

    return (
      <div>
        <div className="item-header">
          <label className="item-header-label clg-label">Your College</label>
        </div>
        <div className="item-body">
          <CreatableSelect
            isClearable={true}
            options={Collegeoptions}
            placeholder="Which college are you studying in?"
            classNamePrefix="college-select1"
            isOptionSelected={this.handleSelect}
            onChange={this.handleCollegeChange.bind(this)}
            value={(this.state.collegeName!=='') ?{ label: this.state.collegeName, value: this.state.collegeName} :null }
          />
          <CreatableSelect
            isClearable={true}
            options={Branchoptions}
            placeholder="Enter Your Branch"
            classNamePrefix="college-select2"
            onChange={this.handleBranchChange.bind(this)}
            value={(this.state.branch!=='') ?{ label: this.state.branch, value: this.state.branch} :null }
          />

          <TextField
            variant="outlined"
            size="small"
            fullWidth
            label="CGPA"
            value={this.state.cgpa}
            onChange={this.handleCgpaval.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToprops = (state) => {
  // console.log(state);
  return {
    CollegeList: state.CollegeReducer.CollegeList,
    BranchList: state.CollegeReducer.BranchList,
  };
};

export default connect(mapStateToprops, { getColleges, getBranches })(College);
