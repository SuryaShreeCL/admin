import axios from 'axios';
import { COURSE_MATERIAL } from '../Action';

const DEV_LMS = 'https://dev-serviceslms.thecareerlabs.com';

const pageSize = 10;

const validationToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsbXNjaGVja2VyIiwiZXhwIjoxNjI5Mjk1OTgzLCJpYXQiOjE2MjkyODg3ODN9.E93lw1J-updK4U6i_sATgY7KEq_JD89_Sn379kLsQ3aKahO2vsoKsFEQrfdC3CmLLqRzL2HyvgElwdOsUyQy9w';

export const getCourses = callback => {
  let accessToken = validationToken;
  return dispatch => {
    axios
      .get(DEV_LMS + '/api/v1/lms/products', {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        dispatch({
          type: COURSE_MATERIAL.viewCourses,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getSubjects = (courseId, callback) => {
  let accessToken = validationToken;
  return dispatch => {
    axios
      .get(DEV_LMS + '/api/v1/subjects/product/' + courseId, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        dispatch({
          type: COURSE_MATERIAL.viewSubjects,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getConcepts = (subjectId, callback) => {
  let accessToken = validationToken;
  return dispatch => {
    axios
      .get(DEV_LMS + '/api/v1/concepts/subject/' + subjectId, {
        crossDomain: true,
        headers: {
          admin: 'yes',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        dispatch({
          type: COURSE_MATERIAL.viewConcepts,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getTopics = (conceptId, pageNo, searchString, callback) => {
  let accessToken = validationToken;
  return dispatch => {
    axios
      .get(
        `${DEV_LMS}/api/v1/topics/concept/${conceptId}?page=${pageNo}&size=${pageSize}&search=${searchString}`,

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
          type: COURSE_MATERIAL.viewTopics,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const deleteTopic = (topicId, callback) => {
  let accessToken = validationToken;
  return dispatch => {
    axios
      .put(
        `${DEV_LMS}/api/v1/topics/${topicId}/status/Archive`,
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

export const publishTopic = (topicId, callback) => {
  let accessToken = validationToken;
  return dispatch => {
    axios
      .put(
        `${DEV_LMS}/api/v1/topics/${topicId}/status/Live`,
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

export const reviewTopic = (topicId, callback) => {
  let accessToken = validationToken;
  return dispatch => {
    axios
      .put(
        `${DEV_LMS}/api/v1/topics/${topicId}/status/Review`,
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

// {{DEV-LMS}}/api/v1/topics/810defd8-003e-40da-8e84-c5b0b457c5ba/status/

// {{DEV-LMS}}/api/v1/topics/{{TOPICID}}/status/Live
