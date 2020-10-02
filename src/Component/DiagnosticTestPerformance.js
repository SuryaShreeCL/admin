import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'

export default class DiagnosticTestPerformance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        //document.title = "basket";
        axios.get("http://localhost:8080/api/v1/students", {
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
    diagnostic = ['Overall Aptitude Score',
        'Numerical Ability Score',
        'Spatial Reasoning Score',
        'Abstract Reasoning Score',
        'Logical Reasoning Score',
        'Data Interpretation Score',
        'Verbal Reasoning Score',
        'Reading Comprehension Score',
        'Speaking Score',
        'Writing Score',
        'Lstening Score',
        'Achievement Drive Score',
        'People Skills Score', 'Locus of Control Score',
        'Creativity Score',
        'Finding Problems (Preparation) Score',
        'Gathering and Reflecting on Information (Incubation) Score',
        'Problem Exploration (Insight) Score',
        'Generating and Evaluating Ideas (Evaluation) Score',
        'Implementation (Elaboration) Score', 'Emotional Intelligence Total',
        'Emotional Intelligence : Emotional Self Awareness (Out of 20) Score',
        'Emotional Intelligence : Empathy (Score Out of 20) Score',
        'Emotional Intelligence : Positive Outlook (Score Out of 20) Score',
        'Emotional Intelligence : Emotional Self Control (Score Out of 20) Score',
        'Emotional Intelligence : Adaptability (Score Out of 20) Score'];
    render() {
        return (
            <div>
                <div className="container">
                    {/* <header><label>Diagnostic Test Performance</label></header> */}
                    <div className="table-responsive">
                        <table className="table">
                            {this.state.data.filter((student) => student.customerID === this.props.id).map((student) =>
                                <>
                                    <tr><td>{this.diagnostic[0]}</td><td>{student.diagnosticTestPerformance.overallAptitudeScore}</td></tr>
                                    <tr><td>{this.diagnostic[1]}</td><td>{student.diagnosticTestPerformance.numericalAbilityScore}</td></tr>
                                    <tr><td>{this.diagnostic[2]}</td><td>{student.diagnosticTestPerformance.spatialReasoningScore}</td></tr>
                                    <tr><td>{this.diagnostic[3]}</td><td>{student.diagnosticTestPerformance.abstractReasoningScore}</td></tr>
                                    <tr><td>{this.diagnostic[4]}</td><td>{student.diagnosticTestPerformance.logicalReasoningScore}</td></tr>
                                    <tr><td>{this.diagnostic[5]}</td><td>{student.diagnosticTestPerformance.dataInterpretationScore}</td></tr>
                                    <tr><td>{this.diagnostic[6]}</td><td>{student.diagnosticTestPerformance.verbalReasoningScore}</td></tr>
                                    <tr><td>{this.diagnostic[7]}</td><td>{student.diagnosticTestPerformance.readingComprehensionScore}</td></tr>
                                    <tr><td>{this.diagnostic[8]}</td><td>{student.diagnosticTestPerformance.speakingScore}</td></tr>
                                    <tr><td>{this.diagnostic[9]}</td><td>{student.diagnosticTestPerformance.writingScore}</td></tr>
                                    <tr><td>{this.diagnostic[10]}</td><td>{student.diagnosticTestPerformance.listeningScore}</td></tr>
                                    <tr><td>{this.diagnostic[11]}</td><td>{student.diagnosticTestPerformance.achievementDriveScore}</td></tr>
                                    <tr><td>{this.diagnostic[12]}</td><td>{student.diagnosticTestPerformance.peopleSkillsScore}</td></tr>
                                    <tr><td>{this.diagnostic[13]}</td><td>{student.diagnosticTestPerformance.locusOfControlScore}</td></tr>
                                    <tr><td>{this.diagnostic[14]}</td><td>{student.diagnosticTestPerformance.creativityScore}</td></tr>
                                    <tr><td>{this.diagnostic[15]}</td><td>{student.diagnosticTestPerformance.preparationScore}</td></tr>
                                    <tr><td>{this.diagnostic[16]}</td><td>{student.diagnosticTestPerformance.incubationScore}</td></tr>
                                    <tr><td>{this.diagnostic[17]}</td><td>{student.diagnosticTestPerformance.insightScore}</td></tr>
                                    <tr><td>{this.diagnostic[18]}</td><td>{student.diagnosticTestPerformance.evaluationScore}</td></tr>
                                    <tr><td>{this.diagnostic[19]}</td><td>{student.diagnosticTestPerformance.elaborationScore}</td></tr>
                                    <tr><td>{this.diagnostic[20]}</td><td>{student.diagnosticTestPerformance.emoIntTotal}</td></tr>
                                    <tr><td>{this.diagnostic[21]}</td><td>{student.diagnosticTestPerformance.emoIntSelfAwarenessScore}</td></tr>
                                    <tr><td>{this.diagnostic[22]}</td><td>{student.diagnosticTestPerformance.emoIntEmpathyScore}</td></tr>
                                    <tr><td>{this.diagnostic[23]}</td><td>{student.diagnosticTestPerformance.emoIntPositiveOutlook}</td></tr>
                                    <tr><td>{this.diagnostic[24]}</td><td>{student.diagnosticTestPerformance.emoIntSelfControlScore}</td></tr>
                                    <tr><td>{this.diagnostic[25]}</td><td>{student.diagnosticTestPerformance.emoIntAdaptabilityScore}</td></tr>

                                </>
                            )}

                        </table>
                    </div>

                </div>
            </div>
        )
    }
}
