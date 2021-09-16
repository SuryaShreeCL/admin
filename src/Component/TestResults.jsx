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
      numericalAbility: "",
      logicalReasoning: "",
      verbalReasoning: "",
      personalityCode: "",
      technicalTest: "",
    };
  }

  render() {
    return (
      <>
        <div style={{ margin: "10px" }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              Diagnostics Tests
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item md={1}></Grid>
                <Grid item md={3}>
                  <Autocomplete
                    id="debug"
                    // onChange={(e, newValue) =>
                    //   this.setState({
                    //     pgCollege: newValue,
                    //     pgCollegeErr: "",
                    //   })
                    // }
                    options={this.props.getCollegesList}
                    getOptionLabel={(option) => option.name}
                    value={this.state.pgCollege}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // disabled={this.state.documentedit}
                        // error={this.state.pgCollegeErr.length > 0}
                        // helperText={this.state.pgCollegeErr}
                        label="overAllAptitude"
                        margin="normal"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={3}>
                  <Autocomplete
                    id="debug"
                    // onChange={(e, newValue) =>
                    //   this.setState({
                    //     pgCollege: newValue,
                    //     pgCollegeErr: "",
                    //   })
                    // }
                    options={this.props.getCollegesList}
                    getOptionLabel={(option) => option.name}
                    value={this.state.pgCollege}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // disabled={this.state.documentedit}
                        // error={this.state.pgCollegeErr.length > 0}
                        // helperText={this.state.pgCollegeErr}
                        label="numericalAbility"
                        margin="normal"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={5}></Grid>
                <Grid item md={1}></Grid>
                <Grid item md={3}>
                  <Autocomplete
                    id="debug"
                    // onChange={(e, newValue) =>
                    //   this.setState({
                    //     pgCollege: newValue,
                    //     pgCollegeErr: "",
                    //   })
                    // }
                    options={this.props.getCollegesList}
                    getOptionLabel={(option) => option.name}
                    value={this.state.pgCollege}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // disabled={this.state.documentedit}
                        // error={this.state.pgCollegeErr.length > 0}
                        // helperText={this.state.pgCollegeErr}
                        label="logicalReasoning"
                        margin="normal"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={3}>
                  <Autocomplete
                    id="debug"
                    // onChange={(e, newValue) =>
                    //   this.setState({
                    //     pgCollege: newValue,
                    //     pgCollegeErr: "",
                    //   })
                    // }
                    options={this.props.getCollegesList}
                    getOptionLabel={(option) => option.name}
                    value={this.state.pgCollege}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // disabled={this.state.documentedit}
                        // error={this.state.pgCollegeErr.length > 0}
                        // helperText={this.state.pgCollegeErr}
                        label="verbalReasoning"
                        margin="normal"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
            {/* personality test */}
          </Accordion>
        </div>
        <div style={{ margin: "10px" }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              Personality Test
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item md={1}></Grid>
                <Grid item md={3}>
                  <Autocomplete
                    id="debug"
                    // onChange={(e, newValue) =>
                    //   this.setState({
                    //     pgCollege: newValue,
                    //     pgCollegeErr: "",
                    //   })
                    // }
                    options={this.props.getCollegesList}
                    getOptionLabel={(option) => option.name}
                    value={this.state.pgCollege}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // disabled={this.state.documentedit}
                        // error={this.state.pgCollegeErr.length > 0}
                        // helperText={this.state.pgCollegeErr}
                        label="personalityCode"
                        margin="normal"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </div>
        <div style={{ margin: "10px" }}>
          <Accordion>
            <AccordionSummary
            //   InputProps={{
            //     startAdornment: (
            //       <InputAdornment position="start">
            //         expandIcon={<ExpandMoreIcon />}{" "}
            //       </InputAdornment>
            //     ),
            //   }}
                expandIcon={<ExpandMoreIcon/>}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              Technical Test
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item md={1}></Grid>
                <Grid item md={3}>
                  <Autocomplete
                    id="debug"
                    // onChange={(e, newValue) =>
                    //   this.setState({
                    //     pgCollege: newValue,
                    //     pgCollegeErr: "",
                    //   })
                    // }
                    options={this.props.getCollegesList}
                    getOptionLabel={(option) => option.name}
                    value={this.state.pgCollege}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // disabled={this.state.documentedit}
                        // error={this.state.pgCollegeErr.length > 0}
                        // helperText={this.state.pgCollegeErr}
                        label="technicalTest"
                        margin="normal"
                      />
                    )}
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
