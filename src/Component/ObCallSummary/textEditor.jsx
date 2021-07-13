import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
    render() {
        return (
            <div style={{ padding: 10 }}>

                <div style={{ color: '#407BFF', fontSize: 18,paddingLeft:20 }}>
                    Client Questions
                </div>
                <Grid container spacing={4} style={{padding: 10,}}>

                    <Grid item xs={12} sm={6}  >
                        <div style={{ color: '#686868', fontSize: 12 }}>
                            Questions (Factual, Doubts)
                        </div>
                        
                        <CKEditor
                            editor={ClassicEditor}
                            data="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                            config={{
                                mediaEmbed: {
                                    previewsInData: true,
                                }, 
                            }}
                            
                            disabled={false}
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
                            config={{
                                mediaEmbed: {
                                    previewsInData: true,
                                }
                            }}
                            disabled={false}
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
                            Concerns / Issues / Complaints (Testimonials, Trust Issues, Pricey, No Proven Track Record)
                        </div>

                        <CKEditor

                            editor={ClassicEditor}
                            data="Lorem Ipsum is  dummy text of the printing industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                            config={{
                                mediaEmbed: {
                                    previewsInData: true,
                                }
                            }}
                            disabled={false}
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
                            Observations
                        </div>

                        <CKEditor

                            editor={ClassicEditor}
                            data="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                            config={{
                                mediaEmbed: {
                                    previewsInData: true,
                                }
                            }}
                            disabled={false}
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