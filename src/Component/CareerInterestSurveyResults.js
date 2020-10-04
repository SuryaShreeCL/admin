import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import { port } from './RoutePaths';

export default class CareerInterestSurveyResults extends Component {
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
        axios.get(port+"/api/v1/students", {
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
                    {/* <header><label>Careeer Intrest Survey Result</label></header> */}
                    <div className="table-responsive">
                        <table className="table">
                            {this.state.data.filter((student) => student.customerID === this.props.id).map((student) =>
                                <>
                                    <tr><td>{this.careerInterestSurveyResults[0]}</td><td>{student.careerInterestSurveyResults.likeUGFieldOfStudy}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[1]}</td><td>{student.careerInterestSurveyResults.reasonForChoice}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[2]}</td><td>{student.careerInterestSurveyResults.reasonForChoiceOther}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[3]}</td><td>{student.careerInterestSurveyResults.preferredCareerOptionAfterGraduation}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[4]}</td><td>{student.careerInterestSurveyResults.preferredCareerOptionAfterGraduationOther}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[5]}</td><td>{student.careerInterestSurveyResults.idealJobOption}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[6]}</td><td>{student.careerInterestSurveyResults.idealJobOptionPay}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[7]}</td><td>{student.careerInterestSurveyResults.idealJobOptionGrowth}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[8]}</td><td>{student.careerInterestSurveyResults.idealJobOptionApplyStudied}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[9]}</td><td>{student.careerInterestSurveyResults.idealJobOptionDiverseBackground}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[10]}</td><td>{student.careerInterestSurveyResults.idealJobOptionOther}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[11]}</td><td>{student.careerInterestSurveyResults.workOptionAutoFoodRecongnition}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[12]}</td><td>{student.careerInterestSurveyResults.workOptionRecruitNewEmployees}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[13]}</td><td>{student.careerInterestSurveyResults.workOptionDeviceTalkToEachOther}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[14]}</td><td>{student.careerInterestSurveyResults.workOptionUIForApps}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[15]}</td><td>{student.careerInterestSurveyResults.workOptionCustomerAcqAndRevForBank}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[16]}</td><td>{student.careerInterestSurveyResults.workOptionDesignSoftware}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[17]}</td><td>{student.careerInterestSurveyResults.workOptionLargeDatasetPatternAnalysis}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[18]}</td><td>{student.careerInterestSurveyResults.workOptionBusinessGrowthByImprovingSales}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[19]}</td><td>{student.careerInterestSurveyResults.workOptionDevelopMachinesToHumanActivities}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[20]}</td><td>{student.careerInterestSurveyResults.workOptionOwn3DAnimationFilm}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[21]}</td><td>{student.careerInterestSurveyResults.workOptionStockAndCapitalMarketAnalysis}</td></tr>
                                    <tr><td>{this.careerInterestSurveyResults[22]}</td><td>{student.careerInterestSurveyResults.workOptionManufacturingDesign}</td></tr>

                                </>
                            )}

                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
