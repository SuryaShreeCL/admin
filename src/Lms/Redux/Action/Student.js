import axios from "axios";
import { STUDENT } from "../Action";
import { URL } from "../../../Actions/URL";
import { errorHandler } from "../../../Component/Utils/Helpers";

const DEV_LMS = URL;

export const getProducts = (studentId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(DEV_LMS + `/api/v1/lms/students/${studentId}/products`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: STUDENT.getProducts,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getTaskTopic = (studentId, productId, category) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    dispatch({ type: STUDENT.loader });
    axios
      .get(
        DEV_LMS +
          `/api/v1/lms/student/${studentId}/product/${productId}/${category}`,
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
          type: STUDENT.getTaskTopic,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(errorHandler(STUDENT.getTaskTopic, error, false));
      });
  };
};

export const getAllLmsProduct = (callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(DEV_LMS + `/api/v1/lms/products`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: STUDENT.getLmsProducts,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const postStudentLmsProduct = (studentId, data, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .put(
        DEV_LMS + `/api/v1/lms/students/${studentId}/product/allocated`,
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
          type: STUDENT.studentLmsProduct,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getCsvTemplate = (callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return () => {
    console.log("hello");
    axios
      .get(DEV_LMS + `/api/v1/files/template/studyplan_template.csv`, {
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

export const strengthWeaknessExport = (studentId, productId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        DEV_LMS +
          `/api/v1/lms/student/${studentId}/product/${productId}/strengthWeakness?export=true`,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        window.open(
          `${DEV_LMS}/api/v1/lms/student/${studentId}/product/${productId}/strengthWeakness?export=true`
        );
        // dispatch({
        //   type: STUDENT.strengthWeaknessExport,
        //   payload: response.data,
        // });
        // callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const studyPlanExport = (studentId, productId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        DEV_LMS +
          `/api/v1/lms/student/${studentId}/product/${productId}/studyPlans/monthlyDetails?export=true`,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        window.open(
          DEV_LMS +
            `/api/v1/lms/student/${studentId}/product/${productId}/studyPlans/monthlyDetails?export=true`
        );
        // dispatch({
        //   type: STUDENT.studyPlanExport,
        //   payload: response.data,
        // });
        // callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const calibrationTestExport = (studentId, productId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        DEV_LMS +
          `/api/v1/lms/student/${studentId}/product/${productId}/calibrationReport?export=true`,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        window.open(
          DEV_LMS +
            `/api/v1/lms/student/${studentId}/product/${productId}/calibrationReport?export=true`
        );
        // dispatch({
        //   type: STUDENT.calibrationTestExport,
        //   payload: response.data,
        // });
        // callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const topicTestExport = (studentId, productId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        DEV_LMS +
          `/api/v1/lms/student/${studentId}/product/${productId}/topicTests?export=true`,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        window.open(
          DEV_LMS +
            `/api/v1/lms/student/${studentId}/product/${productId}/topicTests?export=true`
        );
        // dispatch({
        //   type: STUDENT.topicTestExport,
        //   payload: response.data,
        // });
        // callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const topicTestReportExport = (studentId, productId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        DEV_LMS +
          `/api/v1/lms/student/${studentId}/product/${productId}/topicTests/report/export`,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        window.open(
          DEV_LMS +
            `/api/v1/lms/student/${studentId}/product/${productId}/topicTests/report/export`
        );
        // dispatch({
        //   type: STUDENT.topicTestReportExport,
        //   payload: response.data,
        // });
        // callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getStudentProducts = (studentId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(DEV_LMS + `/api/v1/lms/students/${studentId}/products/allocated`, {
        crossDomain: true,
        headers: {
          admin: "yes",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch({
          type: STUDENT.getStudentProducts,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getStrengthAndWeakness = (studentId, productId) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    dispatch({ type: STUDENT.loader });
    axios
      .get(
        DEV_LMS +
          `/api/v1/lms/student/${studentId}/product/${productId}/strengthWeakness?export=false`,
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
          type: STUDENT.getStrengthAndWeakness,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch(errorHandler(STUDENT.getStrengthAndWeakness, error, false));
        console.log(error);
      });
  };
};

export const getCalibrationTestReport = (studentId, productId) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    dispatch({ type: STUDENT.loader });
    axios
      .get(
        `${DEV_LMS}/api/v1/lms/student/${studentId}/product/${productId}/calibrationReport?export=false`,
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
          type: STUDENT.getCalibrationTestReport,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch(errorHandler(STUDENT.getCalibrationTestReport, error, false));
        console.log(error);
      });
  };
};

export const getTopicName = (studentId, productId) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    dispatch({ type: STUDENT.loader });
    axios
      .get(
        `${DEV_LMS}/api/v1/lms/student/${studentId}/product/${productId}/topics`,
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
          type: STUDENT.getTopicName,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(errorHandler(STUDENT.getTopicName, error, false));
      });
  };
};

export const postTopicTestList = (
  studentId,
  productId,
  data,
  status,
  topicId
) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .post(
        `${DEV_LMS}/api/v1/lms/student/${studentId}/product/${productId}/studentTopicTests`,
        data,
        {
          crossDomain: true,
          headers: {
            admin: "yes",
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            status: status,
            topicId: topicId,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: STUDENT.postTopicTestList,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch(errorHandler(STUDENT.postTopicTestList, error, false));
      });
  };
};

export const getTopicTestReport = (studentId, testExecutionId, callback) => {
  let accessToken = sessionStorage.getItem("accessToken");
  return (dispatch) => {
    axios
      .get(
        `${DEV_LMS}/api/v1/lms/students/${studentId}/testExecution/${testExecutionId}/topicTestReport`,
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
          type: STUDENT.getTopicTestReport,
          payload: response.data,
        });
        callback(response.data);
      })
      .catch((error) => {
        dispatch(errorHandler(STUDENT.getTopicTestReport, error, false));
        console.log(error);
      });
  };
};

export const clearFieldValue = (fieldName) => {
  return (dispatch) => {
    dispatch({
      type: STUDENT.clearFieldValue,
      fieldName: fieldName,
    });
  };
};
