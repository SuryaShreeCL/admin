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
import { connect } from "react-redux";
import React, { Component } from "react";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import PrimaryButton from "../../Utils/PrimaryButton";
import { ExpandMore} from "@material-ui/icons";
import Warning from "../../Asset/Images/warningImg.png";
import Pencil from "../../Asset/Images/pencil.png";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getBranches, getDegree, getAllColleges, getUniversity } from "../../Actions/College";

const theme = createMuiTheme({
  overrides: {},
});

export class academicInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: "panel1",
      open: false,
      ugCollege:'',
      ugCollegeErr:'',
      ugUniversity:'',
      ugUniversityErr:'',
      ugDepartment: '',
      ugDepartmentErr: '',
      ugDegree:'',
      ugDegreeErr:'',
      ugSemester:'',
      ugSemesterErr:'',
      ugYear:'',
      ugYearErr:'',
      ugStartDate:'',
      ugStartDateErr:'',
      ugEndDate:'',
      ugEndDateErr:'',
      pgCollege:'',
      pgCollegeErr:'',
      pgUniversity:'',
      pgUniversityErr:'',
      pgDepartment: '',
      pgDepartmentErr: '',
      pgDegree:'',
      pgDegreeErr:'',
      pgSemester:'',
      pgSemesterErr:'',
      pgYear:'',
      pgYearErr:'',
      pgStartDate:'',
      pgStartDateErr:'',
      pgEndDate:'',
      pgEndDateErr:'',
      pgCgpa:'',
      pgCgpaErr:'',
      ugCgpa:'',
      ugCgpaErr:'',
      diplomaCollege:'',
      diplomaCollegeErr:'',
      diplomoExamBoard:'',
      diplomoExamBoardErr:'',
      diplomoType:'',
      diplomoTypeErr:'',
      diplomoSemester:'',
      diplomoSemesterErr:'',
      diplomoYear:'',
      diplomoYearErr:'',
      diplomoStartDate:'',
      diplomoStartDateErr:'',
      diplomoEndDate:'',
      diplomoEndDateErr:'',
      diplomoCgpa:'',
      diplomoCgpaErr:'',

      tenthCollege:'',
      tenthCollegeErr:'',
      tenthExamBoard:'',
      tenthExamBoardErr:'',
      tenthType:'',
      tenthTypeErr:'',
      tenthStartDate:'',
      tenthStartDateErr:'',
      tenthEndDate:'',
      tenthEndDateErr:'',
      tenthCgpa:'',
      tenthCgpaErr:'',

      twelthCollege:'',
      twelthCollegeErr:'',
      twelthExamBoard:'',
      twelthExamBoardErr:'',
      twelthType:'',
      twelthTypeErr:'',
      twelthStartDate:'',
      twelthStartDateErr:'',
      twelthEndDate:'',
      twelthEndDateErr:'',
      twelthCgpa:'',
      twelthCgpaErr:'',
    };
  }

  componentDidMount() {
    this.props.getBranches();
    this.props.getDegree();
    this.props.getAllColleges();
    this.props.getUniversity();
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

  handleSave = () => {
    // let hlptxt = "Please fill the required field";
    //   this.state.pgCollege === ""
    //   ? this.setState({ pgCollegeErr: hlptxt })
    //   : this.setState({ pgCollegeErr: "" });
    //   this.state.ugCollege === ""
    //   ? this.setState({ ugCollegeErr: hlptxt })
    //   : this.setState({ ugCollegeErr: "" });
    //   this.state.pgUniversity === ""
    //   ? this.setState({ pgUniversityErr: hlptxt })
    //   : this.setState({ pgUniversityErr: "" });
    //   this.state.ugUniversity === ""
    //   ? this.setState({ ugUniversityErr: hlptxt })
    //   : this.setState({ ugUniversityErr: "" });
    //   this.state.ugDepartment === ""
    //   ? this.setState({ ugDepartmentErr: hlptxt })
    //   : this.setState({ ugDepartmentErr: "" });
    //   this.state.pgDepartment === ""
    //   ? this.setState({ pgDepartmentErr: hlptxt })
    //   : this.setState({ pgDepartmentErr: "" });
    //   this.state.ugDegree === ""
    //   ? this.setState({ ugDegreeErr: hlptxt })
    //   : this.setState({ ugDegreeErr: "" });
    //   this.state.pgDegree === ""
    //   ? this.setState({ pgDegreeErr: hlptxt })
    //   : this.setState({ pgDegreeErr: "" });
    //   this.state.pgSemester === ""
    //   ? this.setState({ pgSemesterErr: hlptxt })
    //   : this.setState({ pgSemesterErr: "" });
    //   this.state.pgYear === ""
    //   ? this.setState({ pgYearErr: hlptxt })
    //   : this.setState({ pgYearErr: "" });
    //   this.state.pgCgpa === ""
    //   ? this.setState({ pgCgpaErr: hlptxt })
    //   : this.setState({ pgCgpaErr: "" });
    //   this.state.pgStartDate === ""
    //   ? this.setState({ pgStartDateErr: hlptxt })
    //   : this.setState({ pgStartDateErr: "" });
    //   this.state.pgEndDate === ""
    //   ? this.setState({ pgEndDateErr: hlptxt })
    //   : this.setState({ pgEndDateErr: "" });
    //   this.state.ugSemester === ""
    //   ? this.setState({ ugSemesterErr: hlptxt })
    //   : this.setState({ ugSemesterErr: "" });
    //   this.state.ugYear === ""
    //   ? this.setState({ ugYearErr: hlptxt })
    //   : this.setState({ ugYearErr: "" });
    //   this.state.ugCgpa === ""
    //   ? this.setState({ ugCgpaErr: hlptxt })
    //   : this.setState({ ugCgpaErr: "" });
    //   this.state.ugStartDate === ""
    //   ? this.setState({ ugStartDateErr: hlptxt })
    //   : this.setState({ ugStartDateErr: "" });
    //   this.state.ugEndDate === ""
    //   ? this.setState({ ugEndDateErr: hlptxt })
    //   : this.setState({ ugEndDateErr: "" });

    //   this.state.diplomaCollege === ""
    //   ? this.setState({ diplomaCollegeErr: hlptxt })
    //   : this.setState({ diplomaCollegeErr: "" });
    //   this.state.diplomoExamBoard === ""
    //   ? this.setState({ diplomoExamBoardErr: hlptxt })
    //   : this.setState({ diplomoExamBoardErr: "" });
    //   this.state.diplomoType === ""
    //   ? this.setState({ diplomoTypeErr: hlptxt })
    //   : this.setState({ diplomoTypeErr: "" });
    //   this.state.diplomoSemester === ""
    //   ? this.setState({ diplomoSemesterErr: hlptxt })
    //   : this.setState({ diplomoSemesterErr: "" });
    //   this.state.diplomoStartDate === ""
    //   ? this.setState({ diplomoStartDateErr: hlptxt })
    //   : this.setState({ diplomoStartDateErr: "" });
    //   this.state.diplomoEndDate === ""
    //   ? this.setState({ diplomoEndDateErr: hlptxt })
    //   : this.setState({ diplomoEndDateErr: "" });
    //   this.state.diplomoCgpa === ""
    //   ? this.setState({ diplomoCgpaErr: hlptxt })
    //   : this.setState({ diplomoCgpaErr: "" });
    //   this.state.diplomoYear === ""
    //   ? this.setState({ diplomoYearErr: hlptxt })
    //   : this.setState({ diplomoYearErr: "" });

    //   this.state.tenthCollege === ""
    //   ? this.setState({ tenthCollegeErr: hlptxt })
    //   : this.setState({ tenthCollegeErr: "" });
    //   this.state.tenthExamBoard === ""
    //   ? this.setState({ tenthExamBoardErr: hlptxt })
    //   : this.setState({ tenthExamBoardErr: "" });
    //   this.state.tenthType === ""
    //   ? this.setState({ tenthTypeErr: hlptxt })
    //   : this.setState({ tenthTypeErr: "" });
    //   this.state.tenthCgpa === ""
    //   ? this.setState({ tenthCgpaErr: hlptxt })
    //   : this.setState({ tenthCgpaErr: "" });
    //   this.state.tenthStartDate === ""
    //   ? this.setState({ tenthStartDateErr: hlptxt })
    //   : this.setState({ tenthStartDateErr: "" });
    //   this.state.tenthEndDate === ""
    //   ? this.setState({ tenthEndDateErr: hlptxt })
    //   : this.setState({ tenthEndDateErr: "" });

    //   this.state.tenthCollege === ""
    //   ? this.setState({ tenthCollegeErr: hlptxt })
    //   : this.setState({ tenthCollegeErr: "" });
    //   this.state.tenthExamBoard === ""
    //   ? this.setState({ tenthExamBoardErr: hlptxt })
    //   : this.setState({ tenthExamBoardErr: "" });
    //   this.state.tenthType === ""
    //   ? this.setState({ tenthTypeErr: hlptxt })
    //   : this.setState({ tenthTypeErr: "" });
    //   this.state.tenthCgpa === ""
    //   ? this.setState({ tenthCgpaErr: hlptxt })
    //   : this.setState({ tenthCgpaErr: "" });
    //   this.state.tenthStartDate === ""
    //   ? this.setState({ tenthStartDateErr: hlptxt })
    //   : this.setState({ tenthStartDateErr: "" });
    //   this.state.tenthEndDate === ""
    //   ? this.setState({ tenthEndDateErr: hlptxt })
    //   : this.setState({ tenthEndDateErr: "" });

    //   this.state.twelthCollege === ""
    //   ? this.setState({ twelthCollegeErr: hlptxt })
    //   : this.setState({ twelthCollegeErr: "" });
    //   this.state.twelthExamBoard === ""
    //   ? this.setState({ twelthExamBoardErr: hlptxt })
    //   : this.setState({ twelthExamBoardErr: "" });
    //   this.state.twelthType === ""
    //   ? this.setState({ twelthTypeErr: hlptxt })
    //   : this.setState({ twelthTypeErr: "" });
    //   this.state.tenthCgpa === ""
    //   ? this.setState({ twelthCgpaErr: hlptxt })
    //   : this.setState({ twelthCgpaErr: "" });
    //   this.state.tenthStartDate === ""
    //   ? this.setState({ twelthStartDateErr: hlptxt })
    //   : this.setState({ twelthStartDateErr: "" });
    //   this.state.tenthEndDate === ""
    //   ? this.setState({ twelthEndDateErr: hlptxt })
    //   : this.setState({ twelthEndDateErr: "" });

      // if (
      //   this.state.pgCollege !== "" 
       
      // ){}
      console.log('huhuo')
  }

  render() {
    // console.log(this.props.getUniversityList)
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
                      <p style={title}>Postgraduate Degree</p>
                    </Grid>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item md={3}>
                      <Autocomplete
                        // {...defaultProps}
                        popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        id="debug"
                        options={this.props.getCollegesList}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.pgCollegeErr.length > 0}
                            helperText={this.state.pgCollegeErr}
                            label="College Name"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        // {...defaultProps}
                        id="debug"
                        options={this.props.getUniversityList}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.pgUniversityErr.length > 0}
                            helperText={this.state.pgUniversityErr}
                            label="University Name"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        // {...defaultProps}
                        id="debug"
                        options={this.props.getBranchesList}
                        getOptionpgCollegeLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.pgDepartmentErr.length > 0}
                            helperText={this.state.pgDepartmentErr}
                            label="Department"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        // {...defaultProps}
                        id="debug"
                        options={this.props.getDegreeList}
                       getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.pgDegreeErr.length > 0}
                            helperText={this.state.pgDegreeErr}
                            label="Degree"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Current Semester" error={this.state.pgSemesterErr.length > 0}
                            helperText={this.state.pgSemesterErr} />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Graduation Year" error={this.state.pgYearErr.length > 0}
                            helperText={this.state.pgYearErr} />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="CGPA" error={this.state.pgCgpaErr.length > 0}
                            helperText={this.state.pgCgpaErr}  />
                    </Grid>
                    <Grid item md={1}></Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Start Date" error={this.state.pgStartDateErr.length > 0}
                            helperText={this.state.pgStartDateErr} />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="End Date" error={this.state.pgEndDateErr.length > 0}
                            helperText={this.state.pgEndDateErr}/>
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
                      <p style={title}>Undergradauate Degree</p>
                    </Grid>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item md={3}>
                      <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        // {...defaultProps}
                        id="debug"
                        options={this.props.getCollegesList}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.ugCollegeErr.length > 0}
                            helperText={this.state.ugCollegeErr}
                            label="College Name"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        // {...defaultProps}
                        id="debug"
                        options={this.props.getUniversityList}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.ugUniversityErr.length > 0}
                            helperText={this.state.ugUniversityErr}
                            label="University Name"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        // {...defaultProps}
                        id="debug"
                        options={this.props.getBranchesList}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.ugDepartmentErr.length > 0}
                            helperText={this.state.ugDepartmentErr}
                            label="Department"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        // {...defaultProps}
                        id="debug"
                        options={this.props.getDegreeList}
                       getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                          error={this.state.ugDegreeErr.length > 0}
                            helperText={this.state.ugDegreeErr}
                            {...params}
                            label="Degree"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Current Semester"  error={this.state.ugSemesterErr.length > 0}
                            helperText={this.state.ugSemesterErr} />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Graduation Year" error={this.state.ugYearErr.length > 0}
                            helperText={this.state.ugYearErr} />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="CGPA" error={this.state.ugCgpaErr.length > 0}
                            helperText={this.state.ugCgpaErr} />
                    </Grid>
                    <Grid item md={1}></Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Start Date" error={this.state.ugStartDateErr.length > 0}
                            helperText={this.state.ugStartDateErr}/>
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="End Date" error={this.state.ugEndDateErr.length > 0}
                            helperText={this.state.ugEndDateErr} />
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
                      <p style={title}>Diploma</p>
                    </Grid>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item md={4}>
                      <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        // {...defaultProps}
                        id="debug"
                        options={this.props.getCollegesList}
                       getOptionLabel={(option) => option.name}
                         renderInput={(params) => (
                          <TextField
                          error={this.state.diplomaCollegeErr.length > 0}
                            helperText={this.state.diplomaCollegeErr}
                            {...params}
                            label="College Name"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        // {...defaultProps}
                        id="debug"
                        options={this.props.getCollegesList}
                       getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                          error={this.state.diplomoExamBoardErr.length > 0}
                            helperText={this.state.diplomoExamBoardErr}
                            {...params}
                            label="Exam Board"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        // {...defaultProps}
                        id="debug"
                        options={this.props.getCollegesList}
                       getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                          error={this.state.diplomoTypeErr.length > 0}
                            helperText={this.state.diplomoTypeErr}
                            {...params}
                            label="Diploma Type"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    {/* <Grid item md={3}></Grid> */}
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Current Semester"   error={this.state.diplomoSemesterErr.length > 0}
                            helperText={this.state.diplomoSemesterErr}/>
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Graduation Year" error={this.state.diplomoYearErr.length > 0}
                            helperText={this.state.diplomoYearErr} />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="CGPA" error={this.state.diplomoCgpaErr.length > 0}
                            helperText={this.state.diplomoCgpaErr} />
                    </Grid>
                    <Grid item md={1}></Grid>
                    <Grid item md={1}></Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Start Date"  error={this.state.diplomoStartDateErr.length > 0}
                            helperText={this.state.diplomoStartDateErr}/>
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="End Date" error={this.state.diplomoEndDateErr.length > 0}
                            helperText={this.state.diplomoEndDateErr} />
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
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        // {...defaultProps}
                        id="debug"
                        options={this.props.getCollegesList}
                       getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                          error={this.state.twelthCollegeErr.length > 0}
                            helperText={this.state.twelthCollegeErr}
                            {...params}
                            label="College Name"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        // {...defaultProps}
                        id="debug"
                        options={this.props.getCollegesList}
                       getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.twelthExamBoardErr.length > 0}
                            helperText={this.state.twelthExamBoardErr}
                            label="Exam Board"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        // {...defaultProps}
                        id="debug"
                        options={this.props.getCollegesList}
                       getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.twelthTypeErr.length > 0}
                            helperText={this.state.twelthTypeErr}
                            label="Diplomo Type"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={2}>
                    </Grid>
                    <Grid item md={2}>
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="CGPA" error={this.state.twelthCgpaErr.length > 0}
                            helperText={this.state.twelthCgpaErr} />
                    </Grid>
                    <Grid item md={2}></Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Start Date" error={this.state.twelthStartDateErr.length > 0}
                            helperText={this.state.twelthStartDateErr}/>
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="End Date"  error={this.state.twelthEndDateErr.length > 0}
                            helperText={this.state.twelthEndDateErr}/>
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
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        // {...defaultProps}
                        id="debug"
                        options={this.props.getCollegesList}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                          error={this.state.tenthCollegeErr.length > 0}
                            helperText={this.state.tenthCollegeErr}
                            {...params}
                            label="College Name"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        // {...defaultProps}
                        id="debug"
                        options={this.props.getCollegesList}
                       getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.tenthExamBoardErr.length > 0}
                            helperText={this.state.tenthExamBoardErr}
                            label="Exam Board"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        // {...defaultProps}
                        id="debug"
                        options={this.props.getCollegesList}
                       getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.tenthTypeErr.length > 0}
                            helperText={this.state.tenthTypeErr}
                            label="Diplomo Type"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={2}>
                    </Grid>
                    <Grid item md={2}>
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="CGPA"  error={this.state.tenthCgpaErr.length > 0}
                            helperText={this.state.tenthCgpaErr} />
                    </Grid>
                    <Grid item md={2}></Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="Start Date" error={this.state.tenthStartDateErr.length > 0}
                            helperText={this.state.tenthStartDateErr} />
                    </Grid>
                    <Grid item md={2}>
                      <TextField id="standard-basic" label="End Date" error={this.state.tenthEndDateErr.length > 0}
                            helperText={this.state.tenthEndDateErr}/>
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
                  onClick={() => this.handleSave()}
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

const mapStateToProps = (state) => {
  return {
    getBranchesList: state.CollegeReducer.BranchList,
    getCollegesList: state.CollegeReducer.allCollegeList,
    getDegreeList: state.CollegeReducer.Degree,
    getUniversityList: state.CollegeReducer.University
    // getAllProductFamilyList : state.ProductReducer.getAllProductFamily
  };
};

export default connect(mapStateToProps, {
  getBranches,
  getDegree,
  getAllColleges,
  getUniversity,
  // getAllProductFamily
})(academicInfo);

