import axios from "axios";
import { URL } from "./URL";
import { STRATEGY_SESSION } from "../Redux/Action";



export const getStageId = () => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .get(
        `${URL}/api/v1/students/9fd9b445-6237-4fe0-b9af-2c6aa17a50e2/products/4/stages`,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: STRATEGY_SESSION.getStageId,
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getTemplateUsingStageId = (studentId, productId,subStagesId) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .get(`${URL}api/v1/students/${studentId}/products/${productId}/subStages/${subStagesId}`,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: STRATEGY_SESSION.getTemplateUsingStageId,
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const postStudentDocumentUsingStageId = (studentId, productId,subStagesId) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .post(
        `${URL}api/v1/students/${studentId}/products/${productId}/subStages/${subStagesId}/fileUpload`,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: STRATEGY_SESSION.postStudentDocumentUsingStageId,
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const putSaveFileDetailsUsingStageId = (studentId, productId,subStagesId) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .put(
        `${URL}api/v1/students/${studentId}/products/${productId}/subStages/${subStagesId}`,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: STRATEGY_SESSION.putSaveFileDetailsUsingStageId,
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getDownloadFileUsingStageId = (studentId,subStagesId) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .get(
        `${URL}/students/${studentId}/subStage/${subStagesId}/{fileName}`,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: STRATEGY_SESSION.getDownloadFIleUsingStageId,
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

