import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RoomIcon from '@material-ui/icons/Room';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Slide,
    TextField,
    Button
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import PrimaryButton from '../../Utils/PrimaryButton';
import Warning from "../../Asset/Images/warningImg.png";
import { Link } from 'react-router-dom';

class GraduateTestResult extends Component {
    constructor() {
        super()
        var today = new Date(),
            date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + (today.getDate());

        this.state = {
            disable: false,
            date: date
        }
    }
    handleClick(e) {

        this.setState({ disable: !this.state.disable })
    }
    render() {
        return (
            <div style={{ padding: 25 }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "18%",
                    }}
                >
                    <p style={{
                        fontStyle: "Poppins",
                        fontWeight: "600",
                        fontStyle: "normal",
                        fontSize: "18px",
                        color: "#0081FF",
                    }}>Graduate Test Details</p>
                    < img
                        src={Warning}
                        height={17}
                        width={17}
                        style={{ position: "realative", top: 5 }}
                    />
                </div>

                <div style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 15, paddingTop: 10 }}>
                    GRE
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Attempt #</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Exam Date</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Verbal Reasoning</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Analytical Writing</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Quantitative Reasoning</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Total</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Transcripts</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} ></TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >
                                    {/* <TextField disabled={this.state.disable}/>           */}
                                    1
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    {this.state.date}
                                </TableCell>

                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    60

                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    40
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >
                                    40
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >
                                    220
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ borderBottom: "none", cursor: 'pointer' }} onClick={() => console.log('hello')} >
                                    <div style={{ color: '#407BFF', fontSize: 18, fontStyle: 'italic' }} >
                                        <Link >Access Here</Link>
                                    </div>
                                </TableCell>
                                <TableCell style={{ borderBottom: "none" }} >

                                </TableCell>
                                <TableCell style={{ borderBottom: "none" }} >

                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 15, paddingTop: 10 }}>
                    GMAT
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Attempt #</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Exam Date</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat',width:20 }} >Quantitative and Verbal</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Analytical Writing Assessment</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Completed Certificate</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Integrated Reasoning</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Total</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Transcripts</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} ></TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >
                                    {/* <TextField disabled={this.state.disable}/>           */}
                                    1
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    {this.state.date}
                                </TableCell>

                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    40

                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    60
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >
                                    60
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >
                                    60
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >
                                    240
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} onClick={() => console.log('hello')} style={{ borderBottom: "none", }} >

                                    <div style={{ color: '#407BFF', fontSize: 18, }} >
                                        <div style={{ color: '#407BFF', fontSize: 18, fontStyle: 'italic' }} >
                                            <Link >Access Here</Link>
                                        </div>
                                    </div>
                                    <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    </TableCell>
                                    <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    </TableCell>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 15, paddingTop: 10 }}>
                    TOEFL
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Attempt #</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Exam Date</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Reading</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Writing</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }}  >Speaking </TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Listening</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Total</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Transcripts</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >
                                    {/* <TextField disabled={this.state.disable}/>           */}
                                    1
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >
                                    {this.state.date}
                                </TableCell>

                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    60

                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    60
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >
                                    60
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >
                                    60
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >
                                    220
                                </TableCell>
                                <TableCell align='center' onClick={() => console.log('hello')} contentEditable={this.state.disable} style={{ borderBottom: "none" }}  >

                                    <div style={{ color: '#407BFF', fontSize: 18, fontStyle: 'italic' }} >
                                        <div style={{ color: '#407BFF', fontSize: 18, fontStyle: 'italic' }} >
                                            <Link >Access Here</Link>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 15, paddingTop: 10 }}>
                    IELTS
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Attempt #</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Exam Date</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Reading</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Writing</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Speaking </TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }}>Listening</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }}>Total</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }}>Transcripts</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }}>
                                    {/* <TextField disabled={this.state.disable}/>           */}
                                    1
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }}>

                                    {this.state.date}
                                </TableCell>

                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }}>

                                    60

                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }}>

                                    60
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }}>
                                    60
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }}>
                                    40
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }}>
                                    220
                                </TableCell>
                                <TableCell align='center' onClick={() => console.log('hello')} style={{ borderBottom: "none" }} >

                                    <div style={{ color: '#407BFF', fontSize: 18, fontStyle: 'italic' }} >
                                        <Link >Access Here</Link>
                                    </div>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>

                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '5%' }}>
                    <PrimaryButton
                        // onClick={() => this.handleSave()}
                        style={{ textTransform: "none" }}
                        variant={"contained"}
                        color={"primary"}
                        size={"small"}
                    >
                        Save Changes
                    </PrimaryButton>
                </div>
            </div>
        );
    }
}

export default GraduateTestResult;