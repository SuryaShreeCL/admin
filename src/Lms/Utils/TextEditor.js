import React, { Component } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "uploadImage",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
    "MathType",
    "ChemType",
    "codeBlock",
    "imageTextAlternative",
    "|",
    "imageStyle:full",
    "imageStyle:side",
  ],
  styles: ["full", "alignLeft", "alignRight"],
};

const TextEditor = ({ data, onChange, config = {}, ...props }) => {
  return (
    <CKEditor
      editor={Editor}
      config={{
        ...editorConfiguration,
        ...config,
      }}
      data={data || ""}
      onChange={onChange}
      {...props}
    />
  );
};

export default TextEditor;
