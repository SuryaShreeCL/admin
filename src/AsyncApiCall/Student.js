import axios from 'axios';
import { URL } from '../Actions/URL';

export const getLatestCv = async (studentId, productId) => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  try {
    const response = await axios.get(
      URL + '/api/v1/cv/upload/' + studentId + '/' + productId,
      {
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const saveInterestDetails = async (studentId, productId, data) => {
  let accessToken = window.sessionStorage.getItem('accessToken');

  try {
    const response = await axios.put(
      URL +
        '/api/v1/pga/students/' +
        studentId +
        '/product/' +
        productId +
        '/areaofinterest',
      data,
      {
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const getInterestDetails = async (studentId, productId) => {
  let accessToken = window.sessionStorage.getItem('accessToken');

  try {
    const response = await axios.get(
      URL +
        '/api/v1/pga/students/' +
        studentId +
        '/product/' +
        productId +
        '/areaofinterest',
      {
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const deleteInterestDetails = async interestId => {
  let accessToken = window.sessionStorage.getItem('accessToken');

    try {
        const response = await axios.delete(URL+"/api/v1/pga/areaofintesrest/"+interestId, {
            headers : {
                "admin" : "yes",
                "Authorization" : `Bearer ${accessToken}`
            }
        });
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const downloadReport = async reportName => {
  let accessToken = window.sessionStorage.getItem('accessToken');
  try {
    const response = await axios.get(
      URL + '/api/v1/students/' + reportName + '?export=true',
      {
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: 'blob',
      }
    );
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const getTestQuestionSet = async (studentId, productId) => {
  let accessToken = window.sessionStorage.getItem('accessToken');

export const downloadReport = async (reportName) => {
    let accessToken = window.sessionStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        URL + "/api/v1/students/" + reportName + "?export=true",
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
          responseType : 'blob'
        }
      );
      return response;
    } catch (error) {
      return error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    }
  };
  
  export const getTestQuestionSet = async (studentId, productId) => {
    let accessToken = window.sessionStorage.getItem('accessToken');
  
    try {
      const response = await axios.get(
        `${URL}/api/v1/students/${studentId}/products/${productId}/careerinterest`,
        {
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return {
        success: false,
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      };
    }
  }};
