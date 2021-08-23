import React, { Component } from "react";
import {
  Card,
  Box,
  TestTitle,
  Cancel,
  Save,
} from "../../../Assets/StyledComponents";

export default class Add extends Component {
  render() {
    return (
      <Card padding={"10px"}>
        <Box display={"flex"} alignItems={"center"}>
          {/* Header */}
          <TestTitle flex={1}>Add new Test</TestTitle>
          <Box display={"flex"} gridGap={"30px"}>
            {/* cancel */}
            <Cancel>Cancel</Cancel>
            {/* save */}
            <Save>Save</Save>
          </Box>
        </Box>
      </Card>
    );
  }
}
