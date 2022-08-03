import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { catchError } from "../../../Component/Utils/Helpers";
import { FileProgress } from "./FileProgress";

export function SingleFileUploadWithProgress({
  file,
  onDelete,
  onUpload,
  url,
  isUpload,
  uploadUrl,
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isUpload) {
      async function upload() {
        const data = await uploadFile(file, setProgress, uploadUrl);
        onUpload(file, data);
      }
      upload();
    }
    if (url) {
      setProgress(100);
    } else {
      setProgress(0);
    }
  }, [isUpload, file]);

  return (
    <Grid item>
      <FileProgress
        file={file}
        url={url}
        onDelete={onDelete}
        progress={progress}
      />
    </Grid>
  );
}

function uploadFile(file, onProgress, uploadUrl) {
  const awsUrl = uploadUrl;

  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", awsUrl);
    xhr.setRequestHeader(
      "Authorization",
      `Bearer ${window.sessionStorage.getItem("accessToken")}`
    );
    xhr.setRequestHeader("admin", "yes");

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      res(resp);
    };
    xhr.onerror = (evt) => rej(catchError(evt));
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage));
      }
    };

    const formData = new FormData();
    formData.append("file", file);

    xhr.send(formData);
  });
}
