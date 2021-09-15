import {
  Button, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, TextField, Typography
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ExpandMore } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React, { Component } from "react";
import { connect } from 'react-redux';
import { getAllMentors } from "../../Actions/AdminAction";
import { getmentor, getproductdetails, updateallocatementor, updatementor } from '../../Actions/MentorAction';
import { getStudentsById } from '../../Actions/Student';
import PrimaryButton from "../../Utils/PrimaryButton";
import MySnackBar from "../MySnackBar";
import { isEmptyString } from "../Validation";
class AdmissionServices extends Component {
  constructor() {
    super();
    this.state = {
      disable: false,
      disable2: false,
      show: false,
      mentorErr: "",
      mentor: {},
      enrollmentdate : "",
      snackmsg :"",
      snackvariant : "",
      snackopen : false,
      mentorname : ""
    };
  }
  handleClick(e) {
    // this.setState({ disable: !this.state.disable });
  }

  allocate = () => {
    isEmptyString(this.state.mentor)
      ? this.setState({ mentorErr: "Field Required" })
      : this.setState({ mentorErr: ""});
      if(this.state.mentor !== null && this.state.mentor !== undefined){
        let obj = {
          "id": this.state.mentor.id,
          "name": this.state.mentor.name,
          "department":this.state.mentor.department,
          "calendarId":this.state.mentor.calendarId
          }
          console.log(obj)
      this.props.updatementor( this.props.match.params.studentId,this.props.match.params.productId,obj)
      this.setState({ 
          show: false,
          snackmsg : "Updated Successfully",
          snackvariant : "success",
          snackopen : true
      })
      }
  };
 componentDidUpdate(prevProps,prevState){
   if(this.props.getmentorList !== prevProps.getmentorList){
       this.setState({
         mentor : this.props.getmentorList
       })
   }
 }
  componentDidMount(){
    this.props.getAllMentors()
    this.props.getStudentsById(this.props.match.params.studentId)
    this.props.getproductdetails(this.props.match.params.studentId)
    if(this.props.studentDetails.mentor !== null){
        this.setState({
            mentorname : this.props.studentDetails.mentor
        })
    }
    this.props.getmentor(this.props.match.params.studentId)
  }
  handleallocate=()=>{
    this.setState({ show: true })
  }
  render() {
      console.log(this.props)
      console.log(this.state)
    return (
      <div style={{ padding: 25 }}>
           {this.props.getproductdetailsList.length !== 0 && this.props.getproductdetailsList.studentMapping.length > 0 &&
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
                {this.props.getproductdetailsList.length !== 0 && this.props.getproductdetailsList.studentMapping.length > 0 &&
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
                      width: 230,
                      borderRadius: 20,
                      textTransform: "none",
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleallocate()}
                  >
                    Allocate Mentor
                  </Button>
                </TableCell>
              </TableRow>
               }
            </TableHead>
            <TableBody>
                {this.props.getproductdetailsList.length !== 0 && this.props.getproductdetailsList.studentMapping.length > 0 && this.props.getproductdetailsList.studentMapping.map((eachdata,index)=>{
                  let date = new Date(eachdata.allocatedAt).getDate()
                  let month = new Date(eachdata.allocatedAt).getMonth()+1
                  let year = new Date(eachdata.allocatedAt).getFullYear()
                  let time = new Date(eachdata.allocatedAt).toLocaleTimeString()
                  let newallocatedat = new Date(eachdata.allocatedAt) !== null ? date+"/"+month+"/"+year+" "+time : ""
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
                     {eachdata.Name}
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
                      {eachdata.allocatedBy}
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
                      {newallocatedat}
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
                {this.props.getproductdetailsList.length !== 0 && this.props.getproductdetailsList.product.length !== 0 &&
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
                {this.props.getproductdetailsList.length !== 0 && this.props.getproductdetailsList.product.length !== 0 && this.props.getproductdetailsList.product.map((eachdata,index)=>
                  { 
                    let enrollmentdate = new Date(eachdata.EnrollmentDate).getDate()
                    let enrollmentmonth = new Date(eachdata.EnrollmentDate).getMonth()+1
                    let enrollmentyear =  new Date(eachdata.EnrollmentDate).getFullYear()
                    let enrollment = eachdata.EnrollmentDate !== null ? enrollmentdate+"/"+enrollmentmonth+"/"+enrollmentyear : null
                    let expirydate = new Date(eachdata.ExpiryDate).getDate()
                    let expirymonth = new Date(eachdata.ExpiryDate).getMonth()
                    let expiryyear = new Date(eachdata.ExpiryDate).getFullYear()
                    let newexpiry = eachdata.ExpiryDate ? expirydate+"/"+expirymonth+"/"+expiryyear : null
                    let eosdate = new Date(eachdata.["End Of service Date"]).getDate()
                    let eosmonth = new Date(eachdata.["End Of service Date"]).getMonth()
                    let eosyear = new Date(eachdata.["End Of service Date"]).getFullYear()
                    let neweos = eachdata.["End Of service Date"] !== null ? eosdate+"/"+eosmonth+"/"+eosyear : null
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
                          {newexpiry}
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
                          {neweos}
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
          <Dialog
            maxWidth="xs"
            fullWidth={true}
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
                <Autocomplete
                  popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                  id="combo-box-demo"
                  value={this.state.mentor}
                  onChange={(e, newValue) => {
                      console.log(newValue)
                    this.setState({ mentor: newValue });
                  }}
                  options={this.props.mentorList}
                  getOptionLabel={(option) => {
                    console.log(option);
                    return option.name;
                  }}
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
        updateallocatementorList : state.MentorReducer.updateallocatementor,
        getmentorList : state.MentorReducer.getmentor
    };
  };
  
  export default connect(mapStateToProps, {
    getAllMentors,getStudentsById,getproductdetails,updateallocatementor,getmentor,updatementor
  })(AdmissionServices);