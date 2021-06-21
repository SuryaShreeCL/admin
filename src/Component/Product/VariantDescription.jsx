import { Grid, Typography, createMuiTheme, withStyles, Button } from '@material-ui/core'
import React, { Component } from 'react'
import { render } from 'react-dom';
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { connect } from 'react-redux'

class VariantDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneLineDes: EditorState.createEmpty(),
      shortDescription: EditorState.createEmpty(),
      description: EditorState.createEmpty(),
    };
  }
  onEditorStateChange = (oneLineDes) => {
    this.setState({
      oneLineDes,
    });
  };
  onEditorStateChangeDes = (shortDescription) => {
    this.setState({
      shortDescription,
    });
  };
  onEditorStateChangeDescription = (description) => {
    this.setState({
      description,
    });
  };

  render() {
    // const { editorState } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.heading}>Product one liner</Typography>
            <br />
            <div className="editor" >
              <Editor
                editorState={this.state.oneLineDes}
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                }}
              />
            </div>
            <Grid xs={12} style={{ width: "100%", height: "1px", backgroundColor: "#000000" }}></Grid> <br />
            <Typography className={classes.heading}>Product Short Description</Typography>
            <br />
            <div className="editor" >
              <Editor
                editorState={this.state.shortDescription}
                onEditorStateChange={this.onEditorStateChangeDes}
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                }}
              />
            </div>
            <Grid xs={12} style={{ width: "100%", height: "1px", backgroundColor: "#000000" }}></Grid> <br />
            <Typography className={classes.heading}>Product Description</Typography>
            <br />
            <div className="editor" >
              <Editor
                editorState={this.state.description}
                onEditorStateChange={this.onEditorStateChangeDescription}
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                }}
              />
            </div>
            <Grid xs={12} style={{ width: "100%", height: "1px", backgroundColor: "#686868" }}></Grid> <br />
          </Grid>
          {/* <Grid style={{margin: '0 auto'}}>
          <Button variant="contained" className={classes.varientBtn} color="primary">
           Create Varient
          </Button>
          </Grid> */}
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
  varientBtn : {
    backgroundColor : "#1093FF",
    borderRadius: '30px',
    color : "#fff",
    // width : "189px",
    // height : "33px"
  }

})
const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, {})(withStyles(useStyles)(VariantDescription)) 