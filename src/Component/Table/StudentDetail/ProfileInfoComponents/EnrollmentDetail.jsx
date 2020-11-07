import React, { Component } from "react";
import CollapseContainer from "../Utils/CollapseContainerHeader";
import CollapseContainerBody from "../Utils/CollapseContainerBody";
import { Grid } from "@material-ui/core";
import { getStudentsById } from "../../../../Actions/Student";
import { connect } from "react-redux";
export class EnrollmentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      rowKey: [],
    };
  }
  
  componentDidMount() {
    // this.props.getStudentsById(this.props.id);
  }

  renderStudent = () => {   
      let dateOfEnrollement='07-10-2020';   
      let courseOpted='courseOpted';
      let bda='BDA';
      let profileBuilderType='none';

    var enrollmentObj = [
      { title: "Date of Enrollment", value: dateOfEnrollement },
      {title:"Course Opted",value:courseOpted},
      {title:"Phone Number",value:bda},
      {title:"Alt.Phone Number",value:profileBuilderType},          
    ];

    return enrollmentObj.map((row)=>{
        return(                                
                  <CollapseContainerBody
                    keyName={row.title}
                    value={row.value}
                    keyRow={"3"}
                    valueRow={"3"}
                  />                                                 
        );
    });
  };
  render() {    
    return (
      <div>
        <CollapseContainer
          title={"Enrollment Details"}
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

export default connect(mapStateToProps, { getStudentsById })(EnrollmentDetail);
