import { Grid, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogContent, createMuiTheme } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PrimaryButton from '../../Utils/PrimaryButton'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
class StarterPackTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            dialogOpen : false,
            enrollmentDate : new Date(),
            expiryDate : new Date()
        }
    }

    render(props) {
        const data = [
            {clsId : "1", clientName : "Selva", track : "Track One", specialization : "Spec One", spCode : "DDU769", enrollDate : "21/7/2000", spName : "Machine learning", status : "20%", cert  : "yes"},
            {clsId : "1", clientName : "Selva", track : "Track One", specialization : "Spec One", spCode : "DDU769", enrollDate : "21/7/2000", spName : "Machine learning", status : "20%", cert  : "yes"},
            {clsId : "1", clientName : "Selva", track : "Track One", specialization : "Spec One", spCode : "DDU769", enrollDate : "21/7/2000", spName : "Machine learning", status : "20%", cert  : "yes"},
            {clsId : "1", clientName : "Selva", track : "Track One", specialization : "Spec One", spCode : "DDU769", enrollDate : "21/7/2000", spName : "Machine learning", status : "20%", cert  : "yes"},
            {clsId : "1", clientName : "Selva", track : "Track One", specialization : "Spec One", spCode : "DDU769", enrollDate : "21/7/2000", spName : "Machine learning", status : "20%", cert  : "yes"},
            {clsId : "1", clientName : "Selva", track : "Track One", specialization : "Spec One", spCode : "DDU769", enrollDate : "21/7/2000", spName : "Machine learning", status : "20%", cert  : "yes"},
            {clsId : "1", clientName : "Selva", track : "Track One", specialization : "Spec One", spCode : "DDU769", enrollDate : "21/7/2000", spName : "Machine learning", status : "20%", cert  : "yes"},
        ]
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
                <Grid item md={12} align={"right"}>
                    <PrimaryButton color={"primary"} size={"small"} variant={"contained"} >New Enroll</PrimaryButton>
                </Grid>
                <Grid item md={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                <TableCell align="center">CLS ID</TableCell>
                                <TableCell align="center">Client Name</TableCell>
                                <TableCell align="center">Track</TableCell>
                                <TableCell align="center">Specialization</TableCell>
                                <TableCell align="center">SP Code</TableCell>
                                <TableCell align="center">Enroll Date</TableCell>
                                <TableCell align="center">SP Name</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Cert</TableCell>
                                <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            {data.map((eachData,index)=>{
                                return(
                                    <TableRow>
                                    <TableCell align="center">
                                        {eachData.clsId}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.clientName}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.track}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.specialization}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.spCode}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.enrollDate}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.spName}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.status}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.cert}
                                    </TableCell>
                                    <TableCell align="center">
                                        <PrimaryButton onClick={()=>this.setState({dialogOpen : true})} color={"primary"} size={"small"} variant={"contained"}>Manage</PrimaryButton>
                                    </TableCell>
                                </TableRow>
                                )
                               
                            })}
                        </Table>
                    </TableContainer>
                </Grid>
                <Dialog maxWidth={"md"} onClose={()=>this.setState({dialogOpen : false})} aria-labelledby="simple-dialog-title" open={this.state.dialogOpen}>
                       <DialogContent>
                       <Grid container spacing={2}>
                            <Grid item md>
                                <TextField
                                label={"CLS ID (Order ID / Student ID)"}
                                />
                            </Grid>
                            <Grid item md>
                                <TextField
                                label={"Enrolled By"}
                                />
                            </Grid>
                            <Grid item md>
                            <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Enrollment Date"
                            value={this.state.enrollmentDate}
                            onChange={(value)=>this.setState({enrollmentDate : value})}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                            </Grid>
                            <Grid item md>
                            <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Expiry Date"
                            value={this.state.expiryDate}
                            onChange={(value)=>this.setState({expiryDate : value})}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                            </Grid>
                            <Grid item md>
                                <TextField
                                label={"Days for Expiry"}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{margin : "30px 0px 10px 0px"}}>
                        <Grid item md={3}>
                            <PrimaryButton color={"primary"} size={"small"} variant={"contained"} >Unenroll User</PrimaryButton>
                            </Grid>
                            <Grid item md={3}>
                            <PrimaryButton color={"primary"} size={"small"} variant={"contained"} >Suspend Course</PrimaryButton>
                            </Grid>
                            <Grid item md={3}>
                            <PrimaryButton color={"primary"} size={"small"} variant={"contained"} >Send expiry email</PrimaryButton>
                            </Grid>
                        </Grid>
                       </DialogContent>
                </Dialog>
            </Grid>
            </MuiPickersUtilsProvider>
        )
    }
}

const mapStateToProps = (state) =>{
    return {

    }
}

export default connect(mapStateToProps, {})(StarterPackTable)