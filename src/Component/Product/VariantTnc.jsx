import { Grid, Typography, withStyles, createMuiTheme,Button } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
class VariantTnc extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className={classes.heading}>Product Terms and Conditions</Typography> <br />
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        /><br />
                    </Grid>
                    <Grid xs={12} style={{ width: "100%", height: "1px", backgroundColor: "#000000", opacity: "0.2" }}></Grid> <br />
                    <Grid item xs={12}>
                        <Typography className={classes.heading}>Product Service Agreement   </Typography><br />
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            onReady={editors => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editors);
                            }}
                            onChange={(event, editors) => {
                                const data = editors.getData();
                                console.log({ event, editors, data });
                            }}
                            onBlur={(event, editors) => {
                                console.log('Blur.', editors);
                            }}
                            onFocus={(event, editors) => {
                                console.log('Focus.', editors);
                            }}
                        /><br />
                    </Grid>
                    <Grid xs={12} style={{ width: "100%", height: "1px", backgroundColor: "#000000", opacity: "0.2" }}></Grid> <br />
                    <Grid style={{ margin: '0 auto' }}>
                        <Button variant="contained" className={classes.varientBtn} color="primary">
                            Create Varient
                         </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
const useStyles = (theme = createMuiTheme()) => ({
    heading: {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '12px',
        lineHeight: '15px',
        color: "#686868"
    },
    varientBtn: {
        backgroundColor: "#1093FF",
        borderRadius: '30px',
        color: "#fff",
        // width : "189px",
        // height : "33px"
    }

})
const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {})(withStyles(useStyles)(VariantTnc))