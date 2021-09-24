import axios from "axios"
import { URL } from "../Actions/URL"

export const getLatestCv = async (studentId, productId) => {
    try {
        const response = axios.get(URL+"/api/v1/cv/upload/"+studentId+"/"+productId)
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const saveInterestDetails = async (studentId, productId, data) =>{
    try {
        const response = axios.put(URL+"/api/v1/pga/students/"+studentId+"/product/"+productId+"/areaofinterest", data);
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const getInterestDetails = async (studentId, productId) =>{
    try {
        const response = axios.get(URL+"/api/v1/pga/students/"+studentId+"/product/"+productId+"/areaofinterest");
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}

export const deleteInterestDetails = async (interestId) =>{
    try {
        const response = axios.delete(URL+"/api/v1/pga/areaofintesrest/"+interestId);
        return response;
    } catch (error) {
        return error.response && error.response.data.message ? error.response.data.message : error.message
    }
}