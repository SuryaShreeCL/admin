import axios from "axios";
import { PASSAGE } from "../Action";
import { URL } from "../../../Actions/URL";
import { catchError } from "../../../Component/Utils/Helpers";

export const getAllPassages = () => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(`${URL}/api/v1/lms/getall/passage`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: PASSAGE.getAllPassages,
          payload: response.data,
        });
        // callback(response.data);
      })
      .catch((error) => {
        console.log(error);
        dispatch(error);
      });
  };
};

export const postAdd = (data, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .post(`${URL}/api/v1/lms/add/passage`, data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        callback(response.data);
        dispatch({
          type: PASSAGE.postAdd,
          payload: response.data,
        });
      })
      .catch((error) => {
        callback(catchError(error));
        console.log(error);
      });
  };
};
