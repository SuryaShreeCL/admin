import { Divider, Grid, Icon, IconButton, TextField, FormControlLabel, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { Component } from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { TransferWithinAStationOutlined, TurnedInSharp } from '@material-ui/icons';
import IndeterminateCheckBoxRoundedIcon from "@material-ui/icons/IndeterminateCheckBoxRounded";
import { connect } from 'react-redux';
import {getQuarterPlanByType, getAllStarterPack} from "../../Actions/PgaAction" 
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
   if(prevState.ambOption1 !== this.state.ambOption1){
    // let myArr = []
    //  myArr=this.state.ambpack2.filter((opt) => this.state.ambOption1 !== opt.title )
    //  this.setState({
    //    ambpack2 : myArr
    //  })
   }
 }

 componentDidMount() {
  this.props.getAllStarterPack()
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
     {title:"Above Average", value : "above"},
     {title:"Below Average", value : "below"},
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

  
   
    render() {
    console.log(this.state.rawStarterPack)
      console.log(this.props.starterPackDetails)
      console.log(this.state)
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
                       <h6>Feb-Apr</h6>
                   </Grid>
                   <Grid item md={2}>
                       <h6>May-July</h6>
                   </Grid>
                   <Grid item md={2}>
                       <h6>Aug-Oct</h6>
                   </Grid>
                   <Grid item md={2}>
                       <h6>Nov-Jan</h6>
                   </Grid>
                   <Grid item md={2}>
                   </Grid>
                   <Grid item md={2}>
                       <h6>Focus 1</h6>
                   </Grid>
                   <Grid item md={2}>
                       <Autocomplete
                            id="combo-box-demo"
                            options={this.choice}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Select Option"
                                  variant="outlined"
                                />
                            )} />
                   </Grid>
                   <Grid item md={2}>
                       <Autocomplete
                            id="combo-box-demo"
                            options={this.choice}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Select Option"
                                  variant="outlined"
                                />
                            )} />
                   </Grid>
                   <Grid item md={2}>
                       <Autocomplete
                            id="combo-box-demo"
                            options={this.choice}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Select Option"
                                  variant="outlined"
                                />
                            )} />
                   </Grid>
                   <Grid item md={2}>
                       <Autocomplete
                            id="combo-box-demo"
                            options={this.choice}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Select Option"
                                  variant="outlined"
                                />
                            )} />
                   </Grid>
                   <Grid item md={2}>
                      
                   </Grid>
                   <Grid item md={2}>
                       <h6>Focus 2</h6>
                   </Grid>
                   <Grid item md={2}>
                       <Autocomplete
                            id="combo-box-demo"
                            options={this.choice}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Select Option"
                                  variant="outlined"
                                />
                            )} />
                   </Grid>
                   <Grid item md={2}>
                       <Autocomplete
                            id="combo-box-demo"
                            options={this.choice}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Select Option"
                                  variant="outlined"
                                />
                            )} />
                   </Grid>
                   <Grid item md={2}>
                       <Autocomplete
                            id="combo-box-demo"
                            options={this.choice}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Select Option"
                                  variant="outlined"
                                />
                            )} />
                   </Grid>
                   <Grid item md={2}>
                       <Autocomplete
                            id="combo-box-demo"
                            options={this.choice}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Select Option"
                                  variant="outlined"
                                />
                            )} />
                   </Grid>
                   <Grid item md={2}>
                     
                   </Grid>
                   <Grid item md={2}>
                       <h6>Focus 3</h6>
                   </Grid>
                   <Grid item md={2}>
                       <Autocomplete
                            id="combo-box-demo"
                            options={this.choice}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Select Option"
                                  variant="outlined"
                                />
                            )} />
                   </Grid>
                   <Grid item md={2}>
                       <Autocomplete
                            id="combo-box-demo"
                            options={this.choice}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Select Option"
                                  variant="outlined"
                                />
                            )} />
                   </Grid>
                   <Grid item md={2}>
                       <Autocomplete
                            id="combo-box-demo"
                            options={this.choice}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Select Option"
                                  variant="outlined"
                                />
                            )} />
                   </Grid>
                   <Grid item md={2}>
                       <Autocomplete
                            id="combo-box-demo"
                            options={this.choice}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Select Option"
                                  variant="outlined"
                                />
                            )} />
                   </Grid>
                   <Grid item md={2}>
                    
                   </Grid>
                   <Grid item md={2}>
                       <h6>Focus 4</h6>
                   </Grid>
                   <Grid item md={2}>
                       <Autocomplete
                            id="combo-box-demo"
                            options={this.choice}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Select Option"
                                  variant="outlined"
                                />
                            )} />
                   </Grid>
                   <Grid item md={2}>
                       <Autocomplete
                            id="combo-box-demo"
                            options={this.choice}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Select Option"
                                  variant="outlined"
                                />
                            )} />
                   </Grid>
                   <Grid item md={2}>
                       <Autocomplete
                            id="combo-box-demo"
                            options={this.choice}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Select Option"
                                  variant="outlined"
                                />
                            )} />
                   </Grid>
                   <Grid item md={2}>
                       <Autocomplete
                            id="combo-box-demo"
                            options={this.choice}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
                            size="small"
                            renderInput={(params) => (
                                <TextField
                                  {...params}
                                //   helperText={}
                                  label="Select Option"
                                  variant="outlined"
                                />
                            )} />
                   </Grid>
                   <Grid item md={2}>
                      
                   </Grid>
               </Grid>
               <Grid style={{padding:"1%"}}>
                   <Autocomplete
                            id="combo-box-demo"
                            options={this.choice}
                            getOptionLabel={(option) => option.title}
                            // value={}
                            fullWidth
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
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
  return {
    quarterPlan : state.PgaReducer.quarterPlan,
    starterPackDetails : state.PgaReducer.starterPackDetails
  }
}

export default connect(mapStateToProps, {getQuarterPlanByType, getAllStarterPack})(Pgaplan)