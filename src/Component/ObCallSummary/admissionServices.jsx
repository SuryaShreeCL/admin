import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import RoomIcon from "@material-ui/icons/Room";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PrimaryButton from "../../Utils/PrimaryButton";
import {connect} from 'react-redux'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Slide,
  Button,
  IconButton,
  Typography,
  TextField,
} from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Autocomplete } from "@material-ui/lab";
import { ExpandMore } from "@material-ui/icons";
import { isEmptyString } from "../Validation";
import {getAllMentors} from "../../Actions/AdminAction"
import {getStudentsById} from '../../Actions/Student'
import {getstudentMapping,getproductdetails,updateallocatementor} from '../../Actions/MentorAction'
import MySnackBar from "../MySnackBar";
class AdmissionServices extends Component {
  constructor() {
    super();
    this.state = {
      disable: false,
      disable2: false,
      show: false,
      mentorErr: "",
      mentor: "",
      enrollmentdate : "",
      snackmsg :"",
      snackvariant : "",
      snackopen : false
    };
  }
  handleClick(e) {
    this.setState({ disable: !this.state.disable });
  }

  allocate = () => {
    isEmptyString(this.state.mentor)
      ? this.setState({ mentorErr: "Field Required" })
      : this.setState({ mentorErr: ""});
      let obj = {
        "id": "3",
        "name": this.state.mentor.name,
        "department":"mentor",
        "calendarId":this.state.mentor.calendarId
        }
        console.log(obj)
    this.props.updateallocatementor(obj)
    this.setState({ 
        show: false,
        snackmsg : "Updated Successfully",
        snackvariant : "success",
        snackopen : true
    })
  };
 
  componentDidMount(){
    this.props.getAllMentors()
    this.props.getstudentMapping(this.props.match.params.studentId)
    this.props.getStudentsById(this.props.match.params.studentId)
    this.props.getproductdetails()
    if(this.props.studentDetails.mentor !== null){
        this.setState({
            mentor : this.props.studentDetails.mentor
        })
    }
  }
  handleallocate=()=>{
    this.setState({ show: true })
  }
  render() {
      console.log(this.props.studentDetails)
      console.log(this.state)
    return (
      <div style={{ padding: 25 }}>
           {this.props.getstudentMappingList.length > 0 &&
        <div
          style={{
            color: "#0081FF",
            fontSize: 18,
            fontWeight: 600,
            fontFamily: "Poppins",
          }}
        >
          CareerLabs - Student Mapping
        </div>
  }
        <TableContainer>
          <Table>
            <TableHead>
                {/* {this.props.getstudentMappingList.length > 0 && */}
              <TableRow>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                >
                  No
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                >
                  Role
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                >
                  Employee Name
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                >
                  Allocated By
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                >
                  Allocated At
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                ></TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                ></TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                ></TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                ></TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                >
                  {" "}
                  <Button
                    style={{
                      width: 300,
                      borderRadius: 20,
                      textTransform: "none",
                    }}
                    variant="contained"
                    color="primary"
                    // startIcon={<AddIcon />}
                    onClick={() => this.handleallocate()}
                  >
                    Allocate Mentor
                  </Button>
                </TableCell>
              </TableRow>
              {/* } */}
            </TableHead>
            <TableBody>
                {this.props.getstudentMappingList.length > 0 && this.props.getstudentMappingList.map((eachdata,index)=>
                     <TableRow>
                     <TableCell
                       align="center"
                       style={{
                         color: "#000000",
                         fontWeight: 400,
                         fontSize: 14,
                         fontFamily: "Montserrat",
                         borderBottom: "none",
                       }}
                     >
                       {index+1}
                     </TableCell>
                     <TableCell
                       align="center"
                       style={{
                         color: "#000000",
                         fontWeight: 400,
                         fontSize: 14,
                         fontFamily: "Montserrat",
                         borderBottom: "none",
                       }}
                     >
                      {eachdata.Role}
                     </TableCell>
     
                     <TableCell
                       align="center"
                       style={{
                         color: "#000000",
                         fontWeight: 400,
                         fontSize: 14,
                         fontFamily: "Montserrat",
                         borderBottom: "none",
                       }}
                     >
                      {eachdata.EmployeeName}
                     </TableCell>
                     <TableCell
                       align="center"
                       style={{
                         color: "#000000",
                         fontWeight: 400,
                         fontSize: 14,
                         fontFamily: "Montserrat",
                         borderBottom: "none",
                       }}
                     >
                       {/* Mayur Dhade */}
                     </TableCell>
                     <TableCell
                       align="center"
                       style={{
                         color: "#000000",
                         fontWeight: 400,
                         fontSize: 14,
                         fontFamily: "Montserrat",
                         borderBottom: "none",
                       }}
                     >
                       {/* DD/MM/YYYY HH:MM */}
                     </TableCell>
                   </TableRow>
                    )}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            color: "#0081FF",
            fontSize: 18,
            fontWeight: 600,
            fontFamily: "Poppins",
          }}
        >
          Product Details
        </div>
        <TableContainer>
          <Table>
            <TableHead>
                {this.props.getproductdetailsList.length > 0 && 
              <TableRow>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                >
                  No
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                >
                  Order ID
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                >
                  Product Family
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                >
                  Product Variant
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                >
                  Enrollment Date
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                >
                  Expiry Date
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                >
                  End of Service
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "#000000",
                    fontWeight: 400,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                >
                  BDA Name
                </TableCell>
              </TableRow>
  }
            </TableHead>
            <TableBody>
                {this.props.getproductdetailsList.length > 0 && this.props.getproductdetailsList.map((eachdata,index)=>
                  { 
                    let enrollmentdate = new Date(eachdata.EnrollmentDate).getDate()
                    let enrollmentmonth = new Date(eachdata.EnrollmentDate).getMonth()+1
                    let enrollmentyear =  new Date(eachdata.EnrollmentDate).getFullYear()
                    let enrollment = eachdata.EnrollmentDate !== null ? enrollmentdate+"/"+enrollmentmonth+"/"+enrollmentyear : null
                      return(
                        <TableRow>
                        <TableCell
                          align="center"
                          style={{
                            color: "#000000",
                            fontWeight: 400,
                            fontSize: 14,
                            fontFamily: "Montserrat",
                            borderBottom: "none",
                          }}
                        >
                          {index+1}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: "#000000",
                            fontWeight: 400,
                            fontSize: 14,
                            fontFamily: "Montserrat",
                            borderBottom: "none",
                          }}
                        >
                          {eachdata.OrderId}
                        </TableCell>
        
                        <TableCell
                          align="center"
                          style={{
                            color: "#000000",
                            fontWeight: 400,
                            fontSize: 14,
                            fontFamily: "Montserrat",
                            borderBottom: "none",
                          }}
                        >
                         {eachdata.ProductFamily}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: "#000000",
                            fontWeight: 400,
                            fontSize: 14,
                            fontFamily: "Montserrat",
                            borderBottom: "none",
                          }}
                        >
                         {eachdata.ProductVariant}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: "#000000",
                            fontWeight: 400,
                            fontSize: 14,
                            fontFamily: "Montserrat",
                            borderBottom: "none",
                          }}
                        >
                          {enrollment}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: "#000000",
                            fontWeight: 400,
                            fontSize: 14,
                            fontFamily: "Montserrat",
                            borderBottom: "none",
                          }}
                        >
                          {eachdata.ExpiryDate}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: "#000000",
                            fontWeight: 400,
                            fontSize: 14,
                            fontFamily: "Montserrat",
                            borderBottom: "none",
                          }}
                        >
                          {eachdata.["End Of service Date"]}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: "#000000",
                            fontWeight: 400,
                            fontSize: 14,
                            fontFamily: "Montserrat",
                            borderBottom: "none",
                          }}
                        >
                          {eachdata.["BDA Name"]}
                        </TableCell>
                      </TableRow>

                      )
                  }
                     
                    )}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "15%",
          }}
        >
          <PrimaryButton
            // onClick={() => this.handleSave()}
            style={{ textTransform: "none" }}
            variant={"contained"}
            color={"primary"}
            size={"small"}
          >
            Save changes
          </PrimaryButton>
          <Dialog
            maxWidth="xs"
            fullWidth={true}
            // TransitionComponent={Transition}
            open={this.state.show}
            onClose={() => this.setState({ show: false })}
            aria-labelledby="customized-dialog-title"
          >
            <DialogTitle id="customized-dialog-title">
              <div className="flex-1 text-center"></div>
              <div
                className="model-close-button"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
              </div>
            </DialogTitle>
            <DialogContent>
              <Typography
                style={{
                  fontWeight: "bold",
                  paddingBottom: "10%",
                  fontFamily: "Poppins",
                  fontSize: 24,
                }}
              >
                Mentor Allocation
              </Typography>

              <div style={{ paddingBottom: "5%" }}>
                {/* <InputLabel id="demo-simple-select-label">Select Mentor From Dropdown</InputLabel> */}
                <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  value={this.state.mentor}
                  onChange={(e, newValue) => {
                      console.log(newValue)
                    this.setState({ mentor: newValue });
                  }}
                  options={this.props.mentorList}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Mentor From Dropdown"
                      variant="standard"
                      error={this.state.mentorErr.length > 0}
                      helperText={this.state.mentorErr}
                    />
                  )}
                />
              </div>
              <div
                style={{
                  fontFamily: "Montserrat",
                  fontSize: 14,
                  fontStyle: "italic",
                }}
              >
                <b>Note:</b>
                Allocating the mentor will push the user to PGA Stage and Enable
                access for Call Scheduling tool.
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "15%",
                  paddingBottom: "10%",
                }}
              >
                <PrimaryButton
                  style={{ textTransform: "none" }}
                  variant={"contained"}
                  color={"primary"}
                  onClick={() => this.allocate()}
                >
                  Allocate
                </PrimaryButton>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <MySnackBar 
        snackMsg={this.state.snackmsg}
        snackVariant={this.state.snackvariant}
        snackOpen={this.state.snackopen}
        onClose={() => this.setState({ snackopen: false })}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        mentorList : state.AdminReducer.mentorList,
        studentDetails : state.StudentReducer.StudentList,
        getstudentMappingList : state.MentorReducer.getstudentMapping,
        getproductdetailsList : state.MentorReducer.getproductdetails,
        updateallocatementorList : state.MentorReducer.updateallocatementor
    };
  };
  
  export default connect(mapStateToProps, {
    getAllMentors,getStudentsById,getstudentMapping,getproductdetails,updateallocatementor
  })(AdmissionServices);
