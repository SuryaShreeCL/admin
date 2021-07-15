import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RoomIcon from '@material-ui/icons/Room';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PrimaryButton from '../../Utils/PrimaryButton';
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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { Autocomplete } from '@material-ui/lab';
import { ExpandMore } from '@material-ui/icons';
import { isEmptyString } from "../Validation";


class AdmissionServices extends Component {
    constructor() {
        super()
        this.state = {
            disable: false,
            disable2: false,
            show: false,
            mentorErr: '',
            mentor: ''
        }
    }
    handleClick(e) {

        this.setState({ disable: !this.state.disable, })
    }

    allocate = () => {
        isEmptyString(this.state.mentor) ?
            this.setState({ mentorErr: 'Field Required' }) : this.setState({ mentorErr: '',show:false })
    }
    top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
    ];
    render() {
        return (
            <div style={{ padding: 25 }}>

                <div style={{ color: '#0081FF', fontSize: 18, fontWeight: 600, fontFamily: 'Poppins' }}>
                    CareerLabs - Student Mapping
                </div>
                {/* <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
                    <IconButton onClick={() => { this.setState({ disable2: !this.state.disable2 }) }}>
                        <CreateOutlinedIcon />

                    </IconButton>
                </div> */}
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >No</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Role</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Employee Name</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Allocated By</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Allocated At</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} ></TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} ></TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} ></TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} ></TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }}  > <Button
                                    style={{ width: 300, borderRadius: 20,textTransform:'none' }}
                                    variant="contained"
                                    color="primary"
                                    // startIcon={<AddIcon />}
                                    onClick={() => this.setState({ show: true })}
                                >
                                    Allocate Mentor
                                </Button></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell align='center' contentEditable={this.state.disable2} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >


                                    1
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable2} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    BDA
                                </TableCell>

                                <TableCell align='center' contentEditable={this.state.disable2} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    Mayur Dhade
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable2} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    Mayur Dhade
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable2} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    DD/MM/YYYY HH:MM
                                </TableCell>

                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
                    <IconButton onClick={this.handleClick.bind(this)}>
                        <CreateOutlinedIcon />

                    </IconButton>
                </div> */}
                <div style={{ color: '#0081FF', fontSize: 18, fontWeight: 600, fontFamily: 'Poppins' }}>
                    Product Details
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >No</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Order ID</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Product Family</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Product Variant</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Enrollment Date</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >Expiry Date</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >End of Service</TableCell>
                                <TableCell align='center' style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat' }} >BDA Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >


                                    1
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    CLS51338
                                </TableCell>

                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    Profile Builder
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    Pb:placements 2022
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    01/05/2021
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    01/05/2021
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >

                                    01/05/2021
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable} style={{ color: '#000000', fontWeight: 400, fontSize: 14, fontFamily: 'Montserrat', borderBottom: "none" }} >
                                    Mayur Dhade
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15%' }}>

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
                            <div className="flex-1 text-center">
                            </div>
                            <div className="model-close-button" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {/* <IconButton aria-label="close" onClick={this.handleClose}>
                                <CloseIcon style={{background:'#ADD8E6', borderRadius:20,color:'#1093FF',backgroundSize:20}} />
                            </IconButton> */}
                            </div>
                        </DialogTitle>
                        <DialogContent>
                            <Typography style={{ fontWeight: 'bold', paddingBottom: '10%', fontFamily: 'Poppins', fontSize: 24 }}>Mentor Allocation</Typography>

                            <div style={{ paddingBottom: '5%' }}>
                                {/* <InputLabel id="demo-simple-select-label">Select Mentor From Dropdown</InputLabel> */}
                                <Autocomplete
                                    popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                                    id="combo-box-demo"
                                    value={this.state.mentor}
                                    onChange={(e, newValue) => { this.setState({ mentor: newValue }) }}
                                    options={this.top100Films}
                                    getOptionLabel={(option) => option.title}
                                    //   style={{ width: 300 }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Mentor From Dropdown"
                                            variant="standard"
                                            error={this.state.mentorErr.length > 0}
                                            helperText={this.state.mentorErr}
                                        />
                                    )}
                                />
                            </div>
                            <div style={{ fontFamily: 'Montserrat', fontSize: 14, fontStyle: 'italic' }}>
                                <b>Note:</b>
                                Allocating the mentor will push the user to PGA Stage and Enable access for Call Scheduling tool.
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15%', paddingBottom: '10%' }}>
                                <PrimaryButton variant={"contained"} color={"primary"} onClick={() => this.allocate()}>
                                    Allocate
                                </PrimaryButton>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>



            </div>
        );
    }
}

export default AdmissionServices;