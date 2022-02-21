import { INTAKE } from "../Redux/Action";
import { URL } from "./URL";
import axios from "axios";

/**get all intakes - get call */
export const getAllIntakes = () => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .get(URL + "/api/v1/pga/intake", {
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: INTAKE.getAllIntakes, allIntakeList: result.data });
      })
      .catch((error) => {
        dispatch({
          type: INTAKE.getAllIntakes,
          allIntakeList: error.response.data,
        });
      });
  };
};

/**paginate and filter get call */
export const getPaginateIntake = (page, size, keyword) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  if (keyword === null) keyword = "";
  return (dispatch) => {
    axios
      .get(
        URL +
          "/api/v1/inTake/search?page=" +
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
          type: INTAKE.getPaginateIntake,
          paginatedFilteredIntake: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
        // dispatch({
        //   type: INTAKE.getPaginateIntake,
        //   paginatedFilteredIntake: error.response.data,
        // });
      });
  };
};

/**add intake - post call */
export const addIntake = (data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .post(URL + "/api/v1/inTake", data, {
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: INTAKE.addIntake, addedIntake: result.data });
      })
      .catch((error) => {
        dispatch({
          type: INTAKE.addIntake,
          addedIntake: error.response.data,
        });
      });
  };
};

/**edit intake - put call */
export const updateIntake = (id, data) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .put(URL + "/api/v1/inTake/" + id, data, {
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        dispatch({ type: INTAKE.updateIntake, updatedIntake: result.data });
      })
      .catch((error) => {
        dispatch({
          type: INTAKE.updateIntake,
          updatedIntake: error.response.data,
        });
      });
  };
};

/**delete intake */
export const deleteIntake = (id) => {
  let accessToken = window.sessionStorage.getItem("accessToken");

  return (dispatch) => {
    axios
      .delete(URL + "/api/v1/intake/" + id, {
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          admin: "yes",
        },
      })
      .then((result) => {
        console.log(result);
        dispatch({
          type: INTAKE.deleteIntake,
          deletedIntake: result,
        });
      })
      .catch((error) => {
        dispatch({
          type: INTAKE.deleteIntake,
          deletedIntake: error.response.data,
        });
      });
  };
};
