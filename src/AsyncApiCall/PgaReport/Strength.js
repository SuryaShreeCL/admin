import { URL } from "../../Actions/URL";
import customAxios from "../../Axios/Instance";

export const getPgaStrength = async () => {
    try {
        const response = await customAxios.get(URL+"/api/v1/pga/strength")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const getStudentPgaStrength = async (studentId, productId) => {
    try {
        const response = await customAxios.get(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/strength")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const savePgaStrength = async (studentId, productId, data) => {
    try {
        const response = await customAxios.post(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/strength", data)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const deleteStudentPgaStrength = async (studentId, productId, strengthId) => {
    try {
        const response = await customAxios.delete(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/strength/"+strengthId)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

