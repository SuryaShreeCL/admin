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
import { AVOID_INPUT } from "../../../Constants";

class TopicTestCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { testSections, handleChange } = this.props.data;
    return (
      <>
        <Divider />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <InputTextField
              name="noOfQuestions"
              type={"number"}
              onKeyDown={evt =>
                (AVOID_INPUT.includes(evt.key) ||
                  // Up arrow and down arrow disabling
                  evt.keyCode === 38 ||
                  evt.keyCode === 40) &&
                evt.preventDefault()
              }
              onChange={handleChange}
              value={testSections.noOfQuestions}
              label="Number of question"
              height="11px"
              placeholder="Number of question"
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
                onKeyDown={evt =>
                  (AVOID_INPUT.includes(evt.key) ||
                    // Up arrow and down arrow disabling
                    evt.keyCode === 38 ||
                    evt.keyCode === 40) &&
                  evt.preventDefault()
                }
                value={testSections.duration}
                name="duration"
                placeholder="Expected time for completion"
                onChange={handleChange}
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
