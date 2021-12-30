import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Typography,
  withStyles,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import { connect } from "react-redux";
class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChoice: [],
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      this.setState({
        selectedChoice: this.props.data,
      });
    }
  }
  renderSingleChoice = (data, mainindex) => {
    return (
      <FormControl component="fieldset">
        <RadioGroup
          row
          name={data.question}
          // value={value}
          //   onChange={(e)=>this.props.handleChange(data,mainindex,e)}
        >
          {data.choices &&
            data.choices.map((eachItem, choiceindex) => {
              let value = data.correctChoices[0] && data.correctChoices[0].id;

              return (
                <FormControlLabel
                  id={data.id}
                  labelPlacement="end"
                  value={JSON.stringify(eachItem)}
                  control={
                    <Radio
                      id={data.id}
                      checked={value === eachItem.id ? true : false}
                      onChange={(e) =>
                        this.props.handleChange(
                          data,
                          eachItem,
                          mainindex,
                          choiceindex,
                          e
                        )
                      }
                      color="primary"
                      size="small"
                    />
                  }
                  label={eachItem.text}
                />
              );
            })}
        </RadioGroup>
      </FormControl>
    );
  };
  renderQuestion = () => {
    return (
      <>
        {this.state.selectedChoice &&
          this.state.selectedChoice.map((eachdata, mainindex) => {
            return (
              <>
                <Grid item md={12}>
                  <Typography style={{ fontWeight: "600" }}>
                    {eachdata.question}
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  {this.renderSingleChoice(eachdata, mainindex)}
                </Grid>
              </>
            );
          })}
      </>
    );
  };
  render() {
    const { classes } = this.props;
    console.log("render..........................",this.props)
    return (
      <Grid container className={classes.QuesionGrid}>
        {this.renderQuestion()}
      </Grid>
    );
  }
}
const useStyles = (theme) => ({
  QuesionGrid: {
    paddingLeft: "7px",
  },
});
const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(withStyles(useStyles)(Question));
