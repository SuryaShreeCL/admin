import React, { Component } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Grid,
  TextField,
  InputAdornment
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Autocomplete from "@material-ui/lab/Autocomplete";


export default class TestResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overAllAptitude: "",
      overAllAptitudeErr : "",
      numericalAbility: "",
      numericalAbilityErr : "",
      logicalReasoning: "",
      logicalReasoningErr : "",
      verbalReasoning: "",
      verbalReasoningErr : "",
      personalityCode: "",
      personalityCodeErr : "",
      technicalTest: "",
      technicalTestErr : "",
      diagnosticTestDisable : true,
      personalityTestDisable : true,
      technicalTestDisable : true
    };
  }

  render() {
    return (
      <>
        <div style={{ margin: "10px" }}>
          <Accordion>
            <AccordionSummary
              style={{ flexDirection: "row-reverse" }}
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              Diagnostics Tests
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid item md={1} xs={1} sm={1} xl={1} lg={1}></Grid>
                <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  style={{
                    color: "red",
                    fontStyle: "Montserrat",
                    fontWeight: "700",
                    fontStyle: "normal",
                    bottom: "20px"
                  }}
                  id="standard-basic"
                  label="overAllAptitude"
                  disabled={this.state.diagnosticTestDisable}
                  value={this.state.overAllAptitude}
                  onChange={(e) =>
                    this.setState({
                      overAllAptitude: e.target.value,
                      overAllAptitudeErr: "",
                    })
                  }
                  error={this.state.overAllAptitudeErr.length > 0}
                  helperText={this.state.overAllAptitudeErr}
                />
                </Grid>
                <Grid item md={2} xs={2} sm={2} xl={2} lg={2}></Grid>
                <Grid item md={4} md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  style={{
                    color: "red",
                    fontStyle: "Montserrat",
                    fontWeight: "700",
                    fontStyle: "normal",
                    bottom: "20px"
                  }}
                  id="standard-basic"
                  label="numericalAbility"
                  disabled={this.state.diagnosticTestDisable}
                  value={this.state.numericalAbility}
                  onChange={(e) =>
                    this.setState({
                      numericalAbility: e.target.value,
                      numericalAbilityErr: "",
                    })
                  }
                  error={this.state.numericalAbilityErr.length > 0}
                  helperText={this.state.numericalAbilityErr}
                />
                </Grid>
                <Grid item md={1} xs={1} sm={1} xl={1} lg={1}></Grid>
                <Grid item md={1} xs={1} sm={1} xl={1} lg={1}></Grid>
                <Grid item md={4} md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  style={{
                    color: "red",
                    fontStyle: "Montserrat",
                    fontWeight: "700",
                    fontStyle: "normal",
                    bottom: "15px"
                  }}
                  id="standard-basic"
                  label="logicalReasoning"
                  disabled={this.state.diagnosticTestDisable}
                  value={this.state.logicalReasoning}
                  onChange={(e) =>
                    this.setState({
                      logicalReasoning: e.target.value,
                      logicalReasoningErr: "",
                    })
                  }
                  error={this.state.logicalReasoningErr.length > 0}
                  helperText={this.state.logicalReasoningErr}
                />
                </Grid>
                <Grid item md={2} xs={2} sm={2} xl={2} lg={2}></Grid>
                <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  style={{
                    color: "red",
                    fontStyle: "Montserrat",
                    fontWeight: "700",
                    fontStyle: "normal",
                    bottom: "15px"
                  }}
                  id="standard-basic"
                  label="verbalReasoning"
                  disabled={this.state.diagnosticTestDisable}
                  value={this.state.verbalReasoning}
                  onChange={(e) =>
                    this.setState({
                      verbalReasoning: e.target.value,
                      verbalReasoningErr: "",
                    })
                  }
                  error={this.state.verbalReasoningErr.length > 0}
                  helperText={this.state.verbalReasoningErr}
                />
                </Grid>
              </Grid>
            </AccordionDetails>
         </Accordion>

          {/* personality test */}
        </div>
        <div style={{ margin: "10px" }}>
          <Accordion>
            <AccordionSummary
              style={{ flexDirection: "row-reverse" }}
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              Personality Test
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid item md={1} xs={1} sm={1} xl={1} lg={1}></Grid>
                <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  style={{
                    color: "red",
                    fontStyle: "Montserrat",
                    fontWeight: "700",
                    fontStyle: "normal",
                    bottom: "20px"
                  }}
                  id="standard-basic"
                  label="personalityCode"
                  disabled={this.state.personalityTestDisable}
                  value={this.state.personalityCode}
                  onChange={(e) =>
                    this.setState({
                      personalityCode: e.target.value,
                      personalityCodeErr: "",
                    })
                  }
                  error={this.state.personalityCodeErr.length > 0}
                  helperText={this.state.personalityCodeErr}
                />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* technical test */}
        </div>
        <div style={{ margin: "10px" }}>
          <Accordion>
            <AccordionSummary
              style={{ flexDirection: "row-reverse",display:"flex" }}
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              Technical Test
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid item md={1} xs={1} sm={1} xl={1} lg={1}></Grid>
                <Grid item md={4} xs={4} sm={4} xl={4} lg={4}>
                <TextField
                  style={{
                    color: "red",
                    fontStyle: "Montserrat",
                    fontWeight: "700",
                    fontStyle: "normal",
                    bottom: "20px"
                  }}
                  id="standard-basic"
                  label="technicalTest"
                  disabled={this.state.technicalTestDisable}
                  value={this.state.technicalTest}
                  onChange={(e) =>
                    this.setState({
                      technicalTest: e.target.value,
                      technicalTestErr: "",
                    })
                  }
                  error={this.state.technicalTestErr.length > 0}
                  helperText={this.state.technicalTestErr}
                />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </div>
      </>
    );
  }
}





// [
//     {
//         title : "diagnostic",
//         score: [
//             {
//             title:"logicalReasoning",
//             value: ""
//             }
//         ]
//     },
//     {
//         title : "diagnostic",
//         score: [
//             {
//             title:"logicalReasoning",
//             value: ""
//             }
//         ]
//     },

// ]
