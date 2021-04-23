import { Divider, Grid, Icon, IconButton, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { Component } from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { TurnedInSharp } from '@material-ui/icons';

export default class Pgaplan extends Component {
  constructor(props){
    super(props);
    this.state = {
         option:""
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

   handleChange=(e,value)=>{
     this.setState({
       option:value.title
     })
   }

   componentDidUpdate(prevProps,prevState){
    //  if( prevState.option !== this.state.option ){
    //     let index = this.choice.findIndex(item => item.title === this.state.option)
    //     let slicedvalue = this.choice.slice(index,1)
    //     console.log(slicedvalue)
    //  }
    if(prevState.option !== this.state.option ){
      this.choice=this.choice.filter((value)=> this.state.option !== value)
      console.log(this.choice)
  
    }
  }

    render() {
      // console.log(this.choice.findIndex(item => item.title === "Option 1"))
      console.log(this.state.option)
        return (
            <div>
                <h5 style={{padding :"1%"}}>Starter Pack Course</h5>
                <Grid container spacing={2} style={{padding:"1%"}}>
                    <Grid item md={2}>
                        <TextField
                        variant="outlined"
                        size="small"
                        value="Ambitious"
                        disabled
                        label="Career Track" />
                    </Grid>
                    <Grid item md={2}>
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
                    <Grid item md={2}>
                        <Autocomplete
                           id="combo-box-demo"
                        options={this.choice}
                        getOptionLabel={(option) => option.title}
                        value={this.state.option}
                        onChange={this.handleChange}
                        fullWidth
                        size="small"
                        renderInput={(params) => (
                            <TextField
                              {...params}
                            //   helperText={}
                              label="Starter Pack Course 1"
                              variant="outlined"
                            />
                        )}
                         />
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
                              label="Starter Pack Course 2"
                              variant="outlined"
                            />
                        )}
                         />
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
                              label="Starter Pack Course 3"
                              variant="outlined"
                            />
                        )}
                         />  
                    </Grid>
                    <Grid item md={2}>
                    <IconButton>
                             <Icon>
                                 <AddCircleIcon />
                             </Icon>
                         </IconButton> 
                    </Grid>
                    <Grid item md={2}>
                        <TextField
                        variant="outlined"
                        size="small"
                        value="Balanced"
                        disabled
                        label="Career Track" />
                    </Grid>
                    <Grid item md={2}>
                        <Autocomplete
                           id="combo-box-demo"
                           options={this.specialization}
                           getOptionLabel={(option) => option.title}
                        // value={}
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
                              label="Starter Pack Course 1"
                              variant="outlined"
                            />
                        )}
                         />
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
                              label="Starter Pack Course 2"
                              variant="outlined"
                            />
                        )}
                         />
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
                              label="Starter Pack Course 3"
                              variant="outlined"
                            />
                        )}
                         />  
                    </Grid>
                    <Grid item md={2}>
                    <IconButton>
                             <Icon>
                                 <AddCircleIcon/>
                             </Icon>
                         </IconButton> 
                    </Grid>
                    <Grid item md={2}>
                        <TextField
                        variant="outlined"
                        size="small"
                        value="Casual"
                        disabled
                        label="Career Track" />
                    </Grid>
                    <Grid item md={2}>
                        <Autocomplete
                           id="combo-box-demo"
                           options={this.specialization}
                           getOptionLabel={(option) => option.title}
                        // value={}
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
                              label="Starter Pack Course 1"
                              variant="outlined"
                            />
                        )}
                         />
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
                              label="Starter Pack Course 2"
                              variant="outlined"
                            />
                        )}
                         />
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
                              label="Starter Pack Course 3"
                              variant="outlined"
                            />
                        )}
                         />  
                    </Grid>
                    <Grid item md={2}>
                    <IconButton>
                             <Icon>
                                 <AddCircleIcon />
                             </Icon>
                         </IconButton> 
                    </Grid>
                    <Grid item md={2}>
                        <TextField
                        variant="outlined"
                        size="small"
                        value="Exploratory"
                        disabled
                        label="Career Track" />
                    </Grid>
                    <Grid item md={2}>
                        <Autocomplete
                           id="combo-box-demo"
                           options={this.specialization}
                           getOptionLabel={(option) => option.title}
                        // value={}
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
                              label="Starter Pack Course 1"
                              variant="outlined"
                            />
                        )}
                         />
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
                              label="Starter Pack Course 2"
                              variant="outlined"
                            />
                        )}
                         />
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
                              label="Starter Pack Course 3"
                              variant="outlined"
                            />
                        )}
                         />  
                    </Grid>
                    <Grid item md={2}>
                    <IconButton>
                             <Icon>
                                 <AddCircleIcon />
                             </Icon>
                         </IconButton> 
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
