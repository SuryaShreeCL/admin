import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import {URL} from '../Actions/URL'

export class HigherEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }

    }
    highereducation = ['Are you planning to pursue Higher Education',
        'Which of the below fields would you choose to pursue your higher education in?',
        'Which of the following tests do you intend to take?',
        'ALREADY TAKEN ?',
        'Taken GRE?',
        'GRE Expected Date Of Exam',
        'GRE Quant Score', 'GRE Verbal Score', 'GRE Awa Score', 'GRE Total Score',
        'Taken GMAT', 'GMAT Expected Date Of Exam',
        'GMAT Quant Score', 'GMAT Verbal Score', 'GMAT Awa Score', 'GMAT Total Score',
        'Taken TOEFL', 'TOEFL Expected Date Of Exam',
        'TOEFL Reading Score', 'TOEFL Listening Score', 'TOEFL Speaking Score',
        'TOEFL Writing Score', 'TOEFL Total Score',
        'Taken IELTS?', 'IELTS Expected Date Of Exam',
        'IELTS Reading Score',
        'IELTS Listening Score',
        'IELTS Speaking Score',
        'IELTS writing Score',
        'IELTS Total Score',
        'Integrated Reasoning Score',
        'GATE Rank',
        'Branch',
        'Number Of Schools',
        'Term',
        'Year',
        'Degree',
        'Where do you want to apply',
        'List of Dream Colleges',
        'Area of Specialization'];
    componentDidMount() {
        //document.title = "basket";
        axios.get(URL+"/api/v1/students", {
            crossDomain: true
        })
            .then(res => res.data)
            .then(result => {
                console.log(result)
                this.setState({
                    data: result
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <div className="container">
                    {/* <header><label>Higher Education Plans</label></header> */}
                    <div className="table-responsive">
                        <table className="table">
                            {this.state.data.filter((student) => student.customerID === this.props.id).map((student) =>
                                <>
                                    <tr><td>{this.highereducation[0]}</td><td>{JSON.stringify(student.higherEducationOptions.hasHigherEduPlans)}</td></tr>
                                    <tr><td>{this.highereducation[1]}</td><td>{student.higherEducationOptions.possibleFields}</td></tr>
                                    <tr><td>{this.highereducation[2]}</td><td>{student.higherEducationOptions.intentedTests}</td></tr>
                                    <tr><td>{this.highereducation[3]}</td><td>{JSON.stringify(student.higherEducationOptions.alreadyTaken)}</td></tr>
                                    <tr><td>{this.highereducation[4]}</td><td>{JSON.stringify(student.higherEducationOptions.takenGRE)}</td></tr>
                                    <tr><td>{this.highereducation[5]}</td><td>{student.higherEducationOptions.greExpectedDateOfExam}</td></tr>
                                    <tr><td>{this.highereducation[6]}</td><td>{student.higherEducationOptions.greQuatScore}</td></tr>
                                    <tr><td>{this.highereducation[7]}</td><td>{student.higherEducationOptions.greVerbalScore}</td></tr>
                                    <tr><td>{this.highereducation[8]}</td><td>{student.higherEducationOptions.greAwaScore}</td></tr>
                                    <tr><td>{this.highereducation[9]}</td><td>{student.higherEducationOptions.greTotalScore}</td></tr>
                                    <tr><td>{this.highereducation[10]}</td><td>{JSON.stringify(student.higherEducationOptions.takenGMAT)}</td></tr>
                                    <tr><td>{this.highereducation[11]}</td><td>{student.higherEducationOptions.gmatExpectedDateOfExam}</td></tr>
                                    <tr><td>{this.highereducation[12]}</td><td>{student.higherEducationOptions.gmatQuatScore}</td></tr>
                                    <tr><td>{this.highereducation[13]}</td><td>{student.higherEducationOptions.gmatVerbalScore}</td></tr>
                                    <tr><td>{this.highereducation[14]}</td><td>{student.higherEducationOptions.gmatAwaScore}</td></tr>
                                    <tr><td>{this.highereducation[15]}</td><td>{student.higherEducationOptions.gmatTotalScore}</td></tr>
                                    <tr><td>{this.highereducation[16]}</td><td>{JSON.stringify(student.higherEducationOptions.takenTOEFL)}</td></tr>
                                    <tr><td>{this.highereducation[17]}</td><td>{student.higherEducationOptions.toeflExpectedDateOfExam}</td></tr>
                                    <tr><td>{this.highereducation[18]}</td><td>{student.higherEducationOptions.toeflReadingScore}</td></tr>
                                    <tr><td>{this.highereducation[19]}</td><td>{student.higherEducationOptions.toeflListeningScore}</td></tr>
                                    <tr><td>{this.highereducation[20]}</td><td>{student.higherEducationOptions.toeflSpeakingScore}</td></tr>
                                    <tr><td>{this.highereducation[21]}</td><td>{student.higherEducationOptions.toeflwritingScore}</td></tr>
                                    <tr><td>{this.highereducation[22]}</td><td>{student.higherEducationOptions.toeflTotalScore}</td></tr>
                                    <tr><td>{this.highereducation[23]}</td><td>{JSON.stringify(student.higherEducationOptions.takenIELTS)}</td></tr>
                                    <tr><td>{this.highereducation[24]}</td><td>{student.higherEducationOptions.ieltsExpectedDateOfExam}</td></tr>
                                    <tr><td>{this.highereducation[25]}</td><td>{student.higherEducationOptions.ieltsReadingScore}</td></tr>
                                    <tr><td>{this.highereducation[26]}</td><td>{student.higherEducationOptions.ieltsListeningScore}</td></tr>
                                    <tr><td>{this.highereducation[27]}</td><td>{student.higherEducationOptions.ieltsSpeakingScore}</td></tr>
                                    <tr><td>{this.highereducation[28]}</td><td>{student.higherEducationOptions.ieltswritingScore}</td></tr>
                                    <tr><td>{this.highereducation[29]}</td><td>{student.higherEducationOptions.ieltsTotalScore}</td></tr>
                                    <tr><td>{this.highereducation[30]}</td><td>{student.higherEducationOptions.integratedReasoningScore}</td></tr>
                                    <tr><td>{this.highereducation[31]}</td><td>{student.higherEducationOptions.gateRank}</td></tr>
                                    <tr><td>{this.highereducation[32]}</td><td>{student.higherEducationOptions.branch}</td></tr>
                                    <tr><td>{this.highereducation[33]}</td><td>{student.higherEducationOptions.numberOfSchools}</td></tr>
                                    <tr><td>{this.highereducation[34]}</td><td>{student.higherEducationOptions.term}</td></tr>
                                    <tr><td>{this.highereducation[35]}</td><td>{student.higherEducationOptions.year}</td></tr>
                                    <tr><td>{this.highereducation[36]}</td><td>{student.higherEducationOptions.degree}</td></tr>
                                    <tr><td>{this.highereducation[37]}</td><td>{student.higherEducationOptions.countriesToApply}</td></tr>
                                    <tr><td>{this.highereducation[38]}</td><td>{student.higherEducationOptions.dreamColleges}</td></tr>
                                    <tr><td>{this.highereducation[39]}</td><td>{student.higherEducationOptions.areaOfSpecialization}</td></tr>
                                </>
                            )}

                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default HigherEducation;
