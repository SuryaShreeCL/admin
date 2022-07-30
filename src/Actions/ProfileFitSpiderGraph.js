import axios from "axios";
import { PROFILE_FIT_SPIDER_GRAPH } from "../Redux/Action";
import { URL } from "./URL";
import { errorHandler } from "../Component/Utils/Helpers";

const BASE_URL = `${URL}/api/v1`;

export const getSpiderGraphQuestions = (studentId, productId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    dispatch({ type: PROFILE_FIT_SPIDER_GRAPH.loader });
    axios
      .get(
        `${BASE_URL}/students/${studentId}/product/${productId}/profilementoring/questions`,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            product: "mba",
          },
        }
      )
      .then((result) => {
        dispatch({
          type: PROFILE_FIT_SPIDER_GRAPH.getSpiderGraphQuestions,
          payload: result.data,
          loading: false,
        });
      })
      .catch((error) => {
        dispatch(
          errorHandler(
            PROFILE_FIT_SPIDER_GRAPH.getSpiderGraphQuestions,
            error,
            false
          )
        );
      });
  };
};

export const putSpiderGraphAnswers = (studentId, productId, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    dispatch({ type: PROFILE_FIT_SPIDER_GRAPH.loader });
    axios
      .put(
        `${BASE_URL}/students/${studentId}/product/${productId}/profilementoring/answers`,
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
          type: PROFILE_FIT_SPIDER_GRAPH.putSpiderGraphAnswers,
          payload: result.data,
          loading: false,
        });
      })
      .catch((error) => {
        dispatch(
          errorHandler(
            PROFILE_FIT_SPIDER_GRAPH.putSpiderGraphAnswers,
            error,
            false
          )
        );
      });
  };
};

export const getDetails = (studentId, productId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    dispatch({ type: PROFILE_FIT_SPIDER_GRAPH.loader });
    axios
      .get(
        `${BASE_URL}/students/${studentId}/product/${productId}/pgareportdetails`,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: PROFILE_FIT_SPIDER_GRAPH.getSpiderDetails,
          payload: result.data,
          loading: false,
        });
      })
      .catch((error) => {
        dispatch(
          errorHandler(PROFILE_FIT_SPIDER_GRAPH.getSpiderDetails, error, false)
        );
      });
  };
};

export const getSpiderGraph = (studentId, productId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    dispatch({ type: PROFILE_FIT_SPIDER_GRAPH.loader });
    axios
      .get(
        `${BASE_URL}/students/${studentId}/product/${productId}/profilementoring/spidergraph`,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            product: "mba",
          },
        }
      )
      .then((result) => {
        dispatch({
          type: PROFILE_FIT_SPIDER_GRAPH.getSpiderGraph,
          payload: result.data,
          loading: false,
        });
      })
      .catch((error) => {
        dispatch(
          errorHandler(PROFILE_FIT_SPIDER_GRAPH.getSpiderGraph, error, false)
        );
      });
  };
};

export const putRemarks = (studentId, productId, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    dispatch({ type: PROFILE_FIT_SPIDER_GRAPH.loader });
    axios
      .put(
        `${BASE_URL}/students/${studentId}/product/${productId}/profilementoring/remark`,
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
          type: PROFILE_FIT_SPIDER_GRAPH.updateRemark,
          payload: result.data,
          loading: false,
        });
      })
      .catch((error) => {
        dispatch(
          errorHandler(PROFILE_FIT_SPIDER_GRAPH.updateRemark, error, false)
        );
      });
  };
};

export const postSpiderGraphImg = (studentId, productId, formData) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    dispatch({ type: PROFILE_FIT_SPIDER_GRAPH.loader });
    axios
      .post(
        `${BASE_URL}/students/${studentId}/product/${productId}/uploadSpiderGraphImage `,
        formData,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: PROFILE_FIT_SPIDER_GRAPH.spiderGraph,
          payload: result.data,
          loading: false,
        });
      })
      .catch((error) => {
        dispatch(
          errorHandler(PROFILE_FIT_SPIDER_GRAPH.spiderGraph, error, false)
        );
      });
  };
};
