import { URL } from "./URL";
import axios from "axios";
import { DEPARTMENT } from "../Redux/Action";

/**add department - post call */
export const addDepartment = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .post(URL + "/api/v1/departments", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: DEPARTMENT.addDepartment,
          addedDepartment: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: DEPARTMENT.addDepartment,
          addedDepartment: error.response.data,
        });
      });
  };
};

/**edit department - update call */
export const updateNewDepartment = (id, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/departments/" + id, data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: DEPARTMENT.updateDepartment,
          updateDepartment: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

/**delete department */
export const deleteDepartment = (id) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .delete(URL + "/api/v1/departments/" + id, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: DEPARTMENT.deleteDepartment,
          deleteDepartment: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

/**get all departments */
export const getAllDepartments = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/departments", {
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({
          type: DEPARTMENT.getAllDepartments,
          allDepartmentList: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: DEPARTMENT.getAllDepartments,
          allDepartmentList: error.response.data,
        });
      });
  };
};

/**paginate and filter get call */
export const getDepartmentPaginate = (page, size, keyword) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  if (keyword === null) keyword = "";
  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/departments/page/search?page=" +
          page +
          "&size=" +
          size +
          "&q=" +
          keyword,
        {
          crossDomain: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            admin: "yes",
          },
        }
      )
      .then((result) => {
        dispatch({
          type: DEPARTMENT.getPaginateDepartment,
          paginatedAndFilteredDepartment: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: DEPARTMENT.getPaginateDepartment,
          paginatedAndFilteredDepartment: error.response.data,
        });
      });
  };
};
