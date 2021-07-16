import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import RoomIcon from "@material-ui/icons/Room";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Slide,
  TextField,
  Button,
  Dialog,
  DialogContent,
  Typography,
  createMuiTheme
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { ExpandMore } from "@material-ui/icons";
import Dropzone from "react-dropzone";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import PrimaryButton from "../../Utils/PrimaryButton";
import Warning from "../../Asset/Images/warningImg.png";
import { Link } from "react-router-dom";
import Pencil from "../../Asset/Images/pencil.png";
import { ThemeProvider } from "styled-components";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      // height: 0.1
    }}
  />
);
const theme = createMuiTheme({
    overrides : {
        MuiSvgIcon : {
            root : {
                color : "#1093FF"
            }
        }
    }
})

class GraduateTestResult extends Component {
  constructor() {
    super();
    var today = new Date(),
      date =
        today.getFullYear() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getDate();

    this.state = {
      disable: false,
      date: date,
      show: false,
      files: [],
      gmatshow: false,
      toeflshow: false,
      ieltsshow: false,
    };
  }
  handleClick(e) {
    // this.setState({ disable: !this.state.disable })
    this.setState({
      show: true,
    });
  }
  render() {
    return (
      <div style={{ padding: 25 }}>
          <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "18%",
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
              Graduate Test Details
            </p>
            <img
              src={Warning}
              height={17}
              width={17}
              style={{ position: "realative", top: 5 }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: "bold",
                paddingLeft: 15,
                paddingTop: 10,
              }}
            >
              GRE
            </div>
            <div>
              <IconButton onClick={() => this.handleClick("GRE")}>
                <img src={Pencil} height={17} width={17} />
              </IconButton>
            </div>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
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
                    Attempt #
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
                    Exam Date
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
                    Verbal Reasoning
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
                    Analytical Writing
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
                    Quantitative Reasoning
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
                    Total
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
                    Transcripts
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
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    {/* <TextField disabled={this.state.disable}/>           */}
                    1
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    {this.state.date}
                  </TableCell>

                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    60
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    40
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    40
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    220
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{ borderBottom: "none", cursor: "pointer" }}
                    onClick={() => console.log("hello")}
                  >
                    <div
                      style={{
                        color: "#407BFF",
                        fontSize: 18,
                        fontStyle: "italic",
                      }}
                    >
                      <Link>Access Here</Link>
                    </div>
                  </TableCell>
                  <TableCell style={{ borderBottom: "none" }}></TableCell>
                  <TableCell style={{ borderBottom: "none" }}></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: "bold",
                paddingLeft: 15,
                paddingTop: 10,
              }}
            >
              GMAT
            </div>
            <div>
              <IconButton onClick={() => this.setState({ gmatshow: true })}>
                <img src={Pencil} height={17} width={17} />
              </IconButton>
            </div>
          </div>

          <TableContainer>
            <Table>
              <TableHead>
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
                    Attempt #
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
                    Exam Date
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
                    Quantitative and Verbal
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      width: 20,
                    }}
                  >
                    Analytical Writing Assessment
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      width: 20,
                    }}
                  >
                    Completed Certificate
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      width: 20,
                    }}
                  >
                    Integrated Reasoning
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
                    Total
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
                    Transcripts
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    {/* <TextField disabled={this.state.disable}/>           */}
                    1
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    {this.state.date}
                  </TableCell>

                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    40
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    60
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    60
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    60
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    240
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{ borderBottom: "none" }}
                  >
                    <div style={{ color: "#407BFF", fontSize: 18 }}>
                      <div
                        style={{
                          color: "#407BFF",
                          fontSize: 18,
                          fontStyle: "italic",
                        }}
                      >
                        <Link>Access Here</Link>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: "bold",
                paddingLeft: 15,
                paddingTop: 10,
              }}
            >
              TOEFL
            </div>
            <div>
              <IconButton onClick={() => this.setState({ toeflshow: true })}>
                <img src={Pencil} height={17} width={17} />
              </IconButton>
            </div>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
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
                    Attempt #
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
                    Exam Date
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
                    Reading
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
                    Writing
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
                    Speaking{" "}
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
                    Listening
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
                    Total
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
                    Transcripts
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    {/* <TextField disabled={this.state.disable}/>           */}
                    1
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    {this.state.date}
                  </TableCell>

                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    60
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    60
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    60
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    60
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    220
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{ borderBottom: "none" }}
                  >
                    <div
                      style={{
                        color: "#407BFF",
                        fontSize: 18,
                        fontStyle: "italic",
                      }}
                    >
                      <div
                        style={{
                          color: "#407BFF",
                          fontSize: 18,
                          fontStyle: "italic",
                        }}
                      >
                        <Link>Access Here</Link>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: "bold",
                paddingLeft: 15,
                paddingTop: 10,
              }}
            >
              IELTS
            </div>
            <div>
              <IconButton onClick={() => this.setState({ ieltsshow: true })}>
                <img src={Pencil} height={17} width={17} />
              </IconButton>
            </div>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
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
                    Attempt #
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
                    Exam Date
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
                    Reading
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
                    Writing
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
                    Speaking{" "}
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
                    Listening
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
                    Total
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
                    Transcripts
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    {/* <TextField disabled={this.state.disable}/>           */}
                    1
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    {this.state.date}
                  </TableCell>

                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    60
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    60
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    60
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    40
                  </TableCell>
                  <TableCell
                    align="center"
                    contentEditable={this.state.disable}
                    style={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: 14,
                      fontFamily: "Montserrat",
                      borderBottom: "none",
                    }}
                  >
                    220
                  </TableCell>
                  <TableCell align="center" style={{ borderBottom: "none" }}>
                    <div
                      style={{
                        color: "#407BFF",
                        fontSize: 18,
                        fontStyle: "italic",
                      }}
                    >
                      <Link>Access Here</Link>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "5%",
            }}
          >
            <PrimaryButton
              variant={"contained"}
              color={"primary"}
              style={{ textTransform: "none" }}
            >
              Save Changes
            </PrimaryButton>
          </div>
          <Dialog
            open={this.state.show}
            onClose={() => this.setState({ show: false })}
            maxWidth="sm"
            fullWidth={true}
          >
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Typography
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: 18,
                      color: "#052A4E",
                      fontWeight: 600,
                    }}
                  >
                    GRE Score
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                    id="combo-box-demo"
                    fullWidth
                    // disabled={this.state.disable}
                    // options={this.props.getDegreeList}
                    // getOptionLabel={(option) => option.name}
                    //   style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Attempt"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Exam Date"
                    format="MM/dd/yyyy"
                    fullWidth
                    // value={this.state.endofservice}
                    // disabled
                    // onChange={(e, newValue) =>
                    //     this.setState({ endofservice: newValue })
                    // }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  {/* <TextField
                                        label="Quantative Reasoning"
                                        fullWidth
                                    /> */}
                  <TextField label="Quantative Reasoning" fullWidth />
                </Grid>
                <Grid item md={6}>
                  <TextField label="Verbal Reasoning " fullWidth />
                </Grid>
                <Grid item md={6}>
                  <TextField label="Total" fullWidth />
                </Grid>
                <Grid item md={6}>
                  <TextField label="Analytical Writing" fullWidth />
                </Grid>
                <Grid item md={6} sm={5} xs={5}>
                  <Dropzone onDrop={this.onDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <p
                          style={{
                            color: "#686868",
                            fontFamily: "Montserrat",
                            fontSize: "12px",
                          }}
                        >
                          Marksheet / Trasncripts
                        </p>
                        <div
                          style={{
                            height: "100px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            border: "1px dashed #1093FF",
                          }}
                          {...getRootProps({ className: "dropzone" })}
                        >
                          <input {...getInputProps()} />
                          <PublishRoundedIcon color="primary" />
                        </div>

                        <aside>
                          <p
                            style={{
                              color: "#686868",
                              fontFamily: "Montserrat",
                            }}
                          >
                            File size: less than 1MB | Format: PDF
                          </p>

                          {/* <ul>{this.state.finalFile !== null ? files : null}</ul> */}
                        </aside>
                      </section>
                    )}
                  </Dropzone>
                </Grid>
                <Grid item md={6} sm={6} xs={6}></Grid>
                <Grid item md={3}>
                  {/* <div style={{ display: 'flex', paddingTop: '10%', paddingBottom: '5% ' }}> */}
                  <PrimaryButton
                    color={"primary"}
                    variant={"contained"}
                    style={{ width: "130px", textTransform: "none" }}
                  >
                    Save
                  </PrimaryButton>
                  {/* </div> */}
                </Grid>
                <Grid item md={3}>
                  {/* <div style={{ display: 'flex', paddingTop: '10%', paddingBottom: '5% ', paddingLeft: '5%' }}> */}
                  <PrimaryButton
                    color={"primary"}
                    variant={"outlined"}
                    style={{ width: "130px", textTransform: "none" }}
                  >
                    Cancel
                  </PrimaryButton>
                  {/* </div> */}
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
          <Dialog
            open={this.state.gmatshow}
            onClose={() => this.setState({ gmatshow: false })}
          >
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Typography
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: 18,
                      color: "#052A4E",
                      fontWeight: 600,
                    }}
                  >
                    GMAT Score
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                    id="combo-box-demo"
                    fullWidth
                    // disabled={this.state.disable}
                    // options={this.props.getDegreeList}
                    // getOptionLabel={(option) => option.name}
                    //   style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Attempt"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Exam Date"
                    format="MM/dd/yyyy"
                    fullWidth
                    // value={this.state.endofservice}
                    // disabled
                    // onChange={(e, newValue) =>
                    //     this.setState({ endofservice: newValue })
                    // }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  {/* <TextField
                                        label="Quantative Reasoning"
                                        fullWidth
                                    /> */}
                  <TextField label="Quantative Verbal Reasoning" fullWidth />
                </Grid>
                <Grid item md={6}>
                  <TextField label="Analytical Writing Assessment" fullWidth />
                </Grid>
                <Grid item md={6}>
                  <TextField label="Integrated Reasoning" fullWidth />
                </Grid>
                <Grid item md={3}>
                  <TextField label="Verbal Reasoning" fullWidth />
                </Grid>
                <Grid item md={3}>
                  <TextField label="Total" fullWidth />
                </Grid>
                <Grid item md={6} sm={5} xs={5}>
                  <Dropzone onDrop={this.onDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <p
                          style={{
                            color: "#686868",
                            fontFamily: "Montserrat",
                            fontSize: "12px",
                          }}
                        >
                          Marksheet / Trasncripts
                        </p>
                        <div
                          style={{
                            height: "100px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            border: "1px dashed #1093FF",
                          }}
                          {...getRootProps({ className: "dropzone" })}
                        >
                          <input {...getInputProps()} />
                          <PublishRoundedIcon color="primary" />
                        </div>

                        <aside>
                          <p
                            style={{
                              color: "#686868",
                              fontFamily: "Montserrat",
                            }}
                          >
                            File size: less than 1MB | Format: PDF
                          </p>

                          {/* <ul>{this.state.finalFile !== null ? files : null}</ul> */}
                        </aside>
                      </section>
                    )}
                  </Dropzone>
                </Grid>
                <Grid item md={6} sm={6} xs={6}></Grid>
                <Grid item md={3}>
                  {/* <div style={{ display: 'flex', paddingTop: '10%', paddingBottom: '5% ' }}> */}
                  <PrimaryButton
                    color={"primary"}
                    variant={"contained"}
                    style={{ width: "130px", textTransform: "none" }}
                  >
                    Save
                  </PrimaryButton>
                  {/* </div> */}
                </Grid>
                <Grid item md={3}>
                  {/* <div style={{ display: 'flex', paddingTop: '10%', paddingBottom: '5% ', paddingLeft: '5%' }}> */}
                  <PrimaryButton
                    color={"primary"}
                    variant={"outlined"}
                    style={{ width: "130px", textTransform: "none" }}
                  >
                    Cancel
                  </PrimaryButton>
                  {/* </div> */}
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
          <Dialog
            open={this.state.toeflshow}
            onClose={() => this.setState({ toeflshow: false })}
          >
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Typography
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: 18,
                      color: "#052A4E",
                      fontWeight: 600,
                    }}
                  >
                    TOEFL Score
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                    id="combo-box-demo"
                    fullWidth
                    // disabled={this.state.disable}
                    // options={this.props.getDegreeList}
                    // getOptionLabel={(option) => option.name}
                    //   style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Attempt"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Exam Date"
                    format="MM/dd/yyyy"
                    fullWidth
                    // value={this.state.endofservice}
                    // disabled
                    // onChange={(e, newValue) =>
                    //     this.setState({ endofservice: newValue })
                    // }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  {/* <TextField
                                        label="Quantative Reasoning"
                                        fullWidth
                                    /> */}
                  <TextField label="Reading" fullWidth />
                </Grid>
                <Grid item md={6}>
                  <TextField label="Writing" fullWidth />
                </Grid>
                <Grid item md={6}>
                  <TextField label="Speaking" fullWidth />
                </Grid>
                <Grid item md={3}>
                  <TextField label="Listening" fullWidth />
                </Grid>
                <Grid item md={3}>
                  <TextField label="Total" fullWidth />
                </Grid>
                <Grid item md={6} sm={5} xs={5}>
                  <Dropzone onDrop={this.onDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <p
                          style={{
                            color: "#686868",
                            fontFamily: "Montserrat",
                            fontSize: "12px",
                          }}
                        >
                        Marksheet / Trasncripts
                        </p>
                        <div
                          style={{
                            height: "100px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            border: "1px dashed #1093FF",
                          }}
                          {...getRootProps({ className: "dropzone" })}
                        >
                          <input {...getInputProps()} />
                          <PublishRoundedIcon color="primary" />
                        </div>

                        <aside>
                          <p
                            style={{
                              color: "#686868",
                              fontFamily: "Montserrat",
                            }}
                          >
                            File size: less than 1MB | Format: PDF
                          </p>

                          {/* <ul>{this.state.finalFile !== null ? files : null}</ul> */}
                        </aside>
                      </section>
                    )}
                  </Dropzone>
                </Grid>
                <Grid item md={6} sm={6} xs={6}></Grid>
                <Grid item md={3}>
                  {/* <div style={{ display: 'flex', paddingTop: '10%', paddingBottom: '5% ' }}> */}
                  <PrimaryButton
                    color={"primary"}
                    variant={"contained"}
                    style={{ width: "130px", textTransform: "none" }}
                  >
                    Save
                  </PrimaryButton>
                  {/* </div> */}
                </Grid>
                <Grid item md={3}>
                  {/* <div style={{ display: 'flex', paddingTop: '10%', paddingBottom: '5% ', paddingLeft: '5%' }}> */}
                  <PrimaryButton
                    color={"primary"}
                    variant={"outlined"}
                    style={{ width: "130px", textTransform: "none" }}
                  >
                    Cancel
                  </PrimaryButton>
                  {/* </div> */}
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
          <Dialog
            open={this.state.ieltsshow}
            onClose={() => this.setState({ ieltsshow: false })}
          >
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Typography
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: 18,
                      color: "#052A4E",
                      fontWeight: 600,
                    }}
                  >
                    IELTS Score
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                    id="combo-box-demo"
                    fullWidth
                    // disabled={this.state.disable}
                    // options={this.props.getDegreeList}
                    // getOptionLabel={(option) => option.name}
                    //   style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Attempt"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Exam Date"
                    format="MM/dd/yyyy"
                    fullWidth
                    // value={this.state.endofservice}
                    // disabled
                    // onChange={(e, newValue) =>
                    //     this.setState({ endofservice: newValue })
                    // }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  {/* <TextField
                                        label="Quantative Reasoning"
                                        fullWidth
                                    /> */}
                  <TextField label="Reading" fullWidth />
                </Grid>
                <Grid item md={6}>
                  <TextField label="Writing" fullWidth />
                </Grid>
                <Grid item md={6}>
                  <TextField label="Speaking" fullWidth />
                </Grid>
                <Grid item md={3}>
                  <TextField label="Listening" fullWidth />
                </Grid>
                <Grid item md={3}>
                  <TextField label="Total" fullWidth />
                </Grid>
                <Grid item md={6} sm={5} xs={5}>
                  <Dropzone onDrop={this.onDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <p
                          style={{
                            color: "#686868",
                            fontFamily: "Montserrat",
                            fontSize: "12px",
                          }}
                        >
                          Marksheet / Trasncripts
                        </p>
                        <div
                          style={{
                            height: "100px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            border: "1px dashed #1093FF",
                          }}
                          {...getRootProps({ className: "dropzone" })}
                        >
                          <input {...getInputProps()} />
                          <PublishRoundedIcon color="primary" />
                        </div>

                        <aside>
                          <p
                            style={{
                              color: "#686868",
                              fontFamily: "Montserrat",
                            }}
                          >
                            File size: less than 1MB | Format: PDF
                          </p>

                          {/* <ul>{this.state.finalFile !== null ? files : null}</ul> */}
                        </aside>
                      </section>
                    )}
                  </Dropzone>
                </Grid>
                <Grid item md={6} sm={6} xs={6}></Grid>
                <Grid item md={3}>
                  {/* <div style={{ display: 'flex', paddingTop: '10%', paddingBottom: '5% ' }}> */}
                  <PrimaryButton
                    color={"primary"}
                    variant={"contained"}
                    style={{ width: "130px", textTransform: "none" }}
                  >
                    Save
                  </PrimaryButton>
                  {/* </div> */}
                </Grid>
                <Grid item md={3}>
                  {/* <div style={{ display: 'flex', paddingTop: '10%', paddingBottom: '5% ', paddingLeft: '5%' }}> */}
                  <PrimaryButton
                    color={"primary"}
                    variant={"outlined"}
                    style={{ width: "130px", textTransform: "none" }}
                  >
                    Cancel
                  </PrimaryButton>
                  {/* </div> */}
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </MuiPickersUtilsProvider>
        </ThemeProvider>
      </div>
    );
  }
}

export default GraduateTestResult;
