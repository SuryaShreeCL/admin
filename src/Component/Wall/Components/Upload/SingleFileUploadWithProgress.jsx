import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FileProgress } from './FileProgress';

export function SingleFileUploadWithProgress({ file, onDelete, onUpload, url, fileType }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function upload() {
      const data = await uploadFile(file, setProgress, fileType);
      onUpload(file, data);
    }

    upload();
  }, []);

  return (
    <Grid item>
      <FileProgress file={file} url={url} onDelete={onDelete} progress={progress} />
    </Grid>
  );
}

function uploadFile(file, onProgress, fileType) {
  const awsUrl = `${process.env.REACT_APP_API_URL}/api/v1/wallfile/type/${fileType}`;

  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', awsUrl);
    xhr.setRequestHeader('Authorization', `Bearer ${window.sessionStorage.getItem('accessToken')}`);
    xhr.setRequestHeader('admin', 'yes');

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      res(resp);
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

    xhr.send(formData);
  });
}
