import React, { Component, Fragment } from "react";
import { StyledTaps } from "../../../Utils/Tabs";
import DropDown from "../../../Utils/DropDown";
import { Divider, TabContainer } from "../../../Assets/StyledComponents";
import { InputTextField } from "../../../Utils/TextField";
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  Grid,
  InputAdornment,
} from "@material-ui/core";
class CalibrationTestCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      tabValue,
      tabLabels,
      totalSection,
      sectionChange,
      testData,
      tabChange,
      testPropertiesChange,
    } = this.props.data;
    return (
      <>
        <Divider />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <DropDown
              label="Number of Section"
              name="section"
              items={[
                { id: 1, title: 1 },
                { id: 2, title: 2 },
                { id: 3, title: 3 },
                { id: 4, title: 4 },
                { id: 5, title: 5 },
              ]}
              value={totalSection}
              onChange={sectionChange}
            />
          </Grid>
        </Grid>
        <TabContainer style={{ margin: "24px 0px 30px 0px" }}>
          <StyledTaps
            tabsData={{
              tabId: tabValue - 1,
              handleTabChange: tabChange,
              tabsBackColor: "#1093FF",
              tabData: tabLabels,
              activeClass: "active__task__tab",
              styleName: "test",
            }}
          />
        </TabContainer>
        {testData.map((item, index) => {
          return (
            <Fragment key={index}>
              <div hidden={tabValue !== index + 1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <InputTextField
                      name="name"
                      onChange={testPropertiesChange}
                      value={item.name}
                      label="Section Name"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputTextField
                      name="noOfQuestions"
                      onChange={testPropertiesChange}
                      value={item.noOfQuestions}
                      label="Number of question"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Expected time for completion</InputLabel>
                      <OutlinedInput
                        type={"number"}
                        value={item.duration}
                        name="duration"
                        onChange={testPropertiesChange}
                        endAdornment={
                          <InputAdornment position="end">min</InputAdornment>
                        }
                        labelWidth={230}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container style={{ paddingTop: "30px" }} spacing={2}>
                  <Grid item xs={12} md={6}>
                    <InputTextField
                      name="sectiondescription"
                      onChange={() => {}}
                      //value={""}
                      label="Section Description"
                      multiline
                      rows={3}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputTextField
                      name="instruction"
                      onChange={() => {}}
                      //value={""}
                      label="Section instruction"
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </div>
            </Fragment>
          );
        })}
      </>
    );
  }
}

export default CalibrationTestCard;
