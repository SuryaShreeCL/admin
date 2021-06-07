import { Grid, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PrimaryButton from '../../Utils/PrimaryButton'
import {Autocomplete} from "@material-ui/lab"

class StarterPackTable extends Component {
    constructor(props){
        super(props);
        this.state = {
           open:false,
        }
    }
    handleOpen = () => {
         this.setState({
             open:true
         })
    }
    studentdata = [
        {title:"Student 1"},
        {title:"Student 2"},
        {title:"Student 3"},
        {title:"Student 4"},
        {title:"Student 5"},
    ]
    course = [
        {title:"Course 1"},
        {title:"Course 2"},
        {title:"Course 3"},
        {title:"Course 4"},
        {title:"Course 5"},
    ]
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
            <div>
                <Grid container>
                <Grid item md={12} align={"right"}>
                    <PrimaryButton onClick={()=>this.handleOpen()} color={"primary"} size={"small"} variant={"contained"} >New Enroll</PrimaryButton>
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
                                        <PrimaryButton color={"primary"} size={"small"} variant={"contained"}>Manage</PrimaryButton>
                                    </TableCell>
                                </TableRow>
                                )
                               
                            })}
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
             <Dialog open={this.state.open} maxWidth="lg" >
                    {/* <DialogTitle>
                        Add New
                    </DialogTitle> */}
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item md={6} sm={6} lg={6}>
                            <Autocomplete
                                id="combo-box-demo"
                                options={this.studentdata}
                                getOptionLabel={(option) => option.title}
                                // style={{ width: 300 }}
                                renderInput={(params) => 
                                <TextField {...params} 
                                label="Student ID"
                                variant="standard" />}
                                />
                            </Grid>
                            <Grid item md={6} sm={6} lg={6}>
                                <Autocomplete
                                id="combo-box-demo"
                                options={this.course}
                                getOptionLabel={(option) => option.title}
                                // style={{ width: 300 }}
                                renderInput={(params) => 
                                <TextField {...params} 
                                label="Search of course"
                                variant="standard" />}
                                />
                            </Grid>
                            <Grid item md={2} sm={6} lg={3}>
                                <TextField 
                                label="CLS Id"
                                 />
                            </Grid>
                            <Grid item md={2} sm={6} lg={3}>
                                <TextField 
                                label="Enrolled By"
                                />
                            </Grid>
                            <Grid item md={2} sm={6}lg={2}>
                                <TextField 
                                label="Enrollment Date"
                                />
                            </Grid>
                            <Grid item md={2} sm={6} lg={2}>
                                <TextField 
                                label="Expiry Date"
                                />
                            </Grid>
                            <Grid item md={2} sm={6} lg={2}>
                                <TextField
                                label="Days for Expiry"
                                />
                            </Grid>
                            <Grid item md={2} sm={6} lg={3}>
                                <TextField
                                label="Track"
                                />
                            </Grid>
                            <Grid item md={2} sm={6} lg={3}>
                                <TextField
                                label="Specialization"
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Grid item md={12} align="center">
                        <PrimaryButton onClick={()=>this.setState({open:false})} color={"primary"} size={"small"} variant={"contained"}>Enroll</PrimaryButton>
                        </Grid>
                    </DialogActions>
                                </Dialog> 
            </div>
           
        )
    }
}

const mapStateToProps = (state) =>{
    return {

    }
}

export default connect(mapStateToProps, {})(StarterPackTable)