import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import { port } from './RoutePaths';

export default class CareerPathOptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

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

    careerPathOptions = ['Would you want to pursue a career in your undergraduate field of study?',
        'How would you go about selecting your career paths?',
        'How would you go about selecting your career paths?[Other]',
        'Develop captivating & responsive websites and manage databases',
        'Promote Products or Services to End Customer using different social media channels',
        'Explore an interdisciplinary field which combines Mechanics,Electronics, Automation and Computers.',
        'Create an explosion scene for an action film',
        'Prevent fraudulent losses for business',
        'Evaluate, analyse maintain boilers or turbo machinery.',
        'Take part in competitions and solve coding problems',
        'Plan, direct, and coordinate the administrative functions of an organisation.',
        'Design dedicated computer hardware and software for intelligent devices',
        'Work on Augmented reality and Virtual Reality',
        'Manage wealth of high net worth individuals for their future needs',
        'To perform structural analysis using hand calculations and finite element analysis software',
        'My back up option is to:',
        'My back up option is to:[Other]',
        '[Process analyse digital images that enable computers to see',
        'Manage the process that transforms inputs to outputs in an organisation',
        'Build the next 8G network',
        'Be a part of developing PC or mobile games',
        'Process and settle financial transactions for trading desks',
        'Develop numerical programs to drive NC and CNC tools.']

    render() {
        return (
            <div>
                <div className="container">
                    {/* <header><label>Career Path Options</label></header> */}
                    <div className="table-responsive">
                        <table className="table">
                            {this.state.data.filter((student) => student.customerID === this.props.id).map((student) =>
                                <>
                                    <tr><td>{this.careerPathOptions[0]}</td><td>{JSON.stringify(student.careerPathOptions.careerInSameUGField)}</td></tr>
                                    <tr><td>{this.careerPathOptions[1]}</td><td>{student.careerPathOptions.selectionOfCareerPath}</td></tr>
                                    <tr><td>{this.careerPathOptions[2]}</td><td>{student.careerPathOptions.selectionOfCareerPathOthers}</td></tr>
                                    <tr><td>{this.careerPathOptions[3]}</td><td>{student.careerPathOptions.toDoDevelopWebAndManageDB}</td></tr>
                                    <tr><td>{this.careerPathOptions[4]}</td><td>{student.careerPathOptions.toDoPromoteProductsOrServicesInSocialMedia}</td></tr>
                                    <tr><td>{this.careerPathOptions[5]}</td><td>{student.careerPathOptions.toDoExploreInterDisciplinary}</td></tr>
                                    <tr><td>{this.careerPathOptions[6]}</td><td>{student.careerPathOptions.toDoCreateSceneForActionFilm}</td></tr>
                                    <tr><td>{this.careerPathOptions[7]}</td><td>{student.careerPathOptions.toDoPreventBusinessFraudLoss}</td></tr>
                                    <tr><td>{this.careerPathOptions[8]}</td><td>{student.careerPathOptions.toDoMaintiainBiolersTurboMachines}</td></tr>
                                    <tr><td>{this.careerPathOptions[9]}</td><td>{student.careerPathOptions.toDoParticipateCompetitionsAndSolveCodingProblems}</td></tr>
                                    <tr><td>{this.careerPathOptions[10]}</td><td>{student.careerPathOptions.toDoCoordinateAdminFunctions}</td></tr>
                                    <tr><td>{this.careerPathOptions[11]}</td><td>{student.careerPathOptions.toDoHardwareAndSoftwareIntelligentDevices}</td></tr>
                                    <tr><td>{this.careerPathOptions[12]}</td><td>{student.careerPathOptions.toDoAugmentedAndVirtualReality}</td></tr>
                                    <tr><td>{this.careerPathOptions[13]}</td><td>{student.careerPathOptions.toDoManageWealthHighnetworth}</td></tr>
                                    <tr><td>{this.careerPathOptions[14]}</td><td>{student.careerPathOptions.toDoStructuralAnalysisFiniteElementAnalysis}</td></tr>
                                    <tr><td>{this.careerPathOptions[15]}</td><td>{student.careerPathOptions.backupOption}</td></tr>
                                    <tr><td>{this.careerPathOptions[16]}</td><td>{student.careerPathOptions.backupOptionOthers}</td></tr>
                                    <tr><td>{this.careerPathOptions[17]}</td><td>{student.careerPathOptions.workToDoAnalyseDigitalImagesForComputers}</td></tr>
                                    <tr><td>{this.careerPathOptions[18]}</td><td>{student.careerPathOptions.workToDoManageOrganizationTransformationProcess}</td></tr>
                                    <tr><td>{this.careerPathOptions[19]}</td><td>{student.careerPathOptions.workToDoNext8GNetwork}</td></tr>
                                    <tr><td>{this.careerPathOptions[20]}</td><td>{student.careerPathOptions.workToDoDevelopGames}</td></tr>
                                    <tr><td>{this.careerPathOptions[21]}</td><td>{student.careerPathOptions.workToDoFiancialTransactionsAndTradingTasks}</td></tr>
                                    <tr><td>{this.careerPathOptions[22]}</td><td>{student.careerPathOptions.workToDoDevelopNumberProgramsForNCAndCNC}</td></tr>
                                </>
                            )}

                        </table>
                    </div>

                </div>

            </div>
        )
    }
}
