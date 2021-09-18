import { Form, Formik } from "formik";
import * as Yup from "yup";
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
    };
  }
  componentDidMount() {
    this.props.getAllColleges();
    this.props.getDegree();
    this.props.getBranches();
  }
  INITIAL_STATE = {
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
  };
  FORM_VALIDATE = Yup.object().shape({
    firstname: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    email: Yup.string()
      .email("Invalid Email")
      .required("Required"),
    phone: Yup.number()
      .required("Required")
      .integer()
      .typeError("Please Enter a Valid Phone Number"),
  });
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
  //  id = this.open ? 'simple-popover' : undefined;
  // open = Boolean(this.state.anchorEl);
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Formik
            // initialValues={{
            //   ...this.INITIAL_STATE,
            // }}
            initialValues={{
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
            }}
            // validationSchema={Yup.object().shape({
            //   firstname: Yup.string().required("Required"),
            //   lastname: Yup.string().required("Required"),
            //   college: Yup.string().required("Required"),
            //   sem: Yup.string().required("Required"),
            //   degree: Yup.string().required("Required"),
            //   fieldofstudy: Yup.string().required("Required"),
            // })}
            validationSchema={this.FORM_VALIDATE}
            onSubmit={(value) => console.log(value)}
          >
            {({ handleChange, handleSubmit, values }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={2} style={{ margin: "0px" }}>
                  <Grid item md={12}>
                    <Typography>Student Details</Typography>
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
                        <TextField
                          disabled
                          name="clsid"
                          label="CLS ID"
                          value={values.clsid}
                          onChange={handleChange}
                        />
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
                        <TextField
                          name="firstname"
                          label="First Name"
                          value={values.firstname}
                          onChange={handleChange}
                        />
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
                        <TextField
                          name="lastname"
                          label="Last Name"
                          value={values.lastname}
                          onChange={handleChange}
                        />
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
                        <TextField
                          name="phone"
                          disabled
                          label="Phone Number"
                          value={values.phone}
                          onChange={handleChange}
                        />
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
                        <TextField
                          disabled
                          name="email"
                          label="Email Address"
                          value={values.email}
                          onChange={handleChange}
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
                  <Grid item md={4}></Grid>
                  <Grid item md={12}>
                    <Typography>Higher Education Aspiration</Typography>
                  </Grid>
                  <Grid item md={4}>
                    <Autocomplete
                      options={this.props.getDegreeList}
                      getOptionLabel={(option) => option.name}
                      disabled
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="degree"
                          label="Degree Type"
                        />
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
                  <Grid item md={12}>
                    <Typography>Package Details</Typography>
                  </Grid>
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
                    <TextField name="intake" disabled label="Intake" />
                  </Grid>
                  <Grid item md={4}></Grid>
                  <Grid item md={12}>
                    <hr />
                  </Grid>
                  <Grid item md={12} align={"right"}>
                    <PrimaryButton
                      color={"primary"}
                      variant={"contained"}
                      style={{ width: "100px" }}
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
                          We see that you have made changes to {} ,Would you
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
              </Form>
            )}
          </Formik>
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
