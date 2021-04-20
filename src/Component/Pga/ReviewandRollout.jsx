import React, { Component } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core';

export default class ReviewandRollout extends Component {
    constructor(){
        super();{
            this.state={
              isChecked:false,
              shown:false
            }
        }
    }
    handleChange=()=>{
        this.setState({
            isChecked:true
        })
    }
    handleClick=()=>{
        this.setState({
            shown:true
        })
    }
    handleClose=()=>{
        this.setState({
            shown:false
        })
    }
    handleSaved=()=>{
        alert("Details Saved.. if you want Report, Click Release Report Button below...")
    }
    render() {
        console.log(this.props.StudentDetails)
        return (
            <div>
                <h6 style={{padding:"1%"}}>Starter Pack Courses Rollout</h6> 
                <div style={{padding:"1%",display:"flex",flexDirection:"column"}} >
                <FormControlLabel
                 value="first"
                 control={<Checkbox color="primary" />}
                 label="Starter Pack 1"
                 labelPlacement="end"
                 />
                   <FormControlLabel
                 value="second"
                 control={<Checkbox color="primary" />}
                 label="Starter Pack 2"
                 labelPlacement="end"
                 />
                   <FormControlLabel
                 value="third"
                 control={<Checkbox color="primary" />}
                 label="Starter Pack 3"
                 labelPlacement="end"
                 />
                </div>  
                <Button style={{margin:"1%"}} variant="contained" color="primary" onClick={this.handleSaved} >
                     Save But Dont Release
                 </Button>
                 <Button style={{margin:"1%"}} variant="contained" color="primary" onClick={this.handleClick}>
                     Release the Report
                 </Button>
               <Dialog open={this.state.shown} onClose={this.handleClose}>
                   <DialogTitle>
                      Release PGA Report
                   </DialogTitle>
                   <DialogContent>
                      Clicking the Agree button below will immediately release the PGA Report
                   </DialogContent>
                   <DialogActions>
                      <Button variant="outlined" color="secondary" onClick={this.handleClose}>
                       Disagree
                      </Button>
                      <Button variant="outlined" color="primary" onClick={this.handleClose}>
                        Agree
                      </Button>
                   </DialogActions>
               </Dialog>
           </div>
        )
    }
}


