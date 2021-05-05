import { Button, Divider, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TransferWithinAStationSharp } from "@material-ui/icons";
import {postPgaAcademicData, getPgaAcademicData} from "../../Actions/PgaAction"
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert"
import {isEmptyArray, isEmptyObject} from "../Validation"

class AcademicData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semester: 8,
      tenthSclName : '',
      tenthBoardName : '',
      tenthScoreScale : '',
      tenthScore : '',
      twelthSclName : '',
      twelthBoardName : '',
      twelthScoreScale : '',
      twelthScore : '',
      snackColor : null,
      snackMsg : null,
      snackOpen : false,
      sem1 : 1,
      sem2 : 2,
      sem3 : 3,
      sem4 : 4,
      sem5 : 5,
      sem6 : 6,
      sem7 : 7,
      sem8 : 8,
    };
  }

 
  choice = [
    { title: "10", value: 10 },
    { title: "7", value: 7 },
    { title: "4", value: 4 },
    { title: "%", value: 100 },
  ];

  handleSaved = () => {
    if(this.props.pgaAcademicDetails.length !== 0 && this.props.pgaAcademicDetails.studentUg.length === 0){
      let arr = []

      for(let i=1; i<=this.state.semester; i++){
        arr.push({
          semester :  parseInt(this.state.["sem"+i]),
          top3Subjects : this.state.["sem"+i+"top3"],
          activeBacklogs : parseInt(this.state.["sem".concat(i).concat("activeBacklog")]),
          backlogSubjects : this.state.["sem".concat(i).concat("backlogSub")],
          clearedBacklogs : parseInt(this.state.["sem".concat(i).concat("clearedBacklog")]) ,
          scoreScale : this.state.["scoreScaleSem".concat(i)],
          clearedBacklogSubjects : this.state.["sem".concat(i).concat("clearedSub")],
          score : parseInt(this.state.["sem".concat(i).concat("score")]) 
        })
      }
  
    let obj = {
  
      studentSsc:{
          schoolName:this.state.tenthSclName,
          examBoardName:this.state.tenthBoardName,
          scoreScale:this.state.tenthScoreScale.value,
          score: parseInt(this.state.tenthScore),
      },
      studentHsc:{
          schoolName:this.state.twelthSclName,
          examBoardName:this.state.twelthBoardName,
          scoreScale:this.state.twelthScoreScale.value,
          score: parseInt(this.state.twelthScore) 
      },
      studentUg: arr
    }
  
  this.props.postPgaAcademicData(this.props.id,obj)
  console.log(obj)
    }else{
      let arr = []

      for(let i=1; i<=this.state.semester; i++){
        arr.push({
          id : this.state.["sem".concat(i).concat("id")],
          semester :  parseInt(this.state.["sem"+i]),
          top3Subjects : this.state.["sem"+i+"top3"],
          activeBacklogs : parseInt(this.state.["sem".concat(i).concat("activeBacklog")]),
          backlogSubjects : this.state.["sem".concat(i).concat("backlogSub")],
          clearedBacklogs : parseInt(this.state.["sem".concat(i).concat("clearedBacklog")]) ,
          scoreScale : this.state.["scoreScaleSem".concat(i)],
          clearedBacklogSubjects : this.state.["sem".concat(i).concat("clearedSub")],
          score : parseInt(this.state.["sem".concat(i).concat("score")]) 
        })
      }
      let Anobj = {
  
        studentSsc:{
            schoolName:this.state.tenthSclName,
            examBoardName:this.state.tenthBoardName,
            scoreScale:this.state.tenthScoreScale.value,
            score: parseInt(this.state.tenthScore),
        },
        studentHsc:{
            schoolName:this.state.twelthSclName,
            examBoardName:this.state.twelthBoardName,
            scoreScale:this.state.twelthScoreScale.value,
            score: parseInt(this.state.twelthScore) 
        },
        studentUg: arr
      }
    
    this.props.postPgaAcademicData(this.props.id,Anobj)
    console.log(Anobj)
    }
   
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.academicDataPostResponse !== prevProps.academicDataPostResponse){
      this.setState({
        snackColor : "success",
        snackMsg : "Academic Data Updated Successfully",
        snackOpen : true
      })
    } 
    if(this.props.pgaAcademicDetails !== prevProps.pgaAcademicDetails){
      if(this.props.pgaAcademicDetails.studentHsc !== null && this.props.pgaAcademicDetails.studentSsc !== null && this.props.pgaAcademicDetails.studentUg.length !== 0)
      this.setState({
        tenthBoardName : this.props.pgaAcademicDetails.studentSsc.examBoardName,
        tenthSclName : this.props.pgaAcademicDetails.studentSsc.schoolName,
        tenthScore : this.props.pgaAcademicDetails.studentSsc.score,
        tenthScoreScale : {title : this.props.pgaAcademicDetails.studentSsc.scoreScale === "100" ? "%" : this.props.pgaAcademicDetails.studentSsc.scoreScale,value : parseInt(this.props.pgaAcademicDetails.studentSsc.scoreScale)} ,
        twelthBoardName : this.props.pgaAcademicDetails.studentHsc.examBoardName,
        twelthSclName : this.props.pgaAcademicDetails.studentHsc.schoolName,
        twelthScore : this.props.pgaAcademicDetails.studentHsc.score,
        twelthScoreScale : {title : this.props.pgaAcademicDetails.studentHsc.scoreScale === "100" ? "%" : this.props.pgaAcademicDetails.studentHsc.scoreScale, value : parseInt(this.props.pgaAcademicDetails.studentHsc.scoreScale) } ,
      })
      this.props.pgaAcademicDetails.studentUg.map((eachData,index)=>{
        this.setState({
          ["sem"+eachData.semester] : eachData.semester,
          ["scoreScaleSem"+eachData.semester] : parseInt(eachData.scoreScale),
          ["sem"+eachData.semester+"score"] : eachData.score,
          ["sem"+eachData.semester+"top3"] : eachData.top3Subjects,
          ["sem"+eachData.semester+"backlogSub"] : eachData.backlogSubjects,
          ["sem"+eachData.semester+"clearedBacklog"] : eachData.clearedBacklogs,
          ["sem"+eachData.semester+"clearedSub"] : eachData. clearedBacklogSubjects,
          ["sem"+eachData.semester+"activeBacklog"] : eachData.activeBacklogs,
          ["sem"+eachData.semester+"id"] : eachData.id
        })
      })
    }

  }
  

  handleChange = (e,value) =>{
   
      this.setState({
        [e.target.name] : e.target.value
      })

    
  }



  renderUgDegreeDetails = () => {
    let myArr = [];
    if(this.props.pgaAcademicDetails.length !== 0 && this.props.pgaAcademicDetails.studentUg.length === 0){
      for (let i = 1; i <= this.state.semester; i++) {
        myArr.push({
          sem: (
            <TextField
              variant={"outlined"}
              value={
                this.state.["sem".concat(i)]
              }
              disabled
              InputLabelProps={{
                shrink : true,
              style: { maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden',
             }}}
              name={"sem".concat(i)}
              onChange={this.handleChange}
              label={"Semester"}
              size={"small"}
            />
          ),
          scoreScale: (
            <FormControl size="small" fullWidth variant="outlined">
          <InputLabel shrink={true} id="demo-simple-select-outlined-label">Score Scale</InputLabel>
          <Select
          fullWidth
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            onChange={this.handleChange}
            value={this.state.["scoreScaleSem".concat(i)] !== undefined ? this.state.["scoreScaleSem".concat(i)] : null}
            label="Score Scale"
            name={"scoreScaleSem".concat(i)}
  
          >
            
            {this.choice.map(eachChoice=>{
              return(
                <MenuItem
                 value={eachChoice.value}
                 >{eachChoice.title}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
          ),
          score: (
            <TextField type="number" error={this.state.["scoreScaleSem".concat(i)] < this.state.["sem".concat(i).concat("score")]} InputLabelProps={{shrink: true}} variant={"outlined"} name={"sem".concat(i).concat("score")} value={this.state.["sem".concat(i).concat("score")]} onChange={this.handleChange} label={"Score"} size={"small"} />
          ),
          topThreeSub: (
            <TextField
              variant={"outlined"}
              InputLabelProps={{shrink: true}}
              value={this.state.["sem".concat(i).concat("top3")]}
              name={"sem".concat(i).concat("top3")}
              onChange={this.handleChange}
              label={"Top 3 Subjects"}
              size={"small"}
            />
          ),
          activeBackLog: (
            <TextField
              variant={"outlined"}
              InputLabelProps={{shrink: true}}
              value={this.state.["sem".concat(i).concat("activeBacklog")]}
              name={"sem".concat(i).concat("activeBacklog")}
              onChange={this.handleChange}
              label={"#Active Backlog"}
              size={"small"}
            />
          ),
          backLogSub: (
            <TextField
              variant={"outlined"}
              InputLabelProps={{shrink: true}}
              value={this.state.["sem".concat(i).concat("backlogSub")]}
              name={"sem".concat(i).concat("backlogSub")}
              onChange={this.handleChange}
              label={"Backlog Subject"}
              size={"small"}
            />
          ),
          clearBacklog: (
            <TextField
              variant={"outlined"}
              InputLabelProps={{shrink: true}}
              value={this.state.["sem".concat(i).concat("clearedBacklog")]}
              name={"sem".concat(i).concat("clearedBacklog")}
              onChange={this.handleChange}
              label={"#Cleared Backlog"}
              size={"small"}
            />
          ),
          clearBacklogSub: (
            <TextField
              variant={"outlined"}
              InputLabelProps={{shrink: true}}
              value={this.state.["sem".concat(i).concat("clearedSub")]}
              name={"sem".concat(i).concat("clearedSub")}
              onChange={this.handleChange}
              label={"#Cleared Backlog Subject"}
              size={"small"}
            />
          ),
        });
      }
      return myArr.map((eachData) => {
        return (
          <>
            <Grid item md={1}>
              {eachData.sem}
            </Grid>
            <Grid item md={1}>
              {eachData.scoreScale}
            </Grid>
            <Grid item md={1}>
              {eachData.score}
            </Grid>
            <Grid item md={2}>
              {eachData.topThreeSub}
            </Grid>
            <Grid item md={1}>
              {eachData.activeBackLog}
            </Grid>
            <Grid item md={2}>
              {eachData.backLogSub}
            </Grid>
            <Grid item md={1}>
              {eachData.clearBacklog}
            </Grid>
            <Grid item md={2}>
              {eachData.clearBacklogSub}
            </Grid>
            <Grid item md={1}></Grid>
          </>
        );
      });
    }else{
      console.log(this.props.pgaAcademicDetails)
      if(this.props.pgaAcademicDetails.length !==0){
        for (let i = 0; i <= this.props.pgaAcademicDetails.studentUg.length; i++) {
          console.log("for loop".concat(i))
          if(this.props.pgaAcademicDetails.studentUg[i] !== undefined){
            console.log(this.props.pgaAcademicDetails.studentUg[i])
            console.log(this.props.pgaAcademicDetails.studentUg[i].id)
          }
        
          myArr.push({
            sem: (
              <TextField
                variant={"outlined"}
                value={
                  this.state.["sem".concat(i)]
                }
                disabled
                InputLabelProps={{
                  shrink : true,
                style: { maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden',
               }}}
                name={"sem".concat(i)}
                onChange={this.handleChange}
                label={"Semester"}
                size={"small"}
              />
            ),
            scoreScale: (
              <FormControl size="small" fullWidth variant="outlined">
            <InputLabel shrink={true} id="demo-simple-select-outlined-label">Score Scale</InputLabel>
            <Select
            fullWidth
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={this.handleChange}
              value={this.state.["scoreScaleSem".concat(i)] !== undefined ? this.state.["scoreScaleSem".concat(i)] : null}
              label="Score Scale"
              name={"scoreScaleSem".concat(i)}
    
            >
              
              {this.choice.map(eachChoice=>{
                return(
                  <MenuItem
                   value={eachChoice.value}
                   >{eachChoice.title}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
            ),
            score: (
              <TextField type="number" error={this.state.["scoreScaleSem".concat(i)] < this.state.["sem".concat(i).concat("score")]} InputLabelProps={{shrink: true}} variant={"outlined"} name={"sem".concat(i).concat("score")} value={this.state.["sem".concat(i).concat("score")]} onChange={this.handleChange} label={"Score"} size={"small"} />
            ),
            topThreeSub: (
              <TextField
                variant={"outlined"}
                InputLabelProps={{shrink: true}}
                value={this.state.["sem".concat(i).concat("top3")]}
                name={"sem".concat(i).concat("top3")}
                onChange={this.handleChange}
                label={"Top 3 Subjects"}
                size={"small"}
              />
            ),
            activeBackLog: (
              <TextField
                variant={"outlined"}
                InputLabelProps={{shrink: true}}
                value={this.state.["sem".concat(i).concat("activeBacklog")]}
                name={"sem".concat(i).concat("activeBacklog")}
                onChange={this.handleChange}
                label={"#Active Backlog"}
                size={"small"}
              />
            ),
            backLogSub: (
              <TextField
                variant={"outlined"}
                InputLabelProps={{shrink: true}}
                value={this.state.["sem".concat(i).concat("backlogSub")]}
                name={"sem".concat(i).concat("backlogSub")}
                onChange={this.handleChange}
                label={"Backlog Subject"}
                size={"small"}
              />
            ),
            clearBacklog: (
              <TextField
                variant={"outlined"}
                InputLabelProps={{shrink: true}}
                value={this.state.["sem".concat(i).concat("clearedBacklog")]}
                name={"sem".concat(i).concat("clearedBacklog")}
                onChange={this.handleChange}
                label={"#Cleared Backlog"}
                size={"small"}
              />
            ),
            clearBacklogSub: (
              <TextField
                variant={"outlined"}
                InputLabelProps={{shrink: true}}
                value={this.state.["sem".concat(i).concat("clearedSub")]}
                name={"sem".concat(i).concat("clearedSub")}
                onChange={this.handleChange}
                label={"#Cleared Backlog Subject"}
                size={"small"}
              />
            ),
          });
        }
      
        return myArr.slice(1,myArr.length).map((eachData) => {
          return (
            <>
              <Grid item md={1}>
                {eachData.sem}
              </Grid>
              <Grid item md={1}>
                {eachData.scoreScale}
              </Grid>
              <Grid item md={1}>
                {eachData.score}
              </Grid>
              <Grid item md={2}>
                {eachData.topThreeSub}
              </Grid>
              <Grid item md={1}>
                {eachData.activeBackLog}
              </Grid>
              <Grid item md={2}>
                {eachData.backLogSub}
              </Grid>
              <Grid item md={1}>
                {eachData.clearBacklog}
              </Grid>
              <Grid item md={2}>
                {eachData.clearBacklogSub}
              </Grid>
              <Grid item md={1}></Grid>
            </>
          );
        });
      }
     
    }
   
  };

  componentDidMount() {
    this.props.getPgaAcademicData(this.props.id)
  }
  

  semesterResponse = [
    {sem : "1", scoreScale : {title : "7", value : 7}, score : "70", top3 : "sub1,sub2,sub3", activeBack : "2", backLogSub : "sub8", clearBack : "1", clearSub : "sub4" },
    {sem : "2", scoreScale : {title : "4", value : 4}, score : "80", top3 : "sub1,sub2,sub3", activeBack : "1", backLogSub : "sub6", clearBack : "2", clearSub : "sub5"},
    {sem : "3", scoreScale : {title : "%", value : 100}, score : "90", top3 : "sub1,sub2,sub3", activeBack : "3", backLogSub : "sub7", clearBack : "1", clearSub : "sub6"},
  ]

  render() {
    console.log(this.state)
    console.log(this.props.pgaAcademicDetails)
    return (
      <div>
        <h5 style={{ padding: "1%" }}>10th Details</h5>
        <Grid container spacing={1} style={{ padding: "1%" }}>
          <Grid item md={3}>
            <TextField
              variant="outlined"
              value={this.state.tenthSclName}
              name = {"tenthSclName"}
              onChange={this.handleChange}
              size="small"
              label="Name of the School(10th)"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              variant="outlined"
              value={this.state.tenthBoardName}
              name = {"tenthBoardName"}
              onChange={this.handleChange}
              size="small"
              label="Exam Board Name(10th)"
            />
          </Grid>
          <Grid item md={3}>
            <Autocomplete
              id="combo-box-demo"
              options={this.choice}
              getOptionLabel={(option) => option.title}
              // value={}
              fullWidth
              value={this.state.tenthScoreScale}
              onChange={(e,newValue)=>this.setState({tenthScoreScale : newValue})}
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  //   helperText={}
                  label="Score Scale"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item md={3}>
            <TextField type="number" variant="outlined" error={this.state.tenthScoreScale < this.state.tenthScore} value={this.state.tenthScore} name={"tenthScore"} onChange={this.handleChange} size="small" label="Score" />
          </Grid>
          <Grid item md={3}>
            <TextField
              variant="outlined"
              value={this.state.twelthSclName}
              name = {"twelthSclName"}
              onChange={this.handleChange}
              size="small"
              label="Name of the School(12th)"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              variant="outlined"
              value={this.state.twelthBoardName}
              name = {"twelthBoardName"}
              onChange={this.handleChange}
              size="small"
              label="Exam Board Name(12th)"
            />
          </Grid>
          <Grid item md={3}>
            <Autocomplete
              id="combo-box-demo"
              options={this.choice}
              value={this.state.twelthScoreScale}
              onChange={(e,newValue)=>this.setState({twelthScoreScale : newValue})}
              getOptionLabel={(option) => option.title}
              // value={}
              fullWidth
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  //   helperText={}
                  label="Score Scale"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item md={3}>
            <TextField variant="outlined" type="number" error={this.state.twelthScoreScale < this.state.twelthScore} value={this.state.twelthScore} name={"twelthScore"} onChange={this.handleChange} size="small" label="Score" />
          </Grid>
        </Grid>
        <hr />
        <h5 style={{ padding: "1%" }}>UnderGraduate Degree Details</h5>
        <Grid container spacing={2} style={{padding : "1%"}}>
          {this.renderUgDegreeDetails()}
          {/* {this.semesterResponse.map((eachResponse,index)=>{
            return (
              <>
                <Grid item md={1}>
                <TextField 
                variant={"outlined"}
                value={eachResponse.semNo}
                size={"small"}
                label={"Semester ".concat(index+1)}
                />
                </Grid>
                <Grid item md={1}>
                <FormControl size="small" fullWidth variant="outlined">
        <InputLabel shrink={true} id="demo-simple-select-outlined-label">Score Scale</InputLabel>
        <Select
        fullWidth
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Score Scale"
          name={"scoreScaleSem".concat(index+1)}

        >
          {this.choice.map(eachChoice=>{
            return(
              <MenuItem value={eachResponse.scoreScale}>{eachChoice.title}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
                </Grid>
                <Grid item md={1}>
                <TextField value={eachResponse.score} InputLabelProps={{shrink: true}} variant={"outlined"} name={"sem".concat(index+1).concat("score")}  label={"Score"} size={"small"} />

                </Grid>
                <Grid item md={2}>
                <TextField
            variant={"outlined"}
            InputLabelProps={{shrink: true}}
            name={"sem".concat(index+1).concat("top3")}
            label={"Top 3 Subjects"}
            value={eachResponse.top3}
            size={"small"}
          />
                </Grid>
                <Grid item md={1}>
                <TextField
            variant={"outlined"}
            InputLabelProps={{shrink: true}}
            value={eachResponse.activeBack}
            name={"sem".concat(index+1).concat("activeBacklog")}
            label={"#Active Backlog"}
            size={"small"}
          />
                </Grid>
                <Grid item md={2}>
                <TextField
            variant={"outlined"}
            InputLabelProps={{shrink: true}}
            name={"sem".concat(index+1).concat("backlogSub")}
            label={"Backlog Subject"}
            value={eachResponse.backLogSub}
            size={"small"}
          />
                </Grid>
                <Grid item md={1}>
                <TextField
            variant={"outlined"}
            InputLabelProps={{shrink: true}}
            value={eachResponse.clearBack}
            name={"sem".concat(index+1).concat("clearedBacklog")}
            label={"#Cleared Backlog"}
            size={"small"}
          />
                </Grid>
                <Grid item md={2}>
                <TextField
            variant={"outlined"}
            InputLabelProps={{shrink: true}}
            name={"sem".concat(index+1).concat("clearedSub")}
            label={"#Cleared Backlog Subject"}
            value={eachResponse.clearSub}
            size={"small"}
          />
                </Grid>
                <Grid item md={1}>

                </Grid>
              </>
            );
          })} */}
        </Grid>
        <Grid style={{ padding: "1%" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSaved}
          >
            Save
          </Button>
        </Grid>
        <Snackbar
          open={this.state.snackOpen}
          variant="filled"
          autoHideDuration={3000}
          onClose={() => this.setState({ snackOpen: false })}
        >
          <Alert
            onClose={() => this.setState({ snackOpen: false })}
            severity={this.state.snackColor}
          >
            {this.state.snackMsg}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const mapStateToProps = (state) =>{
  return {
    academicDataPostResponse : state.PgaReducer.academicDataPostResponse,
    pgaAcademicDetails : state.PgaReducer.pgaAcademicDetails
  }
}

export default connect(mapStateToProps,{postPgaAcademicData, getPgaAcademicData})(AcademicData)
