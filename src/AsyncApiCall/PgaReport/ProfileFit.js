import { URL } from "../../Actions/URL";
import customAxios from "../../Axios/Instance";

export const getPgaProfileFitList = async () => {
    try {
        const response = await customAxios.get(URL+"/api/v1/pga/profileFit")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const getStudentProfileFit = async (studentId, productId) => {
    try {
        const response = await customAxios.get(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/profileFit")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const savePgaProfileFit = async (studentId, productId, data) => {
    try {
        const response = await customAxios.post(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/profileFit", data)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const deleteStudentProfileFit = async (studentId, productId, fitId) => {
    try {
        const response = await customAxios.delete(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/profileFit/"+fitId)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

