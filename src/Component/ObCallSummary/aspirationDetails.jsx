import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import RoomIcon from '@material-ui/icons/Room';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import PrimaryButton from '../../Utils/PrimaryButton';
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

} from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';
import { ExpandMore } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import WarningIcon from '@material-ui/icons/Warning';
import Warning from "../../Asset/Images/warningImg.png";
import Pencil from "../../Asset/Images/pencil.png";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class AspirationDetails extends Component {
    constructor() {
        super()
        this.state = {
            disable: true,
            val: "",
            targetYear: '2022,2023',
            targetIntake: 'Fall,Winter',
            schoolTargeted: '3',
            targetDegree: 'MS',
            areaOfSpecalization: 'AREA OF SPECALIZATION1',
            countryCollege: 'INDIA, USA',
            listOfDreamCollege: 'College1',
            listOfDreamBusinessCollege: 'College1',



        }
    }
    handleClick(e) {

        this.setState({ disable: !this.state.disable })
    }

    render() {
        console.log(new Date())
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
                            width: "15%",
                        }}
                    >
                        <p style={{
                            fontStyle: "Poppins",
                            fontWeight: "600",
                            fontStyle: "normal",
                            fontSize: "18px",
                            color: "#0081FF",
                            paddingLeft: 10
                        }}>Aspiration Details</p>
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
                <Grid container spacing={2}>
                    {/* <Grid item xs={4}>
                    <CheckCircleIcon style={{ color: 'green', paddingLeft: 10, }} />
                        Are You Planning To Pursue Higher Education?
                    </Grid> */}
                    <Grid item xs={8} >
                        <div style={{ display: 'flex', flexDirection: 'row', fontSize: 18, fontWeight: 400 }}>
                            What Kind Of Degree You Want To Persue?
                            <div style={{ color: '#2C8853', paddingLeft: 10, fontWeight: 'bold' }}>Technical and Techno Managerial</div>

                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', flexDirection: 'row', fontSize: 18, fontWeight: 400 }}>
                            Which Of The Following Tests Have you Taken Or Intend To Take?
                            <div style={{ color: '#2C8853', paddingLeft: 10, fontWeight: 'bold' }}>GRE,TOEFL,IELTS</div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', flexDirection: 'row', fontSize: 18, fontWeight: 400 }}>
                            How Do You Propose To Finance Your Studies?
                            <div style={{ color: '#2C8853', paddingLeft: 10, fontWeight: 'bold', display: 'flex', flexDirection: 'row' }}>Loan
                                {/* <FormControl component="fieldset"> */}
                                {/* <RadioGroup aria-label="gender" name="gender1"  style={{display:'flex', flexDirection:'row'}}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                    
                                </RadioGroup> */}
                                {/* </FormControl> */}
                            </div>
                        </div>
                    </Grid>
                    {/* <Grid item md={2}>
                        <TextField id="standard-basic" label="Targeted Year?" disabled={this.state.disable} value={this.state.targetYear}  onChange={(e) => {this.setState({targetYear:e.target.value })} }/>
                    </Grid> */}
                    <Grid item md={2} >
                        <TextField style={{ width: '100%' }} id="standard-basic" label="No Of Schools?" disabled={this.state.disable} value={this.state.schoolTargeted} onChange={(e) => { this.setState({ schoolTargeted: e.target.value }) }} />
                    </Grid>
                    <Grid item md={3}>
                        {/* <div style={{paddingBottom:'5%'}}> */}
                        <Autocomplete
                            popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                            id="combo-box-demo"
                            disabled={this.state.disable}
                            options={this.props.getDegreeList}
                            getOptionLabel={(option) => option.name}
                            //   style={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Intake" variant="standard" />
                            )}
                        />
                        {/* </div> */}
                    </Grid>
                    <Grid item md={2}>
                        <Autocomplete
                            popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                            id="combo-box-demo"
                            disabled={this.state.disable}
                            options={this.props.getDegreeList}
                            getOptionLabel={(option) => option.name}
                            //   style={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Targeted Degree" variant="standard" />
                            )}
                        />
                    </Grid>

                    <Grid item md={5}>
                        <Autocomplete
                            popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                            id="combo-box-demo"
                            options={this.props.getDegreeList}
                            getOptionLabel={(option) => option.name}
                            //   style={{ width: 300 }}
                            disabled={this.state.disable}
                            renderInput={(params) => (
                                <TextField {...params} label="Area of Specialization" variant="standard" />
                            )}
                        />
                    </Grid>

                    <Grid item md={3}>
                        <Autocomplete
                            popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                            id="combo-box-demo"
                            options={this.props.getDegreeList}
                            getOptionLabel={(option) => option.name}
                            //   style={{ width: 300 }}
                            disabled={this.state.disable}
                            renderInput={(params) => (
                                <TextField {...params} label="Country of Dream Colleges" variant="standard" />
                            )}
                        />
                    </Grid>

                    <Grid item md={3}>
                        <Autocomplete
                            popupIcon={<ExpandMore style={{ color: "#1093FF" }} />}
                            id="combo-box-demo"
                            options={this.props.getDegreeList}
                            getOptionLabel={(option) => option.name}
                            //   style={{ width: 300 }}
                            disabled={this.state.disable}
                            renderInput={(params) => (
                                <TextField {...params} label="List of Dream Graduate Colleges" variant="standard" />
                            )}
                        />
                    </Grid>




                </Grid>
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

export default AspirationDetails;