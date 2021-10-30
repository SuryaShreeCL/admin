import React, { Component } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Grid,
  TextField,
  withStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getTestResults } from "../../Actions/ProfileGapAction";
import { connect } from "react-redux";
import TestResultsGraph from "./TestResultsGraph";
import Loader from "../Utils/controls/Loader";

class TestResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      overAllAptitude: "",
      overAllAptitudeErr: "",
      numericalAbility: "",
      numericalAbilityErr: "",
      logicalReasoning: "",
      logicalReasoningErr: "",
      verbalReasoning: "",
      verbalReasoningErr: "",
      personalityCode: "",
      personalityCodeErr: "",
      technicalTest: "",
      technicalTestErr: "",
      diagnosticTestDisable: true,
      personalityTestDisable: true,
      technicalTestDisable: true,
    };
  }

  componentDidMount() {
    this.props.getTestResults(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      (response) => {
        this.setState({
          data: response.data,
        });
      }
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        {this.state.data.length > 0 ? (
          <Grid container className={classes.root}>
            {/* left container */}
            <Grid item md={7}>
              {this.state.data && this.state.data.map((item) => (
                <div className={"accordion_div"}>
                  <Accordion>
                    <AccordionSummary
                      className={classes.accordion}
                      expandIcon={<ExpandMoreIcon />}
                      aria-label="Expand"
                      aria-controls="additional-actions1-content"
                      id="additional-actions1-header"
                    >
                      {item.testName}
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={1}>
                        {item.sectionScoreModels.map((data) => (
                          <>
                          <Grid
                              item
                              md={1}
                              xs={1}
                              sm={1}
                              xl={1}
                              lg={1}
                            ></Grid>
                            <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                              <TextField
                                className={"textField_label"}
                                id="standard-basic"
                                label={data.sectionName.replace("_", " ")}
                                disabled={this.state.diagnosticTestDisable}
                                value={data.studentScore}
                              />
                            </Grid>
                            <Grid
                              item
                              md={1}
                              xs={1}
                              sm={1}
                              xl={1}
                              lg={1}
                            ></Grid>
                          </>
                        ))}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))}
            </Grid>

            {/* right container - graph */}
            <Grid item md={5} justifyContent="flex-end">
              <Card className={classes.card}>
                <TestResultsGraph {...this.props} />
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

const useStyles = (theme) => ({
  accordion: {
    flexDirection: "row-reverse",
  },
  card: {
    padding: "8px",
    height: "100%",
  },
  root: {
    padding: "2%",
  },
});

const mapStateToProps = (state) => {
  return {
    testResponse: state.ProfileGapAnalysisReducer.testResults,
  };
};
export default connect(mapStateToProps, {
  getTestResults,
})(withStyles(useStyles)(TestResults));
