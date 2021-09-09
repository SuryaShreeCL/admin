import { Grid, makeStyles } from '@material-ui/core';
import { useField } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { QuestionUploadWithProgress } from './QuestionUploadWithProgress';
import { UploadError } from './UploadError';

const useStyles = makeStyles((theme) => ({
  dropzone: {
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    background: theme.palette.background.default,
    height: theme.spacing(10),
    outline: 'none',
  },
  info: {
    color: 'grey',
    marginTop: 5,
    marginBottom: 10,
  },
}));

export function QuestionsUploadField({ name, questionSetId, questionSectionId, fileType = 'xls' }) {
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
    accept: 'xlsx/*',
    maxSize: 2000 * 1024, // 2Mb
  });

  return (
    <React.Fragment>
      <Grid item>
        <div {...getRootProps({ className: classes.dropzone })}>
          <input {...getInputProps()} />
          <p
            style={{ marginBottom: '-2px' }}
          >{`Drag & drop some ${fileType} here, or click to select ${fileType}`}</p>
        </div>
      </Grid>
      {files.map((fileWrapper) => (
        <Grid item key={fileWrapper.file.name}>
          {fileWrapper.errors.length ? null : (
            <QuestionUploadWithProgress
              onDelete={onDelete}
              onUpload={onUpload}
              file={fileWrapper.file}
              questionSetId={questionSetId}
              questionSectionId={questionSectionId}
            />
          )}
        </Grid>
      ))}
    </React.Fragment>
  );
}
