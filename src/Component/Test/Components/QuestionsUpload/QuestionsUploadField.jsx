import { Grid, makeStyles } from '@material-ui/core';
import { useField } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { QuestionUploadWithProgress } from './QuestionUploadWithProgress';
import { UploadError } from './UploadError';

export function QuestionsUploadField({ name, testCreated, questionUpload }) {
  const useStyles = makeStyles((theme) => ({
    dropzone: {
      border: `2px dashed ${theme.palette.primary.main}`,
      borderRadius: theme.shape.borderRadius,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
      cursor: !testCreated && 'no-drop',
      width: '100%',
      background: theme.palette.background.default,
      height: theme.spacing(12),
      outline: 'none',
    },
    info: {
      color: 'grey',
      marginTop: 5,
      marginBottom: 10,
    },
  }));

  const [_, __, helpers] = useField(name);
  const classes = useStyles();

  const [files, setFiles] = useState([]);
  const onDrop = useCallback((accFiles, rejFiles) => {
    const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
    const mappedRej = rejFiles.map((r) => ({ ...r }));
    setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
  }, []);

  useEffect(() => {
    helpers.setValue(...files);
  }, [files]);

  function onUpload(file, data) {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...data, ...fw };
        }
        return fw;
      })
    );
  }

  function onDelete(file) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept:
      '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
    maxSize: 2000 * 1024, // 2Mb
  });

  return (
    <React.Fragment>
      <Grid item>
        <div {...getRootProps({ className: classes.dropzone })}>
          {testCreated && <input {...getInputProps()} />}
          <p style={{ marginBottom: '-2px' }}>
            {testCreated
              ? 'Drag & drop some excel sheets here, or click to select'
              : 'Please Save the Test Event to upload the questions'}
          </p>
        </div>
      </Grid>
      {files.map((fileWrapper) => (
        <Grid item key={fileWrapper.file.name}>
          {fileWrapper.errors.length ? (
            <UploadError file={fileWrapper.file} errors={fileWrapper.errors} onDelete={onDelete} />
          ) : (
            <QuestionUploadWithProgress
              onDelete={onDelete}
              onUpload={onUpload}
              file={fileWrapper.file}
              questionUpload={questionUpload}
            />
          )}
        </Grid>
      ))}
    </React.Fragment>
  );
}
