import { URL } from "../../Actions/URL";
import customAxios from "../../Axios/Instance";

export const getStudentGeneralDetails = async (studentId, productId) => {
    try {
        const response = await customAxios.get(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/generalDetails")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const savePgaReportGeneralDetails = async (studentId, productId, data) => {
    try {
        const response = await customAxios.post(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/generalDetails", data)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const getPgaReportIntake = async () => {
    try {
        const response = await customAxios.get(URL+"/api/v1/pga/intake")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const getPgaRound = async () => {
    try {
        const response = await customAxios.get(URL+"/api/v1/pga/round")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}
