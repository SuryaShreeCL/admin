import customAxios from "../../Axios/Instance";

export const getEdxCourseCategory = async () => {
  try {
    const response = await customAxios.get("/api/v1/pgaEdxCourseCategory");
    return response;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const saveEdxCourseCategory = async ( studentId, productId, data ) => {
    try {
      const response = await customAxios.post("/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/studentPgaEdxCourse", data);
      return response;
    } catch (error) {
      return error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    }
  };
  
  export const searchEdxCourseByCategory = async  ( categoryId ) => {
    try {
      const response = await customAxios.get("/api/v1/PgaEdxCourse/"+categoryId+"/search");
      return response;
    } catch (error) {
      return error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    }
  };

  export const getStudentEdxCourse = async  ( studentId, productId ) => {
    try {
      const response = await customAxios.get("/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/studentPgaEdxCourse");
      return response;
    } catch (error) {
      return error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    }
  };

  export const deleteStudentEdxCourse = async  ( edxCourseId ) => {
    try {
      const response = await customAxios.delete("/api/v1/pgaReport/edxCourse/"+edxCourseId);
      return response;
    } catch (error) {
      return error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    }
  };
