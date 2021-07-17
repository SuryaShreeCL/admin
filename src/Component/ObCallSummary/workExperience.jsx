import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import RoomIcon from "@material-ui/icons/Room";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { ExpandMore } from "@material-ui/icons";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  createMuiTheme, ThemeProvider 
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import PrimaryButton from "../../Utils/PrimaryButton";
import Warning from "../../Asset/Images/warningImg.png";
import Pencil from "../../Asset/Images/pencil.png";
import DateFnsUtils from "@date-io/date-fns";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {getworkexp,updateworkexp} from '../../Actions/Calldetails'
import {connect} from 'react-redux'

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      root: {
        whiteSpace: "nowrap",
        fontSize: "12px",
      },
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: "0px",
        marginBottom: "0px",
      },
    },
  }
})
class workExperience extends Component {
  constructor() {
    super();
    this.state = {
      disable: true,
      startDate: null,
      startDateErr: "",
      endDate: null,
      endDateErr: "",
      employmentType: "",
      employmentTypeErr: "",
      organization: "",
      organizationErr: "",
      description: "",
      descriptionErr: "",
      role:'',
      roleErr:'',
      month : "",
      id:"",
      professional : [
        {
          id: null,
          employmentType: null,
          organization: null,
          role: null,
          description: null,
          startDate: null,
          endDate: null,
        }
      ]
    };
  }
  componentDidMount(){
    this.props.getworkexp(this.props.match.params.studentId)
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.getworkexpList !== prevProps.getworkexpList){
      console.log("Hello")
        this.setState({
         professional : this.props.getworkexpList,
        })
    }
    if(this.state.professional !== prevState.professional){
      this.state.professional.map(item=>
        this.setState({
          organization :  item.organization,
          startDate : item.startDate,
          endDate : item.endDate,
          employmentType : item.employmentType,
          role :item.role,
          id: item.id,
          description :item.description
        })
        ) 
    }
  }
  handleClick(e) {
    this.setState({ disable: !this.state.disable });
  }
  // onChange(event, index) {    
  //   let items = this.state.professional;
  //   var item = {
  //     ...items[index],
  //     [event.target.name]: event.target.value,
  //   };
  //   items[index] = item;
  //   this.setState({
  //     professional: items,
  //     [event.target.name.concat(`Err${index}`)]: "",
  //   });
  // }

  // onDropDownValue = (name, value, index, id) => {
  //   if (value !== null) {
  //     let items = this.state.professional;
  //     let item = {
  //       ...items[index],
  //       id: id,
  //       [name]: value.value,
  //     };
  //     items[index] = item;
  //     this.setState({ professional: items, [name.concat(`Err${index}`)]: "" });
  //   }
  // };
  handleSave() {
    
    console.log(this.state)
    var error = false;
    for (let i = 0; i < this.state.professional.length; i++) {
      for (const [key, value] of Object.entries(this.state.professional[i])) {        
        if (value === "") {
          error = true;
          this.setState({
            [key.concat(`Err${i}`)]: `Please fill the required field`,
          });
        }
       if (value === null) {
          error = true;
          this.setState({
            [key.concat(`Err${i}`)]: `Please fill the required field`,
          });
        }
      }
     
    }
    console.log(error)
    // if(error === false){
        console.log(this.state)
        console.log(this.state.professional)
         var tempArr = this.state.professional
         this.props.getworkexpList.length !== 0 && this.props.getworkexpList.map((eachData,index)=>{
           tempArr.push(eachData)
         })
         console.log(tempArr)
        //  this.props.updateworkexp(tempArr);

        
    // console.log(this.state);
    // let hlptxt = "Please fill the required field";
    // this.state.startDate === null
    //   ? this.setState({ startDateErr: hlptxt })
    //   : this.setState({ startDateErr: "" });
    // this.state.endDate === null
    //   ? this.setState({ endDateErr: hlptxt })
    //   : this.setState({ endDateErr: "" });
    // this.state.jobType === ""
    //   ? this.setState({ jobTypeErr: hlptxt })
    //   : this.setState({ jobTypeErr: "" });
    // this.state.jobDescp === ""
    //   ? this.setState({ jobDescpErr: hlptxt })
    //   : this.setState({ jobDescpErr: "" });
    // this.state.organization === ""
    //   ? this.setState({ organizationErr: hlptxt })
    //   : this.setState({ organizationErr: "" });
    //   this.state.designation === ""
    //   ? this.setState({ designationErr: hlptxt })
    //   : this.setState({ designationErr: "" });
    //   if(
    //     this.state.startDate !== null &&
    //     this.state.endDate !== null &&
    //     this.state.jobType !== "" &&
    //     this.state.jobDescp !== "" &&
    //     this.state.organization !== "" &&
    //     this.state.designation !== ""
    //   ){
        let obj= this.state.professional
        this.props.updateworkexp(this.props.match.params.studentId,obj)
      }

  employeeType = [
    {title : "FULL_TIME", value : "Full-time"},
    {title : "PART_TIME", value : "Part-time"},
    {title : "SELF_EMPLOYED", value : "Self-employed"},
    {title : "FREELANCE", value : "freelance"},
    {title : "INTERNSHIP", value : "Internship"},
    {title : "TRAINEE", value : "Trainee"},
  ]

  render() {
    console.log(this.state);
    console.log(this.props.getworkexpList)
    // console.log(new Date(this.state.startDate).setMonth(new Date(this.state.startDate).getMonth()+3))
    return (
      <div style={{ padding: 25 }}>
        <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "13%",
              }}
            >
              <p
                style={{
                  fontStyle: "Poppins",
                  fontWeight: "600",
                  fontStyle: "normal",
                  fontSize: "18px",
                  color: "#0081FF",
                }}
              >
                Work Experience
              </p>
              <img
                src={Warning}
                height={17}
                width={17}
                style={{ position: "realative", top: 5 }}
              />
            </div>
            <IconButton onClick={this.handleClick.bind(this)}>
              <img src={Pencil} height={17} width={17} />
            </IconButton>
          </div>
          <div style={{ paddingTop: 10 }}>
            {this.state.professional.length !== 0 && this.state.professional.map((item,index)=> {
                var months = ["January", "Febuary", "March", "April", "May", "June", "July","August","September","October","November","December"];
                var startmonthName = months[new Date(item.startDate).getMonth()];
                var endMonthName = months[new Date(item.endDate).getMonth()];
              return(
                <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    {item.role} ,
                    <div style={{ fontSize: 10, paddingTop: "2%" }}>
                      {" "}
                      {item.organization}
                    </div>
                  </div>
  
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      paddingLeft: "50%",
                    }}
                  >
                    {" "}
                    {item.month} Months ({startmonthName} {new Date(item.startDate).getFullYear()}-{endMonthName} {new Date(item.endDate).getFullYear()})
                  </div>
                </AccordionSummary>
  
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item md={3}>
                    <Autocomplete
                              popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                              id="combo-box-demo"
                              value={item.employmentType}
                              options={this.employeeType}
                              onChange={(e,newValue)=>this.setState({ employmentType : newValue})}
                              getOptionLabel={(option) => option.title}
                              renderInput={(params) => (
                                  <TextField {...params}
                                   label="Employment Type"
                                   variant="standard"  
                                  //  value={item.employmentType || ''}
                                  // error={ this.state.[`employmentTypeErr${index}`] ? this.state.[`employmentTypeErr${index}`].length > 0 :false}
                                  // helperText={this.state.[`employmentTypeErr${index}`]}
                                  />
                              )}
                          />
                    </Grid>
                    <Grid item md={3}>
                      <TextField
                        id="standard-basic"
                        label="Organisation"
                        value={item.organization}
                        onChange={(e, newValue) => 
                          this.setState({
                             
                          })
                        }
                        error={this.state.organizationErr.length > 0}
                        helperText={this.state.organizationErr}
                        // error={this.state.[`organizationErr${index}`] ? this.state.[`organizationErr${index}`].length > 0 :false}
                        // onChange={(e) =>this.onChange(e,index)}
                        // helperText={this.state.[`organizationErr${index}`]}
                        // value={item.organization || ""}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    
  
                    <Grid item md={3}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Start Date"
                        format="yyyy-MM"
                        views={["year", "month"]}
                        inputProps={{ readOnly: true }}
                        error={this.state.startDateErr.length > 0}
                        helperText={this.state.startDateErr}
                        value={this.state.startDate}
                        onChange={(e, newValue) =>
                          this.setState({ startDate: newValue, startDateErr:'' })
                        }
                        // error={this.state.[`startDateErr${index}`] ? this.state.[`startDateErr${index}`].length > 0 :false}
                        // helperText={this.state.[`startDateErr${index}`]}
                        // onChange={(date) =>this.onChange({target:{name:"startDate",value:date}},index)}
                        // value={item.startDate || ""}
                       InputLabelProps={{
                          shrink: true,
                        }}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="End Date"
                        format="yyyy-MM"
                        views={["year", "month"]}
                        // disabled={this.state.startDate === null}
                        minDate={this.state.startDate}
                        error={this.state.endDateErr.length > 0}
                        helperText={this.state.endDateErr}
                        // inputProps={{ readOnly: true }}
                        value={item.endDate}
                        onChange={(e, newValue) =>
                          this.setState({ endDate: newValue , endDateErr:'' })
                        }
                        // error={this.state.[`endDateErr${index}`] ? this.state.[`endDateErr${index}`].length > 0 :false}
                        // helperText={this.state.[`endDateErr${index}`]}
                        // onChange={(date) =>this.onChange({target:{name:"endDate",value:date}},index)}
                        // value={item.endDate || ""}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <TextField
                        id="standard-multiline-static"
                        label="Designation"
                        value={item.role}
                        onChange={(e, newValue) =>
                          this.setState({
                              role: e.target.value,
                              roleErr: "",
                          })
                        }
                        error={this.state.roleErr.length > 0}
                        helperText={this.state.roleErr}
                        // error={this.state.[`roleErr${index}`] ? this.state.[`roleErr${index}`].length > 0 :false}                        
                        // onChange={(e) =>this.onChange(e,index)}
                        // helperText={this.state.[`roleErr${index}`]}
                        // value={item.role || ""}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item md={8}>
                      <TextField
                        id="standard-multiline-static"
                        label="Job Description"
                        multiline
                        value={item.description}
                        onChange={(e, newValue) =>
                          this.setState({
                            description: e.target.value,
                            descriptionErr: "",
                          })
                        }
                        error={this.state.descriptionErr.length > 0}
                        helperText={this.state.descriptionErr}
                        // error={this.state.[`descriptionErr${index}`] ? this.state.[`descriptionErr${index}`].length > 0 :false}
                        // helperText={this.state.[`descriptionErr${index}`]}
                        // onChange={(e) =>this.onChange(e,index)}
                        // value={item.description || ""}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              )
            }
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "15%",
              textTransform: "none",
            }}
          >
            <PrimaryButton
              onClick={() => this.handleSave()}
              variant={"contained"}
              color={"primary"}
              style={{ textTransform: "none" }}
            >
              Save Changes
            </PrimaryButton>
          </div>
        </MuiPickersUtilsProvider>
        </ThemeProvider>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    getworkexpList : state.CallReducer.getworkexp,
    updateworkexpList : state.CallReducer.updateworkexp
  };
};

export default connect(mapStateToProps, {
 getworkexp,updateworkexp
})(workExperience);
