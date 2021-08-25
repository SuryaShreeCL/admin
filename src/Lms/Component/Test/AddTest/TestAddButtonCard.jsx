import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { AddButton } from "../../../Utils/Buttons";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { CenteredImg, SubTitle } from "../../../Assets/StyledComponents";
import Freepik from "../../../Assets/images/freepik.png";

class TestAddButtonCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { addQuestion, type } = this.props;
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
            <AddButton
              startIcon={<AddRoundedIcon style={{ marginLeft: 6 }} />}
              onClick={addQuestion}
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

export default TestAddButtonCard;
