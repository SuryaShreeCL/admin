import React, { Component } from 'react'
import { connect } from "react-redux";
import {
    Grid, Paper,Dialog, DialogTitle , Typography, Checkbox, FormControlLabel, CircularProgress ,TextField, IconButton, createMuiTheme, ThemeProvider, Tooltip, Button, DialogContent, DialogActions
} from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';
import Loader from '../Testimonials/components/controls/Loader';
import {getStudentsById} from "../../Actions/Student"
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {updateAccountStatus, updateVerificationStatus} from "../../Actions/AdminAction"
import EditRoundedIcon from '@material-ui/icons/EditRounded';
export class AccountStatus extends Component {
    constructor(props){
        super(props);
        this.state = {
            StudentDetails : null,
            isActive : false,
            provider : null,
            providerHelperTxt : '',
            status : this.status[1],
            misMatchDetails : null,
            letEdit : false,
            snackOpen: false,
            snackMessage: null,
            snackVariant: null,
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
               isActive : this.props.StudentDetails.isactive,
               provider : this.props.StudentDetails.provider !== null ? {title : this.props.StudentDetails.provider, value : this.props.StudentDetails.provider} : null
             })
         }
         if(this.props.updateAccStatusResponse !== prevProps.updateAccStatusResponse){
            this.setState({
                snackVariant: "success",
                snackMessage: "Modified Successfully",
                snackOpen: true,
              });
         }  
         if(this.props.updateVerificationResponse !== prevProps.updateVerificationResponse){
            this.setState({
                snackVariant: "success",
                snackMessage: "Status Updated Successfully",
                snackOpen: true,
              });
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
        { title: "Verified", value: "verified" },
        { title: "Not Verified", value: "Notverified" },
        { title: "Mismatch", value: "mismatched" },
      ];

    //Change Handler

   handleChange = (e) =>{
    this.setState({[e.target.name] : e.target.value})
   }

   // Render Provider

   provider = [
       {title : "Local", value : "Local"},
       {title : "Google", value : "Google"}
   ]

   // Submit Handler

   handleSubmit = () =>{
       let helper = "Please Fill The Required Feild"
       this.state.provider === null ? this.setState({providerHelperTxt : helper}) : this.setState({providerHelperTxt : ''})
       if(
        this.state.provider !== null
       ){
        let obj = {
            provider: this.state.provider.value,
            isActive: this.state.isActive,
          };
          this.props.updateAccountStatus(this.props.id,obj)
       }
   }

   // Status Update
   
   handleStatusUpdate = () =>{
    if(this.state.status !== null){
        let obj = {
            student: {
              id: this.props.id,
            },
            section: {
              name: "accountstatus",
            },
            remark: this.state.misMatchDetails,
            status: this.state.status.value,
            updateDate: null,
          };
        console.log(obj)
        this.props.updateVerificationStatus(obj)
        this.setState({
          misMatchDetails : null,
        })
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
                <Grid item md={2} style={divStyle} alignItems="center">
              <Autocomplete
                  id="combo-box-demo"
                  options={this.status}
                  value={this.state.status}
                  fullWidth
                  onChange={(e, newValue) =>
                    this.setState({ status: newValue })
                  }
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      label="Verification Status"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>

              {this.state.status !== null &&
              this.state.status.value === "mismatched" ? 
              <>
              <Grid item md={7} style={divStyle} alignItems="center">
              <TextField
                        fullWidth
                        size="small"
                        onChange={(e) => this.handleChange(e)}
                        name={"misMatchDetails"}
                        value={this.state.misMatchDetails}
                        variant="outlined"
                        label={"Remark"}
                      />
                </Grid>
              <Grid item md={2} style={divStyle} alignItems="center"> 
              <Button variant="outlined" onClick={this.handleStatusUpdate} color="primary" size="small">
                    Update Status
                  </Button>
              </Grid>
              </>
              :
              <Grid item md={9} style={divStyle} alignItems="center">
              <Button variant="outlined" onClick={this.handleStatusUpdate} color="primary" size="small">
                    Update Status
                  </Button>
              </Grid>
                
                }

              <Grid item md={1} style={divStyle} alignItems="center">
              <Tooltip arrow title="Edit" aria-label="Edit">
                  <IconButton onClick={() => this.setState({ letEdit: true })}>
                    <EditRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            
               <Grid item md={6} style={divStyle} alignItems="center" justify="center">
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={this.state.isActive}
                        disabled={this.state.letEdit === false ? true : false}
                        onChange={(e)=>this.setState({isActive : e.target.checked})}
                        name="isActive"
                        color="primary"
                    />
                    }
                    label="Is Active"
                />
                </Grid>
                <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"Provider:"}</Typography>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.provider}
                  value={this.state.provider}
                  style={{ width: "60%" }}
                  disabled={this.state.letEdit === false ? true : false}
                  name={"provider"}
                  size="small"
                  onChange={(e, newValue) =>
                    this.setState({ provider: newValue })
                  }
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={this.state.providerHelperTxt}
                      label="Provider"
                      variant="outlined"
                    />
                  )}
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
      updateAccStatusResponse : state.AdminReducer.updateAccStatusResponse,
      updateVerificationResponse : state.AdminReducer.updateVerificationResponse
    };
  };
  
  export default connect(mapStateToProps, { getStudentsById, updateAccountStatus, updateVerificationStatus })(AccountStatus);
  