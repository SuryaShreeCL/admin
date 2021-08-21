import React, { Component } from "react";
import CourseTaken from "./CoursesTaken/Index";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <CourseTaken />
      </>
    );
  }
}

export default Index;
