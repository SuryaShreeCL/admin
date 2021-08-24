import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import DropDown from "../../../Utils/DropDown";
import { RadioButtonsGroup } from "../../../Utils/RadioButton";
import { InputTextField } from "../../../Utils/TextField";
import { StyledTaps } from "../../../Utils/Tabs";
import {
  Card,
  Box,
  TestTitle,
  Cancel,
  Save,
  Divider,
  TabContainer,
} from "../../../Assets/StyledComponents";

export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 1,
    };
  }

  render() {
    const { tabValue } = this.state;
    const tabsLabels = [{ tabLabel: "one" }, { tabLabel: "Two" }];
    return (
      <Card padding={"0px 20px"}>
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
        <Grid container spacing={3}>
          <Grid item md={4}>
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
          <Grid item md={8}>
            <RadioButtonsGroup
              radioData={{
                name: "testType",
                activeValue: 1,
                radioItemData: [{ id: 1, label: "one" }],
                handleRadioChange: () => {},
                groupName: "Test Type",
              }}
            />
          </Grid>
          <Grid item md={4}>
            <DropDown
              label="Test name"
              name="testName"
              items={[
                { id: "TEXT", title: "TEXT" },
                { id: "VIDEO", title: "VIDEO" },
              ]}
              value={"TEXT"}
              onhandleChange={() => {}} //handleChange
            />
          </Grid>
          <Grid item md={8}>
            <InputTextField
              name="description"
              onChange={() => {}}
              value={"description"}
              label="Description"
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item md={4}>
            <DropDown
              label="Number of Section"
              name="section"
              items={[
                { id: 1, title: 1 },
                { id: 2, title: 2 },
              ]}
              value={1}
              onhandleChange={() => {}} //handleChange
            />
          </Grid>
        </Grid>
        <TabContainer style={{ margin: "24px 0px 30px 0px" }}>
          <StyledTaps
            tabsData={{
              tabId: tabValue - 1,
              handleTabChange: (e, newValue) =>
                this.setState({ tabValue: newValue + 1 }),
              tabsBackColor: "#1093FF",
              tabData: tabsLabels,
              activeClass: "active__task__tab",
              styleName: "test",
            }}
          />
        </TabContainer>
      </Card>
    );
  }
}
