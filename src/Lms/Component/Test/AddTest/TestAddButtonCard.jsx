/**
 * (c) CareerLabs. All rights reserved.
 **/
import React, { Component } from "react";
import { Grid, IconButton } from "@material-ui/core";
import { AddButton, FillButton } from "../../../Utils/Buttons";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import {
  CenteredImg,
  FlexView,
  SubTitle,
} from "../../../Assets/StyledComponents";
import Freepik from "../../../Assets/images/freepik.png";
import { Question } from "../../../Assets/StyledComponents";
import { MoreVertRounded } from "@material-ui/icons";
import Menu from "./Menu";
import LatexViewer from "../../../Utils/LatexViewer";

class TestAddButtonCard extends Component {
  constructor(props) {
    super(props);
  }

  renderQuestions = ({
    questions,
    handleThreeDotClick,
    handleClose,
    handleDelete,
    popUpId,
    anchorEl,
  }) => {
    if (
      questions !== null &&
      questions !== undefined &&
      questions.length !== 0
    ) {
      return (
        <div>
          {questions.map((question, index) => {
            return (
              <Question id={question.id}>
                <div className="flex-filler">
                  {index + 1}. &nbsp;&nbsp;
                  <LatexViewer math={question.question} />
                </div>
                <IconButton
                  style={{ padding: "3px", height: "30px", margin: "auto 0px" }}
                  onClick={(event) => handleThreeDotClick(event, question.id)}
                >
                  <MoreVertRounded style={{ fill: "#1093ff" }} />
                </IconButton>
              </Question>
            );
          })}
          <Menu
            questionId={popUpId}
            open={anchorEl}
            anchorEl={anchorEl}
            handleClose={handleClose}
            handleDelete={handleDelete}
          />
        </div>
      );
    } else {
      return <CenteredImg src={Freepik} />;
    }
  };

  render() {
    const {
      addQuestion,
      type,
      id,
      questions,
      handleThreeDotClick,
      handleClose,
      anchorEl,
      handleDelete,
      sectionData,
      tabValue,
      popUpId,
      onCopyQuestion,
    } = this.props;
    return (
      <>
        <Grid
          container
          spacing={4}
          alignItems={"center"}
          justifyContent={"space-between"}
          style={{
            marginTop: type !== "QUESTIONBANK" && "24px",
          }}
        >
          <Grid item>
            <SubTitle>List of Question</SubTitle>
          </Grid>
          <Grid item>
            <div>
              <FlexView gap={"20px"}>
                <FillButton onClick={onCopyQuestion}>
                  {"Copy Question"}
                </FillButton>

                <AddButton
                  startIcon={<AddRoundedIcon style={{ marginLeft: 6 }} />}
                  onClick={addQuestion}
                  disabled={
                    id === null
                      ? true
                      : type === "CALIBRATION" && sectionData.length === 0
                      ? true
                      : type === "CALIBRATION" &&
                        sectionData[tabValue - 1] !== undefined &&
                        sectionData[tabValue - 1]["id"] === null
                      ? true
                      : false
                  }
                >
                  Add New Question
                </AddButton>
              </FlexView>
            </div>
          </Grid>
        </Grid>
        {this.renderQuestions({
          questions,
          handleThreeDotClick,
          handleClose,
          anchorEl,
          handleDelete,
          popUpId,
        })}
      </>
    );
  }
}

export default TestAddButtonCard;
