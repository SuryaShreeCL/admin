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
    Button,
    IconButton,
    Typography
} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PrimaryButton from '../../Utils/PrimaryButton';
import Delete from '../../Asset/Images/delete.png';
import Eye from '../../Asset/Images/eye.png';
import Pencil from "../../Asset/Images/pencil.png";
import Warning from "../../Asset/Images/warningImg.png";
import x from "../../Asset/Images/x.png";
import Dropzone from 'react-dropzone';
const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            // height: 5
        }}
    />
);

class testEngineResult extends Component {
    constructor() {
        super()
        this.state = {
            disable: false,
            show: false,
            showEye: false,
        }
    }
    handleClick(e) {

        this.setState({ disable: !this.state.disable })
    }
    render() {
        console.log(this.state)
        return (
            <div style={{ padding: 25 }}>
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
                            width: "17%",
                        }}
                    >
                        <p style={{
                            fontStyle: "Poppins",
                            fontWeight: "600",
                            fontStyle: "normal",
                            fontSize: "18px",
                            color: "#0081FF",
                        }}>Test Engine Results </p>
                        < img
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
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 16, fontFamily: 'Montserrat' }} >No</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 16, fontFamily: 'Montserrat' }} >Exam Date</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 16, fontFamily: 'Montserrat' }} >TestSetName</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 16, fontFamily: 'Montserrat' }} >Questions Attempted</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 16, fontFamily: 'Montserrat' }} >Test Score</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 16, fontFamily: 'Montserrat' }} >Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 16, fontFamily: 'Montserrat', borderBottom: "none" }} >


                                    1
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 16, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    DD/MM/YYYY
                                </TableCell>

                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 16, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    computer Eng Technical Test
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 16, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    20/20
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 16, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    161/170
                                </TableCell>
                                <TableCell align='center' style={{ borderBottom: "none" }} >
                                    <IconButton onClick={() => this.setState({ showEye: true })}>
                                        < img
                                            src={Eye}
                                            height={20}
                                            width={20}
                                            style={{ top: 5 }}
                                        />
                                    </IconButton>
                                    <IconButton onClick={() => this.setState({ show: true })}>
                                        <img src={Delete} height={20} width={20} />

                                    </IconButton>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog
                    maxWidth="xs"
                    fullWidth={true}
                    // TransitionComponent={Transition}
                    open={this.state.show}
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                >
                    <DialogContent>
                        <Typography style={{ color: '#052A4E', fontSize: 24, fontWeight: 'bold' }}>Reset Test Name ? </Typography>
                        <Typography style={{ color: '#052A4E', fontSize: 20, fontWeight: 400, paddingTop: 25 }}>Resetting this test will give option to CLIENT NAME to retake test name</Typography>
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '25%', paddingBottom: 20 }}>
                            <Button
                                style={{ width: 150, borderRadius: 20 }}
                                variant="contained"
                                color="primary"
                                // startIcon={<AddIcon />}
                                onClick={() => this.setState({ show: false })}
                            >
                                Reset
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
                <Dialog
                    maxWidth="md"
                    fullWidth={true}
                    // TransitionComponent={Transition}
                    open={this.state.showEye}
                    // onClose={this.setState({ showEye: !this.state.disable })}
                    aria-labelledby="customized-dialog-title"
                >
                    <DialogContent>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton onClick={() => this.setState({ showEye: false })} >
                                <img src={x} height={17} width={17} />
                            </IconButton>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', }}>
                            <Typography style={{ color: '#052A4E', fontSize: 24, fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>Test Name </Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '20px', paddingTop: '10px' }}>
                            <Typography style={{ color: '#052A4E', fontSize: 12, }}>Test completion Date</Typography>
                        </div>
                        <div style={{ paddingTop: '10px' }}>

                            <Typography style={{ color: '#052A4E', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>1.Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <Typography style={{ color: '#686868', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>Answer for Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: '10px' }}>

                            <Typography style={{ color: '#052A4E', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>1.Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <Typography style={{ color: '#686868', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>Answer for Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: '10px' }}>

                            <Typography style={{ color: '#052A4E', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>1.Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <Typography style={{ color: '#686868', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>Answer for Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: '10px' }}>

                            <Typography style={{ color: '#052A4E', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>1.Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <Typography style={{ color: '#686868', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>Answer for Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: '10px' }}>

                            <Typography style={{ color: '#052A4E', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>1.Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <Typography style={{ color: '#686868', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>Answer for Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: '10px' }}>

                            <Typography style={{ color: '#052A4E', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>1.Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <Typography style={{ color: '#686868', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>Answer for Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: '10px' }}>

                            <Typography style={{ color: '#052A4E', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>1.Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <Typography style={{ color: '#686868', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>Answer for Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: '10px' }}>

                            <Typography style={{ color: '#052A4E', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>1.Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <Typography style={{ color: '#686868', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>Answer for Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: '10px' }}>

                            <Typography style={{ color: '#052A4E', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>1.Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <Typography style={{ color: '#686868', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>Answer for Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: '10px' }}>

                            <Typography style={{ color: '#052A4E', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>1.Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <Typography style={{ color: '#686868', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>Answer for Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: '10px' }}>

                            <Typography style={{ color: '#052A4E', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>1.Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <Typography style={{ color: '#686868', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>Answer for Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: '10px' }}>

                            <Typography style={{ color: '#052A4E', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>1.Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <Typography style={{ color: '#686868', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>Answer for Question Comes Here</Typography>
                        </div><div style={{ paddingTop: '10px' }}>

                            <Typography style={{ color: '#052A4E', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>1.Question Comes Here</Typography>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <Typography style={{ color: '#686868', fontSize: 14, paddingLeft: 15, fontFamily: 'Montserrat', fontWeight: 400 }}>Answer for Question Comes Here</Typography>
                        </div>

                    </DialogContent>
                </Dialog>
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

export default testEngineResult;