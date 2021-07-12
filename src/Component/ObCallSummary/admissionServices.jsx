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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';


class admissionServices extends Component {
    constructor() {
        super()
        this.state = {
            disable: false,
            disable2: false,
            show: false
        }
    }
    handleClick(e) {

        this.setState({ disable: !this.state.disable, })
    }
    render() {
        return (
            <div style={{backgroundColor:'white',padding:10}}>

                <div style={{ color: '#407BFF', fontSize: 18, }}>
                    CareerLabs - Student Mapping
                </div>   <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
                    <IconButton onClick={() => { this.setState({ disable2: !this.state.disable2 }) }}>
                        <CreateOutlinedIcon />

                    </IconButton>
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' >No</TableCell>
                                <TableCell align='center' >WorkFlow</TableCell>
                                <TableCell align='center' >Employee Name</TableCell>
                                <TableCell align='center' >Allocated By</TableCell>
                                <TableCell align='center' >Allocated At</TableCell>
                                <TableCell align='center' ></TableCell>
                                <TableCell align='center' ></TableCell>
                                <TableCell align='center' ></TableCell>
                                <TableCell align='center' ></TableCell>
                                <TableCell align='center' > <Button
                                    style={{ width: 300, borderRadius: 20 }}
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
                                <TableCell align='center' contentEditable={this.state.disable2}>


                                    1
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable2}>

                                    BDA
                                </TableCell>

                                <TableCell align='center' contentEditable={this.state.disable2}>

                                    Mayur Dhade
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable2}>

                                    Mayur Dhade
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable2}>

                                    DD/MM/YYYY HH:MM
                                </TableCell>

                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
                    <IconButton onClick={this.handleClick.bind(this)}>
                        <CreateOutlinedIcon />

                    </IconButton>
                </div>
                <div style={{ color: '#407BFF', fontSize: 18, }}>
                    Product Details
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>No</TableCell>
                                <TableCell align='center'>Order ID</TableCell>
                                <TableCell align='center'>Product Family</TableCell>
                                <TableCell align='center'>Product Variant</TableCell>
                                <TableCell align='center'>Enrollment Date</TableCell>
                                <TableCell align='center'>Expiry Date</TableCell>
                                <TableCell align='center'>End of Service</TableCell>
                                <TableCell align='center'>BDA Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell align='center' contentEditable={this.state.disable}>


                                    1
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    CLS51338
                                </TableCell>

                                <TableCell align='center' contentEditable={this.state.disable}>

                                    Profile Builder
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    Pb:placements 2022
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    01/05/2021
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    01/05/2021
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    01/05/2021
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>
                                    Mayur Dhade
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15%' }}>

                    <Button
                        style={{ width: 300, borderRadius: 20 }}
                        variant="contained"
                        color="primary"
                    // startIcon={<AddIcon />}
                    >
                        Save Changes
                    </Button>
                    <Dialog
                        // TransitionComponent={Transition}
                        open={this.state.show}
                        onClose={this.handleClose}
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
                            <Typography style={{fontWeight:'bold',paddingBottom:'10%'}}>Mentor Allocation</Typography>

                            <div style={{paddingBottom:'5%'}}>
                            <InputLabel id="demo-simple-select-label">Select Mentor From Dropdown</InputLabel>
                            <Select
                            style={{width:'95%'}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography style={{fontWeight:'bold'}}>Note:</Typography>
                                <Typography>Allocating the mentor will push the user to PGA Stage and Enable access for Call Scheduling tool.</Typography>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15%' }}>
                            <Button
                                style={{ width: 150, borderRadius: 20 }}
                                variant="contained"
                                color="primary"
                                // startIcon={<AddIcon />}
                                onClick={() => this.setState({ show: false })}
                            >
                                Allocate
                            </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>



            </div>
        );
    }
}

export default admissionServices;