import React, { useState, useEffect } from 'react';
import { getDocumentsByStudentId, getStudentsById } from '../Actions/Student';
import { updateVerificationStatus } from '../Actions/AdminAction';
import { connect } from 'react-redux';
import { Alert } from '@material-ui/lab';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { viewStudentStatus } from '../Actions/AdminAction';
import { TextField } from '@material-ui/core';
// import aws from 'aws-sdk'
import {
  Grid,
  TableRow,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  Snackbar,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
  editDocumentsByStudentId,
  deleteStudentFileById,
  downloadDocumentByStudentId,
} from '../Actions/Student';
import { URL } from '../Actions/URL';
import { useParams } from 'react-router-dom';

function usePrevious(value) {
  const ref = React.useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

///include json file
function StudentDocuments(props) {
  console.log(props);
  const prevPropsVerification = usePrevious(props.updateVerificationResponse);
  const [file, setFile] = React.useState(null);
  const [snack, setSnack] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState(null);
  const [snackColor, setSnackColor] = React.useState(null);
  const { productId } = useParams();

  React.useEffect(() => {
    console.log('useeffect1');
    if (
      prevPropsVerification !== undefined &&
      props.updateVerificationResponse.length !== prevPropsVerification.length
    ) {
      setSnackMessage('Status Updated Successfully');
      setSnackColor('success');
      setSnack(true);
    } else {
      setSnackMessage(null);
    }
    // To get the list of documents that belongs to specific student
    props.getDocumentsByStudentId(props.id);

    props.viewStudentStatus(props.id);
    // props.studentStatusResponse
  }, [
    props.deletedFileResponse,
    props.editDocumentResponse,
    props.updateVerificationResponse,
  ]);

  const filterText = path => {
    var slashIndex = path.indexOf('/');
    var newPath = path.slice(slashIndex + 1, path.length);
    return newPath.replace(
      'vnd.openxmlformats-officedocument.wordprocessingml.document',
      'docx'
    );
  };
  // console.log(typeof props.studentDocumentList);
  const fileChange = e => {
    // console.log(typeof props.viewDocumentList);
    console.log(e.target.name);
    let fileNameIndex = e.target.name.lastIndexOf('.');
    let removedName = e.target.name.substring(0, fileNameIndex);
    console.log(removedName);
    if (e.target.files[0].size < 5242880) {
      var element = document.getElementById(e.target.id);
      console.log('ELEMENT..............', element);
      var file = element.files[0];
      console.log('FILE.........', file);
      console.log('File type........', file.type);
      let startIndex = file.type.indexOf('/');
      let fileExtension = file.type.substring(startIndex + 1, file.type.length);
      console.log(fileExtension);
      var blob = new Blob([file], { type: file.type });
      console.log('Blob...........', blob);
      console.log('file name........', file.name);
      console.log(
        'filter text.......',
        filterText(removedName + '.' + fileExtension)
      );
      var newFile = new File(
        [blob],
        filterText(removedName + '.' + fileExtension),
        { type: file.type }
      );
      console.log('NEW FILE..................', newFile);
      console.log('NEW FILE TYPE..................', newFile.type);
      if (
        newFile.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        newFile.type === 'application/msword' ||
        newFile.type === 'application/pdf' ||
        newFile.type === 'image/png' ||
        newFile.type === 'image/jpg' ||
        newFile.type === 'image/jpeg'
      ) {
        setFile(newFile);
      } else {
        setSnackColor('error');
        setSnackMessage('Invalid format of documents');
        setSnack(true);
      }
    } else {
      setSnackColor('error');
      setSnackMessage('File size should not be more than 5 MB');
      setSnack(true);
    }
  };
  const uploadFile = () => {
    const formData = new FormData();
    formData.append('file', file);
    props.editDocumentsByStudentId(props.id, formData);
    setFile(null);
    setSnackColor('success');
    setSnackMessage('File Updated Successfully');
    setSnack(true);
  };
  var flag = false;

  // console.log(file !== null ?file : "")

  const details = [
    { title: 'Verified', value: 'verified' },
    { title: 'Not Verified', value: 'Notverified' },
    { title: 'Mismatch', value: 'mismatched' },
  ];
  console.log(props.studentStatusResponse);

  const [state, setState] = React.useState('');
  const [status, setStatus] = React.useState(details[1]);
  const [misMatchDetails, setMisMatchDetails] = React.useState('');

  useEffect(() => {
    console.log('useeffect2');
    console.log(props.studentStatusResponse);
    console.log(status);
    console.log(setStatus);
    if (status !== setStatus) {
      if (status !== null && status.value === 'mismatched') {
        setState({
          misMatchDetails: null,
        });
      }
    }

    var findObj = props.studentStatusResponse.find(
      res => res.section.name === 'supportingdocuments'
    );
    console.log(findObj); //changes

    if (findObj !== undefined) {
      console.log('firstif');
      if (findObj.section.name === 'supportingdocuments') {
        console.log('secondif');
        if (flag === false && findObj.status === 'verified') {
          console.log('thirdif');
          setStatus(details[0]);
          flag = true;
        } else if (flag === false && findObj.status === 'Notverified') {
          console.log('elseiffirst');
          setStatus(details[1]);
          flag = true;
        } else if (flag === false && findObj.status === 'mismatched') {
          console.log('elseifsecond');
          setStatus(details[2]);
          setMisMatchDetails(findObj.remark);
          flag = true;
        }
      }
    }
  }, [props.studentStatusResponse]);

  const handleUpdate = () => {
    if (details !== null) {
      let obj = {
        student: {
          id: props.id,
        },
        section: {
          name: 'supportingdocuments',
        },
        remark: status.value === 'mismatched' ? state.misMatchDetails : null,
        status: status.value,
        updateDate: null,
        product: {
          id: productId,
        },
      };
      console.log(obj);
      props.updateVerificationStatus(obj);
      setState({
        misMatchDetails: null,
      });
    }
  };
  const handleChange = e => {
    setMisMatchDetails(e.target.value);
    setState({ [e.target.name]: e.target.value });
  };

  // console.log(details)
  console.log(status); //updated status
  console.log(props.studentStatusResponse);
  console.log(props.updateVerificationResponse); //update response
  // console.log(status !== '' ? status.value : status)
  // console.log(status.value)
  return (
    <div>
      <form encType='multipart/form-data' onSubmit={uploadFile}>
        <Grid container>
          <Grid item md={12}>
            <Typography style={{ fontSize: 25 }}>Documents</Typography>
          </Grid>
          <Grid container>
            <Grid item md={2}>
              <Autocomplete
                id='combo-box-demo'
                options={details}
                value={status}
                fullWidth
                onChange={(e, newValue) => setStatus(newValue)}
                getOptionLabel={option => option.title}
                renderInput={params => (
                  <TextField
                    {...params}
                    size='small'
                    label='Verification Status'
                    variant='outlined'
                  />
                )}
              />
            </Grid>
            {status !== null && status.value === 'mismatched' ? (
              <>
                <Grid item md={7} alignItems='center'>
                  <TextField
                    fullWidth
                    size='small'
                    onChange={e => handleChange(e)}
                    name={'misMatchDetails'}
                    // value={setMisMatchDetails}
                    // value={misMatchDetails}
                    // value={findObj.remark}
                    value={misMatchDetails}
                    variant='outlined'
                    label={'Remark'}
                  />
                </Grid>
                <Grid item md={2} alignItems='center'>
                  <Button
                    variant='outlined'
                    onClick={handleUpdate}
                    color='primary'
                    size='small'
                  >
                    Update Status
                  </Button>
                </Grid>
              </>
            ) : (
              <Grid item md={9} alignItems='center'>
                <Button
                  variant='outlined'
                  onClick={handleUpdate}
                  color='primary'
                  size='small'
                >
                  Update Status
                </Button>
              </Grid>
            )}
          </Grid>
          <Grid item md={12}>
            <TableContainer component={Paper}>
              <Table aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>File Name</TableCell>
                    <TableCell align='center' colSpan={3}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {typeof props.studentDocumentList !== 'string'
                    ? props.studentDocumentList.map(singleDocument => {
                        console.log(singleDocument.id);
                        return (
                          <TableRow>
                            <TableCell>
                              {filterText(singleDocument.path)}
                            </TableCell>
                            <TableCell align='right'>
                              <Button
                                startIcon={<VisibilityRoundedIcon />}
                                variant='contained'
                                color='primary'
                                size='small'
                                onClick={() => {
                                  window.open(
                                    URL +
                                      '/api/v1/files/download/' +
                                      props.id +
                                      '/' +
                                      singleDocument.path
                                  );
                                  // props.downloadDocumentByStudentId(props.id,singleDocument.path)
                                }}
                              >
                                {' '}
                                View
                              </Button>
                            </TableCell>
                            <TableCell align='center'>
                              <label for={singleDocument.path}>
                                <Button
                                  startIcon={<EditIcon />}
                                  variant='contained'
                                  color='primary'
                                  component='span'
                                  size='small'
                                  // onClick={console.log("Edit")
                                  // ()=>props.editDocumentsByStudentId(props.id)
                                  // }
                                >
                                  Edit
                                </Button>
                              </label>
                              <input
                                accept='.pdf,.docx,.jpg,.jpeg,.png,.doc'
                                id={singleDocument.path}
                                type='file'
                                name={singleDocument.path}
                                onChange={fileChange}
                                style={{ display: 'none' }}
                              />
                            </TableCell>
                            <TableCell align='left'>
                              <Button
                                startIcon={<DeleteIcon />}
                                size='small'
                                onClick={() =>
                                  props.deleteStudentFileById(
                                    props.id,
                                    singleDocument.path
                                  )
                                }
                                variant='contained'
                                color='secondary'
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Dialog
          open={file !== null ? true : false}
          onClose={e => setFile(null)}
        >
          <DialogTitle>Are You Sure Want To Update This File</DialogTitle>
          <DialogContent>
            {/* {file !== null ? file.name : null} */}
            {file !== null ? filterText(file.name) : null}
          </DialogContent>
          <DialogActions>
            <Button
              size={'small'}
              onClick={e => setFile(null)}
              variant='contained'
              color='secondary'
            >
              No
            </Button>
            <Button
              size={'small'}
              onClick={uploadFile}
              variant='contained'
              color='primary'
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snack}
          autoHideDuration={3000}
          onClose={e => setSnack(false)}
        >
          <Alert
            onClose={e => setSnack(false)}
            variant='filled'
            severity={snackColor}
          >
            {snackMessage}
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    studentDocumentList: state.StudentReducer.studentDocumentList,
    deletedFileResponse: state.StudentReducer.deletedFileResponse,
    downloadedDocumentResponse: state.StudentReducer.downloadedDocumentResponse,
    editDocumentResponse: state.StudentReducer.editDocumentResponse,
    studentStatusResponse: state.AdminReducer.studentStatusResponse,
    updateVerificationResponse: state.AdminReducer.updateVerificationResponse,
  };
};

export default connect(mapStateToProps, {
  getDocumentsByStudentId,
  editDocumentsByStudentId,
  deleteStudentFileById,
  downloadDocumentByStudentId,
  updateVerificationStatus,
  viewStudentStatus,
})(StudentDocuments);
