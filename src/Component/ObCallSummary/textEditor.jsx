import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import Pencil from "../../Asset/Images/pencil.png";

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

        }
    }

    handleClick(e) {

        this.setState({ disable: !this.state.disable })
    }

    render() {
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

                            editor={ClassicEditor}
                            data="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                            config={{
                                mediaEmbed: {
                                    previewsInData: true,
                                },
                                readOnly: {
                                    readOnly: true
                                }
                            }}

                            disabled={this.state.disable}
                            onInit={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                console.log(data);
                            }}
                            onBlur={editor => {
                                console.log("Blur.", editor);
                            }}
                            onFocus={editor => {
                                console.log("Focus.", editor);
                            }}
                        />
                        <ColoredLine color="gray" />


                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <div style={{ color: '#686868', fontSize: 12 }}>
                            Expectations
                        </div>

                        <CKEditor

                            editor={ClassicEditor}
                            data="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"

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
                            onInit={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                console.log(data);
                            }}
                            onBlur={editor => {
                                console.log("Blur.", editor);
                            }}
                            onFocus={editor => {
                                console.log("Focus.", editor);
                            }}
                        />
                        <ColoredLine color="gray" />
                    </Grid>

                    <Grid item xs={12} sm={6}  style={{marginTop:'-20px'}}>
                        <div style={{ color: '#686868', fontSize: 12}}>
                            Concerns / Issues / Complaints (Testimonials, Trust Issues, Pricey, No Proven Track Record)
                        </div>

                        <CKEditor
                            editor={ClassicEditor}
                            disabled={this.state.disable}
                            data="Lorem Ipsum is  dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                            config={{
                                mediaEmbed: {
                                    previewsInData: true,
                                },
                                readOnly: {
                                    readOnly: true
                                }
                            }}

                            onInit={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                console.log(data);
                            }}
                            onBlur={editor => {
                                console.log("Blur.", editor);
                            }}
                            onFocus={editor => {
                                console.log("Focus.", editor);
                            }}
                        />
                        <ColoredLine color="gray" />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{marginTop:'-20px'}}>
                        <div style={{ color: '#686868', fontSize: 12, }}>
                            Observations
                        </div>

                        <CKEditor
                            editor={ClassicEditor}
                            disabled={this.state.disable}
                            data="Lorem Ipsum is simply dummy text and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                            config={{
                                mediaEmbed: {
                                    previewsInData: true,
                                },

                            }}

                            onInit={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                console.log(data);
                            }}
                            onBlur={editor => {
                                console.log("Blur.", editor);
                            }}
                            onFocus={editor => {
                                console.log("Focus.", editor);
                            }}
                        />


                        <ColoredLine color="gray" />
                    </Grid>

                </Grid>

            </div>


        );
    }
}

export default Question;