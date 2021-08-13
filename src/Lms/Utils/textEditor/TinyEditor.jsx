import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";

class TinyEditor extends Component {
  render() {
    return (
      <>
        <Editor
          onChange={this.props.onEditorChange}
          init={{
            selector: "textarea",
            init_instance_callback: function() {
              var freeTiny = document.querySelector(
                ".tox .tox-notification--in"
              );
              freeTiny.style = "display: none";
            },
            branding: false,
            height: 500,
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
