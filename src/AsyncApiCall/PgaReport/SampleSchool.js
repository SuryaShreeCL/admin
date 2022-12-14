import { URL } from "../../Actions/URL";
import customAxios from "../../Axios/Instance";

export const getSchoolCategory = async (productId) => {
  try {
    const response = await customAxios.get(
      URL + "/api/v1/product/" + productId + "/school/category"
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const getSchoolRegion = async (productId) => {
  try {
    const response = await customAxios.get(
      URL + `/api/v1/product/${productId}/pga/regions`
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const getSchoolProgram = async (productId) => {
  try {
    const response = await customAxios.get(
      URL + "/api/v1/product/" + productId + "/program"
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const searchSchool = async (productId, type, data) => {
  try {
    const response = await customAxios.post(
      URL +
        "/api/v1/product/" +
        productId +
        "/pgaReport/school/search?type=" +
        type,
      data
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const getAddedSchool = async (studentId, productId) => {
  try {
    const response = await customAxios.get(
      URL +
        "/api/v1/students/" +
        studentId +
        "/product/" +
        productId +
        "/pgaReport/gradSchool"
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const deleteSelectedSchool = async (studentId, productId, schoolId) => {
  try {
    const response = await customAxios.delete(
      URL +
        "/api/v1/students/" +
        studentId +
        "/product/" +
        productId +
        "/pga/selectedSchool/" +
        schoolId
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const addSampleSchool = async (studentId, productId, data) => {
  try {
    const response = await customAxios.post(
      URL +
        "/api/v1/students/" +
        studentId +
        "/product/" +
        productId +
        "/pgaReport/gradSchool",
      data
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const getPlanBCountry = async (regionId) => {
  try {
    const response = await customAxios.get(
      URL + "/api/v1/bSchool/country?regionId=" + regionId
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};
