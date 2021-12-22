import {
  Checkbox,
  createMuiTheme,
  FormControlLabel,
  Grid,
  TextField,
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
import { connect } from "react-redux";
import {
  updateVerificationStatus,
  viewStudentStatus,
} from "../../Actions/AdminAction";
import {
  getAllBranch,
  getallcountry,
  getAllDegree,
  getAllSpecialization,
  getAllTerms,
  getAllUniversity,
  getAspiration,
  getAspirationQuestion,
  updateAspiration,
} from "../../Actions/Aspiration";
import Pencil from "../../Asset/Images/pencil.png";
import { SECTION } from "../../Constant/Variables";
import PrimaryButton from "../../Utils/PrimaryButton";
import Model from "../Utils/SectionModel";
import Status from "../Utils/Status";
import MySnack from "../MySnackBar";
import { getVariantStepsById } from "../../Actions/ProductAction";
import AspQuestion from "./AspQuestion";
import {
  getAspirationLocation,
  getAspirationPackage,
  getAspirationWork,
  getaspirationData,
  postaspirationData,
  getAspirationBranch,
  getAspirationCollege,
  getAspirationCounty,
  getAspirationDegree,
  getAspirationSpecialization,
  getAspirationTerms,
} from "../../Actions/Student";
import { isEmptyArray, isEmptyString, isEmptyObject } from "../Validation";
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
      snackMsg: "",
      snackVariant: "",
      snackOpen: false,

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
      getAspdata: null,
      testId: "",
      aspWorkErr: "",
      asplocErr: "",
      aspPackErr: "",
      asplocation: "",
      aspwork: "",
      asppackage: "",
      selectedValue: [],
      schoolErr: "",
      degreeErr: "",
      counteryErr: "",
      branchErr: "",
      universityErr: "",
      specializationErr: "",
      termErr: "",
      tempArr: [],
      aspirationCollegeList: [],
      filteredCollegeList: [],
      aspirationSpecializationList: [],
      filteredAspirationSpecializationList: [],
    };
  }

  componentDidMount() {
    this.props.getAspirationTerms(this.props.match.params.studentId,this.props.variantStepList.id);
    this.props.getAspirationDegree();
    this.props.getAspirationBranch(this.props.match.params.studentId,"");
    this.props.getAspirationCounty(this.props.match.params.studentId,"");
    this.props.getAspirationCollege(this.props.match.params.studentId, this.props.variantStepList.id, ((response) => {
      
      if (response.status === 200) {
        this.setState({
          aspirationCollegeList: response.data,
        });
      }
    }));
    this.props.getAspirationSpecialization("", (response) => {
      if (response.status === 200) {
        this.setState({
          aspirationSpecializationList: response.data,
        });
      }
    });
    this.props.getAspirationQuestion(
      this.props.match.params.studentId,
      this.props.variantStepList &&
        this.props.variantStepList.productFamily.aspirationQuestionSet
    );
    this.props.viewStudentStatus(this.props.match.params.studentId);
    // this.props.getAspiration(
    //   (response) => {
    //     this.setState({
    //       answerModel: response.testQuestionModels.filter(
    //         (el) => el.question.name !== "AspirationQ2"
    //       ),
    //       ...(response ? response : []),
    //       noOfSchool: response.noOfSchool && response.noOfSchool.toString(),
    //     });
    //   },
    //   this.props.match.params.studentId,
    //   this.props.match.params.productId
    // );
    this.props.getVariantStepsById(this.props.match.params.productId);
    this.props.getAspirationLocation(
      this.props.match.params.studentId,
      this.props.variantStepList.id
    );
    this.props.getAspirationWork(
      this.props.match.params.studentId,
      this.props.variantStepList.id,
      null
    );
    this.props.getAspirationPackage(
      this.props.match.params.studentId,
      this.props.variantStepList.id
    );
    this.props.getaspirationData(
      this.props.match.params.studentId,
      this.props.variantStepList.id,
      (response) => {
        if (response.status === 200) {
          this.setState({
            getAspdata: response.data.data.questionList,
            testId: response.data.data.testExecutionId,
          });
        }
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
   
    if (this.props.getaspirationDataList !== prevProps.getaspirationDataList) {
      this.setState({
        asplocation: this.props.getaspirationDataList.data.jobLocation,
        aspwork: this.props.getaspirationDataList.data.workProfile,
        asppackage: this.props.getaspirationDataList.data.preferredPackage,
        noOfSchool:
          this.props.getaspirationDataList.data.noOfSchools !== null
            ? this.props.getaspirationDataList.data.noOfSchools.toString()
            : null,
        intake: this.props.getaspirationDataList.data.additionalIntakes
          ? this.props.getaspirationDataList.data.additionalIntakes
          : [],
        aspirationDegrees: this.props.getaspirationDataList.data.degree
          ? this.props.getaspirationDataList.data.degree
          : [],
        aspirationBranches: this.props.getaspirationDataList.data.fieldOfStudy
          ? this.props.getaspirationDataList.data.fieldOfStudy
          : [],
        aspirationAreaOfSpecializations: this.props.getaspirationDataList.data
          .areaOfSpecialization
          ? this.props.getaspirationDataList.data.areaOfSpecialization
          : [],
        aspirationCountries: this.props.getaspirationDataList.data.preferredRegion
          ? this.props.getaspirationDataList.data.preferredRegion
          : [],
        aspirationUniversities: this.props.getaspirationDataList.data.school
          ? this.props.getaspirationDataList.data.school
          : [],
      });
      var searchData = this.props.getaspirationDataList.data.fieldOfStudy && this.props.getaspirationDataList.data.fieldOfStudy.map(
        (eachData, index) => eachData.name
      );

      this.props.getAspirationSpecialization("", (response) => {
        if (response.status === 200) {
          var filteredList = response.data
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
      });

      var searchDataTwo = this.props.getaspirationDataList.data.preferredRegion && this.props.getaspirationDataList.data.preferredRegion.map(
        (eachData, index) => eachData.name
      );
      console.log(searchDataTwo)
      this.props.getAspirationCollege(
        this.props.match.params.studentId,
        this.props.variantStepList.id,
        (response) => {
          console.log(response)
          if (response.status === 200) {
            var filteredListTwo = response.data
              .map((eachElement, index) => {
                if (searchDataTwo.includes(eachElement.country.name)) {
                  return eachElement;
                }
              })
              .filter((element) => element !== undefined);
            console.log(filteredListTwo)
            this.setState({
              filteredCollegeList: filteredListTwo,
            });
          }
        }
      );
    }

    if (this.state.selectedValue !== prevState.selectedValue) {
      if (this.props.variantStepList.id === "1") {
        let profile = this.state.getAspdata.filter(
          (item) => item.name === "Aspiration-PB-Placements-Q1"
        );
        let value = profile[0].correctChoices[0].text;
        this.props.getAspirationWork(this.props.match.params.studentId,this.props.variantStepList.id, value);
      }
    }

    // -------------- College ---------------

    if (this.state.aspirationCollegeList !== prevState.aspirationCollegeList) {
      var searchData =
        this.state.aspirationCountries &&
        this.state.aspirationCountries.map((eachData, index) => eachData.name);

      var filteredList =
        this.state.aspirationCollegeList &&
        this.state.aspirationCollegeList
          .map((eachElement, index) => {
            if (searchData && searchData.includes(eachElement.country.name)) {
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
      var searchData =
        this.state.aspirationBranches &&
        this.state.aspirationBranches.map((eachData, index) => eachData.name);

      var filteredList =
        this.state.aspirationSpecializationList &&
        this.state.aspirationSpecializationList
          .map((eachElement, index) => {
            if (
              searchData &&
              searchData.includes(eachElement.aspirationBranch.name)
            ) {
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
  handleChange = (questionArr, choiceObj, mainindex, choiceindex, event) => {
    
    let arr = [];
    this.state.tempArr.push({
      questionId: questionArr.id,
      choices: [choiceObj && choiceObj.id],
      testExecutionId: this.state.testId,
    });
    this.state.tempArr &&
      this.state.tempArr.map((item) => {
        if (item.questionId === questionArr.id) {
          let temp = this.state.tempArr.filter(
            (item1) => item1.questionId !== questionArr.id
          );
          arr = temp;
        }
      });
    arr.push({
      questionId: questionArr.id,
      choices: [choiceObj.id],
      testExecutionId: this.state.testId,
    });
    this.setState({
      selectedValue: arr,
    });
    let Choice = this.state.getAspdata[mainindex].correctChoices;
    let selectedChoice = [];
    selectedChoice.push(choiceObj);
    let valueChanges = this.state.getAspdata;
    valueChanges[mainindex].correctChoices = selectedChoice;
    this.setState({
      getAspdata: valueChanges,
    });
  };

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
      asplocation,
      asppackage,
      aspwork,
    } = this.state;
    let degreeId = [];
    let branchId = [];
    let specializationId = [];
    let termId = [];
    let universityId = [];
    let countryId = [];
    var iterate;
    
    let arr = [];
    this.state.getAspdata.map((item, index) => {
      arr.push({
        questionId: this.state.getAspdata[index].id,
        choices: [this.state.getAspdata[index].correctChoices[0] && this.state.getAspdata[index].correctChoices[0].id],
        testExecutionId: this.state.testId,
      });
    });
    if (this.props.variantStepList.id === "1") {
      let helpText = "Please Fill the Required Field";
      this.state.aspwork === null
        ? this.setState({ aspWorkErr: helpText })
        : this.setState({ aspWorkErr: "" });
      this.state.asplocation === null
        ? this.setState({ asplocErr: helpText })
        : this.setState({ asplocErr: "" });
      this.state.asppackage === null
        ? this.setState({ aspPackErr: helpText })
        : this.setState({ aspPackErr: "" });
      if (
        this.state.aspwork !== null &&
        this.state.asppackage !== null &&
        this.state.asplocation !== null
      ) {
        let obj = {
          noOfSchools: null,
          workProfile: {
            id: this.state.aspwork && this.state.aspwork.id,
          },
          jobLocation: {
            id: this.state.asplocation && this.state.asplocation.id,
          },
          preferredPackage: {
            id: this.state.asppackage && this.state.asppackage.id,
          },
          additionalIntakes: null,
          degree: null,
          fieldOfStudy: null,
          areaOfSpecialization: null,
          preferredRegion: null,
          preferredGradSchools: null,
          preferredBSchools: null,
          answerInfos: arr,
        };
        
        this.props.postaspirationData(
          this.props.match.params.studentId,
          this.props.variantStepList.id,
          obj,
          (response) => {
            if (response.status === 200) {
              this.props.getaspirationData(
                this.props.match.params.studentId,
                this.props.variantStepList.id,
                (response) => {
                  if (response.status === 200) {
                    this.setState({
                      getAspdata: response.data.data.questionList,
                    });
                  }
                }
              );
              this.setState({
                snackMsg: "Updated Successfully",
                snackVariant: "success",
                snackOpen: true,

              });
            }
          }
        );
      }
    } else {
      isEmptyString(noOfSchool)
        ? this.setState({ schoolErr: "Please Fill the Required Field" })
        : this.setState({ schoolErr: "" });

      if (!isEmptyArray(aspirationDegrees)) {
        this.setState({
          degreeErr: "",
        });
        iterate = aspirationDegrees.map((d) => {
          return degreeId.push({ id: d.id });
        });
      } else {
        this.setState({
          degreeErr: "Please Fill the Required Field",
        });
      }

      if (!isEmptyArray(aspirationCountries)) {
        this.setState({
          counteryErr: "",
        });
        iterate = aspirationCountries.map((d) => {
          return countryId.push({ id: d.id });
        });
      } else {
        this.setState({
          counteryErr: "Please fill the required feild",
        });
      }

      if (!isEmptyArray(aspirationBranches)) {
        this.setState({
          branchErr: "",
        });
        iterate = aspirationBranches.map((b) => {
          return branchId.push({ id: b.id });
        });
      } else {
        this.setState({
          branchErr: "Please Fill the Required Field",
        });
      }

      if (!isEmptyArray(aspirationUniversities)) {
        this.setState({
          universityErr: "",
        });
        iterate = aspirationUniversities.map((u) => {
          return universityId.push(u);
        });
      } else {
        this.setState({
          universityErr: "Please Fill the Required Field",
        });
      }

      if (!isEmptyArray(aspirationAreaOfSpecializations)) {
        this.setState({
          specializationErr: "",
        });
        iterate = aspirationAreaOfSpecializations.map((s) => {
          return specializationId.push({ id: s.id });
        });
      } else {
        this.setState({
          specializationErr: "Please Fill the Required Field",
        });
      }

      if (!isEmptyArray(intake)) {
        this.setState({
          termErr: "",
        });
        iterate = intake.map((t) => {
          return termId.push({ id: t.id });
        });
      } else {
        this.setState({
          termErr: "Please Fill the Required Field",
        });
      }
      if (
        !isEmptyString(this.state.noOfSchool) &&
        !isEmptyArray(degreeId) &&
        !isEmptyArray(countryId) &&
        !isEmptyArray(branchId) &&
        !isEmptyArray(universityId) &&
        !isEmptyArray(specializationId) &&
        !isEmptyArray(termId)
      ) {
        let obj = {
          noOfSchools: this.state.noOfSchool,
          workProfile: null,
          jobLocation: null,
          preferredPackage: null,
          additionalIntakes: termId,
          degree: degreeId,
          fieldOfStudy: branchId,
          areaOfSpecialization: specializationId,
          preferredRegion: countryId,
          preferredGradSchools: null,
          preferredBSchools: null,
          school: universityId,
          answerInfos: arr,
        };
        
        this.props.postaspirationData(
          this.props.match.params.studentId,
          this.props.variantStepList.id,
          obj,
          (response) => {
            if (response.status === 200) {
              this.props.getaspirationData(
                this.props.match.params.studentId,
                this.props.variantStepList.id,
                (response) => {
                  if (response.status === 200) {
                    this.setState({
                      getAspdata: response.data.data.questionList,
                    });
                  }
                }
              );
              this.setState({
                snackMsg: "Updated Successfully",
                snackVariant: "Success",
                snackOpen: true,
                show: false,
              });
            }
          }
        );
      }
    }
    // this.setState({
    //   snackMsg: "Updated Successfully",
    //   snackVariant: "Success",
    //   snackOpen: true,
    //   show: false,
    // });
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

  // getAnswer = (qid) => {
  //   let obj = this.state.answerModel.find((item) => {
  //     return item.answer && item.answer.questionId === qid;
  //   });

  //   let choice = null;
  //   if (obj) {
  //     if (obj.question.type === "SINGLE_SELECT")
  //       choice = obj.answer.selectedChoices[0].id;
  //     else if (obj.question.type === "MULTI_CHOICE") {
  //       choice = obj.answer.selectedChoices.map((item) => item.id);
  //     }
  //   }
  //   return choice;
  // };

  // renderAspirationQuestions = () => {
  //   const {
  //     questionsSet: { questions },
  //     answer,
  //   } = this.props.getAspirationQuestionList;
  //   const { choiceStyle } = style;
  //   
  //   return (
  //     <Grid container spacing={2}>
  //       {questions
  //         .filter((el) => el.name !== "AspirationQ2")
  //         .map(({ id, question, choices, type }, index) => {
  //           var qid = id;
  //           if (type === "SINGLE_SELECT")
  //             return (
  //               <>
  //                 <Grid
  //                   item
  //                   xs={8}
  //                   style={{
  //                     display: "flex",
  //                     flexDirection: "row",
  //                     fontSize: 18,
  //                     fontWeight: 400,
  //                   }}
  //                 >
  //                   {question}
  //                 </Grid>
  //                 <Grid item md={12}>
  //                   <FormControl component="fieldset">
  //                     <RadioGroup
  //                       aria-label="gender"
  //                       style={{ display: "flex", flexDirection: "row" }}
  //                       onChange={(e) => {
  //                         let arr = [];
  //                         let choiceId = {
  //                           id: e.target.value,
  //                         };
  //                         let obj = {
  //                           question: {
  //                             id: qid,
  //                           },
  //                           answer: {
  //                             selectedChoices: [choiceId],
  //                             questionId: qid,
  //                           },
  //                           testExecutionId: this.state.answerModel[0]
  //                             .testExecutionId,
  //                         };
  //                         if (
  //                           this.state.answerModel.some(
  //                             (item) => item.question.id === obj.question.id
  //                           )
  //                         ) {
  //                           arr = this.state.answerModel
  //                             .filter(
  //                               (item) => item.question.id !== obj.question.id
  //                             )
  //                             .concat(obj);
  //                         } else {
  //                           arr = this.state.answerModel.concat(obj);
  //                         }

  //                         this.setState({ answerModel: arr });
  //                       }}
  //                       // defaultValue={this.getAnswer(qid)}
  //                       value={
  //                         this.state.answerModel
  //                           .filter((el) => el.question.name !== "AspirationQ2")
  //                           .find(
  //                             (item) =>
  //                               item.answer && item.answer.questionId === qid
  //                           )
  //                           ? this.state.answerModel
  //                               .filter(
  //                                 (el) => el.question.name !== "AspirationQ2"
  //                               )
  //                               .find(
  //                                 (item) =>
  //                                   item.answer &&
  //                                   item.answer.questionId === qid
  //                               ).answer.selectedChoices[0].id
  //                           : null
  //                       }
  //                     >
  //                       {choices &&
  //                         choices.map(({ text, id }) => {
  //                           return (
  //                             <FormControlLabel
  //                               style={choiceStyle}
  //                               control={<Radio />}
  //                               label={text}
  //                               value={id}
  //                             />
  //                           );
  //                         })}
  //                     </RadioGroup>
  //                   </FormControl>
  //                 </Grid>
  //               </>
  //             );

  //           if (type === "MULTI_CHOICE")
  //             return (
  //               <>
  //                 <Grid
  //                   item
  //                   xs={12}
  //                   style={{
  //                     display: "flex",
  //                     flexDirection: "row",
  //                     fontSize: 18,
  //                     fontWeight: 400,
  //                   }}
  //                 >
  //                   {question}
  //                 </Grid>
  //                 <Grid item md={12}>
  //                   <FormGroup row>
  //                     {choices &&
  //                       choices.map(({ text, id }) => {
  //                         return (
  //                           <FormControlLabel
  //                             style={choiceStyle}
  //                             labelStyle={{ color: "white" }}
  //                             iconStyle={{ fill: "white" }}
  //                             control={<Checkbox name="checkedA" />}
  //                             label={text}
  //                             value={id}
  //                             onChange={({ target: { value, checked } }) => {
  //                               let obj = {
  //                                 question: {
  //                                   id: qid,
  //                                 },
  //                                 answer: {
  //                                   selectedChoices: [{ id: value }],
  //                                 },
  //                               };
  //                               var question = this.state.answerModel.find(
  //                                 (item) => item.question.id === obj.question.id
  //                               );
  //                               if (question) {
  //                                 if (checked) {
  //                                   question.answer.selectedChoices.push({
  //                                     id: value,
  //                                   });
  //                                   let removeExist = this.state.answerModel.filter(
  //                                     (item) =>
  //                                       item.question.id !== obj.question.id
  //                                   );
  //                                   this.setState({
  //                                     answerModel: removeExist.concat(question),
  //                                   });
  //                                 } else {
  //                                   let removeExist = this.state.answerModel.filter(
  //                                     (item) =>
  //                                       item.question.id !== obj.question.id
  //                                   );
  //                                   question.answer.selectedChoices = question.answer.selectedChoices.filter(
  //                                     (item) => item.id !== value
  //                                   );
  //                                   this.setState({
  //                                     answerModel: removeExist.concat(question),
  //                                   });
  //                                 }
  //                               } else {
  //                                 this.setState({
  //                                   answerModel: this.state.answerModel.concat(
  //                                     obj
  //                                   ),
  //                                 });
  //                               }
  //                             }}
  //                             checked={
  //                               this.getAnswer(qid)
  //                                 ? this.getAnswer(qid).indexOf(id) > -1
  //                                 : null
  //                             }
  //                           />
  //                         );
  //                       })}
  //                   </FormGroup>
  //                 </Grid>
  //               </>
  //             );
  //         })}
  //     </Grid>
  //   );
  // };

  noOfSchoolArr = ["1", "3", "5"];

  handleFeildOfStudyChange = (e, newValue) => {
    var searchData = newValue.map((eachData, index) => eachData.name);
    var filteredList = this.state.aspirationSpecializationList
      .map((eachElement, index) => {
        if (
          searchData &&
          searchData.includes(eachElement.aspirationBranch.name)
        ) {
          return eachElement;
        }
      })
      .filter((element) => element !== undefined);

    this.setState({
      filteredAspirationSpecializationList: filteredList,
    });

    var newSpecializationList =
      this.state.aspirationAreaOfSpecializations &&
      this.state.aspirationAreaOfSpecializations
        .map((eachSpecialization, index) => {
          if (
            searchData &&
            searchData.includes(eachSpecialization.aspirationBranch.name)
          ) {
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
        if (searchData && searchData.includes(eachElement.country.name)) {
          return eachElement;
        }
      })
      .filter((element) => element !== undefined);

    this.setState({
      filteredCollegeList: filteredList,
    });

    var newUniversityList =
      this.state.aspirationUniversities &&
      this.state.aspirationUniversities
        .map((eachUniversity, index) => {
          if (searchData && searchData.includes(eachUniversity.country && eachUniversity.country.name)) {
            return eachUniversity;
          }
        })
        .filter((eachElement) => eachElement !== undefined);

    this.setState({
      aspirationCountries: newValue,
      aspirationUniversities: newUniversityList,
    });
  };
  renderForm = () => {
    if (this.props.variantStepList.id !== "1") {
      return (
        <>
          <Grid item md={2}>
            <Autocomplete
              id="tags-outlined"
              options={this.noOfSchoolArr || []}
              getOptionLabel={(option) => option}
              value={this.state.noOfSchool || []}
              disabled={this.state.disable}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Number Of Schools"
                  error={this.state.schoolErr.length > 0}
                  helperText={this.state.schoolErr}
                />
              )}
              onChange={(e, newValue) => {
                this.setState({ noOfSchool: newValue });
              }}
            />
          </Grid>
          <Grid item md={3}>
            <Autocomplete
              popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
              multiple
              id="combo-box-demo"
              disabled={this.state.disable}
              options={
                !isEmptyArray(this.props.aspirationTerm) &&
                this.props.aspirationTerm.data
              }
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Intake"
                  variant="standard"
                  error={this.state.termErr.length > 0}
                  helperText={this.state.termErr}
                />
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
              options={this.props.aspirationDegree}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Degree"
                  variant="standard"
                  error={this.state.degreeErr.length > 0}
                  helperText={this.state.degreeErr}
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
              options={this.props.aspirationBranch}
              getOptionLabel={(option) => option.name}
              getOptionDisabled={(option) => {
                var feildOfStudyHolder =
                  this.state.aspirationBranches &&
                  this.state.aspirationBranches.map((el) => el.name);
                // return feildOfStudyHolder.includes(option.name);
              }}
              disabled={this.state.disable}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Field Of Study"
                  variant="standard"
                  error={this.state.branchErr.length > 0}
                  helperText={this.state.branchErr}
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
                var specializationHolder =
                  this.state.aspirationAreaOfSpecializations &&
                  this.state.aspirationAreaOfSpecializations.map(
                    (el) => el.name
                  );
                // return specializationHolder.includes(option.name);
              }}
              disabled={this.state.disable}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Area of Specialization"
                  variant="standard"
                  error={this.state.specializationErr.length > 0}
                  helperText={this.state.specializationErr}
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
              options={
                !isEmptyArray(this.props.aspirationCountry) &&
                this.props.aspirationCountry.data
              }
              getOptionLabel={(option) => option.name}
              disabled={this.state.disable}
              getOptionDisabled={(option) => {
                var countryHolder =
                  this.state.aspirationCountries &&
                  this.state.aspirationCountries.map((el) => el.name);
                // return countryHolder.includes(option.name);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country of Dream Colleges"
                  variant="standard"
                  error={this.state.counteryErr.length > 0}
                  helperText={this.state.counteryErr}
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
                var collegeHolder =
                  this.state.aspirationUniversities &&
                  this.state.aspirationUniversities.map((el) => el.name);
                // return collegeHolder.includes(option.name);
              }}
              groupBy={(option) => option.country.name}
              disabled={this.state.disable}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="List of Dream Graduate Colleges"
                  variant="standard"
                  error={this.state.universityErr.length > 0}
                  helperText={this.state.universityErr}
                />
              )}
              onChange={(e, value) =>
                this.setState({ aspirationUniversities: value })
              }
              value={this.state.aspirationUniversities || []}
            />
          </Grid>
        </>
      );
    } else {
      return (
        <>
          <Grid item md={4}>
            <Autocomplete
              options={
                !isEmptyArray( this.props.getWorkList) &&  this.props.getWorkList.data
              }
              getOptionLabel={(option) => option.workProfile}
              value={this.state.aspwork || null}
              disabled={this.state.disable}
              renderInput={(params) => (
                <TextField
                  helperText={this.state.aspWorkErr}
                  error={this.state.aspWorkErr.length > 0}
                  {...params}
                  label="Preferred Work Profile(others-specify)"
                />
              )}
              onChange={(e, newValue) => this.setState({ aspwork: newValue })}
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              options={
                this.props.getlocationList && this.props.getlocationList.data
              }
              getOptionLabel={(option) => option.jobLocation}
              value={this.state.asplocation || null}
              disabled={this.state.disable}
              renderInput={(params) => (
                <TextField
                  helperText={this.state.asplocErr}
                  error={this.state.asplocErr.length > 0}
                  {...params}
                  label="Preferred Location-Cities(others-specify)"
                />
              )}
              onChange={(e, newValue) =>
                this.setState({ asplocation: newValue })
              }
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              options={
                this.props.getPackagelist && this.props.getPackagelist.data
              }
              getOptionLabel={(option) => option.preferredPackage}
              value={this.state.asppackage || null}
              disabled={this.state.disable}
              renderInput={(params) => (
                <TextField
                  helperText={this.state.aspPackErr}
                  error={this.state.aspPackErr.length > 0}
                  {...params}
                  label="Preferred Package"
                />
              )}
              onChange={(e, newValue) =>
                this.setState({ asppackage: newValue })
              }
            />
          </Grid>
        </>
      );
    }
  };

  render() {
    const { choiceStyle } = style;
    console.log(this.props)
    console.log(this.state)

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
            <IconButton
              disabled={this.props.variantStepList.adminObComplete}
              onClick={this.handleClick.bind(this)}
            >
              <img src={Pencil} height={17} width={17} />
            </IconButton>
          </div>
          <AspQuestion
            {...this.props}
            {...this.state}
            data={this.state.getAspdata}
            handleChange={this.handleChange}
          />
          <Grid container spacing={2}>
            {this.renderForm()}
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
              disabled={this.props.variantStepList.adminObComplete}
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
  console.log(state)
  return {
    ...state.AspirationReducer,
    studentStatus: state.AdminReducer.studentStatusResponse,
    getAspirationQuestionList: state.AspirationReducer.getAspirationQuestion,
    variantStepList: state.ProductReducer.variantStepList,
    getlocationList: state.StudentReducer.aspirationLocation,
    getPackagelist: state.StudentReducer.aspirationPackage,
    getWorkList: state.StudentReducer.aspirationWork,
    getaspirationDataList: state.StudentReducer.getaspirationData,
    postaspirationDataList: state.StudentReducer.postaspirationData,
    aspirationDegree: state.StudentReducer.AspirationDegree,
    aspirationTerm: state.StudentReducer.AspirationTerm,
    aspirationBranch: state.StudentReducer.AspirationBranch,
    aspirationCountry: state.StudentReducer.AspirationCountry,
    aspirationCollege: state.StudentReducer.AspirationCollege,
    aspirationSpecialization: state.StudentReducer.AspirationSpecialization,
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
  getVariantStepsById,
  getAspirationLocation,
  getAspirationPackage,
  getAspirationWork,
  getaspirationData,
  postaspirationData,
  getAspirationBranch,
  getAspirationCollege,
  getAspirationCounty,
  getAspirationDegree,
  getAspirationSpecialization,
  getAspirationTerms,
})(AspirationDetails);
