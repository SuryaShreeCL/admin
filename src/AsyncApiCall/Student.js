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