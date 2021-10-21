import { URL } from "../../Actions/URL";
import customAxios from "../../Axios/Instance";

export const getPgaCfcList = async () => {
    try {
        const response = await customAxios.get(URL+"/api/v1/pga/csf")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const saveCsf = async (studentId, productId, data) => {
    try {
        const response = await customAxios.post(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/csf", data)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const getStudentPgaCsfList = async (studentId, productId) => {
    try {
        const response = await customAxios.get(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/csf")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const deleteStudentCsf = async (csfId) => {
    try {
        const response = await customAxios.delete(URL+"/api/v1/pga/csf/"+csfId)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}
