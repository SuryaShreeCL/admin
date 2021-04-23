import { Divider, Grid, Icon, IconButton, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { Component } from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { TurnedInSharp } from '@material-ui/icons';
import IndeterminateCheckBoxRoundedIcon from "@material-ui/icons/IndeterminateCheckBoxRounded";

export default class Pgaplan extends Component {
  constructor(props){
    super(props);
    this.state = {
        ambitiousCount : 3,
        casualCount : 3,
        balancedCount : 3,
        exploCount : 3,
    }
  }
   choice=[
       {title:"Option 1"},
       {title:"Option 2"},
       {title:"Option 3"},
       {title:"Option 4"},
       {title:"Option 5"},
   ]
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
     {title:"Above Average"},
     {title:"Below Average"},
   ]
   renderAmbitious = () =>{
      let ambitiousArr = []
      for (let i=1;i<=this.state.ambitiousCount; i++){
        ambitiousArr.push({
          starterPack :  <Autocomplete
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
             label={"Starter Pack Course ".concat(i)}
             variant="outlined"
           />
       )}
        />
        })
      }
      return ambitiousArr.map(eachAmbitious=>{
        return(
          <Grid item md={4}>
            {eachAmbitious.starterPack}
          </Grid>
        )
      })
   }

   renderCasual = () =>{
    let casualArr = []
      for (let i=1;i<=this.state.casualCount; i++){
        casualArr.push({
          starterPack :  <Autocomplete
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
             label={"Starter Pack Course ".concat(i)}
             variant="outlined"
           />
       )}
        />
        })
      }
      return casualArr.map(eachCasual=>{
        return(
          <Grid item md={4}>
            {eachCasual.starterPack}
          </Grid>
        )
      })
   }

   renderBalanced = () =>{
    let balanceArr = []
    for (let i=1;i<=this.state.balancedCount; i++){
      balanceArr.push({
        starterPack :  <Autocomplete
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
           label={"Starter Pack Course ".concat(i)}
           variant="outlined"
         />
     )}
      />
      })
    }
    return balanceArr.map(eachBalance=>{
      return(
        <Grid item md={4}>
          {eachBalance.starterPack}
        </Grid>
      )
    })
   }

   renderExplo = () =>{
    let exploArr = []
    for (let i=1;i<=this.state.exploCount; i++){
      exploArr.push({
        starterPack :  <Autocomplete
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
           label={"Starter Pack Course ".concat(i)}
           variant="outlined"
         />
     )}
      />
      })
    }
    return exploArr.map(eachExplo=>{
      return(
        <Grid item md={4}>
          {eachExplo.starterPack}
        </Grid>
      )
    })
   }

    render() {
        return (
            <div>
                <h5 style={{padding :"1%"}}>Starter Pack Course</h5>
                <Grid container spacing={2} style={{padding:"1%"}}>
                    <Grid item md={4}>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                      <TextField
                        variant="outlined"
                        size="small"
                        value="Ambitious"
                        disabled
                        label="Career Track" />
                      </Grid>
                      <Grid item md={6}>
                      <Autocomplete
                           id="combo-box-demo"
                        options={this.specialization}
                        getOptionLabel={(option) => option.title}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Specialization"
                              variant="outlined"
                            />
                        )}
                         />
                      </Grid>
                    </Grid>
                    </Grid>
                    <Grid item md={7}>
                      <Grid container spacing={2}>
                      {this.renderAmbitious()}
                      </Grid>
                    </Grid>
                    <Grid item md={1}>
                      <Grid container spacing={2}>
                      <IconButton
                       onClick={()=>this.setState({ambitiousCount : this.state.ambitiousCount +1})}>
                             <Icon>
                                 <AddCircleIcon />
                             </Icon>
                         </IconButton> 
                         <IconButton 
                         disabled={this.state.ambitiousCount === 1}
                         onClick={()=>this.setState({ambitiousCount : this.state.ambitiousCount !== 1 ? this.state.ambitiousCount -1 : 1})}>
                           <IndeterminateCheckBoxRoundedIcon />
                         </IconButton>
                        
                      </Grid>
                    </Grid>
                    <Grid item md={4}>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                      <TextField
                        variant="outlined"
                        size="small"
                        value="Ambitious"
                        disabled
                        label="Career Track" />
                      </Grid>
                      <Grid item md={6}>
                      <Autocomplete
                           id="combo-box-demo"
                        options={this.specialization}
                        getOptionLabel={(option) => option.title}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Specialization"
                              variant="outlined"
                            />
                        )}
                         />
                      </Grid>
                    </Grid>
                    </Grid>
                    <Grid item md={7}>
                      <Grid container spacing={2}>
                      {this.renderCasual()}
                      </Grid>
                    </Grid>
                    <Grid item md={1}>
                      <Grid container spacing={2}>
                      <IconButton onClick={()=>this.setState({casualCount : this.state.casualCount +1})}>
                             <Icon>
                                 <AddCircleIcon />
                             </Icon>
                         </IconButton> 
                         <IconButton 
                         disabled={this.state.casualCount === 1}
                         onClick={()=>this.setState({casualCount : this.state.casualCount !== 1 ? this.state.casualCount -1 : 1})}>
                           <IndeterminateCheckBoxRoundedIcon />
                         </IconButton>
                      </Grid>
                    </Grid>
                    <Grid item md={4}>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                      <TextField
                        variant="outlined"
                        size="small"
                        value="Balanced"
                        disabled
                        label="Career Track" />
                      </Grid>
                      <Grid item md={6}>
                      <Autocomplete
                           id="combo-box-demo"
                        options={this.specialization}
                        getOptionLabel={(option) => option.title}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Specialization"
                              variant="outlined"
                            />
                        )}
                         />
                      </Grid>
                    </Grid>
                    </Grid>
                    <Grid item md={7}>
                      <Grid container spacing={2}>
                      {this.renderBalanced()}
                      </Grid>
                    </Grid>
                    <Grid item md={1}>
                      <Grid container spacing={2}>
                      <IconButton onClick={()=>this.setState({balancedCount : this.state.balancedCount +1})}>
                             <Icon>
                                 <AddCircleIcon />
                             </Icon>
                         </IconButton> 
                         <IconButton
                         disabled={this.state.balancedCount === 1}
                         onClick={()=>this.setState({balancedCount : this.state.balancedCount !== 1 ? this.state.balancedCount -1 : 1})}>
                           <IndeterminateCheckBoxRoundedIcon />
                         </IconButton>
                      </Grid>
                    </Grid>
                    <Grid item md={4}>
                    <Grid container spacing={2}>
                      <Grid item md={6}>
                      <TextField
                        variant="outlined"
                        size="small"
                        value="Exploratory"
                        disabled
                        label="Career Track" />
                      </Grid>
                      <Grid item md={6}>
                      <Autocomplete
                           id="combo-box-demo"
                        options={this.specialization}
                        getOptionLabel={(option) => option.title}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Specialization"
                              variant="outlined"
                            />
                        )}
                         />
                      </Grid>
                    </Grid>
                    </Grid>
                    <Grid item md={7}>
                      <Grid container spacing={2}>
                      {this.renderExplo()}
                      </Grid>
                    </Grid>
                    <Grid item md={1}>
                      <Grid container spacing={2}>
                      <IconButton onClick={()=>this.setState({exploCount : this.state.exploCount +1})}>
                             <Icon>
                                 <AddCircleIcon />
                             </Icon>
                         </IconButton> 
                         <IconButton 
                         disabled={this.state.exploCount === 1}
                         onClick={()=>this.setState({exploCount : this.state.exploCount !== 1 ? this.state.exploCount -1 : 1})}>
                           <IndeterminateCheckBoxRoundedIcon />
                         </IconButton>
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
