import axios from "axios";
import { LMS_CONCEPT } from "../Action";
import { URL } from "../../../Actions/URL";
import { catchError, errorHandler } from "../../../Component/Utils/Helpers";

const BASE_URL = `${URL}/api/v1`;

export const getConcept = (coursesId, subjectId) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(`${BASE_URL}/courses/${coursesId}/subject/${subjectId}`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: LMS_CONCEPT.getConcept,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch(errorHandler(LMS_CONCEPT.getConcept, error, false));
      });
  };
};

export const updateConceptStatus = (conceptId, status, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return () => {
    axios
      .put(`${BASE_URL}/concept/${conceptId}/status/${status}`, null, {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        callback(result.data);
      })
      .catch((error) => {
        callback(catchError(error));
      });
  };
};

export const addConcept = (data, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return () => {
    axios
      .post(`${BASE_URL}/concept`, data, {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        callback(result.data);
      })
      .catch((error) => {
        callback(catchError(error));
      });
  };
};

export const updateConcept = (conceptId, data, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return () => {
    axios
      .put(`${BASE_URL}/concept/${conceptId}`, data, {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        callback(result.data);
      })
      .catch((error) => {
        callback(catchError(error));
      });
  };
};
