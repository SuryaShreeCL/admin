import { CALL_DETAILS } from "../Redux/Action";
import axios from "axios";
import { URL } from "./URL";

export const updateclientdetails = (studentId, productId, data, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(
        URL +
          "/api/v1/student/onboardingcallsummary/" +
          studentId +
          "/" +
          productId,
        data,
        {
          crossDomain: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            admin: "yes",
          },
        }
      )
      .then((result) => {
        callback(result);
        dispatch({
          type: CALL_DETAILS.updateclientdetails,
          payload: result.data,
        });
      })
      .catch((error) => {
        callback(error);
        console.log(error);
      });
  };
};
export const getIntakeTerm = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(URL + "/api/v1/inTake/search?page=0&size=20&q=", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({
          type: CALL_DETAILS.getIntakeTermList,
          payload: result.data,
        });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const getClientInfo = (studentId, productId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(URL + "/api/v1/clientDetails/" + studentId + "/" + productId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: CALL_DETAILS.getClientInfo, payload: result.data });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateQuestions = (studentId, productId, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(
        URL +
          "/api/v1/student/onboardingcallQuestions/" +
          studentId +
          "/" +
          productId,
        data,
        {
          crossDomain: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            admin: "yes",
          },
        }
      )
      .then((result) => {
        dispatch({ type: CALL_DETAILS.updateQuestions, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateRating = (studentId, productId, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(
        URL +
          "/api/v1/student/onboardingcallRating/" +
          studentId +
          "/" +
          productId,
        data,
        {
          crossDomain: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            admin: "yes",
          },
        }
      )
      .then((result) => {
        dispatch({ type: CALL_DETAILS.updateRating, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updatePersonalInfo = (studentId, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/student/personalDetails/" + studentId, data, {
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({
          type: CALL_DETAILS.updatePersonalInfo,
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const updateworkexp = (studentId, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/students/" + studentId + "/experience", data, {
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: CALL_DETAILS.updateworkexp, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const getworkexp = (studentId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/get/student/" + studentId + "/experience", {
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: CALL_DETAILS.getworkexp, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getPersonalInfo = (studentId, productId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/clientDetails/" + studentId + "/" + productId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: CALL_DETAILS.getPersonalInfo, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getPincodeDetails = (pincode, callback) => {
  return (dispatch) => {
    axios
      .get("https://api.postalpincode.in/pincode/" + pincode)
      .then((result) => {
        callback(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getAspirationDetails = (studentId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/students/" +
          studentId +
          "/testExecutions?questionSetName=RecEenginePersonalityBasedSurvey",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            admin: "yes",
          },
        }
      )
      .then((result) => {
        dispatch({
          type: CALL_DETAILS.getAspirationDetails,
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const getgrescore = (studentId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(URL + "/api/v1/gre/testComplete/" + studentId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: CALL_DETAILS.getgrescore, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const getgmatscore = (studentId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/gmat/testComplete/" + studentId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: CALL_DETAILS.getgmatscore, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const gettoeflscore = (studentId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/tofel/testComplete/" + studentId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: CALL_DETAILS.gettoeflscore, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const getieltsscore = (studentId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(
        URL + "/api/v1/students/" + studentId + "/testComplete/graduate/ielts",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            admin: "yes",
          },
        }
      )
      .then((result) => {
        dispatch({ type: CALL_DETAILS.getieltsscore, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// get ielts completed score
// export const getIeltsCompletedExamScore = (studentId) => {
//   let accessToken = window.sessionStorage.getItem("accessToken");

//   return (dispatch) => {
//     axios
//       .get(URL + "/api/v1/students/" + studentId + "/graduate/ielts", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           admin: "yes",
//         },
//       })
//       .then((result) => {
//         dispatch({
//           type: CALL_DETAILS.getIeltsCompletedExamScore,
//           payload: result.data,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// };
export const updategrescore = (greid, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/gre/" + greid, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: CALL_DETAILS.updategrescore, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updategmatscore = (gmatid, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/gmat/update/" + gmatid, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: CALL_DETAILS.updategmatscore, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const updatetoeflscore = (toeflid, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/tofel/" + toeflid, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: CALL_DETAILS.updatetoeflscore, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const updateieltsscore = (ieltsid, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/students/" + ieltsid + "/graduate/ielts", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: CALL_DETAILS.updateieltsscore, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const downloadGAT = (studentId, filename) => {
  return (dispatch) => {
    axios
      .get(URL + "/api/v1/files/download/" + studentId + "/" + filename)
      .then((result) => {
        dispatch({ type: CALL_DETAILS.downloadGAT, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const fileuploadGAT = (studentId, examtype, examid, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .post(
        URL +
          "/api/v1/files/fileUpload/" +
          studentId +
          "/" +
          examtype +
          "/" +
          examid,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            admin: "yes",
          },
        }
      )
      .then((result) => {
        dispatch({ type: CALL_DETAILS.fileuploadGAT, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const completecall = (studentId, productId, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(
        URL +
          "/api/v1/student/onboardingcallsummary/status/" +
          studentId +
          "/" +
          productId,
        data,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({ type: CALL_DETAILS.completecall, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const skipcall = (studentId, productId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(
        URL +
          "/api/v1/students/" + studentId + "/product/" + productId + "/skipObCall","",
          
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({ type: CALL_DETAILS.skipcall, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// export const getsearchlist = (data) =>{
//     let userId = window.sessionStorage.getItem("adminUserId")
//     return dispatch =>{
//         axios.get(URL+"/api/v1/get/studentProduct/search/"+userId+"?page=0&size=20&q="+data)
//         .then(result=>{
//             dispatch({type:CALL_DETAILS.getsearchlist,payload:result.data})
//         })
//         .catch(error=>{
//             console.log(error)
//         })
//     }
// }

// get ielts completed score
export const getIeltsCompletedExamScore = (studentId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/students/" + studentId + "/graduate/ielts", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({
          type: CALL_DETAILS.getIeltsCompletedExamScore,
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
