import { URL } from "../../Actions/URL";
import customAxios from "../../Axios/Instance";

export const getPgaProgramInfo = async () => {
    try {
        const response = await customAxios.get(URL+"/api/v1/pga/programInformation")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const getStudentProgramInfo = async (studentId, productId) => {
    try {
        const response = await customAxios.get(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/programInformation")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const savePgaProgramInfo = async (studentId, productId, data) => {
    try {
        const response = await customAxios.post(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/programInformation", data)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const deleteStudentPgaProgramInfo = async (studentId, productId, programId) => {
    try {
        const response = await customAxios.delete(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/programInformation/"+programId)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

