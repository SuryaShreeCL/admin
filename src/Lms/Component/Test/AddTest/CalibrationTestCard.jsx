import React, { Component, Fragment } from "react";
import { StyledTaps } from "../../../Utils/Tabs";
import DropDown from "../../../Utils/DropDown";
import { Divider, TabContainer } from "../../../Assets/StyledComponents";
import { InputTextField } from "../../../Utils/TextField";
import { AutocompleteText } from "../../../Utils/Autocomplete";
import { AddButton } from "../../../Utils/Buttons";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  Grid,
  InputAdornment,
  Button,
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
      subjects,
      sectionInstructionChange,
    } = this.props.data;
    return (
      <>
        <Divider />
        <Grid container spacing={3} justifyContent={"flex-end"}>
          {/* <DropDown
              label="Number of Section"
              name="section"
              items={
                (subjects.length !== 0 &&
                  subjects.map((item, number) => ({
                    id: number + 1,
                    title: number + 1,
                  }))) ||
                []
              }
              value={totalSection || undefined}
              onChange={sectionChange}
              placeHolder="Number of Section"
            /> */}
          <AddButton
            style={{
              background: "none",
              fontWeight: 600,
              fontSize: "18px",
              color: "#1093FF",
              marginRight: 5,
            }}
            startIcon={
              <AddRoundedIcon
                style={{ marginLeft: 4, marginRight: -8, fontSize: "24px" }}
              />
            }
            onClick={sectionChange}
          >
            Add New Section
          </AddButton>
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
          var sliceName = testData
            .filter(
              (subject) =>
                subject.name !== item.name &&
                subject.name !== null &&
                subject.name.trim().length !== 0
            )
            .map((subjectName) => subjectName.name);
          return (
            <Fragment key={index}>
              <div hidden={tabValue !== index + 1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <DropDown
                      label="Section name"
                      name="name"
                      items={
                        (subjects.length !== 0 &&
                          subjects
                            .filter((item) => sliceName.indexOf(item.label))
                            .map((item) => ({
                              id: item.label,
                              title: item.label,
                            }))) ||
                        []
                      }
                      value={item.name !== null ? item.name : ""}
                      onChange={(e) => testPropertiesChange(index, e)}
                      placeHolder="Subject"
                      key={item}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputTextField
                      name="noOfQuestions"
                      onChange={(e) => testPropertiesChange(index, e)}
                      value={item.noOfQuestions}
                      label="Number of question"
                      placeholder="Number of question"
                      height="11px"
                      type={"number"}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel
                        shrink={true}
                        style={{
                          top: "-8px",
                          left: "15px",
                          background: "#FFFFFF",
                          padding: "0 10px 0 8px",
                          zIndex: 1,
                        }}
                      >
                        Expected time for completion
                      </InputLabel>
                      <OutlinedInput
                        disabled
                        inputProps={{
                          style: {
                            height: "11px",
                          },
                        }}
                        type={"number"}
                        value={item.duration}
                        name="duration"
                        placeholder="Expected time for completion"
                        onChange={(e) => testPropertiesChange(index, e)}
                        endAdornment={
                          <InputAdornment position="end">mins</InputAdornment>
                        }
                        labelWidth={230}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container style={{ paddingTop: "30px" }} spacing={2}>
                  <Grid item xs={12} md={4}>
                    <InputTextField
                      name="descriptionTitle"
                      onChange={(e) => testPropertiesChange(index, e)}
                      value={item.descriptionTitle}
                      label="Section Instruction heading"
                      placeholder="Section Instruction heading"
                      height="11px"
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <InputTextField
                      name="nameDescription"
                      onChange={(e) => testPropertiesChange(index, e)}
                      value={item.nameDescription}
                      label="Section Description"
                      placeholder="Section Description"
                      multiline
                      rows={3}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AutocompleteText
                      autoData={{
                        key: index,
                        label: "Section Instruction Details",
                        placeholder: "List The Instruction",
                        title: "Type the content and press enter",
                        value:
                          item.description !== null ? item.description : [],
                        onChange: sectionInstructionChange,
                      }}
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
