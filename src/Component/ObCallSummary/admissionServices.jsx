import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ExpandMore } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllMentors, deletementor } from "../../Actions/AdminAction";
import {
  getmentor,
  getproductdetails,
  updateallocatementor,
  updatementor,
} from "../../Actions/MentorAction";
import { getStudentsById } from "../../Actions/Student";
import PrimaryButton from "../../Utils/PrimaryButton";
import MySnackBar from "../MySnackBar";
import { isEmptyString, isEmptyObject } from "../Validation";
import { StudentStepDetails } from "../../Actions/Student";
import { getdashboarddetails } from "../../Actions/ProfileGapAction";
import { getVariantStepsById } from "../../Actions/ProductAction";
import "../../Asset/All.css";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
class AdmissionServices extends Component {
  constructor() {
    super();
    this.state = {
      disable: false,
      disable2: false,
      show: false,
      mentorErr: "",
      mentor: {},
      enrollmentdate: "",
      snackmsg: "",
      snackvariant: "",
      snackopen: false,
      mentorname: "",
      buttonstatus: false,
      verifydetail: [],
      mentordetails: {},
      selectedMentor: {},
      isLoading: false,
    };
  }
  handleClick(e) {
    // this.setState({ disable: !this.state.disable });
  }

  allocate = () => {
    this.setState({ isLoading: true });
    isEmptyString(this.state.selectedMentor)
      ? this.setState({ mentorErr: "Field Required" })
      : this.setState({ mentorErr: "" });
    if (
      this.state.selectedMentor !== null &&
      this.state.selectedMentor !== undefined
    ) {
      let obj = {
        id: this.state.selectedMentor.id,
        name: this.state.selectedMentor.name,
        department: this.state.selectedMentor.department,
        calendarId: this.state.selectedMentor.calendarId,
      };

      this.props.updatementor(
        this.props.match.params.studentId,
        this.props.match.params.productId,
        obj,
        (response) => {
          if (response.status === 200) {
            this.setState({
              show: false,
              isLoading: false,
              snackmsg: "Updated Successfully",
              snackvariant: "success",
              snackopen: true,
            });
            this.props.StudentStepDetails(
              this.props.match.params.studentId,
              this.props.match.params.productId
            );
            this.props.getVariantStepsById(
              this.props.match.params.productId +
                `?studentId=${this.props.match.params.studentId}`
            );
            this.props.getmentor(
              this.props.match.params.studentId,
              this.props.match.params.productId,
              (response) => {
                if (response.data.success === true) {
                  this.setState({
                    mentor: response.data.data,
                  });
                }
                if (response.data.success === false) {
                  this.setState({
                    mentor: {},
                  });
                }
              }
            );
          }
        }
      );
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.getmentorList !== prevProps.getmentorList) {
      if (
        this.props.getmentorList !== null ||
        !isEmptyString(this.props.getmentorList)
      ) {
        if (this.props.getmentorList.success === true) {
          this.setState({
            mentor: this.props.getmentorList.data,
          });
        }
      }
    }
    if (this.state.verifydetail !== prevState.verifydetail) {
      for (
        let i = 0;
        this.state.verifydetail[i] &&
        this.state.verifydetail[i].status === "NotVerified";
        i++
      ) {
        this.setState({
          buttonstatus: true,
        });
      }
    }
  }
  componentDidMount() {
    this.props.getAllMentors();
    this.props.getStudentsById(this.props.match.params.studentId);
    this.props.getproductdetails(this.props.match.params.studentId);
    if (this.props.studentDetails.mentor !== null) {
      this.setState({
        mentorname: this.props.studentDetails.mentor,
      });
    }
    this.props.getmentor(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      (response) => {
        if (response.data.success === true) {
          this.setState({
            mentor: response.data,
          });
        }
        if (response.data.success === false) {
          this.setState({
            mentor: {},
          });
        }
      }
    );
    this.props.getdashboarddetails(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      (response) => {
        if (response.status === 200) {
          for (
            let i = 0;
            i < response.data.onboardingVerificationStatus.length;
            i++
          ) {
            if (
              response.data.onboardingVerificationStatus[i] &&
              response.data.onboardingVerificationStatus[i].status ===
                "NotVerified"
            ) {
              return this.setState({
                buttonstatus: true,
              });
            }
          }
        } else {
          this.setState({
            snackmsg: "Something Went Wrong",
            snackvariant: "error",
            snackopen: true,
            buttonstatus: true,
          });
        }
      }
    );
  }
  handleallocate = () => {
    this.setState({ show: true });
  };
  handleDelete = () => {
    this.props.deletementor(
      this.props.match.params.studentId,
      this.props.match.params.productId,
      (response) => {
        if (response.status === 200) {
          this.setState({
            snackMsg: response.message,
            snackOpen: true,
            snackVariant: "success",
          });
          this.props.getmentor(
            this.props.match.params.studentId,
            this.props.match.params.productId,
            (response) => {
              if (response.data.success === true) {
                this.setState({
                  mentor: response.data,
                });
              }
              if (response.data.success === false) {
                this.setState({
                  mentor: {},
                });
              }
            }
          );
        }
      }
    );
  };
  render() {
    return (
      <div style={{ padding: 25 }}>
        {this.props.getproductdetailsList.length !== 0 &&
          this.props.getproductdetailsList.studentMapping.length > 0 && (
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
          )}
        <TableContainer>
          <Table>
            <TableHead>
              {this.props.getproductdetailsList.length !== 0 &&
                this.props.getproductdetailsList.studentMapping.length > 0 && (
                  <TableRow>
                    <TableCell
                      align='center'
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
                      align='center'
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
                      align='center'
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
                      align='center'
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
                      align='center'
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
                      align='center'
                      style={{
                        color: "#000000",
                        fontWeight: 400,
                        fontSize: 14,
                        fontFamily: "Montserrat",
                      }}
                    ></TableCell>
                    <TableCell
                      align='center'
                      style={{
                        color: "#000000",
                        fontWeight: 400,
                        fontSize: 14,
                        fontFamily: "Montserrat",
                      }}
                    ></TableCell>
                    <TableCell
                      align='center'
                      style={{
                        color: "#000000",
                        fontWeight: 400,
                        fontSize: 14,
                        fontFamily: "Montserrat",
                      }}
                    ></TableCell>
                    <TableCell
                      align='center'
                      style={{
                        color: "#000000",
                        fontWeight: 400,
                        fontSize: 14,
                        fontFamily: "Montserrat",
                      }}
                    ></TableCell>
                    {/* <TableCell
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
                    disabled={this.state.buttonstatus}
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleallocate()}
                  >
                    Allocate Mentor
                  </Button>
                </TableCell> */}
                  </TableRow>
                )}
            </TableHead>
            <TableBody>
              {this.props.getproductdetailsList.length !== 0 &&
                this.props.getproductdetailsList.studentMapping.length > 0 &&
                this.props.getproductdetailsList.studentMapping.map(
                  (eachdata, index) => {
                    let date = new Date(eachdata.allocatedAt).getDate();
                    let month = new Date(eachdata.allocatedAt).getMonth() + 1;
                    let year = new Date(eachdata.allocatedAt).getFullYear();
                    let time = new Date(
                      eachdata.allocatedAt
                    ).toLocaleTimeString();
                    let newallocatedat =
                      new Date(eachdata.allocatedAt) !== null
                        ? date + "/" + month + "/" + year + " " + time
                        : "";
                    return (
                      <TableRow>
                        <TableCell
                          align='center'
                          style={{
                            color: "#000000",
                            fontWeight: 400,
                            fontSize: 14,
                            fontFamily: "Montserrat",
                            borderBottom: "none",
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          align='center'
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
                          align='center'
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
                          align='center'
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
                          align='center'
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
                    );
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
              {this.props.getproductdetailsList.length !== 0 &&
                this.props.getproductdetailsList.product.length !== 0 && (
                  <TableRow>
                    <TableCell
                      align='center'
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
                      align='center'
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
                      align='center'
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
                      align='center'
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
                      align='center'
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
                      align='center'
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
                      align='center'
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
                      align='center'
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
                )}
            </TableHead>
            <TableBody>
              {this.props.getproductdetailsList.length !== 0 &&
                this.props.getproductdetailsList.product.length !== 0 &&
                this.props.getproductdetailsList.product.map(
                  (eachdata, index) => {
                    let endOfServiceDate = eachdata["End Of service Date"];

                    return (
                      <TableRow>
                        <TableCell
                          align='center'
                          style={{
                            color: "#000000",
                            fontWeight: 400,
                            fontSize: 14,
                            fontFamily: "Montserrat",
                            borderBottom: "none",
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          align='center'
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
                          align='center'
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
                          align='center'
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
                          align='center'
                          style={{
                            color: "#000000",
                            fontWeight: 400,
                            fontSize: 14,
                            fontFamily: "Montserrat",
                            borderBottom: "none",
                          }}
                        >
                          {moment(new Date(eachdata.EnrollmentDate)).format(
                            "MMM yyyy"
                          )}
                        </TableCell>
                        <TableCell
                          align='center'
                          style={{
                            color: "#000000",
                            fontWeight: 400,
                            fontSize: 14,
                            fontFamily: "Montserrat",
                            borderBottom: "none",
                          }}
                        >
                          {/* {eachdata.ExpiryDate} */}
                          {moment(new Date(eachdata.ExpiryDate)).format(
                            "MMM yyyy"
                          )}
                        </TableCell>
                        <TableCell
                          align='center'
                          style={{
                            color: "#000000",
                            fontWeight: 400,
                            fontSize: 14,
                            fontFamily: "Montserrat",
                            borderBottom: "none",
                          }}
                        >
                          {moment(new Date(endOfServiceDate)).format(
                            "MMM yyyy"
                          )}
                        </TableCell>
                        <TableCell
                          align='center'
                          style={{
                            color: "#000000",
                            fontWeight: 400,
                            fontSize: 14,
                            fontFamily: "Montserrat",
                            borderBottom: "none",
                          }}
                        >
                          {eachdata["BDA Name"]}
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Typography className={"blue_heading"}>Mentor Details</Typography>
          {this.state.mentor === null ||
          isEmptyString(this.state.mentor) ||
          isEmptyObject(this.state.mentor) ? (
            <PrimaryButton
              disabled={this.state.buttonstatus}
              variant='outlined'
              color='primary'
              onClick={() => this.handleallocate()}
              className={"mentorbutton"}
            >
              Allocate Mentor
            </PrimaryButton>
          ) : (
            <Table>
              <TableHead>
                <TableCell>Role</TableCell>
                <TableCell>Mentor Name</TableCell>
                <TableCell>Allocated By</TableCell>
                <TableCell>Allocated At</TableCell>
                <TableCell></TableCell>
              </TableHead>
              <TableBody>
                <TableCell>{this.state.mentor.department}</TableCell>
                <TableCell>{this.state.mentor.name}</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>07/10/2021 12:30:34 AM</TableCell>
                <TableCell>
                  {
                    <DeleteIcon
                      color={"secondary"}
                      onClick={(e) => this.handleDelete(e)}
                    />
                  }
                </TableCell>
              </TableBody>
            </Table>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "15%",
          }}
        >
          <Dialog
            maxWidth='xs'
            fullWidth={true}
            open={this.state.show}
            // onClose={() => this.setState({ show: false })}
            aria-labelledby='customized-dialog-title'
          >
            <DialogTitle id='customized-dialog-title'>
              <div className='flex-1 text-center'></div>
              <div
                className='model-close-button'
                style={{ display: "flex", justifyContent: "flex-end" }}
              ></div>
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
                  id='combo-box-demo'
                  value={this.state.mentor}
                  onChange={(e, newValue) => {
                    this.setState({ selectedMentor: newValue });
                  }}
                  options={this.props.mentorList}
                  getOptionLabel={(option) => {
                    return option.name;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Select Mentor From Dropdown'
                      variant='standard'
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
                  disabled={
                    this.state.selectedMentor === null ||
                    isEmptyString(this.state.selectedMentor) ||
                    isEmptyObject(this.state.selectedMentor) ||
                    this.state.isLoading === true
                  }
                  variant={"contained"}
                  color={"primary"}
                  onClick={() => this.allocate()}
                >
                  {this.state.isLoading && (
                    <CircularProgress
                      disableShrink
                      style={{
                        color: "#fff",
                        width: 20,
                        height: 20,
                        marginRight: 10,
                      }}
                    />
                  )}
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
    mentorList: state.AdminReducer.mentorList,
    studentDetails: state.StudentReducer.StudentList,
    getstudentMappingList: state.MentorReducer.getstudentMapping,
    getproductdetailsList: state.MentorReducer.getproductdetails,
    updateallocatementorList: state.MentorReducer.updateallocatementor,
    getmentorList: state.MentorReducer.getmentor,
    getdashboarddetailsList:
      state.ProfileGapAnalysisReducer.getdashboarddetails,
    StudentStepDetailsList: state.StudentReducer.StudentStepDetails,
    variantStepList: state.ProductReducer.variantStepList,
  };
};

export default connect(mapStateToProps, {
  getAllMentors,
  getStudentsById,
  getproductdetails,
  getVariantStepsById,
  updateallocatementor,
  getmentor,
  updatementor,
  getdashboarddetails,
  StudentStepDetails,
  deletementor,
})(AdmissionServices);
