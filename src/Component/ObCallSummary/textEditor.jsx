import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import Pencil from "../../Asset/Images/pencil.png";
import { connect } from "react-redux";
import { updateQuestions, getClientInfo } from '../../Actions/Calldetails'
import { ControlCameraOutlined } from '@material-ui/icons';
import PrimaryButton from '../../Utils/PrimaryButton';
const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            // height: 0.1
        }}
    />
);

class Question extends Component {
    constructor() {
        super()
        this.state = {
            disable: true,
            questions: '',
            expectations: '',
            concerns: '',
            feedback: '',

        }
    }

    componentDidMount() {
        this.props.getClientInfo(
          this.props.match.params.studentId,
          this.props.match.params.productId
        );
       }
       componentDidUpdate(prevProps, prevState){
        if(this.props.getClientInfoList !== prevProps.getClientInfoList){
          this.setState({
            questions: this.props.getClientInfoList.questions !== null ? this.props.getClientInfoList.questions : '',
            expectations: this.props.getClientInfoList.expectations !== null ? this.props.getClientInfoList.expectations : '',
            concerns: this.props.getClientInfoList.concerns !== null ? this.props.getClientInfoList.concerns : '',
            feedback: this.props.getClientInfoList.feedback !== null ? this.props.getClientInfoList.feedback : '',
          })
        }
      }

    handleClick(e) {

        this.setState({ disable: !this.state.disable })
    };

    // componentDidMount() {
    //     this.props.updateQuestions()
    //     console.log(this.props.updateQuestions())
    // };
    handleSaved = () => {
        // console.log(this.state,'state')
        let obj = {
            question: this.state.questions,
            expectations: this.state.expectations,
            concerns: this.state.concerns,
            feedback: this.state.feedback,

        }
        console.log(obj, "hello")
        this.props.updateQuestions(this.props.match.params.studentId, this.props.match.params.productId, obj)
    }
    // if() {
    //     let obj = {
    //         questions: this.state.questions,
    //         expectations: this.state.expectations,
    //         concerns: this.state.concerns,
    //         feedback: this.state.feedback,
    //     }
    // }


    render() {
        // console.log(this.state)
        return (
            <div >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ color: '#407BFF', fontSize: 18, paddingTop: 20, fontFamily: 'Montserrat', fontWeight: 600 }}>
                        Client Questions
                    </div>
                    <IconButton style={{ left: '80%', top: 5 }} onClick={this.handleClick.bind(this)}>
                        <img src={Pencil} height={17} width={17} />
                    </IconButton>
                </div>
                <Grid container spacing={2} style={{ paddingTop: 20 }} >

                    <Grid item xs={12} sm={6}  >
                        <div style={{ color: '#686868', fontSize: 12, }}>
                            Questions (Factual, Doubts)
                        </div>

                        <CKEditor
                            value={this.state.questions}
                            editor={ClassicEditor}
                            data={this.state.questions}
                            config={{
                                mediaEmbed: {
                                    previewsInData: true,
                                },
                                readOnly: {
                                    readOnly: true
                                }
                            }}

                            disabled={this.state.disable}
                            onChange={(event, editors) => {
                                const data = editors.getData();
                                // console.log( { event, editors, data } );
                                this.setState({ questions: data })
                            }}

                        />
                        <ColoredLine color="gray" />


                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <div style={{ color: '#686868', fontSize: 12 }}>
                            Expectations
                        </div>

                        <CKEditor
                            
                            value={this.state.expectations}
                            editor={ClassicEditor}
                            data={this.state.expectations}
                            config={

                                {
                                    mediaEmbed: {
                                        previewsInData: true,
                                    },
                                    readOnly: {
                                        readOnly: true
                                    }
                                }}
                            disabled={this.state.disable}
                            onChange={(event, editors) => {
                                const data = editors.getData();
                                // console.log( { event, editors, data } );
                                this.setState({ expectations: data })
                            }}
                        />
                        <ColoredLine color="gray" />
                    </Grid>

                    <Grid item xs={12} sm={6} style={{ marginTop: '-20px' }}>
                        <div style={{ color: '#686868', fontSize: 12 }}>
                            Concerns / Issues / Complaints (Testimonials, Trust Issues, Pricey, No Proven Track Record)
                        </div>

                        <CKEditor
                            editor={ClassicEditor}
                            value={this.state.concerns}
                            disabled={this.state.disable}
                            data={this.state.concerns}
                            config={{
                                mediaEmbed: {
                                    previewsInData: true,
                                },
                                readOnly: {
                                    readOnly: true
                                }
                            }}
                            onChange={(event, editors) => {
                                const data = editors.getData();
                                // console.log( { event, editors, data } );
                                this.setState({ concerns: data })
                            }}
                        />
                        <ColoredLine color="gray" />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ marginTop: '-20px' }}>
                        <div style={{ color: '#686868', fontSize: 12, paddingBottom:15 }}>
                            Feedback
                        </div>

                        <CKEditor
                            value={this.state.feedback}
                            editor={ClassicEditor}
                            disabled={this.state.disable}
                            data={this.state.feedback}
                            config={{
                                mediaEmbed: {
                                    previewsInData: true,
                                },

                            }}
                            onChange={(event, editors) => {
                                const data = editors.getData();
                                // console.log( { event, editors, data } );
                                this.setState({ feedback: data })
                            }}
                        />


                        <ColoredLine color="gray" />
                    </Grid>

                </Grid>
                <PrimaryButton style={{ width: "130px" }} color={"primary"} variant={"contained"} onClick={() => this.handleSaved()}>Save</PrimaryButton>
            </div>


        );
    }
}
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        updateQuestionsList: state.CallReducer.updateQuestions,
        getClientInfoList: state.CallReducer.getClientInfo,
    };
};

export default connect(mapStateToProps, {
    updateQuestions,
    getClientInfo
})(Question);

