import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import "../../Asset/All.css";
import { connect } from "react-redux";
import { studentFeedback } from "../../Actions/Student";

export class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rateYourOverallExperience: "",
      recommendationsReceived: "",
      suggestThisToYourFriend: "",
      ImproveYourExperience: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    let data = {
      rateYourOverallExperience: this.state.rateYourOverallExperience,
      recommendationsReceived: this.state.recommendationsReceived,
      suggestThisToYourFriend: this.state.suggestThisToYourFriend,
      ImproveYourExperience: this.state.ImproveYourExperience,
    };
    this.props.studentFeedback(data);
  };

  breakpoints = createBreakpoints({});
  feedbackTheme = () =>
    createTheme({
      overrides: {
        MuiInputLabel: {
          shrink: {
            backgroundColor: "white",
          },
          root: {
            fontSize: 16,
            width: "90%",
            [this.breakpoints.down("sm")]: {
              fontSize: 14,
            },
          },
        },
      },
    });

  render() {
    return (
      <ThemeProvider theme={this.feedbackTheme()}>
        <div className="feedback-container">
          <div className="item-header item-feedback-header">
            <label className="item-header-label">Feedback</label>
            <label className="item-header-feedback-label">
              Please tell us about your experience
            </label>
          </div>
          <div className="item-body item-feedback-body">
            <FormControl
              variant="outlined"
              size="small"
              full
              fullWidth
              className="item-input-box"
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Rate your overall experience
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Rate your overall experience"
                onChange={(e) =>
                  this.setState({ rateYourOverallExperience: e.target.value })
                }
                value={this.state.rateYourOverallExperience}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Average">Average</MenuItem>
                <MenuItem value="Satisfy">Satisfy</MenuItem>
                <MenuItem value="Bad">Bad</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-textarea"
              label="How happy are you happy with the recommendations received?"
              className="item-input-box"
              size="small"
              fullWidth
              variant="outlined"
              onChange={(e) =>
                this.setState({ recommendationsReceived: e.target.value })
              }
            />
            <TextField
              id="outlined-textarea"
              label="On a scale of 1-10 how likely are you to suggest this to your friend?"
              className="item-input-box"
              size="small"
              fullWidth
              variant="outlined"
              onChange={(e) =>
                this.setState({ suggestThisToYourFriend: e.target.value })
              }
            />
            <TextField
              id="outlined-textarea"
              label="How we can improve your experience?"
              rows={4}
              multiline
              className="item-input-box"
              size="small"
              fullWidth
              variant="outlined"
              onChange={(e) =>
                this.setState({ ImproveYourExperience: e.target.value })
              }
            />
          </div>
          <div className="item-footer-">
            <Button
              variant="contained"
              color="primary"
              small="small"
              className="item-btn"
              onClick={(e) => this.handleSubmit(e)}
            >
              Submit Feedback
            </Button>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToprops = (state) => {
  return { QuestionList: state.StudentReducer.StudentFeedback };
};

export default connect(mapStateToprops, { studentFeedback })(Feedback);
