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

export const fileUpload = (studentId, gatType, gatInfoId, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return async (dispatch) => {
    try {
      dispatch({ type: STRATEGY_SESSION.loader });
      await axios
        .post(
          `${URL}/api/v1/files/fileupload/students/${studentId}/${gatType}/${gatInfoId}`,
          data,
          {
            headers: {
              admin: "yes",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: STRATEGY_SESSION.uploadFile,
            payload: { ...result.data, success: true },
            loading: false,
          });
        });
    } catch (error) {
      dispatch(errorHandler(STRATEGY_SESSION.uploadFile, error, false));
    }
  };
};

export const updateIeltsData = (studentId, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return async (dispatch) => {
    try {
      dispatch({ type: STRATEGY_SESSION.loader });
      await axios
        .put(
          `${URL}/api/v1/students/${studentId}/testTranscripts/ielts`,
          data,
          {
            headers: {
              admin: "yes",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: STRATEGY_SESSION.updateIeltsData,
            payload: {
              ...result.data,
              success: result.data?.length !== 0,
              message:
                result.data?.length === 0 ? "Attempt already exists" : "",
            },
            loading: false,
          });
        });
    } catch (error) {
      dispatch(errorHandler(STRATEGY_SESSION.updateIeltsData, error, false));
    }
  };
};

export const getIeltsData = (studentId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: STRATEGY_SESSION.loader });
      await axios
        .get(`${URL}/api/v1/students/${studentId}/testTranscripts/ielts`, {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            exam: "ielts",
          },
        })
        .then((result) => {
          dispatch({
            type: STRATEGY_SESSION.getIeltsData,
            payload: { data: result.data, success: true },
            loading: false,
          });
        });
    } catch (error) {
      dispatch(errorHandler(STRATEGY_SESSION.getIeltsData, error, false));
    }
  };
};

export const updateToeflData = (studentId, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return async (dispatch) => {
    try {
      dispatch({ type: STRATEGY_SESSION.loader });
      await axios
        .put(
          `${URL}/api/v1/students/${studentId}/testTranscripts/toefl`,
          data,
          {
            headers: {
              admin: "yes",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: STRATEGY_SESSION.updateToeflData,
            payload: {
              ...result.data,
              success: result.data?.length !== 0,
              message:
                result.data?.length === 0 ? "Attempt already exists" : "",
            },
            loading: false,
          });
        });
    } catch (error) {
      dispatch(errorHandler(STRATEGY_SESSION.updateToeflData, error, false));
    }
  };
};

export const getToeflData = (studentId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: STRATEGY_SESSION.loader });
      await axios
        .get(`${URL}/api/v1/students/${studentId}/testTranscripts/toefl`, {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((result) => {
          dispatch({
            type: STRATEGY_SESSION.getToeflData,
            payload: { data: result.data, success: true },
            loading: false,
          });
        });
    } catch (error) {
      dispatch(errorHandler(STRATEGY_SESSION.getToeflData, error, false));
    }
  };
};

export const updateGmatData = (studentId, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: STRATEGY_SESSION.loader });
      await axios
        .put(`${URL}/api/v1/students/${studentId}/testTranscripts/gmat`, data, {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((result) => {
          dispatch({
            type: STRATEGY_SESSION.updateGmatData,
            payload: {
              ...result.data,
              success: result.data?.length !== 0,
              message:
                result.data?.length === 0 ? "Attempt already exists" : "",
            },
            loading: false,
          });
        });
    } catch (error) {
      dispatch(errorHandler(STRATEGY_SESSION.updateGmatData, error, false));
    }
  };
};

export const getGmatData = (studentId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: STRATEGY_SESSION.loader });
      await axios
        .get(`/api/v1/students/${studentId}/testTranscripts/gmat`, {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((result) => {
          dispatch({
            type: STRATEGY_SESSION.getGmatData,
            payload: { data: result.data, success: true },
            loading: false,
          });
        });
    } catch (error) {
      dispatch(errorHandler(STRATEGY_SESSION.getGmatData, error, false));
    }
  };
};

export const updateGreData = (studentId, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: STRATEGY_SESSION.loader });
      await axios
        .put(`${URL}/api/v1/students/${studentId}/testTranscripts/gre`, data, {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((result) => {
          dispatch({
            type: STRATEGY_SESSION.updateGreData,
            payload: {
              ...result.data,
              success: result.data?.length !== 0,
              message:
                result.data?.length === 0 ? "Attempt already exists" : "",
            },
            loading: false,
          });
        });
    } catch (error) {
      dispatch(errorHandler(STRATEGY_SESSION.updateGreData, error, false));
    }
  };
};

export const getGreData = (studentId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: STRATEGY_SESSION.loader });
      await axios
        .get(`${URL}/api/v1/students/${studentId}/testTranscripts/gre`, {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((result) => {
          dispatch({
            type: STRATEGY_SESSION.getGreData,
            payload: { data: result.data, success: true },
            loading: false,
          });
        });
    } catch (error) {
      dispatch(errorHandler(STRATEGY_SESSION.getGreData, error, false));
    }
  };
};

export const getExpectedDate = (type, id) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  const types = {
    gre: STRATEGY_SESSION.getGreExpectedDate,
    gmat: STRATEGY_SESSION.getGmatExpectedDate,
    tofel: STRATEGY_SESSION.getToelfExpectedDate,
    toefl: STRATEGY_SESSION.getToelfExpectedDate,
  };
  return async (dispatch) => {
    try {
      dispatch({ type: STRATEGY_SESSION.loader });
      await axios
        .get(`${URL}/api/v1/${type}/${id}`, {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((result) => {
          dispatch({
            type: types[type],
            payload: { data: result.data, success: true },
            loading: false,
          });
        });
    } catch (error) {
      dispatch(errorHandler(types[type], error, false));
    }
  };
};

export const getIeltsExpectedDate = (id) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      dispatch({ type: STRATEGY_SESSION.loader });
      await axios
        .get(`${URL}/api/v1/students/${id}/testComplete/graduate/ielts`, {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((result) => {
          dispatch({
            type: STRATEGY_SESSION.getIeltsExpectedDate,
            payload: { data: result.data, success: true },
            loading: false,
          });
        });
    } catch (error) {
      dispatch(
        errorHandler(STRATEGY_SESSION.getIeltsExpectedDate, error, false)
      );
    }
  };
};