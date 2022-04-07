import axios from "axios";
import { errorHandler } from "../Component/Utils/Helpers";
import { APPLICATION_STAGE } from "../Redux/Action";
import { URL } from "./URL";

export const clearData = () => {
  return (dispatch) => {
    dispatch({ type: APPLICATION_STAGE.clearData });
  };
};

export const clearCustomData = (fieldName) => {
  return (dispatch) => {
    dispatch({
      type: APPLICATION_STAGE.clearCustomData,
      fieldName: fieldName,
    });
  };
};

export const getDocumentModelBySubStageId = (
  studentId,
  productId,
  subStageId,
  schoolId,
  type
) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: APPLICATION_STAGE.loader });
      await axios
        .get(
          `${URL}/api/v1/students/${studentId}/products/${productId}/subStages/${subStageId}/applicationStage`,
          {
            headers: {
              admin: "yes",
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              schoolId: schoolId,
              type: type,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: APPLICATION_STAGE.getDocumentModelBySubStageId,
            payload: response.data,
            loading: false,
          });
        });
    } catch (error) {
      dispatch(
        errorHandler(
          APPLICATION_STAGE.getDocumentModelBySubStageId,
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
  schoolId,
  data
) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: APPLICATION_STAGE.loader });
      await axios
        .post(
          `${URL}/api/v1/students/${studentId}/products/${productId}/subStages/${subStageId}/${schoolId}/fileUpload`,
          data,
          {
            headers: {
              admin: "yes",
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              type: "grad",
            },
          }
        )
        .then((response) => {
          dispatch({
            type: APPLICATION_STAGE.postFileUploadBySubStageId,
            payload: response.data,
            loading: false,
          });
        });
    } catch (error) {
      dispatch(
        errorHandler(APPLICATION_STAGE.postFileUploadBySubStageId, error, false)
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
      dispatch({ type: APPLICATION_STAGE.loader });
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
            type: APPLICATION_STAGE.putDocumentBySubStageId,
            payload: response.data,
            loading: false,
          });
        });
    } catch (error) {
      dispatch(
        errorHandler(APPLICATION_STAGE.putDocumentBySubStageId, error, false)
      );
    }
  };
};

export const getDownloadByDocumentId = (studentId, subStageId, fileName) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: APPLICATION_STAGE.loader });
      await axios
        .get(
          `/api/v1/students/${studentId}/subStage/${subStageId}/${fileName}`,
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
            type: APPLICATION_STAGE.getDownloadByDocumentId,
            payload: { success: true, data: response.data, fileName: fileName },
            loading: false,
          });
        });
    } catch (error) {
      dispatch(
        errorHandler(APPLICATION_STAGE.getDownloadByDocumentId, error, false)
      );
    }
  };
};

export const getSchoolList = (studentId, productId, subStagesId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: APPLICATION_STAGE.loader });
      await axios
        .get(
          `/api/v1/students/${studentId}/products/${productId}/subStages/${subStagesId}/schoolList`,
          {
            headers: {
              admin: "yes",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: APPLICATION_STAGE.getSchoolList,
            payload: response.data,
            loading: false,
          });
        });
    } catch (error) {
      dispatch(errorHandler(APPLICATION_STAGE.getSchoolList, error, false));
    }
  };
};

export const getMiscellaneousList = (studentId, productId, subStagesId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: APPLICATION_STAGE.loader });
      await axios
        .get(
          `/api/v1/students/${studentId}/products/${productId}/subStages/${subStagesId}/miscellaneous`,
          {
            headers: {
              admin: "yes",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: APPLICATION_STAGE.getMiscellaneousList,
            payload: response.data,
            loading: false,
          });
        });
    } catch (error) {
      dispatch(
        errorHandler(APPLICATION_STAGE.getMiscellaneousList, error, false)
      );
    }
  };
};
