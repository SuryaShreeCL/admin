import axios from 'axios';
import { URL } from './URL';

export const createTest = async (data) => {
  let accessToken = window.sessionStorage.getItem('accessToken');

  try {
    const response = await axios.post(URL + '/api/v1/clsatest', data, {
      headers: {
        admin: 'yes',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const clsaData = async (id) => {
  let accessToken = window.sessionStorage.getItem('accessToken');

  try {
    const response = await axios.get(URL + '/api/v1/clsatest/' + id, {
      headers: {
        admin: 'yes',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const clsaTestDelete = async (id) => {
  let accessToken = window.sessionStorage.getItem('accessToken');

  try {
    const response = await axios.delete(URL + '/api/v1/clsatest/' + id, {
      headers: {
        admin: 'yes',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const clsaQuestionSetUpload = async (id, data) => {
  let accessToken = window.sessionStorage.getItem('accessToken');

  try {
    const response = await axios.post(
      URL + '/api/v1/clsatest/' + id + '/testquestionset/import?type=SINGLE_SELECT',
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

export const clsaTestList = async (page) => {
  let accessToken = window.sessionStorage.getItem('accessToken');

  try {
    const response = await axios.get(URL + '/api/v1/clsatest/viewall?page=' + page + '&size=10', {
      headers: {
        admin: 'yes',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const updateClsaData = async (id, data) => {
  let accessToken = window.sessionStorage.getItem('accessToken');

  try {
    const response = await axios.put(URL + '/api/v1/clsatest/' + id, data, {
      headers: {
        admin: 'yes',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const clsaQuestionsetDelete = async (id, questionsetId) => {
  let accessToken = window.sessionStorage.getItem('accessToken');

  try {
    const response = await axios.delete(
      URL + '/api/v1/clsatest/' + id + '/testquestionset/' + questionsetId,
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

export const clsaQuestionsetList = async (page, testID) => {
  let accessToken = window.sessionStorage.getItem('accessToken');

  try {
    const response = await axios.get(
      URL + '/api/v1/clsatest/' + testID + '/testquestionset/viewall?page=' + page + '&size=5',
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
