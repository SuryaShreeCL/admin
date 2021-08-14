import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";

class TinyEditor extends Component {
  render() {
    return (
      <>
        <Editor
          initialValue={this.props.data}
          onEditorChange={this.props.onEditorChange}
          init={{
            init_instance_callback: (editor) => {
              document.querySelector(
                ".tox .tox-notification--in"
              ).style.display = "none";
            },
            branding: false,
            height: 565,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </>
    );
  }
}

export default TinyEditor;
