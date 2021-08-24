import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { AddButton } from "../../../Utils/Buttons";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import {
  Divider,
  CenteredImg,
  SubTitle,
  SubHeaderTitle,
} from "../../../Assets/StyledComponents";
import Freepik from "../../../Assets/images/freepik.png";
import { RadioButtonsGroup } from "../../../Utils/RadioButton";

class QuestionBankCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionPattern: "1",
    };
  }
  handleQuestionPatternChange = (event) => {
    this.setState({ testType: event.target.value });
  };

  render() {
    const { questionPattern } = this.state;
    return (
      <>
        <Divider />
        <Grid container spacing={3}>
          <Grid item md={12}>
            <SubHeaderTitle>Question</SubHeaderTitle>
          </Grid>
          <Grid item md={12}>
            <RadioButtonsGroup
              radioData={{
                name: "questionPattern",
                activeValue: questionPattern,
                radioItemData: [
                  { id: "1", label: "one" },
                  { id: "2", label: "Two" },
                ],
                handleRadioChange: this.handleQuestionPatternChange,
                groupName: "Question Pattern",
                marginRightValue: "34px",
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={4}
          alignItems={"center"}
          justifyContent={"space-between"}
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

export default QuestionBankCard;
