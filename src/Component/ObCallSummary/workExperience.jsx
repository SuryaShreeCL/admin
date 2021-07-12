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
import PrimaryButton from '../../Utils/PrimaryButton';
class workExperience extends Component {
    render() {
        return (
            <div style={{padding:10}}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ color: '#407BFF', fontSize: 18, }}>
                        Work Experience
                    </div>
                    <div style={{ paddingLeft: 40 }}>
                        <WarningIcon style={{ color: 'yellow' }} />
                    </div>
                </div>
                <div style={{paddingTop:10}}>
                <Accordion>

                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            Job Role / Designation ,<div style={{ fontSize: 10,paddingTop:'2%'}}>  Company Name</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row',paddingLeft:'50%' }}> 3month(January 2020- April 2020)</div>

                    </AccordionSummary>

                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item md={2}>
                                <TextField id="standard-basic" label="Job Type" />
                            </Grid>
                            <Grid item md={2}>
                                <TextField style={{ width: 300 }} id="standard-basic" label="Organisation" />
                            </Grid>
                            <Grid item md={2}>
                                {/* <TextField id="standard-basic" label="No Of Schools Targeted?" /> */}
                            </Grid>
                            <Grid item md={1}>
                                {/* <TextField id="standard-basic" label="No Of Schools Targeted?" /> */}
                            </Grid>

                            <Grid item md={2}>
                                <TextField id="standard-basic" label="Start Date" />
                            </Grid>
                            <Grid item md={2}>
                                <TextField id="standard-basic" label="End Date" />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                id="standard-multiline-static"
                                label="Job Description"
                                multiline
                                // rows={4}
                                defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                                // fullWidth
                                style={{width:'91%',paddingBottom:20,paddingTop:10 }}
                            />
                            </Grid>



                        </Grid>
                    </AccordionDetails>

                </Accordion>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15%' }}>
                <PrimaryButton variant={"contained"} color={"primary"} >
                        Save Changes
                    </PrimaryButton>
                        </div>
            </div >
        );
    }
}

export default workExperience;