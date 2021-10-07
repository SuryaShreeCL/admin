import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FileProgress } from './FileProgress';

let accessToken = window.sessionStorage.getItem('accessToken');

export function QuestionUploadWithProgress({ file, onDelete, onUpload, questionUpload, message }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function upload() {
      const data = await uploadFile(file, setProgress, questionUpload);
      onUpload(file, data);
    }

    upload();
  }, []);

  return (
    <Grid item>
      <FileProgress file={file} onDelete={onDelete} progress={progress} message={message} />
    </Grid>
  );
}

function uploadFile(file, onProgress, questionUpload) {
  const awsUrl = `${process.env.REACT_APP_API_URL}/api/v1/testQuestionSet/${questionUpload.id}/questions/import?type=SINGLE_SELECT&testSectionId=${questionUpload.questionSectionId}`;

  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', awsUrl);
    xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    xhr.setRequestHeader('admin', 'yes');

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      res(resp);
      console.log('res', resp);
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
