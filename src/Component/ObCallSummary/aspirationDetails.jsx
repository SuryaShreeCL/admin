import {
  Checkbox, createMuiTheme, FormControlLabel,
  Grid,
  TextField, ThemeProvider
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { ExpandMore } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateVerificationStatus, viewStudentStatus
} from "../../Actions/AdminAction";
import {
  getAllBranch, getallcountry, getAllDegree,
  getAllSpecialization,
  getAllTerms,
  getAllUniversity, getAspiration,
  getAspirationQuestion, updateAspiration
} from "../../Actions/Aspiration";
import Pencil from "../../Asset/Images/pencil.png";
import { SECTION } from "../../Constant/Variables";
import PrimaryButton from "../../Utils/PrimaryButton";
import Model from "../Utils/SectionModel";
import Status from "../Utils/Status";
import MySnack from '../MySnackBar'


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
      snackMsg  : "",
      snackVariant : "",
      snackOpen : false,

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
      answerModel: [],
      noOfSchool: "",
      intake: [],
      aspirationCountries: [],
      aspirationDegrees: [],
      aspirationBranches: [],
      aspirationAreaOfSpecializations: [],
      aspirationUniversities: [],
      filteredAspirationSpecializationList: [],
      filteredCollegeList: [],
      aspirationCollegeList: [],
      aspirationSpecializationList: [],
      sectionStatus: {
        model: false,
        data: null,
        sectionName: "",
      },
    };
  }

  componentDidMount() {
    this.props.getAllBranch();
    this.props.getAllDegree();
    this.props.getAllTerms();
    this.props.getallcountry();
    this.props.getAllSpecialization((response) => {
      if (response.status === 200) {
        this.setState({
          aspirationSpecializationList: response.data,
        });
      }
    });
    this.props.getAllUniversity((response) => {
      if (response.status === 200) {
        this.setState({
          aspirationCollegeList: response.data,
        });
      }
    });
    this.props.getAspirationQuestion(
      this.props.match.params.studentId,
      this.props.variantStepList &&
        this.props.variantStepList.productFamily.aspirationQuestionSet
    );
    this.props.viewStudentStatus(this.props.match.params.studentId);
    this.props.getAspiration(
      (response) => {
        this.setState({
          answerModel: response.testQuestionModels.filter(
            (el) => el.question.name !== "AspirationQ2"
          ),
          ...response ? response : [],
          noOfSchool: response.noOfSchool && response.noOfSchool.toString(),
        });
      },
      this.props.match.params.studentId,
      this.props.match.params.productId
    );
  }

  componentDidUpdate(prevProps, prevState) {
    // -------------- College ---------------

    if (this.state.aspirationCollegeList !== prevState.aspirationCollegeList) {
      var searchData = this.state.aspirationCountries.map(
        (eachData, index) => eachData.name
      );

      var filteredList = this.state.aspirationCollegeList
        .map((eachElement, index) => {
          if (searchData.includes(eachElement.country.name)) {
            return eachElement;
          }
        })
        .filter((element) => element !== undefined);
      this.setState({
        filteredCollegeList: filteredList,
      });
    }

    // ---------- Specialization --------------

    if (
      this.state.aspirationSpecializationList !==
      prevState.aspirationSpecializationList
    ) {
      var searchData = this.state.aspirationBranches.map(
        (eachData, index) => eachData.name
      );

      var filteredList = this.state.aspirationSpecializationList
        .map((eachElement, index) => {
          if (searchData.includes(eachElement.aspirationBranch.name)) {
            return eachElement;
          }
        })
        .filter((element) => element !== undefined);

      this.setState({
        filteredAspirationSpecializationList: filteredList,
      });
    }
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
      intake: intake.map((item) => {
        return { id: item.id };
      }),
      aspirationCountries: aspirationCountries,
      aspirationDegrees: aspirationDegrees,
      aspirationBranches: aspirationBranches,
      aspirationAreaOfSpecializations: aspirationAreaOfSpecializations,
      aspirationUniversities: aspirationUniversities,
      testQuestionModels:
        this.state.answerModel.length === 0
          ? this.state.testQuestionModels
          : this.state.answerModel,
    };

    obj.testQuestionModels.map((item) => {
      for (const [key, value] of Object.entries(item.question)) {
        if (key !== "id") {
          delete item.question[key];
        }
      }
      delete item.answer["questionId"];
      // delete item["testExecutionId"];
    });
    this.props.updateAspiration(
      obj,
      (response) => {
        this.props.getAspirationQuestion(
          this.props.match.params.studentId,
          this.props.variantStepList &&
            this.props.variantStepList.productFamily.aspirationQuestionSet
        );
        this.props.viewStudentStatus(this.props.match.params.studentId);
        this.props.getAspiration(
          (response) => {
            this.setState({
              answerModel: response.testQuestionModels,
              ...response,
            });
          },
          this.props.match.params.studentId,
          this.props.match.params.productId
        );
      },
      this.props.match.params.studentId,
      this.props.getAspirationQuestionList.id
    );
    this.setState({
      snackMsg  : "Updated Successfully",
      snackVariant : "Success",
      snackOpen : true,
      show : false
    })
  };

  getStatus = (sectionName) => {
    if (this.props.studentStatus && this.props.studentStatus.length !== 0) {
      const { studentStatus } = this.props;
      return studentStatus.find((item) => item.sectionName === sectionName);
    }
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

  getAnswer = (qid) => {
    let obj = this.state.answerModel.find((item) => {
      return item.answer.questionId === qid;
    });

    let choice = null;
    if (obj) {
      if (obj.question.type === "SINGLE_SELECT")
        choice = obj.answer.selectedChoices[0].id;
      else if (obj.question.type === "MULTI_CHOICE") {
        choice = obj.answer.selectedChoices.map((item) => item.id);
      }
    }
    return choice;
  };

  renderAspirationQuestions = () => {
    const {
      questionsSet: { questions },
      answer,
    } = this.props.getAspirationQuestionList;
    const { choiceStyle } = style;
    return (
      <Grid container spacing={2}>
        {questions
          .filter((el) => el.name !== "AspirationQ2")
          .map(({ id, question, choices, type }, index) => {
            var qid = id;
            if (type === "SINGLE_SELECT")
              return (
                <>
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
                    {question}
                  </Grid>
                  <Grid item md={12}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="gender"
                        style={{ display: "flex", flexDirection: "row" }}
                        onChange={(e) => {
                          let arr = [];
                          let choiceId = {
                            id: e.target.value,
                          };
                          let obj = {
                            question: {
                              id: qid,
                            },
                            answer: {
                              selectedChoices: [choiceId],
                              questionId: qid,
                            },
                            testExecutionId: this.state.answerModel[0]
                              .testExecutionId,
                          };
                          if (
                            this.state.answerModel.some(
                              (item) => item.question.id === obj.question.id
                            )
                          ) {
                            arr = this.state.answerModel
                              .filter(
                                (item) => item.question.id !== obj.question.id
                              )
                              .concat(obj);
                          } else {
                            arr = this.state.answerModel.concat(obj);
                          }

                          this.setState({ answerModel: arr });
                        }}
                        // defaultValue={this.getAnswer(qid)}
                        value={
                          this.state.answerModel
                            .filter((el) => el.question.name !== "AspirationQ2")
                            .find((item) => item.answer.questionId === qid)
                            ? this.state.answerModel
                                .filter(
                                  (el) => el.question.name !== "AspirationQ2"
                                )
                                .find((item) => item.answer.questionId === qid)
                                .answer.selectedChoices[0].id
                            : null
                        }
                      >
                        {choices.map(({ text, id }) => {
                          return (
                            <FormControlLabel
                              style={choiceStyle}
                              control={<Radio />}
                              label={text}
                              value={id}
                            />
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </>
              );

            if (type === "MULTI_CHOICE")
              return (
                <>
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
                    {question}
                  </Grid>
                  <Grid item md={12}>
                    <FormGroup row>
                      {choices.map(({ text, id }) => {
                        return (
                          <FormControlLabel
                            style={choiceStyle}
                            labelStyle={{ color: "white" }}
                            iconStyle={{ fill: "white" }}
                            control={<Checkbox name="checkedA" />}
                            label={text}
                            value={id}
                            onChange={({ target: { value, checked } }) => {
                              let obj = {
                                question: {
                                  id: qid,
                                },
                                answer: {
                                  selectedChoices: [{ id: value }],
                                },
                              };
                              var question = this.state.answerModel.find(
                                (item) => item.question.id === obj.question.id
                              );
                              if (question) {
                                if (checked) {
                                  question.answer.selectedChoices.push({
                                    id: value,
                                  });
                                  let removeExist = this.state.answerModel.filter(
                                    (item) =>
                                      item.question.id !== obj.question.id
                                  );
                                  this.setState({
                                    answerModel: removeExist.concat(question),
                                  });
                                } else {
                                  let removeExist = this.state.answerModel.filter(
                                    (item) =>
                                      item.question.id !== obj.question.id
                                  );
                                  question.answer.selectedChoices = question.answer.selectedChoices.filter(
                                    (item) => item.id !== value
                                  );
                                  this.setState({
                                    answerModel: removeExist.concat(question),
                                  });
                                }
                              } else {
                                this.setState({
                                  answerModel: this.state.answerModel.concat(
                                    obj
                                  ),
                                });
                              }
                            }}
                            checked={
                              this.getAnswer(qid)
                                ? this.getAnswer(qid).indexOf(id) > -1
                                : null
                            }
                          />
                        );
                      })}
                    </FormGroup>
                  </Grid>
                </>
              );
          })}
      </Grid>
    );
  };

  noOfSchoolArr = ["1", "3", "5"];

  handleFeildOfStudyChange = (e, newValue) => {
    var searchData = newValue.map((eachData, index) => eachData.name);
    var filteredList = this.state.aspirationSpecializationList
      .map((eachElement, index) => {
        if (searchData.includes(eachElement.aspirationBranch.name)) {
          return eachElement;
        }
      })
      .filter((element) => element !== undefined);

    this.setState({
      filteredAspirationSpecializationList: filteredList,
    });

    var newSpecializationList = this.state.aspirationAreaOfSpecializations
      .map((eachSpecialization, index) => {
        if (searchData.includes(eachSpecialization.aspirationBranch.name)) {
          return eachSpecialization;
        }
      })
      .filter((eachElement) => eachElement !== undefined);
    this.setState({
      aspirationBranches: newValue,
      aspirationAreaOfSpecializations: newSpecializationList,
    });
  };

  handleCountryChange = (e, newValue) => {
    var searchData = newValue.map((eachData, index) => eachData.name);
    var filteredList = this.state.aspirationCollegeList
      .map((eachElement, index) => {
        if (searchData.includes(eachElement.country.name)) {
          return eachElement;
        }
      })
      .filter((element) => element !== undefined);

    this.setState({
      filteredCollegeList: filteredList,
    });

    var newUniversityList = this.state.aspirationUniversities
      .map((eachUniversity, index) => {
        if (searchData.includes(eachUniversity.country.name)) {
          return eachUniversity;
        }
      })
      .filter((eachElement) => eachElement !== undefined);

    this.setState({
      aspirationCountries: newValue,
      aspirationUniversities: newUniversityList,
    });
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
              {/* <Status
                onClick={() => {
                  this.setState({
                    sectionStatus: {
                      model: true,
                      data: this.getStatus(SECTION.aspirationDetail),
                      sectionName: SECTION.aspirationDetail,
                    },
                  });
                }}
                status={
                  this.getStatus(SECTION.aspirationDetail)
                    ? this.getStatus(SECTION.aspirationDetail).status
                    : "notVerified"
                }
              /> */}
            </div>
            <IconButton onClick={this.handleClick.bind(this)}>
              <img src={Pencil} height={17} width={17} />
            </IconButton>
          </div>
          {this.props.getAspirationQuestionList.length !== 0 &&
            this.renderAspirationQuestions()}
          <Grid container spacing={2}>
            <Grid item md={2}>
              {/* <TextField
                //   style={{ width: "100%" }}
                id="standard-basic"
                label="No Of Schools?"
                disabled={this.state.disable}
                value={this.state.noOfSchool}
                onChange={(e) => {
                  this.setState({ noOfSchool: e.target.value });
                }}
              /> */}
              <Autocomplete
                id="tags-outlined"
                options={this.noOfSchoolArr}
                getOptionLabel={(option) => option}
                value={this.state.noOfSchool}
                renderInput={(params) => (
                  <TextField {...params} label="Number Of Schools" />
                )}
                onChange={(e, newValue) =>
                  this.setState({ noOfSchool: newValue })
                }
              />
            </Grid>
            <Grid item md={3}>
              <Autocomplete
                popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                multiple
                id="combo-box-demo"
                disabled={this.state.disable}
                options={this.props.allTermList || []}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Intake" variant="standard" />
                )}
                onChange={(e, value) => this.setState({ intake: value })}
                value={this.state.intake || []}
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
                  <TextField {...params} label="Degree" variant="standard" />
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
                getOptionDisabled={(option) => {
                  var feildOfStudyHolder = this.state.aspirationBranches.map(
                    (el) => el.name
                  );
                  return feildOfStudyHolder.includes(option.name);
                }}
                disabled={this.state.disable}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Field Of Study"
                    variant="standard"
                  />
                )}
                onChange={this.handleFeildOfStudyChange}
                value={this.state.aspirationBranches || []}
              />
            </Grid>
            <Grid item md={3}>
              <Autocomplete
                multiple
                popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                id="combo-box-demo"
                options={this.state.filteredAspirationSpecializationList.sort(
                  (a, b) =>
                    -b.aspirationBranch.name.localeCompare(
                      a.aspirationBranch.name
                    )
                )}
                getOptionLabel={(option) => option.name}
                groupBy={(option) => option.aspirationBranch.name}
                getOptionDisabled={(option) => {
                  var specializationHolder = this.state.aspirationAreaOfSpecializations.map(
                    (el) => el.name
                  );
                  return specializationHolder.includes(option.name);
                }}
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
            <Grid item md={3}>
              <Autocomplete
                multiple
                popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                id="combo-box-demo"
                options={this.props.allCountry}
                getOptionLabel={(option) => option.name}
                disabled={this.state.disable}
                getOptionDisabled={(option) => {
                  var countryHolder = this.state.aspirationCountries.map(
                    (el) => el.name
                  );
                  return countryHolder.includes(option.name);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country of Dream Colleges"
                    variant="standard"
                  />
                )}
                onChange={this.handleCountryChange}
                value={this.state.aspirationCountries || []}
              />
            </Grid>

            <Grid item md={3}>
              <Autocomplete
                multiple
                popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                id="combo-box-demo"
                options={this.state.filteredCollegeList.sort(
                  (a, b) => -b.country.name.localeCompare(a.country.name)
                )}
                getOptionLabel={(option) => option.name}
                getOptionDisabled={(option) => {
                  var collegeHolder = this.state.aspirationUniversities.map(
                    (el) => el.name
                  );
                  return collegeHolder.includes(option.name);
                }}
                groupBy={(option) => option.country.name}
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
          </Grid>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "5%",
              getAspirationQuestion,
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
          <MySnack
           snackMsg={this.state.snackMsg}
           snackVariant={this.state.snackVariant}
           snackOpen={this.state.snackOpen}
           onClose={() => this.setState({ snackOpen: false })}
        /> 
          {this.renderModel()}
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
    studentStatus: state.AdminReducer.studentStatusResponse,
    getAspirationQuestionList: state.AspirationReducer.getAspirationQuestion,
    // getAllTermsList: state.AspirationReducer.getAllTerms
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
  viewStudentStatus,
  updateVerificationStatus,
  getAspirationQuestion,
})(AspirationDetails);
