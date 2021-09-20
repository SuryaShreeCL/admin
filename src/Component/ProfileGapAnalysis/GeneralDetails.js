import React, { Component } from "react";
import {
  createTheme,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  ThemeProvider,
  DialogActions,
  withStyles,
  Popover,
} from "@material-ui/core";
import {
  getAllColleges,
  getDegree,
  getBranches,
} from "./../../Actions/College";
import { Autocomplete } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import PrimaryButton from "../../Utils/PrimaryButton";
import { connect } from "react-redux";
import Dot from "../../Utils/Dot";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
const theme = createTheme({
  overrides: {
    MuiGrid: {
      "spacing-xs-2": {
        width: "100%",
      },
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: "0px",
      },
    },
    MuiInputLabel: {
      root: {
        fontSize: "12px",
        whiteSpace: "nowrap",
      },
    },
    MuiInput: {
      underline: {
        "&:after": {
          borderBottom: "2px solid #1890ff",
        },
      },
    },
  },
});
class GeneralDetails extends Component {
  constructor() {
    super();
    this.state = {
      dialog: false,
      firstname: "",
      lastname: "",
      phone: "",
      clsid: "",
      email: "",
      degree: "",
      fieldofstudy: "",
      college: "",
      sem: "",
      areaofspecialisation: "",
      prefschool: "",
      package: "",
      product: "",
      intake: "",
      choosespe: "",
      popOpen: false,
      anchorEl: null,
      messageopen: true,
      commentdialogopen: false,
    };
  }
  componentDidMount() {
    this.props.getAllColleges();
    this.props.getDegree();
    this.props.getBranches();
  }
  handleopen = () => {
    this.setState({
      dialog: true,
    });
  };
  handleClose = () => {
    this.setState({
      popOpen: false,
      anchorEl: null,
    });
  };
  handleClick = (event) => {
    console.log("jijiojo", event.currentTarget);
    this.setState({
      popOpen: true,
      anchorEl: event.currentTarget,
    });
  };
  handleChat = () => {
    this.setState({
      commentdialogopen: true,
    });
  };
  renderstudentdetails() {
    if (this.props.variantStepList.codeName === "ACS_MS") {
      return (
        <Grid container spacing={3}>
          <Grid item md={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
                onClick={(e) => this.handleClick(e)}
              >
                <Dot color={"green"} />
              </div>
              <div style={{ paddingLeft: "10px", width: "100%" }}>
                <Autocomplete
                  // options={this.props.getAllCollegesList}
                  // getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="college"
                      label="Post Graduate Degree"
                    />
                  )}
                />
              </div>
            </div>
          </Grid>
          <Grid item md={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
                onClick={(e) => this.handleClick(e)}
              >
                <Dot color={"green"} />
              </div>
              <div style={{ paddingLeft: "10px", width: "100%" }}>
                <Autocomplete
                  // options={this.props.getAllCollegesList}
                  // getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="college"
                      label="Post Graduate College"
                    />
                  )}
                />
              </div>
            </div>
          </Grid>
          <Grid item md={4}></Grid>
          <Grid item md={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
                onClick={(e) => this.handleClick(e)}
              >
                <Dot color={"green"} />
              </div>
              <div style={{ paddingLeft: "10px", width: "100%" }}>
                <Autocomplete
                  // options={this.props.getAllCollegesList}
                  // getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="college"
                      label="Post Graduate University"
                    />
                  )}
                />
              </div>
            </div>
          </Grid>
          <Grid item md={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
                onClick={(e) => this.handleClick(e)}
              >
                <Dot color={"green"} />
              </div>
              <div style={{ paddingLeft: "10px", width: "100%" }}>
                <TextField label="Work Experience" />
              </div>
            </div>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid item md={4}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                alignItems: "center",
                display: "flex",
              }}
              onClick={(e) => this.handleClick(e)}
            >
              <Dot color={"orange"} />
            </div>
            <div style={{ paddingLeft: "10px" }}>
              <TextField name="sem" label="Current Semester" />
            </div>
          </div>
        </Grid>
      );
    }
  }
  renderhigherdetails() {
    if (this.props.variantStepList.codeName === "ACS_MS") {
      return (
        <Grid container spacing={3}>
          <Grid item md={4}>
            <TextField label="Round" />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              disabled
              renderInput={(params) => (
                <TextField {...params} label="Choosen Program" />
              )}
            />
          </Grid>
          <Grid item md={4}></Grid>
          <Grid item md={4}>
            <Autocomplete
              disabled
              renderInput={(params) => (
                <TextField {...params} label="Area of Specialisation" />
              )}
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              disabled
              renderInput={(params) => (
                <TextField {...params} label="Preferred Grad School" />
              )}
            />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Autocomplete
              options={this.props.getDegreeList}
              getOptionLabel={(option) => option.name}
              disabled
              renderInput={(params) => (
                <TextField {...params} name="degree" label="Degree Type" />
              )}
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              options={this.props.getBranchesList}
              getOptionLabel={(option) => option.name}
              disabled
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="fieldofstudy"
                  label="Field Of Study"
                />
              )}
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              disabled
              name="choosespe"
              label="Choosen Specialisation"
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              // options={top100Films}
              disabled
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="areaofspecialisation"
                  label="Area Of Specialisation"
                />
              )}
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              // options={top100Films}
              disabled
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="prefschool"
                  label="Preferred Grad School"
                />
              )}
            />
          </Grid>
        </Grid>
      );
    }
  }

  render() {
    console.log(this.props.variantStepList.codeName);
    return (
      <div>
        <ThemeProvider theme={theme}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "20px",
            }}
          >
            <Typography>Student Details</Typography>
            <ChatBubbleOutlineIcon
              style={{ marginLeft: "10px" }}
              onClick={() => this.handleChat()}
            />
          </div>
          <Grid
            container
            spacing={2}
            style={{ padding: "25px", marginTop: "-30px" }}
          >
            <Grid item md={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                  }}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Dot color={"green"} />
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  <TextField disabled name="clsid" label="CLS ID" />
                </div>
              </div>
            </Grid>
            <Grid item md={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                  }}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Dot color={"green"} />
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  <TextField name="firstname" label="First Name" />
                </div>
              </div>
            </Grid>
            <Grid item md={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                  }}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Dot color={"green"} />
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  <TextField name="lastname" label="Last Name" />
                </div>
              </div>
            </Grid>
            <Grid item md={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                  }}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Dot color={"green"} />
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  <TextField name="phone" disabled label="Phone Number" />
                </div>
              </div>
            </Grid>
            <Grid item md={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                  }}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Dot color={"green"} />
                </div>
                <div style={{ paddingLeft: "10px" }}>
                  <TextField disabled name="email" label="Email Address" />
                </div>
              </div>
            </Grid>
            <Grid item md={4}></Grid>
            <Grid item md={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                  }}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Dot color={"green"} />
                </div>
                <div style={{ paddingLeft: "10px", width: "100%" }}>
                  <Autocomplete
                    fullWidth
                    options={this.props.getDegreeList}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="degree"
                        label="Degree Type"
                      />
                    )}
                  />
                </div>
              </div>
            </Grid>
            <Grid item md={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                  }}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Dot color={"green"} />
                </div>
                <div style={{ paddingLeft: "10px", width: "100%" }}>
                  <Autocomplete
                    options={this.props.getBranchesList}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="fieldofstudy"
                        label="Field Of Study"
                      />
                    )}
                  />
                </div>
              </div>
            </Grid>
            <Grid item md={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                  }}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Dot color={"green"} />
                </div>
                <div style={{ paddingLeft: "10px", width: "100%" }}>
                  <Autocomplete
                    options={this.props.getAllCollegesList}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="college"
                        label="College Name"
                      />
                    )}
                  />
                </div>
              </div>
            </Grid>
            <Grid item md={12}>
              {this.renderstudentdetails()}
            </Grid>
          </Grid>
          <Typography style={{ marginLeft: "20px" }}>
            Higher Education Aspiration
          </Typography>
          <Grid
            container
            spacing={3}
            style={{ padding: "25px", marginTop: "-30px" }}
          >
            <Grid item md={12} style={{ marginLeft: "25px" }}>
              {this.renderhigherdetails()}
            </Grid>
          </Grid>
          <Typography style={{ marginLeft: "20px" }}>
            Package Details
          </Typography>
          <Grid
            container
            spacing={2}
            style={{ padding: "25px", marginTop: "-30px" }}
          >
            <Grid item md={12} style={{marginLeft: "25px"}}>
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <TextField
                    disabled
                    name="package"
                    label="Package Purchased"
                  />
                </Grid>
                <Grid item md={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disabled
                      margin="normal"
                      label="Enrollment Period"
                      format="dd/MM/yyyy"
                      // value={selectedDate}
                      // onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item md={4}></Grid>
                <Grid item md={4}>
                  <TextField name="product" disabled label="Product" />
                </Grid>
                <Grid item md={4}>
                  <Autocomplete
                    // options={top100Films}
                    disabled
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="intake"
                        disabled
                        label="Intake"
                      />
                    )}
                  />
                  {/* <TextField name="intake" disabled label="Intake" /> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ padding: "10px" }}>
            <Grid item md={12}>
              <hr />
            </Grid>
            <Grid item md={12} align={"right"}>
              <PrimaryButton
                color={"primary"}
                variant={"contained"}
                style={{ width: "100px", marginTop: "-20px" }}
                onClick={() => this.handleopen()}
              >
                Save
              </PrimaryButton>
            </Grid>
          </Grid>
          <Dialog
            open={this.state.dialog}
            onClose={() => this.setState({ dialog: false })}
          >
            <DialogTitle>
              <Grid container>
                <Grid item md={12} align="left">
                  <Typography>Change Verification</Typography>
                </Grid>
                <Grid item md={12}>
                  <hr />
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Typography>
                    We see that you have made changes to Student Name ,Would you
                    like to comment?
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography>Old Name</Typography>
                </Grid>
                <Grid item md={6} style={{ color: "grey" }}>
                  Enter Student Name
                </Grid>
                <Grid item md={6} style={{ fontWeight: "bold" }}>
                  Venkat
                </Grid>
                <Grid item md={12}>
                  New Name
                </Grid>
                <Grid item md={6} style={{ color: "grey" }}>
                  Enter Student Name
                </Grid>
                <Grid item md={6} style={{ fontWeight: "bold" }}>
                  Venkat
                </Grid>
                <Grid item md={12}>
                  <TextField fullWidth label="Comments" name="comments" />
                </Grid>
                <Grid item md={12}>
                  <Typography>
                    We see that you have made changes to Student Name ,Would you
                    like to comment?
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography>Old Name</Typography>
                </Grid>
                <Grid item md={6} style={{ color: "grey" }}>
                  Enter Student Name
                </Grid>
                <Grid item md={6} style={{ fontWeight: "bold" }}>
                  Venkat
                </Grid>
                <Grid item md={12}>
                  New Name
                </Grid>
                <Grid item md={6} style={{ color: "grey" }}>
                  Enter Student Name
                </Grid>
                <Grid item md={6} style={{ fontWeight: "bold" }}>
                  Venkat
                </Grid>
                <Grid item md={12}>
                  <TextField fullWidth label="Comments" name="comments" />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Grid container>
                <Grid item md={8}></Grid>
                <Grid item md={4}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                      <PrimaryButton
                        style={{ width: "100px" }}
                        color="primary"
                        variant="contained"
                      >
                        Add
                      </PrimaryButton>
                    </div>
                    <div>
                      <PrimaryButton
                        style={{ width: "100px" }}
                        color="primary"
                        variant="outlined"
                        onClick={() => this.setState({ dialog: false })}
                      >
                        Cancel
                      </PrimaryButton>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>
          <Dialog
            open={this.state.commentdialogopen}
            onClose={() => this.setState({ commentdialogopen: false })}
          >
            <DialogTitle style={{ maxWidth: "lg" }}>
              <Typography>Comments History</Typography>
              <hr />
              <Typography>Comments</Typography>
            </DialogTitle>
            <DialogContent>
              <Grid
                container
                spacing={2}
                style={{
                  borderStyle: "groove",
                  borderRadius: "10px",
                  padding: "10px",
                  margin: "5px",
                }}
              >
                <Grid item md={12}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>09 Sept 2021</Typography>
                    <div style={{ display: "flex" }}>
                      <Typography
                        style={{ color: "grey", marginRight: "10px" }}
                      >
                        Changed by
                      </Typography>
                      <Typography>Jai Kumar</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <Grid container spacing={1}>
                    <Grid item md={12}>
                      <Typography style={{ color: "grey" }} k>
                        Previous
                      </Typography>
                    </Grid>
                    <Grid item md={9}>
                      <Typography style={{ color: "grey" }}>
                        Enter Student Name
                      </Typography>
                    </Grid>
                    <Grid item md={3}>
                      <Typography>Venkat</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={6}>
                  <Grid container spacing={1}>
                    <Grid item md={12}>
                      <Typography style={{ color: "grey" }}>
                        Change to
                      </Typography>
                    </Grid>
                    <Grid item md={9}>
                      <Typography style={{ color: "grey" }}>
                        Enter Student Name
                      </Typography>
                    </Grid>
                    <Grid item md={3}>
                      <Typography>Venkat</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Typography style={{ color: "grey" }}>Comments</Typography>
                </Grid>
                <Grid item md={12} style={{ marginTop: "-15px" }}>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </p>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                style={{
                  borderStyle: "groove",
                  borderRadius: "10px",
                  padding: "10px",
                  margin: "5px",
                }}
              >
                <Grid item md={12}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>09 Sept 2021</Typography>
                    <div style={{ display: "flex" }}>
                      <Typography
                        style={{ color: "grey", marginRight: "10px" }}
                      >
                        Changed by
                      </Typography>
                      <Typography>Jai Kumar</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <Grid container spacing={1}>
                    <Grid item md={12}>
                      <Typography style={{ color: "grey" }} k>
                        Previous
                      </Typography>
                    </Grid>
                    <Grid item md={9}>
                      <Typography style={{ color: "grey" }}>
                        Enter Student Name
                      </Typography>
                    </Grid>
                    <Grid item md={3}>
                      <Typography>Venkat</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={6}>
                  <Grid container spacing={1}>
                    <Grid item md={12}>
                      <Typography style={{ color: "grey" }}>
                        Change to
                      </Typography>
                    </Grid>
                    <Grid item md={9}>
                      <Typography style={{ color: "grey" }}>
                        Enter Student Name
                      </Typography>
                    </Grid>
                    <Grid item md={3}>
                      <Typography>Venkat</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Typography style={{ color: "grey" }}>Comments</Typography>
                </Grid>
                <Grid item md={12} style={{ marginTop: "-15px" }}>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </p>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                style={{
                  borderStyle: "groove",
                  borderRadius: "10px",
                  padding: "10px",
                  margin: "5px",
                }}
              >
                <Grid item md={12}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>09 Sept 2021</Typography>
                    <div style={{ display: "flex" }}>
                      <Typography
                        style={{ color: "grey", marginRight: "10px" }}
                      >
                        Changed by
                      </Typography>
                      <Typography>Jai Kumar</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <Grid container spacing={1}>
                    <Grid item md={12}>
                      <Typography style={{ color: "grey" }} k>
                        Previous
                      </Typography>
                    </Grid>
                    <Grid item md={9}>
                      <Typography style={{ color: "grey" }}>
                        Enter Student Name
                      </Typography>
                    </Grid>
                    <Grid item md={3}>
                      <Typography>Venkat</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={6}>
                  <Grid container spacing={1}>
                    <Grid item md={12}>
                      <Typography style={{ color: "grey" }}>
                        Change to
                      </Typography>
                    </Grid>
                    <Grid item md={9}>
                      <Typography style={{ color: "grey" }}>
                        Enter Student Name
                      </Typography>
                    </Grid>
                    <Grid item md={3}>
                      <Typography>Venkat</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Typography style={{ color: "grey" }}>Comments</Typography>
                </Grid>
                <Grid item md={12} style={{ marginTop: "-15px" }}>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </p>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Grid container>
                <Grid item md={12} align={"right"}>
                  <PrimaryButton
                    variant={"outlined"}
                    color={"primary"}
                    style={{ width: "100px", height: "30px" }}
                    onClick={() => this.setState({ commentdialogopen: false })}
                  >
                    Cancel
                  </PrimaryButton>
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>
          <Popover
            anchorEl={this.state.anchorEl}
            open={this.state.popOpen}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                  }}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Dot color={"orange"} />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <Typography
                    onClick={() => {
                      this.setState({
                        popOpen: false,
                      });
                    }}
                  >
                    Not Verified
                  </Typography>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                  }}
                  onClick={(e) => this.handleClick(e)}
                >
                  <Dot color={"green"} />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <Typography
                    onClick={() => {
                      this.setState({
                        popOpen: false,
                      });
                    }}
                  >
                    Verified
                  </Typography>
                </div>
              </div>
            </div>
          </Popover>
        </ThemeProvider>
      </div>
    );
  }
}
const useStyles = (theme) => ({});
const mapStateToProps = (state) => {
  console.log(state);
  return {
    getAllCollegesList: state.CollegeReducer.allCollegeList,
    getDegreeList: state.CollegeReducer.Degree,
    getBranchesList: state.CollegeReducer.BranchList,
  };
};
export default connect(mapStateToProps, {
  getAllColleges,
  getDegree,
  getBranches,
})(withStyles(useStyles)(GeneralDetails));
