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
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
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
      ugCgpaScale:'',
      ugCgpaScaleErr:'',
      ugBacklogCleared:'',
      ugBacklogClearedErr:'',
      ugBacklogActive:'',
      ugBacklogActiveErr:'',
      ugCgpaErr:'',
      ugCgpa:'',

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
      pgStartDate:null,
      pgStartDateErr:'',
      pgEndDate:null,
      pgEndDateErr:'',
      pgCgpa:'',
      pgCgpaErr:'',
      pgCgpaScale:'',
      pgCgpaScaleErr:'',

      diplomaCollege:'',
      diplomaCollegeErr:'',
      diplomoUniversity:'',
      diplomoUniversityErr:'',
      diplomoDepartment:'',
      diplomoDepartmentErr:'',
      diplomoDegree:'',
      diplomoDegreeErr:'',
      diplomoBlacklogActive:'',
      diplomoBlacklogActiveErr:'',
      diplomoBlacklogCleared:'',
      diplomoBlacklogClearedErr:'',
      diplomoCgpaScale:'',
      diplomoCgpaScaleErr:'',
      diplomoCgpa:'',
      diplomoCgpaErr:'',

      tenthSchool:'',
      tenthSchoolErr:'',
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
      tenthCgpaScaleErr:'',
      tenthCgpaScale:'',

      twelthSchool:'',
      twelthSchoolErr:'',
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
      twelthCgpaScaleErr:'',
      twelthCgpaScale:'',
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
    console.log(this.state)
    let hlptxt = "Please fill the required field";
      this.state.pgCollege === ""
      ? this.setState({ pgCollegeErr: hlptxt })
      : this.setState({ pgCollegeErr: "" });
      this.state.ugCollege === ""
      ? this.setState({ ugCollegeErr: hlptxt })
      : this.setState({ ugCollegeErr: "" });
      this.state.pgUniversity === ""
      ? this.setState({ pgUniversityErr: hlptxt })
      : this.setState({ pgUniversityErr: "" });
      this.state.ugUniversity === ""
      ? this.setState({ ugUniversityErr: hlptxt })
      : this.setState({ ugUniversityErr: "" });
      this.state.ugDepartment === ""
      ? this.setState({ ugDepartmentErr: hlptxt })
      : this.setState({ ugDepartmentErr: "" });
      this.state.pgDepartment === ""
      ? this.setState({ pgDepartmentErr: hlptxt })
      : this.setState({ pgDepartmentErr: "" });
      this.state.ugDegree === ""
      ? this.setState({ ugDegreeErr: hlptxt })
      : this.setState({ ugDegreeErr: "" });
      this.state.pgDegree === ""
      ? this.setState({ pgDegreeErr: hlptxt })
      : this.setState({ pgDegreeErr: "" });
      this.state.pgSemester === ""
      ? this.setState({ pgSemesterErr: hlptxt })
      : this.setState({ pgSemesterErr: "" });
      this.state.pgYear === ""
      ? this.setState({ pgYearErr: hlptxt })
      : this.setState({ pgYearErr: "" });
      this.state.pgCgpa === ""
      ? this.setState({ pgCgpaErr: hlptxt })
      : this.setState({ pgCgpaErr: "" });
      this.state.pgStartDate === ""
      ? this.setState({ pgStartDateErr: hlptxt })
      : this.setState({ pgStartDateErr: "" });
      this.state.pgEndDate === ""
      ? this.setState({ pgEndDateErr: hlptxt })
      : this.setState({ pgEndDateErr: "" });
      this.state.ugSemester === ""
      ? this.setState({ ugSemesterErr: hlptxt })
      : this.setState({ ugSemesterErr: "" });
      this.state.ugCgpaScale === ""
      ? this.setState({ ugCgpaScaleErr: hlptxt })
      : this.setState({ ugCgpaScaleErr: "" });
      this.state.ugCgpa === ""
      ? this.setState({ ugCgpaErr: hlptxt })
      : this.setState({ ugCgpaErr: "" });
      this.state.ugBacklogCleared === ""
      ? this.setState({ ugBacklogClearedErr: hlptxt })
      : this.setState({ ugBacklogClearedErr: "" });
      this.state.ugBacklogActive === ""
      ? this.setState({ ugBacklogActiveErr: hlptxt })
      : this.setState({ ugBacklogActiveErr: "" });

      this.state.diplomaCollege === ""
      ? this.setState({ diplomaCollegeErr: hlptxt })
      : this.setState({ diplomaCollegeErr: "" });
      this.state.diplomoUniversity === ""
      ? this.setState({ diplomoUniversityErr: hlptxt })
      : this.setState({ diplomoUniversityErr: "" });
      this.state.diplomoDepartment === ""
      ? this.setState({ diplomoDepartmentErr: hlptxt })
      : this.setState({ diplomoDepartmentErr: "" });
      this.state.diplomoDegree === ""
      ? this.setState({ diplomoDegreeErr: hlptxt })
      : this.setState({ diplomoDegreeErr: "" });
      this.state.diplomoBlacklogCleared === ""
      ? this.setState({ diplomoBlacklogClearedErr: hlptxt })
      : this.setState({ diplomoBlacklogClearedErr: "" });
      this.state.diplomoCgpaScale === ""
      ? this.setState({ diplomoCgpaScaleErr: hlptxt })
      : this.setState({ diplomoCgpaScaleErr: "" });
      this.state.diplomoCgpa === ""
      ? this.setState({ diplomoCgpaErr: hlptxt })
      : this.setState({ diplomoCgpaErr: "" });
      this.state.diplomoBlacklogActive === ""
      ? this.setState({ diplomoBlacklogActiveErr: hlptxt })
      : this.setState({ diplomoBlacklogActiveErr: "" });

      this.state.tenthSchool === ""
      ? this.setState({ tenthSchoolErr: hlptxt })
      : this.setState({ tenthSchoolErr: "" });
      this.state.tenthExamBoard === ""
      ? this.setState({ tenthExamBoardErr: hlptxt })
      : this.setState({ tenthExamBoardErr: "" });
      this.state.tenthType === ""
      ? this.setState({ tenthTypeErr: hlptxt })
      : this.setState({ tenthTypeErr: "" });
      this.state.tenthCgpa === ""
      ? this.setState({ tenthCgpaErr: hlptxt })
      : this.setState({ tenthCgpaErr: "" });
      this.state.tenthStartDate === ""
      ? this.setState({ tenthStartDateErr: hlptxt })
      : this.setState({ tenthStartDateErr: "" });
      this.state.tenthEndDate === ""
      ? this.setState({ tenthEndDateErr: hlptxt })
      : this.setState({ tenthEndDateErr: "" });

      this.state.tenthSchool === ""
      ? this.setState({ tenthSchoolErr: hlptxt })
      : this.setState({ tenthSchoolErr: "" });
      this.state.tenthExamBoard === ""
      ? this.setState({ tenthExamBoardErr: hlptxt })
      : this.setState({ tenthExamBoardErr: "" });
      this.state.tenthType === ""
      ? this.setState({ tenthTypeErr: hlptxt })
      : this.setState({ tenthTypeErr: "" });
      this.state.tenthCgpa === ""
      ? this.setState({ tenthCgpaErr: hlptxt })
      : this.setState({ tenthCgpaErr: "" });
      this.state.tenthStartDate === ""
      ? this.setState({ tenthStartDateErr: hlptxt })
      : this.setState({ tenthStartDateErr: "" });
      this.state.tenthEndDate === ""
      ? this.setState({ tenthEndDateErr: hlptxt })
      : this.setState({ tenthEndDateErr: "" });
      this.state.tenthCgpaScale === ""
      ? this.setState({ tenthCgpaScaleErr: hlptxt })
      : this.setState({ tenthCgpaScaleErr: "" });

      this.state.twelthSchool === ""
      ? this.setState({ twelthSchoolErr: hlptxt })
      : this.setState({ twelthSchoolErr: "" });
      this.state.twelthExamBoard === ""
      ? this.setState({ twelthExamBoardErr: hlptxt })
      : this.setState({ twelthExamBoardErr: "" });
      this.state.twelthType === ""
      ? this.setState({ twelthTypeErr: hlptxt })
      : this.setState({ twelthTypeErr: "" });
      this.state.tenthCgpa === ""
      ? this.setState({ twelthCgpaErr: hlptxt })
      : this.setState({ twelthCgpaErr: "" });
      this.state.tenthStartDate === ""
      ? this.setState({ twelthStartDateErr: hlptxt })
      : this.setState({ twelthStartDateErr: "" });
      this.state.tenthEndDate === ""
      ? this.setState({ twelthEndDateErr: hlptxt })
      : this.setState({ twelthEndDateErr: "" });
      this.state.twelthCgpaScale === ""
      ? this.setState({ twelthCgpaScaleErr: hlptxt })
      : this.setState({ twelthCgpaScaleErr: "" });
      console.log(this.state)
  }
  gpascale = [
    { title: '10', value: 10 },
    { title: '7', value: 7 },
    { title: '4', value: 4 },
    { title: '%', value: 100 },
  ];
  render() {
    const { HeadStyle, title, ans, secondary } = style;
    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                        popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        id="debug"
                        onChange={(e, newValue) => this.setState({ pgCollege: newValue, pgCollegeErr: "" })}
                        options={this.props.getCollegesList}
                        getOptionLabel={(option) => option.name}
                        value={this.state.pgCollege}
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
                        id="debug"
                        options={this.props.getUniversityList}
                        getOptionLabel={(option) => option.name}
                        value={this.state.pgUniversity}
                        onChange={(e, newValue) => this.setState({ pgUniversity: newValue, pgUniversityErr: "" })}
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
                        id="debug"
                        options={this.props.getBranchesList}
                        getOptionpgCollegeLabel={(option) => option.name}
                        value={this.state.pgDepartment}
                        onChange={(e, newValue) => this.setState({ pgDepartment: newValue, pgDepartmentErr: "" })}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // onChange={(e) => this.setState({ pgDepartment: e.target.value, pgDepartmentErr: "" })}
                            error={this.state.pgDepartmentErr.length > 0}
                            helperText={this.state.pgDepartmentErr}
                            label="Department"
                            margin="normal"
                            // value={this.state.pgDepartment}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        id="debug"
                        options={this.props.getDegreeList}
                       getOptionLabel={(option) => option.name}
                       value={this.state.pgDegreeErr}
                       onChange={(e, newValue) => this.setState({ pgDegree: newValue, pgDegreeErr: "" })}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // onChange={(e) => this.setState({ pgDegree: e.target.value, pgDegreeErr: "" })}
                            value={this.state.pgDegree}
                            error={this.state.pgDegreeErr.length > 0}
                            // helperText={this.state.pgDegreeErr}
                            label="Degree"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                   
                    <Grid item md={3}>
                    <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        id="debug"
                        options={this.gpascale}
                       getOptionLabel={(option) => option.title}
                       value={this.state.pgCgpaScale}
                       onChange={(e, newValue) => this.setState({ pgCgpaScale: newValue, pgCgpaScaleErr: "" })}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // onChange={(e) => this.setState({ pgCgpaScale: e.target.value, pgCgpaScaleErr: "" })}
                            error={this.state.pgCgpaScaleErr.length > 0}
                            helperText={this.state.pgCgpaScaleErr}
                            // value={this.state.pgCgpaScale}
                            label="CGPA Scale"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <TextField id="standard-basic" label="CGPA" 
                         onChange={(e) => this.setState({ pgCgpa: e.target.value, pgCgpaErr: "" })}
                         value={this.state.pgCgpa}
                          error={this.state.pgCgpaErr.length > 0}
                            helperText={this.state.pgCgpaErr}  />
                    </Grid>
                    <Grid item md={3}>
                    <KeyboardDatePicker
                         id="date-picker-dialog"
                         label="Start Date"
                        format="MM/dd/yyyy"
                          value={this.state.pgStartDate}
                          onChange={(e, newValue) => this.setState({ pgStartDate: newValue, pgStartDateErr: "" })}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          error={this.state.pgStartDateErr.length > 0}
                          helperText={this.state.pgStartDateErr}
                        />
                    </Grid>
                    <Grid item md={3}>
                    <KeyboardDatePicker
                         id="date-picker-dialog"
                         label="End Date"
                        format="MM/dd/yyyy"
                          value={this.state.pgEndDate}
                          onChange={(e, newValue) => this.setState({ pgEndDate: newValue, pgEndDateErr: "" })}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          error={this.state.pgEndDateErr.length > 0}
                          helperText={this.state.pgEndDateErr}
                        />
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
                      <p style={title}>Undergraduate Degree</p>
                    </Grid>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item md={3}>
                      <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
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
                   
                    <Grid item md={3}>
                    <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        id="debug"
                        options={this.props.getUniversityList}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.ugCgpaScaleErr.length > 0}
                            helperText={this.state.ugCgpaScaleErr}
                            label="CGPA Scale"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <TextField id="standard-basic" label="CGPA" error={this.state.ugCgpaErr.length > 0}
                            helperText={this.state.ugCgpaErr} />
                    </Grid>
                    <Grid item md={3}>
                      <TextField inputMode="numeric" id="standard-basic" label="Start Date" error={this.state.ugBacklogClearedErr.length > 0}
                            helperText={this.state.ugBacklogClearedErr}/>
                    </Grid>
                    <Grid item md={3}>
                      <TextField inputMode="numeric" id="standard-basic" label="End Date" error={this.state.ugBacklogActiveErr.length > 0}
                            helperText={this.state.ugBacklogActiveErr} />
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
                    <Grid item md={3}>
                          <TextField
                            error={this.state.diplomaCollegeErr.length > 0}
                            helperText={this.state.diplomaCollegeErr}
                            label="College Name"
                            margin="normal"
                            value={this.state.diplomaCollege}
                            onChange={(e)=>this.setState({diplomaCollege : e.target.value})}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        id="debug"
                        options={this.props.getUniversityList}
                        getOptionLabel={(option) => option.name}
                        value={this.state.diplomoUniversity}
                        onChange={(e,newValue)=>this.setState({diplomoUniversity : newValue})}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.diplomoUniversityErr.length > 0}
                            helperText={this.state.diplomoUniversityErr}
                            label="Board Name"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        id="debug"
                        options={this.props.getBranchesList}
                        getOptionLabel={(option) => option.name}
                         value={this.state.diplomoDepartment}
                        onChange={(e,newValue)=>this.setState({ diplomoDepartment: newValue})}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.diplomoDepartmentErr.length > 0}
                            helperText={this.state.diplomoDepartmentErr}
                            label="Diploma Type"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                    <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        id="debug"
                        options={this.gpascale}
                        getOptionLabel={(option) => option.title}
                        value={this.state.diplomoCgpaScale}
                        onChange={(e,newValue)=>this.setState({ diplomoCgpaScale: newValue})}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.diplomoCgpaScaleErr.length > 0}
                            helperText={this.state.diplomoCgpaScaleErr}
                            label="CGPA Scale"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <TextField id="standard-basic"  value={this.state.diplomoCgpa}
                        onChange={(e,newValue)=>this.setState({ diplomoCgpa: e.target.value})} label="CGPA" error={this.state.diplomoCgpaErr.length > 0}
                            helperText={this.state.diplomoCgpaErr} />
                    </Grid>
                    <Grid item md={3}>
                      {/* <TextField inputMode="numeric" id="standard-basic" value={this.state.diplomoBlacklogCleared}
                        onChange={(e,newValue)=>this.setState({ diplomoBlacklogCleared: e.target.value})} label="Start Date" error={this.state.diplomoBlacklogClearedErr.length > 0}
                            helperText={this.state.diplomoBlacklogClearedErr}/> */}
                              <KeyboardDatePicker
                                id="date-picker-dialog"
                                value={this.state.diplomoBlacklogCleared}
                                onChange={(e,newValue)=>this.setState({ diplomoBlacklogCleared: newValue})}
                                label="Start Date"
                                  error={this.state.diplomoBlacklogClearedErr.length > 0}
                                    helperText={this.state.diplomoBlacklogClearedErr}
                                format="MM/dd/yyyy"
                                KeyboardButtonProps={{
                                  "aria-label": "change date",
                                }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                />
                    </Grid>
                    <Grid item md={3}>
                      {/* <TextField inputMode="numeric" id="standard-basic" label="End Date"  value={this.state.diplomoBlacklogActive}
                        onChange={(e,newValue)=>this.setState({ diplomoBlacklogActive: e.target.value})} error={this.state.diplomoBlacklogActiveErr.length > 0}
                            helperText={this.state.diplomoBlacklogActiveErr} /> */}
                            <KeyboardDatePicker
                              id="date-picker-dialog"
                              label="End Date"  
                              value={this.state.diplomoBlacklogActive}
                              onChange={(e,newValue)=>this.setState({ diplomoBlacklogActive: newValue})} 
                              error={this.state.diplomoBlacklogActiveErr.length > 0}
                                  helperText={this.state.diplomoBlacklogActiveErr}
                              format="MM/dd/yyyy"
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                />
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
                      <p style={title}>XII Grade</p>
                    </Grid>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item md={4}>
                          <TextField
                          error={this.state.twelthSchoolErr.length > 0}
                            helperText={this.state.twelthSchoolErr}
                            label="School Name"
                            margin="normal"
                            onChange={(e) =>
                              this.setState({ twelthSchool: e.target.value, twelthSchoolErr: "" })}
                          />
                    </Grid>
                    <Grid item md={4}>
                    <Autocomplete
                       popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                       options={this.props.getCollegesList}
                       getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                          {...params}
                            error={this.state.twelthExamBoardErr.length > 0}
                            helperText={this.state.twelthExamBoardErr}
                            label="Board Name"
                            margin="normal"
                            onChange={(e) =>
                              this.setState({ twelthExamBoard : e.target.value, twelthExamBoardErr: "" })}
                          />
                        )}
                            />
                    </Grid>
                    <Grid item md={4}>
                      <Autocomplete
                      popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                        id="debug"
                        options={this.props.getCollegesList}
                       getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.twelthTypeErr.length > 0}
                            helperText={this.state.twelthTypeErr}
                            label="Stream"
                            margin="normal"
                            onChange={(e) => this.setState({ twelthType: e.target.value, twelthTypeErr: "" })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                    <Autocomplete
                       popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                       options={this.props.getCollegesList}
                       getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.twelthCgpaScaleErr.length > 0}
                            helperText={this.state.twelthCgpaScaleErr}
                            label="CGPA Scale"
                            onChange={(e) =>
                              this.setState({ twelthCgpaScale: e.target.value, twelthCgpaScaleErr: "" })}
                          />
                        )}
                      />
                    </Grid>
                    
                    <Grid item md={3}>
                      <TextField id="standard-basic" label="CGPA" error={this.state.twelthCgpaErr.length > 0}
                            helperText={this.state.twelthCgpaErr} onChange={(e) =>
                              this.setState({ twelthCgpa : e.target.value, twelthCgpaErr: "" })} />
                    </Grid>
                    <Grid item md={3}>
                      <TextField id="standard-basic" label="Start Date" error={this.state.twelthStartDateErr.length > 0}
                            helperText={this.state.twelthStartDateErr}/>
                    </Grid>
                    <Grid item md={3}>
                      <TextField id="standard-basic" label="End Date"  error={this.state.twelthEndDateErr.length > 0}
                            helperText={this.state.twelthEndDateErr}/>
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
                      <p style={title}>X Grade</p>
                    </Grid>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                <Grid container spacing={3}>
                    <Grid item md={6}>
                          <TextField
                          error={this.state.tenthSchoolErr.length > 0}
                            helperText={this.state.tenthSchoolErr}
                            label="School Name"
                            margin="normal"
                            value={this.state.tenthSchool}
                            onChange={(e) =>
                              this.setState({ tenthSchool: e.target.value, tenthSchoolErr: "" })}
                          />
                    </Grid>
                    <Grid item md={6}>
                    <Autocomplete
                       popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                       options={this.props.getCollegesList}
                       getOptionLabel={(option) => option.name}
                       value={this.state.tenthExamBoard}
                       onChange={(e,newValue) =>
                        this.setState({ tenthExamBoard: newValue, tenthExamBoardErr: "" })}
                        renderInput={(params) => (
                          <TextField
                          {...params}
                            error={this.state.tenthExamBoardErr.length > 0}
                            helperText={this.state.tenthExamBoardErr}
                            label="Board Name"
                            margin="normal"
                           
                          />
                          )}
                          />
                    </Grid>
                    
                    <Grid item md={3}>
                    <Autocomplete
                       popupIcon={<ExpandMore style= {{color:"#1093FF"}}/>}
                       options={this.gpascale}
                       getOptionLabel={(option) => option.title}
                       value={this.state.tenthCgpaScale}
                       onChange={(e,newValue) =>
                        this.setState({ tenthCgpaScale: newValue, tenthCgpaScaleErr: "" })}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.tenthCgpaScaleErr.length > 0}
                            helperText={this.state.tenthCgpaScaleErr}
                            label="CGPA Scale"
                           
                          />
                        )}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <TextField id="standard-basic" type="number" label="CGPA"  error={this.state.tenthCgpaErr.length > 0}
                            helperText={this.state.tenthCgpaErr} onChange={(e) =>
                              this.setState({ tenthCgpa: e.target.value, tenthCgpaErr: "" })
                            }
                            value={this.state.tenthCgpa}
                            />
                    </Grid>
                    <Grid item md={3}>
                      {/* <TextField id="standard-basic" label="Start Date" value={this.state.tenthStartDate} onChange={(e)=>this.setState({ tenthStartDate : e.target.value})} error={this.state.tenthStartDateErr.length > 0}
                            helperText={this.state.tenthStartDateErr} /> */}
                              <KeyboardDatePicker
                                id="date-picker-dialog"
                                label="Start Date" 
                                value={this.state.tenthStartDate} 
                                onChange={(e,newValue)=>this.setState({ tenthStartDate : newValue})} 
                                error={this.state.tenthStartDateErr.length > 0}
                                helperText={this.state.tenthStartDateErr}
                                format="MM/dd/yyyy"
                                KeyboardButtonProps={{
                                  "aria-label": "change date",
                                }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                    </Grid>
                    <Grid item md={3}>
                    
                      {/* <TextField id="standard-basic" value={this.state.tenthEndDate} onChange={(e)=>this.setState({ tenthEndDate : e.target.value})} label="End Date" error={this.state.tenthEndDateErr.length > 0}
                            helperText={this.state.tenthEndDateErr}/> */}
                             <KeyboardDatePicker
                                id="date-picker-dialog"
                                label="Start Date" 
                                value={this.state.tenthEndDate} 
                                onChange={(e,newValue)=>this.setState({ tenthEndDate : newValue})} 
                                label="End Date" 
                                error={this.state.tenthEndDateErr.length > 0}
                                helperText={this.state.tenthEndDateErr}
                                format="MM/dd/yyyy"
                                KeyboardButtonProps={{
                                  "aria-label": "change date",
                                }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                    </Grid>
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
        </MuiPickersUtilsProvider>
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
  };
};

export default connect(mapStateToProps, {
  getBranches,
  getDegree,
  getAllColleges,
  getUniversity,
})(academicInfo);

