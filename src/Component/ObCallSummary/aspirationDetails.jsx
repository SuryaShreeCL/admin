import { Grid, TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { ExpandMore } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getallcountry,
  getAllTerms,
  viewCountry,
} from "../../Actions/Aspiration";
import { getBranches, getDegree, getUniversity } from "../../Actions/College";
import { getAllProductFamily } from "../../Actions/ProductAction";
import Pencil from "../../Asset/Images/pencil.png";
import Warning from "../../Asset/Images/warningImg.png";
import PrimaryButton from "../../Utils/PrimaryButton";

class AspirationDetails extends Component {
  constructor() {
    super();
    this.state = {
      disable: true,
      val: "",
      targetIntake: null,
      targetIntakeErr: "",
      schoolTargeted: "",
      schoolTargetedErr: "",
      targetDegree: null,
      targetDegreeErr: "",
      areaOfSpecalization: null,
      areaOfSpecalizationErr: "",
      countryCollege: [],
      countryCollegeErr: "",
      listOfDreamCollege: null,
      listOfDreamCollegeErr: "",
    };
  }
  componentDidMount() {
    this.props.getAllProductFamily();
    this.props.getAllTerms();
    this.props.getallcountry();
    this.props.getBranches();
    this.props.getUniversity();
    this.props.getDegree();
  }

  handleClick(e) {
    this.setState({ disable: !this.state.disable });
  }
  handleSave() {
    console.log(this.state);
    let hlptxt = "Please fill the required field";
    this.state.schoolTargeted === ""
      ? this.setState({ schoolTargetedErr: hlptxt })
      : this.setState({ schoolTargetedErr: "" });
    this.state.targetDegree === null
      ? this.setState({ targetDegreeErr: hlptxt })
      : this.setState({ targetDegreeErr: "" });
    this.state.areaOfSpecalization === null
      ? this.setState({ areaOfSpecalizationErr: hlptxt })
      : this.setState({ areaOfSpecalizationErr: "" });
    this.state.countryCollege === null
      ? this.setState({ countryCollegeErr: hlptxt })
      : this.setState({ countryCollegeErr: "" });
    this.state.listOfDreamCollege === null
      ? this.setState({ listOfDreamCollegeErr: hlptxt })
      : this.setState({ listOfDreamCollegeErr: "" });
    this.state.targetIntake === null
      ? this.setState({ targetIntakeErr: hlptxt })
      : this.setState({ targetIntakeErr: "" });
    console.log("hhh");
  }
  render() {
    console.log(new Date());
    return (
      <div style={{ padding: 25 }}>
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
          <Grid item xs={8}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: 18,
                fontWeight: 400,
              }}
            >
              What Kind Of Degree You Want To Persue?
              <div
                style={{
                  color: "#2C8853",
                  paddingLeft: 10,
                  fontWeight: "bold",
                }}
              >
                Technical and Techno Managerial
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: 18,
                fontWeight: 400,
              }}
            >
              Which Of The Following Tests Have you Taken Or Intend To Take?
              <div
                style={{
                  color: "#2C8853",
                  paddingLeft: 10,
                  fontWeight: "bold",
                }}
              >
                GRE,TOEFL,IELTS
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: 18,
                fontWeight: 400,
              }}
            >
              How Do You Propose To Finance Your Studies?
              <div
                style={{
                  color: "#2C8853",
                  paddingLeft: 10,
                  fontWeight: "bold",
                }}
              >
                Loan
              </div>
            </div>
          </Grid>
          <Grid item md={2}>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="No Of Schools?"
              error={this.state.schoolTargetedErr.length > 0}
              helperText={this.state.schoolTargetedErr}
              type="number"
              value={this.state.schoolTargeted}
              onChange={(e) => {
                this.setState({
                  schoolTargeted: e.target.value,
                  schoolTargetedErr: "",
                });
              }}
            />
          </Grid>
          <Grid item md={3}>
            <Autocomplete
              popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
              id="combo-box-demo"
              error={this.state.targetIntakeErr.length > 0}
              helperText={this.state.targetIntakeErr}
              value={this.state.targetIntake}
              options={this.props.getAspTermsList}
              getOptionLabel={(option) => option.name}
              onChange={(e, newValue) =>
                this.setState({ targetIntake: newValue, targetIntakeErr: "" })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Intake"
                  variant="standard"
                  error={this.state.targetIntakeErr.length > 0}
                  helperText={this.state.targetIntakeErr}
                />
              )}
            />
          </Grid>
          <Grid item md={2}>
            <Autocomplete
              popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
              id="combo-box-demo"
              value={this.state.targetDegree}
              onChange={(e, newValue) =>
                this.setState({ targetDegree: newValue, targetDegreeErr: "" })
              }
              options={this.props.getDegreeList}
              getOptionLabel={(option) => option.name}
              value={this.state.pgDepartment}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Targeted Degree"
                  variant="standard"
                  error={this.state.targetDegreeErr.length > 0}
                  helperText={this.state.targetDegreeErr}
                />
              )}
            />
          </Grid>

          <Grid item md={5}>
            <Autocomplete
              popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
              id="combo-box-demo"
              options={this.props.getBranchesList}
              value={this.state.areaOfSpecalization}
              onChange={(e, newValue) =>
                this.setState({
                  areaOfSpecalization: newValue,
                  areaOfSpecalizationErr: "",
                })
              }
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Area of Specialization"
                  variant="standard"
                  error={this.state.areaOfSpecalizationErr.length > 0}
                  helperText={this.state.areaOfSpecalizationErr}
                />
              )}
            />
          </Grid>

          <Grid item md={3}>
            <Autocomplete
               multiple
               limitTags={2}
              popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
              id="multiple-limit-tags"
              value={this.state.countryCollege}
              onChange={(e, newValue) =>
                this.setState({
                  countryCollege: newValue,
                  countryCollegeErr: "",
                })
              }
              options={this.props.getallcountryList ? this.props.getallcountryList : []}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country Of Dream College"
                  variant="standard"
                  error={this.state.countryCollegeErr.length > 0}
                  helperText={this.state.countryCollegeErr}
                />
              )}
            />
          </Grid>

          <Grid item md={3}>
            <Autocomplete
              popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
              id="combo-box-demo"
              value={this.state.listOfDreamCollege}
              onChange={(e, newValue) =>
                this.setState({
                  listOfDreamCollege: newValue,
                  listOfDreamCollegeErr: "",
                })
              }
              options={this.props.getUniversityList}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="List Of Dream Colleges"
                  variant="standard"
                  error={this.state.listOfDreamCollegeErr.length > 0}
                  helperText={this.state.listOfDreamCollegeErr}
                />
              )}
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
            onClick={() => this.handleSave()}
            variant={"contained"}
            color={"primary"}
            style={{ textTransform: "none" }}
          >
            Save Changes
          </PrimaryButton>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    getAllProductFamilyList: state.ProductReducer.getAllProductFamily,
    getAspTermsList: state.AspirationReducer.allTermList,
    getcountrylist: state.AspirationReducer.viewCountryList,
    getallcountryList: state.AspirationReducer.getallcountry,
    getUniversityList: state.CollegeReducer.University,
    getBranchesList: state.CollegeReducer.BranchList,
    getDegreeList: state.CollegeReducer.Degree,
  };
};

export default connect(mapStateToProps, {
  getAllProductFamily,
  getAllTerms,
  viewCountry,
  getallcountry,
  getUniversity,
  getBranches,
  getDegree,
})(AspirationDetails);
