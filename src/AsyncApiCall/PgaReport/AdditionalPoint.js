import { URL } from "../../Actions/URL";
import customAxios from "../../Axios/Instance";

export const getAllAdditionalPoints = async () => {
    try {
        const response = await customAxios.get(URL+"/api/v1/pga/additionalPoint")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const getStudentAdditionalPoints = async (studentId, productId) => {
    try {
        const response = await customAxios.get(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/additionalPoint")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const saveAdditionalPoints = async (studentId, productId, data) => {
    try {
        const response = await customAxios.post(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/additionalPoint", data)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}


export const deleteAdditionalPoints = async (pointId) => {
    try {
        const response = await customAxios.delete(URL+"/api/v1/pga/additionalPoint/"+pointId)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}