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
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

class graduateTestResult extends Component {
    constructor() {
        super()
        this.state = {
            disable: false,
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
                    Graduate Test Details
                </div>
                <div style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 15,paddingTop:10 }}>
                    GRE
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Attempt #</TableCell>
                                <TableCell align='center'>Exam Date</TableCell>
                                <TableCell align='center'>Verbal Reasoning</TableCell>
                                <TableCell align='center'>Analytical Writing</TableCell>
                                <TableCell align='center'>Quantitative Reasoning</TableCell>
                                <TableCell align='center'>Total</TableCell>
                                <TableCell align='center'>Score Card Link</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell align='center' contentEditable={this.state.disable}>
                                    {/* <TextField disabled={this.state.disable}/>           */}
                                    1
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    DD/MM/YYYY
                                </TableCell>

                                <TableCell align='center' contentEditable={this.state.disable}>

                                    161/170

                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    4.5/6
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>
                                    161/170
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>
                                    161/170
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    <div style={{ color: '#407BFF', fontSize: 18, }} onclick={console.log('hello')}>
                                        Access Here
                                    </div>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 15,paddingTop:10 }}>
                    GMAT
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Attempt #</TableCell>
                                <TableCell align='center'>Exam Date</TableCell>
                                <TableCell align='center'>Quantitative and Verbal</TableCell>
                                <TableCell align='center'>Analytical Writing Assessment</TableCell>
                                <TableCell align='center'>Completed Certificate</TableCell>
                                <TableCell align='center'>Integrated Reasoning</TableCell>
                                <TableCell align='center'>Total</TableCell>
                                <TableCell align='center'>Transcripts</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell align='center' contentEditable={this.state.disable}>
                                    {/* <TextField disabled={this.state.disable}/>           */}
                                    1
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    DD/MM/YYYY
                                </TableCell>

                                <TableCell align='center' contentEditable={this.state.disable}>

                                    161/170

                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    4.5/6
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>
                                    161/170
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>
                                    161/170
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>
                                    161/170
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    <div style={{ color: '#407BFF', fontSize: 18, }} onclick={console.log('hello')}>
                                        Access Here
                                    </div>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 15, paddingTop:10}}>
                   TOEFL
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Attempt #</TableCell>
                                <TableCell align='center'>Exam Date</TableCell>
                                <TableCell align='center'>Reading</TableCell>
                                <TableCell align='center'>Writing</TableCell>
                                <TableCell align='center'>Speaking </TableCell>
                                <TableCell align='center'>Listening</TableCell>
                                <TableCell align='center'>Total</TableCell>
                                <TableCell align='center'>Transcripts</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell align='center' contentEditable={this.state.disable}>
                                    {/* <TextField disabled={this.state.disable}/>           */}
                                    1
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    DD/MM/YYYY
                                </TableCell>

                                <TableCell align='center' contentEditable={this.state.disable}>

                                    161/170

                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    4.5/6
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>
                                    161/170
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>
                                    161/170
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>
                                    161/170
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    <div style={{ color: '#407BFF', fontSize: 18, }} onclick={console.log('hello')}>
                                        Access Here
                                    </div>
                                </TableCell>
                            </TableRow> 

                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 15,paddingTop:10 }}>
                    IELTS
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell align='center'>Attempt #</TableCell>
                                <TableCell align='center'>Exam Date</TableCell>
                                <TableCell align='center'>Reading</TableCell>
                                <TableCell align='center'>Writing</TableCell>
                                <TableCell align='center'>Speaking </TableCell>
                                <TableCell align='center'>Listening</TableCell>
                                <TableCell align='center'>Total</TableCell>
                                <TableCell align='center'>Transcripts</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow>
                                <TableCell align='center' contentEditable={this.state.disable}>
                                    {/* <TextField disabled={this.state.disable}/>           */}
                                    1
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    DD/MM/YYYY
                                </TableCell>

                                <TableCell align='center' contentEditable={this.state.disable}>

                                    161/170

                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    4.5/6
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>
                                    161/170
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>
                                    161/170
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>
                                    161/170
                                </TableCell>
                                <TableCell align='center' contentEditable={this.state.disable}>

                                    <div style={{ color: '#407BFF', fontSize: 18, }} onclick={console.log('hello')}>
                                        Access Here
                                    </div>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>

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

export default graduateTestResult;