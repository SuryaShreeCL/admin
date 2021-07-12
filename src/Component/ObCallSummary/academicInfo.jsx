import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import RoomIcon from '@material-ui/icons/Room';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { ExpandMore } from '@material-ui/icons';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import {
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
    Accordion, AccordionSummary, AccordionDetails

} from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

class academicInfo extends Component {
    render() {
        return (
            <div style={{backgroundColor:'white',padding:10}}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ color: '#407BFF', fontSize: 18, }}>
                        Academic Information
                    </div>
                    <div style={{ paddingLeft: 40 }}>
                        <WarningIcon style={{ color: 'yellow' }} />
                    </div>
                </div>
                <div style={{ paddingTop: 10 }}>
                    <Accordion>

                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                UnderGraduate Degree
                            </div>



                        </AccordionSummary>

                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item md={3}>
                                    <InputLabel >College Name</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item md={3}>

                                    <InputLabel >University Name</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>

                                </Grid>
                                <Grid item md={3}>
                                    <InputLabel >Department</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item md={3}>
                                    <InputLabel >Degree</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </Grid>

                                <Grid item xs={1.2}>
                                    <TextField
                                        id="standard-multiline-static"
                                        label="Current Semester"
                                    // style={{ width: 300 }}
                                    />
                                </Grid>

                                <Grid item xs={1.2}>
                                    <TextField
                                        id="standard-multiline-static"
                                        label="Graduation Year "

                                    />
                                </Grid>
                                <Grid item xs={1.2}>
                                    <TextField
                                        id="standard-multiline-static"
                                        label="CGPA"

                                    />
                                </Grid>

                                <Grid item xs={1}>

                                </Grid>


                                <Grid item md={1.5}>
                                    <TextField id="standard-basic" label="Start Date" />
                                </Grid>
                                <Grid item md={1.5}>
                                    <TextField id="standard-basic" label="End Date" />
                                </Grid>
                            </Grid>
                        </AccordionDetails>


                    </Accordion>
                </div>
                <div style={{ paddingTop: 10 }}>
                    <Accordion>

                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                Postgraduate Degree
                            </div>



                        </AccordionSummary>

                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item md={3}>
                                    <InputLabel >College Name</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item md={3}>

                                    <InputLabel >University Name</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>

                                </Grid>
                                <Grid item md={3}>
                                    <InputLabel >Department</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item md={3}>
                                    <InputLabel >Degree</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </Grid>

                                <Grid item xs={1.2}>
                                    <TextField
                                        id="standard-multiline-static"
                                        label="Current Semester"
                                    // style={{ width: 300 }}
                                    />
                                </Grid>

                                <Grid item xs={1.2}>
                                    <TextField
                                        id="standard-multiline-static"
                                        label="Graduation Year "

                                    />
                                </Grid>
                                <Grid item xs={1.2}>
                                    <TextField
                                        id="standard-multiline-static"
                                        label="CGPA"

                                    />
                                </Grid>

                                <Grid item xs={1}>

                                </Grid>


                                <Grid item md={1.5}>
                                    <TextField id="standard-basic" label="Start Date" />
                                </Grid>
                                <Grid item md={1.5}>
                                    <TextField id="standard-basic" label="End Date" />
                                </Grid>
                            </Grid>
                        </AccordionDetails>


                    </Accordion>
                </div>

                <div style={{ paddingTop: 10 }}>
                    <Accordion>

                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                Diploma
                            </div>



                        </AccordionSummary>

                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item md={3}>
                                    <InputLabel >College Name</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item md={3}>

                                    <InputLabel >Exam Board</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>

                                </Grid>
                                <Grid item md={3}>
                                    <InputLabel >DiplomaType</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item md={3}>
                                    {/* <InputLabel >Degree</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select> */}
                                </Grid>

                                <Grid item xs={1.2}>
                                    <TextField
                                        id="standard-multiline-static"
                                        label="Current Semester"
                                    // style={{ width: 300 }}
                                    />
                                </Grid>

                                <Grid item xs={1.2}>
                                    <TextField
                                        id="standard-multiline-static"
                                        label="Graduation Year "

                                    />
                                </Grid>
                                <Grid item xs={1.2}>
                                    <TextField
                                        id="standard-multiline-static"
                                        label="CGPA"

                                    />
                                </Grid>

                                <Grid item xs={1}>

                                </Grid>


                                <Grid item md={1.5}>
                                    <TextField id="standard-basic" label="Start Date" />
                                </Grid>
                                <Grid item md={1.5}>
                                    <TextField id="standard-basic" label="End Date" />
                                </Grid>
                            </Grid>
                        </AccordionDetails>


                    </Accordion>
                </div>

                <div style={{ paddingTop: 10 }}>
                    <Accordion>

                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                12th
                            </div>



                        </AccordionSummary>

                        <AccordionDetails>
                        <Grid container spacing={2}>
                                <Grid item md={3}>
                                    <InputLabel >School Name</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item md={3}>

                                    <InputLabel >Exam Board</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>

                                </Grid>
                                <Grid item md={3}>
                                    <InputLabel >DiplomaType</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item md={3}>
                                    {/* <InputLabel >Degree</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select> */}
                                </Grid>

                                <Grid item xs={1.2}>
                                    {/* <TextField
                                        id="standard-multiline-static"
                                        label="Current Semester"
                                    // style={{ width: 300 }}
                                    /> */}
                                </Grid>

                                <Grid item xs={2}>
                                    {/* <TextField
                                        id="standard-multiline-static"
                                        label="Graduation Year "

                                    /> */}
                                </Grid>
                                <Grid item xs={1.2}>
                                    <TextField
                                        id="standard-multiline-static"
                                        label="CGPA"

                                    />
                                </Grid>

                                <Grid item xs={1}>

                                </Grid>


                                <Grid item md={1.5}>
                                    <TextField id="standard-basic" label="Start Date" />
                                </Grid>
                                <Grid item md={1.5}>
                                    <TextField id="standard-basic" label="End Date" />
                                </Grid>
                            </Grid>
                        </AccordionDetails>


                    </Accordion>
                </div>
                <div style={{ paddingTop: 10 }}>
                    <Accordion>

                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                10th
                            </div>



                        </AccordionSummary>

                        <AccordionDetails>
                        <Grid container spacing={2}>
                                <Grid item md={3}>
                                    <InputLabel >School Name</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item md={3}>

                                    <InputLabel >Exam Board</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>

                                </Grid>
                                <Grid item md={3}>
                                    <InputLabel >DiplomaType</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item md={3}>
                                    {/* <InputLabel >Degree</InputLabel>
                                    <Select
                                        style={{ width: '95%' }}
                                        
                                    // value={age}

                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select> */}
                                </Grid>

                                <Grid item xs={1.2}>
                                    {/* <TextField
                                        id="standard-multiline-static"
                                        label="Current Semester"
                                    // style={{ width: 300 }}
                                    /> */}
                                </Grid>

                                <Grid item xs={1.2}>
                                    {/* <TextField
                                        id="standard-multiline-static"
                                        label="Graduation Year "

                                    /> */}
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        id="standard-multiline-static"
                                        label="CGPA"

                                    />
                                </Grid>

                                <Grid item xs={1}>

                                </Grid>


                                <Grid item md={1.5}>
                                    <TextField id="standard-basic" label="Start Date" />
                                </Grid>
                                <Grid item md={1.5}>
                                    <TextField id="standard-basic" label="End Date" />
                                </Grid>
                            </Grid>
                        </AccordionDetails>


                    </Accordion>
                </div>
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

            </div >
        );
    }
}

export default academicInfo;