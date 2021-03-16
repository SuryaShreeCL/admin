import React, { Component } from 'react'
import { connect } from "react-redux";
import {
    Grid, Paper,Dialog, DialogTitle , Typography, TextField, IconButton, createMuiTheme, ThemeProvider, Tooltip, Button, DialogContent, DialogActions
} from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';

import {getStudentsById} from "../../Actions/Student"
import EditRoundedIcon from '@material-ui/icons/EditRounded';
export class PersonalDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            StudentDetails : null,
            studentId : null,
            firstName : null,
            lastName : null,
            fullName : null,
            eMail : null,
            phoneNumber : null,
            status : this.status[1],
            misMatchDetails : null,
            letEdit : false,
            dialogOpen : false,
        }
    }
    componentDidMount() {
        this.props.getStudentsById(this.props.id)
    }   
    componentDidUpdate(prevProps, prevState) {
         if(this.props.StudentDetails !== prevProps.StudentDetails){
             this.setState({
                StudentDetails : this.props.StudentDetails,
                studentId : this.props.StudentDetails.studentID,
                firstName : this.props.StudentDetails.firstName,
                lastName : this.props.StudentDetails.lastName,
                fullName : this.props.StudentDetails.fullName,
                eMail : this.props.StudentDetails.emailId,
                phoneNumber : this.props.StudentDetails.phoneNumber
             })
         }
    }
    theme = createMuiTheme({
        overrides : {
            MuiSvgIcon : {
                root : {
                    color : "#000"
                }
            }
        }
    })

    // Options

    status = [
        { title: 'Verified', value: 'verified' },
        { title: 'Not Verified', value: 'notVerified' },
        { title: 'Mismatch', value: 'misMatch' },
    ]

    //Change Handler

   handleChange = (e) =>{
    this.setState({[e.target.name] : e.target.value})
   }
    render() {
        const {divStyle, textStyle} = style
        console.log(this.props.StudentDetails)
        return (
            <div>
                {this.state.StudentDetails !== null ?
                <ThemeProvider theme={this.theme}>
                <Grid container spacing={2}>
                    <Grid item md={3} style={divStyle} alignItems="center" >
                    <Tooltip arrow title="Edit" aria-label="Edit">
                    <IconButton onClick={()=>this.setState({letEdit : true})}>
          <EditRoundedIcon  />
        </IconButton>
        </Tooltip>
         <Autocomplete
      id="combo-box-demo"
      options={this.status}
      value={this.state.status}
      fullWidth
      onChange={(e,newValue)=>this.setState({status : newValue})}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => <TextField {...params} size="small" label="Verification Status" variant="outlined" />}
    />
  
                    </Grid>
                    {this.state.status !== null && this.state.status.value === "misMatch" ? 
                    <Grid item md={7} style={divStyle} justify="space-between" alignItems="center">
                   {this.state.status !== null && this.state.status.value === "misMatch" ?
                   <>
                    {/* <Typography color="primary" style={textStyle} variant="subtitle1">{"Remark:"}</Typography> */}
                    <TextField
                    fullWidth
                    size="small"
                    onChange={(e)=>this.handleChange(e)}
                    name={"misMatchDetails"}
                    value={this.state.misMatchDetails}
                    variant="outlined"
                        label={"Remark"}
                        /> 
                      
                        </>
                        : null}
                    </Grid> : 
                    <Grid item md={7} style={divStyle} alignItems="center">
                             <Button variant="outlined" color="primary" size="small">
                            Update Status
                        </Button>
                    </Grid>

                }
                    <Grid item md={2} style={divStyle} alignItems="center">
                    {this.state.status !== null && this.state.status.value === "misMatch" ?
                    <Button variant="outlined" color="primary" size="small">
                            Update Status
                        </Button>
                        : null}
                    </Grid>
                <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"Sudent ID(CLS ID):"}</Typography>
                <TextField
                variant="outlined"  
                size="small"
                onChange={(e)=>this.handleChange(e)}
                name={"studentId"}
                label="Student ID"
                disabled={this.state.letEdit=== false ? true : false}
                value={this.state.studentId}
                />
                </Grid>
                <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"First Name:"}</Typography>
                <TextField
                variant="outlined"  
                size="small"
                onChange={(e)=>this.handleChange(e)}
                name={"firstName"}
                disabled={this.state.letEdit=== false ? true : false}
                label="First Name"
                value={this.state.firstName}
                />
                </Grid>
                <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"Last Name:"}</Typography>
                <TextField
                variant="outlined"  
                size="small"
                onChange={(e)=>this.handleChange(e)}
                name={"lastName"}
                label="Last Name"
                disabled={this.state.letEdit=== false ? true : false}
                value={this.state.lastName}
                />
                </Grid>
                <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"Full Name:"}</Typography>
                <TextField
                variant="outlined"  
                size="small"
                onChange={(e)=>this.handleChange(e)}
                name={"fullName"}
                disabled={this.state.letEdit=== false ? true : false}
                label="Full Name"
                value={this.state.fullName}
                />             
               </Grid>
                {/* <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"E-Mail ID:"}</Typography>
                <TextField
                variant="outlined"  
                size="small"
                onChange={(e)=>this.handleChange(e)}
                name={"eMail"}
                disabled={this.state.letEdit=== false ? true : false}
                label="E-Mail"
                value={this.state.eMail}
                />     
                </Grid>
                <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"Phone Number:"}</Typography>
                <TextField
                variant="outlined"  
                size="small"
                onChange={(e)=>this.handleChange(e)}
                name={"phoneNumber"}
                disabled={this.state.letEdit=== false ? true : false}
                label="Phone Number"
                value={this.state.phoneNumber}
                />     
                </Grid> */}
                <Grid item md={12} style={divStyle} justify="flex-end">
                <Button
                 variant="outlined" 
                size="small" 
                disabled={this.state.letEdit=== false ? true : false}
                color="primary">
                   Submit
                  </Button> 
                </Grid>
                </Grid>
                </ThemeProvider>
                : null}
                 {/* <Dialog onClose={()=>this.setState({status : {}})} aria-labelledby="simple-dialog-title" open={this.state.status === "misMatch" ? true : false}>
      <DialogTitle id="simple-dialog-title">Mention the mismatch here</DialogTitle>
      <DialogContent>
      <TextField
      label={"Enter the mismatch here"}
      multiline
      rows={4}
      />
      </DialogContent>
    <DialogActions>
        <Button
         variant="outlined"
          color="secondary"
           size="small">
            Done
        </Button>
    </DialogActions>
    </Dialog> */}
            </div>
        )
    }
}
const style = {
    divStyle : {
        display : "flex",
    },
    textStyle : {
        paddingRight : "1%",
        paddingLeft : "3%"
    }
}
const mapStateToProps = (state) => {
    return {
      StudentDetails: state.StudentReducer.StudentList,
    };
  };
  
  export default connect(mapStateToProps, { getStudentsById })(PersonalDetails);
  