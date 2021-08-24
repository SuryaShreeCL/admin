import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import DropDown from "../../../Utils/DropDown";
import { RadioButtonsGroup } from "../../../Utils/RadioButton";
import { InputTextField } from "../../../Utils/TextField";
import {
  Card,
  Box,
  TestTitle,
  Cancel,
  Save,
} from "../../../Assets/StyledComponents";
import CalibrationTestCard from "./CalibrationTestCard";
import QuestionBankCard from "./QuestionBankCard";
import TopicTestCard from "./TopicTestCard";
import { AutocompleteText } from "../../../Utils/Autocomplete";

export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testId: null,
      type: "CALIBRATION",
      name: "",
      description: "",
      descriptionTitle: "",
      nameDescription: "",
      courseId: null,
      testSections: [],
    };
  }

  handleTestChange = (event) => {
    this.setState({ type: event.target.value });
  };

  render() {
    const { type } = this.state;
    return (
      <Card padding={"0px 20px"}>
        <Box display={"flex"} alignItems={"center"}>
          {/* Header */}
          <TestTitle flex={1}>Add new Test</TestTitle>
          <Box display={"flex"} gridGap={"30px"} overflow={"auto"}>
            {/* cancel */}
            <Cancel>Cancel</Cancel>
            {/* save */}
            <Save>Save</Save>
          </Box>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <DropDown
              label="Course"
              name="course"
              items={[
                { id: "TEXT", title: "TEXT" },
                { id: "VIDEO", title: "VIDEO" },
              ]}
              value={"TEXT"}
              onhandleChange={() => {}} //handleChange
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <RadioButtonsGroup
              radioData={{
                name: "type",
                activeValue: type,
                radioItemData: [
                  { id: "CALIBRATION", label: "Calibration Test" },
                  { id: "TOPIC", label: "Topic Test" },
                  { id: "QUESTION", label: "Question Bank" },
                ],
                handleRadioChange: this.handleTestChange,
                groupName: "Test Type",
                marginRightValue: "56px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <InputTextField
              name="name"
              onChange={() => {}}
              //value={""}
              label="Test name"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <InputTextField
              name="description"
              onChange={() => {}}
              //value={""}
              label="Description"
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <InputTextField
              name="descriptionTitle"
              onChange={() => {}}
              //value={""}
              label="Test Instruction heading"
              style={{ height: "48px" }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <AutocompleteText />
          </Grid>
          {/* description */}
        </Grid>
        {type === "CALIBRATION" && <CalibrationTestCard />}
        {type === "TOPIC" && <TopicTestCard />}
        {type === "QUESTION" && <QuestionBankCard />}
      </Card>
    );
  }
}
