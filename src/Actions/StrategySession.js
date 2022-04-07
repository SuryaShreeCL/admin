import axios from "axios";
import { errorHandler } from "../Component/Utils/Helpers";
import { STRATEGY_SESSION } from "../Redux/Action";
import { URL } from "./URL";

export const clearData = () => {
  return (dispatch) => {
    dispatch({ type: STRATEGY_SESSION.clearData });
  };
};

export const clearCustomData = (fieldName) => {
  return (dispatch) => {
    dispatch({
      type: STRATEGY_SESSION.clearCustomData,
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
      dispatch({ type: STRATEGY_SESSION.loader });
      await axios
        .get(
          `${URL}/api/v1/students/${studentId}/products/${productId}/subStages/${subStageId}`,
          {
            headers: {
              admin: "yes",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: STRATEGY_SESSION.getDocumentModelBySubStageId,
            payload: response.data,
            loading: false,
          });
        });
    } catch (error) {
      dispatch(
        errorHandler(
          STRATEGY_SESSION.getDocumentModelBySubStageId,
          error,
          false
        )
      );
    }
  };
};

export const uploadFileBySubStageId = (
  studentId,
  productId,
  subStageId,
  data
) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: STRATEGY_SESSION.loader });
      await axios
        .post(
          `${URL}/api/v1/students/${studentId}/products/${productId}/subStages/${subStageId}/fileUpload`,
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
            type: STRATEGY_SESSION.postFileUploadBySubStageId,
            payload: response.data,
            loading: false,
          });
        });
    } catch (error) {
      dispatch(
        errorHandler(STRATEGY_SESSION.postFileUploadBySubStageId, error, false)
      );
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
      dispatch({ type: STRATEGY_SESSION.loader });
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
            type: STRATEGY_SESSION.putDocumentBySubStageId,
            payload: response.data,
            loading: false,
          });
        });
    } catch (error) {
      dispatch(
        errorHandler(STRATEGY_SESSION.putDocumentBySubStageId, error, false)
      );
    }
  };
};

export const getDownloadByDocumentId = (studentId, subStageId, fileName) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: STRATEGY_SESSION.loader });
      await axios
        .get(
          `${URL}/api/v1/students/${studentId}/subStage/${subStageId}/${fileName}`,
          {
            headers: {
              admin: "yes",
              Authorization: `Bearer ${accessToken}`,
            },
            responseType: "blob",
          }
        )
        .then((response) => {
          dispatch({
            type: STRATEGY_SESSION.getDownloadByDocumentId,
            payload: { success: true, data: response.data, fileName: fileName },
            loading: false,
          });
        });
    } catch (error) {
      dispatch(
        errorHandler(STRATEGY_SESSION.getDownloadByDocumentId, error, false)
      );
    }
  };
};

export const deleteDocumentByDocumentId = (studentId, documentId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: STRATEGY_SESSION.loader });
      await axios
        .delete(`${URL}/api/v1/students/${studentId}/documents/${documentId}`, {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          dispatch({
            type: STRATEGY_SESSION.deleteDocumentByDocumentId,
            payload: response.data,
            loading: false,
          });
        });
    } catch (error) {
      dispatch(
        errorHandler(STRATEGY_SESSION.deleteDocumentByDocumentId, error, false)
      );
    }
  };
};
