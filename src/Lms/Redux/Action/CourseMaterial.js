import axios from "axios";
import { COURSE_MATERIAL, TEST } from "../Action";
import { URL } from "../../../Actions/URL";
import {
  catchError,
  errorHandler,
  textToDownloadFile,
} from "../../../Component/Utils/Helpers";

const DEV_LMS = URL;

export const getCourses = (callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
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
  let accessToken = sessionStorage.getItem("accessToken");
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
  let accessToken = sessionStorage.getItem("accessToken");
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
        dispatch({ type: TEST.cleanEditData });
        console.log(error);
      });
  };
};

export const getConcepts = (subjectId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
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

export const getTopics = (conceptId, data, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .post(`${DEV_LMS}/api/v1/topics/concept/${conceptId}`, data, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: COURSE_MATERIAL.viewTopics,
          payload: response.data.data.content,
          payload2: response.data.data.totalPages,
        });

        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getTopics2 = (conceptId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        `${DEV_LMS}/api/v1/lms/concept/${conceptId}/topics`,

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
          payload: response.data.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteTopic = (topicId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
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
        callback(error.response.data);
        // console.log(error);
      });
  };
};

export const publishTopic = (topicId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(
        `${DEV_LMS}/api/v1/topics/${topicId}/status/Live`,
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
        callback(error.esponse.data);

        // console.log(error);
      });
  };
};

export const reviewTopic = (topicId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
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
  let accessToken = sessionStorage.getItem("accessToken");
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
  let accessToken = sessionStorage.getItem("accessToken");
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
        callback(error.response.data);
      });
  };
};

export const getTopicDetails = (topicId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
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

export const createFileUpload = (masterId, data, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .post(
        DEV_LMS +
          "/api/v1/lms/studyPlanMaster/" +
          masterId +
          "/studyPlan/import",
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
        if (error.response) callback(error.response.data);
        else callback({ response: false, message: "file not uploaded" });
      });
  };
};

export const monthPlan = (monthId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
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

export const approveTopic = (topicId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
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

export const deleteTask = (taskId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return () => {
    axios
      .delete(`${URL}/api/v1/tasks/${taskId}`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => console.log(error));
  };
};

export const validTopicName = (conceptId, topicName, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return () => {
    axios
      .post(
        DEV_LMS + `/api/v1/topic/concept/${conceptId}/name`,
        { name: topicName },
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

export const uploadTopicImage = (image, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return () => {
    axios
      .post(DEV_LMS + `/api/v1/files/upload/concept/topic/image`, image, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const draftTopic = (topicId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(
        `${DEV_LMS}/api/v1/topics/${topicId}/status/Draft`,
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

export const putImage = (file, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return () =>
    axios
      .post(
        `${DEV_LMS}/api/v1/files/upload/test/question/image`,
        file,

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

export const getVideoInfo = (videoId, callback) => {
  const accessToken = sessionStorage.getItem("accessToken");
  return () => {
    axios
      .put(
        `${DEV_LMS}/api/v1/lms/vdoCipher/${videoId}/access`,
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
        callback(response.data.data);
      })
      .catch((error) => {
        callback(error);
      });
  };
};

export const downloadTaskList = (productId, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return () => {
    axios
      .get(`${DEV_LMS}/api/v1/lms/product/report/${productId}`, {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "blob",
      })
      .then((result) => {
        textToDownloadFile(result.data, "Master_task_list", "xlsx");
        callback({ data: result.data, success: true });
      })
      .catch((error) => {
        callback(catchError(error));
      });
  };
};

export const addStudyPlanMonth = (data, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return () => {
    axios
      .post(`${DEV_LMS}/api/v1/studyPlanMasters`, data, {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        callback(result.data);
      })
      .catch((error) => {
        callback(catchError(error));
      });
  };
};

export const getStudyPlan = (productId, page, size) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(`${DEV_LMS}/api/v1/studyPlanMasters/product/${productId}`, {
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: page,
          size: size,
        },
      })
      .then((result) => {
        dispatch({
          type: COURSE_MATERIAL.getStudyPlan,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch(errorHandler(COURSE_MATERIAL.getStudyPlan, error, false));
      });
  };
};

export const updateStudyPlanStatus = (studyPlanId, status, callback) => {
  let accessToken = window.sessionStorage.getItem("accessToken");
  return () => {
    axios
      .post(
        `${DEV_LMS}/api/v1/lms/studyPlanMaster/${studyPlanId}/status/${status}`,
        null,
        {
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((result) => {
        callback(result.data);
      })
      .catch((error) => {
        callback(catchError(error));
      });
  };
};
