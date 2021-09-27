import React, { Component } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Grid,
  TextField,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getTestResults } from "../../Actions/ProfileGapAction";
import { connect } from "react-redux";
import TestResultsGraph from "./TestResultsGraph";

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
    return (
      <>
        <Grid container>

          {/* left container */}
          <Grid item md={7}>
          {this.state.data.map((item) => (
          <div style={{ margin: "10px" }}>
            <Accordion>
              <AccordionSummary
                style={{ flexDirection: "row-reverse" }}
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
                  <Grid item md={1} xs={1} sm={1} xl={1} lg={1}></Grid>
                    <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                    <TextField
                      style={{
                        color: "red",
                        fontStyle: "Montserrat",
                        fontWeight: "700",
                        fontStyle: "normal",
                        bottom: "20px",
                        whiteSpace:"nowrap"
                      }}
                      id="standard-basic"
                      label={data.sectionName.replace("_"," ")}
                      disabled={this.state.diagnosticTestDisable}
                      value={data.studentScore}
                      // onChange={(e) =>
                      //   this.setState({
                      //     overAllAptitude: e.target.value,
                      //     overAllAptitudeErr: "",
                      //   })
                      // }
                    />
                  </Grid>
                  <Grid item md={1} xs={1} sm={1} xl={1} lg={1}></Grid>
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
            <Card style={{padding:"8px",height:"100%"}}>
            <TestResultsGraph {...this.props}/>
            </Card>
          </Grid>
        </Grid>

      
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    testResponse: state.ProfileGapAnalysisReducer.testResults,
  };
};
export default connect(mapStateToProps, {
  getTestResults,
})(TestResults);

