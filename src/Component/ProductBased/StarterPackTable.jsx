import { Grid, Table, TableCell, TableContainer, TableHead, DialogActions,TableRow, TextField, Dialog, DialogContent, createTheme } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PrimaryButton from '../../Utils/PrimaryButton'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {Autocomplete} from "@material-ui/lab"
import { getStudents, getStudentsById } from "../../Actions/Student"
import { getAllStarterPack, getAllSpecialization,getallcourse,newenroll,getenroll,unenroll, getFilteredCourseEnroll , clearNewEnroll, clearUnEnroll} from "../../Actions/PgaAction"
import { getCourses } from '../../Actions/Course'
import {isEmptyString} from '../Validation'
import MySnackBar from "../MySnackBar"
class StarterPackTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            dialogOpen : false,
            enrollmentDate : new Date(),
            expiryDate : new Date(),
            open:false,
            studentId : "",
            clsId : "",
            courseid:"",
            studentidErr : "",
            clsidErr : "",
            courseidErr : "",
            enrollmentDateErr : "",
            expiryDateErr: "",
            expirydayErr : "",
            trackErr : "",
            specializationErr : "",
            enrolledbyErr:"",
            enrolledby : "",
            track : "",
            specialization :null,
            expiryday : "",
            snackOpen : false,
            snackMsg : "",
            snackColor : "",
            dataChanged : false
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

    handleEnroll =()=>{
        console.log(this.state)
        let hlptxt = "Please fill the Required Field"
        // isEmptyString(this.state.studentId) ? this.setState({ studentidErr : hlptxt }) : this.setState({ studentidErr : ""})
        isEmptyString(this.state.courseid) ? this.setState ({ courseidErr : hlptxt }) : this.setState ({ courseidErr : ""})
        isEmptyString(this.state.enrollmentDate) ? this.setState({ enrollmentDateErr : hlptxt}) : this.setState ({ enrollmentDateErr : ""})
        isEmptyString(this.state.expiryDate) ? this.setState({ expiryDateErr : hlptxt}) : this.setState({ expiryDateErr : ""})
        isEmptyString(this.state.track) ? this.setState({ trackErr : hlptxt}) : this.setState({ trackErr : ""})
        isEmptyString(this.state.specialization) ? this.setState({ specializationErr : hlptxt}) : this.setState({ specializationErr : ""})
        this.state.enrolledby !== undefined && isEmptyString(this.state.enrolledby) ? this.setState({ enrolledbyErr : hlptxt}) : this.setState({ enrolledbyErr : ""})
        // isEmptyString(this.state.clsId) ? this.setState({ clsidErr : hlptxt}) : this.setState({ clsidErr : ""})
        this.state.expiryday !== undefined && isEmptyString(this.state.expiryday) ? this.setState({expirydayErr : hlptxt}) : this.setState({expirydayErr : ""})
        this.state.expiryDate.getTime() <= this.state.enrollmentDate.getTime() ? this.setState({expiryDateErr : "Expiry date must be greater than enrollment date"}) : this.setState({expiryDateErr : ""})
        if(
            // !isEmptyString(this.state.studentId) &&
            !isEmptyString(this.state.courseid) &&
            this.state.enrollmentDate !== null &&
            this.state.expiryDate !== null &&
            !isEmptyString(this.state.track) &&
            this.state.specialization !== null &&
            !this.state.expiryDate.getTime() <= this.state.enrollmentDate.getTime() &&
            !isEmptyString(this.state.enrolledby) &&
            // !isEmptyString(this.state.clsId) &&
            !isEmptyString(this.state.expiryday)
        ){
            let obj = {
                "studentId":this.props.id,
                "courseId":this.state.courseid,
                "startDate":this.state.enrollmentDate,
                "endDate":this.state.expiryDate
            }
            
            this.props.newenroll(obj)
            this.setState({
                open:false,
                enrollmentDate : new Date(),
                expiryDate : new Date(),
                expiryday : "",
                enrolledby : ""
            })
        }
        
       
    }

    componentDidMount() {
        this.props.getAllStarterPack()
        this.props.getAllSpecialization()
        // this.props.getStudents()
        this.props.getStudentsById(this.props.id)
        this.props.getenroll(this.props.id)
        // this.props.getallcourse()
        this.props.getCourses()
        this.props.getFilteredCourseEnroll(this.props.id)

    }

    flag = false

    
    componentDidUpdate(prevProps, prevState) {

        if(this.props.newenrollList !== prevProps.newenrollList){
            if(this.props.newenrollList === "Suceess"){
                this.props.getenroll(this.props.id)
                this.setState({
                    snackColor : "success",
                    snackMsg : "Course enrolled successfully",
                    snackOpen : true
                })
                this.props.clearNewEnroll()
            }else if(this.props.newenrollList === "Already EnrolledCourses"){
                this.setState({
                    snackColor : "error",
                    snackMsg : "Course Already Enrolled",
                    snackOpen : true
                })  
                this.props.clearNewEnroll()
            }
        }
     
            
           
        if(this.props.unenrollList !== prevProps.unenrollList){
            if(this.props.unenrollList === "success"){
                this.props.getenroll(this.props.id)
                this.setState({
                    snackColor : "success",
                    snackMsg : "Course Unenrolled successfully",
                    snackOpen : true
                })
                this.props.clearUnEnroll()
            }
           
        }
    }

  

    handleEdit = (data) => {
        console.log(data)
        this.setState({
            clsId : data["CLS id"],
            enrollmentDate : data.enrollDate,
            courseid : data.courseId,
            studentId : data.studentId,
            dialogOpen : true
        })
    }
    handleUnenroll= () => {
        let obj={
            "studentId":this.state.studentId,
            "courseId": this.state.courseid
        }
          this.props.unenroll(obj)
          this.setState({
              dialogOpen : false
          })
    }

    render(props) {
        console.log(this.props)
        console.log(this.state)
    
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
                                {/* <TableCell align="center">Track</TableCell>
                                <TableCell align="center">Specialization</TableCell>
                                <TableCell align="center">SP Code</TableCell> */}
                                <TableCell align="center">Enroll Date</TableCell>
                                <TableCell align="center">SP Name</TableCell>
                                <TableCell align="center">Status</TableCell>
                                {/* <TableCell align="center">Cert</TableCell> */}
                                <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            {this.props.getenrollList.length !== 0 && this.props.getenrollList.map((eachData,index)=>{
                                let date = new Date(eachData.enrolldate)
                                let finaldate = date.getDate()
                                let finalmonth = date.getMonth()
                                let finalyear = date.getFullYear()
                                let Enrolldate = finaldate+"/"+finalmonth+"/"+finalyear
                                return(
                                    <TableRow>
                                    <TableCell align="center">
                                        {eachData["CLS id"]}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.name}
                                    </TableCell>
                                    {/* <TableCell align="center">
                                        {eachData.track}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.specialization}
                                    </TableCell> */}
                                    {/* <TableCell align="center">
                                        {eachData.spCode}
                                    </TableCell> */}
                                    <TableCell align="center">
                                        {Enrolldate}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.SPCourse}
                                    </TableCell>
                                    <TableCell align="center">
                                        {eachData.status}
                                    </TableCell>
                                    {/* <TableCell align="center">
                                        {eachData.cert}
                                    </TableCell> */}
                                    <TableCell align="center">
                                        <PrimaryButton onClick={()=>this.handleEdit(eachData)} color={"primary"} size={"small"} variant={"contained"}>Manage</PrimaryButton>
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
                                value={this.props.studentData.studentID}
                                />
                            </Grid>
                            <Grid item md>
                                <TextField
                                label={"Enrolled By"}
                                />
                            </Grid>
                            <Grid item md>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-dialog"
                            label="Enrollment Date"
                            value={this.state.enrollmentDate}
                            onChange={(value)=>this.setState({enrollmentDate : value})}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                                </MuiPickersUtilsProvider>
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
                            <PrimaryButton color={"primary"} size={"small"} variant={"contained"} onClick={this.handleUnenroll} >Unenroll User</PrimaryButton>
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
             <Dialog open={this.state.open} onClose={()=>this.setState({open : false})} maxWidth="lg" >
                    {/* <DialogTitle>
                        Add New
                    </DialogTitle> */}
                    <DialogContent>
                        <Grid container spacing={2}>
                            {/* <Grid item md={6} sm={6} lg={6}>
                            <Autocomplete
                                id="combo-box-demo"
                                options={this.props.getStudentsList}
                                getOptionLabel={(option) => option.id}
                                // style={{ width: 300 }}
                                onChange={(e,newValue)=> this.setState({ studentId : newValue.id,clsId : newValue.studentID})}
                                renderInput={(params) => 
                                <TextField {...params} 
                                label="Student ID"
                                error={this.state.studentidErr.length > 0}
                                helperText={this.state.studentidErr}
                                variant="standard" />}
                                />
                            </Grid> */}
                            <Grid item md={6} sm={6} lg={6}>
                                <Autocomplete
                                id="combo-box-demo"
                                options={this.props.getCoursesList}
                                getOptionLabel={(option) => option.name}
                                // style={{ width: 300 }}
                               onChange={(e,newValue)=>this.setState({ courseid : newValue.id})}
                                renderInput={(params) => 
                                <TextField {...params} 
                                label="Search of course"
                                error={this.state.courseidErr.length > 0}
                                helperText={this.state.courseidErr}
                                variant="standard" />}
                                />
                            </Grid>
                            <Grid item md={3} sm={6} lg={3}>
                                <TextField 
                                label="CLS Id"
                                value={this.props.studentData.studentID}
                                disabled
                                error={this.state.clsidErr.length > 0}
                                helperText={this.state.clsidErr}
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                                 />
                            </Grid>
                            <Grid item md={3} sm={6} lg={3}>
                                <TextField 
                                label="Enrolled By"
                                value={this.state.enrolledby}
                                error={this.state.enrolledbyErr.length > 0}
                                helperText={this.state.enrolledbyErr}
                                onChange={(e)=>this.setState({ enrolledby : e.target.value})}
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                            </Grid>
                            <Grid item md={2} sm={6}lg={2}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            error={this.state.enrollmentDateErr.length > 0}
                            helperText={this.state.enrollmentDateErr}
                            id="date-picker-dialog"
                            label="Enrollment Date"
                            value={this.state.enrollmentDate}
                            onChange={(value)=>this.setState({enrollmentDate : value})}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item md={2} sm={6} lg={2}>
                            <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            error={this.state.expiryDateErr.length > 0}
                            helperText={this.state.expiryDateErr}
                            label="Expiry Date"
                            value={this.state.expiryDate}
                            onChange={(value)=>this.setState({expiryDate : value})}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                            </Grid>
                            <Grid item md={2} sm={6} lg={2}>
                                <TextField
                                type="number"
                                label="Days for Expiry"
                                value={this.state.expiryday}
                                error={this.state.expirydayErr.length > 0}
                                helperText={this.state.expirydayErr}
                                onChange={(e,newValue)=>this.setState({expiryday:e.target.value}) }
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                            </Grid>
                            <Grid item md={2} sm={6} lg={3}>
                                
                                 <Autocomplete
                                id="combo-box-demo"
                                options={this.props.starterPackDetails}
                                getOptionLabel={(option) => option.name}
                                // style={{ width: 300 }}
                                onChange={(e,newValue)=>this.setState({track : newValue})}
                                renderInput={(params) => 
                                <TextField {...params} 
                                label="Track"
                                error={this.state.trackErr.length > 0}
                                helperText={this.state.trackErr}
                                variant="standard" />}
                                />
                            </Grid>
                            <Grid item md={2} sm={6} lg={3}>
                                 <Autocomplete
                                id="combo-box-demo"
                                options={this.props.allSpecialization}
                                getOptionLabel={(option) => option.name}
                                onChange={(e,newValue)=>this.setState({specialization : newValue})}
                                // style={{ width: 300 }}
                                renderInput={(params) => 
                                <TextField {...params} 
                                label="Specialization"
                                error={this.state.specializationErr.length > 0 }
                                helperText={this.state.specializationErr}
                                variant="standard" />}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Grid item md={12} align="center">
                        <PrimaryButton onClick={()=>this.handleEnroll()} color={"primary"} size={"small"} variant={"contained"}>Enroll</PrimaryButton>
                        </Grid>
                    </DialogActions>
                 </Dialog> 
                 <MySnackBar
                 snackOpen={this.state.snackOpen}
                 onClose={()=>this.setState({snackOpen : false})}
                 snackVariant={this.state.snackColor}
                 snackMsg={this.state.snackMsg}
                 />
            </MuiPickersUtilsProvider>
           
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        starterPackDetails : state.PgaReducer.starterPackDetails,
        allSpecialization : state.PgaReducer.allSpecialization,
        // studentDetail : state.StudentReducer.StudentList,
        // StudentList : state.StudentReducer.StudentList,
        // getallcourseList : state.PgaReducer.getallcourse,
        newenrollList : state.PgaReducer.newenroll,
        getCoursesList : state.CourseReducer.CourseList,
        getStudentsList : state.StudentReducer.StudentsList,
        getenrollList :  state.PgaReducer.getenroll,
        unenrollList : state.PgaReducer.unenroll,
        studentData : state.StudentReducer.StudentList,
        filteredCourseList : state.PgaReducer.filteredCourseList
    }
}

export default connect(mapStateToProps, {getAllStarterPack, getAllSpecialization,unenroll, getStudents,getallcourse,newenroll,getCourses,getenroll, getStudentsById, getFilteredCourseEnroll, clearNewEnroll, clearUnEnroll})(StarterPackTable)