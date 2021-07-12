import {
  Card,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  createMuiTheme,
  TextField,
  withStyles,
  IconButton,
  ThemeProvider,
} from "@material-ui/core";
import React, { Component } from "react";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import PrimaryButton from "../../Utils/PrimaryButton";
import { ExpandMore } from "@material-ui/icons";
import Warning from "../../Asset/Images/warningImg.png";
import Pencil from "../../Asset/Images/pencil.png";
import Autocomplete from "@material-ui/lab/Autocomplete";

const theme = createMuiTheme({
  overrides: {},
});

export class academicInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: "panel1",
      open: false,
    };
  }
  handleChange = (panel) => (event, newExpanded) => {
    console.log(panel, newExpanded);
    this.setState({ expanded: newExpanded ? panel : false });
  };

  Accordion = withStyles({
    root: {
      border: "1px solid rgba(0, 0, 0, .125)",
      borderRadius: 20,
      boxShadow: "none",
      "&:not(:last-child)": {
        borderBottom: 0,
      },
      "&:before": {
        display: "none",
      },
      "&$expanded": {
        margin: "auto",
      },
    },
    expanded: {},
  })(MuiAccordion);

  AccordionSummary = withStyles({
    root: {
      backgroundColor: "rgba(0, 0, 0, .03)",
      borderBottom: "1px solid rgba(0, 0, 0, .125)",
      marginBottom: -1,
      marginTop: 15,
      minHeight: 56,
      "&$expanded": {
        minHeight: 56,
      },
    },
    content: {
      "&$expanded": {
        margin: "20px 0",
      },
    },
    expanded: {},
  })(MuiAccordionSummary);

  AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);

  render() {
    const { HeadStyle, title, ans, secondary } = style;
    return (
      <div>
        <Card style={{ padding: 50 }}>
          <Grid container>
            <Grid item md={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "22%",
                  }}
                >
                  <p style={HeadStyle}>Academic Information</p>
                  <img
                    src={Warning}
                    height={17}
                    width={17}
                    style={{ position: "realative", top: 5 }}
                  />
                </div>
                <IconButton>
                  <img src={Pencil} height={17} width={17} />
                </IconButton>
              </div>
            </Grid>
          </Grid>
          <ThemeProvider theme={theme}>
            <div style={{ marginTop: 5 }}>
              <Accordion style={{ borderRadius: 15 }}>
                <AccordionSummary
                  style={{ height: 49 }}
                  expandIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <Grid container direction="row" justify="flex-start">
                      <p style={title}>Postgraduated Degree</p>
                    </Grid>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item md={3}>
                      <Autocomplete
                        // {...defaultProps}
                        id="debug"
                        debug
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="College Name"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <Autocomplete
                        // {...defaultProps}
                        id="debug"
                        debug
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="University Name"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <Autocomplete
                        // {...defaultProps}
                        id="debug"
                        debug
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Department"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <Autocomplete
                        // {...defaultProps}
                        id="debug"
                        debug
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Degree"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Current semester" />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Graduation year" />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="CGPA" />
                    </Grid>
                    <Grid item md={1}></Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Start date" />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="End date" />
                    </Grid>
                    <Grid item md={1}></Grid>
                    <Grid item md={12}></Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion
                style={{ borderRadius: 15, marginTop: 15 }}
              >
                <AccordionSummary
                  style={{ height: 49 }}
                  expandIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <Grid container direction="row" justify="flex-start">
                      <p style={title}>Undergrdauate Degree</p>
                    </Grid>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item md={3}>
                      <Autocomplete
                        // {...defaultProps}
                        id="debug"
                        debug
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="College Name"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <Autocomplete
                        // {...defaultProps}
                        id="debug"
                        debug
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="University Name"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <Autocomplete
                        // {...defaultProps}
                        id="debug"
                        debug
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Department"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <Autocomplete
                        // {...defaultProps}
                        id="debug"
                        debug
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Degree"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Current semester" />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Graduation year" />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="CGPA" />
                    </Grid>
                    <Grid item md={1}></Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Start date" />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="End date" />
                    </Grid>
                    <Grid item md={1}></Grid>
                    <Grid item md={12}></Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion
                style={{ borderRadius: 15, marginTop: 15 }}
                expandIcon={<ExpandMore style={{ color: "#1093FF" }} />}
              >
                <AccordionSummary
                  style={{ height: 49 }}
                  expandIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <Grid container direction="row" justify="flex-start">
                      <p style={title}>Diplomo</p>
                    </Grid>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item md={4}>
                      <Autocomplete
                        // {...defaultProps}
                        id="debug"
                        debug
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="College Name"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Autocomplete
                        // {...defaultProps}
                        id="debug"
                        debug
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Exam Board"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Autocomplete
                        // {...defaultProps}
                        id="debug"
                        debug
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Diplomo Type"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    {/* <Grid item md={3}></Grid> */}
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Current semester" />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Graduation year" />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="CGPA" />
                    </Grid>
                    <Grid item md={1}></Grid>
                    <Grid item md={1}></Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Start date" />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="End date" />
                    </Grid>
                    <Grid item md={12}></Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion
                style={{ borderRadius: 15, marginTop: 15 }}
              >
                <AccordionSummary
                  style={{ height: 49 }}
                  expandIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <Grid container direction="row" justify="flex-start">
                      <p style={title}>XII Grade</p>
                    </Grid>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item md={4}>
                      <Autocomplete
                        // {...defaultProps}
                        id="debug"
                        debug
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="College Name"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Autocomplete
                        // {...defaultProps}
                        id="debug"
                        debug
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Exam Board"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Autocomplete
                        // {...defaultProps}
                        id="debug"
                        debug
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Diplomo Type"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    {/* <Grid item md={3}></Grid> */}
                    <Grid item md={2}>
                      {/* <TextField id="standard-basic" label="" /> */}
                    </Grid>
                    <Grid item md={2}>
                      {/* <TextField id="standard-basic" label="" /> */}
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="CGPA" />
                    </Grid>
                    <Grid item md={2}></Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Start date" />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="End date" />
                    </Grid>
                    {/* <Grid item md={1}></Grid> */}
                    <Grid item md={12}></Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion
                style={{ borderRadius: 15, marginTop: 15 }}
              >
                <AccordionSummary
                  style={{ height: 49 }}
                  expandIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <Grid container direction="row" justify="flex-start">
                      <p style={title}>X Grade</p>
                    </Grid>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item md={4}>
                      <Autocomplete
                        // {...defaultProps}
                        id="debug"
                        debug
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="College Name"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Autocomplete
                        // {...defaultProps}
                        id="debug"
                        debug
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Exam Board"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Autocomplete
                        // {...defaultProps}
                        id="debug"
                        debug
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Diplomo Type"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    {/* <Grid item md={3}></Grid> */}
                    <Grid item md={2}>
                      {/* <TextField id="standard-basic" label="" /> */}
                    </Grid>
                    <Grid item md={2}>
                      {/* <TextField id="standard-basic" label="" /> */}
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="CGPA" />
                    </Grid>
                    <Grid item md={2}></Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Start date" />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="End date" />
                    </Grid>
                    {/* <Grid item md={1}></Grid> */}
                    <Grid item md={12}></Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Grid
                item
                md={12}
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 50,
                }}
              >
                <PrimaryButton
                  style={{ textTransform: "none" }}
                  variant={"contained"}
                  color={"primary"}
                  size={"small"}
                >
                  Save Changes
                </PrimaryButton>
              </Grid>
            </div>
          </ThemeProvider>
        </Card>
      </div>
    );
  }
}

const style = {
  HeadStyle: {
    fontStyle: "Poppins",
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: "18px",
    color: "#0081FF",
    // padding:15
  },
  HeadDisplay: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "17px",
    alignSelf: "flex-start",
    color: "#052A4E",
  },
  ans: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontSize: "12px",
    color: "#686868",
  },
  secondary: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    color: "#052A4E",
  },
};

export default academicInfo;
