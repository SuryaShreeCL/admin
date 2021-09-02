import axios from 'axios';
import { TEST } from '../Action';
import { URL } from '../../../Actions/URL';

export const getFilters = () => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(`${URL}/api/v1/lms/testQuestionSets/filter`, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        dispatch({
          type: TEST.getFilters,
          payload: response.data,
        });
      })
      .catch(error => console.log(error));
  };
};

export const getQuestionSet = bodyObj => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .post(`${URL}/api/v1/lms/testQuestionSets`, bodyObj, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        dispatch({
          type: TEST.getQuestionSet,
          payload: response.data,
        });
      })
      .catch(error => console.log(error));
  };
};

export const deleteTest = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    // {{DEV-LMS}}/api/v1/testquestionsets/3f6245e1-78d4-4bbc-be07-519624100297/status/Archive
    axios
      .put(
        `${URL}/api/v1/testquestionsets/${testQuestionSetId}/status/Archive`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        callback(error.response.data);
      });
  };
};
export const reviewTest = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return () => {
    axios
      .put(
        `${URL}/api/v1/testquestionsets/${testQuestionSetId}/status/Review`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const approveTest = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .put(
        `${URL}/api/v1/testquestionsets/${testQuestionSetId}/status/Approved`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};
export const publishTest = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .put(
        `${URL}/api/v1/testquestionsets/${testQuestionSetId}/status/Live`,
        {},
        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getQuestionType = testQuestionSetId => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(
        `${URL}/api/v1/lms/testQuestionSet/${testQuestionSetId}/questions/types`,
        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(response => {
        dispatch({
          type: TEST.getQuestionType,
          payload: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const setQuestionData = (testQuestionSetId, type, data, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');

  return dispatch => {
    axios
      .post(
        `${URL}/api/v1/lms/testQuestionSet/${testQuestionSetId}/questions/import?type=${type}`,
        // {{DEV-LMS}}/api/v1/lms/testQuestionSet/{{TESTQUESTIONSETID}}/questions/import?type=SINGLE_SELECT&testSectionId={{TESTSECTIONID}}
        data,
        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(response => {
        // dispatch({
        //   type: COURSE_MATERIAL.createFileUpload,
        //   payload: response.data,
        // });
        callback(response.data);
      })
      .catch(error => {
        // console.log(error);
        callback(error.response.data);
      });
  };
};

export const setQuestionDataWithId = (
  testQuestionSetId,
  type,
  testSectionId,
  data,
  callback
) => {
  let accessToken = sessionStorage.getItem('accessToken');

  return dispatch => {
    axios
      .post(
        `${URL}/api/v1/lms/testQuestionSet/${testQuestionSetId}/questions/import?type=${type}&testSectionId=${testSectionId}`,
        data,
        {
          crossDomain: true,
          headers: {
            admin: 'yes',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        // console.log(error);
        callback(error.response.data);
      });
  };
};

export const createTestQuestionSet = (questionSets, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .post(`${URL}/api/v1/lms/testquestionsets`, questionSets, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        callback(response.data);
        console.log(response.data);
        dispatch({
          type: TEST.createTestQuestionSet,
          payload: response.data,
        });
      })
      .catch(error => {
        callback(error.response.data);
        console.log(error);
      });
  };
};

export const getTopicByCourse = (courseId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(`${URL}/api/v1/topics/course/${courseId}`, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        dispatch({
          type: TEST.getTopicByCourse,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch(error => console.log(error));
  };
};
export const getTemplate = fileName => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(`${URL}/api/v1/files/template/${fileName}`, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        dispatch({
          type: TEST.getTemplate,
          payload: response.data,
        });
      })
      .catch(error => console.log(error));
    // {{DEV-LMS}}/api/v1/files/template/calibration_bundel.xlsx
  };
};

export const getSubjectsByCourse = subjectId => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(`${URL}/api/v1/subjects/course/${subjectId}`, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        dispatch({
          type: TEST.getSubjectsByCourse,
          payload: response.data,
        });
      })
      .catch(error => console.log(error));
  };
};

export const getTestQuestionSet = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(`${URL}/api/v1/lms/testquestionset/${testQuestionSetId}`, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        dispatch({
          type: TEST.getTestQuestionSet,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch(error => console.log(error));
  };
};

export const deleteQuestion = (questionId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');

  return () => {
    axios
      .delete(`${URL}/api/v1/question/${questionId}`, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        callback(response.data);
      })
      .catch(error => console.log(error));
  };
};

export const getTopicList = (testQuestionSetId, callback) => {
  let accessToken = sessionStorage.getItem('accessToken');
  return dispatch => {
    axios
      .get(
        `${URL}/api/v1/lms/testQuestionSet/${testQuestionSetId}/subjects/concepts/topics`
      )
      .then(response => {
        window.open(
          `${URL}/api/v1/lms/testQuestionSet/${testQuestionSetId}/subjects/concepts/topics`
        );
        callback(response.data);
      })
      .catch(error => console.log(error));
  };
};
