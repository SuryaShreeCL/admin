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
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import WarningIcon from '@material-ui/icons/Warning';

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
        return (
            <div style={{padding:10}}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
                    <IconButton onClick={this.handleClick.bind(this)}>
                        <CreateOutlinedIcon />

                    </IconButton>
                </div>
                <div style={{display:'flex', flexDirection:'row'}}>
                <div style={{ color: '#407BFF', fontSize: 18,fontWeight:'bold',fontFamily:'poppins' }}>
                    Aspiration Details
                    
                </div>
                <div style={{ paddingLeft: 40 }}>
                        <WarningIcon style={{ color: 'yellow' }} />
                    </div>
                </div>
                <Grid container spacing={2}>
                    {/* <Grid item xs={4}>
                    <CheckCircleIcon style={{ color: 'green', paddingLeft: 10, }} />
                        Are You Planning To Pursue Higher Education?
                    </Grid> */}
                    <Grid item xs={8} >
                        <div style={{ display: 'flex', flexDirection: 'row', }}>
                            What Kind Of Degree You Want To Persue?
                            <div style={{ color: 'green', paddingLeft: 10, fontWeight:'bold' }}>Technical and Techno Managerial</div>

                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', flexDirection: 'row', }}>
                            Which Of The Following Tests Have you Taken Or Intend To Take?
                            <div style={{ color: 'green', paddingLeft: 10,fontWeight:'bold' }}>GRE,TOEFL,IELTS</div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', flexDirection: 'row', }}>
                            How Do You Propose To Finance Your Studies?
                            <div style={{ color: 'green', paddingLeft: 10,fontWeight:'bold' }}>Loan</div>
                        </div>
                    </Grid>
                    {/* <Grid item md={2}>
                        <TextField id="standard-basic" label="Targeted Year?" disabled={this.state.disable} value={this.state.targetYear}  onChange={(e) => {this.setState({targetYear:e.target.value })} }/>
                    </Grid> */}
                    <Grid item md={3}>
                        <TextField id="standard-basic" label="No Of Schools?" disabled={this.state.disable} value={this.state.schoolTargeted}  onChange={(e) => {this.setState({schoolTargeted:e.target.value })} }/>
                    </Grid>
                    <Grid item md={3}>
                    {/* <div style={{paddingBottom:'5%'}}> */}
                            <InputLabel id="demo-simple-select-label">Intake </InputLabel>
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
                            {/* </div> */}
                    </Grid>
                    <Grid item md={3}>
                    {/* <div style={{paddingBottom:'5%'}}> */}
                            <InputLabel id="demo-simple-select-label">Targeted Degree</InputLabel>
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
                            {/* </div> */}
                    </Grid>

                    <Grid item md={3}>
                    {/* <div style={{paddingBottom:'5%'}}> */}
                            <InputLabel id="demo-simple-select-label">Area of Specialization</InputLabel>
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
                            {/* </div> */}
                    </Grid>

                    <Grid item md={3}>
                    {/* <div style={{paddingBottom:'5%'}}> */}
                            <InputLabel id="demo-simple-select-label">Country of Dream Colleges</InputLabel>
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
                            {/* </div> */}
                    </Grid>

                    <Grid item md={3}>
                    {/* <div style={{paddingBottom:'5%'}}> */}
                            <InputLabel id="demo-simple-select-label">List of Dream Graduate Colleges</InputLabel>
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
                            {/* </div> */}
                    </Grid>
                      



                </Grid>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '5%' }}>
                <PrimaryButton variant={"contained"} color={"primary"} >
                        Save Changes
                    </PrimaryButton>
                        </div>
            </div>
        );
    }
}

export default AspirationDetails;