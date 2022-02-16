import { DEGREE } from "../Redux/Action";
import { URL } from "./URL";
import axios from "axios";

/**paginate and filter get call */
export const getDegreePaginate = (page, size, keyword) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  if (keyword === null) keyword = "";
  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/degree/page/search?page=" +
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
          type: DEGREE.getDegreePaginate,
          paginatedAndFilteredDegree: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

/**get all degrees - get call */
export const getAllDegrees = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/degrees", {
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: DEGREE.getAllDegrees, allDegreeList: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

/**add degree - post call */
export const addDegree = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .post(URL + "/api/v1/degrees", data, {
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: DEGREE.addDegree, addedDegree: result.data });
      })
      .catch((error) => {
        dispatch({
          type: DEGREE.addDegree,
          addedDegree: error.response.data,
        });
      });
  };
};

/**edit degree - put call */
export const updateDegree = (id, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/degrees/" + id, data, {
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: DEGREE.updateDegree, updatedDegree: result.data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: DEGREE.updateDegree,
          updatedDegree: error.response.data,
        });
      });
  };
};

/**delete degree */
export const deleteDegree = (id) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .delete(URL + "/api/v1/degrees/" + id, {
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: DEGREE.deleteDegree, deletedDegree: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
