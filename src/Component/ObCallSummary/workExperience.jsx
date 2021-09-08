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
import { getDocumentList } from "../../Actions/Student";  
import {getworkexp,updateworkexp} from '../../Actions/Calldetails'
import {connect} from 'react-redux'
import Mysnack from '../MySnackBar'
import { viewStudentStatus ,updateVerificationStatus } from "../../Actions/AdminAction";
import Status from "../Utils/Status";
import { SECTION } from "../../Constant/Variables";
import Model from "../Utils/SectionModel";
import DoccumentCard from "../Utils/DoccumentCard";
import { URL } from "../../Actions/URL";

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
    MuiIconButton: {
      root: {
        color: "#1093FF",
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
          employmentType: {},
          organization: null,
          role: null,
          description: null,
          startDate: null,
          endDate: null,
        }
      ],
      snackmsg : "",
      snackvariant : "",
      snackopen : false,
      sectionStatus: {
        model: false,
        data: null,
        sectionName: "",
      },
    };
    
  }
  componentDidMount(){
    this.props.getworkexp(this.props.match.params.studentId)
    this.props.viewStudentStatus(this.props.match.params.studentId);
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
    if(this.props.updateworkexpList !== prevProps.updateworkexpList){
      this.props.getworkexp(this.props.match.params.studentId)
    }
  }
  handleClick(e) {
    this.setState({ disable: !this.state.disable });
  }
  onChange(event, index) {    
    let items = this.state.professional;
    var item = {
      ...items[index],
      [event.target.name]: event.target.value,
    };
    items[index] = item;
    this.setState({
      professional: items,
      [event.target.name.concat(`Err${index}`)]: "",
    });
  }

  onDropDownValue = (name, value, index, id) => {
    console.log(name,value)
    if (value !== null) {
      let items = this.state.professional;
      console.log(items)
      let item = {
        ...items[index],
        id: id,
        [name]: value.title,
      };
      console.log(item)
      items[index] = item;
      console.log(items)
      this.setState({ professional: items, [name.concat(`Err${index}`)]: "" });
      console.log(this.state.professional)
    }
    console.log(this.state.professional)
  };
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
        console.log(key.concat(`Err${i}`),value,error)
      }
    }
    console.log(error)
    if(error === false){
         var tempArr = this.state.professional
         console.log(tempArr)
        this.props.updateworkexp(this.props.match.params.studentId,tempArr)
        this.setState({
              snackmsg : "Updated Sucessfully",
              snackopen : true,
              snackvariant : "success"
            })
      }
      // else{
      //   this.setState({
      //     snackmsg : "Please Fill the required Field",
      //     snackopen : true,
      //     snackvariant : "error"
      //   })
      // }
    }

  employeeType = [
    {title : "FULL_TIME", value : "FULL_TIME"},
    {title : "PART_TIME", value : "PART_TIME"},
    {title : "SELF_EMPLOYED", value : "SELF_EMPLOYED"},
    {title : "FREELANCE", value : "FREELANCE"},
    {title : "INTERNSHIP", value : "INTERNSHIP"},
    {title : "TRAINEE", value : "TRAINEE"},
  ]

  getStatus = (sectionName) => {
    if (
      this.props.studentStatus &&
      this.props.studentStatus.length !== 0
    ) {
      const { studentStatus } = this.props;         
      return studentStatus.find((item) => item.sectionName === sectionName);
    } 
  };

  documentClick = (data) =>{
    console.log(data)
  
    window.open(URL+"/api/v1/cv/download/cv/"+data.studentId+"/"+data.path)
  }

  renderModel = () => (
    <Model
      data={this.state.sectionStatus}
      handleClose={() =>
        this.setState({
          sectionStatus: {
            ...this.state.sectionStatus,
            model: false,
          },
        })
      }
      section={this.state.sectionStatus}
      {...this.props}
    />
  );  

  render() {
    const { HeadStyle, GridStyle } = style;

    console.log(this.state);
    console.log(this.props)
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
              {/* <img
                src={Warning}
                height={17}
                width={17}
                style={{ position: "realative", top: 5 }}
              /> */}
               <Status
                      onClick={() => {
                        this.setState({
                          sectionStatus: {
                            model: true,
                            data: this.getStatus(SECTION.workExperience),
                            sectionName: SECTION.workExperience,
                          },
                        });
                      }}
                      status={
                        this.getStatus(SECTION.workExperience)
                          ? this.getStatus(SECTION.workExperience).status
                          : "notVerified"
                      }
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
                item.id !== null &&
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
                              value={{title : item.employmentType,value : item.employmentType} || ''}
                              options={this.employeeType}
                              onChange={(e, newValue) => this.onDropDownValue("employmentType",newValue,index,item.id)}                            
                              getOptionLabel={(option) =>{ 
                                console.log(option)
                                return option.title;
                              } }
                              renderInput={(params) => (
                                  <TextField {...params}
                                   label="Employment Type"
                                   variant="standard" 
                                   contentEditable={this.state.disable === false } 
                                  //  value={item.employmentType || ''}
                                  error={this.state.[`employmentTypeErr${index}`] !== undefined && this.state.[`employmentTypeErr${index}`] !== "" ? true :false}
                                  helperText={this.state.[`employmentTypeErr${index}`]}
                                  />
                              )}
                          />
                    </Grid>
                    <Grid item md={3}>
                      <TextField
                        id="standard-basic"
                        label="Organisation"
                        value={item.organization || ""}
                        error={this.state.organizationErr.length > 0}
                        helperText={this.state.organizationErr}
                        contentEditable={this.state.disable}
                        error={this.state.[`organizationErr${index}`] !== undefined && this.state.[`organizationErr${index}`] !== "" ? true :false}
                        onChange={(e) => this.state.disable === false && this.onChange({target:{name:"organization",value:e.target.value}},index)} 
                        helperText={this.state.[`organizationErr${index}`]}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    
  
                    <Grid item md={3}>
                      <KeyboardDatePicker
                        disableFuture
                        margin="normal"
                        id="date-picker-dialog"
                        label="Start Date"
                        format="MM/yyyy"
                        views={["year", "month"]}
                        inputProps={{ readOnly: true }}
                        error={this.state.startDateErr.length > 0}
                        helperText={this.state.startDateErr}
                        value={item.startDate || ""}
                        // onChange={(e, newValue) =>
                        //   this.setState({ startDate: newValue, startDateErr:'' })
                        // }
                        error={this.state.[`startDateErr${index}`] !== undefined && this.state.[`startDateErr${index}`] !== "" ? true : false}
                        helperText={this.state.[`startDateErr${index}`]}
                        onChange={(date) => this.state.disable === false && this.onChange({target:{name:"startDate",value:date}},index)}
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
                        disableFuture
                        margin="normal"
                        id="date-picker-dialog"
                        label="End Date"
                        format="MM/yyyy"
                        views={["year", "month"]}
                        contentEditable={this.state.disable}
                        minDate={this.state.professional[index].startDate}
                        error={this.state.[`endDateErr${index}`] !== undefined && this.state.[`endDateErr${index}`] !== "" ? true : false}
                        helperText={this.state.[`endDateErr${index}`]}
                        value={item.endDate || ""}
                        onChange={(date) => this.state.disable === false && this.onChange({target:{name:"endDate",value:date}},index)}
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
                        value={item.role || ""}
                        onChange={(e) =>this.state.disable === false && this.onChange({target:{name:"role",value:e.target.value}},index)} 
                        error={this.state.roleErr.length > 0}
                        helperText={this.state.roleErr}
                        error={this.state.[`roleErr${index}`] !== undefined && this.state.[`roleErr${index}`] !== "" ? true :false}                        
                        // onChange={(e) =>this.onChange(e,index)}
                        helperText={this.state.[`roleErr${index}`]}
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
                        value={item.description || ""}
                        contentEditable={this.state.disable}
                        onChange={(e) =>this.onChange({target:{name:"description",value:e.target.value}},index)} 
                        error={this.state.descriptionErr.length > 0}
                        helperText={this.state.descriptionErr}
                        error={this.state.[`descriptionErr${index}`] !== undefined && this.state.[`descriptionErr${index}`] !== "" ? true :false}
                        helperText={this.state.[`descriptionErr${index}`]}
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
          <Grid item md={12}>
                      <p style={HeadStyle}>Documents Received</p>
                      </Grid>
          <Grid item md={12}>
          {this.props.getAllDocumentList.CV && this.props.getAllDocumentList.CV.length !== 0 &&
                <Grid item md={12}>
                <Grid item md={12} direction="column">
                  <p style={GridStyle}>CV</p> 
                  </Grid>
                  <Grid item={12} container >
                  {this.props.getAllDocumentList.CV ? this.props.getAllDocumentList.CV.map(data =>
                   <Grid item md={4} direction="row" onClick = {()=>this.documentClick(data)}>
                  <DoccumentCard 
                  certificate={data.path}
                  date={data.uploadDate}
                  path={data.path}
                  studentid = {this.props.match.params.studentId}
                  // category = 'cv'
                  // id = {data.ieltsId}
                  // status={this.state.documentedit}
                  />
                   </Grid>
                  ) : null}
                  </Grid>
                  </Grid>
  }
          </Grid>

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
        <Mysnack
           snackMsg={this.state.snackmsg}
           snackVariant={this.state.snackvariant}
           snackOpen={this.state.snackopen}
           onClose={() => this.setState({ snackopen: false })}
        /> 
        {this.renderModel()}
        </ThemeProvider>
      </div>
    );
  }
}

const style = {
  HeadStyle: {
    paddingTop : "18px",
    fontStyle: "Poppins",
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: "18px",
    color: "#0081FF",
  },
  GridStyle: {
    fontStyle: "Montserrat",
    fontWeight: "700",
    fontStyle: "normal",
    fontSize: "16px",
    color: "#052A4E",
  },
}
const mapStateToProps = (state) => {
  return {
    getworkexpList : state.CallReducer.getworkexp,
    updateworkexpList : state.CallReducer.updateworkexp,
    studentStatus: state.AdminReducer.studentStatusResponse,
    getAllDocumentList: state.StudentReducer.getDocumentList,

  };
};

export default connect(mapStateToProps, {
 getworkexp,updateworkexp,
 viewStudentStatus,
  updateVerificationStatus,
  getDocumentList
})(workExperience);
