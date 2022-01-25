import axios from 'axios';
import { CV_REVIEW } from '../Redux/Action';
import { URL } from './URL';
import { errorHandler } from '../Component/Utils/Helpers';

const BASE_URL = `${URL}/api/v1`;

export const reviewCompleted = (studentId, productId, id) => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .put(
        `${BASE_URL}/cv/students/${studentId}/product/${productId}/studentcv/${id}`,
        null,
        {
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            status: 'COMPLETE',
          },
        }
      )
      .then(result => {
        dispatch({
          type: CV_REVIEW.reviewCompleted,
          payload: result.data,
          loading: false,
        });
      })
      .catch(error => {
        dispatch(errorHandler(CV_REVIEW.reviewCompleted, error, false));
      });
  };
};

export const cvDownload = (studentId, cvId) => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    dispatch({ type: CV_REVIEW.loader });
    axios
      .get(`${BASE_URL}/files/students/${studentId}/cvReview/${cvId}`, {
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: 'blob',
      })
      .then(result => {
        const downloadUrl = window.URL.createObjectURL(new Blob([result.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'StudentPersonalizedList.xls');
        document.body.appendChild(link);
        link.click();
        link.remove();
        dispatch({
          type: CV_REVIEW.cvDownload,
          payload: result.data,
          loading: false,
        });
      })
      .catch(error => {
        dispatch(errorHandler(CV_REVIEW.cvDownload, error, false));
      });
  };
};

export const getStudentCvList = (studentId, productId) => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    dispatch({ type: CV_REVIEW.loader });
    axios
      .get(
        `${BASE_URL}/cv/students/${studentId}/product/${productId}/studentcv`,
        {
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(result => {
        dispatch({
          type: CV_REVIEW.getStudentCvList,
          payload: result.data,
          loading: false,
        });
      })
      .catch(error => {
        dispatch(errorHandler(CV_REVIEW.getStudentCvList, error, false));
      });
  };
};

export const cvUpload = (studentId, productId, data, comment) => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  return dispatch => {
    dispatch({ type: CV_REVIEW.loader });
    axios
      .post(`${BASE_URL}/cv/${studentId}/${productId}`, data, {
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          comment: comment ? comment : '',
        },
      })
      .then(result => {
        dispatch({
          type: CV_REVIEW.cvUpload,
          payload: result.data,
          loading: false,
        });
      })
      .catch(error => {
        dispatch(errorHandler(CV_REVIEW.cvUpload, error, false));
      });
  };
};

export const clearCustomData = fieldName => {
  return dispatch => {
    dispatch({
      type: CV_REVIEW.clearCustomData,
      fieldName: fieldName,
    });
  };
};
