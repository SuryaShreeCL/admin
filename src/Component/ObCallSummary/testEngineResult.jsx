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
            show: false
        }
    }
    handleClick(e) {

        this.setState({ disable: !this.state.disable })
    }
    render() {
        return (
            <div style={{backgroundColor:'white',padding:10}}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
                    <IconButton onClick={this.handleClick.bind(this)}>
                        <CreateOutlinedIcon />

                    </IconButton>
                </div>
                <div style={{ color: '#407BFF', fontSize: 18, }}>
                    Test Engine Results
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>No</TableCell>
                                <TableCell align='center'>Exam Date</TableCell>
                                <TableCell align='center'>TestSetName</TableCell>
                                <TableCell align='center'>Questions Attempted</TableCell>
                                <TableCell align='center'>Test Score</TableCell>
                                <TableCell align='center'>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell align='center' contentEditable={this.state.disable}>


                                    1
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    DD/MM/YYYY
                                </TableCell>

                                <TableCell align='center' contentEditable={this.state.disable}>

                                    computer Eng Technical Test
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    20/20
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    161/170
                                </TableCell>
                                <TableCell align='center' >

                                    <VisibilityOutlinedIcon style={{ marginRight: 20 }} />
                                    <IconButton onClick={() => this.setState({ show: true })}>
                                        <DeleteOutlineOutlinedIcon />

                                    </IconButton>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog
                    // TransitionComponent={Transition}
                    open={this.state.show}
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                >
                    <DialogContent>
                        <Typography style={{color:'#052A4E', fontSize:24,fontWeight:'bold'}}>Reset Test Name ? </Typography>
                    <Typography style={{color:'#052A4E', fontSize:16,}}>Resetting this test will give option to CLIENT NAME to retake test name</Typography>
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15%' }}>
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
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '5%' }}>
                            <Button
                                style={{ width: 150, borderRadius: 20 }}
                                variant="contained"
                                color="primary"
                                // startIcon={<AddIcon />}
                                onClick={() => this.setState({ show: false })}
                            >
                             Save Changes
                            </Button>
                        </div>
            </div>
        );
    }
}

export default testEngineResult;