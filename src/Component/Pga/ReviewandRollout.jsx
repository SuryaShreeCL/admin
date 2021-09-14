import React, { Component } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import axios from 'axios';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {URL} from "../../Actions/URL"
export default class ReviewandRollout extends Component {
    constructor(){
        super();
            this.state={
              isChecked:false,
              shown:false,
              snackOpen: false,
            snackMessage: null,
            snackVariant: null,
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
        console.log(this.props.id)
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
                <Button style={{margin:"1%"}} variant="contained" color="primary" 
                onClick={
                    ()=>{
                        axios.get(URL+"/api/v1/students/"+this.props.id+"/reviewAndRoll?view=false")
                        .then(result=>{
                            this.handleClose()
                            this.setState({
                                snackMessage : "Data Saved",
                                snackVariant : "success",
                                snackOpen : true
                            })
                        })
                        .catch(error=>{
                            console.log(error)
                        })
                    }
                } 
                >
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
                      <Button variant="outlined" color="primary"
                       onClick={
                           ()=>{
                            axios.get(URL+"/api/v1/students/"+this.props.id+"/reviewAndRoll?view=true")
                            .then(result=>{
                                this.handleClose()
                                this.setState({
                                    snackMessage : "Data Saved",
                                    snackVariant : "success",
                                    snackOpen : true
                                })
                                console.log(result)
                            })
                            .catch(error=>{
                                console.log(error)
                            })
                           }
                       }
                       >
                        Agree
                      </Button>
                   </DialogActions>
               </Dialog>
               <Snackbar
          open={this.state.snackOpen}
          autoHideDuration={3000}
          onClose={() => this.setState({ snackOpen: false })}
        >
          <Alert
            variant="filled"
            onClose={() => this.setState({ snackOpen: false })}
            severity={this.state.snackVariant}
          >
            {this.state.snackMessage}
          </Alert>
        </Snackbar>
           </div>
        )
    }
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
