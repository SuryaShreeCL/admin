import React, { Component } from 'react'
import { connect } from "react-redux";
import {
    Grid, Paper,Dialog, DialogTitle , Typography, TextField, IconButton, CircularProgress, createMuiTheme, ThemeProvider, Tooltip, Button, DialogContent, DialogActions
} from "@material-ui/core"
import Loader from '../Testimonials/components/controls/Loader';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {getAllColleges, getUniversity} from "../../Actions/College"
import {getStudentsById} from "../../Actions/Student"
import EditRoundedIcon from '@material-ui/icons/EditRounded';
export class EducationalDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            StudentDetails : null,
            ugDegree : null,
            ugDegreeHelperTxt : '',
            university : {},
            universityHelperTxt : '',
            college : {},
            collegeHelperTxt : '',
            expectedYear : null,
            expectedYearHelperTxt : '',
            backlogs : null,
            backlogsHelperTxt : '',
            clearBacklogs : null,
            clearBacklogHelperTxt : '',
            uggpaScale : null,
            uggpaScaleHelperTxt : '',
            uggpa : null,
            uggpaHelperTxt : '',
            sem : null,
            semHelperTxt : '',
            status : this.status[1],
            misMatchDetails : null,
            letEdit : false,
            dialogOpen : false,
        }
    }
    componentDidMount() {
        this.props.getStudentsById(this.props.id)
        this.props.getAllColleges()
        this.props.getUniversity()
    }   
    componentDidUpdate(prevProps, prevState) {
         if(this.props.StudentDetails !== prevProps.StudentDetails){
             this.setState({
                StudentDetails : this.props.StudentDetails,
                ugDegree : this.props.StudentDetails.ugDegree !== null ? this.props.StudentDetails.ugDegree.name : null,
                college : this.props.StudentDetails.college,
                university : this.props.StudentDetails.university,
                expectedYear : this.props.StudentDetails.expectedYrOfGrad,
                sem : this.props.StudentDetails.currentSem,
                backlogs : this.props.StudentDetails.noOfBacklogs,
                clearBacklogs : this.props.StudentDetails.noOfClearedBacklogs,
                uggpaScale : this.props.StudentDetails.uggpascale,
                uggpa : this.props.StudentDetails.uggpa,
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
                <Typography color="primary" style={textStyle} variant="subtitle1">{"UG Degree:"}</Typography>
                <TextField
                variant="outlined"  
                size="small"
                onChange={(e)=>this.handleChange(e)}
                name={"ugDegree"}
                disabled={this.state.letEdit=== false ? true : false}
                label="UG Degree"
                value={this.state.ugDegree}
                />     
                </Grid>
                <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"College:"}</Typography>
                <Autocomplete
                id="combo-box-demo"
                value={this.state.college}
                name={"college"}
                size="small"
                onChange={(e,newValue)=>console.log(newValue)}
                style={{width : "60%"}}
                disabled={this.state.letEdit=== false ? true : false}
                options={this.props.allCollegeList.length !== 0 ? this.props.allCollegeList : []}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="College" variant="outlined" />}
                />

                </Grid>
                <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"University:"}</Typography>
                <Autocomplete
                id="combo-box-demo"
                value={this.state.university}
                name={"university"}
                size="small"
                onChange={(e,newValue)=>console.log(newValue)}
                style={{width : "60%"}}
                disabled={this.state.letEdit=== false ? true : false}
                options={this.props.universityList.length !== 0 ? this.props.universityList : []}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="University" variant="outlined" />}
                />
                </Grid>
                <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"Expected Year Of Grad:"}</Typography>
                <TextField
                variant="outlined"  
                size="small"
                onChange={(e)=>this.handleChange(e)}
                name={"expectedYear"}
                disabled={this.state.letEdit=== false ? true : false}
                label="Expected Year Of Graduation"
                value={this.state.expectedYear}
                />     
               </Grid>
               <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"Current Sem:"}</Typography>
                <TextField
                variant="outlined"  
                size="small"
                onChange={(e)=>this.handleChange(e)}
                name={"sem"}
                disabled={this.state.letEdit=== false ? true : false}
                label="Current Sem"
                value={this.state.sem}
                />     
                </Grid>
                <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"No Of Backlogs:"}</Typography>
                <TextField
                variant="outlined"  
                size="small"
                onChange={(e)=>this.handleChange(e)}
                name={"backlogs"}
                disabled={this.state.letEdit=== false ? true : false}
                label="No Of Backlogs"
                value={this.state.backlogs}
                />     
                </Grid>
                <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"Cleared Backlogs:"}</Typography>
                <TextField
                variant="outlined"  
                size="small"
                onChange={(e)=>this.handleChange(e)}
                name={"clearBacklogs"}
                disabled={this.state.letEdit=== false ? true : false}
                label="No Of Backlogs"
                value={this.state.clearBacklogs}
                />     
                </Grid>
                <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"UGGPA Scale:"}</Typography>
                <TextField
                variant="outlined"  
                size="small"
                onChange={(e)=>this.handleChange(e)}
                name={"uggpaScale"}
                disabled={this.state.letEdit=== false ? true : false}
                label="UGGPA Scale"
                value={this.state.uggpaScale}
                />     
                </Grid>
                <Grid item md={6} style={divStyle} justify="space-between">
                <Typography color="primary" style={textStyle} variant="subtitle1">{"UGGPA:"}</Typography>
                <TextField
                variant="outlined"  
                size="small"
                onChange={(e)=>this.handleChange(e)}
                name={"uggpa"}
                disabled={this.state.letEdit=== false ? true : false}
                label="UGGPA"
                value={this.state.uggpa}
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
      allCollegeList : state.CollegeReducer.allCollegeList,
      universityList : state.CollegeReducer.University
    };
  };
  
  export default connect(mapStateToProps, { getStudentsById , getAllColleges, getUniversity})(EducationalDetails);
  