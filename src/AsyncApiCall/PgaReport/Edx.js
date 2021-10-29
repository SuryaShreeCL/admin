import { URL } from "../../Actions/URL";
import customAxios from "../../Axios/Instance";

export const getEdxBatch = async () => {
  try {
    const response = await customAxios.get("/api/v1/pga/edx/branch");
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const getEdxCourseType = async () => {
  try {
    const response = await customAxios.get("/api/v1/pga/edx/courseType");
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const getEdxCourseDescription = async () => {
  try {
    const response = await customAxios.get("/api/v1/pga/edx/courseDescription");
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const getStudentEdx = async (studentId, productId) => {
  try {
    const response = await customAxios.get(
      "/api/v1/students/" +
        studentId +
        "/product/" +
        productId +
        "/pgaReport/edx"
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const saveStudentEdx = async (studentId, productId, data) => {
  try {
    const response = await customAxios.post(
      "/api/v1/students/" +
        studentId +
        "/product/" +
        productId +
        "/pgaReport/edx",
      data
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const deleteStudentEdx = async (categoryId) => {
  try {
    const response = await customAxios.delete(
      "/api/v1/pgaReport/edx/courseCategorization/" + categoryId
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};
