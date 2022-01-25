import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStudentCvList } from '../../Actions/CvReview';
import Button from '../../Component/Utils/controls/Button';
import MySnackBar from '../MySnackBar';
import CvViewer from './CvViewer';

function Index(props) {
  const [state, setState] = useState({
    snackOpen: false,
    snackColor: '',
    snackMsg: '',
    cvReviewList: [],
    cvStatus: null,
    comment: '',
  });
  const { snackOpen, snackColor, snackMsg } = state;
  const params = useParams();
  const { studentId, productId } = params;
  const dispatch = useDispatch();
  const {
    isLoading,
    studentCvList,
    downloadStatus,
    cvUploadStatus,
    cvReviewStatus,
  } = useSelector(state => state.CvReviewReducer);

  const handleSnack = (open, color, message) => {
    setState({
      ...state,
      snackOpen: open,
      snackVariant: color,
      snackMsg: message,
    });
  };

  useEffect(() => {
    dispatch(getStudentCvList(studentId));
  }, []);

  useEffect(() => {
    if (studentCvList) {
      if (studentCvList.success) {
        setState({
          ...state,
          cvReviewList: studentCvList.data?.cvData || [],
          cvStatus: studentCvList.data?.status,
        });
      }
    }
  }, [studentCvList]);

  const res = {
    success: true,
    message: 'Get Student CV Details',
    data: {
      cvData: [
        {
          id: '23563c4c-8ecc-4b74-a30b-9cce04c8d404',
          path: 'CV_Version1.pdf',
          uploadDate: '2022-01-24T10:08:05.409421+05:30',
          comment: 'Test Admin4',
          createdBy: 'Uma',
          status: 'COMPLETE',
          cvFormatDate: '24 January 2022 | 10:08am',
        },
      ],
      status: 'COMPLETE',
    },
  };

  //   let uploadFormData = new FormData();
  //           uploadFormData.append("file", state.finalFile);
  //           dispatch(fileUpload("gmat", postResponse.id, uploadFormData));

  //   const onDrop = (files) => {
  //     if (values.attempt) {
  //       if (files && files.length > 0 && files[0].type === "application/pdf") {
  //         if (files[0].size < 1000000) {
  //           var file = files[0];
  //           var name = `${stuBasicData?.first_name}_${stuBasicData?.last_name}_GMAT_${values.attempt}`;
  //           var indexOf = file.type.indexOf("/");
  //           var newFileType = file.type.substr(indexOf + 1);
  //           var blob = new Blob([file], { type: newFileType });
  //           var newFile = new File(
  //             [blob],
  //             name
  //               .concat(".", newFileType)
  //               .replace(
  //                 "vnd.openxmlformats-officedocument.wordprocessingml.document",
  //                 "docx"
  //               ),
  //             { type: newFileType }
  //           );
  //           setState({ ...state, finalFile: newFile, fileErr: "" });
  //         } else {
  //           setState({ ...state, fileErr: FILE_SIZE_ERROR });
  //         }
  //       } else {
  //         setState({ ...state, fileErr: FILE_FORMAT_ERROR });
  //       }
  //     } else {
  //       setState({ ...state, fileErr: ATTEMPT_SELECT_ERROR });
  //     }
  //   };

  const handleSnackClose = () => {
    setState({ ...state, snackOpen: false, snackColor: '', snackMsg: '' });
  };

  return (
    <Grid container>
      <Grid item md={7}>
        <Grid container>
          <Grid item md={7}>
            <Button
              variant={'outlined'}
              color={'primary'}
              text={'Review Completed'}
            />
            <Button
              variant={'contained'}
              color={'primary'}
              text={'Upload CV'}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={5}>
        <CvViewer doctype={'cv'} {...props} />
      </Grid>
      <MySnackBar
        onClose={handleSnackClose}
        snackOpen={snackOpen}
        snackVariant={snackColor}
        snackMsg={snackMsg}
      />
    </Grid>
  );
}

export default Index;
