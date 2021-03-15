import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { VscChevronUp, VscChevronDown } from "react-icons/vsc";
import Slide from "@material-ui/core/Slide";
import { getStudentsById } from '../../../Actions/Student';
import { connect } from 'react-redux';

export class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      id:'',
      name:'',
      mobileNo:'',
      firstName : '',
      lastName : '',
      email:'',
      branch:'',  
      college:'',
      university:'',
      currentSem:'',
      degree:'',
      field:'',
      spacialization:'',
      region:'',
    };
  }

  componentDidMount(){
      this.props.getStudentsById(this.props.id)
  }

  componentDidUpdate(prevProps,prevState){
      if(prevProps!==this.props){
        if(this.props.StudentDetails.length!==0){
          const { studentID,fullName,phoneNumber,emailId,department,college,university,currentSem,ugDegree, firstName, lastName} =this.props.StudentDetails          
            this.setState({
                id:studentID,
                name:fullName,
                mobileNo:phoneNumber,
                email:emailId,
                branch:department!==null ? department.name : '',
                college:college!==null ? college.name :'',
                university:university !==null ? university.name :'',  
                currentSem:currentSem,
                degree:ugDegree.name,
                firstName : firstName,
                lastName : lastName,
                field:'field',
                spacialization:'spacialization'

            })
        }
      }
  }

  render() {      
    console.log(this.props)      
    return (
      <ThemeProvider>
        <div>
          {/* Container */}
          <Grid container style={{paddingBottom:10}}>
            <Grid item xs={12} sm={12} md={12} lg={12} >
              {/* Header */}
              <Grid container style={_TableTitleDesign}>
                <Grid item md={10} >
                  {/* Title */}
                  <div style={_TableTitle}>
                    <label style={_TableTitle.label}>Profile Information</label>
                  </div>
                </Grid>
                <Grid item md={2}>
                  {/* Collapse Button */}
                  <div style={_collabseIcon}>
                    <IconButton
                      aria-label="down"
                      onClick={(e) =>
                        this.setState({ collapse: !this.state.collapse })
                      }
                    >
                      {this.state.collapse ? (
                        <VscChevronUp />
                      ) : (
                        <VscChevronDown />
                      )}
                    </IconButton>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {this.state.collapse ? (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  {/* Body */}
                  <Grid container style={_TableTitle}>
                    <Grid container spacing={3}>
                      <Grid item md={6}>
                        <Grid container>
                          <Grid item md={5} className="_label">
                            <label>CLS ID</label>
                          </Grid>
                          <Grid item md={6} className="_value">
                            <label>{this.state.id}</label>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item md={6}>
                        <Grid container>
                          <Grid item md={5} className="_label">
                            <label>Name of the Client</label>
                          </Grid>
                          <Grid item md={6} className="_value">
                            <label>{this.state.firstName+" "+this.state.lastName}</label>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* Mobile Number,Email Id */}

                    <Grid container spacing={3}>
                      <Grid item md={6}>
                        <Grid container>
                          <Grid item md={5} className="_label">
                            <label>Mobile Number</label>
                          </Grid>
                          <Grid item md={6} className="_value">
                            <label>{this.state.mobileNo}</label>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item md={6}>
                        <Grid container>
                          <Grid item md={5} className="_label">
                            <label>Email Id</label>
                          </Grid>
                          <Grid item md={6} className="_value">
                            <label>{this.state.email}</label>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* Branch , College */}

                    <Grid container spacing={3}>
                      <Grid item md={6}>
                        <Grid container>
                          <Grid item md={5} className="_label">
                            <label>Branch</label>
                          </Grid>
                          <Grid item md={6} className="_value">
                            <label>{this.state.branch}</label>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item md={6}>
                        <Grid container>
                          <Grid item md={5} className="_label">
                            <label>College</label>
                          </Grid>
                          <Grid item md={6} className="_value">
                            <label>{this.state.college}</label>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* University , Current Sem */}

                    <Grid container spacing={3}>
                      <Grid item md={6}>
                        <Grid container>
                          <Grid item md={5} className="_label">
                            <label>University</label>
                          </Grid>
                          <Grid item md={6} className="_value">
                            <label>{this.state.university}</label>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item md={6}>
                        <Grid container>
                          <Grid item md={5} className="_label">
                            <label>Current Semester</label>
                          </Grid>
                          <Grid item md={6} className="_value">
                            <label>{this.state.currentSem}</label>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* Degree ,Field */}

                    <Grid container spacing={3}>
                      <Grid item md={6}>
                        <Grid container>
                          <Grid item md={5} className="_label">
                            <label>Choosen Degree</label>
                          </Grid>
                          <Grid item md={6} className="_value">
                            <label>{this.state.degree}</label>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item md={6}>
                        <Grid container>
                          <Grid item md={5} className="_label">
                            <label>Choosen Field</label>
                          </Grid>
                          <Grid item md={6} className="_value">
                            <label>{this.state.field}</label>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                     {/* Chosen Specialization ,Preferred Region */}

                     <Grid container spacing={3}>
                      <Grid item md={6}>
                        <Grid container>
                          <Grid item md={5} className="_label">
                            <label>Choosen Specialization</label>
                          </Grid>
                          <Grid item md={6} className="_value">
                            <label>{this.state.spacialization}</label>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item md={6}>
                        <Grid container>
                          <Grid item md={5} className="_label">
                            <label>Preferred Region</label>
                          </Grid>
                          <Grid item md={6} className="_value">
                            <label>{this.state.region}</label>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    
                  </Grid>
                </Grid>
              </>
            ) : null}
          </Grid>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps=state=>{
    return{ 
        StudentDetails:state.StudentReducer.StudentList,
     }
}

export default connect(mapStateToProps,{getStudentsById})(ProfileInfo)

const _spacing = {
  //   padding: "10px",
};
const _collabseIcon = {
  textAlign: "right",
};
const _TableTitleDesign = {
  backgroundColor: "whitesmoke",
};
const _TableTitle = {
  padding: 12,
  label: {
    margin: 0,
  },
};
const _Grid_item={
    padding:10,
}