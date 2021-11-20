import { PROFILE_GAP_ANALYSIS } from "../Redux/Action";
import { URL } from "./URL";
import axios from "axios";

export const getgeneraldetails = (studentId, productId, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/pga/students/" +
          studentId +
          "/product/" +
          productId +
          "/generaldetails",
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
          type: PROFILE_GAP_ANALYSIS.getgeneraldetails,
          payload: result.data,
        });
      })
      .catch((error) => {
        callback(error);
        console.log(error);
      });
  };
};
export const getstatus = (studentId, productId, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/pga/students/" +
          studentId +
          "/product/" +
          productId +
          "/dataverification",
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
          type: PROFILE_GAP_ANALYSIS.getstatus,
          payload: result.data,
        });
      })
      .catch((error) => {
        callback(error);
        console.log(error);
      });
  };
};
export const getcommenthistory = (studentId, productId, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/pga/students/" +
          studentId +
          "/product/" +
          productId +
          "/datachangelog",
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
          type: PROFILE_GAP_ANALYSIS.getstatus,
          payload: result.data,
        });
      })
      .catch((error) => {
        callback(error);
        console.log(error);
      });
  };
};
export const updatestatus = (studentId, productId, data, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(
        URL +
          "/api/v1/pga/students/" +
          studentId +
          "/product/" +
          productId +
          "/dataverification",
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
          type: PROFILE_GAP_ANALYSIS.updatestatus,
          payload: result.data,
        });
      })
      .catch((error) => {
        callback(error);
        console.log(error);
      });
  };
};
export const updategeneraldetails = (studentId, productId, data, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(
        URL +
          "/api/v1/pga/students/" +
          studentId +
          "/product/" +
          productId +
          "/generaldetails",
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
          type: PROFILE_GAP_ANALYSIS.updategeneraldetails,
          payload: result.data,
        });
      })
      .catch((error) => {
        callback(error);
        console.log(error);
      });
  };
};
// ppgaCallNotes
export const getPpgaCallNotes = (studentId, productId, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/pga/students/" +
          studentId +
          "/product/" +
          productId +
          "/ppgacallnotes",
        {
          crossDomain: true,
          headers: {
            Authorization: ` Bearer ${accessToken}`,
            admin: "yes",
          },
        }
      )
      .then((result) => {
        callback(result);
        dispatch({
          type: PROFILE_GAP_ANALYSIS.getPpgaCallNotes,
          payload: result.data,
        });
      })
      .catch((error) => {
        // callback(error.message)
        console.log(error);
      });
  };
};

export const updatePpgaCallNotes = (studentId, productId, data, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(
        URL +
          "/api/v1/pga/students/" +
          studentId +
          "/product/" +
          productId +
          "/ppgacallnotes",
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
          type: PROFILE_GAP_ANALYSIS.updatePpgaCallNotes,
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getTestResults = (studentId, productId, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/pga/students/" +
          studentId +
          "/product/" +
          productId +
          "/testscore",
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
          type: PROFILE_GAP_ANALYSIS.getTestResults,
          payload: result.data,
        });
      })
      .catch((error) => {
        // callback(error.message)
        console.log(error);
      });
  };
};

export const getcvresult = (studentId, productId, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/pga/students/" +
          studentId +
          "/product/" +
          productId +
          "/cvComments",
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
          type: PROFILE_GAP_ANALYSIS.getcvresult,
          payload: result.data,
        });
      })
      .catch((error) => {
        callback(error);
        console.log(error);
      });
  };
};
export const deletecvresult = (id, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .delete(URL + "/api/v1/pga/cvComments/" + id, {
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        callback(result);
        dispatch({
          type: PROFILE_GAP_ANALYSIS.deletecvresult,
          payload: result.data,
        });
      })
      .catch((error) => {
        callback(error);
        console.log(error);
      });
  };
};

export const updatecvresult = (studentId, productId, data, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(
        URL +
          "/api/v1/pga/students/" +
          studentId +
          "/product/" +
          productId +
          "/cvComments",
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
          type: PROFILE_GAP_ANALYSIS.updatecvresult,
          payload: result.data,
        });
      })
      .catch((error) => {
        callback(error);
        console.log(error);
      });
  };
};
export const getdashboarddetails = (studentId, productId, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/pga/students/" +
          studentId +
          "/product/" +
          productId +
          "/dashboarddetails",
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
          type: PROFILE_GAP_ANALYSIS.getdashboarddetails,
          payload: result.data,
        });
      })
      .catch((error) => {
        callback(error);
        console.log(error);
      });
  };
};

export const getpgalist = (productId, data, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  let adminuserId = window.sessionStorage.getItem("adminUserId");
  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/pga/product/" +
          productId +
          "/admin/" +
          adminuserId +
          "/searchbystage?stage=PGA&page=0&size=20&q=" +
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
          type: PROFILE_GAP_ANALYSIS.getpgalist,
          payload: result.data,
        });
      })
      .catch((error) => {
        callback(error);
        console.log(error);
      });
  };
};

// academic form (ug,pg,diploma) => (get)
export const viewAcademicDetails = (studentId, type, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/get/student/educationDetails/" +
          studentId +
          "/type?type=" +
          type,
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
          type: PROFILE_GAP_ANALYSIS.viewAcademicDetails,
          payload: result.data,
        });
      })
      .catch((error) => {
        // callback(error)
        console.log(error);
      });
  };
};

// view semester details(get)
export const viewSemesterDetails = (studentId, semesterId, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(
        URL + "/api/v1/students/" + studentId + "/pga/college/" + semesterId,
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
          type: PROFILE_GAP_ANALYSIS.viewSemesterDetails,
          payload: result.data,
        });
      })
      .catch((error) => {
        // callback(error)
        console.log(error);
      });
  };
};

// update semesterDetails
export const saveSemesterDetails = (studentId, type, data, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(
        URL + "/api/v1/students/" + studentId + "/college/pga?grade=" + type,
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
          type: PROFILE_GAP_ANALYSIS.saveSemesterDetails,
          payload: result.data,
        });
      })
      .catch((error) => {
        // callback(error)
        console.log(error);
      });
  };
};

// delete semester details
export const deleteSemesterDetails = (
  studentId,
  subjectDetailId,
  semesterId,
  callback
) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .delete(
        URL +
          "/api/v1/students/" +
          studentId +
          "/pga/college/subjectDetails/" +
          subjectDetailId +
          "/" +
          semesterId,
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
          type: PROFILE_GAP_ANALYSIS.deleteSemesterDetails,
          payload: result.data,
        });
      })
      .catch((error) => {
        // callback(error)
        console.log(error);
      });
  };
};

export const saveAcademicDetails = (studentId, type, data, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(
        URL + "/api/v1/students/" + studentId + "/pga/academic?grade=" + type,
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
          type: PROFILE_GAP_ANALYSIS.saveAcademicDetails,
          payload: result.data,
        });
      })
      .catch((error) => {
        // callback(error)
        console.log(error);
      });
  };
};

export const updateCalculation = (
  studentId,
  semester,
  type,
  data,
  callback
) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    // {{RULES_API_URL}}api/v1/students/7b7bee59-e85f-4820-b4c1-8e3b75b4b404/sgpa/1?type=pg

    axios
      .put(
        URL +
          "/api/v1/students/" +
          studentId +
          "/calculateSgpaAndCgpa/" +
          semester +
          "?type=" +
          type,
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
          type: PROFILE_GAP_ANALYSIS.updateCalculation,
          payload: result.data,
        });
      })
      .catch((error) => {
        // callback(error)
        console.log(error);
      });
  };
};

// report preview
// view semester details(get)
export const getReportPreview = (studentId, productId, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/students/" +
          studentId +
          "/product/" +
          productId +
          "/pgaReport/client",
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
          type: PROFILE_GAP_ANALYSIS.getReportPreview,
          payload: result.data,
        });
      })
      .catch((error) => {
        // callback(error)
        console.log(error);
      });
  };
};
