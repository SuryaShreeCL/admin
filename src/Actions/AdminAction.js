import { ADMIN } from "../Redux/Action";
import axios from "axios";
import { URL } from "../Actions/URL";
import { errorHandler } from "../Component/Utils/Helpers";

export const adminLogin = (data, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(URL + "/api/v1/students/validateAdmin", data, {
        crossDomain: true,
      })
      .then((result) => {
        callback(result);
        dispatch({ type: ADMIN.adminLogin, adminLoginDetails: result.data });
      })
      .catch((error) => {
        callback(error);
        // dispatch({type:ADMIN.adminLogin,adminLoginDetails:error.response.data})
      });
  };
};

export const toRefreshToken = (data) => {
  let refreshToken = window.sessionStorage.getItem("refreshToken");
  return (dispatch) => {
    axios
      .get(URL + "/api/v1/refresh/token", {
        crossDomain: true,
        headers: {
          "x-refresh-token": refreshToken,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({
          type: ADMIN.refreshToken,
          refreshTokenDetails: result.data,
        });
      })
      .catch((error) => {});
  };
};

export const postStudentAccess = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/students/unifiedAccess", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: ADMIN.studentAccess,
          studentAccessResponse: result.data,
        });
      })
      .catch((error) => {});
  };
};

export const updateStudentPersonal = (id, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(URL + "/api/v1/student/" + id + "/personalDetails", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: ADMIN.updatePersonalData,
          updatePersonalResponse: result.data,
        });
      })
      .catch((error) => {});
  };
};

export const updateStudentEducation = (id, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/student/" + id + "/educationaldetails", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: ADMIN.updateEducationalData,
          updateEducationalonalResponse: result.data,
        });
      })
      .catch((error) => {});
  };
};

export const updateStudentContact = (id, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(URL + "/api/v1/student/" + id + "/contactDetails", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: ADMIN.updateContactData,
          contactDataResponse: result.data,
        });
      })
      .catch((error) => {});
  };
};

export const updateAccountStatus = (id, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(URL + "/api/v1/student/" + id + "/accountstatus", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: ADMIN.updateAccountStatus,
          updateAccStatusResponse: result.data,
        });
      })
      .catch((error) => {});
  };
};

export const updateInternAccess = (id, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(
        URL + "/api/v1/students/olduser/" + id + "/" + data,
        {},
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({ type: ADMIN.giveInternAccess, payload: result.data });
      })
      .catch((error) => {});
  };
};

export const updateLmsAccess = (id, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(URL + "/api/v1/student/" + id + "/accountstatus", data, {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: ADMIN.updateLmsAccess, payload: result.data });
      })
      .catch((error) => {});
  };
};

export const updateAspirationData = (id, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(URL + "/aspiration/update/" + id, data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: ADMIN.updateAspirationData, payload: result.data });
      })
      .catch((error) => {});
  };
};

export const viewStudentStatus = (id) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/studentVerification/view/" + id, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: ADMIN.viewStudentStatus,
          studentStatusResponse: result.data,
        });
      })
      .catch((error) => {});
  };
};

export const updateVerificationStatus = (data, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/studentVerification/update", data, {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
        crossDomain: true,
      })
      .then((result) => {
        callback(result);
        dispatch({
          type: ADMIN.updateVerificationStatus,
          updateVerificationResponse: result.data,
        });
      })
      .catch((error) => {});
  };
};

export const getAllMentors = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/mentors", {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: ADMIN.getAllMentor, payload: result.data });
      })
      .catch((error) => {});
  };
};

export const allocateMentor = (mentorId, studentId) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .post(
        URL + "/api/v1/student/mentor/" + studentId + "/" + mentorId,
        {},
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({ type: ADMIN.alocateMentor, payload: result.data });
      })
      .catch((error) => {});
  };
};
export const deletementor = (studentId, productId, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .delete(
        URL +
          "/api/v1/students/" +
          studentId +
          "/product/" +
          productId +
          "/mentor",
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        callback(result);
        dispatch({ type: ADMIN.deletementor, payload: result.data });
      })
      .catch((error) => {
        callback(error);
      });
  };
};

// For Getting List of users based on admin user Id

export const getAwaitingUsersByAdminId = () => {
  let adminUserId = window.sessionStorage.getItem("adminUserId");
  let product = JSON.parse(window.sessionStorage.getItem("adminLinkedProduct"));
  let accessToken = window.sessionStorage.getItem("accessToken");

  let productid = product.products[0].id;

  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/product/" +
          productid +
          "/admin/" +
          adminUserId +
          "/search?page=0&size=20&q=",
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: ADMIN.getAwaitingUsersByAdminId,
          payload: result.data,
        });
      })
      .catch((error) => {});
  };
};

// TO Activate Student Product

export const activateStudentProduct = (data, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  let id = window.sessionStorage.getItem("adminUserId");
  return (dispatch) => {
    axios
      .put(URL + "/api/v1/product/activate/" + id, data, {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: ADMIN.activateStudentProduct, payload: result.data });
        callback(result);
      })
      .catch((error) => {
        callback(error);
      });
  };
};

// To get admin linked product

export const getAdminLinkedProduct = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  let id = window.sessionStorage.getItem("adminUserId");
  return (dispatch) => {
    axios
      .get(URL + "/api/v1/adminusers/" + id, {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        window.sessionStorage.setItem(
          "adminDetails",
          JSON.stringify(result.data)
        );
        dispatch({ type: ADMIN.getAdminLinkedProduct, payload: result.data });
      })
      .catch((error) => {});
  };
};

export const checkTokenStatus = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(URL + "/api/v1/token/status", {
        headers: {
          jwt: accessToken,
        },
      })
      .then((result) => {
        dispatch({ type: ADMIN.checkTokenStatus, payload: result.data });
      })
      .catch((error) => {});
  };
};

// To get students by stages

export const getStudentByStages = (
  productId,
  stageName,
  size,
  page,
  intake,
  keyword
) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  let adminId = window.sessionStorage.getItem("adminUserId");
  return (dispatch) => {
    dispatch({ type: ADMIN.loader });
    axios
      .get(
        `${URL}/api/v1/product/${productId}/admin/${adminId}/searchbystage`,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            stage: stageName,
            size: size,
            page: page,
            intake: intake ? intake : "",
            q: keyword ? keyword : "",
          },
        }
      )
      .then((result) => {
        dispatch({
          type: ADMIN.getStudentsByStages,
          payload: { success: true, data: result.data, loading: false },
        });
      })
      .catch((error) => {
        dispatch(errorHandler(ADMIN.getStudentsByStages, error, false));
      });
  };
};

// To get manage student by stages

export const getManageStudentByStages = (
  productId,
  sectionName,
  stageName,
  size,
  page,
  intake,
  keyword
) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  let adminId = window.sessionStorage.getItem("adminUserId");
  return (dispatch) => {
    dispatch({ type: ADMIN.loader });
    axios
      .get(
        `${URL}/api/v1/product/${productId}/admin/${adminId}/section/${sectionName}`,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            stage: stageName,
            size: size,
            page: page,
            intake: intake ? intake : "",
            q: keyword ? keyword : "",
          },
        }
      )
      .then((result) => {
        dispatch({
          type: ADMIN.getManageStudentsByStages,
          payload: { success: true, data: result.data, loading: false },
        });
      })
      .catch((error) => {
        dispatch(errorHandler(ADMIN.getManageStudentsByStages, error, false));
      });
  };
};

// To get all admin users

export const getAllAdminUsers = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/adminUsers", {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: ADMIN.getAllAdminUsers, payload: result.data });
      })
      .catch((error) => {});
  };
};

export const getAdminUserDepartments = () => {
  return (dispatch) => {
    axios
      .get(`${URL}/api/v1/user/department`, {
        crossDomain: true,
      })
      .then((result) => {
        dispatch({
          type: ADMIN.getAdminUserDepartments,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch(errorHandler(ADMIN.getAdminUserDepartments, error, false));
      });
  };
};

export const clearCustomData = (fieldName) => {
  return (dispatch) => {
    dispatch({
      type: ADMIN.clearCustomData,
      fieldName: fieldName,
    });
  };
};

export const getReportProduct = (id) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(`${URL}/api/v1/get/product/productFamily/${id}`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: ADMIN.getProductsInReports,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch(errorHandler(ADMIN.getProductsInReports, error, false));
      });
  };
}