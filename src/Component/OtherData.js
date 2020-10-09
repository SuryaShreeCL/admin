import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { getStudentsById } from '../Actions/Student';
import { connect } from 'react-redux';


export class Other_data extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    others = [
        'Alternative Phone Number',
        'Alternative Email ID',
        'Department',
        'Number of Active Backlogs',
        'Number of Cleared Backlogs',
        'Present Semester',
        'Personality Code',
        'What are your top three favorite subjects in your undergraduate field of study?',
        'What electives are you taking in the current semester or will be taking in the coming semester?',
        'What outcomes do you want from your journey with the CareerLabs Profile Builder for Placement ?',
        'What outcomes do you want from your journey with the CareerLabs Profile Builder for Placement ?[Other]',
        'What are your top three hobbies?',
        'What was your favourite subject in 11th /12th grade?',
        'Top 3 Subjects in UG',
        'Do you like to code?',
        'Do you like talking to people?',
        'UG Degree',
        'UG GPA Scale',
        'UG GPA',
        'University'
    ];

    componentDidMount() { 
       this.props.getStudentsById(this.props.id)    
    }
    render() {
        var student=this.props.StudentDetails;
        console.log(student)
        return (
            <div>
                <div className="container">
                    {/* <header><label>Careeer Intrest Survey Result</label></header> */}
                    <div className="table-responsive">
                        {(student !==undefined) ? 
                        <table className="table">                                                            
                        <tr>
                            <td>{
                                this.others[0]
                            }</td>
                            <td>{
                                student.altPhoneNumber
                            }</td>
                        </tr>
                         <tr>
                            <td>{
                                this.others[1]
                            }</td>
                            <td>{
                                student.altEmailID
                            }</td>
                        </tr>
                        <tr>
                            <td>{
                                this.others[2]
                            }</td>
                            <td>{
                                student.department
                            }</td>
                        </tr>
                        <tr>
                            <td>{
                                this.others[3]
                            }</td>
                            <td>{
                                student.noOfActiveBacklogs
                            }</td>
                        </tr>
                        <tr>
                            <td>{
                                this.others[4]
                            }</td>
                            <td>{
                                student.noOfClearedBacklogs
                            }</td>
                        </tr>
                        <tr>
                            <td>{
                                this.others[5]
                            }</td>
                            <td>{
                                student.presentSemester
                            }</td>
                        </tr>
                        <tr>
                            <td>{
                                this.others[6]
                            }</td>
                            <td>{
                                student.personalityCode
                            }</td>
                        </tr>
                        <tr>
                            <td>{
                                this.others[7]
                            }</td>
                            <td>{
                                student.favouriteSubjects
                            }</td>
                        </tr>
                        <tr>
                            <td>{
                                this.others[8]
                            }</td>
                            <td>{
                                student.electives
                            }</td>
                        </tr>
                        <tr>
                            <td>{
                                this.others[9]
                            }</td>
                            <td>{
                                student.expectedOutcomeFromProfileBuilder
                            }</td>
                        </tr>
                        <tr>
                            <td>{
                                this.others[10]
                            }</td>
                            <td>{
                                student.expectedOutcomeFromProfileBuilderOther
                            }</td>
                        </tr>
                        <tr>
                            <td>{
                                this.others[11]
                            }</td>
                            <td>{
                                student.hobbies
                            }</td>
                        </tr>
                        <tr>
                            <td>{
                                this.others[12]
                            }</td>
                            <td>{
                                student.favSubjectIn11or12thGrade
                            }</td>
                        </tr>
                        <tr>
                            <td>{
                                this.others[13]
                            }</td>
                            <td>{
                                student.top3Subjects
                            }</td>
                        </tr>
                        <tr>
                            <td>{
                                this.others[14]
                            }</td>
                            <td>{
                                JSON.stringify(student.likeCoding)
                            }</td>
                        </tr>
                        <tr>
                            <td>{
                                this.others[15]
                            }</td>
                            <td>{
                                JSON.stringify(student.likeTalkingToPeople)
                            }</td>
                        </tr>
                        <tr>
                            <td>{
                                this.others[16]
                            }</td>
                            <td>{
                                student.ugdegree
                            }</td>
                        </tr>
                        <tr>
                            <td>{
                                this.others[17]
                            }</td>
                            <td>{
                                student.uggpascale
                            }</td>
                        </tr>
                       <tr>
                            <td>{
                                this.others[18]
                            }</td>
                            <td>{
                                student.uggpa
                            }</td>
                        </tr>
                       
                        <tr>
                            <td>{
                                this.others[19]
                            }</td>
                            <td>{
                                student.university
                            }</td>
                        </tr> 
                    
                 </table>

               : null }
                    </div>
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

export default connect(mapStateToProps,{getStudentsById})(Other_data)