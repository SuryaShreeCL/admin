import axios from "axios";
import { errorHandler } from "../Component/Utils/Helpers";
import { SCHOOL_RESEARCH } from "../Redux/Action";
import { URL } from "./URL";

export const getNumberOfPreferencesAction = (
  studentId,
  productId,
  preferences
) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return async (dispatch) => {
    console.log("get number of preferences");
    try {
      //   dispatch({ type: SCHOOL_RESEARCH.loader });
      await axios
        .get(
          `${URL}/api/v1/students/${studentId}/products/${productId}/preferences`,
          {
            headers: {
              admin: "yes",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: SCHOOL_RESEARCH.getNumberOfPreferences,
            payload: response.data,
            loading: false,
          });
        });
    } catch (error) {
      dispatch(
        errorHandler(SCHOOL_RESEARCH.getNumberOfPreferences, error, false)
      );
    }
  };
};
export const getPreferenceListBasedOnPreferenceIDAction = (
  studentId,
  productId,
  preferenceId
) => {
  console.log("&&&&&&&&&&&&&&&&&&DDDDDDDDDDDDDDD");
  let accessToken = window.sessionStorage.getItem("accessToken");

  return async (dispatch) => {
    try {
      await axios
        .get(
          `${URL}/api/v1/students/${studentId}/products/${productId}/schoolresearch/preference/${preferenceId}`,
          {
            headers: {
              admin: "yes",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          dispatch({
            type: SCHOOL_RESEARCH.getPreferenceListBasedOnPreferenceID,
            payload: response.data,
            loading: false,
          });
        });
    } catch (error) {
      dispatch(
        errorHandler(
          SCHOOL_RESEARCH.getPreferenceListBasedOnPreferenceID,
          error,
          false
        )
      );
    }
  };
};

export const addRecommendationAction = (
  studentId,
  productId,
  data,
  currentTab
) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(
        `${URL}/api/v1/students/${studentId}/products/${productId}/schoolresearch/recommendedschools`,
        data,
        {
          crossDomain: true,
          headers: {
            Admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: SCHOOL_RESEARCH.addRecommendation,
          payload: result.data,
        });
        if (result?.data?.success === true) {
          dispatch(
            getPreferenceListBasedOnPreferenceIDAction(
              studentId,
              productId,
              currentTab
            )
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getStageCompleteCall = (studentId, productId) => {
  let stepName = "Choose Preferences";
  let accessToken = window.sessionStorage.getItem("accessToken");
  // let studentId = window.sessionStorage.getItem("studentId");
  // let productId = window.sessionStorage.getItem("productId");
  return async (dispatch) => {
    try {
      await axios
        .get(
          `${URL}/api/v1/students/${studentId}/products/${productId}/schoolresearch/stagestatus?stepName=${stepName}`,
          {
            crossDomain: true,
            headers: {
              Admin: "yes",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: SCHOOL_RESEARCH.getStageComplete,
            payload: result.data,
            loading: false,
          });
        });
    } catch (error) {
      console.log(error, "&&&&&&&&&&&&&&&&&&&&&&");
      // dispatch({
      //   type: SCHOOL_RESEARCH.getStageComplete,
      //   payload: result.data,
      //   loading: false,
      // });
      dispatch(errorHandler(SCHOOL_RESEARCH.getStageComplete, error, false));
    }
  };
};
