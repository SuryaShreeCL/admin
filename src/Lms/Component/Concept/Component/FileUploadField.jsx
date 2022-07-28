import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SingleFileUploadWithProgress } from "../../../Utils/Upload/SingleFileUploadWithProgress";
import { UploadError } from "../../../Utils/Upload/UploadError";

export function FileUploadField({
  imageUrl,
  fileType,
  fileSize,
  disable,
  setFile,
}) {
  const useStyles = makeStyles((theme) => ({
    dropzone: {
      border: `2px dashed ${theme.palette.primary.main}`,
      borderRadius: theme.shape.borderRadius,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 5,
      cursor: disable ? "no-drop" : "move",
      background: theme.palette.background.default,
      height: theme.spacing(10),
      outline: "none",
    },
    info: {
      color: "grey",
      marginTop: 5,
      marginBottom: 10,
    },
  }));

  const classes = useStyles();

  const [fileData, setFileData] = useState(null);
  const [url, setUrl] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const [error, setError] = useState({ isError: false });

  const onDrop = (files) => {
    if (files && files.length !== 0) {
      setFileData(files[0]);
      setIsUpload(true);
    }
  };

  useEffect(() => {
    if (imageUrl) {
      setUrl(`${process.env.REACT_APP_ASSETS}/lms/conceptTopic/${imageUrl}`);
      setFileData({ name: imageUrl, size: fileSize });
    }
  }, [imageUrl, fileSize]);

  function onUpload(file, data) {
    if (isUpload) {
      setIsUpload(false);
      if (data.success) {
        setFile({ name: data.data.fileName, size: file?.size });
        setUrl(data.data.url);
        setFileData({ name: data.data.fileName, size: file?.size });
        setError({ isError: false });
      } else {
        setError({ isError: true, ...data });
        setFile({ name: null, size: null });
        setUrl(null);
      }
    } else {
      onDelete();
    }
  }

  function onDelete() {
    setFileData(null);
    setFile({ name: null, size: null });
    setIsUpload(false);
    setError({ isError: false });
    setUrl(null);
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: [`${fileType}/*`],
    maxSize: 2000 * 1024, // 2Mb
  });

  return (
    <React.Fragment>
      {fileData ? (
        error.isError ? (
          <UploadError file={fileData} onDelete={onDelete} error={error} />
        ) : (
          <SingleFileUploadWithProgress
            onDelete={onDelete}
            onUpload={onUpload}
            file={fileData}
            url={url}
            fileType={fileType}
            isUpload={isUpload}
            uploadUrl={`${process.env.REACT_APP_API_URL}/api/v1/files/upload/concept/topic/image`}
          />
        )
      ) : (
        <Grid item>
          <div {...getRootProps({ className: classes.dropzone })}>
            {!disable && <input {...getInputProps()} />}
            <p
              style={{ marginBottom: "-2px" }}
            >{`Drag & drop some ${fileType} here, or click to select ${fileType}`}</p>
          </div>
          {fileType === "image" && (
            <p {...getRootProps({ className: classes.info })}>
              (Supported format: jpeg, PNG only, max 2MB)
            </p>
          )}
        </Grid>
      )}
    </React.Fragment>
  );
}
