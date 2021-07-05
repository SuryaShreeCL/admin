import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FileProgress } from './FileProgress';

export function SingleFileUploadWithProgress({ file, onDelete, onUpload, url, uploadType }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function upload() {
      const url = await uploadFile(file, setProgress, uploadType);
      onUpload(file, url);
    }

    upload();
  }, []);

  return (
    <Grid item>
      <FileProgress file={file} url={url} onDelete={onDelete} progress={progress} />
    </Grid>
  );
}

function uploadFile(file, onProgress, uploadType) {
  const url = `https://api.cloudinary.com/v1_1/demo/${uploadType}/upload`;
  const key = 'docs_upload_example_us_preset';

  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      res(resp.secure_url);
    };
    xhr.onerror = (evt) => rej(evt);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage));
      }
    };

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', key);

    xhr.send(formData);
  });
}
