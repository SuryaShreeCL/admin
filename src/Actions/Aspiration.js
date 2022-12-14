import { ASPIRATION } from "../Redux/Action";
import axios from "axios";
import { URL } from "../Actions/URL";
// For Aspiration Specialization

export const getAllSpecialization = (callback) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .get(URL + "/api/v1/aspiration/specialization", {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: ASPIRATION.getAllSpecialization,
          payload: result.data,
        });
        callback(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const viewSpecialization = (pageNumber, size, keyword) => {
  keyword = keyword === null ? "" : keyword;
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .get(
        URL +
          "/api/v1/aspiration/specialization/page/search?page=" +
          pageNumber +
          "&size=" +
          size +
          "&q=" +
          keyword,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: ASPIRATION.viewSpecialization,
          viewSpecializationList: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const addSpecialization = (data) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .post(URL + "/api/v1/aspiration/specialization/create", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch({
          type: ASPIRATION.addSpecialization,
          addSpecialization: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateSpecialization = (data) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .put(URL + "/api/v1/aspiration/specialization/update", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch({
          type: ASPIRATION.updateSpecialization,
          updateSpecialization: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteSpecialization = (id) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .delete(URL + "/api/v1/aspiration/specialization/delete/" + id, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch({
          type: ASPIRATION.deleteSpecialization,
          deleteSpecialization: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// For Aspiration Degree

export const getAllDegree = () => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .get(URL + "/api/v1/aspiration/degree", {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: ASPIRATION.getAllDegree, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const viewDegree = (pageNumber, size, keyword) => {
  keyword = keyword === null ? "" : keyword;
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .get(
        URL +
          "/api/v1/aspiration/degree/page/search?page=" +
          pageNumber +
          "&size=" +
          size +
          "&q=" +
          keyword,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        dispatch({ type: ASPIRATION.viewDegree, viewDegreeList: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addDegree = (data) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .post(URL + "/api/v1/aspirationDegree", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch({ type: ASPIRATION.addDegree, addDegree: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateDegree = (id, data) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .put(URL + "/api/v1/aspirationDegree", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: ASPIRATION.updateDegree, updateDegree: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const deleteDegree = (id) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .delete(URL + "/api/v1/aspirationDegree", {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: ASPIRATION.deleteDegree, deleteDegree: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// For Aspiration Feild Of study

export const getAllBranch = () => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .get(URL + "/api/v1/aspiration/branch", {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: ASPIRATION.getAllBranch, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const viewFeild = (pageNumber, size, keyword) => {
  keyword = keyword === null ? "" : keyword;
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .get(
        URL +
          "/api/v1/aspiration/branch/page/search?page=" +
          pageNumber +
          "&size=" +
          size +
          "&q=" +
          keyword,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        dispatch({ type: ASPIRATION.viewFeild, viewFeildList: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addFeild = (data) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .post(URL + "/api/v1/aspirationBranch", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch({ type: ASPIRATION.addFeild, addFeild: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateFeild = (id, data) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .put(URL + "/api/v1/aspirationBranch", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: ASPIRATION.updateFeild, updateFeild: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteFeild = (id) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .delete(URL + "/api/v1/aspiration/branch/" + id, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch({ type: ASPIRATION.deleteFeild, deleteFeild: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// For Aspiration Country

export const viewCountry = (pageNumber, size, keyword) => {
  keyword = keyword === null ? "" : keyword;
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .get(
        URL +
          "/api/v1/aspiration/country/page/search?page=" +
          pageNumber +
          "&size=" +
          size +
          "&q=" +
          keyword,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        dispatch({
          type: ASPIRATION.viewCountry,
          viewCountryList: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const viewCountryForSelect = () => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .get(URL + "/api/v1/aspiration/country", {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch({
          type: ASPIRATION.viewCountryForSelect,
          viewCountryForSelectList: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addCountry = (data) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .post(URL + "/api/v1/aspirationCountry", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch({ type: ASPIRATION.addCountry, addCountry: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateCountry = (id, data) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .put(URL + "/api/v1/aspirationCountry", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: ASPIRATION.updateCountry,
          updateCountry: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteCountry = (id) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .delete(URL + "/api/v1/aspiration/country/" + id, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch({
          type: ASPIRATION.deleteCountry,
          deleteCountry: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// For Aspiration College

export const getAllUniversity = (callback) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .get(URL + "/api/v1/aspiration/university", {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        callback(result);
        dispatch({ type: ASPIRATION.getAllUniversity, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const viewCollege = (pageNumber, size, keyword) => {
  keyword = keyword === null ? "" : keyword;
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .get(
        URL +
          "/api/v1/aspiration/university/page/search?page=" +
          pageNumber +
          "&size=" +
          size +
          "&q=" +
          keyword,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        dispatch({
          type: ASPIRATION.viewCollege,
          viewCollegeList: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addCollege = (data) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .post(URL + "/api/v1/aspiration/university/post", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch({ type: ASPIRATION.addCollege, addCollege: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateCollege = (id, data) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .put(URL + "/api/v1/aspiration/university/update", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({
          type: ASPIRATION.updateCollege,
          updateCollege: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteCollege = (id) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .delete(URL + "/api/v1/aspiration/university/" + id, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch({
          type: ASPIRATION.deleteCollege,
          deleteCollege: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// For Aspiration Term

export const getAllTerms = () => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .get(URL + "/api/v1/aspiration/terms", {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: ASPIRATION.getAllTerms, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const viewTerm = (pageNumber, size, keyword) => {
  keyword = keyword === null ? "" : keyword;
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .get(
        URL +
          "/api/v1/aspiration/term/page/search?page=" +
          pageNumber +
          "&size=" +
          size +
          "&q=" +
          keyword,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({ type: ASPIRATION.viewTerm, viewTermList: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addTerm = (data) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .post(URL + "/api/v1/aspirationTerms", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: ASPIRATION.addTerm, addTerm: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateTerm = (data) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .put(URL + "/api/v1/aspirationTerms", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch({ type: ASPIRATION.updateTerm, updateTerm: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteTerm = (id) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .delete(URL + "/api/v1/aspiration/terms/" + id, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch({ type: ASPIRATION.deleteTerm, deleteTerm: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// City

export const viewCity = (pageNumber, size, keyword) => {
  keyword = keyword === null ? "" : keyword;
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .get(
        URL +
          "/api/v1/aspiration/city/page/search?page=" +
          pageNumber +
          "&size=" +
          size +
          "&q=" +
          keyword,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        dispatch({ type: ASPIRATION.viewCity, viewCityList: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addCity = (data) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .post(URL + "/api/v1/cities/create", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        dispatch({ type: ASPIRATION.addCity, addCity: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateCity = (data) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .put(URL + "/api/v1/cities/update", data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch({ type: ASPIRATION.updateCity, updateCity: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteCity = (id) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");

    axios
      .delete(URL + "/api/v1/cities/delete/" + id, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch({ type: ASPIRATION.deleteCity, deleteCity: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const getallcountry = () => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");
    axios
      .get(URL + "/api/v1/aspiration/country", {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch({ type: ASPIRATION.getallcountry, payload: result.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// testExecutionId=57ec9eb8-4b62-4b1e-806b-429bdb7d7c09

export const updateAspiration = (data, callback, id, tid) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");
    axios
      .put(URL + "/api/v1/aspirationDetails/" + tid + "/" + id, data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        callback(result.data);
        // dispatch({type:ASPIRATION.getallcountry,payload:result.data})
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getAspiration = (callback, id, productid) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");
    axios
      .get(URL + "/api/v1/aspirationDetails/" + id + "/" + productid, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        callback(result.data);
        // dispatch({type:ASPIRATION.getallcountry,payload:result.data})
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getAspirationQuestion = (id, questionSetName) => {
  return (dispatch) => {
    let accessToken = window.sessionStorage.getItem("accessToken");
    axios
      .get(
        URL +
          "/api/v1/student/" +
          id +
          "/testdetails?questionSetName=" +
          questionSetName,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        // callback(result.data)
        dispatch({
          type: ASPIRATION.getAspirationQuestion,
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
