import { Button, Grid, TextField } from "@material-ui/core";
import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {postcvandppga} from '../../Actions/PgaAction';
import {getcvandppga,getppgaques,getcvques} from '../../Actions/PgaAction';
import { connect } from "react-redux";


class CvAndPpga extends Component {
  constructor() {
    super();
    this.state = {
      cvCount: 4,
      ppgaCount: 4,
    };
  }
  componentDidMount(){
    this.props.getcvandppga(this.props.id)
    this.props.getppgaques()
    this.props.getcvques()
    }
componentDidUpdate(prevProps,prevState){
  if(this.props.getppgaResponse !== prevProps.getppgaResponse){
    this.props.getppgaResponse.map((ppgadata,index)=>{
      this.setState({
        ["ppgaQuestion".concat(index+1)] : ppgadata.id
      })
  })
  }
  if(this.props.getcvResponse !== prevProps.getcvResponse){
    this.props.getcvResponse.map((cvdata,index)=>{
      this.setState({
        ["cvQuestion".concat(index+1)] : cvdata.id
      })
  })
  }
  
  if(this.props.getcvandppgaResponse !== prevProps.getcvandppgaResponse){
    if(this.props.getcvandppgaResponse.cvDetails !== null){
    
        this.props.getcvandppgaResponse.cvDetails.map((cv,index)=>{
        this.setState({
          ["count".concat(index+1)] : cv.count,
          ["datafactor".concat(index+1)] : cv.dataOfFactor,
          ["mentorcomment".concat(index+1)] : cv.mentorComments
       })
    })
    this.props.getcvandppgaResponse.ppga.map((ppga,index)=>{
      this.setState({
        ["notesbefore".concat(index+1)] : ppga.notes_before,
        ["notesafter".concat(index+1)] : ppga.notes_after

      })
    })
  }
  } 


}
  cvfactor = [
    { title: "Work Experience " },
    { title: "Workshops" },
    { title: "Certification Courses" },
    { title: "Research Projects  " },
    { title: "Course Projects " },
    { title: "Patents" },
    { title: "Internships (Research)  " },
    { title: "Internships (Industrial)  " },
    { title: "Papers" },
    { title: "In-Plant Training" },
    { title: "Extra-curricular activities" },
    { title: "International Exposure" },
    { title: "Technical Skills" },
    { title: "Other" },
  ];
  ppgaques = [
    { title: "UG | School-Board-Grades" },
    { title: "Interested Subjects" },
    { title: "Confirm package (Placements/Masters)" },
    { title: "Higher Education Readiness (program, areas of study/specialization, location)"},
    { title: "Back-up options for Master’s" },
    { title: "Suggest a Specialization Track" },
    { title: "Ask the reason for the Job. Why now? What is the end goal?" },
    { title: "Ask about career interest. Clear? Suggest suitable courses. Unclear? Walk through steps options available",},
    { title: "If Backlogs.Ask for a reason. Cleared? If pending, when are they clearing?",},
    { title: "If gap in academics/career. Ask for reason. Will it affect chances? ",},
    { title: "Relevant research experience. " },
    { title: "Relevant work experience. " },
    { title: "Relevant Extracurricular activities" },
  ];
handleChange=(e)=>{
  this.setState({[e.target.name] : e.target.value})
 
}
  renderCvForm = () => {
    let cvArr = [];
    for (let i = 1; i <= this.state.cvCount; i++) {
      cvArr.push({
        cvFactor: (
        <TextField
          variant = {"outlined"}
          fullWidth
          size="small"
          label={"Factor From CV"}
          name={"cvfactor".concat(i)}
          value={this.state.["cvfactor".concat(i)]}
          onChange={(e) => this.handleChange(e)}
          />
         
        ),
        count: (
          <TextField
            variant="outlined"
            label="count"
            InputLabelProps={{ shrink: true }}
            type="number"
            size="small"
            name={"count".concat(i)}
            value={this.state.["count".concat(i)]}
            onChange={(e) => this.handleChange(e)}
          />
        ),
        dataFactor: (
          <TextField 
          variant="outlined"
          label="Data of Factor"
          InputLabelProps={{ shrink: true }}
          size="small"
          name={"datafactor".concat(i)}
          value={this.state.["datafactor".concat(i)]}
          onChange={(e) => this.handleChange(e)}
          />
        ),
        mentorComments: (
          <TextField
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          label="Mentor Comments"
          size="small" name={"mentorcomment".concat(i)}
          value={this.state.["mentorcomment".concat(i)]}
          onChange={(e) => this.handleChange(e)}
          />
        ),
      });
    }
    return cvArr.map((eachData) => {
      return (
        <>
          <Grid item md={3}>
            {eachData.cvFactor}
          </Grid>
          <Grid item md={1}>
            {eachData.count}
          </Grid>
          <Grid item md={4}>
            {eachData.dataFactor}
          </Grid>
          <Grid item md={4}>
            {eachData.mentorComments}
          </Grid>
        </>
      );
    });
  };

  renderPpgaForm = () => {
    let ppgaArr = [];
    for (let i = 1; i <= this.state.ppgaCount; i++) {
      ppgaArr.push({
        questions: (
          <TextField
          variant = {"outlined"}
          fullWidth
          size="small"
          label="Question From Database"
          name={"ppgaquestion".concat(i)}
          value={this.state.["ppgaquestion".concat(i)]}
          onChange={(e) => this.handleChange(e)}

        />
        ),
        notesBefore: (
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            label="Notes Before PPGA "
            name={"notesbefore".concat(i)}
            value={this.state.["notesbefore".concat(i)]}
            onChange={(e) => this.handleChange(e)}
          />
        ),
        notesAfter: (
          <TextField
            variant="outlined"
            size="small"
            label="Notes After PPGA "
            name={"notesafter".concat(i)}
            value={this.state.["notesafter".concat(i)]}
            onChange={(e) => this.handleChange(e)}
          />
        ),
      });
    }
    return ppgaArr.map((eachItem) => {
      return (
        <>
          <Grid item md={4}>
            {eachItem.questions}
          </Grid>
          <Grid item md={4}>
            {eachItem.notesBefore}
          </Grid>
          <Grid item md={4}>
            {eachItem.notesAfter}
          </Grid>
        </>
      );
    });
  };

  handleSaved=(index)=>{
    console.log("button clicked")
 
console.log(this.props.getcvandppgaResponse)
if(
  this.props.getcvandppgaResponse.cvDetails === null && 
  this.props.getcvandppgaResponse.ppga === null)
  {
    let ppgaArr = []
      
      for(let i = 0; i<=13; i++){
        // console.log(this.state.["notesbefore".concat(i)])
        ppgaArr.push({
          "notes_before": this.state.["notesbefore".concat(i+1)],
          "notes_after": this.state.["notesafter".concat(i+1)],
          "ppgaQuestion": {
            "id": this.state.["ppgaQuestion".concat(i+1)]
        },
        // "student": {
        //     "id": this.props.id
        // }
        })
      }

  
    let cvArr =[]

    for(let i=0; i<=13; i++){
       cvArr.push({
        "mentorComments": this.state.["mentorcomment".concat(i+1)],
        "dataOfFactor": this.state.["datafactor".concat(i+1)],
        "count": this.state.["count".concat(i+1)],
        "cvFactors": {
            "id": this.state.["cvQuestion".concat(i+1)]
        },
        // "student": {
        //     "id": this.props.id
        // }
       })
    }
    let obj1={
      "ppga":ppgaArr,
      "cvDetails":cvArr
  }
    this.props.postcvandppga(this.props.id,obj1)
   }
else{
  let ppgaupdateArr=[]
  let ppgaid = this.props.getcvandppgaResponse.ppga.map(ppga=>ppga.id)
  for(let i = 0; i<=13; i++){
    ppgaupdateArr.push({
      "id":ppgaid[i],
      "notes_before": this.state.["notesbefore".concat(i+1)],
      "notes_after": this.state.["notesafter".concat(i+1)],
      "ppgaQuestion": {
        "id": this.state.["ppgaQuestion".concat(i+1)]
    },
    // "student": {
    //     "id": this.props.id
    // }
    })
  }
  let cvupdateArr=[]
  let cvid = this.props.getcvandppgaResponse.cvDetails.map(cv=>cv.id)

  for(let i=0; i<=13 ; i++){
    cvupdateArr.push({
      "id":cvid[i],
     "mentorComments": this.state.["mentorcomment".concat(i+1)],
     "dataOfFactor": this.state.["datafactor".concat(i+1)],
     "count": this.state.["count".concat(i+1)],
     "cvFactors": {
         "id": this.state.["cvQuestion".concat(i+1)]
     },
    //  "student": {
    //      "id": this.props.id
    //  }
    })
 }
console.log(ppgaupdateArr)
console.log(cvupdateArr)

let obj2={
"ppga":ppgaupdateArr,
"cvDetails":cvupdateArr
}
  this.props.postcvandppga(this.props.id,obj2)
  }


  }
  render() {
    console.log(this.state)
    console.log(this.props)  //studentid
    console.log(this.props.getcvResponse)  //cv details
    console.log(this.props.getppgaResponse)   //ppga details
    console.log(this.props.getcvandppgaResponse.cvDetails)
    console.log(this.props.getcvandppgaResponse.ppga)
    console.log(this.props.getcvandppgaResponse)
    return (
      <div>
        <h6 style={{ padding: "1%" }}>CV Details</h6>
          {/* {this.renderCvForm()} */}
          { 
          this.props.getcvandppgaResponse.length !==0 &&
          this.props.getcvandppgaResponse.cvDetails === null  ?
          // this.props.getcvResponse.length !== 0 ?
          this.props.getcvResponse.map((cv, index)=>
            <Grid container spacing={2} style={{ padding: "2%" }}>
            <Grid item md={3}>
              <TextField
              variant = {"outlined"}
              fullWidth
              size="small"
              label={"Factor From CV"}
              disabled
              name={"cvfactor".concat(index+1)}
              value={cv.name}
              onChange={(e) => this.handleChange(e)}
               />
          </Grid>
           <Grid item md={1}>
           <TextField
            variant="outlined"
            label="count"
            InputLabelProps={{ shrink: true }}
            type="number"
            size="small"
            name={"count".concat(index+1)}
            value={this.state.["count".concat(index+1)]}
            onChange={(e) => this.handleChange(e)}
            />
          </Grid>
          <Grid item md={4}>
             <TextField
               variant="outlined"
               label="Data of Factor"
               InputLabelProps={{ shrink: true }}
               size="small"
               name={"datafactor".concat(index+1)}
               value={this.state.["datafactor".concat(index+1)]}
               onChange={(e) => this.handleChange(e)}
             />
          </Grid>
          <Grid item md={4}>
             <TextField
               variant="outlined"
               label="Mentor Comment"
               InputLabelProps={{ shrink: true }}
               size="small"
               name={"mentorcomment".concat(index+1)}
               value={this.state.["mentorcomment".concat(index+1)]}
               onChange={(e) => this.handleChange(e)}
             />
          </Grid>
          </Grid>
          )
          :
          this.props.getcvandppgaResponse.length !== 0 ? this.props.getcvandppgaResponse.cvDetails.map((cvdetail, index)=>
          <Grid container spacing={2} style={{ padding: "2%" }}>
          <Grid item md={3}>
            <TextField
            variant = {"outlined"}
            fullWidth
            size="small"
            label={"Factor From CV"}
            disabled
            name={"cvfactor".concat(index+1)}
            value={cvdetail.cvFactors.name}
            onChange={(e) => this.handleChange(e)}
             />
        </Grid>
         <Grid item md={1}>
         <TextField
          variant="outlined"
          label="count"
          InputLabelProps={{ shrink: true }}
          type="number"
          size="small"
          name={"count".concat(index+1)}
          value={this.state.["count".concat(index+1)]}
          onChange={(e) => this.handleChange(e)}
          />
        </Grid>
        <Grid item md={4}>
           <TextField
             variant="outlined"
             label="Data of Factor"
             InputLabelProps={{ shrink: true }}
             size="small"
             name={"datafactor".concat(index+1)}
             value={this.state.["datafactor".concat(index+1)]}
             onChange={(e) => this.handleChange(e)}
           />
        </Grid>
        <Grid item md={4}>
           <TextField
             variant="outlined"
             label="Mentor Comment"
             InputLabelProps={{ shrink: true }}
             size="small"
             name={"mentorcomment".concat(index+1)}
             value={this.state.["mentorcomment".concat(index+1)]}
             onChange={(e) => this.handleChange(e)}
           />
        </Grid>
        </Grid>
        )
          : null }
        <hr />
        <h6 style={{ padding: "1%" }}>PPGA Question</h6>
        {/* {this.renderPpgaForm()} */}
        {
          this.props.getcvandppgaResponse.length !==0 &&
          this.props.getcvandppgaResponse.ppga === null  ?
        this.props.getppgaResponse.map((ppga,index)=>
            <Grid container spacing={2} style={{ padding: "2%" }}>
            <Grid item md={4}>
            <TextField
              variant = {"outlined"}
              size="small"
              label="Question From Database"
              name={"ppgaquestion"}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled
              value={ppga.name}
              onChange={(e) => this.handleChange(e)}
        />
            </Grid>
            <Grid item md={4}>
            <TextField
            variant="outlined"
            size="small"
            label="Notes Before PPGA "
            InputLabelProps={{ shrink: true }}
            name={"notesbefore".concat(index+1)}
            fullWidth
            value={this.state.["notesbefore".concat(index+1)]}
            onChange={(e) => this.handleChange(e)}
          />
            </Grid>
            <Grid item md={4}>
                <TextField
            variant="outlined"
            fullWidth
            size="small"
            label="Notes After PPGA "
            InputLabelProps={{ shrink: true }}
            name={"notesafter".concat(index+1)}
            value={this.state.["notesafter".concat(index+1)]}
            onChange={(e) => this.handleChange(e)}
                />
            </Grid>
            </Grid>
          ):
          this.props.getcvandppgaResponse.length !== 0 ?
          this.props.getcvandppgaResponse.ppga.map((ppgadetails,index)=>
          <Grid container spacing={2} style={{ padding: "2%" }}>
          <Grid item md={4}>
          <TextField
            variant = {"outlined"}
            size="small"
            label="Question From Database"
            name={"ppgaquestion"}
            InputLabelProps={{ shrink: true }}
            fullWidth
            disabled
            value={ppgadetails.ppgaQuestion.name}
            onChange={(e) => this.handleChange(e)}
      />
          </Grid>
          <Grid item md={4}>
          <TextField
          variant="outlined"
          size="small"
          label="Notes Before PPGA "
          InputLabelProps={{ shrink: true }}
          name={"notesbefore".concat(index+1)}
          fullWidth
          value={this.state.["notesbefore".concat(index+1)]}
          onChange={(e) => this.handleChange(e)}
        />
          </Grid>
          <Grid item md={4}>
              <TextField
          variant="outlined"
          fullWidth
          size="small"
          label="Notes After PPGA "
          InputLabelProps={{ shrink: true }}
          name={"notesafter".concat(index+1)}
          value={this.state.["notesafter".concat(index+1)]}
          onChange={(e) => this.handleChange(e)}
              />
          </Grid>
          </Grid>
          )
         : 
       null
          }
        <Button 
         variant="outlined"
         size="small"
         color="primary" 
         onClick={this.handleSaved}>Save</Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cvandppgaResponse:state.PgaReducer.cvandppgaResponse,
    getcvandppgaResponse:state.PgaReducer.getcvandppgaResponse,
    getppgaResponse:state.PgaReducer.getppgaResponse,
    getcvResponse:state.PgaReducer.getcvResponse
  }
}

export default connect(mapStateToProps,{
   postcvandppga,
   getcvandppga,
   getppgaques,
   getcvques
})(CvAndPpga)
