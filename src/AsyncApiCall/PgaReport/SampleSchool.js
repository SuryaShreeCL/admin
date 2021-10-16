import { URL } from "../../Actions/URL";
import customAxios from "../../Axios/Instance";


export const getSchoolCategory = async () => {
    try {
        const response = await customAxios.get(URL+"/api/v1/gradSchoolCategory")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}


export const getSchoolRegion = async () => {
    try {
        const response = await customAxios.get(URL+"/api/v1/gradSchoolRegion")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const getSchoolProgram = async () => {
    try {
        const response = await customAxios.get(URL+"/api/v1/gradSchoolProgram")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const searchSchool = async (data) => {
    try {
        const response = await customAxios.post(URL+"/api/v1/pgaReport/gradSchool/search",data)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}


export const getAddedSchool = async (studentId, productId) => {
    try {
        const response = await customAxios.get(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/gradSchool")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const deleteSelectedSchool = async (studentId, productId, schoolId) => {
    try {
        const response = await customAxios.delete(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pga/selectedSchool/"+schoolId)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const addSampleSchool = async (studentId, productId, data) => {
    try {
        const response = await customAxios.post(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/gradSchool",data)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}
