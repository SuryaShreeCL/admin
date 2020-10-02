import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../../Asset/All.css";
import history from "./History";
import { connect } from "react-redux";
import { postStudents } from "../../Actions/Student";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
    };
  }

  componentDidMount() {
    if (
      window.sessionStorage.getItem("status") != 1 ||
      window.sessionStorage.getItem("status") == undefined ||
      window.sessionStorage.getItem("status") == null
    ) {
      window.sessionStorage.setItem("status", 0);
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    var studentDetail = {
      fullName: this.state.name,
      emailId: this.state.email,
      phoneNumber: this.state.phone,
    };
    if (
      this.state.name != "" ||
      this.state.email != "" ||
      this.state.phone != ""
    ) {
      window.sessionStorage.setItem(
        "studentDetail",
        JSON.stringify(studentDetail)
      );
    }
    if (this.state.name.length == 0 && this.state.email.length == 0) {
      let stuData = JSON.parse(window.sessionStorage.getItem("studentDetail"));
      if (stuData != null) {
        this.state.name = stuData.fullName;
        this.state.email = stuData.emailId;
        this.state.phone = stuData.phoneNumber;
      }
    }

    //console.log(JSON.parse(stuData));
    return (
      <div>
        <div className="item-header">
          <label className="item-header-label">WELCOME</label>  
          <label className=''></label>        
        </div>
        <div className="item-body">
          <TextField
            id="outlined-textarea"
            label="What is your name?"
            className="item-input-box"
            size="small"
            name="name"
            onChange={this.handleChange.bind(this)}
            value={this.state.name}
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            id="outlined-textarea"
            label="What is your Email Id?"
            className="item-input-box"
            size="small"
            fullWidth
            variant="outlined"
            name="email"
            onChange={this.handleChange.bind(this)}
            value={this.state.email}
            type='email'
            required
          />
          <TextField
            id="outlined-textarea"
            label="What is your Contact Number?"
            className="item-input-box"
            size="small"
            fullWidth
            variant="outlined"
            name="phone"
            type="number"
            inputProps={{maxlength:10,minlength:0}}
            onChange={this.handleChange.bind(this)}
            value={this.state.phone}
            title='Enter Phone Number'
          />
        </div>
      </div>
    );
  }
}
const mapStateToprops = (state) => {
  return { StudentList: state.StudentReducer.StudentList };
};

export default connect(mapStateToprops, { postStudents })(Home);
