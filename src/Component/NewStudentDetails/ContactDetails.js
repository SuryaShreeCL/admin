import React, { Component } from 'react'
import { connect } from "react-redux";
import {
    Grid, Paper,Dialog, DialogTitle , Typography, CircularProgress ,TextField, IconButton, createMuiTheme, ThemeProvider, Tooltip, Button, DialogContent, DialogActions
} from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';
import Loader from '../Testimonials/components/controls/Loader';
import {getStudentsById} from "../../Actions/Student"
import EditRoundedIcon from '@material-ui/icons/EditRounded';
export class ContactDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            StudentDetails : null,
            altEmailId : null,
            altMailHelperTxt : '',
            eMail : null,
            eMailHelperTxt : '',
            phoneNumber : null,
            phoneHelperTxt : '',
            altPhoneNumber : null,
            altPhoneHelperTxt : '',
            linkedInProfile : null,
            linkedInHelperTxt : '',
            city : null,
            cityHelperTxt : '',
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
                altEmailId : this.props.StudentDetails.altEmailId,
                eMail : this.props.StudentDetails.emailId,
                altPhoneNumber : this.props.StudentDetails.altPhoneNumber,
                phoneNumber : this.props.StudentDetails.phoneNumber,
                linkedInProfile : this.props.StudentDetails.linkedInProfile,
                city : this.props.StudentDetails.city
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

   // Submit Handler

   handleSubmit = () =>{
       if(
           this.state.eMail !== null && this.state.eMail.length !== 0 &&
           this.state.altEmailId !== null && this.state.altEmailId.length !== 0 &&
           this.state.phoneNumber !== null && this.state.phoneNumber.length !== 0 &&
           this.state.altPhoneNumber !== null && this.state.altPhoneNumber.length !== 0 &&
           this.state.linkedInProfile !== null && this.state.linkedInProfile.length !== 0 &&
           this.state.city !== null && this.state.city.length !== 0
       ){
        let obj = {
          emailId: this.state.eMail,
          altEmailId: this.state.altEmailId,
          phoneNumber: this.state.phoneNumber,
          altPhoneNumber: this.state.altPhoneNumber,
          city: {
            id: this.state.city,
          },
        };
       }
   }
    render() {
        const {divStyle, textStyle, divContainer} = style
        console.log(this.props.StudentDetails)
        return (
            <div>
                {this.state.StudentDetails !== null ?
                <ThemeProvider theme={this.theme}>
                <Grid container spacing={2} style={divContainer}>
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
                <Typography color="primary" style={textStyle} variant="subtitle1">{"E-Mail ID:"}</Typography>
                <TextField
                variant="outlined"  
                size="small"
                onChange={(e)=>this.handleChange(e)}
                name={"eMail"}
                helperText={this.state.eMailHelperTxt}
                disabled={this.state.letEdit=== false ? true : false}
                label="E-Mail"
                value={this.state.eMail}
                />     
                </Grid>
                <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"Alt E-Mail ID:"}</Typography>
                <TextField
                variant="outlined"  
                size="small"
                onChange={(e)=>this.handleChange(e)}
                helperText={this.state.altMailHelperTxt}
                name={"altEmailId"}
                disabled={this.state.letEdit=== false ? true : false}
                label="Alt E-Mail ID"
                value={this.state.altEmailId}
                />
                </Grid>
                <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"Phone Number:"}</Typography>
                <TextField
                variant="outlined"  
                size="small"
                helperText={this.state.phoneHelperTxt}
                onChange={(e)=>this.handleChange(e)}
                name={"phoneNumber"}
                disabled={this.state.letEdit=== false ? true : false}
                label="Phone Number"
                value={this.state.phoneNumber}
                />     
                </Grid>
                <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"Alt Phone Number:"}</Typography>
                <TextField
                variant="outlined"  
                size="small"
                onChange={(e)=>this.handleChange(e)}
                name={"altPhoneNumber"}
                helperText={this.state.altPhoneHelperTxt}
                disabled={this.state.letEdit=== false ? true : false}
                label="Alt Phone Number"
                value={this.state.altPhoneNumber}
                />     
               </Grid>
               <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"Linked In Profile:"}</Typography>
                <TextField
                variant="outlined"  
                size="small"
                helperText={this.state.linkedInHelperTxt}
                onChange={(e)=>this.handleChange(e)}
                name={"linkedInProfile"}
                disabled={this.state.letEdit=== false ? true : false}
                label="Linked In Profile"
                value={this.state.linkedInProfile}
                />     
                </Grid>
                <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"City:"}</Typography>
                <TextField
                variant="outlined"  
                size="small"
                helperText={this.state.cityHelperTxt}
                onChange={(e)=>this.handleChange(e)}
                name={"city"}
                disabled={this.state.letEdit=== false ? true : false}
                label="City"
                value={this.state.city}
                />     
                </Grid>
                <Grid item md={12} style={divStyle} justify="flex-end">
                <Button
                 variant="outlined" 
                size="small" 
                onClick={this.handleSubmit}
                disabled={this.state.letEdit=== false ? true : false}
                color="primary">
                   Submit
                  </Button> 
                </Grid>
                </Grid>
                </ThemeProvider>
                : 
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "65vh",
              }}>
           <Loader />
             </div>
                }
               
            </div>
        )
    }
}
const style = {
    divStyle : {
        display : "flex",
    },
    divContainer : {
        padding : "1% 2%"
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
  
  export default connect(mapStateToProps, { getStudentsById })(ContactDetails);
  