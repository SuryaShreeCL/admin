import { SCOREDETAILS } from "../Redux/Action";
import { URL } from "./URL";
import axios from "axios";
export const viewscoredetails = (studentId, productId, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/tests/student/" +
          studentId +
          "/product/" +
          productId +
          "/score",
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        callback(result);
        dispatch({
          type: SCOREDETAILS.viewScoreDetails,
          viewScoreDetailsList: result.data,
        });
      })
      .catch((error) => {
        // callback(error)
        console.log(error);
      });
  };
};
