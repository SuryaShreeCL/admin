import { STUDENT } from "../Redux/Action";
import { URL, AUTH_URL } from "./URL";
import axios from "axios";

export const getStudents = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(URL + "/api/v1/get/all/students", {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: STUDENT.getStudent, StudentList: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getStudentPaginate = (pageNumber, size, keyword) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  if (keyword === null || keyword === undefined) {
    keyword = "";
  }
  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/students/search?page=" +
          pageNumber +
          "&size=" +
          size +
          "&q=" +
          keyword,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: STUDENT.getStudentPaginate,
          StudentFilterResult: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getStudentsById = (id) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(URL + "/api/v1/students/" + id, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: STUDENT.getStudentById, StudentList: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const postStudents = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .post(URL + "/api/v1/students", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        sessionStorage.setItem("studentId", JSON.stringify(result.data.id));
        dispatch({ type: STUDENT.postStudent, StudentList: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const studentCollegeInformation = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/students/CollegeInfo", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: STUDENT.studentCollegeInformation,
          CollegeInfo: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const postQuestions = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/students/testExecutions/answers", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: STUDENT.postQuestion, QustionList: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const studentFeedback = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .post(URL + "/api/v1/feedback", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: STUDENT.studentFeedback,
          StudentFeedback: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const startTestExecution = (studentId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .post(
        URL +
          "/api/v1/students/testExecutions?studentId=" +
          studentId +
          "&questionSetName=RecEenginePersonalityBasedSurvey",
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        sessionStorage.setItem(
          "TestExecutionId",
          JSON.stringify(result.data.id)
        );
        dispatch({
          type: STUDENT.startTestExecution,
          TestExecution: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const careerInterestSurvey = (id) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(
        URL + "/api/v1/students/careerInterestSurvey?testExecutionId=" + id,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: STUDENT.careerInterestSurvey,
          CareerInterestSurvey: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getAnswer = (testId, questionId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/students/testExecutions/answers?testExecutionId=" +
          testId +
          "&questionId=" +
          questionId,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({ type: STUDENT.getAnswer, Answer: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getDocumentsByStudentId = (studentId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/files/get/" + studentId, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: STUDENT.viewDocumet,
          studentDocumentList: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const downloadDocumentByStudentId = (fileName) => {
  return (dispatch) => {
    axios
      .get(URL + "api/v1/files/download/" + fileName, {
        crossDomain: true,
      })
      .then((result) => {
        dispatch({
          type: STUDENT.downloadDocument,
          downloadedDocumentResponse: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteStudentFileById = (id, path) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .delete(URL + "/api/v1/files/delete/" + id + "/" + path, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: STUDENT.deleteDocument,
          deletedFileResponse: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const editDocumentsByStudentId = (studentId, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .post(URL + "/api/v1/files/upload/" + studentId, data, {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: STUDENT.editDocument,
          editDocumentResponse: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const mernStudentSignUp = (data, callback) => {
  // let accessToken = window.sessionStorage.getItem("accessToken")
  return (dispatch) => {
    console.log(data);
    axios
      .post(AUTH_URL + "/auth/signup", data, {
        crossDomain: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        // headers : {
        //     "admin" : "yes",
        //     "Authorization" : `Bearer ${accessToken}`
        // }
      })
      .then((result) => {
        dispatch({
          type: STUDENT.mernStudentSignUp,
          signUpResponse: result.data,
        });
        callback(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
        // console.log({ auth: false, message: error.response.data });
        // dispatch({type:STUDENT.catchSignUpError,signUpError:error.response.data})
        callback({ auth: false, message: error.response.data });
      });
  };
};

export const mernStudentEdit = (id, data, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    console.log(data);
    axios
      .put(AUTH_URL + "/auth/students/" + id, data, {
        crossDomain: true,
        headers: {
          "x-access-token": accessToken,
        },
      })
      .then((result) => {
        dispatch({
          type: STUDENT.mernStudentEdit,
          editStudentResponse: result.data,
        });
        callback(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getBlackListedUser = (pageNumber, size, keyword) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  if (keyword === null || keyword === undefined) {
    keyword = "";
  }
  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/students/search/blacklisted?page=" +
          pageNumber +
          "&size=" +
          size +
          "&q=" +
          keyword,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: STUDENT.getBlackListedUser,
          blackListedUserDetails: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getWhiteListedUser = (pageNumber, size, keyword) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  if (keyword === null || keyword === undefined) {
    keyword = "";
  }
  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/students/search/whitelisted?page=" +
          pageNumber +
          "&size=" +
          size +
          "&q=" +
          keyword,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: STUDENT.getWhiteListedUser,
          whiteListedUserDetails: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getManualUser = (pageNumber, size, keyword) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  if (keyword === null || keyword === undefined) {
    keyword = "";
  }
  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/students/search/manualnusers?page=" +
          pageNumber +
          "&size=" +
          size +
          "&q=" +
          keyword,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: STUDENT.getManualUser,
          manualUserDetails: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getMernUser = (pageNumber, size, keyword) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  if (keyword === null || keyword === undefined) {
    keyword = "";
  }
  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/students/search/mernusers?page=" +
          pageNumber +
          "&size=" +
          size +
          "&q=" +
          keyword,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({ type: STUDENT.getMernUser, mernUserDetails: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const viewAllCities = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/cities", {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: STUDENT.viewAllCity, cityList: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getAspirationByStudentId = (id) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(URL + "/aspiration/get/" + id, {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: STUDENT.getAspirationById,
          aspirationDetails: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getTempPersonalData = (id) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/students/" + id + "/viewPersonalDetails", {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: STUDENT.getTempPersonalData, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const verifyNewPersonalData = (id, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .post(URL + "/api/v1/student/" + id + "/personalDetails", data, {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: STUDENT.verifyNewPersonalData, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getUserDataAcademicInfo = (id, type) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(
        URL + "/api/v1/get/student/educationDetails/" + id + "/type?type=ug",
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: STUDENT.getUserDataAcademicInfo,
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const updateUserData = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/update/userData/ug", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: STUDENT.updateUserData, QustionList: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getAcademicInfo = (id) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/student/educationDetails/" + id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: STUDENT.getAcademicInfo, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateAcademicInfo = (id, data, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/student/" + id + "/educationalDetails", data, {
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })

      .then((result) => {
        dispatch({ type: STUDENT.updateAcademicInfo, payload: result.data });
        callback(result.data);
      })
      .catch((error) => {
        console.log(error);
        callback(error.message);
      });
  };
};

export const proofUplaod = (studentId, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .post(URL + "/api/v1/files/upload/" + studentId, data, {
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: STUDENT.uploadFile, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const sscexamboard = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/students/examBoard", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: STUDENT.sscexamboard, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getDocumentList = (studentId, productId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        URL + "/api/v1/files/fileUpload/student/" + studentId + "/" + productId,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({ type: STUDENT.getDocumentList, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteDocument = (id, fileName, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .delete(URL + "/api/v1/files/delete/" + id + "/" + fileName, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: STUDENT.deleteDocument,
          deletedFileResponse: result.data,
        });
        callback(result);
      })
      .catch((error) => {
        console.log(error);
        callback(error);
      });
  };
};

export const deleteDocumentGraduate = (id, fileName, fileId, category) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .delete(
        URL +
          "/api/v1/files/deleteFile/" +
          id +
          "/" +
          category +
          "/" +
          fileId +
          "/" +
          fileName,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: STUDENT.deleteDocumentGraduate,
          deletedFileResponse: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const filterStageBaseUsers = (
  collegeId,
  departmentId,
  cityId,
  bdaName,
  intake
) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/student/product/filter?collegeId=" +
          collegeId +
          "&departmentId=" +
          departmentId +
          "&cityId=" +
          cityId +
          "&bdaId=" +
          bdaName +
          "&intake=" +
          intake,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({ type: STUDENT.filterStageBaseUsers, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const searchStudentInStages = (keyword) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  let adminuserId = window.sessionStorage.getItem("adminUserId");
  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/get/studentProduct/onboarding/search/" +
          adminuserId +
          "?page=0&size=200&q=" +
          keyword,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({ type: STUDENT.searchStudentInStages, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const StudentStepDetails = (studentId, productId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/students/" +
          studentId +
          "/product/" +
          productId +
          "/verificationStatus",
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({ type: STUDENT.StudentStepDetails, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const ObComplete = (studentId, productId, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(
        URL +
          "/api/v1/students/" +
          studentId +
          "/product/" +
          productId +
          "/onBoardingCompleteCall?field=admin",
        {},
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        callback(result);
        dispatch({ type: STUDENT.ObComplete, payload: result.data });
      })
      .catch((error) => {
        callback(error);
        console.log(error);
      });
  };
};

export const ObIncomplete = (studentId, productId, data, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  let adminuserId = window.sessionStorage.getItem("adminUserId");
  console.log(data);
  return (dispatch) => {
    axios
      .put(
        URL +
          "/api/v1/pga/students/" +
          studentId +
          "/adminUser/" +
          adminuserId +
          "/incompleteMail",
        data,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        callback(result);
        dispatch({ type: STUDENT.ObIncomplete, payload: result.data });
      })
      .catch((error) => {
        callback(error);
        console.log(error);
      });
  };
};

export const IncompleteStatus = (studentId, productId, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(
        URL +
          "/api/v1/students/" +
          studentId +
          "/product/" +
          productId +
          "/onBoardingCompleteCall?field=incomplete",
        {},
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        callback(result);
        dispatch({ type: STUDENT.IncompleteStatus, payload: result.data });
      })
      .catch((error) => {
        callback(error);
        console.log(error);
      });
  };
};

export const getexpecteddate = (type, id, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/" + type + "/testComplete/" + id, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        callback(result);
        dispatch({ type: STUDENT.getexpecteddate, payload: result.data });
      })
      .catch((error) => {
        callback(error);
        console.log(error);
      });
  };
};
export const getieltsexam = (id, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/students/" + id + "/testComplete/graduate/ielts", {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        callback(result);
        dispatch({ type: STUDENT.getieltsexam, payload: result.data });
      })
      .catch((error) => {
        callback(error);
        console.log(error);
      });
  };
};
