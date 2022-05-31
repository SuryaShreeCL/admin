import DateFnsUtils from "@date-io/date-fns";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  createMuiTheme,
  Grid,
  IconButton,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateVerificationStatus,
  viewStudentStatus,
} from "../../Actions/AdminAction";
import { getworkexp, updateworkexp } from "../../Actions/Calldetails";
import { getVariantStepsById } from "../../Actions/ProductAction";
import { getDocumentList } from "../../Actions/Student";
import { URL } from "../../Actions/URL";
import Pencil from "../../Asset/Images/pencil.png";
import PrimaryButton from "../../Utils/PrimaryButton";
import Mysnack from "../MySnackBar";
import DoccumentCard from "../Utils/DoccumentCard";
import Model from "../Utils/SectionModel";

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
    MuiIconButton: {
      root: {
        color: "#1093FF",
      },
    },
  },
});
class workExperience extends Component {
  constructor() {
    super();
    this.state = {
      disable: true,
      startDate: null,
      startDateErr: "",
      endDate: null,
      endDateErr: "",
      employmentType: "",
      employmentTypeErr: "",
      organization: "",
      organizationErr: "",
      description: "",
      descriptionErr: "",
      role: "",
      roleErr: "",
      month: "",
      id: "",
      professional: [
        {
          id: null,
          employmentType: {},
          organization: null,
          role: null,
          description: null,
          startDate: null,
          endDate: null,
        },
      ],
      snackmsg: "",
      snackvariant: "",
      snackopen: false,
      sectionStatus: {
        model: false,
        data: null,
        sectionName: "",
      },
    };
  }
  componentDidMount() {
    this.props.getworkexp(this.props.match.params.studentId);
    this.props.viewStudentStatus(this.props.match.params.studentId);
    this.props.getVariantStepsById(
      this.props.match.params.productId +
        `?studentId=${this.props.match.params.studentId}`
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.getworkexpList !== prevProps.getworkexpList) {
      this.setState({
        professional: this.props.getworkexpList,
      });
    }
    if (this.state.professional !== prevState.professional) {
      this.state.professional.map((item) =>
        this.setState({
          organization: item.organization,
          startDate: item.startDate,
          endDate: item.endDate,
          employmentType: item.employmentType,
          role: item.role,
          id: item.id,
          description: item.description,
        })
      );
    }
    if (this.props.updateworkexpList !== prevProps.updateworkexpList) {
      this.props.getworkexp(this.props.match.params.studentId);
    }
  }
  handleClick(e) {
    this.setState({ disable: !this.state.disable });
  }
  onChange(event, index) {
    let items = this.state.professional;
    var item = {
      ...items[index],
      [event.target.name]: event.target.value,
    };
    items[index] = item;
    this.setState({
      professional: items,
      [event.target.name.concat(`Err${index}`)]: "",
    });
  }

  onDropDownValue = (name, value, index, id) => {
    if (value !== null) {
      let items = this.state.professional;

      let item = {
        ...items[index],
        id: id,
        [name]: value.title,
      };

      items[index] = item;

      this.setState({ professional: items, [name.concat(`Err${index}`)]: "" });
    }
  };
  handleSave() {
    console.log("handlesave/////////////////////////");
    console.log(tempArr);
    var error = false;
    const validFields = [
      "description",
      "employmentType",
      "organization",
      "startDate",
      "endDate",
      "role",
    ];
    for (let i = 0; i < this.state.professional.length; i++) {
      for (const [key, value] of Object.entries(this.state.professional[i])) {
        console.log(value, key);
        if (validFields.includes(key)) {
          if (key !== "department") {
            if (value === "") {
              error = true;

              this.setState({
                [key.concat(`Err${i}`)]: `Please fill the required field`,
              });
            }
            if (value === null) {
              error = true;
              this.setState({
                [key.concat(`Err${i}`)]: `Please fill the required field`,
              });
            }
          }
        }
      }
    }

    if (!error) {
      var tempArr = this.state.professional;
      this.props.updateworkexp(this.props.match.params.studentId, tempArr);
      console.log(tempArr);
      this.setState({
        snackmsg: "Updated Sucessfully",
        snackopen: true,
        snackvariant: "success",
      });
    } else {
      this.setState({
        snackmsg: "Please Fill the required Field",
        snackopen: true,
        snackvariant: "error",
      });
    }
  }

  employeeType = [
    { title: "FULL_TIME", value: "FULL_TIME" },
    { title: "PART_TIME", value: "PART_TIME" },
    { title: "SELF_EMPLOYED", value: "SELF_EMPLOYED" },
    { title: "FREELANCE", value: "FREELANCE" },
    { title: "INTERNSHIP", value: "INTERNSHIP" },
    { title: "TRAINEE", value: "TRAINEE" },
  ];

  getStatus = (sectionName) => {
    if (this.props.studentStatus && this.props.studentStatus.length !== 0) {
      const { studentStatus } = this.props;
      return studentStatus.find((item) => item.sectionName === sectionName);
    }
  };

  documentClick = (data) => {
    window.open(
      URL + "/api/v1/cv/download/cv/" + data.studentId + "/" + data.path
    );
  };

  renderModel = () => (
    <Model
      data={this.state.sectionStatus}
      handleClose={() =>
        this.setState({
          sectionStatus: {
            ...this.state.sectionStatus,
            model: false,
          },
        })
      }
      section={this.state.sectionStatus}
      {...this.props}
    />
  );

  render() {
    const { HeadStyle, GridStyle } = style;

    //
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
                {/* <img
                src={Warning}
                height={17}
                width={17}
                style={{ position: "realative", top: 5 }}
              /> */}
                {/* <Status
                      onClick={() => {
                        this.setState({
                          sectionStatus: {
                            model: true,
                            data: this.getStatus(SECTION.workExperience),
                            sectionName: SECTION.workExperience,
                          },
                        });
                      }}
                      status={
                        this.getStatus(SECTION.workExperience)
                          ? this.getStatus(SECTION.workExperience).status
                          : "notVerified"
                      }
                    /> */}
              </div>
              <IconButton
                disabled={this.props.variantStepList.adminObComplete}
                onClick={this.handleClick.bind(this)}
              >
                <img src={Pencil} height={17} width={17} />
              </IconButton>
            </div>
            <div style={{ paddingTop: 10 }}>
              {this.state.professional.length !== 0 &&
                this.state.professional.map((item, index) => {
                  console.log(item);
                  var months = [
                    "January",
                    "Febuary",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ];
                  var startmonthName =
                    months[new Date(item.startDate).getMonth()];
                  var endMonthName = months[new Date(item.endDate).getMonth()];
                  return (
                    item.id !== null && (
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "space-between",
                              wordBreak: "break-word",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                wordBreak: "break-word",
                              }}
                            >
                              {item.role} ,
                              <div style={{ fontSize: 10, paddingTop: "2%" }}>
                                {" "}
                                {item.organization}
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                wordBreak: "break-word",
                                // paddingLeft: "50%",
                              }}
                            >
                              {item.month} Months (
                              {moment(new Date(item.startDate)).format(
                                "MMM YYYY"
                              )}
                              -
                              {moment(new Date(item.endDate)).format(
                                "MMM YYYY"
                              )}
                              )
                            </div>
                          </div>
                        </AccordionSummary>

                        <AccordionDetails>
                          <Grid container spacing={2}>
                            <Grid item md={3}>
                              <Autocomplete
                                popupIcon={
                                  <ExpandMore style={{ color: "#1093FF" }} />
                                }
                                id="combo-box-demo"
                                disabled={this.state.disable}
                                value={
                                  {
                                    title: item.employmentType,
                                    value: item.employmentType,
                                  } || ""
                                }
                                options={this.employeeType}
                                onChange={(e, newValue) =>
                                  this.onDropDownValue(
                                    "employmentType",
                                    newValue,
                                    index,
                                    item.id
                                  )
                                }
                                getOptionLabel={(option) => {
                                  return option.title;
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Employment Type"
                                    disabled={this.state.disable}
                                    variant="standard"
                                    contentEditable={
                                      this.state.disable === false
                                    }
                                    //  value={item.employmentType || ''}
                                    error={
                                      this.state[
                                        `employmentTypeErr${index}`
                                      ] !== undefined &&
                                      this.state[
                                        `employmentTypeErr${index}`
                                      ] !== ""
                                        ? true
                                        : false
                                    }
                                    helperText={
                                      this.state[`employmentTypeErr${index}`]
                                    }
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item md={3}>
                              <TextField
                                id="standard-basic"
                                disabled={this.state.disable}
                                required
                                label="Organisation"
                                value={item.organization || ""}
                                // error={this.state.organizationErr.length > 0}
                                // helperText={this.state.organizationErr}
                                contentEditable={this.state.disable}
                                error={
                                  this.state[`organizationErr${index}`] !==
                                    undefined &&
                                  this.state[`organizationErr${index}`] !== ""
                                    ? true
                                    : false || item.organization.trim() === ""
                                }
                                onChange={(e) =>
                                  this.state.disable === false &&
                                  this.onChange(
                                    {
                                      target: {
                                        name: "organization",
                                        value: e.target.value,
                                      },
                                    },
                                    index
                                  )
                                }
                                helperText={
                                  this.state[`organizationErr${index}`]
                                }
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Grid>

                            <Grid item md={3}>
                              {/* <KeyboardDatePicker
                                
                               
                                id="date-picker-dialog"
                               
                                format="dd/MM/yyyy"
                                // views={["year", "month"]}
                                inputProps={{ readOnly: true }}
                                error={this.state.startDateErr.length > 0}
                                helperText={this.state.startDateErr}
                                
                                // onChange={(e, newValue) =>
                                //   this.setState({ startDate: newValue, startDateErr:'' })
                                // }
                               
                               
                              
                                KeyboardButtonProps={{
                                  "aria-label": "change date",
                                }}
                              /> */}
                              <TextField
                                label="Start Date"
                                value={item.startDate || ""}
                                type="month"
                                onChange={(e) =>
                                  this.state.disable === false &&
                                  this.onChange(
                                    {
                                      target: {
                                        name: "startDate",
                                        value: e.target.value,
                                      },
                                    },
                                    index
                                  )
                                }
                                error={
                                  this.state[`startDateErr${index}`] !==
                                    undefined &&
                                  this.state[`startDateErr${index}`] !== ""
                                    ? true
                                    : false
                                }
                                helperText={this.state[`startDateErr${index}`]}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                disableFuture
                                disabled={this.state.disable}
                                name="startDate"
                                fullWidth
                                margin="normal"
                              />
                            </Grid>
                            <Grid item md={3}>
                              <TextField
                                label="End Date"
                                value={item.endDate || ""}
                                type="month"
                                onChange={(e) =>
                                  this.state.disable === false &&
                                  this.onChange(
                                    {
                                      target: {
                                        name: "endDate",
                                        value: e.target.value,
                                      },
                                    },
                                    index
                                  )
                                }
                                contentEditable={this.state.disable}
                                minDate={
                                  this.state.professional[index].startDate
                                }
                                error={
                                  this.state[`endDateErr${index}`] !==
                                    undefined &&
                                  this.state[`endDateErr${index}`] !== ""
                                    ? true
                                    : false
                                }
                                helperText={this.state[`endDateErr${index}`]}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                disableFuture
                                margin="normal"
                                disabled={this.state.disable}
                                name="EndDate"
                                fullWidth
                              />
                            </Grid>
                            <Grid item md={4}>
                              <TextField
                                id="standard-multiline-static"
                                label="Designation"
                                disabled={this.state.disable}
                                value={item.role || ""}
                                onChange={(e) =>
                                  this.state.disable === false &&
                                  this.onChange(
                                    {
                                      target: {
                                        name: "role",
                                        value: e.target.value,
                                      },
                                    },
                                    index
                                  )
                                }
                                // error={this.state.roleErr.length > 0}
                                // helperText={this.state.roleErr}
                                error={
                                  this.state[`roleErr${index}`] !== undefined &&
                                  this.state[`roleErr${index}`] !== ""
                                    ? true
                                    : false
                                }
                                // onChange={(e) =>this.onChange(e,index)}
                                helperText={this.state[`roleErr${index}`]}
                                // value={item.role || ""}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            </Grid>
                            <Grid item md={8}>
                              <TextField
                                id="standard-multiline-static"
                                label="Job Description"
                                multiline
                                disabled={this.state.disable}
                                value={item.description || ""}
                                contentEditable={this.state.disable}
                                onChange={(e) =>
                                  this.onChange(
                                    {
                                      target: {
                                        name: "description",
                                        value: e.target.value,
                                      },
                                    },
                                    index
                                  )
                                }
                                error={
                                  this.state[`descriptionErr${index}`] !==
                                    undefined &&
                                  this.state[`descriptionErr${index}`] !== ""
                                    ? true
                                    : false
                                }
                                helperText={
                                  item.description === ""
                                    ? this.state[`descriptionErr${index}`]
                                    : `${item.description.length}/100`
                                }
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                inputProps={{
                                  maxLength: 100,
                                }}
                              />
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    )
                  );
                })}
            </div>
            {/* <Grid item md={12}>
              <p style={HeadStyle}>Documents Received</p>
            </Grid>
            <Grid item md={12}>
              {this.props.getAllDocumentList.CV &&
                this.props.getAllDocumentList.CV.length !== 0 && (
                  <Grid item md={12}>
                    <Grid item md={12} direction='column'>
                      <p style={GridStyle}>CV</p>
                    </Grid>
                    <Grid item={12} container>
                      {this.props.getAllDocumentList.CV
                        ? this.props.getAllDocumentList.CV.map((data) => (
                            <Grid
                              item
                              md={4}
                              direction='row'
                              onClick={() => this.documentClick(data)}
                            >
                              <DoccumentCard
                                certificate={data.path}
                                date={data.uploadDate}
                                path={data.path}
                                studentid={this.props.match.params.studentId}
                                status={true}
                                // category = 'cv'
                                // id = {data.ieltsId}
                                // status={this.state.documentedit}
                              />
                            </Grid>
                          ))
                        : null}
                    </Grid>
                  </Grid>
                )}
            </Grid> */}

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
                disabled={this.props.variantStepList.adminObComplete}
              >
                Save Changes
              </PrimaryButton>
            </div>
          </MuiPickersUtilsProvider>
          <Mysnack
            snackMsg={this.state.snackmsg}
            snackVariant={this.state.snackvariant}
            snackOpen={this.state.snackopen}
            onClose={() => this.setState({ snackopen: false })}
          />
          {this.renderModel()}
        </ThemeProvider>
      </div>
    );
  }
}

const style = {
  HeadStyle: {
    paddingTop: "18px",
    fontStyle: "Poppins",
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: "18px",
    color: "#0081FF",
  },
  GridStyle: {
    fontStyle: "Montserrat",
    fontWeight: "700",
    fontStyle: "normal",
    fontSize: "16px",
    color: "#052A4E",
  },
};
const mapStateToProps = (state) => {
  return {
    getworkexpList: state.CallReducer.getworkexp,
    updateworkexpList: state.CallReducer.updateworkexp,
    studentStatus: state.AdminReducer.studentStatusResponse,
    getAllDocumentList: state.StudentReducer.getDocumentList,
    variantStepList: state.ProductReducer.variantStepList,
  };
};

export default connect(mapStateToProps, {
  getworkexp,
  updateworkexp,
  viewStudentStatus,
  updateVerificationStatus,
  getDocumentList,
  getVariantStepsById,
})(workExperience);
