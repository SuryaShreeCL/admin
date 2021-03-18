import React, { Component } from 'react'
import { connect } from "react-redux";
import {
    Grid, Paper,Dialog, DialogTitle , Typography, Checkbox, FormControlLabel, CircularProgress ,TextField, IconButton, createMuiTheme, ThemeProvider, Tooltip, Button, DialogContent, DialogActions
} from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';
import Loader from '../Testimonials/components/controls/Loader';
import {getStudentsById} from "../../Actions/Student"
import EditRoundedIcon from '@material-ui/icons/EditRounded';
export class AccountStatus extends Component {
    constructor(props){
        super(props);
        this.state = {
            StudentDetails : null,
            isActive : false,
            provider : null,
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
               isActive : this.props.StudentDetails.isactive,
               provider : this.props.StudentDetails.provider
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
            
               <Grid item md={6} style={divStyle} alignItems="center" justify="center">
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={this.state.isActive}
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
                <TextField
                variant="outlined"  
                size="small"
                onChange={(e)=>this.handleChange(e)}
                name={"provider"}
                disabled={this.state.letEdit=== false ? true : false}
                label="Provider"
                value={this.state.provider}
                />     
                </Grid>
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
  
  export default connect(mapStateToProps, { getStudentsById })(AccountStatus);
  