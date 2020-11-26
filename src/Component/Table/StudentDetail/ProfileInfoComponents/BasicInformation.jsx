import React, { Component } from "react";
import CollapseContainer from "../Utils/CollapseContainerHeader";
import CollapseContainerBody from "../Utils/CollapseContainerBody";
import { Grid } from "@material-ui/core";
import { getStudentsById } from "../../../../Actions/Student";
import { connect } from "react-redux";
export class BasicInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      rowKey: [],
    };
  }

  componentDidMount() {
    this.props.getStudentsById(this.props.id);
  }

  renderStudent = () => {
    const {
      firstName,
      lastName,
      phoneNumber,
      altPhoneNumber,
      emailId,
      altEmailId,
      ugDegree,
      college,
      department,
      noOfBacklogs,
      noOfClearedBacklogs,
      uggpa,
      uggpascale,
    } = this.props.StudentDetails;
    var studentObj = [
      { title: "First Name", value: firstName },
      {title:"Last Name",value:lastName},
      {title:"Phone Number",value:phoneNumber},
      {title:"Alt.Phone Number",value:altPhoneNumber},
      {title:"Email ID",value:emailId},
      {title:"Alt.Email ID",value:altEmailId},
      {title:"UG Degree",value:ugDegree},
      {title:"College Name",value: college!==null? college.name:null},
      {title:"Department",value:department!==null?department.name :null},
      {title:"No.of Active Backlogs",value:noOfBacklogs},
      {title:"No.of Cleared Backlogs",value:noOfClearedBacklogs},
      {title:"UG GPA Scale",value:uggpascale},
      {title:"UG-GPA",value:uggpa},
      // {title:"Present Semester",value:fullName},
      // {title:"Expected Year of Graduation",value:fullName},
    ];
    return studentObj.map((row)=>{
        return(                                
                  <CollapseContainerBody
                    keyName={row.title}
                    value={row.value}
                    keyRow={"2"}
                    valueRow={"4"}
                  />                                                 
        );
    });
  };
  render() {    
    return (
      <div>
        <CollapseContainer
          title={"Basic Information"}
          onClick={(e) => this.setState({ show: !this.state.show })}
          show={this.state.show}
        >
          <Grid container spacing={3} style={_TableTitle}>
          {(this.props.StudentDetails.length !== 0)? this.renderStudent() :null }
          </Grid>
        </CollapseContainer>
      </div>
    );
  }
}
const _TableTitle = {
  padding: 12,
  label: {
    margin: 0,
  },
};

const mapStateToProps = (state) => {
  return {
    StudentDetails: state.StudentReducer.StudentList,
  };
};

export default connect(mapStateToProps, { getStudentsById })(BasicInformation);
