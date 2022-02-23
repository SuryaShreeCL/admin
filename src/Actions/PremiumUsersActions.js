import { PREMIUM_USERS } from "../Redux/Action";
import axios from "axios";

export const uploadPremiumUsers = (sheet, callback) => {
    return dispatch => {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/v1/students/bulkUploadToPremiumStudents`,
          sheet,
          {
            crossDomain: true,
            headers: {
              admin: "yes",
              Authorization: `Bearer ${window.sessionStorage.getItem(
                "accessToken"
              )}`,
            },
          }
        )
        .then(response => {
          callback(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
  };
  