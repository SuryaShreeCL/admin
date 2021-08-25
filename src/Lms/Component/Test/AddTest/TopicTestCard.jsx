import React, { Component } from "react";
import { InputTextField } from "../../../Utils/TextField";
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  Grid,
  InputAdornment,
} from "@material-ui/core";
import { Divider } from "../../../Assets/StyledComponents";
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
            <InputTextField
              name="n"
              onChange={() => {}}
              //value={""}
              label="Number of question"
              height="11px"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel style={{ top: "-4px" }}>
                Expected time for completion
              </InputLabel>
              <OutlinedInput
                inputProps={{
                  style: {
                    height: "11px",
                  },
                }}
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
        <Divider />
      </>
    );
  }
}

export default TopicTestCard;
