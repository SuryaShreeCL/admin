import { USERMANAGEMENT } from "../Redux/Action";
import axios from "axios";
import { URL } from "../Actions/URL";

export const getUserDepartment = () => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .get(URL + "/api/v1/user/department", {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);

        dispatch({
          type: USERMANAGEMENT.getUserDepartment,
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getUserDetails = () => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .get(URL + "/api/v1/user", {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);

        dispatch({
          type: USERMANAGEMENT.getUserDetails,
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const editAdmin = (data) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .post(URL + "/api/v1/user", data, {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: USERMANAGEMENT.editAdmin,
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
