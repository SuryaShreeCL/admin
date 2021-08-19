import axios from "axios";
import { COURSE_MATERIAL } from "../Action";
import { URL } from "../../../Actions/URL";

const DEV_LMS = URL;

const pageSize = 10;

const validationToken = sessionStorage.getItem("accessToken");
// console.log(validationToken);

export const getCourses = (callback) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .get(DEV_LMS + "/api/v1/lms/products", {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: COURSE_MATERIAL.viewCourses,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const courseMonth = (productId, callback) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .get(
        DEV_LMS +
          "/api/v1/lms/studyPlanMaster/product/" +
          productId +
          "/studyPlan/month",
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: COURSE_MATERIAL.courseMonth,
          payload: response.data,
        });
        // callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getSubjects = (courseId, callback) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .get(DEV_LMS + "/api/v1/subjects/product/" + courseId, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: COURSE_MATERIAL.viewSubjects,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getConcepts = (subjectId, callback) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .get(DEV_LMS + "/api/v1/concepts/subject/" + subjectId, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: COURSE_MATERIAL.viewConcepts,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getTopics = (conceptId, pageNo, searchString, callback) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .get(
        `${DEV_LMS}/api/v1/topics/concept/${conceptId}?page=${pageNo}&size=${pageSize}&search=${searchString}`,

        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: COURSE_MATERIAL.viewTopics,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteTopic = (topicId, callback) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .put(
        `${DEV_LMS}/api/v1/topics/${topicId}/status/Archive`,
        {},

        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const publishTopic = (topicId, callback) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .put(
        `${DEV_LMS}/api/v1/topics/${topicId}/status/Approved`,
        {},

        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const reviewTopic = (topicId, callback) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .put(
        `${DEV_LMS}/api/v1/topics/${topicId}/status/Review`,
        {},

        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addTopicDetails = (topicDetails, callback) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .post(DEV_LMS + "/api/v1/topics", topicDetails, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: COURSE_MATERIAL.createorUpdateTopics,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addTaskDetails = (taskDetails, callback) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .post(DEV_LMS + "/api/v1/tasks", taskDetails, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: COURSE_MATERIAL.createorUpdateTask,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getTopicDetails = (topicId, callback) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .get(DEV_LMS + `/api/v1/topics/${topicId}`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: COURSE_MATERIAL.getTopicFullDetails,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const createFileUpload = (data, callback) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .post(
        DEV_LMS +
          "/api/v1/lms/studyPlanMaster/6cd18687-70d8-4019-96c9-60144b34c0012/studyPlan/import",
        data,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: COURSE_MATERIAL.createFileUpload,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const monthPlan = (monthId, callback) => {
  let accessToken = validationToken;
  return (dispatch) => {
    axios
      .get(DEV_LMS + "/api/v1/lms/studyPlanMaster/" + monthId + "/studyPlan", {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: COURSE_MATERIAL.monthPlan,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
