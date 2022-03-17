import axios from "axios";
import { URL } from "./URL";
import { PROGRAM_PREFERENCE } from "../Redux/Action";

export const putProgramPrefernce = (data, studentId, productId) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .put(
        URL +
          "/api/v1/students/" +
          studentId +
          "/products/" +
          productId +
          "/strategySession/programPreference",
        data,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        dispatch({
          type: PROGRAM_PREFERENCE.putProgramPrefernce,
          putProgramPrefernce: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getProgramPrefence = (studentId, productId) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .get(
        URL +
          "/students/" +
          studentId +
          "/strategySession/programPreference/{programPreferenceId}",
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: PROGRAM_PREFERENCE.getProgramPrefence,
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
