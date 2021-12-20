import { URL } from "../../Actions/URL";
import customAxios from "../../Axios/Instance";

export const getFocusList = async (productId) => {
  try {
    const response = await customAxios.get(
      URL + "/api/v1/product/" + productId + "/pga/poa/focus"
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const getPlanOfAction = async (studentId, productId) => {
  try {
    const response = await customAxios.get(
      URL +
        "/api/v1/students/" +
        studentId +
        "/product/" +
        productId +
        "/pgaReport/poa"
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const savePlanOfAction = async (studentId, productId, data) => {
  try {
    const response = await customAxios.post(
      URL +
        "/api/v1/students/" +
        studentId +
        "/product/" +
        productId +
        "/pgaReport/poa",
      data
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const deleteFocus = async (focusId) => {
  try {
    const response = await customAxios.delete(
      URL + "/api/v1/pga/poa/focus/" + focusId
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const saveSingleFocus = async (studentId, productId, data) => {
  try {
    const response = await customAxios.post(
      URL +
        "/api/v1/students/" +
        studentId +
        "/product/" +
        productId +
        "/pgaReport/poa/focus",
      data
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};
