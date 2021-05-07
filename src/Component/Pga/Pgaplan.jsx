import { Divider, Grid, Icon, IconButton, TextField, Button, FormControlLabel, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { Component } from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { TransferWithinAStationOutlined, TurnedInSharp } from '@material-ui/icons';
import IndeterminateCheckBoxRoundedIcon from "@material-ui/icons/IndeterminateCheckBoxRounded";
import { connect } from 'react-redux';
import {response} from "./PgaResponse"
import {getQuarterPlanByType, getAllStarterPack,getAllQuarterPlan} from "../../Actions/PgaAction" 
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
      response : response,
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
      rawStarterPack: [
        {
          id: "1",
          name: "Ambitious",
          specializations: [
            {
              id: "1",
              name: "Front End",
              starterPackCourses: [{id : "1", name : "courseOne"}],
            },
            {
              id: "2",
              name: "Backend",
              starterPackCourses: [{id : "2", name : "courseTwo"}],
            },
          ],
        },
      ],
      rawSpecialization : [],
      
    };
  }

 componentDidUpdate(prevProps,prevState){
    if(this.props.byTypeDetails !== prevProps.byTypeDetails){
      this.props.byTypeDetails.map((eachData,index)=>{
        this.setState({
          ["focus".concat(eachData.focusNo).concat(eachData.enrollmentPeriod)] : eachData.courseName,
          ["uniqueId".concat(eachData.focusNo).concat(eachData.enrollmentPeriod)] : eachData.id,
          ["startingQuarter".concat(eachData.focusNo).concat(eachData.enrollmentPeriod)] : eachData.startingQuarter,
          ["enrolmentPeriod".concat(eachData.focusNo).concat(eachData.enrollmentPeriod)] : eachData.enrollmentPeriod,
          ["grade".concat(eachData.focusNo).concat(eachData.enrollmentPeriod)] : eachData.grade,
          ["focusNo".concat(eachData.focusNo).concat(eachData.enrollmentPeriod)]  : eachData.focusNo
        })
      })
    }
 }

 componentDidMount() {
  this.props.getAllStarterPack()
  this.props.getAllQuarterPlan()

  this.state.response.map((eachElement,index)=>{
    console.log(index,eachElement)
    this.setState({
      ["focus".concat(eachElement.focusNo).concat(eachElement.enrollmentPeriod)] : eachElement.courseName,
    })
  })

 }
 

   specialization=[
     {title:"Full Stack Development"},
     {title:"Front End Development"},
     {title:"Programming Basics"},
     {title:"Competitive Programming"},
     {title:"Data Science"},
     {title:"Machine Learning "},
     {title:"Computer Vision"},
     {title:"Embedded Systems and Hardware"},
     {title:"VLSI"},
     {title:"Design and Modelling"},
     {title:"Civil Engineering"},
     {title:"Marketing"},
     {title:"Analytics"},
     {title:"Structural Stress Engineering"},
     {title:"Tool Design"},
     {title:"NC Programming"},
     {title:"Internet of Things"},
     {title:"Robotics and Mechatronics"},
     {title:"Cloud Computing Starter Pack"},
     {title:"Digital Signal Processing"},
     {title:"Finance"},
     {title:"Equipment & System Engineering"},
     {title:"HR Analytics"},
   ]
   type=[
     {title:"Above Average", value : "Above Average"},
     {title:"Below Average", value : "Below Average"},
   ]
   choice=[
    {title:"Option 1"},
    {title:"Option 2"},
    {title:"Option 3"},
    {title:"Option 4"},
    {title:"Option 5"},
]


   handleChange=(e,value)=>{
      this.setState({
        [e.target.name]:e.target.value
      })
    
    }

   renderAmbitious = () =>{
      let ambitiousArr = []
      for (let i=1;i<=this.state.ambitiousCount; i++){
        ambitiousArr.push({
          ambSpecializaiton :    <FormControl size="small" fullWidth variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Specialization</InputLabel>
          <Select
          fullWidth
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Specialization"
  
          >
            {this.specialization.map(eachChoice=>{
              return(
                <MenuItem value={eachChoice.title}>{eachChoice.title}</MenuItem>
              )
            })}
          </Select>
        </FormControl>,
          starterPackOne :   <FormControl size="small" fullWidth variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Starter Pack 1</InputLabel>
          <Select
          fullWidth
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Starter Pack 1"
            name="ambOption1"
            onChange={this.handleChange}

          >
            {this.state.ambpack1.map(eachChoice=>{
              return(
                <MenuItem value={eachChoice.title}>{eachChoice.title}</MenuItem>
              )
            })}
          </Select>
        </FormControl>,
        starterPackTwo : <FormControl size="small" fullWidth variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Starter Pack 2</InputLabel>
        <Select
        fullWidth
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Starter Pack 2"
          name="ambOption2"
          onChange={this.handleChange}
        >
          {this.state.ambpack2.filter((opt)=>opt.title !== this.state.ambOption1).map(eachChoice=>{
            return(
              <MenuItem value={eachChoice.title}>{eachChoice.title}</MenuItem>
            )
          })}
        </Select>
      </FormControl>,
        starterPackThree :   <FormControl size="small" fullWidth variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Starter Pack 3</InputLabel>
        <Select
        fullWidth
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Starter Pack 3"
          name="ambOption3"
          onChange={this.handleChange}
        >
          {this.state.ambpack3.filter((opt1) => (opt1.title!==this.state.ambOption1) && (opt1.title !== this.state.ambOption2)).map(eachChoice=>{
            return(
              <MenuItem value={eachChoice.title}>{eachChoice.title}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
        })
      }
      return ambitiousArr.map(eachAmbitious=>{
        return(
          <>
          <Grid item md={3}>
            {eachAmbitious.ambSpecializaiton}
          </Grid>
          <Grid item md={3}>
            {eachAmbitious.starterPackOne}
          </Grid>
          <Grid item md={3}>
            {eachAmbitious.starterPackTwo}
          </Grid>
          <Grid item md={3}>
            {eachAmbitious.starterPackThree}
          </Grid>
          </>
        )
      })
   }

   renderCasual = () =>{
    let casualArr = []
      for (let i=1;i<=this.state.casualCount; i++){
        casualArr.push({
          casualSpecializaiton :    <FormControl size="small" fullWidth variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Specialization</InputLabel>
          <Select
          fullWidth
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Specialization"
  
          >
            {this.specialization.map(eachChoice=>{
              return(
                <MenuItem value={eachChoice.title}>{eachChoice.title}</MenuItem>
              )
            })}
          </Select>
        </FormControl>,
          starterPackOne :   <FormControl size="small" fullWidth variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Starter Pack 1</InputLabel>
          <Select
          fullWidth
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Starter Pack 1"
            name="casOption1"
            onChange={this.handleChange}

          >
            {this.state.caspack1.map(eachChoice=>{
              return(
                <MenuItem value={eachChoice.title}>{eachChoice.title}</MenuItem>
              )
            })}
          </Select>
        </FormControl>,
        starterPackTwo : <FormControl size="small" fullWidth variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Starter Pack 2</InputLabel>
        <Select
        fullWidth
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Starter Pack 2"
           name="casOption2"
           onChange={this.handleChange}

        >
          {this.state.caspack2.filter((cas1)=>cas1.title !== this.state.casOption1).map(eachChoice=>{
            return(
              <MenuItem value={eachChoice.title}>{eachChoice.title}</MenuItem>
            )
          })}
        </Select>
      </FormControl>,
        starterPackThree :   <FormControl size="small" fullWidth variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Starter Pack 3</InputLabel>
        <Select
        fullWidth
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Starter Pack 3"
          name="casOption3"
          onChange={this.handleChange}
        >
          {this.state.caspack3.filter((cas2) => (cas2.title !== this.state.casOption1) && (cas2.title !== this.state.casOption2)).map(eachChoice=>{
            return(
              <MenuItem value={eachChoice.title}>{eachChoice.title}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
        })
      }
      return casualArr.map(eachCasual=>{
        return(
          <>
          <Grid item md={3}>
            {eachCasual.casualSpecializaiton}
          </Grid>
          <Grid item md={3}>
            {eachCasual.starterPackOne}
          </Grid>
          <Grid item md={3}>
            {eachCasual.starterPackTwo}
          </Grid>
          <Grid item md={3}>
            {eachCasual.starterPackThree}
          </Grid>
          </>
        )
      })
   }

   renderBalanced = () =>{
    let balanceArr = []
    for (let i=1;i<=this.state.balancedCount; i++){
      balanceArr.push({
        balanceSpecializaiton :    <FormControl size="small" fullWidth variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Specialization</InputLabel>
          <Select
          fullWidth
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Specialization"
           
          >
            {this.specialization.map(eachChoice=>{
              return(
                <MenuItem value={eachChoice.title}>{eachChoice.title}</MenuItem>
              )
            })}
          </Select>
        </FormControl>,
          starterPackOne :   <FormControl size="small" fullWidth variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Starter Pack 1</InputLabel>
          <Select
          fullWidth
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Starter Pack 1"
            name="balOption1"
            onChange={this.handleChange}
          >
            {this.state.balpack1.map(eachChoice=>{
              return(
                <MenuItem value={eachChoice.title}>{eachChoice.title}</MenuItem>
              )
            })}
          </Select>
        </FormControl>,
        starterPackTwo : <FormControl size="small" fullWidth variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Starter Pack 2</InputLabel>
        <Select
        fullWidth
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Starter Pack 2"
          name="balOption2"
          onChange={this.handleChange}
        >
          {this.state.balpack2.filter((bal)=>bal.title !== this.state.balOption1).map(eachChoice=>{
            return(
              <MenuItem value={eachChoice.title}>{eachChoice.title}</MenuItem>
            )
          })}
        </Select>
      </FormControl>,
        starterPackThree :   <FormControl size="small" fullWidth variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Starter Pack 3</InputLabel>
        <Select
        fullWidth
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Starter Pack 3"
          name="balOption3"
          onChange={this.handleChange}
        >
          {this.state.balpack3.filter((bal)=>(bal.title !== this.state.balOption1)&&(bal.title !== this.state.balOption2)).map(eachChoice=>{
            return(
              <MenuItem value={eachChoice.title}>{eachChoice.title}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
      })
    }
    return balanceArr.map(eachBalance=>{
      return(
        <>
        <Grid item md={3}>
          {eachBalance.balanceSpecializaiton}
        </Grid>
        <Grid item md={3}>
          {eachBalance.starterPackOne}
        </Grid>
        <Grid item md={3}>
          {eachBalance.starterPackTwo}
        </Grid>
        <Grid item md={3}>
          {eachBalance.starterPackThree}
        </Grid>
        </>
      )
    })
   }
   renderExplo = () =>{
    let exploArr = []
    for (let i=1;i<=this.state.exploCount; i++){
      exploArr.push({
        exploSpecializaiton :    <FormControl size="small" fullWidth variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Specialization</InputLabel>
        <Select
        fullWidth
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Specialization"

        >
          {this.specialization.map(eachChoice=>{
            return(
              <MenuItem value={eachChoice.title}>{eachChoice.title}</MenuItem>
            )
          })}
        </Select>
      </FormControl>,
        starterPackOne :   <FormControl size="small" fullWidth variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Starter Pack 1</InputLabel>
        <Select
        fullWidth
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Starter Pack 1"
          name="expoOption1"
          onChange={this.handleChange}
        >
          {this.state.expopack1.map(eachChoice=>{
            return(
              <MenuItem value={eachChoice.title}>{eachChoice.title}</MenuItem>
            )
          })}
        </Select>
      </FormControl>,
      starterPackTwo : <FormControl size="small" fullWidth variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">Starter Pack 2</InputLabel>
      <Select
      fullWidth
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        label="Starter Pack 2"
        name="expoOption2"
        onChange={this.handleChange}
      >
        {this.state.expopack2.filter((ex) => ex.title !== this.state.expoOption1).map(eachChoice=>{
          return(
            <MenuItem value={eachChoice.title}>{eachChoice.title}</MenuItem>
          )
        })}
      </Select>
    </FormControl>,
      starterPackThree :   <FormControl size="small" fullWidth variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">Starter Pack 3</InputLabel>
      <Select
      fullWidth
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        label="Starter Pack 3"
        name="expoOption3"
        onChange={this.handleChange}
      >
        {this.state.expopack3.filter((ex) => (ex.title !== this.state.expoOption1) && (this.state.expoOption2 !== ex.title)).map(eachChoice=>{
          return(
            <MenuItem value={eachChoice.title}>{eachChoice.title}</MenuItem>
          )
        })}
      </Select>
    </FormControl>
      })
    }
    return exploArr.map(eachExplo=>{
      return(
        <>
        <Grid item md={3}>
          {eachExplo.exploSpecializaiton}
        </Grid>
        <Grid item md={3}>
          {eachExplo.starterPackOne}
        </Grid>
        <Grid item md={3}>
          {eachExplo.starterPackTwo}
        </Grid>
        <Grid item md={3}>
          {eachExplo.starterPackThree}
        </Grid>
        </>
      )
    })
   }

   handleTypeChange = (e,newValue) =>{
    if(newValue !== null){
      this.props.getQuarterPlanByType(this.props.id,newValue.value)
    }
   }

   renderBeforeFocus = () =>{
    let focusArr = []
    let periodArr = ["May 2020 - Jul 2020","Aug 2020 - Oct 2020","Nov 2020 - Jan 2021","Feb 2021 - Apr 2021"]
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
          value={this.state.["focus".concat(i).concat(periodArr[0])] !== undefined ? this.state.["focus".concat(i).concat(periodArr[0])] : null}
          name={"focus".concat(i).concat(periodArr[0])}
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
        value={this.state.["focus".concat(i).concat(periodArr[1])] !== undefined ? this.state.["focus".concat(i).concat(periodArr[1])] : null}
          name={"focus".concat(i).concat(periodArr[1])}
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
       value={this.state.["focus".concat(i).concat(periodArr[2])] !== undefined ? this.state.["focus".concat(i).concat(periodArr[2])] : null}
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
      value={this.state.["focus".concat(i).concat(periodArr[3])] !== undefined ? this.state.["focus".concat(i).concat(periodArr[3])] : null}
      name={"focus".concat(i).concat(periodArr[3])}
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
    let periodArr = ["May 2021 - Jul 2021","Aug 2021 - Oct 2021","Nov 2021 - Jan 2022","Feb 2022 - Apr 2022"]
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
          value={this.state.["focus".concat(i).concat(periodArr[0])] !== undefined ? this.state.["focus".concat(i).concat(periodArr[0])] : null}
          name={"focus".concat(i).concat(periodArr[0])}
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
        value={this.state.["focus".concat(i).concat(periodArr[1])] !== undefined ? this.state.["focus".concat(i).concat(periodArr[1])] : null}
          name={"focus".concat(i).concat(periodArr[1])}
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
       value={this.state.["focus".concat(i).concat(periodArr[2])] !== undefined ? this.state.["focus".concat(i).concat(periodArr[2])] : null}
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
      value={this.state.["focus".concat(i).concat(periodArr[3])] !== undefined ? this.state.["focus".concat(i).concat(periodArr[3])] : null}
      name={"focus".concat(i).concat(periodArr[3])}
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



   }   
    render() {
    console.log(this.props.byTypeDetails)
      console.log(this.state)
      console.log(this.state.response)
        return (
            <div>
                <h5 style={{padding :"1%"}}>Starter Pack Course</h5>
                <Grid container style={{padding:"1%"}} spacing={2}>
                    <Grid item md={2}>
                    <Grid container spacing={2}>
                      <Grid item md={12}>
                      <TextField
                        variant="outlined"
                        size="small"
                        value="Ambitious"
                        disabled
                        label="Career Track" />
                      </Grid>
                    </Grid>
                    </Grid>
                    <Grid item md={9}>
                      <Grid container spacing={2}>
                      {this.renderAmbitious()}
                      </Grid>
                    </Grid>
                    <Grid item md={1}>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                        <IconButton
                       onClick={()=>this.setState({ambitiousCount : this.state.ambitiousCount +1})}>
                             <Icon>
                                 <AddCircleIcon />
                             </Icon>
                         </IconButton> 
                        </Grid>
                        <Grid item md={6}>
                        <IconButton 
                         disabled={this.state.ambitiousCount === 1}
                         onClick={()=>this.setState({ambitiousCount : this.state.ambitiousCount !== 1 ? this.state.ambitiousCount -1 : 1})}>
                           <IndeterminateCheckBoxRoundedIcon />
                         </IconButton>
                      </Grid>
                    
                      </Grid>
                    </Grid>
                    <Grid item md={2}>
                    <Grid container spacing={2}>
                      <Grid item md={12}>
                      <TextField
                        variant="outlined"
                        size="small"
                        value="Casual"
                        disabled
                        label="Career Track" />
                      </Grid>
                    </Grid>
                    </Grid>
                    <Grid item md={9}>
                      <Grid container spacing={2}>
                      {this.renderCasual()}
                      </Grid>
                    </Grid>
                    <Grid item md={1}>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                        <IconButton onClick={()=>this.setState({casualCount : this.state.casualCount +1})}>
                             <Icon>
                                 <AddCircleIcon />
                             </Icon>
                         </IconButton> 
                        </Grid>
                        <Grid item md={6}>
                        <IconButton 
                         disabled={this.state.casualCount === 1}
                         onClick={()=>this.setState({casualCount : this.state.casualCount !== 1 ? this.state.casualCount -1 : 1})}>
                           <IndeterminateCheckBoxRoundedIcon />
                         </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item md={2}>
                    <Grid container spacing={2}>
                      <Grid item md={12}>
                      <TextField
                        variant="outlined"
                        size="small"
                        value="Balanced"
                        disabled
                        label="Career Track" />
                      </Grid>
                     
                    </Grid>
                    </Grid>
                    <Grid item md={9}>
                      <Grid container spacing={2}>
                      {this.renderBalanced()}
                      </Grid>
                    </Grid>
                    <Grid item md={1}>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                        <IconButton onClick={()=>this.setState({balancedCount : this.state.balancedCount +1})}>
                             <Icon>
                                 <AddCircleIcon />
                             </Icon>
                         </IconButton> 
                        </Grid>
                        <Grid item md={6}>
                        <IconButton
                         disabled={this.state.balancedCount === 1}
                         onClick={()=>this.setState({balancedCount : this.state.balancedCount !== 1 ? this.state.balancedCount -1 : 1})}>
                           <IndeterminateCheckBoxRoundedIcon />
                         </IconButton>
                        </Grid>
                     
                       
                      </Grid>
                    </Grid>
                    <Grid item md={2}>
                    <Grid container spacing={2}>
                      <Grid item md={12}>
                      <TextField
                        variant="outlined"
                        size="small"
                        value="Exploratory"
                        disabled
                        label="Career Track" />
                      </Grid>
                   
                    </Grid>
                    </Grid>
                    <Grid item md={9}>
                      <Grid container spacing={2}>
                      {this.renderExplo()}
                      </Grid>
                    </Grid>
                    <Grid item md={1}> 
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                        <IconButton onClick={()=>this.setState({exploCount : this.state.exploCount +1})}>
                             <Icon>
                                 <AddCircleIcon />
                             </Icon>
                         </IconButton> 
                        </Grid>
                        <Grid item md={6}>
                        <IconButton 
                         disabled={this.state.exploCount === 1}
                         onClick={()=>this.setState({exploCount : this.state.exploCount !== 1 ? this.state.exploCount -1 : 1})}>
                           <IndeterminateCheckBoxRoundedIcon />
                         </IconButton>
                      </Grid>
 
                      </Grid>
                    </Grid>
                   
                </Grid>
                <hr />
                <Grid style={{padding:"1%"}}>
                <Autocomplete
                           id="combo-box-demo"
                        options={this.type}
                        getOptionLabel={(option) => option.title}
                        // value={}
                        // onChange={this.handleTypeChange}
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
                  
                    {this.renderBeforeFocus()}
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
              
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
  return {
    quarterPlan : state.PgaReducer.quarterPlan,
    starterPackDetails : state.PgaReducer.starterPackDetails,
    allQuarterPlan : state.PgaReducer.allQuarterPlan,
    byTypeDetails : state.PgaReducer.byTypeDetails
  }
}

export default connect(mapStateToProps, {getQuarterPlanByType, getAllStarterPack, getAllQuarterPlan})(Pgaplan)