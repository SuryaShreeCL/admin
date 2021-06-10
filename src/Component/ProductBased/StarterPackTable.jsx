import { Grid, Table, TableCell, TableContainer, TableHead, DialogActions,TableRow, TextField, Dialog, DialogContent, createMuiTheme } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PrimaryButton from '../../Utils/PrimaryButton'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {Autocomplete} from "@material-ui/lab"
import { getStudentsById, getStudents } from "../../Actions/Student"
import { getAllStarterPack, getAllSpecialization } from "../../Actions/PgaAction"
class StarterPackTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            dialogOpen : false,
            enrollmentDate : new Date(),
            expiryDate : new Date(),
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

    componentDidMount() {
        this.props.getAllStarterPack()
        this.props.getAllSpecialization()
        // this.props.getStudentsById(this.props.id)
        this.props.getStudents()
    }
    

    render(props) {
        console.log(this.props.studentDetail)
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
            </MuiPickersUtilsProvider>
           
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        starterPackDetails : state.PgaReducer.starterPackDetails,
        allSpecialization : state.PgaReducer.allSpecialization,
        studentDetail : state.StudentReducer.StudentList,
        StudentList : state.StudentReducer.StudentList
    }
}

export default connect(mapStateToProps, {getAllStarterPack, getAllSpecialization, getStudentsById, getStudents})(StarterPackTable)