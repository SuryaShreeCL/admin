import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { Divider, SubHeaderTitle } from "../../../Assets/StyledComponents";
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
      </>
    );
  }
}

export default QuestionBankCard;
