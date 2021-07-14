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
    Accordion, AccordionSummary, AccordionDetails,
    IconButton

} from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import PrimaryButton from '../../Utils/PrimaryButton';
import Warning from "../../Asset/Images/warningImg.png";
import Pencil from "../../Asset/Images/pencil.png";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
    DatePicker,
} from '@material-ui/pickers';

class workExperience extends Component {
    constructor() {
        super()
        this.state = {
            disable: true,
            startDate: null,
            endDate: null,
        }
    }

    // monthDiff(startDate, EndDate) {
    //     return startDate.getMonth() - EndDate.getMonth() +
    //         (12 * (startDate.getFullYear() - EndDate.getFullYear()))
    // }

    handleClick(e) {

        this.setState({ disable: !this.state.disable })
    }
    handleSave = () => {
        console.log('huhuo')

    }

    render() {
        console.log(this.monthDiff)
        return (
            <div style={{ padding: 25 }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                                width: "13%",
                            }}
                        >
                            <p style={{
                                fontStyle: "Poppins",
                                fontWeight: "600",
                                fontStyle: "normal",
                                fontSize: "18px",
                                color: "#0081FF",
                            }}>Work Experience</p>
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
                    <div style={{ paddingTop: 10 }}>
                        <Accordion>

                            <AccordionSummary expandIcon={<ExpandMore />}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    Job Role / Designation ,<div style={{ fontSize: 10, paddingTop: '2%' }}>  Company Name</div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '50%' }}> 3month({this.state.startDate}-{this.state.endDate})</div>

                            </AccordionSummary>

                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item md={2}>
                                        <TextField id="standard-basic" label="Job Type" disabled={this.state.disable} />
                                    </Grid>
                                    <Grid item md={2}>
                                        <TextField style={{ width: 300 }} disabled={this.state.disable} id="standard-basic" label="Organisation" />
                                    </Grid>
                                    <Grid item md={2}>
                                        {/* <TextField id="standard-basic" label="No Of Schools Targeted?" /> */}
                                    </Grid>
                                    <Grid item md={1}>
                                        {/* <TextField id="standard-basic" label="No Of Schools Targeted?" /> */}
                                    </Grid>

                                    <Grid item md={2}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Start Date"
                                            // format="yyyy MM"
                                            // openTo="year"
                                            views={["year", "month"]}
                                            disabled={this.state.disable}
                                            value={this.state.startDate}

                                            onChange={(e, newValue) =>
                                                this.setState({ startDate: newValue })
                                            }
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item md={2}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="End Date"
                                            format="yyyy MM"
                                            // views={["year", "month"]}
                                            disabled={this.state.disable}
                                            value={this.state.endDate}
                                            onChange={(e, newValue) =>
                                                this.setState({ endDate: newValue })
                                            }
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="standard-multiline-static"
                                            label="Job Description"
                                            multiline
                                            // rows={4}
                                            disabled={this.state.disable}

                                            defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                                            // fullWidth
                                            style={{ width: '91%', paddingBottom: 20, paddingTop: 10, fontFamily: 'Montserrat', color: '#052A4E', }}
                                        />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>

                        </Accordion>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15%' }}>
                        <PrimaryButton
                            // onClick={() => this.handleSave()}
                            style={{ textTransform: "capitalize" }}
                            variant={"contained"}
                            color={"primary"}
                            size={"small"}
                        >
                            Save Changes
                        </PrimaryButton>
                    </div>
                </MuiPickersUtilsProvider>
            </div >
        );
    }
}

export default workExperience;