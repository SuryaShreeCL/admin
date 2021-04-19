import React, { Component } from 'react'
import {connect} from "react-redux"
import {getAllMentors, allocateMentor} from "../Actions/AdminAction"
import {getStudentsById} from "../Actions/Student"
import { Button, Grid, TextField } from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

class AllocateMentor extends Component {
    constructor(props){
        super(props);
        this.state ={
            mentor : null,
            snackColor : null,
            snackMsg : null,
            snackOpen : false
        }
    }

    componentDidMount() {
        this.props.getAllMentors()
        console.log(this.props.studentDetails)
        if(this.props.studentDetails.mentor !== null){
            this.setState({
                mentor : this.props.studentDetails.mentor
            })
        }
    }

    handleSubmit = () =>{
        if(this.state.mentor !== null){
            this.props.allocateMentor(this.state.mentor.id,this.props.id)
        }else{
            this.setState({
                snackMsg : "Please select the Mentor",
                snackColor : "error",
                snackOpen : true,
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.props.mentorAllocationResponse !== prevProps.mentorAllocationResponse){
            this.setState({
                snackMsg : "Mentor Allocated Successfully",
                snackColor : "success",
                snackOpen : true,
            })
            this.props.getStudentsById(this.props.id)
        }
    }
    
    render() {
        console.log(this.state.mentor)
        console.log(this.props.mentorAllocationResponse)
        console.log(this.props.studentDetails)
        return (
            <div>
                <Grid container spacing={2} alignItems='center' justify="center">
                    <Grid item md={7} align="right">
                    <Autocomplete
                        id="combo-box-demo"
                        options={this.props.mentorList}
                        value={this.state.mentor}
                        getOptionLabel={(option) => option.name}
                        onChange={(e,value)=>this.setState({mentor : value})}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Select Mentor" variant="outlined" />}
                        />
                    </Grid>
                    <Grid item md={5}>
                        <Button variant="outlined" onClick={this.handleSubmit} size="large" color="primary">Allocate</Button>
                    </Grid>
                </Grid>
                <Snackbar
          open={this.state.snackOpen}
          variant="filled"
          autoHideDuration={3000}
          onClose={() => this.setState({ snackOpen: false })}
        >
          <Alert
            onClose={() => this.setState({ snackOpen: false })}
            severity={this.state.snackColor}
          >
            {this.state.snackMsg}
          </Alert>
        </Snackbar>
            </div>
        )
    }
}


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const mapStateToProps = (state) =>{
    console.log(state)
    return {
        mentorList : state.AdminReducer.mentorList,
        mentorAllocationResponse : state.AdminReducer.mentorAllocationResponse,
        studentDetails : state.StudentReducer.StudentList
    }
}

export default connect(mapStateToProps,{getAllMentors, allocateMentor, getStudentsById})(AllocateMentor)