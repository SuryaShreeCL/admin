import { URL } from "../../Actions/URL";
import customAxios from "../../Axios/Instance";


export const getSpecializationTrack = async () => {
    try {
        const response = await customAxios.get(URL+"/api/v1/pga/track")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}


export const getDefaultCareerTrack = async () => {
    try {
        const response = await customAxios.get(URL+"/api/v1/pga/careerTrack")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const getStudentSpecializationTrack = async ( studentId, productId ) => {
    try {
        const response = await customAxios.get(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/specializationTracks")
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const saveStudentSpecializationTrack = async ( studentId, productId, data ) => {
    try {
        const response = await customAxios.post(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/specializationTracks", data)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const deleteStudentSpecializationTrack = async ( studentId, productId, trackId ) => {
    try {
        const response = await customAxios.delete(URL+"/api/v1/students/"+studentId+"/product/"+productId+"/pgaReport/specializationTracks/"+trackId)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

