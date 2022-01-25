import { REPORTS } from "../Redux/Action";
import axios from "axios";
import { URL } from "../Actions/URL";

export const viewTermsAndConReports = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return dispatch => {
    axios
      .get(URL + "/api/v1/students/report/tnc", {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(result => {
        dispatch({
          type: REPORTS.viewTermsAndConReport,
          termsAndConReport: result.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};
export const viewCvReport = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return dispatch => {
    axios
      .get(URL + "/api/v1/students/reports/cvratings", {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(result => {
        dispatch({ type: REPORTS.viewCvReport, cvReport: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const viewMarkSheetReport = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return dispatch => {
    axios
      .get(URL + "/api/v1/students/report/marksheet", {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(result => {
        dispatch({
          type: REPORTS.viewMarksheetReport,
          markSheetReport: result.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const viewMydetailsReport = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return dispatch => {
    axios
      .get(URL + "/api/v1/students/report/mydetails", {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(result => {
        dispatch({
          type: REPORTS.viewMyDetailsReport,
          myDetailsReport: result.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const viewTechTestReport = QuestionSetName => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return dispatch => {
    axios
      .get(URL + "/api/v1/students/report/technicaltest/" + QuestionSetName, {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(result => {
        if (QuestionSetName === "Technical Test Mechanical") {
          dispatch({
            type: REPORTS.viewTechTestMechReport,
            techTestMechReport: result.data,
          });
        } else if (QuestionSetName === "Technical Test Computer") {
          dispatch({
            type: REPORTS.viewTechTestCseReport,
            techTestCseReport: result.data,
          });
        } else if (QuestionSetName === "Technical Test Electronics") {
          dispatch({
            type: REPORTS.viewTechTestElectronics,
            techTestElectronics: result.data,
          });
        } else if (QuestionSetName === "Career Exploration Test") {
          dispatch({ type: REPORTS.viewCareerExpoTest, payload: result.data });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const viewTestRating = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return dispatch => {
    axios
      .get(URL + "/api/v1/students/report/testRating", {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(result => {
        dispatch({
          type: REPORTS.viewTestRating,
          testRatingResult: result.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const viewDiagTestReport = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return dispatch => {
    axios
      .get(URL + "/api/v1/students/report/diagonostictest", {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(result => {
        dispatch({
          type: REPORTS.viewDiagTestReport,
          diagTestResult: result.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getCareerExpoReport = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return dispatch => {
    axios
      .get(URL + "/api/v1/students/reports/cit/Career Exploration Test", {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(result => {
        dispatch({ type: REPORTS.viewCareerExpoTest, payload: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getTestList = (id, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return dispatch => {
    axios
      .get(`${URL}/api/v1/products/${id}/reportlist`)
      .then(result => {
        callback(result.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};
