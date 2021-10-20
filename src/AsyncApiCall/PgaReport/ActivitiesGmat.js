import { URL } from "../../Actions/URL";
import customAxios from "../../Axios/Instance";

export const getPgaActivitiesGmat = async () => {
    try {
        const response = await customAxios.get(URL+"/api/v1/pga/activities")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const getStudentActivitiesGmat = async (studentId, productId) => {
    try {
        const response = await customAxios.get(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/activities")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const savePgaActivitiesGmat = async (studentId, productId, data) => {
    try {
        const response = await customAxios.post(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/activities", data)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const deleteStudentPgaActivitiesGmat = async (studentId, productId, activityId) => {
    try {
        const response = await customAxios.delete(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/activities/"+activityId)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

