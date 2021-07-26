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
  getAspirationQuestion,
} from "../../Actions/Aspiration";
import {
  viewStudentStatus,
  updateVerificationStatus,
} from "../../Actions/AdminAction";
import Status from "../Utils/Status";
import { SECTION } from "../../Constant/Variables";
import Model from "../Utils/SectionModel";
import { check } from "prettier";

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
      answerModel:[],
      noOfSchool: "",
      intake: "",
      aspirationCountries: [],
      aspirationDegrees: [],
      aspirationBranches: [],
      aspirationAreaOfSpecializations: [],
      aspirationUniversities: [],
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
    this.props.getAllSpecialization();
    this.props.getAllTerms();
    this.props.getAllUniversity();
    this.props.getallcountry();
    this.props.getAspirationQuestion(this.props.match.params.studentId);
    this.props.viewStudentStatus(this.props.match.params.studentId);
    this.props.getAspiration((response) => {
      console.log(response)
      this.setState({
        ...response,        
      });
    }, this.props.match.params.studentId);
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
      intake: intake ? intake.name : "",
      aspirationCountries: aspirationCountries,
      aspirationDegrees: aspirationDegrees,
      aspirationBranches: aspirationBranches,
      aspirationAreaOfSpecializations: aspirationAreaOfSpecializations,
      aspirationUniversities: aspirationUniversities,
      testQuestionModels: this.state.answerModel,
    };    
    this.props.updateAspiration(
      obj,
      (response) => console.log(response),
      this.props.match.params.studentId,
      this.props.getAspirationQuestionList.id, 
    );    
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

  getAnswer=(qid)=>{
    let obj=this.state.testQuestionModels.find(item=>item.answer.questionId===qid)  
    let choice=null;      
    if(obj){     
      if(obj.question.type==="SINGLE_SELECT") 
      choice= obj.answer.selectedChoices[0].id;
      else if(obj.question.type==="MULTI_CHOICE"){        
        console.log('multi choices')
        choice= obj.answer.selectedChoices.map(item=>item.id);
      }      
    }
    console.log(choice)
    return choice;
  }

  renderAspirationQuestions = () => {
    const {
      questionsSet: { questions },
      answer,
    } = this.props.getAspirationQuestionList;
    const { choiceStyle } = style;
    return (
      <Grid container spacing={2}>
        {questions.map(({ id, question, choices, type }, index) => {
          var qid=id;                                        
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
                      onChange={(e)=>{
                        let arr=[];
                        let choiceId={
                          id:e.target.value,
                        }
                        let obj={
                          question:{
                            id:qid,                            
                          },
                          answer:{
                            selectedChoices:[choiceId]
                          }                         
                        }
                        if(this.state.answerModel.some(item=>item.question.id===obj.question.id)){                                                    
                          arr = this.state.answerModel.filter(item=>item.question.id!==obj.question.id).concat(obj);
                        }else{
                          arr=this.state.answerModel.concat(obj);
                        }
                        this.setState({answerModel:arr});
                      }} 
                      value={this.getAnswer(qid)}
                    >
                      {choices.map(({ text ,id }) => {
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
                  <FormGroup row >
                    {choices.map(({ text,id }) => {                      
                      return (
                        <FormControlLabel
                          style={choiceStyle}
                          labelStyle={{ color: "white" }}
                          iconStyle={{ fill: "white" }}
                          control={<Checkbox name="checkedA" />}

                          label={text}
                          value={id}
                          onChange={({target:{value,checked}})=>{  
                            let obj={
                              question:{
                                id:qid,                            
                              },
                              answer:{
                                selectedChoices:[{id:value}]
                              }                         
                            }
                            var question=this.state.answerModel.find(item=>item.question.id===obj.question.id)
                            if(question){
                              if(checked){                                
                                question.answer.selectedChoices.push({id:value})
                                let removeExist=this.state.answerModel.filter(item=>item.question.id!==obj.question.id)
                                this.setState({answerModel:removeExist.concat(question)})                                                              
                              }else{                                                                
                                let removeExist=this.state.answerModel.filter(item=>item.question.id!==obj.question.id)
                                question.answer.selectedChoices=question.answer.selectedChoices.filter(item=>item.id!==value)
                                this.setState({answerModel:removeExist.concat(question)})
                              }
                            }else{
                              this.setState({answerModel:this.state.answerModel.concat(obj)})
                            }
                          }}  
                          checked={this.getAnswer(qid) ? this.getAnswer(qid).indexOf(id)>-1 : null}
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

  render() {
    const { choiceStyle } = style;   
    console.log(this.state.testQuestionModels) 
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
              <Status
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
              />
            </div>
            <IconButton onClick={this.handleClick.bind(this)}>
              <img src={Pencil} height={17} width={17} />
            </IconButton>
          </div>
          {this.props.getAspirationQuestionList.length !== 0 &&
            this.renderAspirationQuestions()}
          <Grid container spacing={2}>
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
