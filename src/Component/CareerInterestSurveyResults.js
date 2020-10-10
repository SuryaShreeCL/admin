import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import { port } from './RoutePaths';
import {connect} from 'react-redux';
import {getStudentsById} from '../Actions/Student'

export class CareerInterestSurveyResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    careerInterestSurveyResults = ['Do you like your undergraduate field of study?',
        'How did you choose your undergraduate field of study (Eg. mechanical engineering, computer science engineering, etc.)?',
        'How did you choose your undergraduate field of study (Eg. mechanical engineering, computer science engineering, etc.)? [Other]',
        'From the following, what is your first preference for a career option immediately after graduation?',
        'From the following, what is your first preference for a career option immediately after graduation? [Other]',
        'What would you look for in your ideal job?',
        'Pay', 'Growth', 'Applying what you studied',
        'Working with people from different backgrounds',
        'Other',
        'Build a system to automatically recognise different food items',
        'Recruit new employees and design employee benefit program for them',
        'Develop systems where multiple devices that talk to each other',
        'Design User Interface for different mobile applications',
        'Generate more revenue for the bank by bringing in customers',
        'Use design software to model, test, and create products/assemblies',
        'Recognise and analyse patterns in large datasets',
        'Help business grow by improving their sales',
        'Design and develop machines that replace humans for various activities.',
        'Create my own 3D animated film like Kungfu Panda',
        'Analyse stocks and forecast capital markets',
        'Design machinery for large manufacturing companies'];

    componentDidMount() {
        //document.title = "basket";
        // axios.get(port+"/api/v1/students", {
        //     crossDomain: true
        // })
        //     .then(res => res.data)
        //     .then(result => {
        //         console.log(result)
        //         this.setState({
        //             data: result
        //         })
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        console.log('didmount');
        this.props.getStudentsById(this.props.id);

    }    
    render() {
        console.log(this.props);
        return (
            <div>
                <div className="container">
                    {/* <header><label>Careeer Intrest Survey Result</label></header> */}
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{ 
        StudentDetails:state.StudentReducer.StudentList,
     }
}

export default connect(mapStateToProps,{getStudentsById})(CareerInterestSurveyResults)