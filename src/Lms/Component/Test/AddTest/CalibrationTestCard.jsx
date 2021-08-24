import React, { Component } from "react";
import { StyledTaps } from "../../../Utils/Tabs";
import DropDown from "../../../Utils/DropDown";
import {
  CenteredImg,
  Divider,
  SubTitle,
  TabContainer,
} from "../../../Assets/StyledComponents";
import { InputTextField } from "../../../Utils/TextField";
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  Grid,
  InputAdornment,
} from "@material-ui/core";
import { AddButton } from "../../../Utils/Buttons";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Freepik from "../../../Assets/images/freepik.png";
class CalibrationTestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
      tabsLabels: [],
      testData: [],
      totalSection: 0,
    };
  }

  handleSectionChange = (e) => {
    const { tabValue } = this.state;
    this.setState({ totalSection: e.target.value });

    if (tabValue < e.target.value) {
      let index = tabValue;
      while (index !== e.target.value) {
        index = index + 1;
        this.setState((prevState) => ({
          // testData: [
          //   ...prevState.testData,
          //   {
          //     //   id: null,
          //     //   name: "",
          //     //   duration: "",
          //     //   noOfQuestions: "",
          //   },
          // ],
          tabsLabels: [
            ...prevState.tabsLabels,
            { tabLabel: "Section " + (prevState.tabValue + 1) },
          ],
          tabValue: prevState.tabValue + 1,
        }));
      }
    } else {
      const tabsLabel = [...this.state.tabsLabels];
      tabsLabel.splice(e.target.value - 1, 1);
      this.setState({ tabsLabel });
    }
  };

  render() {
    const { tabValue, tabsLabels, totalSection } = this.state;
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
              onChange={this.handleSectionChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DropDown
              label="Topic Type"
              name="type"
              items={[
                { id: 1, title: 1 },
                { id: 2, title: 2 },
                { id: 3, title: 3 },
                { id: 4, title: 4 },
                { id: 5, title: 5 },
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <InputTextField
              name="n"
              onChange={() => {}}
              //value={""}
              label="Number of question"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Expected time for completion</InputLabel>
              <OutlinedInput
                type={"number"}
                //value={inputItem.duration}
                name="duration"
                //onChange={taskProperties}
                endAdornment={
                  <InputAdornment position="end">min</InputAdornment>
                }
                labelWidth={230}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container style={{ paddingTop: "30px" }} spacing={2}>
          <Grid
            item
            xs={12}
            md={8}
            style={{
              flex: 1,
            }}
          >
            <InputTextField
              name="description"
              onChange={() => {}}
              //value={""}
              label="Description"
              multiline
              rows={3}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            style={{
              minWidth: "35%",
              padding: 0,
            }}
          ></Grid>
        </Grid>
        <Grid
          container
          spacing={4}
          alignItems={"center"}
          justifyContent={"space-between"}
          style={{
            marginTop: "24px",
          }}
        >
          <Grid item>
            <SubTitle>List of Question</SubTitle>
          </Grid>
          <Grid item>
            <AddButton
              startIcon={<AddRoundedIcon style={{ marginLeft: 6 }} />}
              //onClick={AddTask}
            >
              Add New Question
            </AddButton>
          </Grid>
        </Grid>
        <CenteredImg src={Freepik} />
      </>
    );
  }
}

export default CalibrationTestCard;
