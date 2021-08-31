import axios from "axios";
import { STUDENT } from "../Action";
import { URL } from "../../../Actions/URL";

const DEV_LMS = URL;

export const getProducts = (studentId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(DEV_LMS + `/api/v1/lms/students/${studentId}/products`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: STUDENT.getProducts,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getTaskTopic = (studentId, productId, category, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        DEV_LMS +
          `/api/v1/lms/student/${studentId}/product/${productId}/${category}`,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: STUDENT.getTaskTopic,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
