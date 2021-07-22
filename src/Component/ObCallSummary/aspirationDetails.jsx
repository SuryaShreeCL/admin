import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { ExpandMore } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React, { Component } from "react";
import Pencil from "../../Asset/Images/pencil.png";
import Warning from "../../Asset/Images/warningImg.png";
import PrimaryButton from "../../Utils/PrimaryButton";
import { connect } from "react-redux";
import {
  getAllBranch,
  getAllDegree,
  getAllSpecialization,
  getAllTerms,
  getAllUniversity,
  getallcountry,
  updateAspiration,
  getAspiration,
} from "../../Actions/Aspiration";

const theme = createMuiTheme({
  overrides: {
    MuiRadio: {
      colorSecondary: {
        "&$checked": {
          color: "#1093FF",
        },
      },
    },
    MuiCheckbox: {
      colorSecondary: {
        "&$checked": {
          color: "#1093FF",
        },
      },
    },
    MuiIconButton: {
      root: {
        color: "#1093FF",
      },
    },
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
  },
});

class AspirationDetails extends Component {
  constructor() {
    super();
    this.state = {
      disable: true,
      val: "",
      targetYear: "2022,2023",
      targetIntake: "Fall,Winter",
      schoolTargeted: "3",
      targetDegree: "MS",
      areaOfSpecalization: "AREA OF SPECALIZATION1",
      countryCollege: "INDIA, USA",
      listOfDreamCollege: "College1",
      listOfDreamBusinessCollege: "College1",

      testQuestionModels: [
        {
          question: {
            id: "",
          },
          answer: {
            id: "",
            answer: "",
            selectedChoices: [],
          },
        },
      ],
      noOfSchool: "",
      intake: "",
      aspirationCountries: [],
      aspirationDegrees: [],
      aspirationBranches: [],
      aspirationAreaOfSpecializations: [],
      aspirationUniversities: [],
    };
  }

  componentDidMount() {
    this.props.getAllBranch();
    this.props.getAllDegree();
    this.props.getAllSpecialization();
    this.props.getAllTerms();
    this.props.getAllUniversity();
    this.props.getallcountry();
    this.props.getAspiration((response) => {
      this.setState({
        ...response,
      });
    });
  }

  handleClick(e) {
    this.setState({ disable: !this.state.disable });
  }

  updateAspiration = () => {
    const {
      noOfSchool,
      intake,
      aspirationAreaOfSpecializations,
      aspirationBranches,
      aspirationCountries,
      aspirationDegrees,
      aspirationUniversities,
      testQuestionModels,
    } = this.state;
    let obj = {
      noOfSchool: noOfSchool,
      intake: intake ?intake.name : "",
      aspirationCountries: aspirationCountries,
      aspirationDegrees: aspirationDegrees,
      aspirationBranches: aspirationBranches,
      aspirationAreaOfSpecializations: aspirationAreaOfSpecializations,
      aspirationUniversities: aspirationUniversities,
      testQuestionModels:[]
    };
    this.props.updateAspiration(obj,response=>console.log(response))    
  };

  render() {
    const { choiceStyle } = style;
    return (
      <div style={{ padding: 25 }}>
        <ThemeProvider theme={theme}>
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
                width: "15%",
              }}
            >
              <p
                style={{
                  fontStyle: "Poppins",
                  fontWeight: "600",
                  fontStyle: "normal",
                  fontSize: "18px",
                  color: "#0081FF",
                  paddingLeft: 10,
                }}
              >
                Aspiration Details
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
          <Grid container spacing={2}>
            <Grid
              item
              xs={8}
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: 18,
                fontWeight: 400,
              }}
            >
              What Kind Of Degree You Want To Persue?
            </Grid>
            <Grid item md={12}>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <FormControlLabel
                    style={choiceStyle}
                    value="Not yet Decided"
                    control={<Radio />}
                    label="Not yet Decided"
                  />
                  <FormControlLabel
                    style={choiceStyle}
                    value="Technical (Eg: MS in CS)"
                    control={<Radio />}
                    label="Technical (Eg: MS in CS)"
                  />
                  <FormControlLabel
                    style={choiceStyle}
                    value="Management (Eg: MiM/MSBA)"
                    control={<Radio />}
                    label="Management (Eg: MiM/MSBA)"
                  />
                  <FormControlLabel
                    style={choiceStyle}
                    value="Techno-Managerial (Eg: MEM)"
                    control={<Radio />}
                    label="Techno-Managerial (Eg: MEM)"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: 18,
                fontWeight: 400,
              }}
            >
              Which Of The Following Tests Have you Taken Or Intend To Take?
            </Grid>
            <Grid item md={12}>
              <FormGroup row>
                <FormControlLabel
                  style={choiceStyle}
                  labelStyle={{ color: "white" }}
                  iconStyle={{ fill: "white" }}
                  control={<Checkbox name="checkedA" />}
                  label="GRE"
                />
                <FormControlLabel
                  style={choiceStyle}
                  control={<Checkbox name="checkedB" />}
                  label="GMAT"
                />
                <FormControlLabel
                  style={choiceStyle}
                  control={<Checkbox name="checkedC" />}
                  label="TOEFL"
                />
                <FormControlLabel
                  style={choiceStyle}
                  control={<Checkbox name="checkedD" />}
                  label="IELTS"
                />
              </FormGroup>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: 18,
                fontWeight: 400,
              }}
            >
              How Do You Propose To Finance Your Studies?
            </Grid>
            <Grid item md={12}>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <FormControlLabel
                    style={choiceStyle}
                    value="Self"
                    control={<Radio />}
                    label="Self"
                  />
                  <FormControlLabel
                    style={choiceStyle}
                    value="Loan"
                    control={<Radio />}
                    label="Loan"
                  />
                  <FormControlLabel
                    style={choiceStyle}
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={2}>
              <TextField
                //   style={{ width: "100%" }}
                id="standard-basic"
                label="No Of Schools?"
                disabled={this.state.disable}
                value={this.state.noOfSchool}
                onChange={(e) => {
                  this.setState({ noOfSchool: e.target.value });
                }}
              />
            </Grid>
            <Grid item md={3}>
              <Autocomplete
                popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                id="combo-box-demo"
                disabled={this.state.disable}
                options={[{ name: "2011" }, { name: "2012" }]}
                getOptionLabel={(option) => option.name}                
                renderInput={(params) => (
                  <TextField {...params} label="Intake" variant="standard" />
                )}
                onChange={(e, value) => this.setState({ intake: value })}
                value={this.state.intake}
              />
            </Grid>
            <Grid item md={2}>
              <Autocomplete
              multiple
                popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                id="combo-box-demo"
                disabled={this.state.disable}
                options={this.props.allDegreeList || []}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Degree"
                    variant="standard"
                  />
                )}
                onChange={(e, value) =>
                  this.setState({ aspirationDegrees: value })
                }
                value={this.state.aspirationDegrees || []}
              />
            </Grid>

            <Grid item md={5}>
              <Autocomplete
              multiple
                popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                id="combo-box-demo"
                options={this.props.allBranchList}
                getOptionLabel={(option) => option.name}
                disabled={this.state.disable}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Field Of Study"
                    variant="standard"
                  />
                )}
                onChange={(e, value) =>
                  this.setState({ aspirationBranches: value })
                }
                value={this.state.aspirationBranches || []}
              />
            </Grid>

            <Grid item md={3}>
              <Autocomplete
              multiple
                popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                id="combo-box-demo"
                options={this.props.allCountry}
                getOptionLabel={(option) => option.name}
                disabled={this.state.disable}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country of Dream Colleges"
                    variant="standard"
                  />
                )}
                onChange={(e, value) =>
                  this.setState({ aspirationCountries: value })
                }
                value={this.state.aspirationCountries || []}
              />
            </Grid>

            <Grid item md={3}>
              <Autocomplete
              multiple
                popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                id="combo-box-demo"
                options={this.props.allUniversityList}
                getOptionLabel={(option) => option.name}
                disabled={this.state.disable}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="List of Dream Graduate Colleges"
                    variant="standard"
                  />
                )}
                onChange={(e, value) =>
                  this.setState({ aspirationUniversities: value })
                }
                value={this.state.aspirationUniversities || []}
              />
            </Grid>
            <Grid item md={3}>
              <Autocomplete
              multiple
                popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                id="combo-box-demo"
                options={this.props.allSpeciaizationList}
                getOptionLabel={(option) => option.name}
                disabled={this.state.disable}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Area of Specialization"
                    variant="standard"
                  />
                )}
                onChange={(e, value) =>
                  this.setState({ aspirationAreaOfSpecializations: value })
                }
                value={this.state.aspirationAreaOfSpecializations || []}
              />
            </Grid>
          </Grid>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "5%",
            }}
          >
            <PrimaryButton
              style={{ textTransform: "none" }}
              variant={"contained"}
              color={"primary"}
              size={"small"}
              onClick={this.updateAspiration}
            >
              Save Changes
            </PrimaryButton>
          </div>
        </ThemeProvider>
      </div>
    );
  }
}
const style = {
  choiceStyle: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    color: "#05252C",
  },
};

const mapStateToProps = (state) => {
  return {
    ...state.AspirationReducer,
  };
};

export default connect(mapStateToProps, {
  getAllBranch,
  getAllDegree,
  getAllSpecialization,
  getAllTerms,
  getAllUniversity,
  getallcountry,
  updateAspiration,
  getAspiration,
})(AspirationDetails);
