import React from 'react';
import { useDropzone } from 'react-dropzone';

function Accept(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className='container'>
      <div {...getRootProps({ className: 'drop_zone_style' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
}

export default Accept;
{
  /* <Accept />; */
}
