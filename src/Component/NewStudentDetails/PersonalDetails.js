import React, { Component } from 'react'
import { connect } from "react-redux";
import {getStudentsById} from "../../Actions/Student"
export class PersonalDetails extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        this.props.getStudentsById(this.props.id)
    }   
    componentDidUpdate(prevProps, prevState) {
        
    }
    
    render() {
        
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      StudentDetails: state.StudentReducer.StudentList,
    };
  };
  
  export default connect(mapStateToProps, { getStudentsById })(PersonalDetails);
  