import React, { Component } from "react";
import TinyEditor from "../../../Utils/textEditor/TinyEditor";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorSource: [],
    };
  }

  onEditorTextChange = (evt, editor) => {
    this.setState({
      editorSource: editor.getContent(),
    });
  };

  render() {
    return (
      <>
        <TinyEditor onEditorChange={this.onEditorTextChange} />
        <p>{this.state.editorSource}</p>
      </>
    );
  }
}

export default Index;
