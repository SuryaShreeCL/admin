import { URL } from "../../Actions/URL";
import customAxios from "../../Axios/Instance";

export const getPgaConcerns = async () => {
    try {
        const response = await customAxios.get(URL+"/api/v1/pga/concerns")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const getStudentConcerns = async (studentId, productId) => {
    try {
        const response = await customAxios.get(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/concerns")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const savePgaConcern = async (studentId, productId, data) => {
    try {
        const response = await customAxios.post(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/concerns", data)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const deleteStudentPgaConcern = async (studentId, productId, concernId) => {
    try {
        const response = await customAxios.delete(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/concerns/"+concernId)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

