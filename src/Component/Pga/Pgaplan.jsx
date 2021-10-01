import { Divider, Grid, Icon, IconButton, TextField, Button, FormControlLabel, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { Component } from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { TransferWithinAStationOutlined, TurnedInSharp } from '@material-ui/icons';
import IndeterminateCheckBoxRoundedIcon from "@material-ui/icons/IndeterminateCheckBoxRounded";
import { connect } from 'react-redux';
import {response, testResponse} from "./PgaResponse"
import {getQuarterPlanByType, getAllStarterPack,getAllSpecialization,getAllQuarterPlan,getStudentGrade,postPgaPlanCareerTrack,postPGaQuarter} from "../../Actions/PgaAction" 
import MySnackBar from "../MySnackBar"
class Pgaplan extends Component {
  constructor(props){
    super(props);
    this.state = {
      ambOption1: "",
      ambOption2: "",
      ambOption3: "",
      casOption1: "",
      casOption2: "",
      casOption3: "",
      balOption1: "",
      balOption2: "",
      balOption3: "",
      expoOption1: "",
      expoOption2: "",
      expoOption3: "",
      ambarr: [],
      ambitiousCount: 1,
      casualCount: 1,
      balancedCount: 1,
      exploCount: 1,
      index: "",
      response : testResponse,
      commonFocusFist : null,
      commonFocusSecond : null,
      ambpack1: [
        { title: "Option 1" },
        { title: "Option 2" },
        { title: "Option 3" },
        { title: "Option 4" },
        { title: "Option 5" },
      ],
      ambpack2: [
        { title: "Option 1" },
        { title: "Option 2" },
        { title: "Option 3" },
        { title: "Option 4" },
        { title: "Option 5" },
      ],
      ambpack3: [
        { title: "Option 1" },
        { title: "Option 2" },
        { title: "Option 3" },
        { title: "Option 4" },
        { title: "Option 5" },
      ],
      caspack1: [
        { title: "Option 1" },
        { title: "Option 2" },
        { title: "Option 3" },
        { title: "Option 4" },
        { title: "Option 5" },
      ],
      caspack2: [
        { title: "Option 1" },
        { title: "Option 2" },
        { title: "Option 3" },
        { title: "Option 4" },
        { title: "Option 5" },
      ],
      caspack3: [
        { title: "Option 1" },
        { title: "Option 2" },
        { title: "Option 3" },
        { title: "Option 4" },
        { title: "Option 5" },
      ],
      balpack1: [
        { title: "Option 1" },
        { title: "Option 2" },
        { title: "Option 3" },
        { title: "Option 4" },
        { title: "Option 5" },
      ],
      balpack2: [
        { title: "Option 1" },
        { title: "Option 2" },
        { title: "Option 3" },
        { title: "Option 4" },
        { title: "Option 5" },
      ],
      balpack3: [
        { title: "Option 1" },
        { title: "Option 2" },
        { title: "Option 3" },
        { title: "Option 4" },
        { title: "Option 5" },
      ],
      expopack1: [
        { title: "Option 1" },
        { title: "Option 2" },
        { title: "Option 3" },
        { title: "Option 4" },
        { title: "Option 5" },
      ],
      expopack2: [
        { title: "Option 1" },
        { title: "Option 2" },
        { title: "Option 3" },
        { title: "Option 4" },
        { title: "Option 5" },
      ],
      expopack3: [
        { title: "Option 1" },
        { title: "Option 2" },
        { title: "Option 3" },
        { title: "Option 4" },
        { title: "Option 5" },
      ],
      selectedSpecialization : [],
      selectedSpecializationItem: [],
      rawSpecialization : [],
      specializationRow: [
        {
          trackName: "Ambitious",
          row: [0],
        },
        {
          trackName: "Casual",
          row: [0],
        },
        {
          trackName: "Balanced",
          row: [0],
        },
        {
          trackName: "Exploratory",
          row: [0],
        },
      ],
      quarterPlanCareerTrack: [
        "Ambitious",
        "Casual",
        "Balanced",
        "Exploratory",
      ],
      studentType : null,
      choosenTrack : null,
      pgaPlan : null,
      snackOpen : false,
      snackMsg : null,
      snackVariant : null,
    };
  }

 componentDidUpdate(prevProps,prevState){
    if(this.props.byTypeDetails !== prevProps.byTypeDetails){

      this.props.byTypeDetails.map((eachData,index)=>{
        
        this.setState({
          ["focus".concat(eachData.focusNo+"-").concat(eachData.enrollmentPeriod.name)] : eachData.course.name === "null" ? null : eachData.course.name,
        //  ["focusNo".concat(eachData.focusNo).concat(eachData.enrollmentPeriod.name)] : eachData.focusNo
          // ["uniqueId".concat(eachData.focusNo).concat(eachData.enrollmentPeriod)] : eachData.id,
          // ["startingQuarter".concat(eachData.focusNo).concat(eachData.enrollmentPeriod)] : eachData.startingQuarter,
          // ["enrolmentPeriod".concat(eachData.focusNo).concat(eachData.enrollmentPeriod)] : eachData.enrollmentPeriod,
          // ["grade".concat(eachData.focusNo).concat(eachData.enrollmentPeriod)] : eachData.grade,
          // ["focusNo".concat(eachData.focusNo).concat(eachData.enrollmentPeriod)]  : eachData.focusNo
        })
      })
    }
    if(this.props.postPGaPlanCareerTrack !== prevProps.postPGaPlanCareerTrack){
      this.setState({
        snackMsg : "Careertrack Updated Successfully",
        snackVariant : "success",
        snackOpen : true
      })
    }
 }

 componentDidMount() {
  this.props.getAllStarterPack()
  this.props.getAllQuarterPlan()
  this.props.getAllSpecialization();
  this.props.getStudentGrade()
 

 }
 

   type=[
     {title:"Above Average", value : "Above Average"},
     {title:"Below Average", value : "Below Average"},
   ]

   handleChange=(e,value)=>{


      this.setState({
        [e.target.name]:e.target.value
      })
    
    }

  
    handleChangeEdsin = (e, i, careerTrackIndex, specializationIndex, item) => {
    
      let obj = {
        index: i,
        careerTrackIndex: careerTrackIndex,
        specializationIndex: specializationIndex,
        ...e.target.value,
      };
  
      let selectArr = [];
      let selectObj = {
        id: e.target.value.id,
        name: e.target.value.name,
        starterPackCourse: [],
        specializationIndex: specializationIndex,
      };
      selectArr.push(selectObj);
  
      let removeExistCareerTrackArr=this.state.selectedSpecializationItem.filter(item=>item.careerTrackIndex!==careerTrackIndex)    
      let newCareerTrack=[]
      let existCareerTrack=this.state.selectedSpecializationItem.filter(item=>item.careerTrackIndex===careerTrackIndex)
      let removeOldSpecialization=[]
      if(existCareerTrack.length>0){
        removeOldSpecialization=existCareerTrack[0].specialization.filter(item=>item.specializationIndex!==specializationIndex)      
      }
      let newSpecialization=removeOldSpecialization.concat(selectObj);
  
      let selectItem={
        careerTrackName:item,
        specializationIndex:specializationIndex,
        careerTrackIndex:careerTrackIndex,
        specialization:newSpecialization,
      }
  
      if(removeExistCareerTrackArr.length!==0){                        
        newCareerTrack=removeExistCareerTrackArr.concat(selectItem) 
      this.setState({selectedSpecializationItem:newCareerTrack})
      }else{
        newCareerTrack=removeExistCareerTrackArr.concat(selectItem)
        this.setState({selectedSpecializationItem:newCareerTrack})
      }
  
      let duplicateIndex = null;
      for (let i = 0; i < this.state.selectedSpecialization.length; i++) {
        if (
          this.state.selectedSpecialization[i].careerTrackIndex ===
            careerTrackIndex &&
          this.state.selectedSpecialization[i].specializationIndex ===
            specializationIndex
        ) {
          duplicateIndex = i;
        }
      }
  
      let arr = [];
      if (duplicateIndex !== null) {
        arr = this.state.selectedSpecialization.splice(duplicateIndex, 1);
      }
      arr = this.state.selectedSpecialization.concat(obj);
      this.setState({ selectedSpecialization: arr });
    };

    handleCourseChange = (e, careerTrackIndex, specializationIndex,courseIndex) => {
      let starterCourse={
        id:e.target.value.id,
        name:e.target.value.name,     
        courseIndex:courseIndex,     
      }
      var existCareerTrack=[]
      var existSpecialization=[]
      var existStarterPack=[]
      existCareerTrack=this.state.selectedSpecializationItem.filter(item=>item.careerTrackIndex===careerTrackIndex)                
      if(existCareerTrack.length>0){                
        existSpecialization=existCareerTrack[0].specialization.filter(item=>item.specializationIndex===specializationIndex)
        if(existSpecialization.length>0){        
          existStarterPack=existSpecialization[0].starterPackCourse.filter(item=>item.courseIndex!==courseIndex)        
          if(existCareerTrack.length<3){          
            existStarterPack=existStarterPack.concat(starterCourse)          
          }
        }
      }
      
  
      let specializations={
        ...existSpecialization[0],
        starterPackCourse:existStarterPack,      
      }
  
      let removeSpecialization=existCareerTrack[0].specialization.filter(item=>item.specializationIndex!==specializationIndex)
      
      let existCareerTrackObj={
        ...existCareerTrack[0],
        specialization:removeSpecialization.concat(specializations),
      }
      
      let removeExistCareerTrackArr=this.state.selectedSpecializationItem.filter(item=>item.careerTrackIndex!==careerTrackIndex)
      removeExistCareerTrackArr=removeExistCareerTrackArr.concat(existCareerTrackObj);
      this.setState({selectedSpecializationItem:removeExistCareerTrackArr});
    };

   handleTypeChange = (e,newValue) =>{
     console.log(newValue)
     this.setState({
       studentType : newValue
     })
    if(newValue !== null){
      this.props.getQuarterPlanByType(this.props.id,newValue.id)
    }
   }

   obj = {
    description: "Consider doing an online course for additional skill building in the area of your interest. Check the links below for domain name-related courses. Consider completing at least one of the courses, getting a certification and working on a capstone project based on it.",
    id: "6f4728ab-6364-41a1-803d-3c04b8ee85e9",
    name: "In-Plant Training",
   }

   renderBeforeFocus = () =>{
    
    let focusArr = []
    let periodArr = ["May - Jul","Aug - Oct","Nov - Jan","Feb - Apr"]
    for(let i=1; i<=4; i++){
      focusArr.push({
        focusNo : <h6>{"Focus ".concat(i)}</h6>,
        focusSelectControl1 :   <FormControl size="small" fullWidth variant="outlined">
        <InputLabel shrink={true} id="demo-simple-select-outlined-label">Select Option</InputLabel>
        <Select
        fullWidth
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Select Option"
          value={
            // this.obj
            this.state["focus".concat(i+"-").concat(periodArr[0])] !== undefined ? this.state["focus".concat(i+"-").concat(periodArr[0])] : null
          }
          name={"focus".concat(i+"-").concat(periodArr[0])}
          onChange={this.handleChange}
        >
          {this.props.allQuarterPlan.map(eachPlan=>{
            return(
              <MenuItem 
              value={eachPlan.name}
              >{eachPlan.name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>,
      focusSelectControl2 :  <FormControl size="small" fullWidth variant="outlined">
      <InputLabel shrink={true} id="demo-simple-select-outlined-label">Select Option</InputLabel>
      <Select
      fullWidth
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        label="Select Option"
        value={
          this.state["focus".concat(i+"-").concat(periodArr[1])] !== undefined ? this.state["focus".concat(i+"-").concat(periodArr[1])] : null}
          name={"focus".concat(i).concat(periodArr[1])}
        onChange={this.handleChange}
      >
        {this.props.allQuarterPlan.map(eachPlan=>{
          return(
            <MenuItem 
            value={eachPlan.name}
            >{eachPlan.name}</MenuItem>
          )
        })}
      </Select>
    </FormControl>,
     focusSelectControl3 :  <FormControl  size="small" fullWidth variant="outlined">
     <InputLabel shrink={true} id="demo-simple-select-outlined-label">Select Option</InputLabel>
     <Select
     fullWidth
       labelId="demo-simple-select-outlined-label"
       id="demo-simple-select-outlined"
       label="Select Option"
       value={
        this.state["focus".concat(i+"-").concat(periodArr[2])] !== undefined ? this.state["focus".concat(i+"-").concat(periodArr[2])] : null}
          name={"focus".concat(i).concat(periodArr[2])}
       onChange={this.handleChange}
     >
       {this.props.allQuarterPlan.map(eachPlan=>{
         return(
           <MenuItem value={eachPlan.name}>{eachPlan.name}</MenuItem>
         )
       })}
     </Select>
   </FormControl>,
    focusSelectControl4 :  <FormControl size="small" fullWidth variant="outlined">
    <InputLabel shrink={true} id="demo-simple-select-outlined-label">Select Option</InputLabel>
    <Select
    fullWidth
      labelId="demo-simple-select-outlined-label"
      id="demo-simple-select-outlined"
      label="Select Option"
      value={
        this.state["focus".concat(i+"-").concat(periodArr[3])] !== undefined ? this.state["focus".concat(i+"-").concat(periodArr[3])] : null}
      name={"focus".concat(i+"-").concat(periodArr[3])}
      onChange={this.handleChange}
    >
      {this.props.allQuarterPlan.map(eachPlan=>{
        return(
          <MenuItem value={eachPlan.name}>{eachPlan.name}</MenuItem>
        )
      })}
    </Select>
  </FormControl>
      })
    }

    return focusArr.map(eachElement=>{
      return(
        <>
        <Grid item md={2}>{eachElement.focusNo}</Grid>
        <Grid item md={2}>{eachElement.focusSelectControl1}</Grid>
        <Grid item md={2}>{eachElement.focusSelectControl2}</Grid>
        <Grid item md={2}>{eachElement.focusSelectControl3}</Grid>
        <Grid item md={2}>{eachElement.focusSelectControl4}</Grid>
        <Grid item md={2}></Grid>
        </>
      )
    })


   }

   renderAfterFocus = () =>{
    let focusArr = []
    let periodArr = ["May - Jul-1","Aug - Oct-1","Nov - Jan-1","Feb - Apr-1"]
    for(let i=1; i<=4; i++){
      focusArr.push({
        focusNo : <h6>{"Focus ".concat(i)}</h6>,
        focusSelectControl1 :   <FormControl size="small" fullWidth variant="outlined">
        <InputLabel shrink={true} id="demo-simple-select-outlined-label">Select Option</InputLabel>
        <Select
        fullWidth
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Select Option"
          value={this.state["focus".concat(i+"-").concat(periodArr[0])] !== undefined ? this.state["focus".concat(i+"-").concat(periodArr[0])] : null}
          name={"focus".concat(i+"-").concat(periodArr[0])}
          onChange={this.handleChange}
        >
          {this.props.allQuarterPlan.map(eachPlan=>{
            return(
              <MenuItem value={eachPlan.name}>{eachPlan.name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>,
      focusSelectControl2 :  <FormControl size="small" fullWidth variant="outlined">
      <InputLabel shrink={true} id="demo-simple-select-outlined-label">Select Option</InputLabel>
      <Select
      fullWidth
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        label="Select Option"
        value={
          this.state["focus".concat(i+"-").concat(periodArr[1])] !== undefined ? this.state["focus".concat(i+"-").concat(periodArr[1])] : null}
          name={"focus".concat(i+"-").concat(periodArr[1])}
        onChange={this.handleChange}
      >
        {this.props.allQuarterPlan.map(eachPlan=>{
          return(
            <MenuItem value={eachPlan.name}>{eachPlan.name}</MenuItem>
          )
        })}
      </Select>
    </FormControl>,
     focusSelectControl3 :  <FormControl  size="small" fullWidth variant="outlined">
     <InputLabel shrink={true} id="demo-simple-select-outlined-label">Select Option</InputLabel>
     <Select
     fullWidth
       labelId="demo-simple-select-outlined-label"
       id="demo-simple-select-outlined"
       label="Select Option"
       value={
        this.state["focus".concat(i+"-").concat(periodArr[2])] !== undefined ? this.state["focus".concat(i+"-").concat(periodArr[2])] : null}
          name={"focus".concat(i+"-").concat(periodArr[2])}
       onChange={this.handleChange}
     >
       {this.props.allQuarterPlan.map(eachPlan=>{
         return(
           <MenuItem value={eachPlan.name}>{eachPlan.name}</MenuItem>
         )
       })}
     </Select>
   </FormControl>,
    focusSelectControl4 :  <FormControl size="small" fullWidth variant="outlined">
    <InputLabel shrink={true} id="demo-simple-select-outlined-label">Select Option</InputLabel>
    <Select
    fullWidth
      labelId="demo-simple-select-outlined-label"
      id="demo-simple-select-outlined"
      label="Select Option"
      value={
        this.state["focus".concat(i+"-").concat(periodArr[3])] !== undefined ? this.state["focus".concat(i+"-").concat(periodArr[3])] : null}
      name={"focus".concat(i+"-").concat(periodArr[3])}
      onChange={this.handleChange}
    >
      {this.props.allQuarterPlan.map(eachPlan=>{
        return(
          <MenuItem value={eachPlan.name}>{eachPlan.name}</MenuItem>
        )
      })}
    </Select>
  </FormControl>
      })
    }

    return focusArr.map(eachElement=>{
      return(
        <>
        <Grid item md={2}>{eachElement.focusNo}</Grid>
        <Grid item md={2}>{eachElement.focusSelectControl1}</Grid>
        <Grid item md={2}>{eachElement.focusSelectControl2}</Grid>
        <Grid item md={2}>{eachElement.focusSelectControl3}</Grid>
        <Grid item md={2}>{eachElement.focusSelectControl4}</Grid>
        <Grid item md={2}></Grid>
        </>
      )
    })

   }
  
   handleSave = () =>{

    let postArr = []

    for (const [key, value] of Object.entries(this.state)) {
      if(key.startsWith("foc")){
        let focusNo = key.substring(key.indexOf("-")-1,key.indexOf("-"))
        let period = key.substring(key.indexOf("-")+1,key.length)
        let obj = {
          focusNo : focusNo,
          enrollmentPeriod : period,
          grade : this.state.studentType.name,
          chosenTrack: this.props.byTypeDetails[0].chosenTrack.name,
          courseName : value
        }
        postArr.push(obj)
      }
    }
    console.log(postArr)

    this.props.postPgaPlanCareerTrack(this.props.id,this.state.selectedSpecializationItem)
    this.props.postPGaQuarter(this.props.id, postArr)
   }   

   renderSpecialization = () => {
    console.log("--State--",this.state.selectedSpecializationItem)
    return (
      <>
        {this.state.quarterPlanCareerTrack.map((item, careerTrackIndex) => {
          return (
            <>
              <Grid item md={2}>
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={item}
                      disabled
                      label="Career Track"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={9}>
                <Grid container spacing={2}>
                  {/* Specialization */}
                  {this.state.specializationRow
                    .filter((row) => row.trackName === item)
                    .map((specialization) => {
                      return specialization.row.map(
                        (specializationItem, specializationIndex) => {
                          return (
                            <>
                              <Grid item md={3}>
                                <FormControl
                                  size="small"
                                  fullWidth
                                  variant="outlined"
                                >
                                  <InputLabel id="demo-simple-select-outlined-label">
                                    Specialization
                                  </InputLabel>
                                  <Select
                                    fullWidth
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    label="Specialization"
                                    onChange={(e) =>
                                      this.handleChangeEdsin(
                                        e,
                                        careerTrackIndex,
                                        careerTrackIndex,
                                        specializationIndex,
                                        item
                                      )
                                    }
                                  >
                                    {this.props.allSpecialization.map(
                                      (eachChoice, i) => {
                                        return (
                                          <MenuItem value={eachChoice}>
                                            {eachChoice.name}
                                          </MenuItem>
                                        );
                                      }
                                    )}
                                  </Select>
                                </FormControl>
                              </Grid>

                              {[1, 2, 3].map((data, index) => {
                                return (
                                  <Grid item md={3}>
                                    <FormControl
                                      size="small"
                                      fullWidth
                                      variant="outlined"
                                    >
                                      <InputLabel id="demo-simple-select-outlined-label">
                                        Starter Pack {data}
                                      </InputLabel>
                                      <Select
                                        fullWidth
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        label="Course"
                                        name="ambOption1"
                                        onChange={(e) =>
                                          this.handleCourseChange(
                                            e,
                                            careerTrackIndex,
                                            specializationIndex,
                                            index
                                          )
                                        }
                                      >
                                        {this.state.selectedSpecialization
                                          .filter(
                                            (item, i) =>
                                              item.careerTrackIndex ===
                                                careerTrackIndex &&
                                              item.specializationIndex ===
                                                specializationIndex
                                          )
                                          .map((eachChoice, i) => {
                                            return eachChoice.starterPackCourses.map(
                                              (item) => {
                                                return (
                                                  <MenuItem value={item} >
                                                    {item.name}
                                                  </MenuItem>
                                                );
                                              }
                                            );
                                          })}
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                );
                              })}
                            </>
                          );
                        }
                      );
                    })}
                  {/* End of Specialization */}
                </Grid>
              </Grid>
              <Grid item md={1}>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <IconButton
                      onClick={() => {
                        let arr = this.state.specializationRow.filter(
                          (data) => data.trackName === item
                        );
                        arr[0].row.push(Math.random());
                        let removeOldArr = this.state.specializationRow
                          .filter((data) => data.trackName !== item)
                          .concat(arr);
                        this.setState({ specializationRow: removeOldArr });                        

                      }}
                    >
                      <Icon>
                        <AddCircleIcon />
                      </Icon>
                    </IconButton>
                  </Grid>
                  <Grid item md={6}>
                    <IconButton
                      disabled={this.state.specializationRow === 1}
                      onClick={() => {
                        let arr = this.state.specializationRow.filter(
                          (data) => data.trackName === item
                        );
                        if (arr[0].row.length > 1) {
                          arr[0].row.pop();
                          //delete arr                          
                          let existCareerTrack=this.state.selectedSpecializationItem.filter(arr=>arr.careerTrackIndex===careerTrackIndex)
                         let existSpecialization=[]
                         if(existCareerTrack[0]!==undefined) 
                         {existSpecialization=existCareerTrack[0].specialization.sort((a,b)=>(a.specializationIndex > b.specializationIndex) ? 1 : ((b.specializationIndex > a.specializationIndex) ? -1 : 0))                                                                     
                        existSpecialization.pop()}
                        let arrConvert=[]                        
                        if(!Array.isArray(existSpecialization)){
                          arrConvert.push(existSpecialization)
                        }
                        let newTrack={
                          ...existCareerTrack[0],
                          specialization:existSpecialization,                          
                        }                                    
                        let newCareerTrack=this.state.selectedSpecializationItem.filter(arr=>arr.careerTrackIndex!==careerTrackIndex)
                        newCareerTrack=newCareerTrack.concat(newTrack)
                        this.setState({
                          selectedSpecializationItem:newCareerTrack
                        })
                        }
                        let removeOldArr = this.state.specializationRow
                          .filter((data) => data.trackName !== item)
                          .concat(arr);

                        this.setState({ specializationRow: removeOldArr });
                      }}
                    >
                      <IndeterminateCheckBoxRoundedIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </>
          );
        })}
      </>
    );
  };

    render() {
    console.log(this.props.allQuarterPlan)
      console.log(this.state)
      console.log(this.props.postPGaPlanCareerTrack)
        return (
            <div>
                <h5 style={{padding :"1%"}}>Starter Pack Course</h5>
                <Grid container style={{padding:"1%"}} spacing={2}>
                {this.renderSpecialization()}
                </Grid>
                <hr />
                <Grid style={{padding:"1%"}}>
                <Autocomplete
                           id="combo-box-demo"
                        options={this.props.studentGradeList}
                        getOptionLabel={(option) => option.name}
                        onChange={this.handleTypeChange}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Student Type"
                              variant="outlined"
                            />
                        )}
                         />
                </Grid>
               <Grid container spacing={2} style={{padding:"1%"}}>

                   <Grid item md={2}>
                       <h6>Focus</h6>
                   </Grid>
                   <Grid item md={2}>
                    <h6>May 2020 - Jul 2020</h6> 
                   </Grid>

                   <Grid item md={2}>
                       <h6>Aug 2020 - Oct 2020</h6>
                   </Grid>
                   <Grid item md={2}>
                       <h6>Nov 2020 - Jan 2021</h6>
                   </Grid>
                   <Grid item md={2}>
                       <h6>Feb 2021 -Apr 2021</h6>
                   </Grid>
                   <Grid item md={2}>
                   </Grid>
                  
                    {
                    this.renderBeforeFocus()
                    }
                    <Grid item md={12} style={{padding:"1%"}}>
                   <Autocomplete
                            id="combo-box-demo"
                            options={this.props.allQuarterPlan}
                            getOptionLabel={(option) => option.name}
                            value={this.state.commonFocusFist}
                            fullWidth
                            onChange={(e,newValue)=>this.setState({commonFocusFist : newValue})}
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Common Focus(for first each 4 quarter combined)"
                                  variant="outlined"
                                />
                            )} />
               </Grid>
               <Grid item md={2}>
                       <h6>Focus</h6>
                   </Grid>
                   <Grid item md={2}>
                    <h6>May 2021 - Jul 2021</h6> 
                   </Grid>

                   <Grid item md={2}>
                       <h6>Aug 2021 - Oct 2021</h6>
                   </Grid>
                   <Grid item md={2}>
                       <h6>Nov 2021 - Jan 2022</h6>
                   </Grid>
                   <Grid item md={2}>
                       <h6>Feb 2022 -Apr 2022</h6>
                   </Grid>
                   <Grid item md={2}>
                   </Grid>
                  
                    {this.renderAfterFocus()}
                    <Grid item md={12} style={{padding:"1%"}}>
                   <Autocomplete
                            id="combo-box-demo"
                            options={this.props.allQuarterPlan}
                            getOptionLabel={(option) => option.name}
                            value={this.state.commonFocusSecond}
                            fullWidth
                            onChange={(e,newValue)=>this.setState({commonFocusSecond : newValue})}
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Common Focus(for each 4 quarter combined)"
                                  variant="outlined"
                                />
                            )} />
               </Grid>
               <Grid item md={12}>
                  <Button variant="contained" onClick={this.handleSave} color="primary">Save</Button>
               </Grid>
               </Grid>
              <MySnackBar 
              snackOpen={this.state.snackOpen}
              snackMsg={this.state.snackMsg}
              snackVariant={this.state.snackVariant}
              />
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
  return {
    quarterPlan : state.PgaReducer.quarterPlan,
    starterPackDetails : state.PgaReducer.starterPackDetails,
    allQuarterPlan : state.PgaReducer.allQuarterPlan,
    byTypeDetails : state.PgaReducer.byTypeDetails,
    allSpecialization : state.PgaReducer.allSpecialization,
    studentGradeList : state.PgaReducer.studentGradeList,
    postPGaPlanCareerTrack : state.PgaReducer.postPGaPlanCareerTrack,
    postPgaQuarterResponse : state.PgaReducer.postPgaQuarterResponse

  }
}

export default connect(mapStateToProps, {getQuarterPlanByType, getAllStarterPack,getAllSpecialization,getAllQuarterPlan,getStudentGrade,postPgaPlanCareerTrack,postPGaQuarter})(Pgaplan)