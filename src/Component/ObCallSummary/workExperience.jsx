import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import RoomIcon from "@material-ui/icons/Room";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { ExpandMore } from "@material-ui/icons";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  createMuiTheme, ThemeProvider 
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import PrimaryButton from "../../Utils/PrimaryButton";
import Warning from "../../Asset/Images/warningImg.png";
import Pencil from "../../Asset/Images/pencil.png";
import DateFnsUtils from "@date-io/date-fns";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";


const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      root: {
        whiteSpace: "nowrap",
        fontSize: "12px",
      },
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: "0px",
        marginBottom: "0px",
      },
    },
  }
})
class workExperience extends Component {
  constructor() {
    super();
    this.state = {
      disable: true,
      startDate: null,
      startDateErr: "",
      endDate: null,
      endDateErr: "",
      jobType: "",
      jobTypeErr: "",
      organization: "",
      organizationErr: "",
      jobDescp: "",
      jobDescpErr: "",
      designation:'',
      designationErr:''
    };
  }
  handleClick(e) {
    this.setState({ disable: !this.state.disable });
  }

  handleSave() {
    console.log(this.state);
    let hlptxt = "Please fill the required field";
    this.state.startDate === null
      ? this.setState({ startDateErr: hlptxt })
      : this.setState({ startDateErr: "" });
    this.state.endDate === null
      ? this.setState({ endDateErr: hlptxt })
      : this.setState({ endDateErr: "" });
    this.state.jobType === ""
      ? this.setState({ jobTypeErr: hlptxt })
      : this.setState({ jobTypeErr: "" });
    this.state.jobDescp === ""
      ? this.setState({ jobDescpErr: hlptxt })
      : this.setState({ jobDescpErr: "" });
    this.state.organization === ""
      ? this.setState({ organizationErr: hlptxt })
      : this.setState({ organizationErr: "" });
      this.state.designation === ""
      ? this.setState({ designationErr: hlptxt })
      : this.setState({ designationErr: "" });
  }

  employeeType = [
    {title : "Full-time", value : "Full-time"},
    {title : "Part-time", value : "Part-time"},
    {title : "Self-employed", value : "Self-employed"},
    {title : "freelance", value : "freelance"},
    {title : "Internship", value : "Internship"},
    {title : "Trainee", value : "Trainee"},
  ]

  render() {
    console.log(this.state);
    console.log(new Date(this.state.startDate).setMonth(new Date(this.state.startDate).getMonth()+3))
    return (
      <div style={{ padding: 25 }}>
        <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                width: "13%",
              }}
            >
              <p
                style={{
                  fontStyle: "Poppins",
                  fontWeight: "600",
                  fontStyle: "normal",
                  fontSize: "18px",
                  color: "#0081FF",
                }}
              >
                Work Experience
              </p>
              <img
                src={Warning}
                height={17}
                width={17}
                style={{ position: "realative", top: 5 }}
              />
            </div>
            <IconButton onClick={this.handleClick.bind(this)}>
              <img src={Pencil} height={17} width={17} />
            </IconButton>
          </div>
          <div style={{ paddingTop: 10 }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  Job Role / Designation ,
                  <div style={{ fontSize: 10, paddingTop: "2%" }}>
                    {" "}
                    Company Name
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingLeft: "50%",
                  }}
                >
                  {" "}
                  3months({this.state.startDate}-{this.state.endDate})
                </div>
              </AccordionSummary>

              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item md={3}>
                  <Autocomplete
                            popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                            id="combo-box-demo"
                            // disabled={this.state.disable}
                            value={this.state.jobType}
                            options={this.employeeType}
                            onChange={(e, newValue) =>
                                this.setState({ jobType: newValue,
                                    jobTypeErr: "",})
                              }
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField {...params} label="Employment Type" variant="standard" error={this.state.jobTypeErr.length > 0}
                                helperText={this.state.jobTypeErr}/>
                            )}
                        />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      id="standard-basic"
                      label="Organisation"
                      value={this.state.organization}
                      onChange={(e, newValue) =>
                        this.setState({
                          organization: newValue,
                          organizationErr: "",
                        })
                      }
                      error={this.state.organizationErr.length > 0}
                      helperText={this.state.organizationErr}
                    />
                  </Grid>
                  

                  <Grid item md={3}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Start Date"
                      format="yyyy-MM"
                      views={["year", "month"]}
                      inputProps={{ readOnly: true }}
                      error={this.state.startDateErr.length > 0}
                      helperText={this.state.startDateErr}
                      value={this.state.startDate}
                      onChange={(e, newValue) =>
                        this.setState({ startDate: newValue, startDateErr:'' })
                      }
                     InputLabelProps={{
                        shrink: true,
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                  <Grid item md={3}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="End Date"
                      format="yyyy-MM"
                      views={["year", "month"]}
                      disabled={this.state.startDate === null}
                      minDate={this.state.startDate}
                      maxDate={this.state.startDate !== null ? new Date(this.state.startDate).setMonth(new Date(this.state.startDate).getMonth() + 3): new Date()}
                      error={this.state.endDateErr.length > 0}
                      helperText={this.state.endDateErr}
                      inputProps={{ readOnly: true }}
                      value={this.state.endDate}
                      onChange={(e, newValue) =>
                        this.setState({ endDate: newValue , endDateErr:'' })
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      id="standard-multiline-static"
                      label="Designation"
                      value={this.state.designation}
                      onChange={(e, newValue) =>
                        this.setState({
                            designation: newValue,
                            designationErr: "",
                        })
                      }
                      error={this.state.designationErr.length > 0}
                      helperText={this.state.designationErr}
                   
                    />
                  </Grid>
                  <Grid item md={8}>
                    <TextField
                      id="standard-multiline-static"
                      label="Job Description"
                      multiline
                      value={this.state.jobDescp}
                      onChange={(e, newValue) =>
                        this.setState({
                            jobDescp: newValue,
                            jobDescpErr: "",
                        })
                      }
                      error={this.state.jobDescpErr.length > 0}
                      helperText={this.state.jobDescpErr}
                   
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "15%",
              textTransform: "none",
            }}
          >
            <PrimaryButton
              onClick={() => this.handleSave()}
              variant={"contained"}
              color={"primary"}
              style={{ textTransform: "none" }}
            >
              Save Changes
            </PrimaryButton>
          </div>
        </MuiPickersUtilsProvider>
        </ThemeProvider>
      </div>
    );
  }
}

export default workExperience;
