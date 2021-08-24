import React, { Component } from "react";
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
import {
  Divider,
  CenteredImg,
  SubTitle,
} from "../../../Assets/StyledComponents";
import Freepik from "../../../Assets/images/freepik.png";
class TopicTestCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Divider />
        <Grid container spacing={3}>
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
          <Grid item xs={12} md={4}>
            <InputTextField
              name="n"
              onChange={() => {}}
              //value={""}
              label="Number of question"
            />
          </Grid>
        </Grid>
        <Divider />
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

export default TopicTestCard;
