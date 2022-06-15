import axios from "axios";
import { errorHandler } from "../Component/Utils/Helpers";
import { PROFILE_MENTORING } from "../Redux/Action";
import { URL } from "./URL";

export const clearData = () => {
  return (dispatch) => {
    dispatch({ type: PROFILE_MENTORING.clearData });
  };
};

export const clearCustomData = (fieldName) => {
  return (dispatch) => {
    dispatch({
      type: PROFILE_MENTORING.clearCustomData,
      fieldName: fieldName,
    });
  };
};

export const getDocumentModelBySubStageId = (
  studentId,
  productId,
  subStageId
) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_MENTORING.loader });
      await axios
        .get(
          `${URL}/api/v1/students/${studentId}/products/${productId}/subStages/${subStageId}/cvList`,
          {
            headers: {
              admin: "yes",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: PROFILE_MENTORING.getDocumentModelBySubStageId,
            payload: response.data,
            loading: false,
          });
        });
    } catch (error) {
      dispatch(
        errorHandler(
          PROFILE_MENTORING.getDocumentModelBySubStageId,
          error,
          false
        )
      );
    }
  };
};

export const uploadFile = (studentId, productId, data, comment) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_MENTORING.loader });
      await axios
        .post(`${URL}/api/v1/cv/${studentId}/${productId}`, data, {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            comment: comment,
          },
          params: {
            stage: "Profile Mentoring"
          },
        })
        .then((response) => {
          dispatch({
            type: PROFILE_MENTORING.postFileUpload,
            payload: { success: true, data: response.data },
            loading: false,
          });
        });
    } catch (error) {
      dispatch(errorHandler(PROFILE_MENTORING.postFileUpload, error, false));
    }
  };
};

export const uploadDocumentBySubStageId = (
  studentId,
  productId,
  subStageId,
  data
) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_MENTORING.loader });
      await axios
        .put(
          `${URL}/api/v1/students/${studentId}/products/${productId}/subStages/${subStageId}`,
          data,
          {
            headers: {
              admin: "yes",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: PROFILE_MENTORING.putDocumentBySubStageId,
            payload: response.data,
            loading: false,
          });
        });
    } catch (error) {
      dispatch(
        errorHandler(PROFILE_MENTORING.putDocumentBySubStageId, error, false)
      );
    }
  };
};

export const getDownloadByDocumentId = (studentId, cvId, fileName) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_MENTORING.loader });
      await axios
        .get(`${URL}/api/v1/files/students/${studentId}/cv/${cvId}`, {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
          responseType: "blob",
        })
        .then((response) => {
          dispatch({
            type: PROFILE_MENTORING.getDownloadByDocumentId,
            payload: { success: true, data: response.data, fileName: fileName },
            loading: false,
          });
        });
    } catch (error) {
      dispatch(
        errorHandler(PROFILE_MENTORING.getDownloadByDocumentId, error, false)
      );
    }
  };
};

export const deleteDocumentByDocumentId = (studentId, documentId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_MENTORING.loader });
      await axios
        .delete(`${URL}/api/v1/students/${studentId}/documents/${documentId}`, {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          dispatch({
            type: PROFILE_MENTORING.deleteDocumentByDocumentId,
            payload: response.data,
            loading: false,
          });
        });
    } catch (error) {
      dispatch(
        errorHandler(PROFILE_MENTORING.deleteDocumentByDocumentId, error, false)
      );
    }
  };
};
